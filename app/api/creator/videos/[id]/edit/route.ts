import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((s) => s.trim()).filter(Boolean)
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      contentType?: string | null
      videoUrl?: string | null
      videoFileId?: string | null
      thumbnailUrl?: string | null
      thumbnailFileId?: string | null
      tags?: string[]
      packageName?: string | null
      isPrivate?: boolean
      isPremium?: boolean
      monetizationType?: string | null
      rent24Price?: number | null
      rent48Price?: number | null
      purchasePrice?: number | null
      allowComments?: boolean | null
      ageRestriction?: boolean | null
      status?: string | null
      publishNow?: boolean | null
      scheduledAt?: string | null
      duration?: string | null
      episodeIndex?: number | null
      // NOTE: this edit endpoint updates folder meta + the single creatorVideo row.
    }

    const creatorEmail = session.user.email.toLowerCase()
    const creator = await prisma.creator.findFirst({
      where: { profile: { email: creatorEmail } },
      select: { id: true },
    })

    if (!creator) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 })
    }

    const video = await prisma.creatorVideo.findFirst({
      where: { id: params.id, creatorId: creator.id },
      select: { id: true, folderId: true, packageName: true },
    })

    if (!video) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 })
    }

    // Ensure folder is owned by creator (creatorVideo.folderId points to creatorVideoFolder)
    const folder = await prisma.creatorVideoFolder.findFirst({
      where: { id: video.folderId, creatorId: creator.id },
      select: { id: true },
    })

    if (!folder) {
      return NextResponse.json({ message: "Folder not found" }, { status: 404 })
    }

    if (!body.title || typeof body.title !== "string" || body.title.trim().length === 0) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 })
    }

    const nextTitle = body.title.trim()

    const packageName = typeof body.packageName === "string" ? body.packageName.trim() : ""
    const contentType = typeof body.contentType === "string" ? body.contentType.trim() : ""

    const updated = await prisma.$transaction(async (tx) => {
      if (packageName || contentType) {
        await tx.creatorVideoFolder.update({
          where: { id: folder.id },
          data: {
            ...(packageName ? { title: packageName } : {}),
            ...(contentType ? { folderType: contentType } : {}),
          },
        })
      }

      return tx.creatorVideo.update({
        where: { id: params.id },
        data: {
          title: nextTitle,
          description: body.description ?? null,
          category: body.category ?? null,
          ...(typeof body.videoUrl === "string" && body.videoUrl.trim().length > 0
            ? { videoUrl: body.videoUrl.trim() }
            : {}),
          ...(typeof body.videoFileId === "string" && body.videoFileId.trim().length > 0
            ? { videoFileId: body.videoFileId.trim() }
            : {}),
          ...(typeof body.thumbnailUrl === "string" || body.thumbnailUrl === null
            ? { thumbnailUrl: body.thumbnailUrl ?? null }
            : {}),
          ...(typeof body.thumbnailFileId === "string" || body.thumbnailFileId === null
            ? { thumbnailFileId: body.thumbnailFileId ?? null }
            : {}),

          ...(typeof body.duration === "string" && body.duration.trim().length > 0
            ? { duration: body.duration.trim() }
            : {}),

          isPrivate: body.isPrivate ?? false,
          isPremium: body.isPremium ?? false,
          monetizationType: body.monetizationType ?? "free",

          rent24Price: body.rent24Price ?? null,
          rent48Price: body.rent48Price ?? null,
          purchasePrice: body.purchasePrice ?? null,

          allowComments: body.allowComments ?? true,
          ageRestriction: body.ageRestriction ?? false,

          // status/publishNow handling
          status:
            body.status ??
            (body.publishNow === false ? "scheduled" : "processing"),
          publishNow: body.publishNow ?? true,
          scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,

          // Tags + series fields: store on the single row (current DB model)
          tags: parseStringArray(body.tags ?? []),
          packageName: packageName || video.packageName || null,
          // episodeIndex is only meaningful for episode rows; safe to ignore if not provided
          episodeIndex: body.episodeIndex ?? undefined,
        },
      })
    })

    return NextResponse.json({ video: updated }, { status: 200 })
  } catch (error) {
    console.error("Creator video edit PUT error:", error)
    return NextResponse.json(
      { message: "Failed to update creator video" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    const role = session?.user?.role

    if (!session?.user?.email || role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const creatorEmail = session.user.email.toLowerCase()
    const creator = await prisma.creator.findFirst({
      where: { profile: { email: creatorEmail } },
      select: { id: true },
    })

    if (!creator) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 })
    }

    const video = await prisma.creatorVideo.findFirst({
      where: { id: params.id, creatorId: creator.id },
      select: { id: true },
    })

    if (!video) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 })
    }

    await prisma.creatorVideo.delete({
      where: { id: video.id },
    })

    return NextResponse.json({ message: "Video deleted" }, { status: 200 })
  } catch (error) {
    console.error("Creator video DELETE error:", error)
    return NextResponse.json({ message: "Failed to delete video" }, { status: 500 })
  }
}

