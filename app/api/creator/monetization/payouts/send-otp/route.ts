import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { sendOtp } from "@/lib/auth/dropaphi-client"
import { prisma } from "@/lib/db/prisma"
import { CreatorEventTicketAccessType, Role, SuperAdminSettingSection } from "@/lib/generated/prisma"
import { normalizeRevenueSettings } from "@/lib/superadmin-settings"

function normalizeEmail(email: string | null | undefined) {
  return typeof email === "string" ? email.toLowerCase().trim() : null
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email || session.user.role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const accountId = typeof body.accountId === "string" ? body.accountId : null
    const amount = Number(body.amount)

    if (!accountId) {
      return NextResponse.json({ message: "Account is required" }, { status: 400 })
    }

    const email = normalizeEmail(session.user.email)
    const creator = await prisma.creator.findFirst({
      where: { profile: { email } },
      select: { id: true },
    })

    if (!creator) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 })
    }

    const payoutAccount = await prisma.creatorPayoutAccount.findFirst({
      where: { id: accountId, creatorId: creator.id, verified: true },
      select: { id: true },
    })

    if (!payoutAccount) {
      return NextResponse.json({ message: "Selected payout account is invalid" }, { status: 404 })
    }

    const [videoPurchases, ticketPurchases, pendingPayouts, payoutSettings] = await Promise.all([
      prisma.creatorVideoPurchase.findMany({
        where: { creatorId: creator.id, status: "COMPLETED" },
        select: { revenue: true },
      }),
      prisma.creatorEventTicketPurchase.findMany({
        where: { ticket: { event: { creatorId: creator.id } }, status: "COMPLETED" },
        select: {
          revenue: true,
          ticket: { select: { access: true } },
        },
      }),
      prisma.creatorPayoutRequest.findMany({
        where: { creatorId: creator.id, status: { in: ["pending", "processing"] } },
        select: { amount: true },
      }),
      prisma.superAdminSetting.findFirst({
        where: { section: SuperAdminSettingSection.REVENUE },
        select: { minimumPayoutAmount: true },
      }),
    ])

    const videoRevenue = videoPurchases.reduce((sum, row) => sum + Number(row.revenue ?? 0), 0)
    const streamRevenue = ticketPurchases
      .filter((row) => row.ticket?.access === CreatorEventTicketAccessType.STREAM)
      .reduce((sum, row) => sum + Number(row.revenue ?? 0), 0)
    const venueRevenue = ticketPurchases
      .filter((row) => row.ticket?.access === CreatorEventTicketAccessType.VENUE)
      .reduce((sum, row) => sum + Number(row.revenue ?? 0), 0)
    const totalRevenue = videoRevenue + streamRevenue + venueRevenue
    const unavailable = pendingPayouts.reduce((sum, row) => sum + Number(row.amount ?? 0), 0)
    const minimumPayoutAmount = normalizeRevenueSettings(payoutSettings).minimumPayoutAmount
    const availableForPayout = Math.max(totalRevenue - unavailable, 0)

    if (!Number.isFinite(amount) || amount <= 0 || amount > availableForPayout || amount < minimumPayoutAmount) {
      return NextResponse.json({ message: `Requested amount is not allowed. Minimum payout amount is ₦${minimumPayoutAmount}.` }, { status: 400 })
    }

    const result = await sendOtp(session.user.email, {
      brandName: process.env.DROPAPHI_FROM_NAME,
      fromEmail: process.env.DROPAPHI_FROM_EMAIL,
      expiry: 10,
      length: 6,
    })

    if (!result.ok) {
      return NextResponse.json({ message: result.message ?? "Failed to send OTP", cooldown: result.cooldown }, { status: 500 })
    }

    return NextResponse.json({ message: "OTP sent" }, { status: 200 })
  } catch (error) {
    console.error("Creator payout OTP send error:", error)
    return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 })
  }
}
