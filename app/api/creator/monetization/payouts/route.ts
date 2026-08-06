import { NextResponse } from "next/server"
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
    if (!email) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 })
    }

    const creator = await prisma.creator.findFirst({
      where: { profile: { email } },
      select: { id: true },
    })

    if (!creator) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 })
    }

    // Option 1: Use only `select` (recommended)
    const payoutRequests = await prisma.creatorPayoutRequest.findMany({
      where: { creatorId: creator.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        amount: true,
        status: true,
        note: true,
        receiptUrl: true,
        requestedAt: true,
        processedAt: true,
        payoutAccount: {
          select: {
            bankName: true,
            accountName: true,
            accountNumber: true,
            accountType: true,
          },
        },
      },
    })

    return NextResponse.json({ payoutRequests }, { status: 200 })
  } catch (error) {
    console.error("Creator payout requests load error:", error)
    return NextResponse.json({ message: "Failed to load payout requests" }, { status: 500 })
  }
}