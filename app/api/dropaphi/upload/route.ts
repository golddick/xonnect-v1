// app/api/dropaphi/upload/route.ts
import { NextRequest, NextResponse } from "next/server"
import { uploadFileRaw } from "@/lib/auth/dropaphi-upload"

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body
    const body = await request.json()
    
    // Validate required fields
    if (!body.data) {
      return NextResponse.json(
        { success: false, message: "Missing required field: data" },
        { status: 400 }
      )
    }

    if (!body.name) {
      return NextResponse.json(
        { success: false, message: "Missing required field: name" },
        { status: 400 }
      )
    }

    if (!body.type) {
      return NextResponse.json(
        { success: false, message: "Missing required field: type" },
        { status: 400 }
      )
    }

    // Convert base64 to File object
    const base64Data = body.data
    const fileName = body.name
    const fileType = body.type
    
    // Decode base64 to binary
    const binaryString = atob(base64Data)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    
    const blob = new Blob([bytes], { type: fileType })
    const file = new File([blob], fileName, { type: fileType })

    // Prepare options for uploadFileRaw
    const options = {
      metadata: body.metadata || {},
      visibility: body.metadata?.visibility || "PUBLIC",
      name: fileName,
      type: fileType
    }

    // Let uploadFileRaw handle the rest
    const result = await uploadFileRaw(file, options)

    if (!result.ok) {
      return NextResponse.json(
        { success: false, message: result.message ?? "Upload failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: result.fileId,
        name: fileName,
        mimeType: fileType,
        url: result.url,
        directUrl: result.directUrl
      }
    }, { status: 201 })
    
  } catch (error) {
    console.error("DropAphi upload route error:", error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    )
  }
}