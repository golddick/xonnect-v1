// app/api/creator/uploads/thumbnail/route.ts
import { uploadFileRaw } from "@/lib/auth/dropaphi-upload"
import { NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest) {
  try {
    // Log incoming headers for debugging
    console.log('Content-Type:', request.headers.get('content-type'))
    console.log('Content-Length:', request.headers.get('content-length'))
    
    // Validate content type
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('multipart/form-data')) {
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
        { message: result.message ?? "Failed to upload thumbnail" }, 
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        fileId: result.fileId ?? null,
        url: result.url ?? result.directUrl ?? null,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Creator thumbnail upload error:", error)
    const message = error instanceof Error ? error.message : "Failed to upload thumbnail"
    return NextResponse.json(
      { 
        success: false,
        message 
      }, 
      { status: 500 }
    )
  }
}