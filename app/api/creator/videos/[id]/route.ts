import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const folder = await prisma.creatorVideoFolder.findFirst({
      where: { id: params.id, creatorId: creator.id },
      select: {
        id: true,
        title: true,
        folderType: true,
        status: true,
        thumbnailUrl: true,
        createdAt: true,
      },
    })

    if (!folder) {
      return NextResponse.json({ message: "Folder not found" }, { status: 404 })
    }

    const videos = await prisma.creatorVideo.findMany({
      where: { folderId: folder.id },
      orderBy: { episodeIndex: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        duration: true,
        createdAt: true,
        videoUrl: true,
        videoFileId: true,
        status: true,
        publishNow: true,
        monetizationType: true,
        episodeIndex: true,
        isPrivate: true,
        isPremium: true,
        allowComments: true,
        ageRestriction: true,
        thumbnailUrl: true,
        thumbnailFileId: true,
        viewsCount: true,
        likesCount: true,
        commentsCount: true,
        revenue: true,
        rent24Price: true,
        rent48Price: true,
        purchasePrice: true,
        tags: true,
        packageName: true,
      },
    })

    // Map videos with all details for player view
    const parts = videos.map((v) => ({
      id: v.id,
      title: v.title,
      description: v.description,
      duration: v.duration,
      views: v.viewsCount ?? 0,
      likes: v.likesCount ?? 0,
      comments: v.commentsCount ?? 0,
      revenue: v.revenue ?? 0,
      thumbnail: v.thumbnailUrl,
      videoUrl: v.videoUrl,
      episodeIndex: v.episodeIndex,
      status: v.status,
      category: v.category,
      uploadDate: v.createdAt,
      monetizationType: v.monetizationType,
      isPrivate: v.isPrivate,
      isPremium: v.isPremium,
      allowComments: v.allowComments,
      rent24Price: v.rent24Price,
      rent48Price: v.rent48Price,
      purchasePrice: v.purchasePrice,
      tags: v.tags,
      packageName: v.packageName,
    }))

      return NextResponse.json(
        {
          folder: {
            id: folder.id,
          title: folder.title,
          contentType: folder.folderType,
          status: folder.status,
          thumbnail: folder.thumbnailUrl,
          uploadDate: folder.createdAt,
          description: null,
          parts,
        },
        },
      { status: 200 }
    )
  } catch (error) {
    console.error("Creator video view GET error:", error)
    return NextResponse.json({ message: "Failed to load folder" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const folder = await prisma.creatorVideoFolder.findFirst({
      where: { id: params.id, creatorId: creator.id },
      select: { id: true },
    })

    if (!folder) {
      return NextResponse.json({ message: "Folder not found" }, { status: 404 })
    }

    await prisma.creatorVideoFolder.delete({
      where: { id: folder.id },
    })

    return NextResponse.json({ message: "Folder deleted" }, { status: 200 })
  } catch (error) {
    console.error("Creator video folder DELETE error:", error)
    return NextResponse.json({ message: "Failed to delete folder" }, { status: 500 })
  }
}



