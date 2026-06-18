"use client"

import { Play } from "lucide-react"

export type WatchPart = {
  id: string
  title: string
  duration: string | null
  views: number
  thumbnail: string | null
  previewOnly: boolean
  isLocked: boolean
}

type WatchPartsPanelProps = {
  parts: WatchPart[]
  activePart: number
  onSelectPart: (index: number) => void
}

export default function WatchPartsPanel({ parts, activePart, onSelectPart }: WatchPartsPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Parts</h3>
        <span className="text-xs text-red-500 font-bold bg-red-500/10 px-2 py-1 rounded">
          {parts.length ? activePart + 1 : 0} / {parts.length}
        </span>
      </div>

      <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
        {parts.map((part, index) => (
          <button
            key={part.id}
            type="button"
            onClick={() => onSelectPart(index)}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left border ${
              activePart === index
                ? "bg-red-600/10 border-red-600/30 ring-1 ring-red-600/30"
                : "bg-muted/30 border-transparent hover:bg-muted/50"
            }`}
          >
            <div className="relative flex-shrink-0 w-24 aspect-video bg-muted rounded-lg overflow-hidden border border-border/50">
              {part.thumbnail ? (
                <img src={part.thumbnail} alt={part.title} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                  <Play className={`w-4 h-4 ${activePart === index ? "text-red-500" : "text-muted-foreground"}`} />
                </div>
              )}
              <div className="absolute bottom-1 right-1 bg-black/70 text-[10px] text-white px-1 rounded">
                {part.duration || "0:00"}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-semibold truncate ${
                  activePart === index ? "text-red-500" : "text-foreground"
                }`}
              >
                {index + 1}. {part.title}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-2">
                <span>{part.views} views</span>
                {part.previewOnly ? <span className="text-amber-400">Preview</span> : null}
                {part.isLocked ? <span className="text-red-400">Locked</span> : null}
              </p>
            </div>

            {activePart === index && <div className="flex-shrink-0 w-1.5 h-1.5 bg-red-600 rounded-full" />}
          </button>
        ))}
      </div>
    </div>
  )
}
