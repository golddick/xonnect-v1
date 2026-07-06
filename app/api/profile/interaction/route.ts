import { NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"

export async function POST(request: Request) {
  const session = await auth()
  const profileId = session?.user?.profileId ?? null

  if (!profileId) {
    return NextResponse.json({ message: "Please log in to like this content." }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const kind = body?.kind === "event" || body?.kind === "video" ? body.kind : null
  const itemId = typeof body?.itemId === "string" ? body.itemId : null

  if (!kind || !itemId) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 })
  }

  if (kind === "event") {
    const event = await prisma.creatorEvent.findUnique({
      where: { id: itemId },
      select: { id: true, likesCount: true },
    })

    if (!event) {
      return NextResponse.json({ message: "Event not found." }, { status: 404 })
    }

    const existing = await prisma.creatorEventLike.findFirst({
      where: { creatorEventId: itemId, likerProfileId: profileId },
      select: { id: true, status: true },
    })

    const result = await prisma.$transaction(async (tx) => {
      if (existing?.status === "active") {
        await tx.creatorEventLike.update({
          where: { id: existing.id },
          data: { status: "inactive" },
        })

        const nextCount = Math.max((event.likesCount ?? 0) - 1, 0)
        await tx.creatorEvent.update({ where: { id: itemId }, data: { likesCount: nextCount } })
        return { liked: false, likesCount: nextCount }
      }

      await tx.creatorEventLike.upsert({
        where: {
          creatorEventId_likerProfileId: {
            creatorEventId: itemId,
            likerProfileId: profileId,
          },
        },
        update: { status: "active" },
        create: {
          id: crypto.randomUUID(),
          creatorEventId: itemId,
          likerProfileId: profileId,
          status: "active",
        },
      })

      const nextCount = (event.likesCount ?? 0) + 1
      await tx.creatorEvent.update({ where: { id: itemId }, data: { likesCount: nextCount } })
      return { liked: true, likesCount: nextCount }
    })

    return NextResponse.json(result)
  }

  const video = await prisma.creatorVideo.findUnique({
    where: { id: itemId },
    select: { id: true, likesCount: true },
  })

  if (!video) {
    return NextResponse.json({ message: "Video not found." }, { status: 404 })
  }

  const existing = await prisma.creatorVideoLike.findFirst({
    where: { creatorVideoId: itemId, likerProfileId: profileId },
    select: { id: true, status: true },
  })

  const result = await prisma.$transaction(async (tx) => {
    if (existing?.status === "active") {
      await tx.creatorVideoLike.update({
        where: { id: existing.id },
        data: { status: "inactive" },
      })

      const nextCount = Math.max((video.likesCount ?? 0) - 1, 0)
      await tx.creatorVideo.update({ where: { id: itemId }, data: { likesCount: nextCount } })
      return { liked: false, likesCount: nextCount }
    }

    await tx.creatorVideoLike.upsert({
      where: {
        creatorVideoId_likerProfileId: {
          creatorVideoId: itemId,
          likerProfileId: profileId,
        },
      },
      update: { status: "active" },
      create: {
        id: crypto.randomUUID(),
        creatorVideoId: itemId,
        likerProfileId: profileId,
        status: "active",
      },
    })

    const nextCount = (video.likesCount ?? 0) + 1
    await tx.creatorVideo.update({ where: { id: itemId }, data: { likesCount: nextCount } })
    return { liked: true, likesCount: nextCount }
  })

  return NextResponse.json(result)
}
