import { IngressClient, IngressInput } from "livekit-server-sdk"

export type LiveKitConfig = {
  apiUrl: string
  apiKey: string
  apiSecret: string
  wsUrl: string | null
}

export function getLiveKitConfig(): LiveKitConfig {
  const apiUrl = process.env.LIVEKIT_API_URL
  const apiKey = process.env.LIVEKIT_API_KEY
  const apiSecret = process.env.LIVEKIT_API_SECRET
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_WS_URL ?? null

  if (!apiUrl || !apiKey || !apiSecret) {
    throw new Error("Missing LiveKit environment variables")
  }

  return { apiUrl, apiKey, apiSecret, wsUrl }
}

export function buildEventRoomName(eventId: string) {
  return `creator-event-${eventId}`
}

export async function createEventIngress(input: {
  eventId: string
  creatorId: string
  title: string
}) {
  const config = getLiveKitConfig()
  const client = new IngressClient(config.apiUrl, config.apiKey, config.apiSecret)
  const roomName = buildEventRoomName(input.eventId)
  const metadata = JSON.stringify({
    eventId: input.eventId,
    creatorId: input.creatorId,
    roomName,
  })

  const ingress = await client.createIngress(IngressInput.RTMP_INPUT, {
    name: input.title,
    roomName,
    participantIdentity: `ingress-${input.eventId}`,
    participantName: `${input.title} Ingress`,
    participantMetadata: metadata,
    enableTranscoding: true,
  })

  return {
    roomName,
    ingressId: ingress.ingressId,
    streamKey: ingress.streamKey,
    rtmpUrl: ingress.url,
    livekitWsUrl: config.wsUrl,
    ingress,
  }
}
