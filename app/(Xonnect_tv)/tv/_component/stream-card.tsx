"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Share2, Eye, Bell } from "lucide-react"

interface StreamCardProps {
  id: string
  thumbnail: string
  title: string
  channelName: string
  channelAvatar: string
  viewers: number
  isLive: boolean
  category: string
  duration?: string
  pricing?: string
  onWatch?: () => void
}

const StreamCard = ({
  id,
  thumbnail,
  title,
  channelName,
  channelAvatar,
  viewers,
  isLive,
  category,
  duration,
  pricing,
  onWatch,
}: StreamCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [notified, setNotified] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if ((event.key === "Enter" || event.key === " ") && onWatch) {
          event.preventDefault()
          onWatch()
        }
      }}
      onClick={() => onWatch?.()}
    >
      <div className="relative rounded-xl hidden-scrollbar overflow-hidden bg-background/20">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black overflow-hidden">
          <img
            src={thumbnail || "/placeholder.svg?height=225&width=400&query=stream-thumbnail"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Overlays */}
          {isLive && (
            <div className="absolute top-3 left-3 bg-red-600 text-foreground px-2 py-1 rounded text-xs font-bold flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span>LIVE</span>
            </div>
          )}

          {!isLive && duration && (
            <div className="absolute top-3 left-3 bg-background/70 text-foreground px-2 py-1 rounded text-xs font-semibold">
              {duration}
            </div>
          )}

          {!isLive && pricing && (
            <div className="absolute top-12 left-3 bg-red-600/85 text-foreground px-2 py-1 rounded text-xs font-semibold uppercase">
              {pricing}
            </div>
          )}

          <div className="absolute top-3 right-3 bg-background/70 text-foreground px-2 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{viewers > 1000 ? `${(viewers / 1000).toFixed(1)}K` : viewers}</span>
          </div>

          {/* Hover Overlay */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center space-x-3"
            >
              <button
                onClick={(event) => {
                  event.stopPropagation()
                  onWatch?.()
                }}
                className="bg-red-600 hover:bg-red-700 text-foreground px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Watch
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation()
                  setNotified(!notified)
                }}
                className={`p-2 rounded-lg transition-colors ${notified ? "bg-yellow-500" : "bg-white/20 hover:bg-white/30"}`}
              >
                <Bell className={`w-5 h-5 ${notified ? "text-foreground fill-white" : "text-foreground"}`} />
              </button>
              <button
                onClick={(event) => event.stopPropagation()}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5 text-foreground" />
              </button>
            </motion.div>
          )}

          {/* Channel Avatar */}
          <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-lg">
            {channelAvatar}
          </div>
        </div>

        {/* Info */}
        <div className="p-3 space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-red-400 transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground group-hover:text-muted-foreground transition-colors">{channelName}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="bg-white/10 px-2 py-1 rounded">{category}</span>
            {isLive && <span className="text-red-400">Live now</span>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default StreamCard

