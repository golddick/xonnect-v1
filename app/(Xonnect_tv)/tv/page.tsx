"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, Grid3x3, List } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

import StreamCard from "@/app/(Xonnect_tv)/tv/_component/stream-card"
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
  pricing?: string
  watchId?: string
}

export default function TvPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [payload, setPayload] = useState<any>(null)

  useEffect(() => {
    let cancelled = false

    async function loadTv() {
      try {
        setLoading(true)
        const res = await fetch("/api/tv")
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled) setPayload(data)
      } catch (error) {
        console.error("Failed to load TV landing payload:", error)
        if (!cancelled) setPayload(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadTv()

    return () => {
      cancelled = true
    }
  }, [])

  const featuredStreams: TvCard[] = payload?.featuredCarousel ?? []
  const liveStreams: TvCard[] = payload?.contentColumns?.live ?? []
  const videoStreams: TvCard[] = payload?.contentColumns?.video ?? []

  useEffect(() => {
    if (carouselIndex >= featuredStreams.length) {
      setCarouselIndex(0)
    }
  }, [carouselIndex, featuredStreams.length])

  const filteredLive = useMemo(
    () =>
      liveStreams.filter((stream) => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return true
        return [stream.title, stream.channelName, stream.category].some((value) =>
          value.toLowerCase().includes(query)
        )
      }),
    [liveStreams, searchQuery]
  )

  const filteredVideo = useMemo(
    () =>
      videoStreams.filter((stream) => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return true
        return [stream.title, stream.channelName, stream.category].some((value) =>
          value.toLowerCase().includes(query)
        )
      }),
    [videoStreams, searchQuery]
  )

  const currentFeature = featuredStreams[carouselIndex] ?? featuredStreams[0] ?? null

  return (
    <div className="flex h-screen bg-background overflow-hidden hidden-scrollbar flex-col lg:flex-row">
      <div className="flex-1 overflow-y-auto hidden-scrollbar flex flex-col">
        <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
          <div className="hidden lg:flex items-center justify-between gap-4 px-4 md:px-6 py-3">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Discover</h1>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search streams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm w-64"
                />
              </div>

              <div className="flex gap-2">
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

              <ThemeToggle />
              <AvatarDropdownMenu />
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-8">
          {currentFeature ? (
            <motion.div
              key={currentFeature.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative rounded-2xl overflow-hidden bg-muted aspect-video"
            >
              <img
                src={currentFeature.thumbnail || "/placeholder.svg"}
                alt={currentFeature.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-red-500 text-sm font-bold">
                    {currentFeature.isLive ? "LIVE" : "FEATURED"}
                  </span>
                  <span className="text-foreground text-sm">{currentFeature.viewers.toLocaleString()} watching</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{currentFeature.title}</h3>
                <p className="text-muted-foreground mb-4">{currentFeature.channelName}</p>
                <button
                  onClick={() => router.push(buildWatchHref(currentFeature))}
                  className="w-fit bg-red-600 hover:bg-red-700 text-foreground px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  Watch Now
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="rounded-2xl border border-border bg-muted/20 aspect-video flex items-center justify-center text-muted-foreground">
              {loading ? "Loading featured content..." : "No featured content available"}
            </div>
          )}

          {featuredStreams.length > 1 && (
            <div className="flex gap-2 justify-center">
              {featuredStreams.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCarouselIndex(index)}
                  className={`h-1 rounded-full transition-all ${index === carouselIndex ? "bg-red-600 w-8" : "bg-white/20 w-2 hover:bg-white/40"}`}
                />
              ))}
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Live Now</h2>
            <div
              className={`grid gap-4 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {filteredLive.map((stream) => (
                <StreamCard
                  key={stream.id}
                  id={stream.id}
                  thumbnail={stream.thumbnail}
                  title={stream.title}
                  channelName={stream.channelName}
                  channelAvatar={stream.channelAvatar}
                  viewers={stream.viewers}
                  isLive={stream.isLive}
                  category={stream.category}
                  duration={stream.duration ?? undefined}
                  onWatch={() => router.push(buildWatchHref(stream))}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Video</h2>
            <div
              className={`grid gap-4 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {filteredVideo.map((video) => (
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
          </div>
        </div>
      </div>
    </div>
  )
}
