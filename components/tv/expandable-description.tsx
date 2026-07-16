'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ExpandableDescriptionProps {
  text: string
  maxLines?: number
  className?: string
}

const LINE_HEIGHT_PIXELS = 10 // Adjust based on your text styles (roughly 1.5rem with leading-relaxed)

export function ExpandableDescription({
  text,
  maxLines = 22,
  className = '',
}: ExpandableDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Count approximate lines by splitting on newlines and word wrapping
  const lines = text.split('\n')
  let totalLines = 0
  
  lines.forEach((line) => {
    // Rough estimation: assume average char width and container width
    // This is approximate - you may need to adjust based on your container width
    const estimatedLinesPerTextLine = Math.max(1, Math.ceil(line.length / 60))
    totalLines += estimatedLinesPerTextLine
  })

  const shouldShowExpandButton = totalLines > maxLines
  const maxHeightPixels = maxLines * LINE_HEIGHT_PIXELS
  const containerHeight = isExpanded ? 'auto' : `${maxHeightPixels}px`

  return (
    <div className="space-y-3">
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${className}`}
        style={{
          maxHeight: containerHeight,
          lineHeight: '1rem',
        }}
      >
        <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap break-words">
          {text}
        </p>
      </div>

      {shouldShowExpandButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-red-500 hover:text-red-600 hover:bg-red-500/10 group"
        >
          <span className="flex items-center gap-2">
            {isExpanded ? ' less' : ' more'}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </span>
        </Button>
      )}
    </div>
  )
}
