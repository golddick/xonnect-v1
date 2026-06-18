import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { initializePaystackTransaction } from "@/lib/paystack"
import {
  createPendingVideoPurchase,
  type VideoPurchaseType,
} from "@/lib/video-purchases"

export const dynamic = "force-dynamic"

function toPurchaseType(value: unknown): VideoPurchaseType | null {
  if (value === "rent24" || value === "rent48" || value === "purchase") return value
  return null
}

function pickAmount(video: {
  rent24Price: number | null
  rent48Price: number | null
  purchasePrice: number | null
}, purchaseType: VideoPurchaseType) {
  if (purchaseType === "rent24") return video.rent24Price
  if (purchaseType === "rent48") return video.rent48Price
  return video.purchasePrice
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const session = await auth()
    const role = session?.user?.role
    const email = session?.user?.email?.toLowerCase() ?? null
    const profileId = session?.user?.profileId ?? null

    const body = (await request.json()) as {
      purchaseType?: unknown
      buyerName?: string
      buyerEmail?: string
      buyerPhone?: string
    }

    const purchaseType = toPurchaseType(body.purchaseType)
    if (!purchaseType) {
      return NextResponse.json({ message: "purchaseType is required" }, { status: 400 })
    }

    const video = await prisma.creatorVideo.findUnique({
      where: { id: resolvedParams.id },
      select: {
        id: true,
        title: true,
        folderId: true,
        creatorId: true,
        rent24Price: true,
        rent48Price: true,
        purchasePrice: true,
      },
    })

    if (!video) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 })
    }

    const amount = pickAmount(video, purchaseType)
    if (amount === null || amount === undefined || amount <= 0) {
      return NextResponse.json({ message: "Selected purchase option is unavailable" }, { status: 400 })
    }

    const buyerEmail = email ?? body.buyerEmail?.trim().toLowerCase() ?? ""
    if (!buyerEmail) {
      return NextResponse.json({ message: "buyerEmail is required" }, { status: 400 })
    }

    const buyerName =
      session?.user?.name?.trim() ||
      body.buyerName?.trim() ||
      buyerEmail.split("@")[0] ||
      "Guest"

    const pendingPurchase = await createPendingVideoPurchase({
      creatorId: video.creatorId,
      creatorVideoId: video.id,
      amount,
      purchaseType,
      buyer: {
        buyerName,
        buyerEmail,
        buyerPhone: body.buyerPhone?.trim() || null,
        buyerProfileId: role === Role.CREATOR ? profileId : profileId ?? null,
      },
    })

    const callbackUrl = new URL(
      `/tv/watch/${video.folderId}`,
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    )
    callbackUrl.searchParams.set("accessCode", pendingPurchase.accessCode)
    callbackUrl.searchParams.set("part", video.id)

    const payment = await initializePaystackTransaction({
      email: buyerEmail,
      amount: Math.round(amount) * 100,
      reference: pendingPurchase.reference,
      callback_url: callbackUrl.toString(),
      metadata: {
        purchaseKind: "video",
        purchaseId: pendingPurchase.purchase.id,
        videoPurchaseId: pendingPurchase.purchase.id,
        creatorId: video.creatorId,
        creatorVideoId: video.id,
        folderId: video.folderId,
        purchaseType,
        accessCode: pendingPurchase.accessCode,
        buyerName,
        buyerEmail,
        buyerProfileId: profileId ?? null,
      },
    })

    return NextResponse.json(
      {
        authorizationUrl: payment.authorization_url,
        accessCode: pendingPurchase.accessCode,
        reference: pendingPurchase.reference,
        purchaseType,
        amount,
        videoId: video.id,
        folderId: video.folderId,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("TV video purchase POST error:", error)
    const message = error instanceof Error ? error.message : "Failed to initialize video purchase"
    return NextResponse.json({ message }, { status: 500 })
  }
}
