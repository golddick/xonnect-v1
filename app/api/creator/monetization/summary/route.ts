import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

function normalizeEmail(email: string | null | undefined) {
  return typeof email === "string" ? email.toLowerCase().trim() : null
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.email || session.user.role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const email = normalizeEmail(session.user.email)
    const creator = await prisma.creator.findFirst({
      where: { profile: { email } },
      select: {
        id: true,
        videoPayoutPercent: true,
        eventStreamPayout: true,
        eventVenuePayout: true,
      },
    })

    if (!creator) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 })
    }

    const [videoRevenueRows, ticketRows, pendingPayoutsRows] = await Promise.all([
      prisma.creatorVideo.findMany({
        where: { creatorId: creator.id },
        select: { revenue: true },
      }),
      prisma.creatorEventTicket.findMany({
        where: { event: { creatorId: creator.id } },
        select: {
          access: true,
          revenue: true,
          platformFee: true,
        },
      }),
      prisma.creatorPayoutRequest.findMany({
        where: { creatorId: creator.id, status: { in: ["pending", "processing"] } },
        select: { amount: true },
      }),
    ])

    const videoRevenue = videoRevenueRows.reduce((sum, row) => sum + Number(row.revenue ?? 0), 0)
    const streamRevenue = ticketRows
      .filter((row) => row.access === "STREAM")
      .reduce((sum, row) => sum + Math.max(Number(row.revenue ?? 0) - Number(row.platformFee ?? 0), 0), 0)
    const venueRevenue = ticketRows
      .filter((row) => row.access === "VENUE")
      .reduce((sum, row) => sum + Math.max(Number(row.revenue ?? 0) - Number(row.platformFee ?? 0), 0), 0)
    const pendingPayouts = pendingPayoutsRows.reduce((sum, row) => sum + Number(row.amount ?? 0), 0)

    const totalRevenue = videoRevenue + streamRevenue + venueRevenue

    return NextResponse.json({
      summary: {
        totalRevenue,
        streamRevenue,
        venueRevenue,
        videoRevenue,
        availableForPayout: totalRevenue - pendingPayouts,
        pendingPayouts,
      },
    })
  } catch (error) {
    console.error("Creator monetization summary error:", error)
    return NextResponse.json({ message: "Failed to load monetization summary" }, { status: 500 })
  }
}
