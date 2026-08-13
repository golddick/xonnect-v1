import { NextRequest, NextResponse } from "next/server"
import { uploadFileRaw } from "@/lib/auth/dropaphi-upload"

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type")
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { message: "Invalid request format. Expected multipart/form-data" },
        { status: 400 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded. Please provide a file in the 'file' field." },
        { status: 400 }
      )
    }

    const name = formData.get("name")
    const type = formData.get("type")
    const metadataRaw = formData.get("metadata")
    const visibility = formData.get("visibility")

    let metadata: Record<string, unknown> | undefined = undefined
    if (typeof metadataRaw === "string" && metadataRaw.trim()) {
      try {
        metadata = JSON.parse(metadataRaw)
      } catch {
        metadata = undefined
      }
    }

    const result = await uploadFileRaw(file, {
      name: typeof name === "string" ? name : undefined,
      type: typeof type === "string" ? type : undefined,
      metadata,
      visibility: typeof visibility === "string" ? visibility : undefined,
    })

    if (!result.ok) {
      return NextResponse.json(
        { success: false, message: result.message ?? "Failed to upload file." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        url: result.url ?? result.directUrl ?? null,
        directUrl: result.directUrl ?? result.url ?? null,
        fileId: result.fileId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("DropAphi upload route error:", error)
    const message = error instanceof Error ? error.message : "Upload failed"
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
