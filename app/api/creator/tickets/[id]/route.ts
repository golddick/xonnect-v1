import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

const db = prisma as any

function normalizeAccess(value?: string | null) {
  return (value ?? "STREAM").toString().toUpperCase() === "VENUE" ? "VENUE" : "STREAM"
}

function parseBenefits(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean)
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

async function getCreatorIdOrResponse() {
  const session = await auth()
  const role = session?.user?.role

  if (!session?.user?.email || role !== Role.CREATOR) {
    return { response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) }
  }

  const email = session.user.email.toLowerCase()
  const creator = await db.creator.findFirst({
    where: { profile: { email } },
    select: { id: true },
  })

  if (!creator) {
    return { response: NextResponse.json({ message: "Creator profile not found" }, { status: 404 }) }
  }

  return { creatorId: creator.id }
}

async function getTicketWithOwnership(creatorId: string, ticketId: string) {
  return db.creatorEventTicket.findFirst({
    where: {
      id: ticketId,
      event: {
        creatorId,
      },
    },
    include: {
      event: true,
      purchases: {
        orderBy: { purchasedAt: "desc" },
      },
    },
  })
}

// GET /api/creator/tickets/:id
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const { id } = await params
    const ticket = await getTicketWithOwnership(creatorResult.creatorId, id)

    if (!ticket) {
      return NextResponse.json({ message: "Ticket not found" }, { status: 404 })
    }

    return NextResponse.json({ ticket }, { status: 200 })
  } catch (error) {
    console.error("Creator ticket GET error:", error)
    return NextResponse.json({ message: "Failed to load ticket" }, { status: 500 })
  }
}

// PUT /api/creator/tickets/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const { id } = await params
    const ticket = await getTicketWithOwnership(creatorResult.creatorId, id)

    if (!ticket) {
      return NextResponse.json({ message: "Ticket not found" }, { status: 404 })
    }

    const now = new Date()
    if (ticket.event.status === "LIVE" || ticket.event.status === "ENDED") {
      return NextResponse.json({ message: "Live or ended events cannot be edited" }, { status: 409 })
    }

    if (ticket.event.scheduledAt && ticket.event.scheduledAt <= now) {
      return NextResponse.json({ message: "Past events cannot be edited" }, { status: 409 })
    }

    const body = (await request.json()) as {
      ticketType?: string
      access?: string
      price?: number
      quantity?: number
      description?: string | null
      benefits?: unknown
      status?: string | null
    }

    if (!body.ticketType || body.ticketType.trim().length === 0) {
      return NextResponse.json({ message: "Ticket type is required" }, { status: 400 })
    }

    if (typeof body.price !== "number" || body.price < 0) {
      return NextResponse.json({ message: "Price must be a valid number" }, { status: 400 })
    }

    const quantity = typeof body.quantity === "number" ? Math.max(Math.round(body.quantity), 0) : ticket.quantity
    if (quantity < ticket.soldCount) {
      return NextResponse.json(
        { message: "Quantity cannot be lower than tickets already sold" },
        { status: 400 }
      )
    }

    const updated = await db.creatorEventTicket.update({
      where: { id: ticket.id },
      data: {
        ticketType: body.ticketType.trim(),
        access: normalizeAccess(body.access),
        price: Math.round(body.price),
        quantity,
        description: body.description?.trim() || null,
        benefits: parseBenefits(body.benefits ?? []),
        status:
          (body.status ?? ticket.status).toString().toUpperCase() === "PAUSED"
            ? "PAUSED"
            : (body.status ?? ticket.status).toString().toUpperCase() === "SOLD_OUT"
            ? "SOLD_OUT"
            : (body.status ?? ticket.status).toString().toUpperCase() === "ARCHIVED"
            ? "ARCHIVED"
            : "ACTIVE",
      },
    })

    return NextResponse.json({ ticket: updated }, { status: 200 })
  } catch (error) {
    console.error("Creator ticket PUT error:", error)
    return NextResponse.json({ message: "Failed to update ticket" }, { status: 500 })
  }
}

// DELETE /api/creator/tickets/:id
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const { id } = await params
    const ticket = await getTicketWithOwnership(creatorResult.creatorId, id)

    if (!ticket) {
      return NextResponse.json({ message: "Ticket not found" }, { status: 404 })
    }

    if (ticket.event.status === "LIVE") {
      return NextResponse.json({ message: "Live tickets cannot be deleted" }, { status: 409 })
    }

    await db.creatorEventTicket.delete({
      where: { id: ticket.id },
    })

    return NextResponse.json({ message: "Ticket deleted" }, { status: 200 })
  } catch (error) {
    console.error("Creator ticket DELETE error:", error)
    return NextResponse.json({ message: "Failed to delete ticket" }, { status: 500 })
  }
}
