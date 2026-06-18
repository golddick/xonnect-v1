import { NextResponse } from "next/server"

import { getAuthenticatedCheckInUser, markCheckInStats, parseCheckInPayload } from "@/lib/checkin-service"
import { prisma } from "@/lib/db/prisma"
import { dropid } from "dropid"

const db = prisma as any

export async function POST(request: Request) {
  try {
    const checkInUser = await getAuthenticatedCheckInUser(request)

    if (!checkInUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = (await request.json()) as { code?: string }
    const rawCode = body.code?.trim()

    if (!rawCode) {
      return NextResponse.json({ message: "Ticket code is required" }, { status: 400 })
    }

    const parsed = parseCheckInPayload(rawCode)
    const purchase = await db.creatorEventTicketPurchase.findFirst({
      where: {
        OR: [
          { ticketCode: parsed.ticketCode },
          ...(parsed.purchaseId ? [{ id: parsed.purchaseId }] : []),
        ],
        ticket: {
          eventId: checkInUser.event.id,
          access: "VENUE",
        },
      },
      include: {
        ticket: true,
      },
    })

    if (!purchase) {
      await db.creatorEventCheckInScan.create({
        data: {
          id: dropid("checkInScan"),
          eventId: checkInUser.event.id,
          checkInUserId: checkInUser.id,
          attendeeEmail: null,
          attendeeName: null,
          gateName: checkInUser.gateName,
          scannedCode: parsed.ticketCode,
          status: "INVALID",
          notes: "Ticket not found or not valid for this event",
        },
      })

      return NextResponse.json({ status: "invalid", message: "Ticket not found" }, { status: 404 })
    }

    if (purchase.checkedInAt) {
      await db.creatorEventCheckInScan.create({
        data: {
          eventId: checkInUser.event.id,
          checkInUserId: checkInUser.id,
          ticketPurchaseId: purchase.id,
          attendeeEmail: purchase.buyerEmail,
          attendeeName: purchase.buyerName,
          gateName: checkInUser.gateName,
          scannedCode: purchase.ticketCode,
          status: "DUPLICATE",
          notes: "Ticket already checked in",
        },
      })

      return NextResponse.json(
        {
          status: "already",
          message: "Ticket already checked in",
          attendeeName: purchase.buyerName,
          ticketCode: purchase.ticketCode,
        },
        { status: 200 }
      )
    }

    const now = new Date()

    await db.$transaction(async (tx: any) => {
      await tx.creatorEventTicketPurchase.update({
        where: { id: purchase.id },
        data: {
          checkedInAt: now,
          checkedInByUserId: checkInUser.id,
        },
      })

      await tx.creatorEventCheckInScan.create({
        data: {
          eventId: checkInUser.event.id,
          checkInUserId: checkInUser.id,
          ticketPurchaseId: purchase.id,
          attendeeEmail: purchase.buyerEmail,
          attendeeName: purchase.buyerName,
          gateName: checkInUser.gateName,
          scannedCode: purchase.ticketCode,
          status: "SUCCESS",
          notes: purchase.ticket.ticketType,
        },
      })
    })

    await markCheckInStats(checkInUser.id, now)

    return NextResponse.json(
      {
        status: "success",
        message: "Ticket checked in",
        attendeeName: purchase.buyerName,
        attendeeEmail: purchase.buyerEmail,
        ticketCode: purchase.ticketCode,
        ticketType: purchase.ticket.ticketType,
        access: purchase.ticket.access,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Check-in scan error:", error)
    return NextResponse.json({ message: "Failed to process ticket" }, { status: 500 })
  }
}

