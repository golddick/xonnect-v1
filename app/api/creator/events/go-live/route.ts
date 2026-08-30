import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { dropid } from "dropid"
import { createEventIngress, buildEventRoomName, getLiveKitConfig } from "@/lib/livekit"
import { AccessToken } from "livekit-server-sdk"

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
    select: { id: true, profile: { select: { avatarUrl: true } } },
  })
  if (!creator) {
    return { response: NextResponse.json({ message: "Creator profile not found" }, { status: 404 }) }
  }

  return { creatorId: creator.id, avatarUrl: creator.profile?.avatarUrl ?? null, session }
}

export async function POST(request: NextRequest) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const body = await request.json()
    const title = String((body.title ?? "")).trim()
    const category = String((body.category ?? "")).trim() || "music"
    // Server-side recording is default-on; the go-live form can opt out.
    const recordingEnabled = body.recordingEnabled === undefined ? true : Boolean(body.recordingEnabled)

    if (!title) return NextResponse.json({ message: "Title is required" }, { status: 400 })

    const event = await db.creatorEvent.create({
      data: {
        id: dropid("event"),
        creatorId: creatorResult.creatorId,
        title,
        category,
        status: "LIVE",
        scheduledAt: new Date(),
        thumbnailUrl: creatorResult.avatarUrl ?? null,
        recordingEnabled,
        recordingStatus: recordingEnabled ? "PENDING" : "DISABLED",
      },
    })

    const created = await createEventIngress({ eventId: event.id, creatorId: creatorResult.creatorId, title })

    const updated = await db.creatorEvent.update({
      where: { id: event.id },
      data: {
        ingressId: created.ingressId,
        streamKey: created.streamKey,
        rtmpUrl: created.rtmpUrl,
        livekitRoomName: created.roomName,
      },
    })

    // generate access token for creator publisher
    const config = getLiveKitConfig()
    const identity = `creator-${updated.id}-${creatorResult.creatorId}`
    const token = new AccessToken(config.apiKey, config.apiSecret, {
      identity,
      name: identity,
      metadata: JSON.stringify({ eventId: updated.id, roomName: created.roomName, kind: "creator-publisher" }),
      ttl: "60m",
    })
    token.addGrant({ roomJoin: true, room: created.roomName, canPublish: true, canSubscribe: true, canPublishData: true })

    return NextResponse.json(
      {
        event: updated,
        livekit: {
          ingressId: created.ingressId,
          streamKey: created.streamKey,
          rtmpUrl: created.rtmpUrl,
          roomName: created.roomName,
          wsUrl: created.livekitWsUrl,
          token: await token.toJwt(),
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Go-live endpoint error:", error)
    const message = error instanceof Error ? error.message : "Failed to start live"
    return NextResponse.json({ message }, { status: 500 })
  }
}
