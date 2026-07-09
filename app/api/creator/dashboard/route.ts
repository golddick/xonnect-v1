import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

function normalizeEmail(email: string | null | undefined) {
  return typeof email === "string" ? email.toLowerCase().trim() : null
}

function buildMonthlySeries(records: Array<{ purchasedAt: Date | string | null; revenue: number | null | undefined }>) {
  const now = new Date()
  const buckets = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1)
    return {
      monthKey: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
      label: date.toLocaleString("en-US", { month: "short" }),
    }
  })

  const totals = new Map<string, number>()

  for (const record of records) {
    if (!record.purchasedAt) continue
    const purchaseDate = new Date(record.purchasedAt)
    if (Number.isNaN(purchaseDate.getTime())) continue

    const monthKey = `${purchaseDate.getFullYear()}-${String(purchaseDate.getMonth() + 1).padStart(2, "0")}`
    const current = totals.get(monthKey) ?? 0
    totals.set(monthKey, current + Number(record.revenue ?? 0))
  }

  return buckets.map((bucket) => totals.get(bucket.monthKey) ?? 0)
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.email || session.user.role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const normalizedEmail = normalizeEmail(session.user.email)
    if (typeof normalizedEmail !== "string") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const creator = await prisma.creator.findFirst({
      where: { profile: { email: normalizedEmail } },
      select: {
        id: true,
        followersCount: true,
        videoPayoutPercent: true,
        eventStreamPayout: true,
        eventVenuePayout: true,
      },
    })

    if (!creator) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 })
    }

    const [videoStats, eventStats, recentEvents, videoPurchases, ticketPurchases] = await Promise.all([
      prisma.creatorVideo.aggregate({
        where: { creatorId: creator.id },
        _sum: {
          revenue: true,
          viewsCount: true,
          likesCount: true,
          commentsCount: true,
        },
        _count: {
          _all: true,
        },
      }),
      prisma.creatorEvent.aggregate({
        where: { creatorId: creator.id },
        _sum: {
          revenue: true,
          viewsCount: true,
          likesCount: true,
          commentsCount: true,
        },
        _count: {
          _all: true,
        },
      }),
      prisma.creatorEvent.findMany({
        where: { creatorId: creator.id },
        select: {
          id: true,
          title: true,
          createdAt: true,
          revenue: true,
          viewsCount: true,
          status: true,
        },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
      prisma.creatorVideoPurchase.findMany({
        where: { creatorId: creator.id, status: "COMPLETED" },
        select: { purchasedAt: true, revenue: true },
      }),
      prisma.creatorEventTicketPurchase.findMany({
        where: {
          status: "COMPLETED",
          ticket: { event: { creatorId: creator.id } },
        },
        select: {
          purchasedAt: true,
          revenue: true,
          ticket: {
            select: { access: true },
          },
        },
      }),
    ])

    const totalRevenue = (videoStats._sum.revenue ?? 0) + (eventStats._sum.revenue ?? 0)
    const totalViews = (videoStats._sum.viewsCount ?? 0) + (eventStats._sum.viewsCount ?? 0)
    const totalLikes = (videoStats._sum.likesCount ?? 0) + (eventStats._sum.likesCount ?? 0)
    const totalComments = (videoStats._sum.commentsCount ?? 0) + (eventStats._sum.commentsCount ?? 0)
    const totalStreams = eventStats._count._all + videoStats._count._all

    const engagementRate = totalViews > 0 ? Math.round(((totalLikes + totalComments) / totalViews) * 100) : 0
    const videoOnDemandSeries = buildMonthlySeries(videoPurchases)
    const streamTicketSeries = buildMonthlySeries(
      ticketPurchases.filter((purchase: any) => purchase.ticket?.access === "STREAM")
    )
    const venueTicketSeries = buildMonthlySeries(
      ticketPurchases.filter((purchase: any) => purchase.ticket?.access === "VENUE")
    )

    return NextResponse.json({
      stats: {
        totalRevenue,
        totalViews,
        totalFollowers: creator.followersCount,
        totalStreams,
        totalLikes,
        totalComments,
        engagementRate,
      },
      recentStreams: recentEvents.map((event) => ({
        id: event.id,
        title: event.title,
        date: event.createdAt.toISOString(),
        views: event.viewsCount,
        revenue: event.revenue,
        status: event.status,
      })),
      payoutSplit: {
        videoPayoutPercent: creator.videoPayoutPercent,
        eventStreamPayout: creator.eventStreamPayout,
        eventVenuePayout: creator.eventVenuePayout,
      },
      revenueChart: {
        labels: Array.from({ length: 6 }, (_, index) => {
          const date = new Date()
          date.setMonth(date.getMonth() - (5 - index))
          return date.toLocaleString("en-US", { month: "short" })
        }),
        datasets: [
          {
            label: "Video on demand",
            data: videoOnDemandSeries,
            backgroundColor: "rgba(220, 38, 38, 0.8)",
            borderColor: "rgb(220, 38, 38)",
            borderWidth: 2,
          },
          {
            label: "Event tickets (stream)",
            data: streamTicketSeries,
            backgroundColor: "rgba(255, 215, 0, 0.8)",
            borderColor: "rgb(255, 215, 0)",
            borderWidth: 2,
          },
          {
            label: "Event tickets (venue)",
            data: venueTicketSeries,
            backgroundColor: "rgba(59, 130, 246, 0.8)",
            borderColor: "rgb(59, 130, 246)",
            borderWidth: 2,
          },
        ],
      },
    })
  } catch (error) {
    console.error("Creator dashboard load error:", error)
    return NextResponse.json({ message: "Failed to load creator dashboard" }, { status: 500 })
  }
}
