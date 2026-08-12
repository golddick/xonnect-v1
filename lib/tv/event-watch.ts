import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { CreatorEventTicket, Role } from "@/lib/generated/prisma"

const db = prisma as any

export type EventWatchTicket = {
  id: string
  ticketType: string
  access: "STREAM" | "VENUE"
  price: number
  quantity: number
  soldCount: number
  remaining: number
  description: string | null
  benefits: string[]
  status: string
}

export type EventWatchData = {
  id: string
  title: string
  description: string | null
  category: string
  status: string
  isPrivate: boolean
  isPaid: boolean
  requireTicket: boolean
  thumbnail: string | null
  thumbnailVideoUrl: string | null
  recordedVideoUrl: string | null
  recordingUrl: string | null
  scheduledAt: string | null
  durationMinutes: number
  maxViewers: number | null
  currentViewersCount: number
  peakViewersCount: number
  livekitRoomName: string | null
  livekitWsUrl: string | null
  creator: {
    id: string
    name: string
    avatarUrl: string | null
    avatarInitials: string
    isSelf: boolean
    socialHandles: Array<{ network: string; handle: string }>
  }
  tickets: EventWatchTicket[]
  access: {
    locked: boolean
    accessCodeProvided: boolean
    canUseAccessCode: boolean
    requiresSignIn: boolean
    loggedIn: boolean
    canBypassAccess: boolean
    premium: boolean
    accessGranted: boolean
  }
}

export type EventWatchResult = {
  event: EventWatchData | null
  canBypassAccess: boolean
}

function toInitials(value: string) {
  const parts = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length === 0) return "TV"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

function normalizeTicketAccess(value?: string | null): "STREAM" | "VENUE" {
  return (value ?? "STREAM").toString().toUpperCase() === "VENUE" ? "VENUE" : "STREAM"
}

function isEventPublic(status: string) {
  return ["SCHEDULED", "LIVE", "PAUSED", "ENDED"].includes(status.toUpperCase())
}

export async function loadEventWatchData(eventId: string, options?: { accessCode?: string | null }) {
  const session = await auth()
  const role = session?.user?.role
  const email = session?.user?.email?.toLowerCase() ?? null

  const creator = email
    ? await db.creator.findFirst({
        where: { profile: { email } },
        select: { id: true },
      })
    : null

  const event = await db.creatorEvent.findFirst({
    where: {
      id: eventId,
    },
    select: {
      id: true,
      creatorId: true,
      title: true,
      description: true,
      category: true,
      status: true,
      isPrivate: true,
      isPaid: true,
      requireTicket: true,
      thumbnailUrl: true,
      thumbnailVideoUrl: true,
      recordedVideoUrl: true,
      recordingUrl: true,
      scheduledAt: true,
      durationMinutes: true,
      maxViewers: true,
      currentViewersCount: true,
      viewsCount: true,
      peakViewersCount: true,
      likesCount: true,
      creator: {
        select: {
          profileId: true,
          profile: {
            select: {
              fullName: true,
              avatarUrl: true,
              socialHandles: true,
            },
          },
          followersCount: true,
          followingCount: true,
        },
      },
      tickets: {
        where: {
          status: {
            in: ["ACTIVE", "SOLD_OUT"],
          },
        },
        orderBy: [{ price: "asc" }, { createdAt: "asc" }],
        select: {
          id: true,
          ticketType: true,
          access: true,
          price: true,
          quantity: true,
          soldCount: true,
          description: true,
          benefits: true,
          status: true,
        },
      },
    },
  })

  if (!event) {
    return { event: null, canBypassAccess: false }
  }

  const canBypassAccess = Boolean(creator?.id && creator.id === event.creatorId && role === Role.CREATOR)

  if (!canBypassAccess && (!isEventPublic(event.status) || event.isPrivate)) {
    return { event: null, canBypassAccess: false }
  }

  const streamTickets = event.tickets
    .map((ticket: CreatorEventTicket) => ({
      ...ticket,
      access: normalizeTicketAccess(ticket.access),
      remaining: Math.max((ticket.quantity ?? 0) - (ticket.soldCount ?? 0), 0),
    }))
    .filter((ticket: CreatorEventTicket) => ticket.access === "STREAM")

  const premium =
    Boolean(event.isPaid) ||
    Boolean(event.requireTicket) ||
    streamTickets.some((ticket: CreatorEventTicket) => ticket.price > 0)

  const accessCode = options?.accessCode?.trim() ?? null
  const loggedIn = Boolean(email)
  let accessGranted = !premium || canBypassAccess

  if (!accessGranted && accessCode) {
    const codeMatch = await db.creatorEventTicketPurchase.findFirst({
      where: {
        ticketCode: accessCode,
        status: "COMPLETED",
        ticket: {
          eventId: event.id,
          access: "STREAM",
        },
      },
      select: { id: true, purchasedAt: true },
    })

    accessGranted = Boolean(codeMatch)
  }

  if (!accessGranted && loggedIn && email) {
    const emailMatch = await db.creatorEventTicketPurchase.findFirst({
      where: {
        buyerEmail: email,
        status: "COMPLETED",
        ticket: {
          eventId: event.id,
          access: "STREAM",
        },
      },
      select: { id: true, purchasedAt: true },
    })

    accessGranted = Boolean(emailMatch)
  }

  const creatorName = event.creator.profile.fullName?.trim() || "Xonnect Creator"
  const creatorAvatarUrl = event.creator.profile.avatarUrl ?? null
  const creatorSocialHandles = Array.isArray(event.creator.profile.socialHandles)
    ? event.creator.profile.socialHandles.filter((handle: any) => {
        return Boolean(handle && typeof handle.network === "string" && typeof handle.handle === "string")
      })
    : []
  const profileId = session?.user?.profileId ?? null

  const isFollowingCreator = Boolean(
    profileId &&
      (await db.creatorFollow.findFirst({
        where: {
          creatorId: event.creatorId,
          followerProfileId: profileId,
          status: "active",
        },
        select: { id: true },
      }))
  )

  const isLikedEvent = Boolean(
    profileId &&
      (await db.creatorEventLike.findFirst({
        where: {
          creatorEventId: event.id,
          likerProfileId: profileId,
          status: "active",
        },
        select: { id: true },
      }))
  )

  return {
    event: {
      id: event.id,
      title: event.title,
      description: event.description,
      category: event.category,
      status: event.status,
      isPrivate: event.isPrivate,
      isPaid: event.isPaid,
      requireTicket: event.requireTicket,
      thumbnail: event.thumbnailUrl,
      thumbnailVideoUrl: event.thumbnailVideoUrl,
      recordedVideoUrl: event.recordedVideoUrl,
      recordingUrl: event.recordingUrl,
      scheduledAt: event.scheduledAt?.toISOString() ?? null,
      durationMinutes: event.durationMinutes,
      viewsCount:event.viewsCount,
      maxViewers: event.maxViewers,
      currentViewersCount: event.currentViewersCount,
      peakViewersCount: event.peakViewersCount,
      likesCount: event.likesCount ?? 0,
      creator: {
        id: event.creatorId,
        name: creatorName,
        avatarUrl: creatorAvatarUrl,
        avatarInitials: toInitials(creatorName),
        isSelf: Boolean(profileId && event.creator.profileId === profileId),
        socialHandles: creatorSocialHandles.map((handle: any) => ({
          network: handle.network,
          handle: handle.handle,
        })),
        followersCount: event.creator.followersCount ?? 0,
        followingCount: event.creator.followingCount ?? 0,
        isFollowing: isFollowingCreator,
      },
      tickets: streamTickets,
      isLiked: isLikedEvent,
      access: {
        locked: premium && !accessGranted,
        accessCodeProvided: Boolean(accessCode),
        canUseAccessCode: premium,
        requiresSignIn: !loggedIn,
        loggedIn,
        canBypassAccess,
        premium,
        accessGranted,
      },
    },
    canBypassAccess,
  }
}
