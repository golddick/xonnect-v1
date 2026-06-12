"use client"

import { useState } from "react"
import { Search, Grid3x3, List } from "lucide-react"
import TvSidebar from "@/app/(Xonnect_tv)/tv/_component/tv-sidebar"
import StreamCard from "@/app/(Xonnect_tv)/tv/_component/stream-card"

const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const newsCategories = [
    { id: "all", label: "All News", icon: "📰" },
    { id: "politics", label: "Politics", icon: "🏛️" },
    { id: "sports-news", label: "Sports News", icon: "⚽" },
    { id: "business", label: "Business", icon: "💼" },
    { id: "entertainment-news", label: "Entertainment", icon: "🎬" },
    { id: "international", label: "International", icon: "🌍" },
    { id: "technology", label: "Technology", icon: "💻" },
  ]

  const news = Array.from({ length: 16 }).map((_, i) => ({
    id: String(i + 1),
    thumbnail: `/placeholder.svg?height=225&width=400&query=news-${i}`,
    title: `Breaking News: ${newsCategories[i % newsCategories.length].label} Update ${i + 1}`,
    channelName: `News Network ${i + 1}`,
    channelAvatar: "📰",
    viewers: Math.floor(Math.random() * 500000) + 50000,
    isLive: i % 2 === 0,
    category: "News",
  }))

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 px-4 md:px-6 py-4">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">📰 News</h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Home / News</p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {newsCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? "bg-red-600 text-foreground"
                      : "bg-white/10 text-muted-foreground hover:bg-white/20"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="text-sm font-semibold">{category.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-gray-500 focus:outline-none focus:border-red-500 w-full text-sm"
                />
              </div>

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
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div
            className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
          >
            {news.map((item) => (
              <StreamCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsPage

