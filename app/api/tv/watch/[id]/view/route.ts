import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { dropid } from "dropid"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const session = await auth()
    const profileId = session?.user?.profileId ?? null

    // ensure video exists
    const video = await prisma.creatorVideo.findUnique({ where: { id }, select: { id: true } })
    if (!video) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 })
    }

    await prisma.creatorVideoView.create({
      data: {
        id: dropid("view"),
        creatorVideoId: id,
        viewerProfileId: profileId ?? null,
      },
    })

    await prisma.creatorVideo.update({
      where: { id },
      data: {
        viewsCount: { increment: 1 },
      },
    })

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error("Record video view error:", error)
    return NextResponse.json({ message: "Failed to record view" }, { status: 500 })
  }
}
