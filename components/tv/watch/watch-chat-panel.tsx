"use client"

import { Send, Smile } from "lucide-react"
import { useState } from "react"

export type ChatReaction = "\u{1F44D}" | "\u{2764}\u{FE0F}" | "\u{1F525}" | "\u{1F602}" | "\u{1F44F}"

export type ChatMessage = {
  id: string
  name: string
  handle: string
  time: string
  text: string
  reactions: Record<ChatReaction, number>
  failed?: boolean
}

type WatchChatPanelProps = {
  messages: ChatMessage[]
  reactions: ChatReaction[]
  draft: string
  onReaction: (messageId: string, reaction: ChatReaction) => void
  onDraftChange: (value: string) => void
  onSend: () => void
  onRetry?: (messageId: string) => void
  onQuickReaction: (reaction: ChatReaction) => void
}

function formatRelativeTime(value: string | Date | null | undefined) {
  if (!value) return "just now"

  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return "just now"

  const diffMs = Date.now() - date.getTime()
  const diffSeconds = Math.max(1, Math.floor(diffMs / 1000))
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 1) return "just now"
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString()
}

export default function WatchChatPanel({
  messages,
  reactions,
  draft,
  onReaction,
  onDraftChange,
  onSend,
  onRetry,
  onQuickReaction,
}: WatchChatPanelProps) {
  const [openReactionsFor, setOpenReactionsFor] = useState<string | null>(null)
  const [showQuickReactions, setShowQuickReactions] = useState(false)

  return (
    <aside className="h-full xl:sticky xl:top-24" hidden-scrollbar>
      <div className="flex h-full flex-col rounded-2xl border border-border bg-muted/20 p-2 md:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">Chat</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> 
          </span>
        </div>

        <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.map((message) => (
            <div key={message.id} className="rounded-2xl ">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground">
                    {message.handle} <span className="px-1">-</span> {formatRelativeTime(message.time)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {message.failed && (
                    <button
                      type="button"
                      onClick={() => onRetry?.(message.id)}
                      className="text-xs text-red-500 hover:underline"
                      title="Retry sending"
                    >
                      Retry
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpenReactionsFor((current) => (current === message.id ? null : message.id))}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/80 text-xs text-muted-foreground transition-colors hover:border-red-500/50 hover:text-foreground"
                    title="Open reactions"
                  >
                    <Smile className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{message.text}</p>

              {openReactionsFor === message.id ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {reactions.map((reaction) => (
                    <button
                      key={reaction}
                      type="button"
                      onClick={() => {
                        onReaction(message.id, reaction)
                        setOpenReactionsFor(null)
                      }}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-background/70 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-red-500/50 hover:text-foreground"
                    >
                      <span>{reaction}</span>
                      <span>{message.reactions[reaction] ?? 0}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-3 border-t border-border pt-4">
          {showQuickReactions ? (
            <div className="flex flex-wrap gap-2">
              {reactions.map((reaction) => (
                <button
                  key={reaction}
                  type="button"
                  onClick={() => {
                    onQuickReaction(reaction)
                    setShowQuickReactions(false)
                  }}
                  className="rounded-full border border-border bg-background/70 px-3 py-2 text-sm transition-colors hover:border-red-500/50"
                  title={`Insert ${reaction}`}
                >
                  {reaction}
                </button>
              ))}
            </div>
          ) : null}

          <div className="flex gap-2">
            <label className="relative flex-1">
              <button
                type="button"
                onClick={() => setShowQuickReactions((value) => !value)}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Open reactions"
              >
                <Smile className="h-4 w-4" />
              </button>
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
                className="w-full rounded-xl border border-border bg-background/70 py-3 pl-10 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-red-500/50"
              />
            </label>

            <button
              type="button"
              onClick={onSend}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-red-700"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
