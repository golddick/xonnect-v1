import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/db/prisma"

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

function normalize(value: string | null) {
  if (!value) return null
  const trimmed = value.trim().toLowerCase()
  return trimmed.length > 0 ? trimmed : null
}

function matchesPricing(video: { monetizationType: string | null; isPremium: boolean }, pricing: string | null) {
  if (!pricing || pricing === "all") return true
  const monetizationType = (video.monetizationType ?? "free").toLowerCase()

  if (pricing === "free") {
    return monetizationType === "free" || !video.isPremium
  }

  if (pricing === "rent") {
    return monetizationType === "rent"
  }

  if (pricing === "purchase") {
    return monetizationType === "purchase"
  }

  return true
}

function matchesSearch(folderTitle: string, videoTitle: string, category: string | null, search: string | null) {
  if (!search) return true

  const query = search.toLowerCase()
  return (
    folderTitle.toLowerCase().includes(query) ||
    videoTitle.toLowerCase().includes(query) ||
    (category ?? "").toLowerCase().includes(query)
  )
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const folderType = normalize(searchParams.get("folderType") ?? searchParams.get("type") ?? "video")
    const pricing = normalize(searchParams.get("pricing"))
    const search = normalize(searchParams.get("search"))

    const folders = await prisma.creatorVideoFolder.findMany({
      where: {
        status: "active",
        ...(folderType && folderType !== "all"
          ? {
              folderType: {
                equals: folderType,
                mode: "insensitive" as const,
              },
            }
          : {}),
      },
      orderBy: [{ createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        folderType: true,
        status: true,
        thumbnailUrl: true,
        createdAt: true,
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
        videos: {
          where: {
            isPrivate: false,
            status: { in: Array.from(PUBLIC_VIDEO_STATUSES) },
          },
          orderBy: [{ episodeIndex: "asc" }, { createdAt: "asc" }],
          select: {
            id: true,
            title: true,
            category: true,
            status: true,
            thumbnailUrl: true,
            duration: true,
            viewsCount: true,
            scheduledAt: true,
            monetizationType: true,
            isPremium: true,
            rent24Price: true,
            rent48Price: true,
            purchasePrice: true,
            episodeIndex: true,
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
            folder: {
              select: {
                id: true,
                title: true,
                folderType: true,
              },
            },
          },
        },
      },
    })

    const items = folders
      .map((folder) => {
        const videos = folder.videos.filter((video) => matchesPricing(video, pricing))
        if (videos.length === 0) return null

        const visibleVideos = videos.filter((video) => matchesSearch(folder.title, video.title, video.category, search))
        if (visibleVideos.length === 0) return null

        const channelName = folder.creator.profile.fullName?.trim() || "Xonnect Creator"
        const channelAvatarUrl = folder.creator.profile.avatarUrl ?? null
        const firstVideo = visibleVideos[0]

        return {
          id: folder.id,
          watchId: folder.id,
          firstPartId: firstVideo.id,
          title: folder.title,
          thumbnail: folder.thumbnailUrl || firstVideo.thumbnailUrl || "/placeholder.svg?query=xonnect-tv-movie",
          channelName,
          channelAvatar: toInitials(channelName),
          channelAvatarUrl,
          viewers: visibleVideos.reduce((sum, video) => sum + (video.viewsCount ?? 0), 0),
          isLive: false,
          category: folder.folderType,
          type: "folder",
          folderType: folder.folderType,
          status: folder.status,
          itemsCount: visibleVideos.length,
          pricing: visibleVideos.some((video) => (video.monetizationType ?? "free") !== "free" || video.isPremium)
            ? "premium"
            : "free",
          duration: firstVideo.duration,
          videos: visibleVideos.map((video) => ({
            id: video.id,
            title: video.title,
            duration: video.duration,
            status: video.status,
            thumbnail: video.thumbnailUrl,
            uploadDate: video.scheduledAt ?? undefined,
            views: video.viewsCount ?? 0,
            category: video.category,
            monetizationType: video.monetizationType,
            isPremium: video.isPremium,
            rent24Price: video.rent24Price,
            rent48Price: video.rent48Price,
            purchasePrice: video.purchasePrice,
          })),
        }
      })
      .filter(Boolean)

    return NextResponse.json(
      {
        items,
        total: items.length,
        filters: {
          folderType: folderType ?? "all",
          pricing: pricing ?? "all",
          search: search ?? "",
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("TV movie GET error:", error)
    return NextResponse.json({ message: "Failed to load movie content" }, { status: 500 })
  }
}
