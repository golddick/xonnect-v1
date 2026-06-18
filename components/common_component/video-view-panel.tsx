"use client"

import { ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { Play, Video } from "lucide-react"

import { resolvePlayableMediaSource } from "@/lib/tv/media"

type VideoViewPanelProps = {
  videoUrl?: string | null
  poster?: string | null
  title: string
  subtitle?: string | null
  locked?: boolean
  previewSeconds?: number | null
  showOverlay?: boolean
  overlay?: ReactNode
  emptyLabel?: string
  onPreviewExpired?: () => void
}

export default function VideoViewPanel({
  videoUrl,
  poster,
  title,
  subtitle,
  locked = false,
  previewSeconds = null,
  showOverlay = false,
  overlay,
  emptyLabel = "Video not available",
  onPreviewExpired,
}: VideoViewPanelProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [previewExpired, setPreviewExpired] = useState(false)
  const playableMedia = useMemo(() => resolvePlayableMediaSource(videoUrl), [videoUrl])
  const isYouTubeVideo = playableMedia?.kind === "youtube"

  useEffect(() => {
    setPreviewExpired(false)
  }, [videoUrl, previewSeconds, locked])

  useEffect(() => {
    videoRef.current?.pause()
    setIsPlaying(false)
  }, [videoUrl])

  const handlePlay = async () => {
    try {
      if (!videoRef.current || locked || !videoUrl || isYouTubeVideo) return
      await videoRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.error("Failed to start playback:", error)
    }
  }

  const handleTimeUpdate = () => {
    if (locked || previewSeconds === null || previewSeconds === undefined || previewExpired) return
    const currentTime = videoRef.current?.currentTime ?? 0
    if (currentTime >= previewSeconds) {
      videoRef.current?.pause()
      setIsPlaying(false)
      setPreviewExpired(true)
      onPreviewExpired?.()
    }
  }

  const shouldShowOverlay = locked || showOverlay || previewExpired

  return (
    <div className="aspect-video bg-black rounded-3xl overflow-hidden relative group border border-border">
      {playableMedia ? (
        <div className="relative w-full h-full">
          {isYouTubeVideo ? (
            <iframe
              key={playableMedia.embedUrl}
              src={playableMedia.embedUrl}
              title={title}
              className="w-full h-full border-0 bg-black"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <video
              key={playableMedia.src}
              ref={videoRef}
              src={playableMedia.src}
              poster={poster || undefined}
              className="w-full h-full object-cover bg-black"
              controls
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
            />
          )}

          {!isYouTubeVideo && !isPlaying && !shouldShowOverlay && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button
                  type="button"
                  onClick={handlePlay}
                  className="pointer-events-auto w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                >
                  <Play className="w-10 h-10 text-white fill-white ml-1" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                <p className="text-white text-sm font-medium mb-1">Click to Play</p>
                <h2 className="text-white text-2xl font-bold">{title}</h2>
                {subtitle ? <p className="text-white/70 text-sm mt-1">{subtitle}</p> : null}
              </div>
            </div>
          )}

          {shouldShowOverlay && overlay ? <div className="absolute inset-0">{overlay}</div> : null}
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
          {poster ? (
            <img
              src={poster}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          ) : null}
          <Video className="w-16 h-16 text-gray-600 mb-4" />
          <p className="text-gray-400 text-center">{emptyLabel}</p>
          {shouldShowOverlay && overlay ? <div className="absolute inset-0">{overlay}</div> : null}
        </div>
      )}
    </div>
  )
}
