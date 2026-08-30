import { NextResponse } from "next/server"

import {
  findVenueTicketByCode,
  getScanActor,
  parseCheckInPayload,
} from "@/lib/checkin-service"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { code?: string; cameraToken?: string }
    const checkInUser = await getScanActor(request, body.cameraToken)

    if (!checkInUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const rawCode = body.code?.trim()

    if (!rawCode) {
      return NextResponse.json({ message: "Ticket code is required" }, { status: 400 })
    }

    const parsed = parseCheckInPayload(rawCode)
    const { ticketItem, purchase } = await findVenueTicketByCode(checkInUser.event.id, parsed)

    if (!purchase) {
      return NextResponse.json(
        { status: "invalid", message: "Ticket not found or not valid for this event" },
        { status: 200 }
      )
    }

    const checkedInItem = ticketItem?.checkedInAt ? ticketItem : null
    const duplicateTarget = checkedInItem ?? (purchase.quantity === 1 && purchase.checkedInAt ? purchase : null)
    const alreadyCheckedIn = Boolean(duplicateTarget)
    const checkedInAt = checkedInItem?.checkedInAt ?? (purchase.quantity === 1 ? purchase.checkedInAt : null)

    return NextResponse.json(
      {
        status: alreadyCheckedIn ? "already" : "ok",
        ticketCode: ticketItem?.ticketCode ?? purchase.ticketCode,
        attendeeName: purchase.buyerName,
        attendeeEmail: purchase.buyerEmail,
        ticketType: purchase.ticket.ticketType,
        access: purchase.ticket.access,
        alreadyCheckedIn,
        checkedInAt: checkedInAt ? new Date(checkedInAt).toISOString() : null,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Check-in lookup error:", error)
    return NextResponse.json({ message: "Failed to look up ticket" }, { status: 500 })
  }
}
