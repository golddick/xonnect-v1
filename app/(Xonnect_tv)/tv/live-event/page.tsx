"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, Grid3x3, List, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

import StreamCard from "@/app/(Xonnect_tv)/tv/_component/stream-card"
import TvLoadingState from "@/app/(Xonnect_tv)/tv/_component/tv-loading-state"
import { AvatarDropdownMenu } from "@/components/common_component/AvatarDropdown"
import { ThemeToggle } from "@/components/theme-toggle"
import { buildWatchHref } from "@/lib/tv/watch-href"

type TvCard = {
  id: string
  title: string
  thumbnail: string
  channelName: string
  channelAvatar: string
  viewers: number
  isLive: boolean
  category: string
  type: string
  duration?: string | null
  scheduledAt?: string | null
  watchId?: string
}

export default function LiveEventPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showScheduled, setShowScheduled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [payload, setPayload] = useState<any>(null)

  useEffect(() => {
    let cancelled = false

    async function loadLiveEvents() {
      try {
        setLoading(true)
        const res = await fetch("/api/tv/live-event")
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled) setPayload(data)
      } catch (error) {
        console.error("Failed to load live-event payload:", error)
        if (!cancelled) setPayload(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadLiveEvents()

    return () => {
      cancelled = true
    }
  }, [])

  const liveEvents: TvCard[] = payload?.live ?? []
  const scheduledEvents: TvCard[] = payload?.scheduled ?? []

  const filteredEvents = useMemo(() => {
    const source = showScheduled ? scheduledEvents : liveEvents
    const query = searchQuery.trim().toLowerCase()
    if (!query) return source
    return source.filter((event) =>
      [event.title, event.channelName, event.category].some((value) => value.toLowerCase().includes(query))
    )
  }, [liveEvents, scheduledEvents, searchQuery, showScheduled])

  const headerLabel = showScheduled ? "Scheduled" : "Live Now"

  if (loading) {
    return <TvLoadingState variant="section" />
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto hidden-scrollbar flex flex-col">
        <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
          <div className="flex flex-col gap-4">
            <div className="hidden lg:flex items-center p-4 justify-between w-full">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Events</h1>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <AvatarDropdownMenu />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4 p-4">
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
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 w-full text-sm"
                  />
                </div>

                <div className="hidden md:flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors border ${
                      viewMode === "grid"
                        ? "bg-red-600 border-red-600"
                        : "bg-transparent border-border hover:border-red-600/60"
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4 text-foreground" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors border ${
                      viewMode === "list"
                        ? "bg-red-600 border-red-600"
                        : "bg-transparent border-border hover:border-red-600/60"
                    }`}
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
            key={headerLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">{headerLabel}</h2>
              <span className="text-sm text-muted-foreground">
                {filteredEvents.length.toLocaleString()} results
              </span>
            </div>
            {filteredEvents.length > 0 ? (
              <div
                className={`grid gap-4 ${
                  viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5" : "grid-cols-1"
                }`}
              >
                {filteredEvents.map((event) => (
                  <StreamCard
                    key={event.id}
                    id={event.id}
                    thumbnail={event.thumbnail}
                    title={event.title}
                    channelName={event.channelName}
                    channelAvatar={event.channelAvatar}
                    viewers={event.viewers}
                    isLive={event.isLive}
                    category={event.category}
                    duration={event.duration ?? undefined}
                    onWatch={() => router.push(buildWatchHref(event))}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-muted/20 p-6 text-sm text-muted-foreground">
                No content available
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
