"use client"

import { useEffect, useMemo, useState } from "react"
import { Grid3x3, List, Search } from "lucide-react"
import { useRouter } from "next/navigation"

import StreamCard from "@/app/(Xonnect_tv)/tv/_component/stream-card"
import { AvatarDropdownMenu } from "@/components/common_component/AvatarDropdown"
import { ThemeToggle } from "@/components/theme-toggle"
import { buildWatchHref } from "@/lib/tv/watch-href"

type VideoItem = {
  id: string
  watchId: string
  firstPartId: string
  title: string
  thumbnail: string
  channelName: string
  channelAvatar: string
  channelAvatarUrl: string | null
  viewers: number
  isLive: boolean
  category: string
  type: string
  folderType: string
  status: string
  itemsCount: number
  pricing: string
  duration?: string | null
}

const pricingOptions = [
  { id: "all", label: "All" },
  { id: "free", label: "Free" },
  { id: "rent", label: "Rent" },
  { id: "purchase", label: "Purchase" },
]

export default function VideoPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [pricing, setPricing] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [items, setItems] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadVideos() {
      try {
        setLoading(true)
        const params = new URLSearchParams({
          // folderType: "all",
          pricing,
          search: searchQuery,
        })

        const res = await fetch(`/api/tv/movie?${params.toString()}`)
        if (!res.ok) return

        const data = await res.json()
        if (!cancelled) {
          setItems(Array.isArray(data?.items) ? data.items : [])
        }
      } catch (error) {
        console.error("Failed to load videos:", error)
        if (!cancelled) setItems([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadVideos()

    return () => {
      cancelled = true
    }
  }, [pricing, searchQuery])

  const resultSummary = useMemo(() => {
    if (loading) return "Loading videos"
    return `${items.length.toLocaleString()} titles`
  }, [items.length, loading])

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto hidden-scrollbar flex flex-col">
        <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
          <div className="px-4 md:px-6 py-4 space-y-4">
            <div className="hidden lg:flex items-center justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Video</h1>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <AvatarDropdownMenu />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="space-y-3">
                <div className="flex gap-2 overflow-x-auto pb-1 hidden-scrollbar">
                  {pricingOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setPricing(option.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors border ${
                        pricing === option.id
                          ? "bg-red-600 border-red-600 text-foreground"
                          : "bg-transparent border-border text-muted-foreground hover:border-red-600/60 hover:text-foreground"
                      }`}
                    >
                      <span className="text-sm font-semibold">{option.label}</span>
                    </button>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">{resultSummary}</p>
              </div>

              <div className="flex items-center gap-2 justify-start lg:justify-end">
                <div className="relative w-full min-w-0 lg:w-[340px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search titles or packages"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-border bg-transparent pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors border ${
                    viewMode === "grid"
                      ? "bg-red-600 border-red-600 text-foreground"
                      : "border-border hover:border-red-600/60 text-muted-foreground"
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors border ${
                    viewMode === "list"
                      ? "bg-red-600 border-red-600 text-foreground"
                      : "border-border hover:border-red-600/60 text-muted-foreground"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 hidden-scrollbar overflow-y-auto">
          {loading ? (
            <div className="min-h-[50vh] flex items-center justify-center text-muted-foreground">
              Loading videos...
            </div>
          ) : items.length === 0 ? (
            <div className="min-h-[50vh] flex items-center justify-center text-muted-foreground">
              No videos matched the current filters.
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                  : "grid-cols-1"
              }`}
            >
              {items.map((video) => (
                <StreamCard
                  key={video.id}
                  id={video.id}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  channelName={video.channelName}
                  channelAvatar={video.channelAvatar}
                  viewers={video.viewers}
                  isLive={video.isLive}
                  category={video.category}
                  duration={video.duration ?? undefined}
                  pricing={video.pricing}
                  onWatch={() => router.push(buildWatchHref(video))}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
