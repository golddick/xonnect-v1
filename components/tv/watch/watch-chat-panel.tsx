"use client"

import { Send, Smile } from "lucide-react"

export type ChatReaction = "\u{1F44D}" | "\u{2764}\u{FE0F}" | "\u{1F525}" | "\u{1F602}" | "\u{1F44F}"

export type ChatMessage = {
  id: string
  name: string
  handle: string
  time: string
  text: string
  reactions: Record<ChatReaction, number>
}

type WatchChatPanelProps = {
  messages: ChatMessage[]
  reactions: ChatReaction[]
  draft: string
  onReaction: (messageId: string, reaction: ChatReaction) => void
  onDraftChange: (value: string) => void
  onSend: () => void
  onQuickReaction: (reaction: ChatReaction) => void
}

export default function WatchChatPanel({
  messages,
  reactions,
  draft,
  onReaction,
  onDraftChange,
  onSend,
  onQuickReaction,
}: WatchChatPanelProps) {
  return (
    <aside className="space-y-4 xl:sticky xl:top-24 h-fit">
      <div className="rounded-2xl border border-border bg-muted/20 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">Chat</p>
            <p className="text-xs text-muted-foreground">Demo data for the event sidebar.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Live preview
          </span>
        </div>

        <div className="mt-4 max-h-[28rem] space-y-3 overflow-y-auto pr-1">
          {messages.map((message) => (
            <div key={message.id} className="rounded-2xl border border-border/70 bg-background/70 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{message.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {message.handle} <span className="px-1">-</span> {message.time}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onReaction(message.id, "\u{1F525}")}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/80 text-xs text-muted-foreground transition-colors hover:border-red-500/50 hover:text-foreground"
                  title="React with fire"
                >
                  <Smile className="h-3.5 w-3.5" />
                </button>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{message.text}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {reactions.map((reaction) => (
                  <button
                    key={reaction}
                    type="button"
                    onClick={() => onReaction(message.id, reaction)}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-background/70 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-red-500/50 hover:text-foreground"
                  >
                    <span>{reaction}</span>
                    <span>{message.reactions[reaction] ?? 0}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-3 border-t border-border pt-4">
          <div className="flex flex-wrap gap-2">
            {reactions.map((reaction) => (
              <button
                key={reaction}
                type="button"
                onClick={() => onQuickReaction(reaction)}
                className="rounded-full border border-border bg-background/70 px-3 py-2 text-sm transition-colors hover:border-red-500/50"
                title="Insert reaction"
              >
                {reaction}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <label className="relative flex-1">
              <Smile className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={draft}
                onChange={(event) => onDraftChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    onSend()
                  }
                }}
                placeholder="Write a message or drop a reaction"
                className="w-full rounded-xl border border-border bg-background/70 py-3 pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-red-500/50"
              />
            </label>

            <button
              type="button"
              onClick={onSend}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-red-700"
            >
              <Send className="h-4 w-4" />
              Send
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
