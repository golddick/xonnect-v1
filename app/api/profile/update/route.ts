import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      fullName,
      bio,
      age,
      sex,
      avatarUrl,
      addressFull,
      addressLat,
      addressLon,
      addressType,
      addressCountry,
      addressState,
      addressName,
    } = body

    const profile = await prisma.profile.update({
      where: { email: session.user.email },
      data: {
        ...(fullName !== undefined && { fullName }),
        ...(bio !== undefined && { bio }),
        ...(age !== undefined && { age }),
        ...(sex !== undefined && { sex }),
        ...(avatarUrl !== undefined && { avatarUrl }),

        ...(addressFull !== undefined && { addressFull }),
        ...(addressLat !== undefined && { addressLat }),
        ...(addressLon !== undefined && { addressLon }),
        ...(addressType !== undefined && { addressType }),
        ...(addressCountry !== undefined && { addressCountry }),
        ...(addressState !== undefined && { addressState }),
        ...(addressName !== undefined && { addressName }),
      },
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    )
  }
}
