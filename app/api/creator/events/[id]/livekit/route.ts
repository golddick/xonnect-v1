import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { buildEventRoomName, createEventIngress } from "@/lib/livekit"

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

// POST /api/creator/events/:id/livekit
// Generates LiveKit ingress details only when the creator explicitly requests them.
export async function POST(
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
      select: {
        id: true,
        title: true,
        ingressId: true,
        streamKey: true,
        rtmpUrl: true,
        livekitRoomName: true,
      },
    })

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    if (event.ingressId && event.streamKey && event.rtmpUrl && event.livekitRoomName) {
      return NextResponse.json(
        {
          message: "LiveKit ingress already exists for this event",
          event,
          roomName: event.livekitRoomName,
        },
        { status: 200 }
      )
    }

    const created = await createEventIngress({
      eventId: event.id,
      creatorId: creatorResult.creatorId,
      title: event.title,
    })

    const updated = await db.creatorEvent.update({
      where: { id: event.id },
      data: {
        ingressId: created.ingressId,
        streamKey: created.streamKey,
        rtmpUrl: created.rtmpUrl,
        livekitRoomName: created.roomName,
      },
    })

    return NextResponse.json(
      {
        message: "LiveKit ingress generated",
        event: updated,
        livekit: {
          ingressId: created.ingressId,
          streamKey: created.streamKey,
          rtmpUrl: created.rtmpUrl,
          roomName: created.roomName,
          wsUrl: created.livekitWsUrl,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Creator event livekit generation error:", error)
    const message =
      error instanceof Error ? error.message : "Failed to generate LiveKit ingress"

    return NextResponse.json({ message }, { status: 500 })
  }
}
