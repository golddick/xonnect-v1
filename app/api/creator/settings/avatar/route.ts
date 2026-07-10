import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { uploadFileRaw } from "@/lib/auth/dropaphi-upload"

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

    // Parse form data to get the file
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded. Please provide a file in the 'file' field." },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { message: "File must be an image" },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Image must be less than 5MB" },
        { status: 400 }
      )
    }

    // Upload the file using uploadThumbnail
    const result = await uploadFileRaw(file)

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

    // Update user profile with new avatar URL
    const updatedProfile = await prisma.profile.update({
      where: { email },
      data: { avatarUrl },
    })

    return NextResponse.json(
      { 
        success: true,
        url: avatarUrl, 
        profile: updatedProfile 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Creator avatar upload error:", error)
    return NextResponse.json(
      { 
        success: false,
        message: error instanceof Error ? error.message : "Failed to upload avatar" 
      },
      { status: 500 }
    )
  }
}