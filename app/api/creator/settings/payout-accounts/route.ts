import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { dropid } from "dropid"

function normalizeEmail(email: string | null | undefined) {
  return typeof email === "string" ? email.toLowerCase().trim() : null
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.email || session.user.role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const creator = await prisma.creator.findFirst({
      where: { profile: { email: normalizeEmail(session.user.email) } },
      include: { payoutAccounts: true },
    })

    if (!creator) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 })
    }

    return NextResponse.json({ payoutAccounts: creator.payoutAccounts }, { status: 200 })
  } catch (error) {
    console.error("Creator payout accounts load error:", error)
    return NextResponse.json(
      { message: "Failed to load payout accounts" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email || session.user.role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const email = normalizeEmail(session.user.email)

    const bankName = typeof body.bankName === "string" ? body.bankName.trim() : null
    const accountNumber = typeof body.accountNumber === "string" ? body.accountNumber.trim() : null
    const accountName = typeof body.accountName === "string" ? body.accountName.trim() : null
    const accountType = typeof body.accountType === "string" ? body.accountType.trim() : null
    const isPrimary = Boolean(body.isPrimary)

    if (!bankName || !accountNumber || !accountName || !accountType) {
      return NextResponse.json(
        { message: "Bank name, account number, account name and account type are required" },
        { status: 400 }
      )
    }

    const creator = await prisma.creator.findFirst({
      where: { profile: { email } },
      select: { id: true },
    })

    if (!creator) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 })
    }

    if (isPrimary) {
      await prisma.creatorPayoutAccount.updateMany({
        where: { creatorId: creator.id, isPrimary: true },
        data: { isPrimary: false },
      })
    }

    const created = await prisma.creatorPayoutAccount.create({
      data: {
        id: dropid("payout_account"),
        creatorId: creator.id,
        bankName,
        accountNumber,
        accountName,
        accountType,
        isPrimary,
        verified: false,
      },
    })

    return NextResponse.json({ payoutAccount: created }, { status: 201 })
  } catch (error) {
    console.error("Creator payout account create error:", error)
    return NextResponse.json(
      { message: "Failed to create payout account" },
      { status: 500 }
    )
  }
}
