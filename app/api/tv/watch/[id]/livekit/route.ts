import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { AccessToken } from "livekit-server-sdk"

import { getLiveKitConfig, buildEventRoomName } from "@/lib/livekit"
import { loadEventWatchData } from "@/lib/tv/event-watch"

export const dynamic = "force-dynamic"
 
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const accessCode = searchParams.get("accessCode")?.trim() ?? null

    const result = await loadEventWatchData(id, { accessCode })
    if (!result.event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    if (!result.event.access.accessGranted) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 })
    }

    const config = getLiveKitConfig()
    const roomName = result.event.livekitRoomName ?? buildEventRoomName(result.event.id)
    const suffix = randomUUID().slice(0, 8)
    const identity = result.event.access.loggedIn
      ? `viewer-${result.event.id}-${suffix}`
      : accessCode
        ? `guest-${result.event.id}-${accessCode.slice(0, 8)}-${suffix}`
        : `guest-${result.event.id}-${suffix}`
    const token = new AccessToken(config.apiKey, config.apiSecret, {
      identity,
      name: result.event.access.loggedIn ? undefined : "Event viewer",
      metadata: JSON.stringify({
        eventId: result.event.id,
        roomName,
        kind: "event-viewer",
      }),
      ttl: "10m",
    })

    token.addGrant({
      roomJoin: true,
      room: roomName,
      canSubscribe: true,
      canPublish: false,
      canPublishData: false,
    })

    return NextResponse.json(
      {
        roomName,
        wsUrl: config.wsUrl,
        token: await token.toJwt(),
        eventId: result.event.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("TV event LiveKit GET error:", error)
    const message = error instanceof Error ? error.message : "Failed to generate LiveKit token"
    return NextResponse.json({ message }, { status: 500 })
  }
}
