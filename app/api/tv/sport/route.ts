import { NextRequest, NextResponse } from "next/server"

import { getTvSportPayload } from "@/lib/tv/public-content"

export const dynamic = "force-dynamic"

// Public sport payload for live broadcast and video folders.
// GET /api/tv/sport
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const limit = Number(searchParams.get("limit") ?? 12)

    const payload = await getTvSportPayload({
      contentType:
        type === "live" || type === "scheduled" || type === "video" ? type : "all",
      limit: Number.isFinite(limit) ? limit : 12,
    })

    return NextResponse.json(
      {
        section: "sport",
        ...payload,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("TV sport GET error:", error)
    return NextResponse.json({ message: "Failed to load sport content" }, { status: 500 })
  }
}
