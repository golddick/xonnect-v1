import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

function normalizeEmail(email: string | null | undefined): string | undefined {
  return typeof email === "string" ? email.toLowerCase().trim() : undefined
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.email || session.user.role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const email = normalizeEmail(session.user.email)
    if (!email ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const creator = await prisma.creator.findFirst({
      where: { profile: { email } },
      select: { id: true },
    })

    if (!creator) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 })
    }

    const payoutAccounts = await prisma.creatorPayoutAccount.findMany({
      where: { creatorId: creator.id, verified: true },
      orderBy: [{ isPrimary: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        bankName: true,
        accountName: true,
        accountNumber: true,
        accountType: true,
        isPrimary: true,
        verified: true,
      },
    })

    return NextResponse.json({ payoutAccounts }, { status: 200 })
  } catch (error) {
    console.error("Creator payout accounts load error:", error)
    return NextResponse.json({ message: "Failed to load payout accounts" }, { status: 500 })
  }
}
