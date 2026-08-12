import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

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

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const { id } = await params
    const event = await db.creatorEvent.findFirst({
      where: { id, creatorId: creatorResult.creatorId },
      select: { id: true, status: true },
    })

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    if (event.status !== "LIVE" && event.status !== "PAUSED") {
      return NextResponse.json(
        { message: "Only live or paused events can be ended" },
        { status: 409 }
      )
    }

    const updated = await db.creatorEvent.update({
      where: { id: event.id },
      data: {
        status: "ENDED",
        endedAt: new Date(),
      },
    })

    return NextResponse.json({ event: updated }, { status: 200 })
  } catch (error) {
    console.error("End live event error:", error)
    const message = error instanceof Error ? error.message : "Failed to end live event"
    return NextResponse.json({ message }, { status: 500 })
  }
}
