import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { dropid } from "dropid"

const db = prisma as any

type CreateEventBody = {
  title?: string
  description?: string | null
  category?: string | null
  status?: "draft" | "scheduled" | "live" | "ended" | "cancelled"
  isPrivate?: boolean
  isPaid?: boolean
  requireTicket?: boolean
  enableDonations?: boolean
  enableLocationRestriction?: boolean
  locationRestrictionType?: "block" | "allow"
  address?: string | null
  locationName?: string | null
  locationCountry?: string | null
  locationState?: string | null
  locationType?: "country" | "state" | "city" | "address" | null
  locationLat?: number | null
  locationLon?: number | null
  locationFullAddress?: string | null
  thumbnailUrl?: string | null
  thumbnailFileId?: string | null
  thumbnailVideoUrl?: string | null
  thumbnailVideoFileId?: string | null
  recordedVideoUrl?: string | null
  recordedVideoFileId?: string | null
  recordingEnabled?: boolean
  recordingStatus?: "disabled" | "pending" | "recording" | "processing" | "ready" | "failed"
  recordingUrl?: string | null
  timezone?: string | null
  scheduledAt?: string | null
  durationMinutes?: number | null
  maxViewers?: number | null
  estimatedUsers?: number | null
  tags?: string[]
  restrictedLocations?: Array<{
    name: string
    country: string
    state?: string | null
    lat?: number | null
    lon?: number | null
    type?: "country" | "state" | "city" | "address"
    fullAddress?: string | null
  }>
}

const toEventStatus = (value?: string | null) => {
  switch ((value ?? "").toLowerCase()) {
    case "draft":
      return "DRAFT"
    case "live":
      return "LIVE"
    case "ended":
      return "ENDED"
    case "cancelled":
      return "CANCELLED"
    case "scheduled":
    default:
      return "SCHEDULED"
  }
}

const toRestrictionMode = (value?: string | null) => {
  return (value ?? "").toLowerCase() === "allow" ? "ALLOW" : "BLOCK"
}

const toLocationType = (value?: string | null) => {
  switch ((value ?? "").toLowerCase()) {
    case "country":
      return "COUNTRY"
    case "state":
      return "STATE"
    case "address":
      return "ADDRESS"
    case "city":
    default:
      return "CITY"
  }
}

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

// Creator: create a creator event without provisioning LiveKit yet.
// POST /api/creator/events
export async function POST(request: NextRequest) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const body = (await request.json()) as CreateEventBody

    if (!body.title || typeof body.title !== "string" || body.title.trim().length === 0) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 })
    }

    const scheduledAt = body.scheduledAt ? new Date(body.scheduledAt) : null
    if (scheduledAt && Number.isNaN(scheduledAt.getTime())) {
      return NextResponse.json({ message: "scheduledAt must be a valid date" }, { status: 400 })
    }

    const creatorEvent = await db.creatorEvent.create({
      data: {
        id: dropid("event"),
        creatorId: creatorResult.creatorId,
        title: body.title.trim(),
        description: body.description?.trim() || null,
        category: body.category?.trim() || "music",
        status: toEventStatus(body.status),
        isPrivate: body.isPrivate ?? false,
        isPaid: body.isPaid ?? false,
        requireTicket: body.requireTicket ?? false,
        enableDonations: body.enableDonations ?? false,
        enableLocationRestriction: body.enableLocationRestriction ?? false,
        locationRestrictionType: toRestrictionMode(body.locationRestrictionType),
        address: body.address?.trim() || null,
        locationName: body.locationName?.trim() || null,
        locationCountry: body.locationCountry?.trim() || null,
        locationState: body.locationState?.trim() || null,
        locationType: body.locationType ? toLocationType(body.locationType) : null,
        locationLat: typeof body.locationLat === "number" ? body.locationLat : null,
        locationLon: typeof body.locationLon === "number" ? body.locationLon : null,
        locationFullAddress: body.locationFullAddress?.trim() || null,
        thumbnailUrl: body.thumbnailUrl?.trim() || null,
        thumbnailFileId: body.thumbnailFileId?.trim() || null,
        thumbnailVideoUrl: body.thumbnailVideoUrl?.trim() || null,
        thumbnailVideoFileId: body.thumbnailVideoFileId?.trim() || null,
        recordedVideoUrl: body.recordedVideoUrl?.trim() || null,
        recordedVideoFileId: body.recordedVideoFileId?.trim() || null,
        streamKey: null,
        rtmpUrl: null,
        ingressId: null,
        livekitRoomName: null,
        recordingEnabled: body.recordingEnabled ?? false,
        recordingStatus: body.recordingStatus ? body.recordingStatus.toUpperCase() : "DISABLED",
        recordingAssetId: null,
        recordingUrl: body.recordingUrl?.trim() || null,
        recordingFileId: null,
        recordingStartedAt: null,
        recordingEndedAt: null,
        hasRecordedVideo: false,
        timezone: body.timezone?.trim() || "Africa/Lagos",
        scheduledAt,
        durationMinutes: typeof body.durationMinutes === "number" ? body.durationMinutes : 60,
        maxViewers:
          typeof body.maxViewers === "number" && body.maxViewers > 0
            ? body.maxViewers
            : null,
        estimatedUsers: typeof body.estimatedUsers === "number" ? body.estimatedUsers : null,
        tags: body.tags ?? [],
        restrictedLocations: body.restrictedLocations?.length
          ? {
              create: body.restrictedLocations.map((location) => ({
                name: location.name.trim(),
                country: location.country.trim(),
                state: location.state?.trim() || null,
                lat: typeof location.lat === "number" ? location.lat : null,
                lon: typeof location.lon === "number" ? location.lon : null,
                locationType: toLocationType(location.type ?? "city"),
                fullAddress: location.fullAddress?.trim() || null,
              })),
            }
          : undefined,
      },
      include: {
        restrictedLocations: true,
      },
    })

    return NextResponse.json(
      {
        event: creatorEvent,
        livekitProvisioning: "pending",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Creator event create error:", error)
    return NextResponse.json({ message: "Failed to create creator event" }, { status: 500 })
  }
}

// Creator: list created events for template selectors, event management, and dashboards.
// GET /api/creator/events
export async function GET(request: NextRequest) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")?.trim()

    const where: any = { creatorId: creatorResult.creatorId }

    if (status && status.toLowerCase() !== "all") {
      where.status = toEventStatus(status)
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    const events = await db.creatorEvent.findMany({
      where,
      orderBy: [{ scheduledAt: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        status: true,
        isPrivate: true,
        isPaid: true,
        requireTicket: true,
        enableDonations: true,
        enableLocationRestriction: true,
        locationRestrictionType: true,
        address: true,
        locationName: true,
        locationCountry: true,
        locationState: true,
        locationType: true,
        locationLat: true,
        locationLon: true,
        locationFullAddress: true,
        thumbnailUrl: true,
        scheduledAt: true,
        durationMinutes: true,
        maxViewers: true,
        estimatedUsers: true,
        tags: true,
        streamKey: true,
        ingressId: true,
        livekitRoomName: true,
        recordingEnabled: true,
        recordingStatus: true,
        hasRecordedVideo: true,
        viewsCount: true,
        likesCount: true,
        commentsCount: true,
        peakViewersCount: true,
        currentViewersCount: true,
        venueParticipantCount: true,
        revenue: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            tickets: true,
            checkInUsers: true,
            restrictedLocations: true,
            checkInScans: true,
          },
        },
      },
    })

    return NextResponse.json({ events }, { status: 200 })
  } catch (error) {
    console.error("Creator event list error:", error)
    return NextResponse.json({ message: "Failed to load creator events" }, { status: 500 })
  }
}
