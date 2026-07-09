import { NextResponse } from "next/server"
import { getMessages, pushMessage } from "@/app/api/tv/watch/_chatStore"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const { searchParams } = new URL(request.url)
    const kind = searchParams.get("kind")?.trim() || "folder"
    const messages = await getMessages(kind, resolvedParams.id)
    return NextResponse.json({ messages })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Failed to load messages" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const { searchParams } = new URL(request.url)
    const kind = searchParams.get("kind")?.trim() || "folder"
    const body = await request.json()
    const text = String(body?.text ?? "").trim()
    if (!text) return NextResponse.json({ message: "Empty message" }, { status: 400 })

    const now = new Date().toISOString()
    const message = {
      id: `msg-${Date.now()}`,
      name: "Unknown",
      handle: "@unknown",
      time: now,
      text,
      reactions: { "👍": 0, "❤️": 0, "🔥": 0, "😂": 0, "👏": 0 },
    }

    await pushMessage(kind, resolvedParams.id, message)

    return NextResponse.json({ message })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Failed to post message" }, { status: 500 })
  }
}
