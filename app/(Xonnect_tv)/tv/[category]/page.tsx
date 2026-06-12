"use client"

import { useState } from "react"
import { Search, Grid3x3, List, ChevronDown, Sliders } from "lucide-react"
import { motion } from "framer-motion"
import TvSidebar from "@/app/(Xonnect_tv)/tv/_component/tv-sidebar"
import StreamCard from "@/app/(Xonnect_tv)/tv/_component/stream-card"

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("viewers")
  const [showFilters, setShowFilters] = useState(false)

  const categoryMap: Record<string, string> = {
    movies: "🎬 Movies",
    music: "🎵 Music",
    sports: "⚽ Sports",
    gaming: "🎮 Gaming",
    "tv-shows": "📺 TV Shows",
    "live-events": "🎤 Live Events",
    entertainment: "🎭 Entertainment",
    news: "📰 News",
    education: "🎓 Education",
    lifestyle: "🍳 Lifestyle",
  }

  const categoryTitle = categoryMap[params.category] || params.category

  const streams = Array.from({ length: 12 }).map((_, i) => ({
    id: String(i + 1),
    thumbnail: `/placeholder.svg?key=${Math.random()}`,
    title: `Amazing ${params.category} Stream ${i + 1}`,
    channelName: `Channel ${i + 1}`,
    channelAvatar: "📹",
    viewers: Math.floor(Math.random() * 100000) + 1000,
    isLive: Math.random() > 0.3,
    category: params.category,
    duration: '30'
      // !Math.random() > 0.3 ? `${Math.floor(Math.random() * 4) + 1}h ${Math.floor(Math.random() * 60)}m` : undefined,
  }))

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 px-4 md:px-6 py-4">
          <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{categoryTitle}</h1>
            </div>

            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              {/* Search - Mobile optimized */}
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-gray-500 focus:outline-none focus:border-red-500 w-full md:w-auto text-sm"
                />
              </div>

              {/* Filter Button - Mobile */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Sliders className="w-4 h-4 text-foreground" />
              </button>

              {/* Sort Dropdown - Hidden on mobile */}
              <div className="relative group hidden md:block">
                <button className="flex items-center space-x-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-foreground hover:bg-white/20 transition-colors text-sm">
                  <span>Sort: {sortBy}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute right-0 top-full mt-2 bg-background/90 border border-white/20 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                  {["viewers", "recent", "trending"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-red-600 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-red-600" : "bg-white/10 hover:bg-white/20"}`}
                >
                  <Grid3x3 className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors hidden md:block ${viewMode === "list" ? "bg-red-600" : "bg-white/10 hover:bg-white/20"}`}
                >
                  <List className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-white/10 space-y-3"
            >
              <div>
                <label className="text-xs text-muted-foreground uppercase mb-2 block">Sort By</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-foreground text-sm">
                  <option>Viewers</option>
                  <option>Recent</option>
                  <option>Trending</option>
                </select>
              </div>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div
            className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
          >
            {streams.map((stream) => (
              <StreamCard key={stream.id} {...stream} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
