import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

function assertAuthorized(role?: Role | null) {
  return role === Role.ADMIN || role === Role.SUPERADMIN
}

async function requireAuthorizedUser() {
  const session = await auth()
  const user = session?.user

  if (!user?.email || !assertAuthorized(user.role)) {
    return null
  }

  return user
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuthorizedUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const creators = await prisma.creator.findMany({
      include: {
        profile: {
          select: {
            id: true,
            email: true,
            fullName: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    const videoStats = await prisma.creatorVideo.groupBy({
      by: ["creatorId"],
      _sum: {
        revenue: true,
        platformFee: true,
      },
    })

    const eventStats = await prisma.creatorEvent.groupBy({
      by: ["creatorId"],
      _sum: {
        revenue: true,
        platformFee: true,
      },
    })

    const videoTotals = await prisma.creatorVideo.aggregate({
      _sum: {
        revenue: true,
        platformFee: true,
      },
    })

    const eventTotals = await prisma.creatorEvent.aggregate({
      _sum: {
        revenue: true,
        platformFee: true,
      },
    })

    const videoStatsMap = new Map(videoStats.map((item) => [item.creatorId, item]))
    const eventStatsMap = new Map(eventStats.map((item) => [item.creatorId, item]))

    const formattedCreators = creators.map((creator) => {
      const video = videoStatsMap.get(creator.id)
      const event = eventStatsMap.get(creator.id)

      const totalRevenue = (video?._sum.revenue ?? 0) + (event?._sum.revenue ?? 0)
      const platformRevenue = (video?._sum.platformFee ?? 0) + (event?._sum.platformFee ?? 0)

      return {
        id: creator.id,
        profileId: creator.profileId,
        status: creator.status,
        videoPayoutPercent: creator.videoPayoutPercent,
        eventStreamPayout: creator.eventStreamPayout,
        eventVenuePayout: creator.eventVenuePayout,
        followersCount: creator.followersCount,
        followingCount: creator.followingCount,
        profile: creator.profile,
        totalRevenue,
        platformRevenue,
        createdAt: creator.createdAt.toISOString(),
        updatedAt: creator.updatedAt.toISOString(),
      }
    })

    const totalCreators = creators.length
    const activeCreators = creators.filter((creator) => creator.status === "active").length
    const platformRevenue = (videoTotals._sum.platformFee ?? 0) + (eventTotals._sum.platformFee ?? 0)
    const creatorRevenue = (videoTotals._sum.revenue ?? 0) + (eventTotals._sum.revenue ?? 0)

    return NextResponse.json(
      {
        creators: formattedCreators,
        stats: {
          totalCreators,
          activeCreators,
          platformRevenue,
          creatorRevenue,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Superadmin creators GET error:", error)
    return NextResponse.json({ message: "Failed to load creators" }, { status: 500 })
  }
}
