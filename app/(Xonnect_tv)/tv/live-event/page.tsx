"use client"

import { useState } from "react"
import { Search, Grid3x3, List, Clock } from "lucide-react"
import { motion } from "framer-motion"
import TvSidebar from "@/app/(Xonnect_tv)/tv/_component/tv-sidebar"
import StreamCard from "@/app/(Xonnect_tv)/tv/_component/stream-card"
import { AvatarDropdownMenu } from "@/components/common_component/AvatarDropdown"
import {ThemeToggle} from "@/components/theme-toggle";

const LiveEventPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showScheduled, setShowScheduled] = useState(false)

  // Scheduled events (upcoming)
  const scheduledEvents = Array.from({ length: 8 }).map((_, i) => ({
    id: `scheduled-${i}`,
    thumbnail: `/placeholder.svg?height=225&width=400&query=event-${i}`,
    title: `Upcoming Event ${i + 1}`,
    channelName: `Event Organizer ${i + 1}`,
    channelAvatar: "🎤",
    viewers: 0,
    isLive: false,
    category: "Live Event",
    duration: `In ${Math.floor(Math.random() * 7) + 1} days`,
    isScheduled: true,
    startTime: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
  }))

  // Live events
  const liveEvents = Array.from({ length: 12 }).map((_, i) => ({
    id: String(i + 1),
    thumbnail: `/placeholder.svg?height=225&width=400&query=live-event-${i}`,
    title: `Live Event ${i + 1}`,
    channelName: `Event Channel ${i + 1}`,
    channelAvatar: "🎤",
    viewers: Math.floor(Math.random() * 1000000) + 10000,
    isLive: true,
    category: "Live Event",
  }))

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      <div className="flex-1 overflow-y-auto  hidden-scrollbar flex flex-col">
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-none ">
          <div className="flex flex-col gap-4">
            <div className="hidden lg:flex items-center p-4 justify-between w-full ">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">🎤Events</h1>
               <div className="flex items-center gap-2">
                 <ThemeToggle />
                 <AvatarDropdownMenu/>
               </div>
            </div>

         <div className=" flex flex-col md:flex-row justify-between gap-4 p-4">
             {/* Toggle between Live and Scheduled */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowScheduled(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  !showScheduled ? "bg-red-600 text-foreground" : "bg-white/10 text-muted-foreground hover:bg-white/20"
                }`}
              >
                <span className="w-2 h-2 bg-current rounded-full animate-pulse" />
                <span className="text-sm font-semibold">Live Now</span>
              </button>
              <button
                onClick={() => setShowScheduled(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  showScheduled ? "bg-red-600 text-foreground" : "bg-white/10 text-muted-foreground hover:bg-white/20"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm font-semibold">Scheduled</span>
              </button>
            </div>

            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-gray-500 focus:outline-none focus:border-red-500 w-full text-sm"
                />
              </div>

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

        <div className="flex-1 p-4 md:p-6 hidden-scrollbar overflow-y-auto">
          <motion.div
            key={showScheduled ? "scheduled" : "live"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
            >
              {(showScheduled ? scheduledEvents : liveEvents).map((event) => (
                <StreamCard key={event.id} {...event} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LiveEventPage

