import { dropid } from "dropid"

import { prisma } from "@/lib/db/prisma"
import { normalizeRevenueSettings } from "@/lib/superadmin-settings"
import { SuperAdminSettingSection } from "@/lib/generated/prisma"

const db = prisma as any

export type VideoPurchaseType = "rent24" | "rent48" | "purchase"

export type VideoPurchaseBuyer = {
  buyerName?: string | null 
  buyerEmail: string
  buyerPhone?: string | null
  buyerProfileId?: string | null
}

export function calculateVideoRevenueSplit(amount: number, platformFeePercentage: number) {
  const safeAmount = Math.max(Math.round(amount), 0)
  const safeFeePercentage = Math.max(Math.round(platformFeePercentage), 0)
  const platformFeeAmount = Math.round((safeAmount * safeFeePercentage) / 100)
  const creatorRevenueAmount = Math.max(safeAmount - platformFeeAmount, 0)

  return {
    amount: safeAmount,
    platformFeeAmount,
    creatorRevenueAmount,
  }
}

export function getPlatformVideoPercentageFromEnv() {
  const raw = process.env.PLATFORM_VIDEO_PERCENT

  if (!raw) return null

  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : 10
}

export async function getPlatformVideoFeePercentage() {
  const fromEnv = getPlatformVideoPercentageFromEnv()
  if (fromEnv !== null) return fromEnv

  const setting = await db.superAdminSetting.findUnique({
    where: {
      section: SuperAdminSettingSection.REVENUE,
    },
  })

  return normalizeRevenueSettings(
    setting
      ? {
          platformFeePercentage: setting.platformFeePercentage,
          enterpriseFeePercentage: setting.enterpriseFeePercentage,
          minimumPayoutAmount: setting.minimumPayoutAmount,
          payoutProcessingDays: setting.payoutProcessingDays,
        }
      : null
  ).platformFeePercentage
}

export function createVideoAccessCode(videoId: string, reference: string) {
  const suffix = reference.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase()
  return `VDO-${videoId.slice(0, 4).toUpperCase()}-${suffix}`
}

export function getVideoAccessExpiry(purchaseType: VideoPurchaseType) {
  if (purchaseType === "rent24") {
    return new Date(Date.now() + 24 * 60 * 60 * 1000)
  }

  if (purchaseType === "rent48") {
    return new Date(Date.now() + 48 * 60 * 60 * 1000)
  }

  return null
}

export async function createPendingVideoPurchase(args: {
  creatorId: string
  creatorVideoId: string
  amount: number
  purchaseType: VideoPurchaseType
  buyer: VideoPurchaseBuyer
  reference?: string
  currency?: string
}) {
  const reference = args.reference ?? dropid("pay")
  const accessCode = createVideoAccessCode(args.creatorVideoId, reference)

  const purchase = await db.creatorVideoPurchase.create({
    data: {
      id: dropid("videoPurchase"),
      creatorId: args.creatorId,
      creatorVideoId: args.creatorVideoId,
      buyerProfileId: args.buyer.buyerProfileId ?? null,
      buyerName: args.buyer.buyerName ?? null,
      buyerEmail: args.buyer.buyerEmail,
      buyerPhone: args.buyer.buyerPhone ?? null,
      purchaseType: args.purchaseType,
      accessCode,
      amount: Math.max(Math.round(args.amount), 0),
      currency: args.currency ?? "NGN",
      status: "PENDING",
      transactionId: reference,
      accessExpiresAt: getVideoAccessExpiry(args.purchaseType),
    },
  })

  return {
    purchase,
    reference,
    accessCode,
  }
}

export async function completeVideoPurchase(args: {
  purchaseId?: string | null
  creatorVideoId: string
  creatorId: string
  amount: number
  reference: string
  buyer: VideoPurchaseBuyer
  purchaseType: VideoPurchaseType
  currency?: string
}) {
  const existing = args.purchaseId
    ? await db.creatorVideoPurchase.findUnique({
        where: { id: args.purchaseId },
        select: { id: true, status: true, amount: true, accessCode: true, purchaseType: true, creatorVideoId: true },
      })
    : await db.creatorVideoPurchase.findFirst({
        where: { transactionId: args.reference },
        select: { id: true, status: true, amount: true, accessCode: true, purchaseType: true, creatorVideoId: true },
      })

  if (!existing) {
    throw new Error("Video purchase record not found")
  }

  if (existing.status === "COMPLETED") {
    return { alreadyCompleted: true }
  }

  const feePercentage = await getPlatformVideoFeePercentage()
  const revenueSplit = calculateVideoRevenueSplit(args.amount, feePercentage)
  const accessExpiresAt = getVideoAccessExpiry(args.purchaseType)
  const video = await db.creatorVideo.findUnique({
    where: { id: args.creatorVideoId },
    select: {
      id: true,
      creatorId: true,
      revenue: true,
    },
  })

  if (!video) {
    throw new Error("Video not found")
  }

  if (video.creatorId !== args.creatorId) {
    throw new Error("Video creator mismatch")
  }

  await db.$transaction(async (tx: any) => {
    await tx.creatorVideoPurchase.update({
      where: { id: existing.id },
      data: {
        buyerProfileId: args.buyer.buyerProfileId ?? null,
        buyerName: args.buyer.buyerName ?? null,
        buyerEmail: args.buyer.buyerEmail,
        buyerPhone: args.buyer.buyerPhone ?? null,
        purchaseType: args.purchaseType,
        amount: revenueSplit.amount,
        currency: args.currency ?? "NGN",
        status: "COMPLETED",
        transactionId: args.reference,
        accessExpiresAt,
        completedAt: new Date(),
      },
    })

    await tx.creatorVideo.update({
      where: { id: args.creatorVideoId },
      data: {
        revenue: { increment: revenueSplit.creatorRevenueAmount },
      },
    })
  })

  return {
    alreadyCompleted: false,
    feePercentage,
    platformFeeAmount: revenueSplit.platformFeeAmount,
    creatorRevenueAmount: revenueSplit.creatorRevenueAmount,
    accessCode: existing.accessCode,
    accessExpiresAt,
  }
}
