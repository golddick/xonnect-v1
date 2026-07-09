type ChatReaction = "\u{1F44D}" | "\u{2764}\u{FE0F}" | "\u{1F525}" | "\u{1F602}" | "\u{1F44F}"

type ChatMessage = {
  id: string
  name: string
  handle: string
  time: string
  text: string
  reactions: Record<ChatReaction, number>
}

type ChannelKey = string // `${kind}:${id}`

import { prisma } from "@/lib/db/prisma"

if (!(global as any).__tv_chat_store) {
  ;(global as any).__tv_chat_store = {
    // keep subscribers in-memory for broadcasting
    subscribers: new Map<ChannelKey, Set<WritableStreamDefaultWriter<Uint8Array>>>(),
  }
}

export const chatStore = (global as any).__tv_chat_store as {
  subscribers: Map<ChannelKey, Set<WritableStreamDefaultWriter<Uint8Array>>>
}

export async function pushMessage(kind: string, id: string, message: ChatMessage) {
  // persist to DB
  try {
    await prisma.$executeRaw`
      INSERT INTO chat_messages (id, kind, channel_id, name, handle, text, reactions, created_at)
      VALUES (${message.id}, ${kind}, ${id}, ${message.name}, ${message.handle}, ${message.text}, ${JSON.stringify(
        message.reactions
      )}, ${new Date(message.time)})`
  } catch (e) {
    // log but continue to broadcast so clients see optimistic updates
    console.error("Failed to persist chat message:", e)
  }

  const key = `${kind}:${id}`
  const subs = chatStore.subscribers.get(key)
  if (subs) {
    const payload = `event: message\ndata: ${JSON.stringify({ message })}\n\n`
    const enc = new TextEncoder()
    const data = enc.encode(payload)
    for (const writer of subs) {
      try {
        writer.write(data)
      } catch (e) {
        // ignore per-subscriber errors
      }
    }
  }
}

export async function getMessages(kind: string, id: string) {
  try {
    const rows: any[] = await prisma.$queryRaw`
      SELECT id, name, handle, text, reactions, created_at as time
      FROM chat_messages
      WHERE kind = ${kind} AND channel_id = ${id}
      ORDER BY created_at ASC
      LIMIT 200
    `

    return rows.map((r) => ({
      id: String(r.id),
      name: r.name,
      handle: r.handle,
      time: new Date(r.time).toISOString(),
      text: r.text,
      reactions: typeof r.reactions === "string" ? JSON.parse(r.reactions) : r.reactions,
    }))
  } catch (e) {
    console.error("Failed to load messages from DB:", e)
    return []
  }
}

export function addSubscriber(kind: string, id: string, writer: WritableStreamDefaultWriter<Uint8Array>) {
  const key = `${kind}:${id}`
  const subs = chatStore.subscribers.get(key) ?? new Set()
  subs.add(writer)
  chatStore.subscribers.set(key, subs)
}

export function removeSubscriber(kind: string, id: string, writer: WritableStreamDefaultWriter<Uint8Array>) {
  const key = `${kind}:${id}`
  const subs = chatStore.subscribers.get(key)
  if (!subs) return
  subs.delete(writer)
  if (subs.size === 0) chatStore.subscribers.delete(key)
}
