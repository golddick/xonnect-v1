import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

export type WatchPart = {
  id: string
  title: string
  description: string | null
  duration: string | null
  views: number
  likes: number
  comments: number
  revenue: number
  thumbnail: string | null
  videoUrl: string | null
  episodeIndex: number | null
  status: string
  category: string | null
  uploadDate: Date
  monetizationType: string | null
  isPrivate: boolean
  isPremium: boolean
  allowComments: boolean
  rent24Price: number | null
  rent48Price: number | null
  purchasePrice: number | null
  tags: string[]
  packageName: string | null
  isLocked: boolean
  previewOnly: boolean
  accessExpiresAt: string | null
}

export type WatchFolder = {
  id: string
  title: string
  contentType: string
  status: string
  thumbnail: string | null
  uploadDate: Date
  description: string | null
  creator: {
    id: string
    name: string
    avatarUrl: string | null
    avatarInitials: string
    socialHandles: Array<{ network: string; handle: string }>
    followersCount: number
    followingCount: number
    isFollowing: boolean
    isSelf: boolean
  }
  parts: WatchPart[]
  access: {
    locked: boolean
    accessCodeProvided: boolean
    canUseAccessCode: boolean
    requiresSignIn: boolean
    loggedIn: boolean
    canBypassAccess: boolean
    unlockedParts: number
    codeVideoId: string | null
  }
}

export type WatchFolderResult = {
  folder: WatchFolder | null
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

export async function loadWatchFolderData(
  folderId: string,
  options?: { accessCode?: string | null }
): Promise<WatchFolderResult> {
  const session = await auth()
  const role = session?.user?.role
  const email = session?.user?.email?.toLowerCase() ?? null
  const profileId = session?.user?.profileId ?? null

  const creator = email
    ? await prisma.creator.findFirst({
        where: { profile: { email } },
        select: { id: true },
      })
    : null

  const folder = await prisma.creatorVideoFolder.findFirst({
    where: {
      id: folderId,
    },
    select: {
      id: true,
      title: true,
      folderType: true,
      status: true,
      thumbnailUrl: true,
      createdAt: true,
      creatorId: true,
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
    },
  })

  if (!folder) {
    return { folder: null, canBypassAccess: false }
  }

  const canBypassAccess = Boolean(creator?.id && creator.id === folder.creatorId && role === Role.CREATOR)

  if (!canBypassAccess && folder.status !== "active") {
    return { folder: null, canBypassAccess: false }
  }

  const videos = await prisma.creatorVideo.findMany({
    where: {
      folderId: folder.id,
    },
    orderBy: [{ episodeIndex: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      duration: true,
      createdAt: true,
      videoUrl: true,
      status: true,
      publishNow: true,
      monetizationType: true,
      episodeIndex: true,
      isPrivate: true,
      isPremium: true,
      allowComments: true,
      ageRestriction: true,
      thumbnailUrl: true,
      viewsCount: true,
      likesCount: true,
      commentsCount: true,
      revenue: true,
      rent24Price: true,
      rent48Price: true,
      purchasePrice: true,
      tags: true,
      packageName: true,
    },
  })

  const purchaseAccessMap = new Map<string, { accessExpiresAt: Date | null; purchaseType: string }>()
  const submittedAccessCode = options?.accessCode?.trim() || null
  const loggedIn = Boolean(email || profileId)
  let codeVideoId: string | null = null

  // Access is tied to the signed-in account only: a purchase counts when it was made by
  // this profile or under this account email. Access codes are NOT an independent unlock
  // path — guests cannot use them, and a submitted code is only honoured when its purchase
  // belongs to this account (used below purely to jump to the video it was issued for).
  if (!canBypassAccess && loggedIn) {
    const videoIds = videos.map((video) => video.id)
    const ownershipFilters = [
      profileId ? { buyerProfileId: profileId } : null,
      email ? { buyerEmail: email } : null,
    ].filter(Boolean) as any[]

    if (videoIds.length > 0 && ownershipFilters.length > 0) {
      const purchases = await prisma.creatorVideoPurchase.findMany({
        where: {
          creatorVideoId: { in: videoIds },
          status: "COMPLETED",
          OR: ownershipFilters,
        },
        select: {
          creatorVideoId: true,
          accessExpiresAt: true,
          purchaseType: true,
          accessCode: true,
        },
      })

      for (const purchase of purchases) {
        const resolvedAccessExpiresAt = purchase.accessExpiresAt ? new Date(purchase.accessExpiresAt) : null
        const isExpired = Boolean(resolvedAccessExpiresAt && resolvedAccessExpiresAt.getTime() <= Date.now())

        if (isExpired) {
          continue
        }

        // Remember which video the submitted access code maps to, so the client can jump
        // straight to it. Only reachable here because the purchase is owned by this account.
        if (submittedAccessCode && purchase.accessCode && purchase.accessCode === submittedAccessCode) {
          codeVideoId = purchase.creatorVideoId
        }

        const existingAccess = purchaseAccessMap.get(purchase.creatorVideoId)
        if (!existingAccess) {
          purchaseAccessMap.set(purchase.creatorVideoId, {
            accessExpiresAt: resolvedAccessExpiresAt,
            purchaseType: purchase.purchaseType,
          })
        } else if (existingAccess.accessExpiresAt === null) {
          continue
        } else if (resolvedAccessExpiresAt === null) {
          purchaseAccessMap.set(purchase.creatorVideoId, {
            accessExpiresAt: resolvedAccessExpiresAt,
            purchaseType: purchase.purchaseType,
          })
        } else if (existingAccess.accessExpiresAt && resolvedAccessExpiresAt.getTime() > existingAccess.accessExpiresAt.getTime()) {
          purchaseAccessMap.set(purchase.creatorVideoId, {
            accessExpiresAt: resolvedAccessExpiresAt,
            purchaseType: purchase.purchaseType,
          })
        }
      }
    }
  }

  const parts = videos.map((video) => {
    const access = purchaseAccessMap.get(video.id)
    const isFree = (video.monetizationType ?? "free") === "free" || !video.isPremium
    const hasTimedAccess =
      access?.purchaseType === "purchase"
        ? true
        : access?.accessExpiresAt instanceof Date
          ? access.accessExpiresAt.getTime() > Date.now()
          : false
    const canView = canBypassAccess || isFree || hasTimedAccess
    const previewOnly = !canView && Boolean(video.videoUrl)
    const shouldExposeMediaUrl = Boolean(video.videoUrl)

    return {
      id: video.id,
      title: video.title,
      description: video.description,
      duration: video.duration,
      views: video.viewsCount ?? 0,
      likes: video.likesCount ?? 0,
      comments: video.commentsCount ?? 0,
      revenue: video.revenue ?? 0,
      thumbnail: video.thumbnailUrl,
      videoUrl: shouldExposeMediaUrl ? video.videoUrl : null,
      episodeIndex: video.episodeIndex,
      status: video.status,
      category: video.category,
      uploadDate: video.createdAt,
      monetizationType: video.monetizationType,
      isPrivate: video.isPrivate,
      isPremium: video.isPremium,
      allowComments: video.allowComments,
      rent24Price: video.rent24Price,
      rent48Price: video.rent48Price,
      purchasePrice: video.purchasePrice,
      tags: video.tags,
      packageName: video.packageName,
      isLocked: !canView && !previewOnly,
      previewOnly,
      accessExpiresAt: access?.accessExpiresAt?.toISOString() ?? null,
    }
  })

  const folderIsLocked = parts.length > 0 && parts.every((part) => part.isLocked)
  const publicParts = parts.filter((part) => !part.isLocked)
  const creatorName = folder.creator.profile.fullName?.trim() || "Xonnect Creator"
  const creatorSocialHandles = Array.isArray(folder.creator.profile.socialHandles)
    ? folder.creator.profile.socialHandles.filter((handle: any) => {
        return Boolean(handle && typeof handle.network === "string" && typeof handle.handle === "string")
      })
    : []

  const isFollowingCreator = Boolean(
    profileId &&
      (await prisma.creatorFollow.findFirst({
        where: {
          creatorId: folder.creatorId,
          followerProfileId: profileId,
          status: "active",
        },
        select: { id: true },
      }))
  )

  return {
    folder: {
      id: folder.id,
      title: folder.title,
      contentType: folder.folderType,
      status: folder.status,
      thumbnail: folder.thumbnailUrl,
      uploadDate: folder.createdAt,
      description: null,
      creator: {
        id: folder.creatorId,
        name: creatorName,
        avatarUrl: folder.creator.profile.avatarUrl ?? null,
        avatarInitials: toInitials(creatorName),
        socialHandles: creatorSocialHandles.map((handle: any) => ({
          network: handle.network,
          handle: handle.handle,
        })),
        followersCount: folder.creator.followersCount ?? 0,
        followingCount: folder.creator.followingCount ?? 0,
        isFollowing: isFollowingCreator,
        isSelf: Boolean(profileId && folder.creator.profileId === profileId),
      },
      parts,
      access: {
        locked: folderIsLocked,
        accessCodeProvided: Boolean(submittedAccessCode),
        canUseAccessCode: loggedIn && parts.some((part) => part.isLocked),
        requiresSignIn: !loggedIn,
        loggedIn,
        canBypassAccess,
        unlockedParts: publicParts.length,
        codeVideoId,
      },
    },
    canBypassAccess,
  }
}
