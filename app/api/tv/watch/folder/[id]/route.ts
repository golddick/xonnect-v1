import { NextRequest, NextResponse } from "next/server"

import { loadWatchFolderData } from "@/lib/tv/watch-folder"

export const dynamic = "force-dynamic"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const accessCode = searchParams.get("accessCode")?.trim() ?? null

    const result = await loadWatchFolderData(id, { accessCode })
    if (!result.folder) {
      return NextResponse.json({ message: "Video folder not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        kind: "folder",
        folder: result.folder,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("TV folder watch GET error:", error)
    return NextResponse.json({ message: "Failed to load TV folder content" }, { status: 500 })
  }
}
