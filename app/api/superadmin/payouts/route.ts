import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

function assertAuthorized(role?: Role | null) {
  return role === Role.ADMIN || role === Role.SUPERADMIN
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const user = session?.user

    if (!user?.email || !assertAuthorized(user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const payoutRequests = await prisma.creatorPayoutRequest.findMany({
      orderBy: [{ status: "asc" }, { requestedAt: "desc" }],
      include: {
        creator: {
          select: {
            id: true,
            profile: {
              select: {
                id: true,
                email: true,
                fullName: true,
                avatarUrl: true,
              },
            },
          },
        },
        payoutAccount: true,
      },
    })

    const payouts = payoutRequests.map((request) => ({
      id: request.id,
      creatorId: request.creatorId,
      creatorName: request.creator?.profile?.fullName ?? "Unknown creator",
      creatorEmail: request.creator?.profile?.email ?? "",
      creatorAvatar: request.creator?.profile?.avatarUrl ?? "",
      amount: request.amount,
      status: request.status,
      note: request.note,
      receiptUrl: request.receiptUrl,
      transactionId: request.transactionId,
      requestDate: request.requestedAt.toISOString(),
      processedDate: request.processedAt?.toISOString() ?? null,
      paymentMethod: "Bank Transfer",
      bankDetails: request.payoutAccount
        ? {
            bankName: request.payoutAccount.bankName,
            accountNumber: request.payoutAccount.accountNumber,
            accountName: request.payoutAccount.accountName,
            accountType: request.payoutAccount.accountType,
            isVerified: request.payoutAccount.verified,
          }
        : undefined,
    }))

    return NextResponse.json({ payouts }, { status: 200 })
  } catch (error) {
    console.error("Superadmin payout requests load error:", error)
    return NextResponse.json({ message: "Failed to load payout requests" }, { status: 500 })
  }
}
