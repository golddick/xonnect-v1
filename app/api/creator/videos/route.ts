import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { dropid } from "dropid"


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
      rent24Price?: number | null
      rent48Price?: number | null
      purchasePrice?: number | null

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

        rent24Price: body.rent24Price ?? null,
        rent48Price: body.rent48Price ?? null,
        purchasePrice: body.purchasePrice ?? null,

        duration: body.duration ?? null,

        allowComments: body.allowComments ?? true,
        ageRestriction: body.ageRestriction ?? false,

        status: body.status ?? (body.publishNow ? "processing" : "scheduled"),

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

