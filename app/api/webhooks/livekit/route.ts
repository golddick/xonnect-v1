import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/db/prisma"
import { WebhookReceiver } from "livekit-server-sdk"
import { sendEventLiveNotificationEmail } from "@/lib/auth/notifications"

const db = prisma 

function getLiveKitReceiver() {
  const apiKey = (process.env.LIVEKIT_API_KEY ?? process.env.LIVEKIT_WEBHOOK_API_KEY)?.trim()
  const apiSecret = (process.env.LIVEKIT_API_SECRET ?? process.env.LIVEKIT_WEBHOOK_SECRET)?.trim()

  if (!apiKey || !apiSecret) { 
    throw new Error(
      `Missing LiveKit webhook credentials. Set LIVEKIT_API_KEY and LIVEKIT_API_SECRET, or LIVEKIT_WEBHOOK_API_KEY and LIVEKIT_WEBHOOK_SECRET.`
    )
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

    const webhookTimestamp = now.getTime()
    const isStaleWebhook = Boolean(event.updatedAt && webhookTimestamp < event.updatedAt.getTime())

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
        if (!isStaleWebhook) {
          updates.status = "LIVE"
          updates.startedAt = now
          updates.currentViewersCount = 0
        }
        break
      case "room_finished":
        if (!isStaleWebhook) {
          updates.status = "ENDED"
          updates.endedAt = now
          updates.currentViewersCount = 0
        }
        break
      case "participant_joined":
        {
          const joinedViewers = typeof webhookEvent.room?.numParticipants === "number" && webhookEvent.room.numParticipants >= 0
            ? webhookEvent.room.numParticipants
            : (event.currentViewersCount ?? 0) + 1

          updates.currentViewersCount = joinedViewers
          updates.viewsCount = { increment: 1 }
          updates.peakViewersCount = Math.max(event.peakViewersCount ?? 0, joinedViewers)
        }
        break
      case "participant_left":
      case "participant_connection_aborted":
        {
          const currentViewers = typeof webhookEvent.room?.numParticipants === "number" && webhookEvent.room.numParticipants >= 0
            ? webhookEvent.room.numParticipants
            : Math.max((event.currentViewersCount ?? 0) - 1, 0)

          updates.currentViewersCount = currentViewers
          updates.peakViewersCount = Math.max(event.peakViewersCount ?? 0, currentViewers)
        }
        break
      case "egress_started":
      case "egress_updated":
      case "egress_ended":
        break
      default:
        break
    }

    const updated = await db.creatorEvent.update({
      where: { id: event.id },
      data: updates,
    })

    if (updated.status === "LIVE" && event.status !== "LIVE") {
      const followers = await db.creatorFollow.findMany({
        where: { creatorId: updated.creatorId, status: "active" },
        select: { followerProfile: { select: { email: true, fullName: true } } },
      })

        const notificationPromises = followers.map((follow) =>
          sendEventLiveNotificationEmail({
            email: follow.followerProfile.email,
            fullName: follow.followerProfile.fullName ?? null,
            eventId: updated.id,
            eventTitle: updated.title,
            eventScheduledAt: updated.scheduledAt?.toISOString() ?? null,
            location:
              updated.locationFullAddress ?? updated.locationName ?? updated.address ?? updated.locationCountry ?? null,
            watchUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/tv/watch/event/${updated.id}`,
            isTicketHolder: false,
          }).catch((error) => {
            console.error("Failed to send live notification to follower:", error)
          })
        )

        const ticketPurchasers = await db.creatorEventTicketPurchase.findMany({
          where: { status: "COMPLETED", ticket: { eventId: updated.id } },
          select: { buyerEmail: true, buyerName: true, ticketCode: true },
        })

        for (const purchaser of ticketPurchasers) {
          notificationPromises.push(
            sendEventLiveNotificationEmail({
              email: purchaser.buyerEmail,
              fullName: purchaser.buyerName ?? null,
              eventId: updated.id,
              eventTitle: updated.title,
              eventScheduledAt: updated.scheduledAt?.toISOString() ?? null,
              location:
                updated.locationFullAddress ?? updated.locationName ?? updated.address ?? updated.locationCountry ?? null,
              watchUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/tv/watch/event/${updated.id}`,
              ticketCode: purchaser.ticketCode,
              isTicketHolder: true,
            }).catch((error) => {
              console.error("Failed to send live notification to ticket purchaser:", error)
            })
          )
        }

        await Promise.allSettled(notificationPromises)
      }

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
