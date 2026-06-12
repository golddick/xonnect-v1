import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

function toNumber(n: unknown): number {
  if (typeof n === "number") return n
  if (typeof n === "string") {
    const v = Number(n)
    return Number.isFinite(v) ? v : 0
  }
  return 0
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const role = session?.user?.role

    if (!session?.user?.email || role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const email = session.user.email.toLowerCase()
    const creator = await prisma.creator.findFirst({
      where: { profile: { email } },
      select: { id: true },
    })

    if (!creator) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 })
    }

    const folders = await prisma.creatorVideoFolder.findMany({
      where: { creatorId: creator.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        folderType: true,
        status: true,
        thumbnailUrl: true,
        createdAt: true,
      },
    })

    const folderIds = folders.map((f) => f.id)

    if (folderIds.length === 0) {
      return NextResponse.json({ items: [] }, { status: 200 })
    }

    const videos = await prisma.creatorVideo.findMany({
      where: {
        creatorId: creator.id,
        folderId: { in: folderIds },
      },
      select: {
        id: true,
        folderId: true,
        title: true,
        duration: true,
        status: true,
        thumbnailUrl: true,
        createdAt: true,
        viewsCount: true,
        likesCount: true,
        commentsCount: true,
        revenue: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    const videosByFolder = new Map<string, typeof videos>()
    for (const v of videos) {
      if (!videosByFolder.has(v.folderId)) {
        videosByFolder.set(v.folderId, [])
      }
      videosByFolder.get(v.folderId)!.push(v)
    }

    const items = folders.map((f) => {
      const folderVideos = videosByFolder.get(f.id) ?? []
      return {
        id: f.id,
        title: f.title,
        thumbnail: f.thumbnailUrl || folderVideos[0]?.thumbnailUrl || null,
        status: f.status,
        type: f.folderType,
        isFolder: true,
        uploadDate: f.createdAt,
        itemsCount: folderVideos.length,
        views: folderVideos.reduce((sum, v) => sum + (v.viewsCount ?? 0), 0),
        likes: folderVideos.reduce((sum, v) => sum + (v.likesCount ?? 0), 0),
        comments: folderVideos.reduce((sum, v) => sum + (v.commentsCount ?? 0), 0),
        revenue: folderVideos.reduce((sum, v) => sum + (v.revenue ?? 0), 0),
        videos: folderVideos.map((v) => ({
          id: v.id,
          title: v.title,
          duration: v.duration,
          status: v.status,
          thumbnail: v.thumbnailUrl,
          uploadDate: v.createdAt,
          views: v.viewsCount ?? 0,
          likes: v.likesCount ?? 0,
          comments: v.commentsCount ?? 0,
          revenue: v.revenue ?? 0,
        })),
      }
    })


    return NextResponse.json({ items }, { status: 200 })
  } catch (error) {
    console.error("Creator videos list GET error:", error)
    return NextResponse.json({ message: "Failed to load creator videos" }, { status: 500 })
  }
}

