import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

function assertAuthorized(role?: Role | null) {
  return role === Role.ADMIN || role === Role.SUPERADMIN
}

async function requireAuthorizedUser() {
  const session = await auth()
  const user = session?.user

  if (!user?.email || !assertAuthorized(user.role)) {
    return null
  }

  return user
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuthorizedUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const creator = await prisma.creator.findUnique({
      where: { id: params.id },
      include: {
        profile: {
          select: {
            id: true,
            email: true,
            fullName: true,
            avatarUrl: true,
          },
        },
      },
    })

    if (!creator) {
      return NextResponse.json({ message: "Creator not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        creator: {
          id: creator.id,
          profileId: creator.profileId,
          status: creator.status,
          videoPayoutPercent: creator.videoPayoutPercent,
          eventStreamPayout: creator.eventStreamPayout,
          eventVenuePayout: creator.eventVenuePayout,
          followersCount: creator.followersCount,
          followingCount: creator.followingCount,
          profile: creator.profile,
          createdAt: creator.createdAt.toISOString(),
          updatedAt: creator.updatedAt.toISOString(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Superadmin creator GET error:", error)
    return NextResponse.json({ message: "Failed to load creator" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuthorizedUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const updates: Record<string, unknown> = {}

    if (typeof body.status === "string") {
      updates.status = body.status
    }

    if (typeof body.videoPayoutPercent === "number") {
      updates.videoPayoutPercent = body.videoPayoutPercent
    }

    if (typeof body.eventStreamPayout === "number") {
      updates.eventStreamPayout = body.eventStreamPayout
    }

    if (typeof body.eventVenuePayout === "number") {
      updates.eventVenuePayout = body.eventVenuePayout
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ message: "No valid update fields provided" }, { status: 400 })
    }

    const updatedCreator = await prisma.creator.update({
      where: { id: params.id },
      data: updates,
      include: {
        profile: {
          select: {
            id: true,
            email: true,
            fullName: true,
            avatarUrl: true,
          },
        },
      },
    })

    return NextResponse.json(
      {
        creator: {
          id: updatedCreator.id,
          profileId: updatedCreator.profileId,
          status: updatedCreator.status,
          videoPayoutPercent: updatedCreator.videoPayoutPercent,
          eventStreamPayout: updatedCreator.eventStreamPayout,
          eventVenuePayout: updatedCreator.eventVenuePayout,
          followersCount: updatedCreator.followersCount,
          followingCount: updatedCreator.followingCount,
          profile: updatedCreator.profile,
          createdAt: updatedCreator.createdAt.toISOString(),
          updatedAt: updatedCreator.updatedAt.toISOString(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Superadmin creator PUT error:", error)
    return NextResponse.json({ message: "Failed to update creator" }, { status: 500 })
  }
}
