import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { dropid } from "dropid"

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

    return NextResponse.json({ folders }, { status: 200 })
  } catch (error) {
    console.error("Creator folders GET error:", error)
    return NextResponse.json({ message: "Failed to load folders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const role = session?.user?.role

    if (!session?.user?.email || role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = (await request.json()) as {
      title?: string
      folderType?: string
      status?: string
      thumbnailUrl?: string | null
    }

    const email = session.user.email.toLowerCase()
    const creator = await prisma.creator.findFirst({
      where: { profile: { email } },
      select: { id: true },
    })

    if (!creator) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 })
    }

    if (!body.title || typeof body.title !== "string" || body.title.trim().length === 0) {
      return NextResponse.json({ message: "title is required" }, { status: 400 })
    }

    if (!body.folderType || typeof body.folderType !== "string") {
      return NextResponse.json({ message: "folderType is required" }, { status: 400 })
    }

    const folder = await prisma.creatorVideoFolder.create({
      data: {
        id:dropid('folder'),
        creatorId: creator.id,
        title: body.title.trim(),
        folderType: body.folderType,
        status: body.status ?? "active",
        thumbnailUrl: body.thumbnailUrl ?? null,
      },
      select: {
        id: true,
        title: true,
        folderType: true,
        status: true,
        thumbnailUrl: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ folder }, { status: 201 })
  } catch (error) {
    console.error("Creator folders POST error:", error)
    return NextResponse.json({ message: "Failed to create folder" }, { status: 500 })
  }
}

