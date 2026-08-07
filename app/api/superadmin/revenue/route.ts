import { NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

function assertAuthorized(role?: Role | null) {
  return role === Role.ADMIN || role === Role.SUPERADMIN
}

function formatDate(value: Date | string | null | undefined) {
  if (!value) return ""

  const parsed = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(parsed.getTime())) return ""

  return parsed.toLocaleDateString("en-NG")
}

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.email || !assertAuthorized(session.user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const [events, videos] = await Promise.all([
      prisma.creatorEvent.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          isPaid: true,
          viewsCount: true,
          durationMinutes: true,
          createdAt: true,
          scheduledAt: true,
          startedAt: true,
          endedAt: true,
          revenue: true,
          platformFee: true,
          creator: {
            select: {
              profile: {
                select: {
                  fullName: true,
                },
              },
            },
          },
        },
      }),
      prisma.creatorVideo.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          purchasePrice: true,
          viewsCount: true,
          createdAt: true,
          revenue: true,
          platformFee: true,
          _count: {
            select: {
              purchases: true,
            },
          },
          creator: {
            select: {
              profile: {
                select: {
                  fullName: true,
                },
              },
            },
          },
        },
      }),
    ])

    const eventRevenue = events.reduce((sum, event) => sum + Number(event.revenue ?? 0), 0)
    const eventPlatformRevenue = events.reduce((sum, event) => sum + Number(event.platformFee ?? 0), 0)

    const videoRevenue = videos.reduce((sum, video) => sum + Number(video.revenue ?? 0), 0)
    const videoPlatformRevenue = videos.reduce((sum, video) => sum + Number(video.platformFee ?? 0), 0)

    const creatorEarnings = eventRevenue + videoRevenue
    const platformEarnings = eventPlatformRevenue + videoPlatformRevenue
    const totalRevenue = creatorEarnings + platformEarnings

    const overview = {
      total: totalRevenue,
      streams: eventRevenue,
      premiumVideos: videoRevenue,
      ads: 0,
      platformEarnings,
      payoutEarnings: creatorEarnings,
      growth: 0,
    }

    const mappedEvents = events.map((event) => ({
      id: event.id,
      creatorName: event.creator?.profile?.fullName || "Unknown Creator",
      streamTitle: event.title,
      revenue: Number(event.revenue ?? 0),
      platformEarnings: Number(event.platformFee ?? 0),
      payoutEarnings: Number(event.revenue ?? 0),
      viewers: Number(event.viewsCount ?? 0),
      duration: `${event.durationMinutes ?? 0}m`,
      date: formatDate(event.startedAt ?? event.scheduledAt ?? event.createdAt),
      type: event.isPaid ? "Premium" : "Standard",
    }))

    const mappedVideos = videos.map((video) => ({
      id: video.id,
      creatorName: video.creator?.profile?.fullName || "Unknown Creator",
      videoTitle: video.title,
      revenue: Number(video.revenue ?? 0),
      platformEarnings: Number(video.platformFee ?? 0),
      payoutEarnings: Number(video.revenue ?? 0),
      views: Number(video.viewsCount ?? 0),
      price: Number(video.purchasePrice ?? 0),
      sales: Number(video._count?.purchases ?? 0),
      date: formatDate(video.createdAt),
    }))

    return NextResponse.json(
      {
        overview,
        events: mappedEvents,
        videos: mappedVideos,
        totals: {
          totalRevenue,
          platformEarnings,
          creatorEarnings,
          streamRevenue: eventRevenue,
          premiumVideoRevenue: videoRevenue,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Superadmin revenue GET error:", error)
    return NextResponse.json({ message: "Failed to load revenue data" }, { status: 500 })
  }
}
