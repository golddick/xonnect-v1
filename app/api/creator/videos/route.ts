import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { dropid } from "dropid"

// Helper function to validate price values
function validatePrice(value: unknown): number | null {
  // Allow omitted, null, or empty string values
  if (value === undefined || value === null || value === "") {
    return null;
  }

  // Convert to number
  const num = Number(value);
  
  // Reject NaN, Infinity, -Infinity
  if (!Number.isFinite(num)) {
    return null;
  }

  // Reject negative numbers
  if (num < 0) {
    return null;
  }

  // Reject fractional numbers (must be integers)
  if (!Number.isInteger(num)) {
    return null;
  }

  return num; // 0 is valid and will be returned as 0
}

// Creator: create a video record after client uploaded to DropAphi
// POST /api/creator/videos
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const role = session?.user?.role

    if (!session?.user?.email || role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = (await request.json()) as {
      title?: string
      description?: string | null
      category?: string | null
      videoUrl?: string | null
      videoFileId?: string | null
      thumbnailUrl?: string | null
      thumbnailFileId?: string | null
      duration?: string | null
      isPrivate?: boolean
      isPremium?: boolean
      monetizationType?: string | null
      // pricing
      rent24Price?: number | string | null
      rent48Price?: number | string | null
      purchasePrice?: number | string | null

      status?: string | null
      publishNow?: boolean
      scheduledAt?: string | null
      tags?: string[]

      // settings
      allowComments?: boolean | null
      ageRestriction?: boolean | null

      // series support (optional)
      packageName?: string | null
      episodeIndex?: number | null

      // Folder-first: everything must belong to a folder
      folderId?: string | null
    }

    const email = session.user.email.toLowerCase()

    const creator = await prisma.creator.findFirst({
      where: { profile: { email } },
      select: { id: true },
    })

    if (!creator) {
      return NextResponse.json(
        { message: "Creator profile not found" },
        { status: 404 }
      )
    }

    if (!body.title || typeof body.title !== "string" || body.title.trim().length === 0) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 })
    }

    const folderId = body.folderId ?? null
    if (!folderId) {
      return NextResponse.json({ message: "folderId is required" }, { status: 400 })
    }

    // Validate folder belongs to creator
    const folder = await prisma.creatorVideoFolder.findFirst({
      where: { id: folderId, creatorId: creator.id },
      select: { id: true },
    })

    if (!folder) {
      return NextResponse.json({ message: "Folder not found" }, { status: 404 })
    }

    // Validate price fields
    const validatedRent24Price = validatePrice(body.rent24Price);
    const validatedRent48Price = validatePrice(body.rent48Price);
    const validatedPurchasePrice = validatePrice(body.purchasePrice);

    
    const isRent24PriceProvided = body.rent24Price !== undefined && 
                                  body.rent24Price !== null && 
                                  body.rent24Price !== "";
    
    if (validatedRent24Price === null && isRent24PriceProvided) {
      return NextResponse.json(
        { message: "rent24Price must be a valid non-negative integer" },
        { status: 400 }
      );
    }
    
    const isRent48PriceProvided = body.rent48Price !== undefined && 
                                  body.rent48Price !== null && 
                                  body.rent48Price !== "";
    
    if (validatedRent48Price === null && isRent48PriceProvided) {
      return NextResponse.json(
        { message: "rent48Price must be a valid non-negative integer" },
        { status: 400 }
      );
    }
    
    const isPurchasePriceProvided = body.purchasePrice !== undefined && 
                                    body.purchasePrice !== null && 
                                    body.purchasePrice !== "";
    
    if (validatedPurchasePrice === null && isPurchasePriceProvided) {
      return NextResponse.json(
        { message: "purchasePrice must be a valid non-negative integer" },
        { status: 400 }
      );
    }

    const created = await prisma.creatorVideo.create({
      data: {
        id: dropid("video"),
        creatorId: creator.id,
        folderId,

        title: body.title.trim(),
        description: body.description ?? null,
        category: body.category ?? null,
        videoUrl: body.videoUrl ?? null,
        videoFileId: body.videoFileId ?? null,
        thumbnailUrl: body.thumbnailUrl ?? null,
        thumbnailFileId: body.thumbnailFileId ?? null,
        isPrivate: body.isPrivate ?? false,
        isPremium: body.isPremium ?? false,
        monetizationType: body.monetizationType ?? "free",

        rent24Price: validatedRent24Price,
        rent48Price: validatedRent48Price,
        purchasePrice: validatedPurchasePrice,

        duration: body.duration ?? null,

        allowComments: body.allowComments ?? true,
        ageRestriction: body.ageRestriction ?? false,

        status: body.status ?? (body.publishNow ? "published" : "scheduled"),

        publishNow: body.publishNow ?? true,
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
        tags: body.tags ?? [],
        packageName: body.packageName ?? null,
        episodeIndex: body.episodeIndex ?? null,
      },
    })

    return NextResponse.json({ video: created }, { status: 201 })

  } catch (error) {
    console.error("Creator video create error:", error)
    return NextResponse.json(
      { message: "Failed to create creator video" },
      { status: 500 }
    )
  }
}