import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { verifyOtp } from "@/lib/auth/dropaphi-client"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { dropid } from "dropid"

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
    const code = typeof body.code === "string" ? body.code : null

    if (!accountId || !code) {
      return NextResponse.json({ message: "Account and OTP are required" }, { status: 400 })
    }

    const otpResult = await verifyOtp(session.user.email, code)
    if (!otpResult.ok || !otpResult.valid) {
      return NextResponse.json({ message: otpResult.message ?? "Invalid OTP" }, { status: 401 })
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

    const pendingPayouts = await prisma.creatorPayoutRequest.findMany({
      where: { creatorId: creator.id, status: { in: ["pending", "processing"] } },
      select: { amount: true },
    })

    const available = await prisma.creatorVideo.findMany({ where: { creatorId: creator.id }, select: { revenue: true } })
    const eventRevenue = await prisma.creatorEvent.findMany({ where: { creatorId: creator.id }, select: { revenue: true } })
    const totalRevenue = available.reduce((sum, row) => sum + Number(row.revenue ?? 0), 0) + eventRevenue.reduce((sum, row) => sum + Number(row.revenue ?? 0), 0)
    const unavailable = pendingPayouts.reduce((sum, row) => sum + Number(row.amount ?? 0), 0)

    if (!Number.isFinite(amount) || amount <= 0 || amount > totalRevenue - unavailable) {
      return NextResponse.json({ message: "Requested amount is not allowed" }, { status: 400 })
    }

    const request = await prisma.creatorPayoutRequest.create({
      data: {
        id: dropid("payout_request"),
        creatorId: creator.id,
        payoutAccountId: payoutAccount.id,
        amount: Math.round(amount),
        currency: "NGN",
        status: "pending",
      },
    })

    return NextResponse.json({ payoutRequest: request, message: "Payout request created" }, { status: 201 })
  } catch (error) {
    console.error("Creator payout verify error:", error)
    return NextResponse.json({ message: "Failed to verify payout request" }, { status: 500 })
  }
}
