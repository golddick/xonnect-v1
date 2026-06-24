import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { serializePublicTicketEvent } from "@/lib/tickets"
import { createPendingPurchase, completePurchase } from "@/lib/ticket-purchases"
import { initializePaystackTransaction } from "@/lib/paystack"

const db = prisma as any

async function getPublicEvent(eventId: string) {
  const event = await db.creatorEvent.findFirst({
    where: {
      id: eventId,
      isPrivate: false, 
      status: {
        in: ["SCHEDULED", "LIVE", "ENDED"],
      },
    },
    include: {
      creator: {
        include: {
          profile: true,
        },
      },
        tickets: {
          where: {
            status: {
              in: ["ACTIVE", "SOLD_OUT"],
            },
          },
          orderBy: [
            { price: "asc" },
            { createdAt: "asc" },
          ],
        },
    },
  })

  return event ? serializePublicTicketEvent(event) : null
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const event = await getPublicEvent(id)

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        event,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Public ticket event GET error:", error)
    return NextResponse.json({ message: "Failed to load event" }, { status: 500 })
  }
}

type TicketCheckoutBody = {
  ticketId?: string
  buyerName?: string
  buyerEmail?: string
  buyerPhone?: string | null
  quantity?: number
}

function resolveBuyerName(sessionName: string | null | undefined, bodyName: string | undefined, email: string) {
  const fromBody = bodyName?.trim()
  if (fromBody) return fromBody

  const fromSession = sessionName?.trim()
  if (fromSession) return fromSession

  return email.split("@")[0] ?? email
}

function resolveBuyerEmail(sessionEmail: string | null | undefined, bodyEmail: string | undefined) {
  return (bodyEmail?.trim() || sessionEmail?.trim() || "").toLowerCase()
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id: eventId } = await params
    const event = await db.creatorEvent.findFirst({
      where: {
        id: eventId,
        isPrivate: false,
        status: {
          in: ["SCHEDULED", "LIVE", "ENDED"],
        },
      },
      include: {
        tickets: {
          where: {
            status: {
              in: ["ACTIVE", "SOLD_OUT"],
            },
          },
        },
      },
    })

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    const body = (await request.json()) as TicketCheckoutBody
    const ticketId = body.ticketId?.trim()

    if (!ticketId) {
      return NextResponse.json({ message: "ticketId is required" }, { status: 400 })
    }

    const ticket = event.tickets.find((entry: any) => entry.id === ticketId)
    if (!ticket) {
      return NextResponse.json({ message: "Ticket type not found for this event" }, { status: 404 })
    }

    const remaining = Math.max(ticket.quantity - ticket.soldCount, 0)
    if (remaining <= 0) {
      return NextResponse.json({ message: "Ticket is sold out" }, { status: 409 })
    }

    const quantity = Number.isFinite(body.quantity) ? Math.max(Math.round(Number(body.quantity)), 1) : 1
    if (quantity > remaining) {
      return NextResponse.json({ message: "Requested quantity exceeds available tickets" }, { status: 400 })
    }

    const buyerEmail = resolveBuyerEmail(session?.user?.email, body.buyerEmail)
    if (!buyerEmail) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    const buyerName = resolveBuyerName(session?.user?.name, body.buyerName, buyerEmail)
    const buyerPhone = body.buyerPhone?.trim() || null
    const unitPrice = Math.max(Math.round(ticket.price ?? 0), 0)
    const amount = unitPrice * quantity

    if (amount === 0) {
      const purchase = await createPendingPurchase({
        ticketId,
        amount,
        quantity,
        buyer: {
          buyerName,
          buyerEmail,
          buyerPhone,
        },
      })

      await completePurchase({
        purchaseId: purchase.purchase.id,
        ticketId,
        eventId,
        amount,
        reference: purchase.reference,
        buyer: {
          buyerName,
          buyerEmail,
          buyerPhone,
        },
        currency: "NGN",
      })

      return NextResponse.json(
        {
          message: "Ticket reserved",
          payment: {
            type: "free",
            reference: purchase.reference,
          },
        },
        { status: 200 }
      )
    }

    const purchase = await createPendingPurchase({
      ticketId,
      amount,
      quantity,
      buyer: {
        buyerName,
        buyerEmail,
        buyerPhone,
      },
    })

    const callbackUrl = new URL(`/tickets/${eventId}`, request.url)
    callbackUrl.searchParams.set("reference", purchase.reference)
    callbackUrl.searchParams.set("ticketId", ticketId)

    const payment = await initializePaystackTransaction({
      email: buyerEmail,
      amount: amount * 100,
      reference: purchase.reference,
      callback_url: callbackUrl.toString(),
      metadata: {
        eventId,
        ticketId,
        quantity,
        purchaseId: purchase.purchase.id,
        buyerName,
        buyerEmail,
        buyerPhone,
      },
    })

    return NextResponse.json(
      {
        message: "Payment initialized",
        payment,
          purchase: {
            id: purchase.purchase.id,
            reference: purchase.reference,
            ticketCode: purchase.ticketCode,
            amount,
            quantity,
          },
          event: serializePublicTicketEvent(event),
        },
        { status: 200 }
    )
  } catch (error) {
    console.error("Public ticket checkout POST error:", error)
    const message = error instanceof Error ? error.message : "Failed to initialize payment"
    return NextResponse.json({ message }, { status: 500 })
  }
}
