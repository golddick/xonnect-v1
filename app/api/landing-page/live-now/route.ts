import { NextRequest, NextResponse } from "next/server"

import { getTvLiveEventPayload } from "@/lib/tv/public-content"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") ?? "6", 10)

    const payload = await getTvLiveEventPayload({
      limit: Number.isFinite(limit) ? limit : 6,
    })

    const shows = payload.live.map((item) => ({
      id: item.id,
      title: item.title,
      host: item.channelName,
      viewers: item.viewers,
      thumbnail: item.thumbnail,
      category: item.category,
      isLive: true,
      duration: item.duration ?? "Live",
      watchId: item.watchId ?? item.id,
    }))

    return NextResponse.json({ shows }, { status: 200 })
  } catch (error) {
    console.error("Landing live-now GET error:", error)
    return NextResponse.json({ message: "Failed to load live content" }, { status: 500 })
  }
}
