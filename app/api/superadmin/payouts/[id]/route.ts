import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { sendCreatorPayoutStatusEmail } from "@/lib/auth/notifications"
import { dropid } from "dropid"

function assertAuthorized(role?: Role | null) {
  return role === Role.ADMIN || role === Role.SUPERADMIN
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    const user = session?.user

    if (!user?.email || !assertAuthorized(user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const action = typeof body.action === "string" ? body.action : null
    const note = typeof body.note === "string" ? body.note.trim() : null
    const receiptUrl = typeof body.receiptUrl === "string" ? body.receiptUrl : null

    const payoutRequest = await prisma.creatorPayoutRequest.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            profile: {
              select: {
                id: true,
                email: true,
                fullName: true,
              },
            },
          },
        },
      },
    })

    if (!payoutRequest) {
      return NextResponse.json({ message: "Payout request not found" }, { status: 404 })
    }

    if (action === "approve") {
      const updated = await prisma.creatorPayoutRequest.update({
        where: { id },
        data: {
          status: "processing",
          note: note ?? payoutRequest.note,
          processedAt: new Date(),
        },
      })

      await sendCreatorPayoutStatusEmail({
        email: payoutRequest.creator.profile?.email ?? "",
        fullName: payoutRequest.creator.profile?.fullName,
        amount: payoutRequest.amount,
        status: "approved",
        note: note ?? "Your payout request has been approved and is being processed.",
      })

      return NextResponse.json({ payoutRequest: updated, message: "Payout approved" }, { status: 200 })
    }

    if (action === "complete") {
      if (!receiptUrl) {
        return NextResponse.json({ message: "Receipt is required before completing this payout" }, { status: 400 })
      }

      const updated = await prisma.creatorPayoutRequest.update({
        where: { id },
        data: {
          status: "completed",
          note: note ?? payoutRequest.note,
          receiptUrl,
          processedAt: payoutRequest.processedAt ?? new Date(),
        },
      })

      await sendCreatorPayoutStatusEmail({
        email: payoutRequest.creator.profile?.email ?? "",
        fullName: payoutRequest.creator.profile?.fullName,
        amount: payoutRequest.amount,
        status: "completed",
        note: note ?? "Your payout has been completed.",
        receiptUrl,
      })

      return NextResponse.json({ payoutRequest: updated, message: "Payout completed" }, { status: 200 })
    }

    if (action === "reject") {
      const updated = await prisma.creatorPayoutRequest.update({
        where: { id },
        data: {
          status: "rejected",
          note: note ?? payoutRequest.note,
          processedAt: new Date(),
        },
      })

      await sendCreatorPayoutStatusEmail({
        email: payoutRequest.creator.profile?.email ?? "",
        fullName: payoutRequest.creator.profile?.fullName,
        amount: payoutRequest.amount,
        status: "rejected",
        note: note ?? "Your payout request was rejected.",
      })

      return NextResponse.json({ payoutRequest: updated, message: "Payout rejected" }, { status: 200 })
    }

    if (action === "upload-receipt") {
      if (!receiptUrl) {
        return NextResponse.json({ message: "Receipt URL is required" }, { status: 400 })
      }

      const updated = await prisma.creatorPayoutRequest.update({
        where: { id },
        data: {
          receiptUrl,
          note: note ?? payoutRequest.note,
        },
      })

      return NextResponse.json({ payoutRequest: updated, message: "Receipt uploaded" }, { status: 200 })
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Superadmin payout action error:", error)
    return NextResponse.json({ message: "Failed to update payout request" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    const user = session?.user

    if (!user?.email || !assertAuthorized(user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const contentType = request.headers.get("content-type") || ""
    let receiptUrl: string | null = null

    if (contentType.includes("application/json")) {
      const body = await request.json().catch(() => ({}))
      receiptUrl = typeof body?.receiptUrl === "string" ? body.receiptUrl.trim() : null
    } else {
      const formData = await request.formData()
      const formReceiptUrl = formData.get("receiptUrl")
      receiptUrl = typeof formReceiptUrl === "string" ? formReceiptUrl.trim() : null
    }

    if (!receiptUrl) {
      return NextResponse.json({ message: "Receipt URL is required" }, { status: 400 })
    }

    const payoutRequest = await prisma.creatorPayoutRequest.findUnique({ where: { id } })
    if (!payoutRequest) {
      return NextResponse.json({ message: "Payout request not found" }, { status: 404 })
    }

    const updated = await prisma.creatorPayoutRequest.update({
      where: { id },
      data: {
        receiptUrl,
        transactionId: payoutRequest.transactionId ?? dropid("payout_receipt"),
      },
    })

    return NextResponse.json({ payoutRequest: updated, receiptUrl }, { status: 200 })
  } catch (error) {
    console.error("Superadmin payout receipt upload error:", error)
    return NextResponse.json({ message: "Receipt upload failed" }, { status: 500 })
  }
}
