import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

function normalizeEmail(email: string | null | undefined): string | undefined {
  return typeof email === "string" ? email.toLowerCase().trim() : undefined
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.email || session.user.role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const profile = await prisma.profile.findUnique({
      where: { email: normalizeEmail(session.user.email) },
      select: {
        profileVisibility: true,
        showEmail: true,
        showLocation: true,
        allowMessages: true,
        showOnlineStatus: true,
      },
    })

    if (!profile) {
      return NextResponse.json({ message: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json({ privacy: profile }, { status: 200 })
  } catch (error) {
    console.error("Creator privacy load error:", error)
    return NextResponse.json(
      { message: "Failed to load privacy settings" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email || session.user.role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const email = normalizeEmail(session.user.email)

    const updateData: Record<string, unknown> = {}
    if (typeof body.profileVisibility === "string") {
      updateData.profileVisibility = body.profileVisibility
    }
    if (typeof body.showEmail === "boolean") {
      updateData.showEmail = body.showEmail
    }
    if (typeof body.showLocation === "boolean") {
      updateData.showLocation = body.showLocation
    }
    if (typeof body.allowMessages === "boolean") {
      updateData.allowMessages = body.allowMessages
    }
    if (typeof body.showOnlineStatus === "boolean") {
      updateData.showOnlineStatus = body.showOnlineStatus
    }

    const updated = await prisma.profile.update({
      where: { email },
      data: updateData,
    })

    return NextResponse.json({ privacy: updated }, { status: 200 })
  } catch (error) {
    console.error("Creator privacy update error:", error)
    return NextResponse.json(
      { message: "Failed to update privacy settings" },
      { status: 500 }
    )
  }
}
