import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { dropid } from "dropid"

// Creator agreement accept flow
// POST /api/creator-agreement/accept
export async function POST(request: NextRequest) {

  try {
    const session = await auth()
    const email = session?.user?.email

    if (!email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const accepted = body?.accepted

    if (accepted !== true) {
      return NextResponse.json({ message: "Agreement must be accepted" }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase()

    await prisma.profile.update({
      where: { email: normalizedEmail },
      data: {
        role: Role.CREATOR,
      },
    })

    const creator = await prisma.creator.upsert({
      where: { profileId: normalizedEmail },
      update: {},
      create: {
        id: dropid("creator"),
        profileId: normalizedEmail,
      },
      select: {
        id: true,
        profileId: true,
      },
    })

    const profile = await prisma.profile.findUnique({
      where: { email: normalizedEmail },
      select: {
        id: true,
        email: true,
        role: true,
        fullName: true,
        avatarUrl: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ profile, creator }, { status: 200 })
  } catch (error) {
    console.error("Creator agreement accept error:", error)
    return NextResponse.json({ message: "Failed to accept agreement" }, { status: 500 })
  }
}

