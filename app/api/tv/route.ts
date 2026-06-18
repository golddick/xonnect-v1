import { NextRequest, NextResponse } from "next/server"

import { getTvLandingPayload } from "@/lib/tv/public-content"

export const dynamic = "force-dynamic"

// Public TV landing payload.
// GET /api/tv
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const liveLimit = Number(searchParams.get("liveLimit") ?? 6)
    const scheduledLimit = Number(searchParams.get("scheduledLimit") ?? 6)
    const videoLimit = Number(searchParams.get("videoLimit") ?? 12)

    const payload = await getTvLandingPayload({
      category,
      liveLimit: Number.isFinite(liveLimit) ? liveLimit : 6,
      scheduledLimit: Number.isFinite(scheduledLimit) ? scheduledLimit : 6,
      videoLimit: Number.isFinite(videoLimit) ? videoLimit : 12,
    })

    return NextResponse.json(
      {
        section: "landing",
        ...payload,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("TV landing GET error:", error)
    return NextResponse.json({ message: "Failed to load TV landing content" }, { status: 500 })
  }
}
