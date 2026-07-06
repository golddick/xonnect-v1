import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { verifyOtp } from "@/lib/auth/dropaphi-client"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email || session.user.role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { accountId, code } = body

    if (!accountId || typeof accountId !== "string") {
      return NextResponse.json({ message: "accountId is required" }, { status: 400 })
    }
    if (!code || typeof code !== "string") {
      return NextResponse.json({ message: "OTP code is required" }, { status: 400 })
    }

    const otpResult = await verifyOtp(session.user.email, code)
    if (!otpResult.ok || !otpResult.valid) {
      return NextResponse.json({ message: otpResult.message ?? "Invalid OTP" }, { status: 401 })
    }

    const account = await prisma.creatorPayoutAccount.findUnique({
      where: { id: accountId },
      select: { id: true, creatorId: true, isPrimary: true },
    })
    if (!account) {
      return NextResponse.json({ message: "Payout account not found" }, { status: 404 })
    }

    await prisma.creatorPayoutAccount.update({
      where: { id: accountId },
      data: { verified: true, verifiedAt: new Date() },
    })

    return NextResponse.json({ message: "Payout account verified" }, { status: 200 })
  } catch (error) {
    console.error("Creator payout verification error:", error)
    return NextResponse.json({ message: "Failed to verify payout account" }, { status: 500 })
  }
}
