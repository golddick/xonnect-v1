import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

const db = prisma as any

type EventStatusInput = "draft" | "scheduled" | "live" | "ended" | "cancelled"
type RecordingStatusInput = "disabled" | "pending" | "recording" | "processing" | "ready" | "failed"

function normalizeEventStatus(value?: string | null) {
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

function normalizeRecordingStatus(value?: string | null) {
  switch ((value ?? "").toLowerCase()) {
    case "pending":
      return "PENDING"
    case "recording":
      return "RECORDING"
    case "processing":
      return "PROCESSING"
    case "ready":
      return "READY"
    case "failed":
      return "FAILED"
    case "disabled":
    default:
      return "DISABLED"
  }
}

function normalizeRestrictionMode(value?: string | null) {
  return (value ?? "").toLowerCase() === "allow" ? "ALLOW" : "BLOCK"
}

function normalizeLocationType(value?: string | null) {
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

async function getOwnedEvent(creatorId: string, eventId: string) {
  return db.creatorEvent.findFirst({
    where: {
      id: eventId,
      creatorId,
    },
    include: {
      restrictedLocations: true,
    },
  })
}

// GET /api/creator/events/:id
export async function GET(
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
      include: {
        restrictedLocations: true,
        tickets: {
          orderBy: { createdAt: "asc" },
          include: {
            purchases: {
              orderBy: { purchasedAt: "desc" },
              take: 20,
            },
          },
        },
        checkInUsers: {
          orderBy: { createdAt: "asc" },
          include: {
            scans: {
              orderBy: { scannedAt: "desc" },
              take: 10,
            },
          },
        },
        checkInScans: {
          orderBy: { scannedAt: "desc" },
          take: 25,
        },
      },
    })

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ event }, { status: 200 })
  } catch (error) {
    console.error("Creator event GET error:", error)
    return NextResponse.json({ message: "Failed to load creator event" }, { status: 500 })
  }
}

type UpdateEventBody = {
  title?: string
  description?: string | null
  category?: string | null
  status?: EventStatusInput
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
  recordingStatus?: RecordingStatusInput
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

// PUT /api/creator/events/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const { id } = await params
    const body = (await request.json()) as UpdateEventBody
    const event = await getOwnedEvent(creatorResult.creatorId, id)

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    const now = new Date()
    if (event.status === "LIVE" || event.status === "ENDED") {
      return NextResponse.json(
        { message: "Live or ended events cannot be edited" },
        { status: 409 }
      )
    }

    if (event.scheduledAt && event.scheduledAt <= now) {
      return NextResponse.json(
        { message: "Past events cannot be edited" },
        { status: 409 }
      )
    }

    if (typeof body.title !== "string") {
      return NextResponse.json({ message: "Title is required" }, { status: 400 })
    }

    const title = body.title.trim()
    if (title.length === 0) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 })
    }

    const scheduledAt = body.scheduledAt ? new Date(body.scheduledAt) : event.scheduledAt
    if (scheduledAt && Number.isNaN(scheduledAt.getTime())) {
      return NextResponse.json({ message: "scheduledAt must be a valid date" }, { status: 400 })
    }

    if (scheduledAt && scheduledAt <= now) {
      return NextResponse.json(
        { message: "Scheduled time must stay in the future" },
        { status: 400 }
      )
    }

    const updated = await db.$transaction(async (tx: typeof db) => {
      const eventUpdate = await tx.creatorEvent.update({
        where: { id: event.id },
        data: {
          title,
          description: body.description?.trim() || null,
          category: body.category?.trim() || event.category,
          status: body.status ? normalizeEventStatus(body.status) : event.status,
          isPrivate: body.isPrivate ?? event.isPrivate,
          isPaid: body.isPaid ?? event.isPaid,
          requireTicket: body.requireTicket ?? event.requireTicket,
          enableDonations: body.enableDonations ?? event.enableDonations,
          enableLocationRestriction:
            body.enableLocationRestriction ?? event.enableLocationRestriction,
          locationRestrictionType: body.locationRestrictionType
            ? normalizeRestrictionMode(body.locationRestrictionType)
            : event.locationRestrictionType,
          address: body.address !== undefined ? body.address?.trim() || null : event.address,
          locationName:
            body.locationName !== undefined ? body.locationName?.trim() || null : event.locationName,
          locationCountry:
            body.locationCountry !== undefined
              ? body.locationCountry?.trim() || null
              : event.locationCountry,
          locationState:
            body.locationState !== undefined ? body.locationState?.trim() || null : event.locationState,
          locationType:
            body.locationType !== undefined && body.locationType !== null
              ? normalizeLocationType(body.locationType)
              : event.locationType,
          locationLat:
            body.locationLat !== undefined
              ? typeof body.locationLat === "number"
                ? body.locationLat
                : null
              : event.locationLat,
          locationLon:
            body.locationLon !== undefined
              ? typeof body.locationLon === "number"
                ? body.locationLon
                : null
              : event.locationLon,
          locationFullAddress:
            body.locationFullAddress !== undefined
              ? body.locationFullAddress?.trim() || null
              : event.locationFullAddress,
          thumbnailUrl:
            body.thumbnailUrl !== undefined ? body.thumbnailUrl?.trim() || null : event.thumbnailUrl,
          thumbnailFileId:
            body.thumbnailFileId !== undefined
              ? body.thumbnailFileId?.trim() || null
              : event.thumbnailFileId,
          thumbnailVideoUrl:
            body.thumbnailVideoUrl !== undefined
              ? body.thumbnailVideoUrl?.trim() || null
              : event.thumbnailVideoUrl,
          thumbnailVideoFileId:
            body.thumbnailVideoFileId !== undefined
              ? body.thumbnailVideoFileId?.trim() || null
              : event.thumbnailVideoFileId,
          recordedVideoUrl:
            body.recordedVideoUrl !== undefined
              ? body.recordedVideoUrl?.trim() || null
              : event.recordedVideoUrl,
          recordedVideoFileId:
            body.recordedVideoFileId !== undefined
              ? body.recordedVideoFileId?.trim() || null
              : event.recordedVideoFileId,
          recordingEnabled: body.recordingEnabled ?? event.recordingEnabled,
          recordingStatus: body.recordingStatus
            ? normalizeRecordingStatus(body.recordingStatus)
            : event.recordingStatus,
          recordingUrl:
            body.recordingUrl !== undefined ? body.recordingUrl?.trim() || null : event.recordingUrl,
          timezone: body.timezone?.trim() || event.timezone,
          scheduledAt,
          durationMinutes:
            typeof body.durationMinutes === "number" ? body.durationMinutes : event.durationMinutes,
          maxViewers:
            body.maxViewers !== undefined
              ? typeof body.maxViewers === "number" && body.maxViewers > 0
                ? body.maxViewers
                : null
              : event.maxViewers,
          estimatedUsers:
            body.estimatedUsers !== undefined
              ? typeof body.estimatedUsers === "number"
                ? body.estimatedUsers
                : null
              : event.estimatedUsers,
          tags: Array.isArray(body.tags) ? body.tags.map((tag) => tag.trim()).filter(Boolean) : event.tags,
        },
        include: {
          restrictedLocations: true,
        },
      })

      if (body.restrictedLocations !== undefined) {
        await tx.creatorEventLocationRestriction.deleteMany({
          where: { eventId: event.id },
        })

        if (body.restrictedLocations.length > 0) {
          await tx.creatorEventLocationRestriction.createMany({
            data: body.restrictedLocations.map((location) => ({
              eventId: event.id,
              name: location.name.trim(),
              country: location.country.trim(),
              state: location.state?.trim() || null,
              lat: typeof location.lat === "number" ? location.lat : null,
              lon: typeof location.lon === "number" ? location.lon : null,
              locationType: normalizeLocationType(location.type ?? "city"),
              fullAddress: location.fullAddress?.trim() || null,
            })),
          })
        }
      }

      return eventUpdate
    })

    return NextResponse.json({ event: updated }, { status: 200 })
  } catch (error) {
    console.error("Creator event PUT error:", error)
    const message = error instanceof Error ? error.message : "Failed to update event"
    return NextResponse.json({ message }, { status: 500 })
  }
}
