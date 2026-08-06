import { NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { getMessages, pushMessage, updateMessageReaction } from "@/app/api/tv/watch/_chatStore"

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

    const session = await auth()
    const userName = session?.user?.name || session?.user?.email || "Unknown"
    const userHandle = userName === "Unknown" ? "@unknown" : `@${String(userName).toLowerCase().replace(/\s+/g, "")}`
    const clientId = typeof body?.clientId === "string" ? body.clientId : undefined
    const now = new Date().toISOString()
    const message = {
      id: clientId ?? `msg-${Date.now()}`,
      name: userName,
      handle: userHandle,
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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const { searchParams } = new URL(request.url)
    const kind = searchParams.get("kind")?.trim() || "folder"
    const body = await request.json()
    const messageId = typeof body?.messageId === "string" ? body.messageId : ""
    const reaction = typeof body?.reaction === "string" ? body.reaction : ""

    if (!messageId || !reaction) {
      return NextResponse.json({ message: "Missing messageId or reaction" }, { status: 400 })
    }

    const updatedMessage = await updateMessageReaction(kind, resolvedParams.id, messageId, reaction)
    if (!updatedMessage) {
      return NextResponse.json({ message: "Chat message not found" }, { status: 404 })
    }

    return NextResponse.json({ message: updatedMessage })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Failed to update reaction" }, { status: 500 })
  }
}
