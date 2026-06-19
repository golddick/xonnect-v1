import { NextRequest, NextResponse } from "next/server"

import { loadEventWatchData } from "@/lib/tv/event-watch"
import { loadWatchFolderData } from "@/lib/tv/watch-folder"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const { searchParams } = new URL(request.url)
    const accessCode = searchParams.get("accessCode")?.trim() ?? null

    const folderResult = await loadWatchFolderData(resolvedParams.id, { accessCode })
    if (folderResult.folder) {
      return NextResponse.json(
        {
          kind: "folder",
          folder: folderResult.folder,
        },
        { status: 200 }
      )
    }

    const eventResult = await loadEventWatchData(resolvedParams.id, { accessCode })
    if (eventResult.event) {
      return NextResponse.json(
        {
          kind: "event",
          event: eventResult.event,
        },
        { status: 200 }
      )
    }

    return NextResponse.json({ message: "Watch content not found" }, { status: 404 })
  } catch (error) {
    console.error("Public TV watch GET error:", error)
    return NextResponse.json({ message: "Failed to load TV watch content" }, { status: 500 })
  }
}
