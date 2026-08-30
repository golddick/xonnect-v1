"use client"

import { ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { Loader2, Play } from "lucide-react"

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
  onPreviewExpired?: () => void
  onReportView?: () => void
  reportAfterSeconds?: number | null
  showPurchaseButton?: boolean
  onRequestAccess?: () => void
  purchaseButtonLabel?: string
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
  onPreviewExpired,
  onReportView,
  reportAfterSeconds = null,
  showPurchaseButton = false,
  onRequestAccess,
  purchaseButtonLabel = "Purchase",
}: VideoViewPanelProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMediaLoading, setIsMediaLoading] = useState(Boolean(videoUrl))
  const [previewExpired, setPreviewExpired] = useState(false)
  const reportedRef = useRef(false)
  const playableMedia = useMemo(() => resolvePlayableMediaSource(videoUrl), [videoUrl])
  const isYouTubeVideo = playableMedia?.kind === "youtube"

  useEffect(() => {
    setPreviewExpired(false)
  }, [videoUrl, previewSeconds, locked])

  useEffect(() => {
    if (!videoUrl || !playableMedia) {
      setIsMediaLoading(false)
      return
    }

    setIsMediaLoading(true)
  }, [videoUrl, playableMedia])

  useEffect(() => {
    videoRef.current?.pause()
    setIsPlaying(false)
  }, [videoUrl])

  const shouldShowOverlay = Boolean(overlay) && (locked || showOverlay || previewExpired)
  // When the content is locked (e.g. the access/paywall banner is up) playback must be
  // fully blocked: no media source, no native controls, and force a pause. Otherwise the
  // video keeps playing (and audio keeps going) in the background behind the banner.
  const isBlocked = shouldShowOverlay || locked

  useEffect(() => {
    if (!videoRef.current || isBlocked || !videoUrl || isYouTubeVideo) return

    videoRef.current.load()
  }, [videoUrl, isBlocked, isYouTubeVideo])

  useEffect(() => {
    if (!isBlocked) return

    // Force playback to stop and clear any pending loading state. Uses optional
    // chaining so it also covers the YouTube case where the <video> element is
    // not mounted (the iframe is swapped for a poster while blocked).
    videoRef.current?.pause()
    setIsPlaying(false)
    setIsMediaLoading(false)
  }, [isBlocked])

  const handlePlay = async () => {
    try {
      if (!videoRef.current || isBlocked || !videoUrl || isYouTubeVideo) return
      await videoRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.error("Failed to start playback:", error)
    }
  }

  const handleTimeUpdate = () => {
    if (isBlocked) return

    const currentTime = videoRef.current?.currentTime ?? 0

    if (!previewExpired && previewSeconds !== null && previewSeconds !== undefined) {
      if (currentTime >= previewSeconds) {
        videoRef.current?.pause()
        setIsPlaying(false)
        setPreviewExpired(true)
        onPreviewExpired?.()
      }
    }

    const reportAfter = reportAfterSeconds ?? 60
    if (!reportedRef.current && reportAfter && currentTime >= reportAfter) {
      reportedRef.current = true
      try {
        onReportView?.()
      } catch (e) {
        // ignore
      }
    }
  }

  const handleMediaReady = () => setIsMediaLoading(false)
  const shouldShowMediaActionButton = !shouldShowOverlay && (showPurchaseButton || Boolean(playableMedia && !isYouTubeVideo && !isMediaLoading && !isPlaying && !isBlocked))
  const shouldShowLoadingIndicator = !shouldShowOverlay && isMediaLoading && !isPlaying && !videoRef.current?.currentTime

  return (
    <div className="aspect-video bg-black rounded-3xl overflow-hidden relative group border border-border">
      {playableMedia ? (
        <div className="relative w-full h-full">
          {isYouTubeVideo ? (
            isBlocked ? (
              // Do not mount the YouTube iframe while blocked, otherwise it can keep
              // playing audio in the background behind the access banner. Show the
              // poster (or a plain black frame) instead.
              poster ? (
                <img
                  src={poster}
                  alt={title}
                  className="w-full h-full object-cover bg-black"
                />
              ) : (
                <div className="w-full h-full bg-black" />
              )
            ) : (
              <iframe
                key={playableMedia.embedUrl}
                src={playableMedia.embedUrl}
                title={title}
                className="w-full h-full border-0 bg-black"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={handleMediaReady}
              />
            )
          ) : (
            <video
              key={playableMedia.src}
              ref={videoRef}
              src={isBlocked ? undefined : playableMedia.src}
              poster={poster || undefined}
              className="w-full h-full object-cover bg-black"
              controls={!isBlocked}
              playsInline
              preload={isBlocked ? "none" : "auto"}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onLoadedData={handleMediaReady}
              onCanPlay={handleMediaReady}
              onCanPlayThrough={handleMediaReady}
              onWaiting={() => setIsMediaLoading(true)}
              onTimeUpdate={handleTimeUpdate}
            />
          )}

          {shouldShowLoadingIndicator ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 pointer-events-none">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-2 text-xs font-medium text-white/90 shadow-lg backdrop-blur-sm">
                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
              </div>
            </div>
          ) : null}

          {shouldShowMediaActionButton ? (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button
                  type="button"
                  onClick={showPurchaseButton ? onRequestAccess : handlePlay}
                  className="pointer-events-auto min-w-[7.5rem] rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl transition-transform hover:scale-110"
                >
                  {showPurchaseButton ? purchaseButtonLabel : <div className="flex items-center justify-center gap-2"><Play className="h-3.5 w-3.5 fill-white" /></div>}
                </button>
              </div>
            </div>
          ) : null}

          {shouldShowOverlay && overlay ? <div className="absolute inset-0 z-20 pointer-events-auto">{overlay}</div> : null}
        </div>
      ) : (
        <div className="relative w-full h-full bg-black flex items-center justify-center">
          {poster ? (
            <img src={poster} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-white">No media available</div>
          )}

          {shouldShowLoadingIndicator ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 pointer-events-none">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-2 text-xs font-medium text-white/90 shadow-lg backdrop-blur-sm">
                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
              </div>
            </div>
          ) : null}

          {shouldShowOverlay && overlay ? (
            <div className="absolute inset-0 z-20 pointer-events-auto">{overlay}</div>
          ) : null}

          {shouldShowMediaActionButton ? (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                type="button"
                onClick={showPurchaseButton ? onRequestAccess : handlePlay}
                className="pointer-events-auto min-w-[7.5rem] rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl transition-transform hover:scale-110"
              >
                {showPurchaseButton ? purchaseButtonLabel : <div className="flex items-center justify-center gap-2"><Play className="h-5 w-5 fill-white" /><span>Play</span></div>}
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
