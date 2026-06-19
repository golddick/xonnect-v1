import { NextRequest, NextResponse } from "next/server"

import { loadEventWatchData } from "@/lib/tv/event-watch"

export const dynamic = "force-dynamic"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const accessCode = searchParams.get("accessCode")?.trim() ?? null

    const result = await loadEventWatchData(id, { accessCode })
    if (!result.event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        kind: "event",
        event: result.event,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("TV event watch GET error:", error)
    return NextResponse.json({ message: "Failed to load TV event content" }, { status: 500 })
  }
}
