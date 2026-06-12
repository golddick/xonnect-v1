"use client"

import { useState } from "react"
import { Search, Grid3x3, List, Sliders } from "lucide-react"
import TvSidebar from "@/app/(Xonnect_tv)/tv/_component/tv-sidebar"
import StreamCard from "@/app/(Xonnect_tv)/tv/_component/stream-card"
import { AvatarDropdownMenu } from "@/components/common_component/AvatarDropdown"
import {ThemeToggle} from "@/components/theme-toggle";

const SportPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("viewers")
  const [selectedSport, setSelectedSport] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const sports = [
    { id: "all", label: "All Sports", icon: "⚽" },
    // { id: "soccer", label: "Soccer", icon: "⚽" },
    // { id: "rugby", label: "Rugby", icon: "🏉" },
    { id: "basketball", label: "Basketball", icon: "🏀" },
    // { id: "tennis", label: "Tennis", icon: "🎾" },
    { id: "football", label: "Football", icon: "🏈" },
    // { id: "cricket", label: "Cricket", icon: "🏏" },
    // { id: "golf", label: "Golf", icon: "⛳" },
    // { id: "baseball", label: "Baseball", icon: "⚾" },
  ]

  const streams = Array.from({ length: 16 }).map((_, i) => ({
    id: String(i + 1),
    thumbnail: `/placeholder.svg?height=225&width=400&query=sport-stream-${i}`,
    title: `${sports[i % sports.length].label} Match - Live Coverage ${i + 1}`,
    channelName: `Sport Channel ${i + 1}`,
    channelAvatar: sports[i % sports.length].icon,
    viewers: Math.floor(Math.random() * 500000) + 5000,
    isLive: Math.random() > 0.2,
    category: "Sport",
    duration:
      !(Math.random() > 0.2) ? `${Math.floor(Math.random() * 4) + 1}h ${Math.floor(Math.random() * 60)}m` : undefined,
  }))

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-none">
          <div className="flex flex-col gap-4">
            <div className="hidden lg:flex items-center border-white/10 border-b p-4 justify-between w-full ">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">⚽ Sports</h1>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <AvatarDropdownMenu/>
              </div>
          </div>


           <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4 w-full p-4 ">
             {/* Sub-category filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 hidden-scrollbar ">
              {sports.map((sport) => (
                <button
                  key={sport.id}
                  onClick={() => setSelectedSport(sport.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedSport === sport.id ? "bg-red-600 text-foreground" : "bg-white/10 text-muted-foreground hover:bg-white/20"
                  }`}
                >
                  <span>{sport.icon}</span>
                  <span className="text-sm font-semibold">{sport.label}</span>
                </button>
              ))}
            </div>

            <div className="flex md:items-end md:justify-end w-full  gap-2 md:gap-4  flex-nowrap">
              {/* Search */}
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search matches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-gray-500 focus:outline-none focus:border-red-500 w-full text-sm"
                />
              </div>


              {/* View Toggle */}
              <div className=" hidden md:flex gap-2">
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
        </div>

        {/* Content Grid */}
        <div className="flex-1 p-4 md:p-6 hidden-scrollbar overflow-y-auto">
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

export default SportPage

