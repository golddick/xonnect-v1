import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/db/prisma"
import { isValidPaystackSignature, verifyPaystackTransaction } from "@/lib/paystack"
import { completePurchase } from "@/lib/ticket-purchases"
import { completeVideoPurchase } from "@/lib/video-purchases"

const db = prisma as any

function extractMetadataIds(metadata: Record<string, unknown> | null | undefined) {
  if (!metadata) {
    return {
      eventId: null,
      ticketId: null,
      purchaseId: null,
      videoPurchaseId: null,
      creatorVideoId: null,
      purchaseKind: null,
      purchaseType: null,
    }
  }

  return {
    eventId: typeof metadata.eventId === "string" ? metadata.eventId : null,
    ticketId: typeof metadata.ticketId === "string" ? metadata.ticketId : null,
    purchaseId: typeof metadata.purchaseId === "string" ? metadata.purchaseId : null,
    videoPurchaseId: typeof metadata.videoPurchaseId === "string" ? metadata.videoPurchaseId : null,
    creatorVideoId: typeof metadata.creatorVideoId === "string" ? metadata.creatorVideoId : null,
    purchaseKind: typeof metadata.purchaseKind === "string" ? metadata.purchaseKind : null,
    purchaseType: typeof metadata.purchaseType === "string" ? metadata.purchaseType : null,
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get("x-paystack-signature")

    if (!isValidPaystackSignature(rawBody, signature)) {
      return NextResponse.json({ message: "Invalid Paystack signature" }, { status: 401 })
    }

    const payload = JSON.parse(rawBody) as {
      event?: string
      data?: {
        reference?: string
        status?: string
        amount?: number
        currency?: string
        metadata?: Record<string, unknown> | null
        customer?: {
          email?: string | null
        } | null
      }
    }

    if (!payload.data?.reference) {
      return NextResponse.json({ message: "Event ignored" }, { status: 200 })
    }

    if (payload.event === "charge.failed") {
      const failureCount = await db.creatorVideoPurchase.updateMany({
        where: {
          transactionId: payload.data.reference,
          status: {
            not: "COMPLETED",
          },
        },
        data: {
          status: "FAILED",
        },
      })

      if (failureCount.count > 0) {
        return NextResponse.json({ message: "Video failure recorded" }, { status: 200 })
      }

      await db.creatorEventTicketPurchase.updateMany({
        where: {
          transactionId: payload.data.reference,
          status: {
            not: "COMPLETED",
          },
        },
        data: {
          status: "FAILED",
        },
      })

      return NextResponse.json({ message: "Failure recorded" }, { status: 200 })
    }

    if (payload.event !== "charge.success") {
      return NextResponse.json({ message: "Event ignored" }, { status: 200 })
    }

    const verified = await verifyPaystackTransaction(payload.data.reference)
    if (verified.status !== "success") {
      return NextResponse.json({ message: "Transaction not successful" }, { status: 200 })
    }

    const metadata = {
      ...(payload.data.metadata ?? {}),
      ...(verified.metadata ?? {}),
    }
    const ids = extractMetadataIds(metadata)

    if (ids.purchaseKind === "video" || ids.videoPurchaseId || ids.creatorVideoId) {
      const purchase = ids.videoPurchaseId
        ? await db.creatorVideoPurchase.findUnique({
            where: { id: ids.videoPurchaseId },
          })
        : await db.creatorVideoPurchase.findFirst({
            where: { transactionId: verified.reference },
          })

      if (!purchase) {
        return NextResponse.json({ message: "Video purchase not found" }, { status: 404 })
      }

      const video = await db.creatorVideo.findUnique({
        where: { id: purchase.creatorVideoId },
        select: {
          id: true,
          creatorId: true,
          rent24Price: true,
          rent48Price: true,
          purchasePrice: true,
        },
      })

      if (!video) {
        return NextResponse.json({ message: "Video not found" }, { status: 404 })
      }

      const purchaseType = (ids.purchaseType ?? purchase.purchaseType ?? "purchase") as "rent24" | "rent48" | "purchase"
      const amountInNaira = Math.max(Math.round((verified.amount ?? purchase.amount * 100) / 100), 0)
      const buyerEmail = purchase.buyerEmail || verified.customer?.email || ""
      const buyerName =
        purchase.buyerName ||
        (typeof metadata.buyerName === "string" ? metadata.buyerName : buyerEmail.split("@")[0] || "Guest")
      const buyerPhone =
        purchase.buyerPhone ||
        (typeof metadata.buyerPhone === "string" ? metadata.buyerPhone : null)

      if (amountInNaira !== purchase.amount && purchase.status !== "COMPLETED") {
        return NextResponse.json({ message: "Amount mismatch" }, { status: 400 })
      }

      let result
      try {
        result = await completeVideoPurchase({
          purchaseId: purchase.id,
          creatorVideoId: video.id,
          creatorId: video.creatorId,
          amount: amountInNaira,
          reference: verified.reference,
          purchaseType,
          buyer: {
            buyerName,
            buyerEmail,
            buyerPhone,
            buyerProfileId:
              typeof metadata.buyerProfileId === "string" ? metadata.buyerProfileId : null,
          },
          currency: verified.currency ?? "NGN",
        })
      } catch (settlementError) {
        const settlementMessage =
          settlementError instanceof Error ? settlementError.message : "Settlement failed"

        if (settlementMessage === "Video not found" || settlementMessage === "Video purchase record not found") {
          await db.creatorVideoPurchase.update({
            where: { id: purchase.id },
            data: {
              status: "FAILED",
            },
          })

          return NextResponse.json(
            {
              message: settlementMessage,
              reference: verified.reference,
            },
            { status: 200 }
          )
        }

        throw settlementError
      }

      return NextResponse.json(
        {
          message: result.alreadyCompleted ? "Video purchase already settled" : "Video purchase settled",
          reference: verified.reference,
        },
        { status: 200 }
      )
    }

    const purchase = ids.purchaseId
      ? await db.creatorEventTicketPurchase.findUnique({
          where: { id: ids.purchaseId },
        })
      : await db.creatorEventTicketPurchase.findFirst({
          where: { transactionId: verified.reference },
        })

    if (!purchase) {
      return NextResponse.json({ message: "Purchase not found" }, { status: 404 })
    }

    const ticket = await db.creatorEventTicket.findUnique({
      where: { id: purchase.ticketId },
      select: {
        eventId: true,
        ticketType: true,
        quantity: true,
        soldCount: true,
        price: true,
      },
    })

    if (!ticket) {
      return NextResponse.json({ message: "Ticket not found" }, { status: 404 })
    }

    const eventId = ids.eventId ?? ticket.eventId
    const ticketId = ids.ticketId ?? purchase.ticketId
    const amountInNaira = Math.max(Math.round((verified.amount ?? purchase.amount * 100) / 100), 0)
    const buyerEmail = purchase.buyerEmail || verified.customer?.email || ""
    const buyerName = purchase.buyerName || (typeof metadata.buyerName === "string" ? metadata.buyerName : buyerEmail.split("@")[0] || "Guest")
    const buyerPhone =
      purchase.buyerPhone ||
      (typeof metadata.buyerPhone === "string" ? metadata.buyerPhone : null)

    if (amountInNaira !== purchase.amount && purchase.status !== "COMPLETED") {
      return NextResponse.json({ message: "Amount mismatch" }, { status: 400 })
    }

    let result
    try {
      result = await completePurchase({
        purchaseId: purchase.id,
        ticketId,
        eventId,
        amount: amountInNaira,
        reference: verified.reference,
        buyer: {
          buyerName,
          buyerEmail,
          buyerPhone,
        },
        currency: verified.currency ?? "NGN",
      })
    } catch (settlementError) {
      const settlementMessage = settlementError instanceof Error ? settlementError.message : "Settlement failed"

      if (settlementMessage === "Ticket is sold out" || settlementMessage === "Ticket not found") {
        await db.creatorEventTicketPurchase.update({
          where: { id: purchase.id },
          data: {
            status: "FAILED",
          },
        })

        return NextResponse.json(
          {
            message: settlementMessage,
            reference: verified.reference,
          },
          { status: 200 }
        )
      }

      throw settlementError
    }

    return NextResponse.json(
      {
        message: result.alreadyCompleted ? "Purchase already settled" : "Purchase settled",
        reference: verified.reference,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Paystack webhook error:", error)
    const message = error instanceof Error ? error.message : "Failed to process Paystack webhook"
    return NextResponse.json({ message }, { status: 500 })
  }
}
