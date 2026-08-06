import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/db/prisma"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ message: "Creator id is required" }, { status: 400 })
    }

    const creator = await prisma.creator.findUnique({
      where: { id },
      select: {
        profile: {
          select: {
            fullName: true,
            avatarUrl: true,
            email: true,
          },
        },
        followersCount: true,
        followingCount: true,
      },
    })

    if (!creator) {
      return NextResponse.json({ message: "Creator not found" }, { status: 404 })
    }

    const videoStats = await prisma.creatorVideo.aggregate({
      where: { creatorId: id },
      _count: { _all: true },
      _sum: {
        viewsCount: true,
        likesCount: true,
        commentsCount: true,
      },
    })

    const eventStats = await prisma.creatorEvent.aggregate({
      where: { creatorId: id },
      _count: { _all: true },
      _sum: {
        viewsCount: true,
        likesCount: true,
        commentsCount: true,
      },
    })

    return NextResponse.json(
      {
        profile: {
          fullName: creator.profile.fullName,
          avatarUrl: creator.profile.avatarUrl,
          email: creator.profile.email,
        },
        creator: {
          followersCount: creator.followersCount,
          followingCount: creator.followingCount,
        },
        stats: {
          followers: creator.followersCount,
          following: creator.followingCount,
          videos: videoStats._count._all ?? 0,
          events: eventStats._count._all ?? 0,
          totalLikes: (videoStats._sum.likesCount ?? 0) + (eventStats._sum.likesCount ?? 0),
          totalViews: (videoStats._sum.viewsCount ?? 0) + (eventStats._sum.viewsCount ?? 0),
          totalComments: (videoStats._sum.commentsCount ?? 0) + (eventStats._sum.commentsCount ?? 0),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error loading creator profile stats:", error)
    return NextResponse.json({ message: "Failed to load creator profile" }, { status: 500 })
  }
}
