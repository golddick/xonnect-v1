"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Clock,
  Eye,
  Calendar,
  Library,
  Film,
  Clapperboard,
  Play,
  Settings,
  Share2,
  Video,
} from "lucide-react"

import VideoViewPanel from "@/components/common_component/video-view-panel"

export default function VideoViewPage() {
  const params = useParams()
  const router = useRouter()

  const [activePart, setActivePart] = useState(0)
  const [folderData, setFolderData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadFolder() {
      try {
        setLoading(true)
        const res = await fetch(`/api/creator/videos/${params.id}`)
        if (!res.ok) return

        const data = await res.json()
        if (!cancelled) {
          setFolderData(data?.folder ?? null)
          setActivePart(0)
        }
      } catch {
        // Ignore load failures here; the empty state handles the UI.
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadFolder()

    return () => {
      cancelled = true
    }
  }, [params.id])

  const currentPart = folderData?.parts?.[activePart] ?? null
  const currentVideoUrl = currentPart?.videoUrl ?? null
  const currentThumbnail = currentPart?.thumbnail || folderData?.thumbnail || null

  const getIcon = (type: string) => {
    switch (type) {
      case "series":
        return <Library className="w-5 h-5 text-red-500" />
      case "movie":
        return <Film className="w-5 h-5 text-red-500" />
      case "documentary":
        return <Clapperboard className="w-5 h-5 text-red-500" />
      default:
        return <Video className="w-5 h-5 text-red-500" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!folderData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        Video folder not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                {getIcon(folderData.contentType)}
                <h1 className="text-lg font-bold truncate max-w-[200px] md:max-w-md">
                  {folderData.title}
                </h1>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <span>{folderData.contentType}</span>
                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span>{folderData.parts?.length ?? 0} Parts</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                router.push(
                  `/creator/videos/${params.id}/edit?video=${currentPart?.id ?? ""}`
                )
              }
              className="hidden md:flex items-center gap-2 bg-muted hover:bg-muted/80 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              <Settings className="w-4 h-4" />
              Edit Current Part
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <VideoViewPanel
              key={currentPart?.id ?? "player"}
              videoUrl={currentVideoUrl}
              poster={currentThumbnail}
              title={currentPart?.title ?? folderData.title}
              subtitle={currentPart?.description ?? folderData.description}
            />

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    {currentPart?.views ?? 0} views
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {currentPart?.uploadDate
                      ? new Date(currentPart.uploadDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {currentPart?.duration ?? "N/A"}
                  </span>
                </div>

              </div>

              <div className="p-6 bg-muted/20 rounded-2xl border border-border/50">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {currentPart?.description || "No description available"}
                </p>
                {currentPart?.tags && currentPart.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {currentPart.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Episodes</h3>
              <span className="text-xs text-red-500 font-bold bg-red-500/10 px-2 py-1 rounded">
                {folderData.parts?.length ? activePart + 1 : 0} / {folderData.parts?.length ?? 0}
              </span>
            </div>

            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {folderData.parts?.map((part: any, index: number) => (
                <button
                  key={part.id}
                  onClick={() => {
                    setActivePart(index)
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left border ${
                    activePart === index
                      ? "bg-red-600/10 border-red-600/30 ring-1 ring-red-600/30"
                      : "bg-muted/30 border-transparent hover:bg-muted/50"
                  }`}
                >
                  <div className="relative flex-shrink-0 w-24 aspect-video bg-muted rounded-lg overflow-hidden border border-border/50">
                    {part.thumbnail ? (
                      <img
                        src={part.thumbnail}
                        alt={part.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                        <Play
                          className={`w-4 h-4 ${
                            activePart === index ? "text-red-500" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                    )}
                    <div className="absolute bottom-1 right-1 bg-black/70 text-[10px] text-white px-1 rounded">
                      {part.duration || "0:00"}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold truncate ${
                        activePart === index ? "text-red-500" : "text-foreground"
                      }`}
                    >
                      {index + 1}. {part.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-2">
                      <span>{part.views} views</span>
                    </p>
                  </div>

                  {activePart === index && (
                    <div className="flex-shrink-0 w-1.5 h-1.5 bg-red-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
