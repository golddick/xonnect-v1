import { NextRequest, NextResponse } from "next/server"
import { AccessToken } from "livekit-server-sdk"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { getLiveKitConfig, buildEventRoomName } from "@/lib/livekit"

const db = prisma as any

async function getCreatorIdOrResponse() {
  const session = await auth()
  const role = session?.user?.role

  if (!session?.user?.email || role !== Role.CREATOR) {
    return { response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) }
  }

  const email = session.user.email.toLowerCase()
  const creator = await db.creator.findFirst({ where: { profile: { email } }, select: { id: true } })
  if (!creator) {
    return { response: NextResponse.json({ message: "Creator profile not found" }, { status: 404 }) }
  }

  return { creatorId: creator.id }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const { id } = await params

    const event = await db.creatorEvent.findFirst({ where: { id, creatorId: creatorResult.creatorId } })
    if (!event) return NextResponse.json({ message: "Event not found" }, { status: 404 })

    const config = getLiveKitConfig()
    const roomName = event.livekitRoomName ?? buildEventRoomName(event.id)
    const suffix = Math.random().toString(36).slice(2, 8)
    const identity = `creator-${event.id}-${creatorResult.creatorId}-${suffix}`

    const token = new AccessToken(config.apiKey, config.apiSecret, {
      identity,
      name: identity,
      metadata: JSON.stringify({ eventId: event.id, roomName, kind: "creator-publisher" }),
      ttl: "60m",
    })

    token.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true, canPublishData: true })

    return NextResponse.json(
      { roomName, wsUrl: config.wsUrl, token: await token.toJwt(), eventId: event.id },
      { status: 200 }
    )
  } catch (error) {
    console.error("Creator livekit token error:", error)
    const message = error instanceof Error ? error.message : "Failed to generate LiveKit token"
    return NextResponse.json({ message }, { status: 500 })
  }
}
