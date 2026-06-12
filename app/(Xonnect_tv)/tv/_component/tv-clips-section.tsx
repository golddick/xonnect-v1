"use client"

import { useState } from "react"
import { Heart, Share2, MessageCircle, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const TvClipsSection = () => {
  const [selectedClip, setSelectedClip] = useState<string | null>(null)
  const [likedClips, setLikedClips] = useState<Set<string>>(new Set())

  const clips = [
    {
      id: "1",
      title: "Incredible Play of the Game",
      thumbnail: "🎬",
      duration: "0:45",
      likes: 2300,
      views: 15400,
      createdBy: "TopClips",
      createdAt: "2 hours ago",
      trending: true,
    },
    {
      id: "2",
      title: "Funny Moment in Chat",
      thumbnail: "😂",
      duration: "1:30",
      likes: 1800,
      views: 12100,
      createdBy: "StreamHighlights",
      createdAt: "5 hours ago",
      trending: true,
    },
    {
      id: "3",
      title: "Epic Comeback Victory",
      thumbnail: "🏆",
      duration: "2:15",
      likes: 950,
      views: 8300,
      createdBy: "ClipMaster",
      createdAt: "1 day ago",
      trending: false,
    },
    {
      id: "4",
      title: "Behind the Scenes",
      thumbnail: "📹",
      duration: "1:20",
      likes: 620,
      views: 5400,
      createdBy: "CreatorVibes",
      createdAt: "2 days ago",
      trending: false,
    },
  ]

  const toggleLike = (clipId: string) => {
    const newLiked = new Set(likedClips)
    if (newLiked.has(clipId)) {
      newLiked.delete(clipId)
    } else {
      newLiked.add(clipId)
    }
    setLikedClips(newLiked)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
          <span>Clips</span>
          <TrendingUp className="w-6 h-6 text-red-500" />
        </h2>
      </div>

      {/* Clips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {clips.map((clip) => (
          <motion.div
            key={clip.id}
            whileHover={{ y: -4 }}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all cursor-pointer group"
            onClick={() => setSelectedClip(clip.id)}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-black flex items-center justify-center overflow-hidden">
              <span className="text-6xl">{clip.thumbnail}</span>
              {clip.trending && (
                <div className="absolute top-2 left-2 bg-red-600 text-foreground px-2 py-1 rounded text-xs font-bold flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Trending</span>
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs text-foreground font-semibold">
                {clip.duration}
              </div>
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-foreground text-2xl">▶</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-3 space-y-3">
              <h3 className="font-semibold text-foreground text-sm group-hover:text-red-400 transition-colors line-clamp-2">
                {clip.title}
              </h3>

              {/* Creator Info */}
              <div className="text-xs text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">{clip.createdBy}</p>
                <p>{clip.createdAt}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(clip.id)
                    }}
                    className="flex items-center space-x-1 hover:text-red-400 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${likedClips.has(clip.id) ? "text-red-500 fill-red-500" : ""}`} />
                    <span>{clip.likes}</span>
                  </button>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{(clip.views / 1000).toFixed(1)}K</span>
                  </div>
                </div>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <Share2 className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center pt-4">
        <button className="px-6 py-2 border border-red-600 text-red-600 hover:bg-red-600/10 rounded-lg font-semibold transition-colors">
          View All Clips
        </button>
      </div>
    </div>
  )
}

export default TvClipsSection

