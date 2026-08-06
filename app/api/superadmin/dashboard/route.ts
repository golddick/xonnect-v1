import { NextResponse } from "next/server"

import { auth } from "../../../../lib/auth/auth"
import { prisma } from "../../../../lib/db/prisma"
import { Role } from "../../../../lib/generated/prisma"

function assertAuthorized(role?: Role | null) {
  return role === Role.ADMIN || role === Role.SUPERADMIN
}

function toISO(value: Date | string | null | undefined) {
  if (!value) return null
  const parsed =
    value instanceof Date
      ? value
      : typeof value === "string"
      ? new Date(value)
      : null

  if (!parsed || Number.isNaN(parsed.getTime())) return null
  return parsed.toISOString()
}

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.email || !assertAuthorized(session.user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // basic stats and trend window
    const now = new Date()
    const chartWindowStart = new Date(now.getFullYear(), now.getMonth() - 5, 1)

    const [
      creatorCount,
      eventTotals,
      videoTotals,
      events,
      videos,
      videoPurchases,
      ticketPurchases,
      payoutRequests,
      videoPurchasesForTrend,
      ticketPurchasesForTrend,
    ] = await Promise.all([
      prisma.creator.count(),
      prisma.creatorEvent.aggregate({
        _sum: {
          amount: true,
          revenue: true,
          platformFee: true,
          viewsCount: true,
        },
      }),
      prisma.creatorVideo.aggregate({
        _sum: {
          amount: true,
          revenue: true,
          platformFee: true,
          viewsCount: true,
        },
      }),
      prisma.creatorEvent.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
        select: {
          creatorId: true,
          id: true,
          title: true,
          isPaid: true,
          viewsCount: true,
          amount: true,
          revenue: true,
          platformFee: true,
          createdAt: true,
          creator: { select: { profile: { select: { fullName: true } } } },
        },
      }),
      prisma.creatorVideo.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
        select: {
          creatorId: true,
          id: true,
          title: true,
          viewsCount: true,
          amount: true,
          revenue: true,
          platformFee: true,
          createdAt: true,
          creator: { select: { profile: { select: { fullName: true } } } },
        },
      }),
      prisma.creatorVideoPurchase.findMany({
        orderBy: { purchasedAt: "desc" },
        take: 50,
        select: {
          id: true,
          creatorId: true,
          amount: true,
          revenue: true,
          platformFee: true,
          purchasedAt: true,
          creator: { select: { profile: { select: { fullName: true } } } },
        },
      }),
      prisma.creatorEventTicketPurchase.findMany({
        orderBy: { purchasedAt: "desc" },
        take: 50,
        select: {
          id: true,
          amount: true,
          revenue: true,
          platformFee: true,
          purchasedAt: true,
          ticket: { select: { event: { select: { id: true, title: true, creator: { select: { profile: { select: { fullName: true } } } } } } } },
        },
      }),
      prisma.creatorPayoutRequest.findMany({
        orderBy: { requestedAt: "desc" },
        take: 50,
        select: {
          id: true,
          amount: true,
          currency: true,
          status: true,
          requestedAt: true,
          creator: { select: { profile: { select: { fullName: true } } } },
        },
      }),
      prisma.creatorVideoPurchase.findMany({
        where: { purchasedAt: { gte: chartWindowStart } },
        select: { amount: true, purchasedAt: true },
      }),
      prisma.creatorEventTicketPurchase.findMany({
        where: { purchasedAt: { gte: chartWindowStart } },
        select: { amount: true, purchasedAt: true },
      }),
    ])

    const totalEventRevenue = Number(eventTotals._sum.revenue ?? 0)
    const totalEventAmount = Number(eventTotals._sum.amount ?? 0)
    const totalEventPlatformFee = Number(eventTotals._sum.platformFee ?? 0)
    const totalEventViews = Number(eventTotals._sum.viewsCount ?? 0)

    const totalVideoRevenue = Number(videoTotals._sum.revenue ?? 0)
    const totalVideoAmount = Number(videoTotals._sum.amount ?? 0)
    const totalVideoPlatformFee = Number(videoTotals._sum.platformFee ?? 0)
    const totalVideoViews = Number(videoTotals._sum.viewsCount ?? 0)

    const totalCreatorRevenue = totalEventRevenue + totalVideoRevenue
    const totalPlatformFees = totalEventPlatformFee + totalVideoPlatformFee
    const totalGrossRevenue = totalEventAmount + totalVideoAmount

    const overview = {
      totalRevenue: totalGrossRevenue,
      platformFee: totalPlatformFees,
      activeCreators: creatorCount,
      totalViews: totalEventViews + totalVideoViews,
    }

    const revenueData = {
      total: overview.totalRevenue,
      streams: totalEventAmount,
      premiumVideos: totalVideoAmount,
      ads: 0,
      platformEarnings: overview.platformFee,
      payoutEarnings: totalCreatorRevenue,
      growth: 0,
    }

    const trendBuckets = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1)
      return {
        monthKey: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
        name: date.toLocaleString("en-US", { month: "short" }),
      }
    })

    const trendTotals = new Map<string, number>()
    ;[...videoPurchasesForTrend, ...ticketPurchasesForTrend].forEach((purchase) => {
      if (!purchase.purchasedAt) return
      const purchaseDate = new Date(purchase.purchasedAt)
      if (Number.isNaN(purchaseDate.getTime())) return
      const monthKey = `${purchaseDate.getFullYear()}-${String(purchaseDate.getMonth() + 1).padStart(2, "0")}`
      const current = trendTotals.get(monthKey) ?? 0
      trendTotals.set(monthKey, current + Number(purchase.amount ?? 0))
    })

    const revenueTrend = trendBuckets.map((bucket) => ({
      name: bucket.name,
      value: trendTotals.get(bucket.monthKey) ?? 0,
    }))

    // compute top creators by revenue from fetched items
    const creatorMap = new Map()

    const addToCreator = (creatorId: string | undefined, name: string | null | undefined, revenue: number, views: number) => {
      if (!creatorId) return
      const existing = creatorMap.get(creatorId) || { revenue: 0, views: 0, name: name || "Unknown" }
      existing.revenue += revenue
      existing.views += views
      if (!existing.name && name) existing.name = name
      creatorMap.set(creatorId, existing)
    }

    events.forEach((e) => addToCreator((e as any).creatorId, e.creator?.profile?.fullName, Number(e.revenue ?? 0), Number(e.viewsCount ?? 0)))
    videos.forEach((v) => addToCreator((v as any).creatorId, v.creator?.profile?.fullName, Number(v.revenue ?? 0), Number(v.viewsCount ?? 0)))
    videoPurchases.forEach((p) => {
      // purchases might not include creatorId; skip if missing
      const cid = (p as any).creatorId
      addToCreator(cid, p.creator?.profile?.fullName, Number(p.revenue ?? 0) || Number(p.amount ?? 0), 0)
    })

    const topCreators = Array.from(creatorMap.entries())
      .map(([id, data]) => ({ id, name: data.name || "Unknown", revenue: data.revenue, views: data.views }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)

    // build unified recent activity list
    const activities: Array<any> = []

    events.forEach((e) =>
      activities.push({
        id: `event:${e.id}`,
        type: "event_created",
        message: `${e.creator?.profile?.fullName || "Unknown"} created event \"${e.title}\"`,
        time: toISO(e.createdAt),
        meta: { revenue: e.revenue ?? 0, isPaid: e.isPaid ?? false },
      })
    )

    videos.forEach((v) =>
      activities.push({
        id: `video:${v.id}`,
        type: "video_created",
        message: `${v.creator?.profile?.fullName || "Unknown"} uploaded video \"${v.title}\"`,
        time: toISO(v.createdAt),
        meta: { revenue: v.revenue ?? 0 },
      })
    )

    videoPurchases.forEach((p) =>
      activities.push({
        id: `video_purchase:${p.id}`,
        type: "video_purchase",
        message: `${p.creator?.profile?.fullName || "Unknown"} sale $${p.amount}`,
        time: toISO(p.purchasedAt),
        meta: { amount: p.amount ?? 0 },
      })
    )

    ticketPurchases.forEach((t) =>
      activities.push({
        id: `ticket_purchase:${t.id}`,
        type: "ticket_purchase",
        message: `${t.ticket?.event?.creator?.profile?.fullName || "Unknown"} ticket sold for \"${t.ticket?.event?.title || "event"}\" $${t.amount}`,
        time: toISO(t.purchasedAt),
        meta: { amount: t.amount ?? 0 },
      })
    )

    payoutRequests.forEach((r) =>
      activities.push({
        id: `payout_request:${r.id}`,
        type: "payout_request",
        message: `${r.creator?.profile?.fullName || "Unknown"} requested payout $${r.amount}`,
        time: toISO(r.requestedAt),
        meta: { amount: r.amount ?? 0, status: r.status },
      })
    )

    // sort by time desc and limit
    const sorted = activities
      .filter((a) => a.time)
      .sort((a, b) => (a.time! < b.time! ? 1 : -1))
      .slice(0, 30)

    return NextResponse.json({ overview, revenueData, revenueTrend, topCreators, recent: sorted }, { status: 200 })
  } catch (error) {
    console.error("Superadmin dashboard GET error:", error)
    return NextResponse.json({ message: "Failed to load dashboard data" }, { status: 500 })
  }
}
