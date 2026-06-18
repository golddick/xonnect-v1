"use client"

import { ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  AlertCircle,
  Clock3,
  Loader2,
  MicOff,
  Radio,
  Play,
  Speaker,
  Volume2,
  VolumeX,
} from "lucide-react"
import { Room, RoomEvent, Track, type RemoteTrack, type RemoteTrackPublication } from "livekit-client"

import { resolvePlayableMediaSource } from "@/lib/tv/media"

type EventStreamPlayerProps = {
  eventId: string
  title: string
  subtitle?: string | null
  poster?: string | null
  previewVideoUrl?: string | null
  scheduledAt?: string | null
  status: string
  wsUrl?: string | null
  accessCode?: string | null
  locked?: boolean
  viewers?: number
  overlay?: ReactNode
}

function formatDateTime(value?: string | null) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleString()
}

function pickTrack(track: RemoteTrack | null | undefined, current: RemoteTrack | null) {
  if (!track) return current
  if (!current) return track
  if (current.kind === Track.Kind.Video && track.kind !== Track.Kind.Video) return current
  if (current.kind === Track.Kind.Audio && track.kind !== Track.Kind.Audio) return current
  return current
}

export default function EventStreamPlayer({
  eventId,
  title,
  subtitle,
  poster,
  previewVideoUrl,
  scheduledAt,
  status,
  wsUrl,
  accessCode,
  locked = false,
  viewers = 0,
  overlay,
}: EventStreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const previewVideoRef = useRef<HTMLVideoElement | null>(null)
  const roomRef = useRef<Room | null>(null)
  const videoTrackRef = useRef<RemoteTrack | null>(null)
  const audioTrackRef = useRef<RemoteTrack | null>(null)
  const [videoTrack, setVideoTrack] = useState<RemoteTrack | null>(null)
  const [audioTrack, setAudioTrack] = useState<RemoteTrack | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [audioPlaybackBlocked, setAudioPlaybackBlocked] = useState(false)
  const [audioPlaybackReady, setAudioPlaybackReady] = useState(false)

  const isLive = status.toUpperCase() === "LIVE"
  const previewMedia = useMemo(() => resolvePlayableMediaSource(previewVideoUrl), [previewVideoUrl])
  const hasPreviewVideo = Boolean(previewMedia) && !isLive
  const scheduledLabel = useMemo(() => formatDateTime(scheduledAt), [scheduledAt])
  const canConnect = Boolean(isLive && !locked)
  const shouldShowBackdrop =
    (!isLive && !hasPreviewVideo) || (isLive && locked) || isConnecting || Boolean(connectionError) || Boolean(overlay)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  useEffect(() => {
    videoTrackRef.current = videoTrack
  }, [videoTrack])

  useEffect(() => {
    audioTrackRef.current = audioTrack
  }, [audioTrack])

  useEffect(() => {
    if (!videoTrack || !videoRef.current) return

    const element = videoRef.current
    videoTrack.detach()
    videoTrack.attach(element)
    element.playsInline = true
    element.autoplay = true
    element.muted = true

    return () => {
      videoTrack.detach(element)
    }
  }, [videoTrack])

  useEffect(() => {
    if (!audioTrack || !audioRef.current) return

    const element = audioRef.current
    audioTrack.detach()
    audioTrack.attach(element)
    element.autoplay = true
    element.muted = isMuted

    return () => {
      audioTrack.detach(element)
    }
  }, [audioTrack, isMuted])

  useEffect(() => {
    const room = roomRef.current
    if (!room) return

    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }

    if (room.canPlaybackAudio) {
      setAudioPlaybackReady(true)
      setAudioPlaybackBlocked(false)
    }
  }, [isMuted])

  useEffect(() => {
    setConnectionError(null)
    setAudioPlaybackBlocked(false)
    setAudioPlaybackReady(false)
    setVideoTrack(null)
    setAudioTrack(null)

    const shouldConnect = canConnect && Boolean(eventId)
    if (!shouldConnect) {
      roomRef.current?.disconnect().catch(() => undefined)
      roomRef.current = null
      setIsConnecting(false)
      return
    }

    let cancelled = false
    const room = new Room({ adaptiveStream: true, dynacast: true })
    roomRef.current = room

    const syncAttachedTracks = () => {
      let nextVideo: RemoteTrack | null = null
      let nextAudio: RemoteTrack | null = null

      room.remoteParticipants.forEach((participant) => {
        participant.trackPublications.forEach((publication) => {
          const track = publication.track
          if (!track) return

          if (track.kind === Track.Kind.Video) {
            nextVideo = pickTrack(track, nextVideo)
          } else if (track.kind === Track.Kind.Audio) {
            nextAudio = pickTrack(track, nextAudio)
          }
        })
      })

      setVideoTrack(nextVideo)
      setAudioTrack(nextAudio)
    }

    const handleTrackSubscribed = (
      track: RemoteTrack,
      publication: RemoteTrackPublication
    ) => {
      if (publication.source === Track.Source.Camera || track.kind === Track.Kind.Video) {
        setVideoTrack((current) => pickTrack(track, current))
      }

      if (publication.source === Track.Source.Microphone || track.kind === Track.Kind.Audio) {
        setAudioTrack((current) => pickTrack(track, current))
      }
    }

    const handleTrackUnsubscribed = (track: RemoteTrack) => {
      if (videoTrackRef.current?.sid === track.sid) {
        setVideoTrack(null)
      }
      if (audioTrackRef.current?.sid === track.sid) {
        setAudioTrack(null)
      }
    }

    const connect = async () => {
      try {
        setIsConnecting(true)

        const query = new URLSearchParams()
        if (accessCode?.trim()) {
          query.set("accessCode", accessCode.trim())
        }

        const response = await fetch(
          `/api/tv/watch/${eventId}/livekit${query.toString() ? `?${query.toString()}` : ""}`,
          { cache: "no-store" }
        )

        if (!response.ok) {
          const data = await response.json().catch(() => null)
          throw new Error(data?.message ?? "Unable to join the event stream")
        }

        const data = (await response.json()) as {
          roomName?: string
          wsUrl?: string | null
          token?: string
        }

        if (cancelled) return

        const resolvedWsUrl = data.wsUrl ?? wsUrl
        if (!resolvedWsUrl || !data.token) {
          throw new Error("LiveKit connection details are incomplete")
        }

        room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed)
        room.on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
        room.on(RoomEvent.AudioPlaybackStatusChanged, () => {
          setAudioPlaybackReady(room.canPlaybackAudio)
          setAudioPlaybackBlocked(!room.canPlaybackAudio)
        })
        room.on(RoomEvent.Disconnected, () => {
          setVideoTrack(null)
          setAudioTrack(null)
          setAudioPlaybackReady(false)
          setAudioPlaybackBlocked(false)
        })

        await room.connect(resolvedWsUrl, data.token)
        if (cancelled) return

        syncAttachedTracks()

        try {
          await room.startAudio()
          setAudioPlaybackReady(room.canPlaybackAudio)
          setAudioPlaybackBlocked(!room.canPlaybackAudio)
        } catch (error) {
          console.error("LiveKit audio playback start failed:", error)
          setAudioPlaybackBlocked(true)
        }
      } catch (error) {
        if (cancelled) return
        console.error("Event stream connection failed:", error)
        setConnectionError(error instanceof Error ? error.message : "Failed to connect to the stream")
      } finally {
        if (!cancelled) {
          setIsConnecting(false)
        }
      }
    }

    connect()

    return () => {
      cancelled = true
      room.off(RoomEvent.TrackSubscribed, handleTrackSubscribed)
      room.off(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
      room.disconnect().catch(() => undefined)
      roomRef.current = null
      setVideoTrack(null)
      setAudioTrack(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessCode, canConnect, eventId, status, wsUrl, locked])

  const handleEnableSound = async () => {
    try {
      await roomRef.current?.startAudio()
      setAudioPlaybackReady(roomRef.current?.canPlaybackAudio ?? false)
      setAudioPlaybackBlocked(!(roomRef.current?.canPlaybackAudio ?? false))
    } catch (error) {
      console.error("Unable to enable audio playback:", error)
      setAudioPlaybackBlocked(true)
    }
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-border bg-black">
      {poster ? (
        <img
          src={poster}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
      )}

      {hasPreviewVideo && previewMedia ? (
        previewMedia.kind === "youtube" ? (
          <iframe
            src={previewMedia.embedUrl}
            title={title}
            className="absolute inset-0 h-full w-full border-0 bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <video
            ref={previewVideoRef}
            src={previewMedia.src}
            poster={poster ?? undefined}
            className="absolute inset-0 h-full w-full bg-black object-contain"
            controls
            playsInline
            preload="metadata"
          />
        )
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-contain bg-black"
          playsInline
          autoPlay
          muted
        />
      )}
      <audio ref={audioRef} className="hidden" autoPlay />

      {shouldShowBackdrop ? (
        <div className="absolute inset-0 flex items-end bg-black/55 p-4 md:p-6">
          <div className="w-full space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                  isLive ? "bg-red-600 text-white" : "bg-white/10 text-white"
                }`}
              >
                <Radio className="h-3.5 w-3.5" />
                {isLive ? "Live" : "Scheduled"}
              </span>
              {viewers > 0 ? (
                <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white/80">
                  {viewers.toLocaleString()} watching
                </span>
              ) : null}
              {scheduledLabel ? (
                <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white/80">
                  {scheduledLabel}
                </span>
              ) : null}
            </div>

            <div className="max-w-3xl space-y-2">
              <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
              {subtitle ? <p className="text-sm text-white/75 md:text-base">{subtitle}</p> : null}
            </div>

            {!isLive && !hasPreviewVideo ? (
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white/80">
                <Clock3 className="h-4 w-4 text-red-400" />
                The broadcaster will connect the room when the event goes live.
              </div>
            ) : null}

            {connectionError ? (
              <div className="flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                <AlertCircle className="h-4 w-4" />
                {connectionError}
              </div>
            ) : null}

            {isConnecting ? (
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white/80">
                <Loader2 className="h-4 w-4 animate-spin text-red-400" />
                Connecting to the event stream...
              </div>
            ) : null}

            <AnimatePresence>
              {overlay ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                >
                  {overlay}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      ) : null}

      {hasPreviewVideo ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 md:p-6">
          <div className="max-w-3xl space-y-2 text-white">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                <Play className="h-3.5 w-3.5" />
                Preview available
              </span>
              {scheduledLabel ? (
                <span className="rounded-full bg-black/55 px-3 py-1 text-xs text-white/80">
                  {scheduledLabel}
                </span>
              ) : null}
            </div>
            <p className="max-w-2xl text-sm text-white/80 md:text-base">
              Watch the event teaser while the stream is still offline.
            </p>
          </div>
        </div>
      ) : null}

      {isLive && !locked && !connectionError ? (
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs font-semibold text-white">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          Live stream
        </div>
      ) : null}

      {isLive ? (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
          {audioPlaybackBlocked ? (
            <button
              type="button"
              onClick={handleEnableSound}
              className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-black transition-colors hover:bg-white/90"
            >
              <Speaker className="h-4 w-4" />
              Enable sound
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => setIsMuted((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-black/80"
            title={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {isMuted ? "Muted" : "Sound on"}
          </button>
        </div>
      ) : null}

      {audioPlaybackReady && !audioPlaybackBlocked ? (
        <div className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs font-semibold text-white/80">
          <MicOff className="h-4 w-4" />
          Audio connected
        </div>
      ) : null}
    </div>
  )
}
