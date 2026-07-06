import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

function normalizeEmail(email: string | null | undefined) {
  return typeof email === "string" ? email.toLowerCase().trim() : null
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session?.user?.email || session.user.role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const payoutAccountId = params.id
    const email = normalizeEmail(session.user.email)

    const creator = await prisma.creator.findFirst({
      where: { profile: { email } },
      select: { id: true },
    })
    if (!creator) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 })
    }

    const existing = await prisma.creatorPayoutAccount.findFirst({
      where: { id: payoutAccountId, creatorId: creator.id },
      select: { id: true },
    })
    if (!existing) {
      return NextResponse.json({ message: "Payout account not found" }, { status: 404 })
    }

    await prisma.creatorPayoutAccount.updateMany({
      where: { creatorId: creator.id, isPrimary: true },
      data: { isPrimary: false },
    })

    const updated = await prisma.creatorPayoutAccount.update({
      where: { id: payoutAccountId },
      data: { isPrimary: true },
    })

    return NextResponse.json({ payoutAccount: updated }, { status: 200 })
  } catch (error) {
    console.error("Creator payout account primary update error:", error)
    return NextResponse.json(
      { message: "Failed to set payout account primary" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session?.user?.email || session.user.role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const payoutAccountId = params.id
    const email = normalizeEmail(session.user.email)

    const creator = await prisma.creator.findFirst({
      where: { profile: { email } },
      select: { id: true },
    })
    if (!creator) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 })
    }

    const account = await prisma.creatorPayoutAccount.findFirst({
      where: { id: payoutAccountId, creatorId: creator.id },
      select: { id: true, isPrimary: true },
    })

    if (!account) {
      return NextResponse.json({ message: "Payout account not found" }, { status: 404 })
    }

    await prisma.creatorPayoutAccount.delete({ where: { id: payoutAccountId } })

    if (account.isPrimary) {
      const nextAccount = await prisma.creatorPayoutAccount.findFirst({
        where: { creatorId: creator.id },
        orderBy: { createdAt: "asc" },
      })
      if (nextAccount) {
        await prisma.creatorPayoutAccount.update({
          where: { id: nextAccount.id },
          data: { isPrimary: true },
        })
      }
    }

    return NextResponse.json({ message: "Payout account removed" }, { status: 200 })
  } catch (error) {
    console.error("Creator payout account delete error:", error)
    return NextResponse.json(
      { message: "Failed to remove payout account" },
      { status: 500 }
    )
  }
}
