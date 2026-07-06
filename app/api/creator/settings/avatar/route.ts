import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { uploadFileRaw } from "@/lib/auth/dropaphi-upload"
import { Role } from "@/lib/generated/prisma"

function normalizeEmail(email: string | null | undefined) {
  return typeof email === "string" ? email.toLowerCase().trim() : null
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email || session.user.role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const email = normalizeEmail(session.user.email)
    if (!email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const contentType = request.headers.get("content-type")
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { message: "Invalid request format. Expected multipart/form-data" },
        { status: 400 }
      )
    }

    const rawBody = await request.arrayBuffer()
    const result = await uploadFileRaw(rawBody, contentType)

    if (!result.ok) {
      return NextResponse.json(
        { message: result.message ?? "Failed to upload avatar" },
        { status: 500 }
      )
    }

    const avatarUrl = result.url ?? result.directUrl
    if (!avatarUrl) {
      return NextResponse.json(
        { message: "Upload succeeded but no avatar URL was returned" },
        { status: 500 }
      )
    }

    const updatedProfile = await prisma.profile.update({
      where: { email },
      data: { avatarUrl },
    })

    return NextResponse.json(
      { url: avatarUrl, profile: updatedProfile },
      { status: 200 }
    )
  } catch (error) {
    console.error("Creator avatar upload error:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to upload avatar" },
      { status: 500 }
    )
  }
}
