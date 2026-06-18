import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { hashPassword } from "@/lib/auth/password"
import { sendCheckInCredentialsEmail } from "@/lib/auth/notifications"
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

type CreateCheckInUserBody = {
  name?: string
  email?: string
  gate?: string
  status?: "Active" | "Inactive" | "ACTIVE" | "INACTIVE"
}

const randomPassword = () => Math.random().toString(36).slice(-8)

// POST /api/creator/events/:id/checkin-users
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const { id } = await params

    const body = (await request.json()) as CreateCheckInUserBody

    if (!body.name || body.name.trim().length === 0) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 })
    }

    if (!body.email || body.email.trim().length === 0) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    if (!body.gate || body.gate.trim().length === 0) {
      return NextResponse.json({ message: "Gate is required" }, { status: 400 })
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

    const tempPassword = randomPassword()
    const passwordHash = hashPassword(tempPassword)
    const normalizedEmail = body.email.trim().toLowerCase()

    const user = await db.creatorEventCheckInUser.create({
      data: {
        id: dropid("checkin_user"),
        creatorId: creatorResult.creatorId,
        eventId: event.id,
        fullName: body.name.trim(),
        email: normalizedEmail,
        username: `${body.name.trim().toLowerCase().replace(/\s+/g, "_")}_${Math.floor(Math.random() * 1000)}`,
        passwordHash,
        tempPasswordHash: passwordHash,
        gateName: body.gate.trim(),
        status:
          (body.status ?? "ACTIVE").toString().toUpperCase() === "INACTIVE"
            ? "INACTIVE"
            : "ACTIVE",
        mustChangePassword: true,
      },
    })

    try {
      await sendCheckInCredentialsEmail({
        email: normalizedEmail,
        fullName: user.fullName,
        eventTitle: event.title,
        gateName: user.gateName,
        username: user.username,
        password: tempPassword,
      })
    } catch (emailError) {
      console.error("Failed to send check-in credential email:", emailError)
    }

    return NextResponse.json(
      {
        message: "Check-in user created",
        user,
        credentials: {
          username: user.username,
          password: tempPassword,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Creator check-in user create error:", error)
    return NextResponse.json({ message: "Failed to create check-in user" }, { status: 500 })
  }
}

// GET /api/creator/events/:id/checkin-users
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

    const users = await db.creatorEventCheckInUser.findMany({
      where: { eventId: event.id },
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    console.error("Creator check-in user list error:", error)
    return NextResponse.json({ message: "Failed to load check-in users" }, { status: 500 })
  }
}
