import {
  IngressClient,
  IngressInput,
  EgressClient,
  EncodedFileOutput,
  EncodedFileType,
  S3Upload,
  RoomServiceClient,
} from "livekit-server-sdk"

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

type SupabaseS3Config = {
  endpoint: string
  region: string
  accessKey: string
  secret: string
  bucket: string
}

function getSupabaseS3Config(): SupabaseS3Config {
  const endpoint = process.env.SUPABASE_S3_ENDPOINT
  const region = process.env.SUPABASE_S3_REGION
  const accessKey = process.env.SUPABASE_S3_ACCESS_KEY
  const secret = process.env.SUPABASE_S3_SECRET
  const bucket = process.env.SUPABASE_RECORDINGS_BUCKET

  if (!endpoint || !region || !accessKey || !secret || !bucket) {
    throw new Error(
      "Missing Supabase S3 env vars (SUPABASE_S3_ENDPOINT, SUPABASE_S3_REGION, SUPABASE_S3_ACCESS_KEY, SUPABASE_S3_SECRET, SUPABASE_RECORDINGS_BUCKET)"
    )
  }

  return { endpoint, region, accessKey, secret, bucket }
}

// Starts a Room Composite egress that records everything published to the room —
// browser WebRTC OR OBS RTMP ingress — into a single MP4 uploaded straight to the
// private Supabase bucket. Returns the egressId to persist on the event.
export async function startEventEgress(input: {
  eventId: string
  roomName: string
}): Promise<{ egressId: string; filepath: string }> {
  const config = getLiveKitConfig()
  const s3 = getSupabaseS3Config()
  const client = new EgressClient(config.apiUrl, config.apiKey, config.apiSecret)

  // Bucket-relative object key. `{time}` is resolved by LiveKit and reported back in
  // fileResults[].filename on egress_ended — that resolved value is what we persist.
  const filepath = `event-recordings/${input.eventId}/${input.eventId}-{time}.mp4`

  const fileOutput = new EncodedFileOutput({
    fileType: EncodedFileType.MP4,
    filepath,
    output: {
      case: "s3",
      value: new S3Upload({
        accessKey: s3.accessKey,
        secret: s3.secret,
        region: s3.region,
        endpoint: s3.endpoint,
        bucket: s3.bucket,
        forcePathStyle: true, // required for Supabase's S3-compatible endpoint
      }),
    },
  })

  // "speaker" is the default composite layout; swap for a custom `customBaseUrl`
  // template later if the camera/screen arrangement needs tuning.
  const info = await client.startRoomCompositeEgress(
    input.roomName,
    { file: fileOutput },
    { layout: "speaker" }
  )

  return { egressId: info.egressId, filepath }
}

export async function stopEventEgress(egressId: string): Promise<void> {
  const config = getLiveKitConfig()
  const client = new EgressClient(config.apiUrl, config.apiKey, config.apiSecret)
  await client.stopEgress(egressId)
}

// Closes the LiveKit room, which disconnects any lingering viewers and (as a
// belt-and-suspenders alongside an explicit stopEventEgress) triggers egress to
// finalize + a room_finished webhook. Best-effort: callers wrap in try/catch.
export async function deleteEventRoom(roomName: string): Promise<void> {
  const config = getLiveKitConfig()
  const client = new RoomServiceClient(config.apiUrl, config.apiKey, config.apiSecret)
  await client.deleteRoom(roomName)
}
