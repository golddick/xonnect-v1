import { NextResponse } from "next/server"
import { addSubscriber, removeSubscriber, getMessages } from "@/app/api/tv/watch/_chatStore"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const { searchParams } = new URL(request.url)
  const kind = searchParams.get("kind")?.trim() || "folder"

  const encoder = new TextEncoder()
  const ts = new TransformStream<Uint8Array, Uint8Array>()
  const writer = ts.writable.getWriter()

  const hb = setInterval(() => {
    writer.write(encoder.encode(`event: ping\ndata: {}\n\n`))
  }, 15000)

  addSubscriber(kind, resolvedParams.id, writer)

  const existing = await getMessages(kind, resolvedParams.id)
  for (const m of existing) {
    const payload = `event: message\ndata: ${JSON.stringify({ message: m })}\n\n`
    writer.write(encoder.encode(payload))
  }

  request.signal.addEventListener("abort", () => {
    clearInterval(hb)
    try {
      removeSubscriber(kind, resolvedParams.id, writer)
    } catch {
      // ignore
    }
    try {
      writer.close()
    } catch {
      // ignore
    }
  })

  return new NextResponse(ts.readable, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
  })
}
