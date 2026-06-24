"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, Grid3x3, List, Sliders } from "lucide-react"
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
  itemsCount?: number
  watchId?: string
}

const sportFilters = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "scheduled", label: "Scheduled" },
  { id: "video", label: "Video" },
]

export default function SportPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("viewers")
  const [selectedSport, setSelectedSport] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [payload, setPayload] = useState<any>(null)

  useEffect(() => {
    let cancelled = false

    async function loadSport() {
      try {
        setLoading(true)
        const res = await fetch("/api/tv/sport")
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled) setPayload(data)
      } catch (error) {
        console.error("Failed to load sport payload:", error)
        if (!cancelled) setPayload(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadSport()

    return () => {
      cancelled = true
    }
  }, [])

  const liveBroadcasts: TvCard[] = payload?.sport?.liveBroadcasts ?? []
  const scheduledBroadcasts: TvCard[] = payload?.sport?.scheduledBroadcasts ?? []
  const videoFolders: TvCard[] = payload?.sport?.videoFolders ?? []

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const source =
      selectedSport === "live"
        ? liveBroadcasts
        : selectedSport === "scheduled"
          ? scheduledBroadcasts
          : selectedSport === "video"
            ? videoFolders
            : [...liveBroadcasts, ...scheduledBroadcasts, ...videoFolders]

    let items = source
    if (query) {
      items = items.filter((item) =>
        [item.title, item.channelName, item.category].some((value) => value.toLowerCase().includes(query))
      )
    }

    if (sortBy === "viewers") {
      items = [...items].sort((left, right) => right.viewers - left.viewers)
    }

    if (sortBy === "recent") {
      items = [...items]
    }

    return items
  }, [liveBroadcasts, scheduledBroadcasts, videoFolders, searchQuery, selectedSport, sortBy])

  if (loading) {
    return <TvLoadingState variant="section" />
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
          <div className="flex flex-col gap-4">
            <div className="hidden lg:flex items-center border-b border-border p-4 justify-between w-full">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Sports</h1>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <AvatarDropdownMenu />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4 w-full p-4">
              <div className="flex gap-2 overflow-x-auto pb-2 hidden-scrollbar">
                {sportFilters.map((sport) => (
                  <button
                    key={sport.id}
                    onClick={() => setSelectedSport(sport.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedSport === sport.id
                        ? "bg-red-600 text-foreground"
                        : "bg-white/10 text-muted-foreground hover:bg-white/20"
                    }`}
                  >
                    <span className="text-sm font-semibold">{sport.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex md:items-end md:justify-end w-full gap-2 md:gap-4 flex-nowrap">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search matches..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 w-full text-sm"
                  />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Sliders className="w-4 h-4 text-foreground" />
                </button>

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

            {showFilters && (
              <div className="md:hidden px-4 pb-4">
                <div className="rounded-xl border border-border bg-background/60 p-3">
                  <label className="text-xs text-muted-foreground uppercase mb-2 block">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-foreground text-sm"
                  >
                    <option value="viewers">Viewers</option>
                    <option value="recent">Recent</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          {filteredItems.length > 0 ? (
            <div
              className={`grid gap-4 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {filteredItems.map((item) => (
                <StreamCard
                  key={item.id}
                  id={item.id}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  channelName={item.channelName}
                  channelAvatar={item.channelAvatar}
                  viewers={item.viewers}
                  isLive={item.isLive}
                  category={item.category}
                  duration={item.duration ?? undefined}
                  onWatch={() => router.push(buildWatchHref(item))}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-muted/20 p-6 text-sm text-muted-foreground">
              No content available
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
