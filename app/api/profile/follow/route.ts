import { NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"

export async function POST(request: Request) {
  const session = await auth()
  const profileId = session?.user?.profileId ?? null
  const userEmail = session?.user?.email ?? null

  if (!profileId || !userEmail) {
    return NextResponse.json({ message: "Please log in to follow creators." }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const creatorId = typeof body?.creatorId === "string" ? body.creatorId : null

  if (!creatorId) {
    return NextResponse.json({ message: "Creator is required." }, { status: 400 })
  }

  const creator = await prisma.creator.findUnique({
    where: { id: creatorId },
    select: { id: true, profileId: true, followersCount: true },
  })

  if (!creator) {
    return NextResponse.json({ message: "Creator not found." }, { status: 404 })
  }

  if (creator.profileId === profileId) {
    return NextResponse.json({ message: "You cannot follow yourself." }, { status: 400 })
  }

  const existing = await prisma.creatorFollow.findFirst({
    where: {
      creatorId,
      followerProfileId: profileId,
    },
    select: { id: true, status: true },
  })

  const result = await prisma.$transaction(async (tx) => {
    const followerCreator = await tx.creator.findFirst({
      where: { profile: { email: userEmail } },
      select: { id: true, followingCount: true },
    })

    if (existing?.status === "active") {
      await tx.creatorFollow.update({
        where: { id: existing.id },
        data: { status: "inactive" },
      })

      const nextCount = Math.max((creator.followersCount ?? 0) - 1, 0)
      await tx.creator.update({
        where: { id: creatorId },
        data: { followersCount: nextCount },
      })

      if (followerCreator) {
        await tx.creator.update({
          where: { id: followerCreator.id },
          data: { followingCount: Math.max((followerCreator.followingCount ?? 0) - 1, 0) },
        })
      }

      return { following: false, followersCount: nextCount }
    }

    await tx.creatorFollow.upsert({
      where: {
        followerProfileId_creatorId: {
          followerProfileId: profileId,
          creatorId,
        },
      },
      update: {
        status: "active",
      },
      create: {
        id: crypto.randomUUID(),
        creatorId,
        followerProfileId: profileId,
        status: "active",
      },
    })

    const nextCount = (creator.followersCount ?? 0) + 1
    await tx.creator.update({
      where: { id: creatorId },
      data: { followersCount: nextCount },
    })

    if (followerCreator) {
      await tx.creator.update({
        where: { id: followerCreator.id },
        data: { followingCount: (followerCreator.followingCount ?? 0) + 1 },
      })
    }

    return { following: true, followersCount: nextCount }
  })

  return NextResponse.json(result)
}
