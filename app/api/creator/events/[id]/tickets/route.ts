import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { dropid } from "dropid"

const db = prisma as any

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

type CreateTicketBody = {
  ticketType?: string
  access?: "STREAM" | "VENUE" | "stream" | "venue"
  price?: number
  quantity?: number
  description?: string | null
  benefits?: string[]
}

const normalizeAccess = (value?: string | null) =>
  (value ?? "STREAM").toString().toUpperCase() === "VENUE" ? "VENUE" : "STREAM"

// POST /api/creator/events/:id/tickets
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const { id } = await params

    const body = (await request.json()) as CreateTicketBody

    if (!body.ticketType || body.ticketType.trim().length === 0) {
      return NextResponse.json({ message: "Ticket type is required" }, { status: 400 })
    }

    if (typeof body.price !== "number" || body.price < 0) {
      return NextResponse.json({ message: "Price must be a valid number" }, { status: 400 })
    }

    const event = await db.creatorEvent.findFirst({
      where: {
        id,
        creatorId: creatorResult.creatorId,
      },
      select: { id: true, title: true },
    })

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    const ticket = await db.creatorEventTicket.create({
      data: {
        id: dropid("ticket"),
        eventId: event.id,
        ticketType: body.ticketType.trim(),
        access: normalizeAccess(body.access),
        price: Math.round(body.price),
        quantity: typeof body.quantity === "number" ? Math.max(Math.round(body.quantity), 0) : 0,
        description: body.description?.trim() || null,
        benefits: body.benefits ?? [],
      },
    })

    return NextResponse.json(
      {
        message: "Ticket created",
        ticket,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Creator ticket create error:", error)
    return NextResponse.json({ message: "Failed to create ticket" }, { status: 500 })
  }
}

// GET /api/creator/events/:id/tickets
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const { id } = await params

    const event = await db.creatorEvent.findFirst({
      where: {
        id,
        creatorId: creatorResult.creatorId,
      },
      select: { id: true },
    })

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    const tickets = await db.creatorEventTicket.findMany({
      where: { eventId: event.id },
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json({ tickets }, { status: 200 })
  } catch (error) {
    console.error("Creator ticket list error:", error)
    return NextResponse.json({ message: "Failed to load tickets" }, { status: 500 })
  }
}
