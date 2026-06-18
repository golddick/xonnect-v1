import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { loadEventWatchData } from "@/lib/tv/event-watch"

export const dynamic = "force-dynamic"
 
const PUBLIC_VIDEO_STATUSES = new Set(["published", "scheduled"])

function toInitials(value: string) {
  const parts = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length === 0) return "TV"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const { searchParams } = new URL(request.url)
    const accessCode = searchParams.get("accessCode")?.trim() ?? null
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
        id: resolvedParams.id,
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
            profile: {
              select: {
                fullName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    })

    if (!folder) {
      const eventResult = await loadEventWatchData(resolvedParams.id, { accessCode })
      if (!eventResult.event) {
        return NextResponse.json({ message: "Video folder not found" }, { status: 404 })
      }

      return NextResponse.json(
        {
          kind: "event",
          event: eventResult.event,
        },
        { status: 200 }
      )
    }

    const canBypassAccess = Boolean(creator?.id && creator.id === folder.creatorId && role === Role.CREATOR)

    if (!canBypassAccess && folder.status !== "active") {
      return NextResponse.json({ message: "Video folder not found" }, { status: 404 })
    }

    const videos = await prisma.creatorVideo.findMany({
      where: {
        folderId: folder.id,
        ...(canBypassAccess
          ? {}
          : {
              isPrivate: false,
              status: { in: Array.from(PUBLIC_VIDEO_STATUSES) },
            }),
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

    if (!canBypassAccess) {
      const videoIds = videos.map((video) => video.id)

      if (videoIds.length > 0) {
        const purchases = await prisma.creatorVideoPurchase.findMany({
          where: {
            creatorVideoId: { in: videoIds },
            status: "COMPLETED",
            OR: [
              profileId ? { buyerProfileId: profileId } : undefined,
              email ? { buyerEmail: email } : undefined,
              accessCode ? { accessCode } : undefined,
            ].filter(Boolean) as any,
          },
          select: {
            creatorVideoId: true,
            accessExpiresAt: true,
            purchaseType: true,
            accessCode: true,
          },
        })

        for (const purchase of purchases) {
          purchaseAccessMap.set(purchase.creatorVideoId, {
            accessExpiresAt: purchase.accessExpiresAt,
            purchaseType: purchase.purchaseType,
          })
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
        videoUrl: canView ? video.videoUrl : null,
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

    const folderIsLocked = parts.every((part) => part.isLocked)
    const publicParts = parts.filter((part) => !part.isLocked)

    return NextResponse.json(
      {
        kind: "video",
        folder: {
          id: folder.id,
          title: folder.title,
          contentType: folder.folderType,
          status: folder.status,
          thumbnail: folder.thumbnailUrl,
          uploadDate: folder.createdAt,
          description: null,
          creator: {
            name: folder.creator.profile.fullName?.trim() || "Xonnect Creator",
            avatarUrl: folder.creator.profile.avatarUrl ?? null,
            avatarInitials: toInitials(folder.creator.profile.fullName?.trim() || "Xonnect Creator"),
          },
          parts,
          access: {
            locked: folderIsLocked,
            accessCodeProvided: Boolean(accessCode),
            canUseAccessCode: true,
            requiresSignIn: !session?.user?.email,
            loggedIn: Boolean(session?.user?.email),
            canBypassAccess,
            unlockedParts: publicParts.length,
          },
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Public TV watch GET error:", error)
    return NextResponse.json({ message: "Failed to load TV watch content" }, { status: 500 })
  }
}
