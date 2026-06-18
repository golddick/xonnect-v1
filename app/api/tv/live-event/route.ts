import { NextRequest, NextResponse } from "next/server"

import { getTvLiveEventPayload } from "@/lib/tv/public-content"

export const dynamic = "force-dynamic"

// Public live-event payload for the TV sidebar and live-event page.
// GET /api/tv/live-event
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = Number(searchParams.get("limit") ?? 12)

    const payload = await getTvLiveEventPayload({
      category,
      limit: Number.isFinite(limit) ? limit : 12,
    })

    return NextResponse.json(
      {
        section: "live-event",
        ...payload,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("TV live-event GET error:", error)
    return NextResponse.json({ message: "Failed to load live-event content" }, { status: 500 })
  }
}
