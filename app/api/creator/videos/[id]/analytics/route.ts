import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

function getTimeRangeDays(range: string | null) {
  switch (range) {
    case "7d":
      return 7
    case "30d":
      return 30
    case "90d":
      return 90
    case "all":
      return 90
    default:
      return 7
  }
}

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function buildDateSeries(days: number, endDate = new Date()) {
  const items: string[] = []
  const d = new Date(endDate)
  d.setHours(0, 0, 0, 0)

  for (let index = days - 1; index >= 0; index -= 1) {
    const itemDate = new Date(d)
    itemDate.setDate(d.getDate() - index)
    items.push(getDateKey(itemDate))
  }

  return items
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const role = session?.user?.role

    if (!session?.user?.email || role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const email = session.user.email.toLowerCase()
    const creator = await prisma.creator.findFirst({
      where: { profile: { email } },
      select: { id: true },
    })

    if (!creator) {
      return NextResponse.json(
        { message: "Creator profile not found" },
        { status: 404 }
      )
    }

    const { id } = await params
    const folder = await prisma.creatorVideoFolder.findFirst({
      where: { id, creatorId: creator.id },
      select: {
        id: true,
        title: true,
        folderType: true,
        status: true,
        thumbnailUrl: true,
        createdAt: true,
      },
    })

    if (!folder) {
      return NextResponse.json({ message: "Folder not found" }, { status: 404 })
    }

    const url = new URL(request.url)
    const range = url.searchParams.get("range") || "7d"
    const days = getTimeRangeDays(range)
    const endDate = new Date()
    endDate.setHours(23, 59, 59, 999)
    const startDate = new Date(endDate)
    startDate.setDate(endDate.getDate() - (days - 1))
    startDate.setHours(0, 0, 0, 0)

    const videos = await prisma.creatorVideo.findMany({
      where: { folderId: folder.id },
      orderBy: { episodeIndex: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        createdAt: true,
        videoUrl: true,
        thumbnailUrl: true,
        status: true,
        monetizationType: true,
        isPremium: true,
        viewsCount: true,
        likesCount: true,
        commentsCount: true,
        revenue: true,
        rent24Price: true,
        rent48Price: true,
        purchasePrice: true,
        tags: true,
      },
    })

    const videoIds = videos.map((video) => video.id)
    const totalViews = videos.reduce((sum, video) => sum + (video.viewsCount ?? 0), 0)
    const totalLikes = videos.reduce((sum, video) => sum + (video.likesCount ?? 0), 0)
    const totalComments = videos.reduce((sum, video) => sum + (video.commentsCount ?? 0), 0)
    const totalRevenue = videos.reduce((sum, video) => sum + (video.revenue ?? 0), 0)
    const isPremium = videos.some(
      (video) => video.isPremium || (video.monetizationType && video.monetizationType !== "free")
    )
    const uniqueTags = Array.from(
      new Set(videos.flatMap((video) => video.tags ?? []))
    ).filter(Boolean)

    const [views, likes, comments, purchases] = await Promise.all([
      prisma.creatorVideoView.findMany({
        where: {
          creatorVideoId: { in: videoIds },
          createdAt: { gte: startDate },
        },
        select: { createdAt: true },
      }),
      prisma.creatorVideoLike.findMany({
        where: {
          creatorVideoId: { in: videoIds },
          createdAt: { gte: startDate },
        },
        select: { createdAt: true },
      }),
      prisma.creatorVideoComment.findMany({
        where: {
          creatorVideoId: { in: videoIds },
          createdAt: { gte: startDate },
        },
        select: { createdAt: true, commenterProfileId: true, content: true, id: true },
      }),
      prisma.creatorVideoPurchase.findMany({
        where: {
          creatorVideoId: { in: videoIds },
          status: "COMPLETED",
          purchasedAt: { gte: startDate },
        },
        select: {
          purchasedAt: true,
          purchaseType: true,
          amount: true,
        },
      }),
    ])

    const recentCommentsRaw = await prisma.creatorVideoComment.findMany({
      where: { creatorVideoId: { in: videoIds } },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        content: true,
        createdAt: true,
        commenterProfileId: true,
      },
    })

    const commenterIds = Array.from(
      new Set(recentCommentsRaw.map((comment) => comment.commenterProfileId).filter(Boolean))
    ) as string[]

    const commenters = await prisma.profile.findMany({
      where: { id: { in: commenterIds } },
      select: { id: true, fullName: true, avatarUrl: true },
    })
    const commenterMap = new Map(commenters.map((profile) => [profile.id, profile]))

    const recentComments = recentCommentsRaw.map((comment) => {
      const profile = comment.commenterProfileId
        ? commenterMap.get(comment.commenterProfileId)
        : undefined
      return {
        id: comment.id,
        author: profile?.fullName ?? "Anonymous",
        text: comment.content,
        date: new Date(comment.createdAt).toLocaleDateString(),
        likes: 0,
        replies: 0,
        avatar: profile?.avatarUrl ?? null,
      }
    })

    const seriesKeys = buildDateSeries(days, endDate)
    const seriesMap = seriesKeys.reduce<Record<string, {
      views: number
      likes: number
      comments: number
      shares: number
      watchTime: number
      purchases: number
      rentals24h: number
      rentals48h: number
    }>>((acc, key) => {
      acc[key] = {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        watchTime: 0,
        purchases: 0,
        rentals24h: 0,
        rentals48h: 0,
      }
      return acc
    }, {})

    views.forEach((record) => {
      const key = getDateKey(new Date(record.createdAt))
      if (seriesMap[key]) {
        seriesMap[key].views += 1
      }
    })

    likes.forEach((record) => {
      const key = getDateKey(new Date(record.createdAt))
      if (seriesMap[key]) {
        seriesMap[key].likes += 1
      }
    })

    comments.forEach((record) => {
      const key = getDateKey(new Date(record.createdAt))
      if (seriesMap[key]) {
        seriesMap[key].comments += 1
      }
    })

    purchases.forEach((record) => {
      const key = getDateKey(new Date(record.purchasedAt))
      if (!seriesMap[key]) return
      seriesMap[key].purchases += 1
      if (record.purchaseType === "rent24") {
        seriesMap[key].rentals24h += 1
      }
      if (record.purchaseType === "rent48") {
        seriesMap[key].rentals48h += 1
      }
    })

    const purchasesAll = await prisma.creatorVideoPurchase.findMany({
      where: {
        creatorVideoId: { in: videoIds },
        status: "COMPLETED",
      },
      select: { purchaseType: true, amount: true },
    })

    const purchasesCount = purchasesAll.length
    const rentals24hCount = purchasesAll.filter((purchase) => purchase.purchaseType === "rent24").length
    const rentals48hCount = purchasesAll.filter((purchase) => purchase.purchaseType === "rent48").length

    const timeSeriesItems = seriesKeys.map((date) => ({
      date,
      views: seriesMap[date].views,
      likes: seriesMap[date].likes,
      comments: seriesMap[date].comments,
      shares: seriesMap[date].shares,
      watchTime: seriesMap[date].watchTime,
      purchases: seriesMap[date].purchases,
      rentals24h: seriesMap[date].rentals24h,
      rentals48h: seriesMap[date].rentals48h,
    }))

    return NextResponse.json(
      {
        folder: {
          id: folder.id,
          title: folder.title,
          contentType: folder.folderType,
          status: folder.status,
          thumbnail: folder.thumbnailUrl,
          uploadDate: folder.createdAt,
          views: totalViews,
          likes: totalLikes,
          comments: totalComments,
          revenue: totalRevenue,
          shares: 0,
          watchTimeSeconds: 0,
          purchases: purchasesCount,
          rentals24h: rentals24hCount,
          rentals48h: rentals48hCount,
          isPremium,
          duration: videos[0]?.duration ?? null,
          description: null,
          tags: uniqueTags,
        },
        timeSeries: {
          range,
          items: timeSeriesItems,
        },
        comments: recentComments,
        engagementBreakdown: {
          likes: totalLikes,
          comments: totalComments,
          shares: 0,
          purchases: purchasesCount,
          rentals24h: rentals24hCount,
          rentals48h: rentals48hCount,
        },
        episodesCount: videoIds.length,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Creator analytics GET error:", error)
    return NextResponse.json(
      { message: "Failed to load analytics" },
      { status: 500 }
    )
  }
}

