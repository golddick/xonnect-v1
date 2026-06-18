import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/db/prisma"
import { WebhookReceiver } from "livekit-server-sdk"

const db = prisma as any

function getLiveKitReceiver() {
  const apiKey = process.env.LIVEKIT_API_KEY
  const apiSecret = process.env.LIVEKIT_API_SECRET

  if (!apiKey || !apiSecret) {
    throw new Error("Missing LiveKit webhook credentials")
  }

  return new WebhookReceiver(apiKey, apiSecret)
}

function toDateFromSeconds(seconds: bigint | number) {
  return new Date(Number(seconds) * 1000)
}

async function findEventForWebhook(payload: {
  ingressId?: string
  roomName?: string
  streamKey?: string
  egressRoomName?: string
}) {
  const lookupRoomName = payload.roomName ?? payload.egressRoomName ?? null

  if (payload.ingressId) {
    const byIngress = await db.creatorEvent.findFirst({
      where: { ingressId: payload.ingressId },
    })
    if (byIngress) return byIngress
  }

  if (lookupRoomName) {
    const byRoom = await db.creatorEvent.findFirst({
      where: { livekitRoomName: lookupRoomName },
    })
    if (byRoom) return byRoom
  }

  if (payload.streamKey) {
    const byStreamKey = await db.creatorEvent.findFirst({
      where: { streamKey: payload.streamKey },
    })
    if (byStreamKey) return byStreamKey
  }

  return null
}

// LiveKit webhook receiver:
// verifies the request signature and updates the creator event state.
export async function POST(request: NextRequest) {
  try {
    const receiver = getLiveKitReceiver()
    const body = await request.text()
    const authHeader = request.headers.get("authorization") ?? request.headers.get("Authorization") ?? undefined
    const webhookEvent = await receiver.receive(body, authHeader)

    const event = await findEventForWebhook({
      ingressId: webhookEvent.ingressInfo?.ingressId,
      roomName: webhookEvent.ingressInfo?.roomName ?? webhookEvent.room?.name,
      streamKey: webhookEvent.ingressInfo?.streamKey,
      egressRoomName: webhookEvent.egressInfo?.roomName,
    })

    if (!event) {
      return NextResponse.json({ message: "Creator event not found for webhook" }, { status: 404 })
    }

    const now = toDateFromSeconds(webhookEvent.createdAt)
    const updates: Record<string, unknown> = {}

    if (webhookEvent.ingressInfo) {
      updates.ingressId = webhookEvent.ingressInfo.ingressId
      updates.streamKey = webhookEvent.ingressInfo.streamKey
      updates.rtmpUrl = webhookEvent.ingressInfo.url
      updates.livekitRoomName = webhookEvent.ingressInfo.roomName
    }

    switch (webhookEvent.event) {
      case "ingress_started":
        updates.status = "LIVE"
        updates.startedAt = now
        break
      case "ingress_ended":
        updates.status = "ENDED"
        updates.endedAt = now
        break
      case "room_started":
        updates.status = "LIVE"
        updates.startedAt = now
        break
      case "room_finished":
        updates.status = "ENDED"
        updates.endedAt = now
        break
      case "egress_started":
        updates.recordingEnabled = true
        updates.recordingStatus = "RECORDING"
        updates.recordingStartedAt = now
        if (webhookEvent.egressInfo) {
          updates.recordingAssetId = webhookEvent.egressInfo.egressId
        }
        break
      case "egress_updated":
        updates.recordingEnabled = true
        break
      case "egress_ended":
        updates.recordingEnabled = true
        updates.recordingStatus = "READY"
        updates.hasRecordedVideo = true
        updates.recordingEndedAt = now
        if (webhookEvent.egressInfo) {
          updates.recordingAssetId = webhookEvent.egressInfo.egressId
          if (webhookEvent.egressInfo.fileResults.length > 0) {
            updates.recordingUrl = webhookEvent.egressInfo.fileResults[0]?.location ?? null
          }
        }
        break
      default:
        break
    }

    const updated = await db.creatorEvent.update({
      where: { id: event.id },
      data: updates,
    })

    return NextResponse.json(
      {
        message: "LiveKit webhook processed",
        event: updated,
        webhookEvent: webhookEvent.event,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("LiveKit webhook error:", error)
    const message = error instanceof Error ? error.message : "Failed to process LiveKit webhook"
    return NextResponse.json({ message }, { status: 500 })
  }
}
