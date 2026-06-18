// app/api/creator/uploads/thumbnail/route.ts
import { NextRequest, NextResponse } from "next/server"
import { uploadFileRaw } from "@/lib/auth/dropaphi-upload"

export async function POST(request: NextRequest) {
  try {
    // Log incoming headers for debugging
    console.log('Content-Type:', request.headers.get('content-type'))
    console.log('Content-Length:', request.headers.get('content-length'))
    
    // Get the raw request body and content type
    const rawBody = await request.arrayBuffer()
    const contentType = request.headers.get('content-type')
    
    // Validate content type
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { message: "Invalid request format. Expected multipart/form-data" }, 
        { status: 400 }
      )
    }
    
    // Use the reusable raw upload function
    const result = await uploadFileRaw(rawBody, contentType)

    if (!result.ok) {
      return NextResponse.json(
        { message: result.message ?? "Failed to upload thumbnail" }, 
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        fileId: result.fileId ?? null,
        url: result.url ?? result.directUrl ?? null,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Creator thumbnail upload error:", error)
    const message = error instanceof Error ? error.message : "Failed to upload thumbnail"
    return NextResponse.json({ message }, { status: 500 })
  }
}