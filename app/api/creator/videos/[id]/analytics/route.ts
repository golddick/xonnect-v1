import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    // "id" in analytics page is the folder/package id (same as view page)
    const folder = await prisma.creatorVideoFolder.findFirst({
      where: { id: params.id, creatorId: creator.id },
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

    // Aggregations from counter tables.
    const videos = await prisma.creatorVideo.findMany({
      where: { folderId: folder.id },
      select: { id: true, revenue: true },
    })

    const videoIds = videos.map((v) => v.id)
    const revenue = videos.reduce((sum, video) => sum + (video.revenue ?? 0), 0)

    const viewsCount = await prisma.creatorVideoView.count({
      where: { creatorVideoId: { in: videoIds } },
    })

    const likesCount = await prisma.creatorVideoLike.count({
      where: { creatorVideoId: { in: videoIds } },
    })

    const commentsCount = await prisma.creatorVideoComment.count({
      where: { creatorVideoId: { in: videoIds } },
    })

    // Shares/watchTime/purchases/rentals not present in current schema.
    // engagement counters exist only for views/likes/comments.
    const sharesCount = 0
    const purchasesCount = 0
    const rentals24hCount = 0
    const rentals48hCount = 0

    // Recent comments (cards/modal)
    const recentCommentsRaw = await prisma.creatorVideoComment.findMany({
      where: { creatorVideoId: { in: videoIds } },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        content: true,
        createdAt: true,
        commenterProfileId: true,
        creatorVideoId: true,
      },
    })

    // Resolve commenter profile -> display name/avatar where available
    // (may be null if commenterProfileId is null)
    const commenterIds = Array.from(
      new Set(recentCommentsRaw.map((c) => c.commenterProfileId).filter(Boolean))
    ) as string[]

    const commenters = await prisma.profile.findMany({
      where: { id: { in: commenterIds } },
      select: { id: true, fullName: true, avatarUrl: true },
    })
    const commenterMap = new Map(commenters.map((p) => [p.id, p]))

    const recentComments = recentCommentsRaw.map((c) => {
      const p = c.commenterProfileId ? commenterMap.get(c.commenterProfileId) : undefined
      return {
        id: c.id,
        author: p?.fullName ?? "Anonymous",
        text: c.content,
        date: new Date(c.createdAt).toLocaleDateString(),
        likes: 0,
        replies: 0,
        avatar: p?.avatarUrl ?? null,
      }
    })

    return NextResponse.json(
      {
        folder: {
          id: folder.id,
          title: folder.title,
          contentType: folder.folderType,
          status: folder.status,
          thumbnail: folder.thumbnailUrl,
          uploadDate: folder.createdAt,
          views: viewsCount,
          likes: likesCount,
          comments: commentsCount,
          revenue,
          shares: sharesCount,
          watchTimeSeconds: 0,
          purchases: purchasesCount,
          rentals24h: rentals24hCount,
          rentals48h: rentals48hCount,
          isPremium: false,
          duration: null,
          description: null,
          tags: [],
        },
        timeSeries: {
          range: "7d",
          items: [],
        },
        comments: recentComments,
        engagementBreakdown: {
          likes: likesCount,
          comments: commentsCount,
          shares: sharesCount,
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

