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

    const email = normalizeEmail(session.user.email)
    if (!email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const creator = await prisma.creator.findFirst({
      where: { profile: { email } },
      include: { profile: true },
    })

    if (!creator || !creator.profile) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 })
    }

    const profile = creator.profile
    return NextResponse.json(
      {
        profile: {
          email: profile.email,
          fullName: profile.fullName,
          creatorName: profile.creatorName,
          bio: profile.bio,
          website: profile.website,
          location: profile.location,
          avatarUrl: profile.avatarUrl,
          socialHandles: profile.socialHandles ?? [],
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Creator profile load error:", error)
    return NextResponse.json(
      { message: "Failed to load creator profile" },
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

    if (!email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (body.email && normalizeEmail(body.email) !== email) {
      return NextResponse.json({ message: "Email cannot be changed here" }, { status: 400 })
    }

    const profile = await prisma.profile.findUnique({ where: { email } })
    if (!profile) {
      return NextResponse.json({ message: "Profile not found" }, { status: 404 })
    }

    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : undefined
    const creatorName = typeof body.creatorName === "string" ? body.creatorName.trim() : undefined
    const bio = typeof body.bio === "string" ? body.bio.trim() : undefined
    const website = typeof body.website === "string" ? body.website.trim() : undefined
    const location = typeof body.location === "string" ? body.location.trim() : undefined
    const avatarUrl = typeof body.avatarUrl === "string" ? body.avatarUrl.trim() : undefined
    const socialHandles = Array.isArray(body.socialHandles)
      ? body.socialHandles
          .map((item: any) => ({
            network: typeof item?.network === "string" ? item.network.trim() : "",
            handle: typeof item?.handle === "string" ? item.handle.trim() : "",
          }))
          .filter((item: any) => item.network && item.handle)
      : undefined

    const updateData: Record<string, unknown> = {
      ...(fullName !== undefined && { fullName }),
      ...(creatorName !== undefined && { creatorName }),
      ...(bio !== undefined && { bio }),
      ...(website !== undefined && { website }),
      ...(location !== undefined && { location }),
      ...(avatarUrl !== undefined && { avatarUrl }),
      ...(socialHandles !== undefined && { socialHandles }),
    }

    // if (firstName !== undefined || lastName !== undefined) {
    //   const computedName = `${firstName ?? profile.firstName ?? ""} ${lastName ?? profile.lastName ?? ""}`.trim()
    //   updateData.fullName = computedName || null
    // }

    const updated = await prisma.profile.update({
      where: { email },
      data: updateData,
    })

    return NextResponse.json({ profile: updated }, { status: 200 })
  } catch (error) {
    console.error("Creator profile update error:", error)
    return NextResponse.json(
      { message: "Failed to update creator profile" },
      { status: 500 }
    )
  }
}
