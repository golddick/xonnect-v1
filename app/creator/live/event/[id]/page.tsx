"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  createLocalAudioTrack,
  createLocalScreenTracks,
  createLocalVideoTrack,
  Room,
  type VideoCaptureOptions,
} from "livekit-client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { uploadCreatorVideo } from "@/lib/uploadthing/client"

export default function CreatorLivePage() {
  const params = useParams() as { id?: string }
  const router = useRouter()
  const eventId = params.id ?? ""

  const [wsUrl, setWsUrl] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [room, setRoom] = useState<Room | null>(null)
  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const screenVideoRef = useRef<HTMLVideoElement | null>(null)
  const publishedVideoRef = useRef<any>(null)
  const publishedScreenRef = useRef<any>(null)
  const publishedAudioRef = useRef<any>(null)
  const unpublishedDuringPauseRef = useRef<any[]>([])
  const recorderRef = useRef<MediaRecorder | null>(null)
  const recordingChunksRef = useRef<Blob[]>([])
  const recordingBlobRef = useRef<Blob | null>(null)

  // FIX: MediaRecorder must NEVER have tracks added/removed on the stream
  // it's actively recording from — most browsers silently error+stop the
  // recorder when that happens (this was the "recording didn't go again
  // after switching camera" bug). Instead of mutating a live stream, we
  // now stop the current recorder cleanly, stash its output as a
  // "segment" Blob, and start a brand new MediaRecorder on a brand new
  // MediaStream for the new source. All finished segments are concatenated
  // into one Blob when the user ends the live stream.
  const recordingStreamRef = useRef<MediaStream | null>(null)
  const activeRecordingVideoTrackRef = useRef<MediaStreamTrack | null>(null)
  const activeRecordingAudioTrackRef = useRef<MediaStreamTrack | null>(null)
  const recordingSegmentsRef = useRef<Blob[]>([])
  // FIX: ref-backed flag so handleStop doesn't read a stale React state value.
  const hasRecordingDataRef = useRef(false)

  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cameras, setCameras] = useState<Array<{ deviceId: string; label: string }>>([])
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null)
  const [sourceMode, setSourceMode] = useState<"camera" | "screen" | "both">("camera")
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [awaitingStopDecision, setAwaitingStopDecision] = useState(false)
  const [paused, setPaused] = useState(false)
  const [savingStatus, setSavingStatus] = useState<"pending" | "uploading" | "saving" | "completed" | "error">("pending")
  const [savingError, setSavingError] = useState<string | null>(null)
  const [isProcessingSave, setIsProcessingSave] = useState(false)
  const [hasRecordingData, setHasRecordingData] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isSafari, setIsSafari] = useState(false)

  // Detect browser
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    setIsIOS(/iphone|ipad|ipod/.test(userAgent))
    setIsSafari(/safari/.test(userAgent) && !/chrome/.test(userAgent))
  }, [])

  useEffect(() => {
    if (!eventId) return

    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`/api/creator/events/${eventId}/livekit-token`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Failed to get token")
        if (cancelled) return
        setWsUrl(data.wsUrl ?? null)
        setToken(data.token ?? null)

        if (data.wsUrl && data.token) {
          void handleConnectAndPublish()
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      }
    })()

    return () => {
      cancelled = true
    }
  }, [eventId])

  useEffect(() => {
    let cancelled = false
    const loadDevices = async () => {
      try {
        const list = await navigator.mediaDevices.enumerateDevices()
        let cams = list
          .filter((d) => d.kind === "videoinput")
          .map((d) => ({ deviceId: d.deviceId, label: d.label || "Camera" }))

        if (cams.every((c) => !c.label || c.label === "")) {
          try {
            const previewStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            previewStream.getTracks().forEach((t) => t.stop())
            const list2 = await navigator.mediaDevices.enumerateDevices()
            cams = list2
              .filter((d) => d.kind === "videoinput")
              .map((d) => ({ deviceId: d.deviceId, label: d.label || "Camera" }))
          } catch (err) {
            // ignore permission errors
          }
        }

        if (cancelled) return
        setCameras(cams)
        if (!selectedCamera && cams.length > 0) {
          setSelectedCamera(cams[0].deviceId)
        }
      } catch (err) {
        console.error("Failed to load cameras", err)
      }
    }

    void loadDevices()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (uploading || savingStatus !== "pending" || isProcessingSave) {
        event.preventDefault()
        event.returnValue = "You have an upload in progress. Are you sure you want to leave?"
        return "You have an upload in progress. Are you sure you want to leave?"
      }
    }

    if (uploading || savingStatus !== "pending" || isProcessingSave) {
      window.addEventListener("beforeunload", handleBeforeUnload)
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [uploading, savingStatus, isProcessingSave])

  const getSupportedRecorderOptions = () => {
    if (typeof MediaRecorder === "undefined") return undefined

    // iOS Safari specific - only supports certain formats
    const candidates = isIOS ? [
      "video/mp4",
      "video/quicktime",
      "video/webm",
    ] : [
      "video/webm;codecs=vp8,opus",
      "video/webm;codecs=vp9,opus",
      "video/webm",
      "video/mp4;codecs=avc1",
      "video/mp4",
    ]

    for (const mimeType of candidates) {
      try {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          return { mimeType }
        }
      } catch {
        // ignore invalid mimeType checks
      }
    }
    return undefined
  }

  const startMediaRecorder = async (videoTrack: any, audioTrack: any) => {
    try {
      if (!videoTrack?.mediaStreamTrack || !audioTrack?.mediaStreamTrack) {
        console.error("Missing video or audio track for recording")
        setError("Couldn't start recording — camera/microphone wasn't ready. Try restarting the stream.")
        return
      }

      if (typeof window === "undefined" || typeof MediaRecorder === "undefined") {
        setError("Recording is not supported in this browser")
        return
      }

      const options = getSupportedRecorderOptions()
      if (!options) {
        setError(
          "Recording is not supported by this browser. Please use a modern browser like Chrome, Edge, or Safari 16+."
        )
        return
      }

      // FIX: always build a FRESH MediaStream for a FRESH MediaRecorder.
      // We never reuse/mutate a stream that a recorder is (or was) already
      // reading from — see the comment on recordingSegmentsRef above.
      const stream = new MediaStream()
      stream.addTrack(videoTrack.mediaStreamTrack)
      stream.addTrack(audioTrack.mediaStreamTrack)
      recordingStreamRef.current = stream
      activeRecordingVideoTrackRef.current = videoTrack.mediaStreamTrack
      activeRecordingAudioTrackRef.current = audioTrack.mediaStreamTrack

      const recorder = new MediaRecorder(stream, options)
      recorderRef.current = recorder
      recordingChunksRef.current = []
      hasRecordingDataRef.current = false

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordingChunksRef.current.push(event.data)
          hasRecordingDataRef.current = true
          console.log(`📦 Received chunk: ${event.data.size} bytes`)
        }
      }

      recorder.onerror = (event: any) => {
        console.error("❌ MediaRecorder error:", event?.error || event)
        setError(
          `Recording error: ${event?.error?.message || "the recorder stopped unexpectedly"}. Try restarting the stream.`
        )
      }

      recorder.onstop = () => {
        console.log("🛑 Recorder stopped, processing chunks...")
        console.log(`📊 Total chunks: ${recordingChunksRef.current.length}`)

        setIsRecording(false)

        if (recordingChunksRef.current.length === 0) {
          console.warn("⚠️ No chunks in this segment (may be normal on a source switch)")
          return
        }

        try {
          const totalSize = recordingChunksRef.current.reduce((acc, chunk) => acc + chunk.size, 0)
          console.log(`📊 Total segment size: ${totalSize} bytes`)

          const blob = new Blob(recordingChunksRef.current, { type: options.mimeType || "video/webm" })
          recordingChunksRef.current = []

          if (blob.size > 0) {
            // NOTE: this handler now only packages the CURRENT segment.
            // Segment collection/joining is driven explicitly by
            // stopCurrentRecorderSegment() below, which is what
            // switchRecordingSource() and handleStop() call. We still set
            // recordingBlobRef here as a fallback so nothing is lost if
            // onstop fires outside that flow (e.g. unexpected browser stop).
            recordingBlobRef.current = blob
            setHasRecordingData(true)
            hasRecordingDataRef.current = true
            console.log(`✅ Segment blob created: ${blob.size} bytes`)
          } else {
            console.warn("⚠️ Segment blob was empty")
          }
        } catch (err) {
          console.error("❌ Error creating segment blob:", err)
          setError(err instanceof Error ? err.message : String(err))
        }
      }

      // iOS Safari needs timeslice for proper recording
      const timeslice = isIOS ? 500 : 1000
      recorder.start(timeslice)
      setIsRecording(true)
      console.log(`🎥 Recording started with MIME type: ${options.mimeType} (${isIOS ? 'iOS' : 'standard'} mode)`)
    } catch (err) {
      console.error("Error starting recorder:", err)
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  // FIX: stops ONLY the currently running recorder segment and resolves
  // with that segment's Blob (or null if nothing was captured). Does not
  // touch LiveKit tracks, the room, or any UI state beyond isRecording —
  // callers decide what to do next (start a new segment, or finish up).
  const stopCurrentRecorderSegment = (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const recorder = recorderRef.current
      const options = getSupportedRecorderOptions()

      const packageChunks = (): Blob | null => {
        const chunks = recordingChunksRef.current
        recordingChunksRef.current = []
        if (chunks.length === 0) return null
        const blob = new Blob(chunks, { type: options?.mimeType || "video/webm" })
        return blob.size > 0 ? blob : null
      }

      if (!recorder || recorder.state === "inactive") {
        console.log("Recorder already inactive, packaging any leftover chunks")
        resolve(packageChunks())
        return
      }

      console.log("Stopping current recorder segment...")

      if (recorder.state !== "recording") {
        resolve(packageChunks())
        return
      }

      const originalOnStop = recorder.onstop
      recorder.onstop = (event) => {
        console.log("Recorder onstop event fired (segment stop)")
        if (originalOnStop) {
          // @ts-ignore
          originalOnStop.call(recorder, event)
        }
        resolve(packageChunks())
      }
      recorder.stop()

      // iOS Safari workaround: sometimes onstop doesn't fire
      if (isIOS) {
        setTimeout(() => {
          if (recorder.state === "inactive") {
            console.log("iOS Safari: Force resolving segment stop")
            resolve(packageChunks())
          }
        }, 2000)
      }
    })
  }

  // FIX: the single entry point for handing recording off to a new
  // video/audio source (camera switch, camera<->screen switch). This
  // replaces the old approach of mutating a live-recorded MediaStream,
  // which is what caused recording to silently die after a switch.
  // Flow: stop current segment -> stash its Blob -> start a new recorder
  // on a brand new MediaStream built from the new tracks.
  const switchRecordingSource = async (videoTrack: any, audioTrack: any) => {
    if (!videoTrack?.mediaStreamTrack || !audioTrack?.mediaStreamTrack) return
    const finishedSegment = await stopCurrentRecorderSegment()
    if (finishedSegment) {
      recordingSegmentsRef.current.push(finishedSegment)
      console.log(`📼 Saved segment (${finishedSegment.size} bytes), total segments: ${recordingSegmentsRef.current.length}`)
    }
    await startMediaRecorder(videoTrack, audioTrack)
  }

  const endLiveEvent = async () => {
    if (!eventId) return
    try {
      await fetch(`/api/creator/events/${eventId}/end-live`, {
        method: "POST",
      })
    } catch (err) {
      console.warn("Failed to mark event ended", err)
    }
  }

  const publishCameraTrack = async (room: Room, selectedCameraId: string | null) => {
    const videoConstraints: VideoCaptureOptions = selectedCameraId ? { deviceId: selectedCameraId } : {}
    const vTrack = await createLocalVideoTrack(videoConstraints)

    try {
      vTrack.attach(localVideoRef.current!)
    } catch {}

    await room.localParticipant.publishTrack(vTrack)
    publishedVideoRef.current = vTrack
    return vTrack
  }

  const publishScreenTrack = async (room: Room) => {
    if (typeof navigator === "undefined") {
      throw new Error("Screen capture is not available in this environment")
    }

    if (!navigator.mediaDevices?.getDisplayMedia) {
      throw new Error(
        "Screen sharing is not supported by this browser. Use a desktop browser or a supported mobile browser with screen sharing support."
      )
    }

    const [screenVideoTrack] = await createLocalScreenTracks({
      video: true,
      audio: false,
    })

    const screenTrack = screenVideoTrack as any
    try {
      if (screenVideoRef.current) {
        screenTrack.attach(screenVideoRef.current)
      }
    } catch {}

    await room.localParticipant.publishTrack(screenTrack)
    publishedScreenRef.current = screenTrack
    return screenTrack
  }

  const handleSourceModeChange = async (nextMode: "camera" | "screen" | "both") => {
    if (nextMode === sourceMode) return

    if (!room || !connected) {
      setSourceMode(nextMode)
      return
    }

    if (publishing) return

    setPublishing(true)
    try {
      if (nextMode === "camera") {
        if (publishedScreenRef.current) {
          const screenTrack = publishedScreenRef.current
          try {
            await room.localParticipant.unpublishTrack(screenTrack)
          } catch {}

          // FIX: hand recording back to the camera track via
          // switchRecordingSource (fresh recorder segment) BEFORE stopping
          // the screen track, instead of mutating the recording stream.
          if (!publishedVideoRef.current) {
            const vTrack = await publishCameraTrack(room, selectedCamera)
            if (activeRecordingVideoTrackRef.current === screenTrack.mediaStreamTrack && publishedAudioRef.current) {
              await switchRecordingSource(vTrack, publishedAudioRef.current)
            }
            try {
              vTrack.attach(localVideoRef.current!)
            } catch {}
          } else if (activeRecordingVideoTrackRef.current === screenTrack.mediaStreamTrack && publishedAudioRef.current) {
            await switchRecordingSource(publishedVideoRef.current, publishedAudioRef.current)
          }

          try {
            screenTrack.stop()
          } catch {}
          publishedScreenRef.current = null
        } else if (!publishedVideoRef.current) {
          const vTrack = await publishCameraTrack(room, selectedCamera)
          if (publishedAudioRef.current) {
            await switchRecordingSource(vTrack, publishedAudioRef.current)
          }
          try {
            vTrack.attach(localVideoRef.current!)
          } catch {}
        }
      }

      if (nextMode === "screen") {
        if (publishedVideoRef.current) {
          const camTrack = publishedVideoRef.current
          try {
            await room.localParticipant.unpublishTrack(camTrack)
          } catch {}

          if (!publishedScreenRef.current) {
            const sTrack = await publishScreenTrack(room)
            if (activeRecordingVideoTrackRef.current === camTrack.mediaStreamTrack && publishedAudioRef.current) {
              await switchRecordingSource(sTrack, publishedAudioRef.current)
            }
            try {
              sTrack.attach(screenVideoRef.current!)
            } catch {}
          } else if (activeRecordingVideoTrackRef.current === camTrack.mediaStreamTrack && publishedAudioRef.current) {
            await switchRecordingSource(publishedScreenRef.current, publishedAudioRef.current)
          }

          try {
            camTrack.stop()
          } catch {}
          publishedVideoRef.current = null
        } else if (!publishedScreenRef.current) {
          const sTrack = await publishScreenTrack(room)
          if (publishedAudioRef.current) {
            await switchRecordingSource(sTrack, publishedAudioRef.current)
          }
          try {
            sTrack.attach(screenVideoRef.current!)
          } catch {}
        }
      }

      if (nextMode === "both") {
        if (!publishedVideoRef.current) {
          const vTrack = await publishCameraTrack(room, selectedCamera)
          // Recording keeps following the camera as the primary recorded
          // feed (MediaRecorder can only record one video track at a time —
          // compositing camera+screen into one recorded track would need a
          // canvas mixer, which is out of scope of this fix).
          if (publishedAudioRef.current) {
            await switchRecordingSource(vTrack, publishedAudioRef.current)
          }
          try {
            vTrack.attach(localVideoRef.current!)
          } catch {}
        }

        if (!publishedScreenRef.current) {
          const sTrack = await publishScreenTrack(room)
          try {
            sTrack.attach(screenVideoRef.current!)
          } catch {}
        }
      }

      setSourceMode(nextMode)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setPublishing(false)
    }
  }

  const handleConnectAndPublish = async () => {
    if (!wsUrl || !token) return
    setError(null)
    setConnecting(true)
    try {
      const r = new Room({ adaptiveStream: true, dynacast: true })
      await r.connect(wsUrl, token)
      setRoom(r)
      setConnected(true)

      setPublishing(true)
      const aTrack = await createLocalAudioTrack()
      await r.localParticipant.publishTrack(aTrack)
      publishedAudioRef.current = aTrack

      let primaryVideoTrack: any = null

      if (sourceMode === "camera" || sourceMode === "both") {
        primaryVideoTrack = await publishCameraTrack(r, selectedCamera)
      }

      if (sourceMode === "screen" || sourceMode === "both") {
        const screenTrack = await publishScreenTrack(r)
        if (sourceMode === "screen") {
          if (primaryVideoTrack) {
            try {
              await r.localParticipant.unpublishTrack(primaryVideoTrack)
              primaryVideoTrack.stop()
            } catch {}
          }
          primaryVideoTrack = screenTrack
        }
      }

      const readyVideoTrack = primaryVideoTrack ?? publishedVideoRef.current ?? publishedScreenRef.current

      setPublishing(false)

      // Start recording immediately once tracks are published, instead of
      // gating it behind the "mark event live" API call. If that call is
      // slow or fails, the recording should still be running.
      recordingSegmentsRef.current = []
      await startMediaRecorder(readyVideoTrack, aTrack)

      try {
        const statusResponse = await fetch(`/api/creator/events/${eventId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "live" }),
        })

        if (!statusResponse.ok) {
          const data = await statusResponse.json().catch(() => null)
          throw new Error(data?.message || "Failed to update event status to live")
        }
      } catch (err) {
        // Recording is already running; don't tear down the stream over a
        // status-flag failure, but do let the user know.
        console.error("Failed to mark event live:", err)
        setError(err instanceof Error ? err.message : String(err))
      }
    } catch (err) {
      console.error("Connection error:", err)
      setError(err instanceof Error ? err.message : String(err))
      setConnecting(false)
      setPublishing(false)
    } finally {
      setConnecting(false)
    }
  }

  const handlePauseToggle = async () => {
    if (!room || !connected || publishing) return

    if (paused) {
      try {
        const toRepublish = unpublishedDuringPauseRef.current.splice(0)
        for (const t of toRepublish) {
          try {
            await room.localParticipant.publishTrack(t)
          } catch (err) {
            console.warn('Failed to republish track after pause', err)
          }
        }

        const response = await fetch(`/api/creator/events/${eventId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "live" }),
        })

        if (!response.ok) {
          const data = await response.json().catch(() => null)
          throw new Error(data?.message || "Failed to resume event")
        }

        setPaused(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      }
      return
    }

    try {
      const v: any = publishedVideoRef.current
      const s: any = publishedScreenRef.current
      const a: any = publishedAudioRef.current
      unpublishedDuringPauseRef.current = []
      // Note: we deliberately only unpublish from the LiveKit room here and
      // never call .stop() on these tracks — the MediaRecorder is still
      // reading from them, so recording continues uninterrupted while paused.
      if (v) {
        try {
          await room.localParticipant.unpublishTrack(v, false)
          unpublishedDuringPauseRef.current.push(v)
        } catch {}
      }
      if (s) {
        try {
          await room.localParticipant.unpublishTrack(s, false)
          unpublishedDuringPauseRef.current.push(s)
        } catch {}
      }
      if (a) {
        try {
          await room.localParticipant.unpublishTrack(a, false)
          unpublishedDuringPauseRef.current.push(a)
        } catch {}
      }

      const response = await fetch(`/api/creator/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "paused" }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.message || "Failed to pause event")
      }

      setPaused(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const handleToggleAudio = () => {
    const a: any = publishedAudioRef.current
    if (!a) return
    try {
      a.mediaStreamTrack.enabled = !a.mediaStreamTrack.enabled
      setAudioEnabled(a.mediaStreamTrack.enabled)
    } catch (err) {
      setAudioEnabled((v) => !v)
    }
  }

  const handleToggleVideo = () => {
    const v: any = publishedVideoRef.current
    if (!v) return
    try {
      v.mediaStreamTrack.enabled = !v.mediaStreamTrack.enabled
      setVideoEnabled(v.mediaStreamTrack.enabled)
    } catch (err) {
      setVideoEnabled((v) => !v)
    }
  }

  const handleSwitchCamera = async (deviceId: string) => {
    setSelectedCamera(deviceId)
    if (!room || !connected || paused) return

    setPublishing(true)
    try {
      const newTrack = await createLocalVideoTrack({ deviceId })
      const oldTrack: any = publishedVideoRef.current

      try {
        await room.localParticipant.publishTrack(newTrack)
      } catch (err) {
        console.warn("Failed to publish new camera track", err)
      }

      // FIX: hand the recorder off to the new camera track via
      // switchRecordingSource BEFORE the old track is unpublished/stopped,
      // using a fresh MediaRecorder segment instead of mutating the live
      // recording stream (that mutation is what broke recording before).
      const wasRecordingOldTrack = !oldTrack || activeRecordingVideoTrackRef.current === oldTrack.mediaStreamTrack
      if (wasRecordingOldTrack && publishedAudioRef.current) {
        await switchRecordingSource(newTrack, publishedAudioRef.current)
      }

      if (oldTrack) {
        try {
          await room.localParticipant.unpublishTrack(oldTrack)
        } catch (err) {
          console.warn("Failed to unpublish old camera track", err)
        }
        try {
          oldTrack.stop()
        } catch {}
      }

      try {
        newTrack.attach(localVideoRef.current!)
      } catch {}

      publishedVideoRef.current = newTrack
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setPublishing(false)
    }
  }

  // FIX: releases camera/mic/screen devices and disconnects from the room
  // immediately when the user hits "End live" — instead of leaving devices
  // active through the entire save dialog / upload flow. This is what
  // "revoke mic + video permission on end" needed: unpublish, stop() every
  // track (this is what actually turns off the camera/mic indicator), then
  // disconnect the room.
  const releaseLocalMedia = async () => {
    if (!room) return
    const tracks = [
      publishedVideoRef.current,
      publishedScreenRef.current,
      publishedAudioRef.current,
      ...unpublishedDuringPauseRef.current,
    ].filter(Boolean)

    for (const t of tracks) {
      try {
        await room.localParticipant.unpublishTrack(t)
      } catch {}
      try {
        t.stop()
      } catch {}
    }
    unpublishedDuringPauseRef.current = []

    try {
      await room.disconnect()
    } catch {}

    setRoom(null)
    setConnected(false)
    publishedVideoRef.current = null
    publishedScreenRef.current = null
    publishedAudioRef.current = null
    recordingStreamRef.current = null
    activeRecordingVideoTrackRef.current = null
    activeRecordingAudioTrackRef.current = null
  }

  const handleStop = async () => {
    if (!connected || awaitingStopDecision || isProcessingSave) return

    try {
      console.log("Stopping live stream...")

      // 1) Stop the final recorder segment and fold it in with any earlier
      //    segments collected from camera/source switches.
      const lastSegment = await stopCurrentRecorderSegment()
      if (lastSegment) {
        recordingSegmentsRef.current.push(lastSegment)
      }
      setIsRecording(false)

      const allSegments = recordingSegmentsRef.current
      recordingSegmentsRef.current = []

      if (allSegments.length > 0) {
        const options = getSupportedRecorderOptions()
        const combined = new Blob(allSegments, { type: options?.mimeType || "video/webm" })
        if (combined.size > 0) {
          recordingBlobRef.current = combined
          setHasRecordingData(true)
          hasRecordingDataRef.current = true
          console.log(`✅ Combined ${allSegments.length} segment(s) into final recording: ${combined.size} bytes`)
        }
      }

      if (!hasRecordingDataRef.current) {
        console.warn("No recording data available")
        setError("No recording data was captured. Please try again.")
      }

      // 2) FIX: turn off camera/mic/screen and leave the room right away —
      //    don't wait for the user's save/discard choice or for the
      //    upload to finish. This is the "revoke permissions on end"
      //    behavior.
      await releaseLocalMedia()

      // 3) Now show the save dialog.
      setAwaitingStopDecision(true)
      setShowSaveDialog(true)
      console.log("Save dialog opened")
    } catch (err) {
      console.error("Error stopping:", err)
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  // Kept as a safe no-op-if-already-gone cleanup, since releaseLocalMedia
  // now runs earlier (in handleStop) and already nulls out `room`.
  const cleanupRoom = async () => {
    if (room) {
      try {
        const v: any = publishedVideoRef.current
        const s: any = publishedScreenRef.current
        const a: any = publishedAudioRef.current
        if (v) {
          try {
            await room.localParticipant.unpublishTrack(v)
          } catch {}
          try {
            v.stop()
          } catch {}
        }
        if (s) {
          try {
            await room.localParticipant.unpublishTrack(s)
          } catch {}
          try {
            s.stop()
          } catch {}
        }
        if (a) {
          try {
            await room.localParticipant.unpublishTrack(a)
          } catch {}
          try {
            a.stop()
          } catch {}
        }
      } catch {}
      try {
        await room.disconnect()
      } catch {}
    }

    setRoom(null)
    setConnected(false)
    setPublishing(false)
    publishedVideoRef.current = null
    publishedScreenRef.current = null
    publishedAudioRef.current = null
    recordingStreamRef.current = null
    activeRecordingVideoTrackRef.current = null
    activeRecordingAudioTrackRef.current = null
    setIsRecording(false)
  }

  const finalizeSave = async () => {
    try {
      let blobToSave = recordingBlobRef.current

      if (!blobToSave || blobToSave.size === 0) {
        if (recordingChunksRef.current.length > 0) {
          console.log(`Creating blob from ${recordingChunksRef.current.length} chunks...`)
          const options = getSupportedRecorderOptions()
          blobToSave = new Blob(recordingChunksRef.current, { type: options?.mimeType || "video/webm" })
          recordingChunksRef.current = []
          recordingBlobRef.current = blobToSave
          setHasRecordingData(true)
          hasRecordingDataRef.current = true
        }
      }

      if (!blobToSave || blobToSave.size === 0) {
        console.log("Waiting for recording blob...")
        await new Promise(resolve => setTimeout(resolve, 1000))
        blobToSave = recordingBlobRef.current

        if ((!blobToSave || blobToSave.size === 0) && recordingChunksRef.current.length > 0) {
          console.log(`Creating blob from ${recordingChunksRef.current.length} chunks after wait...`)
          const options = getSupportedRecorderOptions()
          blobToSave = new Blob(recordingChunksRef.current, { type: options?.mimeType || "video/webm" })
          recordingChunksRef.current = []
          recordingBlobRef.current = blobToSave
          setHasRecordingData(true)
          hasRecordingDataRef.current = true
        }
      }

      if (!blobToSave || blobToSave.size === 0) {
        throw new Error("No recording data available. Please try again or check if recording was properly started.")
      }

      console.log(`Recording blob size: ${blobToSave.size} bytes`)

      setSavingStatus("uploading")
      setUploadProgress(0)
      setSavingError(null)
      setUploading(true)
      setIsProcessingSave(true)

      // Use appropriate file extension based on browser
      const fileExtension = isIOS ? 'mp4' : 'webm'
      const mimeType = isIOS ? 'video/mp4' : 'video/webm'

      const file = new File([blobToSave], `creator-event-${eventId}-${Date.now()}.${fileExtension}`, {
        type: mimeType,
      })

      console.log("📤 Starting upload...")
      const result = await uploadCreatorVideo(file, (pct) => {
        const progress = Math.round(pct)
        setUploadProgress(progress)
        console.log(`📊 Upload progress: ${progress}%`)
      })

      // NOTE: double-check this against what uploadCreatorVideo actually
      // returns (log `result` once) — if the field names don't match, this
      // throws "Upload completed without a valid video URL" even though the
      // upload itself succeeded.
      const uploadedUrl = result.videoUrl ?? result.fileUrl ?? result.ufsUrl
      const uploadedFileId = result.key ?? result.fileUrl ?? result.ufsUrl

      if (!uploadedUrl) {
        throw new Error("Upload completed without a valid video URL")
      }

      console.log("✅ Upload completed:", uploadedUrl)
      setRecordingUrl(uploadedUrl)
      setUploadProgress(100)

      setSavingStatus("saving")
      console.log("💾 Saving to database...")

      // NOTE: by the time we get here the event has already been marked
      // ENDED (see handleSaveRecordingChoice, which calls endLiveEvent()
      // first). The API's isRecordingOnlyUpdate allow-list must include
      // every field sent below or this PUT will 409 with "Live or ended
      // events cannot be edited" even though nothing here is a real edit.
      const response = await fetch(`/api/creator/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recordedVideoUrl: uploadedUrl,
          recordedVideoFileId: uploadedFileId,
          recordingStatus: "ready",
          hasRecordedVideo: true,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.message || "Failed to save recorded video to the event")
      }

      console.log("✅ Database save completed")
      recordingBlobRef.current = null
      recordingChunksRef.current = []
      setHasRecordingData(false)
      hasRecordingDataRef.current = false
      setSavingStatus("completed")
      setUploading(false)
      setIsProcessingSave(false)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error("❌ Save error:", message)
      setSavingError(message)
      setSavingStatus("error")
      setUploading(false)
      setIsProcessingSave(false)
      throw err
    }
  }

  const finalizeDiscard = async () => {
    recordingBlobRef.current = null
    recordingChunksRef.current = []
    setHasRecordingData(false)
    hasRecordingDataRef.current = false
    setRecordingUrl(null)
  }

  // FIX: reordered so the event is always marked ENDED *before* we touch
  // the recording (save or discard). This guarantees the upload/save PUT
  // never races a still-"live" event, and releasing devices already
  // happened back in handleStop so this function no longer needs to do it.
  const handleSaveRecordingChoice = async (saveRecording: boolean) => {
    try {
      await endLiveEvent()

      if (saveRecording) {
        await finalizeSave()
      } else {
        await finalizeDiscard()
      }

      setShowSaveDialog(false)
      setAwaitingStopDecision(false)
      await cleanupRoom() // safe no-op: devices/room were already released in handleStop
      router.push(`/tv`)
    } catch (err) {
      // finalizeSave already puts the dialog into its "error" state (so the
      // user sees "Save failed" and can retry), but surface it in the
      // top-level error banner too in case the failure happened outside
      // finalizeSave (e.g. endLiveEvent / cleanupRoom after a successful save).
      console.error("Error in save decision:", err)
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const handleRetrySave = async () => {
    setSavingError(null)
    setSavingStatus("pending")
    await handleSaveRecordingChoice(true)
  }

  return (
    <div className="relative min-h-[100dvh] bg-black text-white">
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className={`absolute inset-0 h-full w-full object-cover ${sourceMode === "screen" ? "hidden" : ""}`}
        />
        <video
          ref={screenVideoRef}
          autoPlay
          muted
          playsInline
          className={`absolute inset-0 h-full w-full object-cover ${sourceMode === "camera" ? "hidden" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 p-4">
          <div className="flex flex-col gap-2 max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold">Creator Live — {eventId}</h1>
                {isIOS && <p className="text-sm text-yellow-300">📱 iOS Mode</p>}
                {sourceMode === "screen" || sourceMode === "both" ? (
                  <p className="text-sm text-amber-200">Screen recording mode</p>
                ) : null}
                {isRecording && (
                  <div className="flex items-center gap-2 text-sm text-red-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <div className=" flex items-center gap-2">🔴 <span className="hidden lg:block">Recording live...</span></div>
                  </div>
                )}
                {uploading && uploadProgress !== null && uploadProgress < 100 && (
                  <div className="flex items-center gap-2 text-sm text-blue-300">
                    <span className="animate-spin">⏳</span>
                    Uploading: {uploadProgress}%
                  </div>
                )}
                {uploading && uploadProgress === 100 && (
                  <p className="text-sm text-emerald-300">✅ Processing upload...</p>
                )}
                {recordingUrl && (
                  <p className="text-sm text-emerald-300">✅ Recording saved</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {error ? (
                  <span className="rounded-full bg-red-500/20 px-3 py-2 text-sm text-red-200">
                    ❌ {error}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSourceModeChange("camera")}
                disabled={connecting || publishing || isProcessingSave}
                className={`rounded-full border px-3 py-2 text-sm transition ${
                  sourceMode === "camera" ? "border-white bg-white/10 text-white" : "border-white/30 text-slate-200"
                } ${(connecting || publishing || isProcessingSave) ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                Camera only
              </button>
              <button
                type="button"
                onClick={() => handleSourceModeChange("screen")}
                disabled={connecting || publishing || isProcessingSave}
                className={`rounded-full border px-3 py-2 text-sm transition ${
                  sourceMode === "screen" ? "border-white bg-white/10 text-white" : "border-white/30 text-slate-200"
                } ${(connecting || publishing || isProcessingSave) ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                Screen share only
              </button>
              <button
                type="button"
                onClick={() => handleSourceModeChange("both")}
                disabled={connecting || publishing || isProcessingSave}
                className={`rounded-full border px-3 py-2 text-sm transition ${
                  sourceMode === "both" ? "border-white bg-white/10 text-white" : "border-white/30 text-slate-200"
                } ${(connecting || publishing || isProcessingSave) ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                Camera + screen share
              </button>
            </div>
            {cameras.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {cameras.map((camera) => (
                  <button
                    type="button"
                    key={camera.deviceId}
                    onClick={() => handleSwitchCamera(camera.deviceId)}
                    disabled={paused || isProcessingSave}
                    className={`rounded-full border px-3 py-2 text-sm transition ${
                      selectedCamera === camera.deviceId
                        ? "border-white bg-white/10 text-white"
                        : "border-white/30 text-slate-200"
                    } ${(paused || isProcessingSave) ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    {camera.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap justify-end gap-2 rounded-3xl bg-black/60 p-3 backdrop-blur-md">
            {!connected ? (
              <Button onClick={handleConnectAndPublish} disabled={!token || connecting || publishing}>
                {connecting ? "Connecting..." : "Start live"}
              </Button>
            ) : (
              <>
                <Button onClick={handleToggleAudio} disabled={publishing || isProcessingSave}>
                  {audioEnabled ? "Mute" : "Unmute"}
                </Button>
                <Button onClick={handleToggleVideo} disabled={publishing || isProcessingSave}>
                  {videoEnabled ? "Stop video" : "Start video"}
                </Button>
                {/* <Button onClick={handlePauseToggle} disabled={publishing || isProcessingSave}>
                  {paused ? "Resume" : "Pause"}
                </Button> */}
                <Button variant="destructive" onClick={handleStop} disabled={publishing || awaitingStopDecision || isProcessingSave}>
                  {isProcessingSave ? "Processing..." : "End live"}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={showSaveDialog}
        onOpenChange={(open) => {
          if (!open && savingStatus !== "pending" && savingStatus !== "error") {
            return
          }
          if (!open && savingStatus === "pending") {
            setShowSaveDialog(false)
            setAwaitingStopDecision(false)
          }
        }}
      >
        <DialogContent
          className="max-w-sm"
          onPointerDownOutside={(e) => {
            if (savingStatus !== "pending" && savingStatus !== "error") {
              e.preventDefault()
            }
          }}
          onEscapeKeyDown={(e) => {
            if (savingStatus !== "pending" && savingStatus !== "error") {
              e.preventDefault()
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {savingStatus === "completed" ? "✅ Recording saved!" :
               savingStatus === "error" ? "❌ Save failed" :
               "Save live recording?"}
            </DialogTitle>
            <DialogDescription>
              {savingStatus === "uploading" && "📤 Uploading video... Please don't close this window."}
              {savingStatus === "saving" && "💾 Saving to database..."}
              {savingStatus === "completed" && "Your recording has been successfully saved."}
              {savingStatus === "error" && (savingError || "There was an error saving your recording. Please try again.")}
              {savingStatus === "pending" && "Do you want to save this live recording?"}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {savingStatus === "uploading" && (
              <div className="space-y-3">
                <div className="text-sm font-medium text-foreground">
                  Uploading: {uploadProgress ?? 0}%
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${uploadProgress ?? 0}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  ⚠️ Please keep this window open until upload completes
                </p>
              </div>
            )}

            {savingStatus === "saving" && (
              <div className="space-y-3">
                <div className="text-sm font-medium text-foreground">
                   Finalizing...
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-green-500 animate-pulse" style={{ width: "100%" }} />
                </div>
                <p className="text-xs text-muted-foreground">
                  ⏳ Saving... please wait
                </p>
              </div>
            )}

            {savingStatus === "completed" && (
              <div className="space-y-2 text-center">
                <div className="text-4xl">✅</div>
                <p className="text-sm text-muted-foreground">
                  Your live recording has been successfully saved!
                </p>
              </div>
            )}

            {savingStatus === "error" && (
              <div className="space-y-3">
                <div className="rounded-md bg-red-500/10 border border-red-500/30 p-3">
                  <p className="text-sm text-red-500">
                    <strong>Error:</strong> {savingError || "Failed to save recording"}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Tip: Make sure you have a stable internet connection and try again.
                </p>
              </div>
            )}

            {savingStatus === "pending" && (
              <p className="text-sm text-muted-foreground">
                Choose whether to upload the recording before ending the event.
              </p>
            )}
          </div>

          <DialogFooter className="flex gap-2">
            {savingStatus === "pending" && (
              <>
                <Button variant="outline" onClick={() => handleSaveRecordingChoice(false)}>
                  Don't save
                </Button>
                <Button onClick={() => handleSaveRecordingChoice(true)}>
                  Save recording
                </Button>
              </>
            )}
            {savingStatus === "completed" && (
              <Button onClick={() => {
                setShowSaveDialog(false)
                setAwaitingStopDecision(false)
                router.push(`/tv`)
              }}>
                Done
              </Button>
            )}
            {savingStatus === "error" && (
              <>
                <Button variant="outline" onClick={() => {
                  setShowSaveDialog(false)
                  setAwaitingStopDecision(false)
                  router.push(`/tv`)
                }}>
                  Discard & Exit
                </Button>
                <Button onClick={handleRetrySave}>
                  Retry Save
                </Button>
              </>
            )}
            {(savingStatus === "uploading" || savingStatus === "saving") && (
              <div className="text-xs text-muted-foreground">
                ⏳ Processing... do not close
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}













// "use client"

// import { useEffect, useRef, useState } from "react"
// import { useParams, useRouter } from "next/navigation"
// import {
//   createLocalAudioTrack,
//   createLocalScreenTracks,
//   createLocalVideoTrack,
//   Room,
//   type VideoCaptureOptions,
// } from "livekit-client"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { uploadCreatorVideo } from "@/lib/uploadthing/client"

// export default function CreatorLivePage() {
//   const params = useParams() as { id?: string }
//   const router = useRouter()
//   const eventId = params.id ?? ""

//   const [wsUrl, setWsUrl] = useState<string | null>(null)
//   const [token, setToken] = useState<string | null>(null)
//   const [room, setRoom] = useState<Room | null>(null)
//   const localVideoRef = useRef<HTMLVideoElement | null>(null)
//   const screenVideoRef = useRef<HTMLVideoElement | null>(null)
//   const publishedVideoRef = useRef<any>(null)
//   const publishedScreenRef = useRef<any>(null)
//   const publishedAudioRef = useRef<any>(null)
//   const unpublishedDuringPauseRef = useRef<any[]>([])
//   const recorderRef = useRef<MediaRecorder | null>(null)
//   const recordingChunksRef = useRef<Blob[]>([])
//   const recordingBlobRef = useRef<Blob | null>(null)

//   // FIX: a persistent stream the recorder is built from, decoupled from
//   // whatever's currently published to LiveKit. We add/remove tracks from
//   // THIS stream when switching camera/source instead of ever letting the
//   // recorder's underlying tracks get stopped out from under it.
//   const recordingStreamRef = useRef<MediaStream | null>(null)
//   const activeRecordingVideoTrackRef = useRef<MediaStreamTrack | null>(null)
//   const activeRecordingAudioTrackRef = useRef<MediaStreamTrack | null>(null)
//   // FIX: ref-backed flag so handleStop doesn't read a stale React state value.
//   const hasRecordingDataRef = useRef(false)

//   const [connecting, setConnecting] = useState(false)
//   const [connected, setConnected] = useState(false)
//   const [publishing, setPublishing] = useState(false)
//   const [audioEnabled, setAudioEnabled] = useState(true)
//   const [videoEnabled, setVideoEnabled] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [cameras, setCameras] = useState<Array<{ deviceId: string; label: string }>>([])
//   const [selectedCamera, setSelectedCamera] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [uploading, setUploading] = useState(false)
//   const [uploadProgress, setUploadProgress] = useState<number | null>(null)
//   const [recordingUrl, setRecordingUrl] = useState<string | null>(null)
//   const [sourceMode, setSourceMode] = useState<"camera" | "screen" | "both">("camera")
//   const [showSaveDialog, setShowSaveDialog] = useState(false)
//   const [awaitingStopDecision, setAwaitingStopDecision] = useState(false)
//   const [paused, setPaused] = useState(false)
//   const [savingStatus, setSavingStatus] = useState<"pending" | "uploading" | "saving" | "completed" | "error">("pending")
//   const [savingError, setSavingError] = useState<string | null>(null)
//   const [isProcessingSave, setIsProcessingSave] = useState(false)
//   const [hasRecordingData, setHasRecordingData] = useState(false)
//   const [isIOS, setIsIOS] = useState(false)
//   const [isSafari, setIsSafari] = useState(false)

//   // Detect browser
//   useEffect(() => {
//     const userAgent = window.navigator.userAgent.toLowerCase()
//     setIsIOS(/iphone|ipad|ipod/.test(userAgent))
//     setIsSafari(/safari/.test(userAgent) && !/chrome/.test(userAgent))
//   }, [])

//   useEffect(() => {
//     if (!eventId) return

//     let cancelled = false
//     ;(async () => {
//       try {
//         const res = await fetch(`/api/creator/events/${eventId}/livekit-token`)
//         const data = await res.json()
//         if (!res.ok) throw new Error(data.message || "Failed to get token")
//         if (cancelled) return
//         setWsUrl(data.wsUrl ?? null)
//         setToken(data.token ?? null)

//         if (data.wsUrl && data.token) {
//           void handleConnectAndPublish()
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : String(err))
//       }
//     })()

//     return () => {
//       cancelled = true
//     }
//   }, [eventId])

//   useEffect(() => {
//     let cancelled = false
//     const loadDevices = async () => {
//       try {
//         const list = await navigator.mediaDevices.enumerateDevices()
//         let cams = list
//           .filter((d) => d.kind === "videoinput")
//           .map((d) => ({ deviceId: d.deviceId, label: d.label || "Camera" }))

//         if (cams.every((c) => !c.label || c.label === "")) {
//           try {
//             const previewStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
//             previewStream.getTracks().forEach((t) => t.stop())
//             const list2 = await navigator.mediaDevices.enumerateDevices()
//             cams = list2
//               .filter((d) => d.kind === "videoinput")
//               .map((d) => ({ deviceId: d.deviceId, label: d.label || "Camera" }))
//           } catch (err) {
//             // ignore permission errors
//           }
//         }

//         if (cancelled) return
//         setCameras(cams)
//         if (!selectedCamera && cams.length > 0) {
//           setSelectedCamera(cams[0].deviceId)
//         }
//       } catch (err) {
//         console.error("Failed to load cameras", err)
//       }
//     }

//     void loadDevices()
//     return () => {
//       cancelled = true
//     }
//   }, [])

//   useEffect(() => {
//     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//       if (uploading || savingStatus !== "pending" || isProcessingSave) {
//         event.preventDefault()
//         event.returnValue = "You have an upload in progress. Are you sure you want to leave?"
//         return "You have an upload in progress. Are you sure you want to leave?"
//       }
//     }

//     if (uploading || savingStatus !== "pending" || isProcessingSave) {
//       window.addEventListener("beforeunload", handleBeforeUnload)
//     }

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload)
//     }
//   }, [uploading, savingStatus, isProcessingSave])

//   const getSupportedRecorderOptions = () => {
//     if (typeof MediaRecorder === "undefined") return undefined

//     // iOS Safari specific - only supports certain formats
//     const candidates = isIOS ? [
//       "video/mp4",
//       "video/quicktime",
//       "video/webm",
//     ] : [
//       "video/webm;codecs=vp8,opus",
//       "video/webm;codecs=vp9,opus",
//       "video/webm",
//       "video/mp4;codecs=avc1",
//       "video/mp4",
//     ]

//     for (const mimeType of candidates) {
//       try {
//         if (MediaRecorder.isTypeSupported(mimeType)) {
//           return { mimeType }
//         }
//       } catch {
//         // ignore invalid mimeType checks
//       }
//     }
//     return undefined
//   }

//   // FIX: swap a track in the *recording* stream without ever stopping a
//   // track that's still in use. Callers are responsible for stopping the
//   // old track only AFTER calling this (so the recorder never sees a dead
//   // track it's still trying to read from).
//   const setRecordingVideoTrack = (newTrack: MediaStreamTrack | null) => {
//     const stream = recordingStreamRef.current
//     if (!stream) {
//       activeRecordingVideoTrackRef.current = newTrack
//       return
//     }
//     const old = activeRecordingVideoTrackRef.current
//     if (old) {
//       try {
//         stream.removeTrack(old)
//       } catch {}
//     }
//     if (newTrack) {
//       try {
//         stream.addTrack(newTrack)
//       } catch {}
//     }
//     activeRecordingVideoTrackRef.current = newTrack
//   }

//   const startMediaRecorder = async (videoTrack: any, audioTrack: any) => {
//     try {
//       if (!videoTrack?.mediaStreamTrack || !audioTrack?.mediaStreamTrack) {
//         console.error("Missing video or audio track for recording")
//         // FIX: surface this instead of failing silently
//         setError("Couldn't start recording — camera/microphone wasn't ready. Try restarting the stream.")
//         return
//       }

//       if (typeof window === "undefined" || typeof MediaRecorder === "undefined") {
//         setError("Recording is not supported in this browser")
//         return
//       }

//       const options = getSupportedRecorderOptions()
//       if (!options) {
//         setError(
//           "Recording is not supported by this browser. Please use a modern browser like Chrome, Edge, or Safari 16+."
//         )
//         return
//       }

//       // FIX: this stream is now the single source of truth for the
//       // recorder. It's kept alive in recordingStreamRef and mutated via
//       // setRecordingVideoTrack when the video source changes, instead of
//       // being rebuilt (or silently orphaned) elsewhere.
//       const stream = new MediaStream()
//       stream.addTrack(videoTrack.mediaStreamTrack)
//       stream.addTrack(audioTrack.mediaStreamTrack)
//       recordingStreamRef.current = stream
//       activeRecordingVideoTrackRef.current = videoTrack.mediaStreamTrack
//       activeRecordingAudioTrackRef.current = audioTrack.mediaStreamTrack

//       const recorder = new MediaRecorder(stream, options)
//       recorderRef.current = recorder
//       recordingChunksRef.current = []
//       hasRecordingDataRef.current = false

//       recorder.ondataavailable = (event) => {
//         if (event.data && event.data.size > 0) {
//           recordingChunksRef.current.push(event.data)
//           hasRecordingDataRef.current = true
//           console.log(`📦 Received chunk: ${event.data.size} bytes`)
//         }
//       }

//       // FIX: previously missing entirely — recorder errors vanished with
//       // no trace. Now they show up in the UI.
//       recorder.onerror = (event: any) => {
//         console.error("❌ MediaRecorder error:", event?.error || event)
//         setError(
//           `Recording error: ${event?.error?.message || "the recorder stopped unexpectedly"}. Try restarting the stream.`
//         )
//       }

//       recorder.onstop = () => {
//         console.log("🛑 Recorder stopped, processing chunks...")
//         console.log(`📊 Total chunks: ${recordingChunksRef.current.length}`)

//         setIsRecording(false)

//         if (recordingChunksRef.current.length === 0) {
//           console.error("❌ No recording chunks available")
//           setError("No recording data was captured")
//           return
//         }

//         try {
//           const totalSize = recordingChunksRef.current.reduce((acc, chunk) => acc + chunk.size, 0)
//           console.log(`📊 Total recording size: ${totalSize} bytes`)

//           const blob = new Blob(recordingChunksRef.current, { type: options.mimeType || "video/webm" })
//           recordingChunksRef.current = []

//           if (blob.size > 0) {
//             recordingBlobRef.current = blob
//             setHasRecordingData(true)
//             hasRecordingDataRef.current = true
//             console.log(`✅ Recording blob created: ${blob.size} bytes`)
//           } else {
//             console.error("❌ Recording blob is empty")
//             setError("Recording was empty")
//           }
//         } catch (err) {
//           console.error("❌ Error creating recording blob:", err)
//           setError(err instanceof Error ? err.message : String(err))
//         }
//       }

//       // iOS Safari needs timeslice for proper recording
//       const timeslice = isIOS ? 500 : 1000
//       recorder.start(timeslice)
//       setIsRecording(true)
//       setHasRecordingData(false)
//       console.log(`🎥 Recording started with MIME type: ${options.mimeType} (${isIOS ? 'iOS' : 'standard'} mode)`)
//     } catch (err) {
//       console.error("Error starting recorder:", err)
//       setError(err instanceof Error ? err.message : String(err))
//     }
//   }

//   const stopMediaRecorder = () => {
//     return new Promise<void>((resolve) => {
//       const recorder = recorderRef.current

//       if (!recorder || recorder.state === "inactive") {
//         console.log("Recorder already inactive")

//         if (recordingChunksRef.current.length > 0) {
//           console.log(`📊 Found ${recordingChunksRef.current.length} existing chunks, creating blob...`)
//           try {
//             const options = getSupportedRecorderOptions()
//             const blob = new Blob(recordingChunksRef.current, { type: options?.mimeType || "video/webm" })
//             recordingChunksRef.current = []

//             if (blob.size > 0) {
//               recordingBlobRef.current = blob
//               setHasRecordingData(true)
//               hasRecordingDataRef.current = true
//               console.log(`✅ Created blob from existing chunks: ${blob.size} bytes`)
//             }
//           } catch (err) {
//             console.error("Error creating blob from existing chunks:", err)
//           }
//         }
//         resolve()
//         return
//       }

//       console.log("Stopping recorder...")

//       if (recorder.state === "recording") {
//         // For iOS Safari, we need to handle the stop event differently
//         const originalOnStop = recorder.onstop
//         recorder.onstop = (event) => {
//           console.log("Recorder onstop event fired")
//           if (originalOnStop) {
//             // @ts-ignore
//             originalOnStop.call(recorder, event)
//           }
//           resolve()
//         }
//         recorder.stop()

//         // iOS Safari workaround: sometimes onstop doesn't fire
//         if (isIOS) {
//           setTimeout(() => {
//             if (recorder.state === "inactive") {
//               console.log("iOS Safari: Force resolving stop")
//               resolve()
//             }
//           }, 2000)
//         }
//       } else {
//         resolve()
//       }
//     })
//   }

//   const endLiveEvent = async () => {
//     if (!eventId) return
//     try {
//       await fetch(`/api/creator/events/${eventId}/end-live`, {
//         method: "POST",
//       })
//     } catch (err) {
//       console.warn("Failed to mark event ended", err)
//     }
//   }

//   const publishCameraTrack = async (room: Room, selectedCameraId: string | null) => {
//     const videoConstraints: VideoCaptureOptions = selectedCameraId ? { deviceId: selectedCameraId } : {}
//     const vTrack = await createLocalVideoTrack(videoConstraints)

//     try {
//       vTrack.attach(localVideoRef.current!)
//     } catch {}

//     await room.localParticipant.publishTrack(vTrack)
//     publishedVideoRef.current = vTrack
//     return vTrack
//   }

//   const publishScreenTrack = async (room: Room) => {
//     if (typeof navigator === "undefined") {
//       throw new Error("Screen capture is not available in this environment")
//     }

//     if (!navigator.mediaDevices?.getDisplayMedia) {
//       throw new Error(
//         "Screen sharing is not supported by this browser. Use a desktop browser or a supported mobile browser with screen sharing support."
//       )
//     }

//     const [screenVideoTrack] = await createLocalScreenTracks({
//       video: true,
//       audio: false,
//     })

//     const screenTrack = screenVideoTrack as any
//     try {
//       if (screenVideoRef.current) {
//         screenTrack.attach(screenVideoRef.current)
//       }
//     } catch {}

//     await room.localParticipant.publishTrack(screenTrack)
//     publishedScreenRef.current = screenTrack
//     return screenTrack
//   }

//   const handleSourceModeChange = async (nextMode: "camera" | "screen" | "both") => {
//     if (nextMode === sourceMode) return

//     if (!room || !connected) {
//       setSourceMode(nextMode)
//       return
//     }

//     if (publishing) return

//     setPublishing(true)
//     try {
//       if (nextMode === "camera") {
//         if (publishedScreenRef.current) {
//           const screenTrack = publishedScreenRef.current
//           try {
//             await room.localParticipant.unpublishTrack(screenTrack)
//           } catch {}

//           // FIX: if the recorder was capturing the screen track, hand it
//           // back to the camera track BEFORE stopping the screen track.
//           if (!publishedVideoRef.current) {
//             const vTrack = await publishCameraTrack(room, selectedCamera)
//             setRecordingVideoTrack(vTrack.mediaStreamTrack)
//             try {
//               vTrack.attach(localVideoRef.current!)
//             } catch {}
//           } else if (activeRecordingVideoTrackRef.current === screenTrack.mediaStreamTrack) {
//             setRecordingVideoTrack(publishedVideoRef.current.mediaStreamTrack)
//           }

//           try {
//             screenTrack.stop()
//           } catch {}
//           publishedScreenRef.current = null
//         } else if (!publishedVideoRef.current) {
//           const vTrack = await publishCameraTrack(room, selectedCamera)
//           setRecordingVideoTrack(vTrack.mediaStreamTrack)
//           try {
//             vTrack.attach(localVideoRef.current!)
//           } catch {}
//         }
//       }

//       if (nextMode === "screen") {
//         if (publishedVideoRef.current) {
//           const camTrack = publishedVideoRef.current
//           try {
//             await room.localParticipant.unpublishTrack(camTrack)
//           } catch {}

//           if (!publishedScreenRef.current) {
//             const sTrack = await publishScreenTrack(room)
//             setRecordingVideoTrack(sTrack.mediaStreamTrack)
//             try {
//               sTrack.attach(screenVideoRef.current!)
//             } catch {}
//           } else if (activeRecordingVideoTrackRef.current === camTrack.mediaStreamTrack) {
//             setRecordingVideoTrack(publishedScreenRef.current.mediaStreamTrack)
//           }

//           try {
//             camTrack.stop()
//           } catch {}
//           publishedVideoRef.current = null
//         } else if (!publishedScreenRef.current) {
//           const sTrack = await publishScreenTrack(room)
//           setRecordingVideoTrack(sTrack.mediaStreamTrack)
//           try {
//             sTrack.attach(screenVideoRef.current!)
//           } catch {}
//         }
//       }

//       if (nextMode === "both") {
//         if (!publishedVideoRef.current) {
//           const vTrack = await publishCameraTrack(room, selectedCamera)
//           // Recording keeps following the camera as the primary recorded
//           // feed (MediaRecorder can only record one video track at a time —
//           // compositing camera+screen into one recorded track would need a
//           // canvas mixer, which is out of scope of this fix).
//           setRecordingVideoTrack(vTrack.mediaStreamTrack)
//           try {
//             vTrack.attach(localVideoRef.current!)
//           } catch {}
//         }

//         if (!publishedScreenRef.current) {
//           const sTrack = await publishScreenTrack(room)
//           try {
//             sTrack.attach(screenVideoRef.current!)
//           } catch {}
//         }
//       }

//       setSourceMode(nextMode)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : String(err))
//     } finally {
//       setPublishing(false)
//     }
//   }

//   const handleConnectAndPublish = async () => {
//     if (!wsUrl || !token) return
//     setError(null)
//     setConnecting(true)
//     try {
//       const r = new Room({ adaptiveStream: true, dynacast: true })
//       await r.connect(wsUrl, token)
//       setRoom(r)
//       setConnected(true)

//       setPublishing(true)
//       const aTrack = await createLocalAudioTrack()
//       await r.localParticipant.publishTrack(aTrack)
//       publishedAudioRef.current = aTrack

//       let primaryVideoTrack: any = null

//       if (sourceMode === "camera" || sourceMode === "both") {
//         primaryVideoTrack = await publishCameraTrack(r, selectedCamera)
//       }

//       if (sourceMode === "screen" || sourceMode === "both") {
//         const screenTrack = await publishScreenTrack(r)
//         if (sourceMode === "screen") {
//           if (primaryVideoTrack) {
//             try {
//               await r.localParticipant.unpublishTrack(primaryVideoTrack)
//               primaryVideoTrack.stop()
//             } catch {}
//           }
//           primaryVideoTrack = screenTrack
//         }
//       }

//       const readyVideoTrack = primaryVideoTrack ?? publishedVideoRef.current ?? publishedScreenRef.current

//       setPublishing(false)

//       // FIX: start recording immediately once tracks are published, instead
//       // of gating it behind the "mark event live" API call. If that call is
//       // slow or fails, the recording should still be running.
//       await startMediaRecorder(readyVideoTrack, aTrack)

//       try {
//         const statusResponse = await fetch(`/api/creator/events/${eventId}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ status: "live" }),
//         })

//         if (!statusResponse.ok) {
//           const data = await statusResponse.json().catch(() => null)
//           throw new Error(data?.message || "Failed to update event status to live")
//         }
//       } catch (err) {
//         // Recording is already running; don't tear down the stream over a
//         // status-flag failure, but do let the user know.
//         console.error("Failed to mark event live:", err)
//         setError(err instanceof Error ? err.message : String(err))
//       }
//     } catch (err) {
//       console.error("Connection error:", err)
//       setError(err instanceof Error ? err.message : String(err))
//       setConnecting(false)
//       setPublishing(false)
//     } finally {
//       setConnecting(false)
//     }
//   }

//   const handlePauseToggle = async () => {
//     if (!room || !connected || publishing) return

//     if (paused) {
//       try {
//         const toRepublish = unpublishedDuringPauseRef.current.splice(0)
//         for (const t of toRepublish) {
//           try {
//             await room.localParticipant.publishTrack(t)
//           } catch (err) {
//             console.warn('Failed to republish track after pause', err)
//           }
//         }

//         const response = await fetch(`/api/creator/events/${eventId}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ status: "live" }),
//         })

//         if (!response.ok) {
//           const data = await response.json().catch(() => null)
//           throw new Error(data?.message || "Failed to resume event")
//         }

//         setPaused(false)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : String(err))
//       }
//       return
//     }

//     try {
//       const v: any = publishedVideoRef.current
//       const s: any = publishedScreenRef.current
//       const a: any = publishedAudioRef.current
//       unpublishedDuringPauseRef.current = []
//       // Note: we deliberately only unpublish from the LiveKit room here and
//       // never call .stop() on these tracks — the MediaRecorder is still
//       // reading from them, so recording continues uninterrupted while paused.
//       if (v) {
//         try {
//           await room.localParticipant.unpublishTrack(v, false)
//           unpublishedDuringPauseRef.current.push(v)
//         } catch {}
//       }
//       if (s) {
//         try {
//           await room.localParticipant.unpublishTrack(s, false)
//           unpublishedDuringPauseRef.current.push(s)
//         } catch {}
//       }
//       if (a) {
//         try {
//           await room.localParticipant.unpublishTrack(a, false)
//           unpublishedDuringPauseRef.current.push(a)
//         } catch {}
//       }

//       const response = await fetch(`/api/creator/events/${eventId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: "paused" }),
//       })

//       if (!response.ok) {
//         const data = await response.json().catch(() => null)
//         throw new Error(data?.message || "Failed to pause event")
//       }

//       setPaused(true)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : String(err))
//     }
//   }

//   const handleToggleAudio = () => {
//     const a: any = publishedAudioRef.current
//     if (!a) return
//     try {
//       a.mediaStreamTrack.enabled = !a.mediaStreamTrack.enabled
//       setAudioEnabled(a.mediaStreamTrack.enabled)
//     } catch (err) {
//       setAudioEnabled((v) => !v)
//     }
//   }

//   const handleToggleVideo = () => {
//     const v: any = publishedVideoRef.current
//     if (!v) return
//     try {
//       v.mediaStreamTrack.enabled = !v.mediaStreamTrack.enabled
//       setVideoEnabled(v.mediaStreamTrack.enabled)
//     } catch (err) {
//       setVideoEnabled((v) => !v)
//     }
//   }

//   const handleSwitchCamera = async (deviceId: string) => {
//     setSelectedCamera(deviceId)
//     if (!room || !connected || paused) return

//     setPublishing(true)
//     try {
//       const newTrack = await createLocalVideoTrack({ deviceId })
//       const oldTrack: any = publishedVideoRef.current

//       try {
//         await room.localParticipant.publishTrack(newTrack)
//       } catch (err) {
//         console.warn("Failed to publish new camera track", err)
//       }

//       // FIX: feed the recorder the new camera track BEFORE the old one is
//       // unpublished/stopped, so the recording never loses its video source.
//       if (!oldTrack || activeRecordingVideoTrackRef.current === oldTrack.mediaStreamTrack) {
//         setRecordingVideoTrack(newTrack.mediaStreamTrack)
//       }

//       if (oldTrack) {
//         try {
//           await room.localParticipant.unpublishTrack(oldTrack)
//         } catch (err) {
//           console.warn("Failed to unpublish old camera track", err)
//         }
//         try {
//           oldTrack.stop()
//         } catch {}
//       }

//       try {
//         newTrack.attach(localVideoRef.current!)
//       } catch {}

//       publishedVideoRef.current = newTrack
//     } catch (err) {
//       setError(err instanceof Error ? err.message : String(err))
//     } finally {
//       setPublishing(false)
//     }
//   }

//   const handleStop = async () => {
//     if (!connected || awaitingStopDecision || isProcessingSave) return

//     try {
//       console.log("Stopping live stream...")

//       await stopMediaRecorder()
//       await new Promise(resolve => setTimeout(resolve, 500))

//       // FIX: check the ref (updated synchronously as chunks arrive / on
//       // stop) instead of the React state value, which can be stale here.
//       if (!hasRecordingDataRef.current && recordingChunksRef.current.length === 0) {
//         console.warn("No recording data available")
//         setError("No recording data was captured. Please try again.")
//       }

//       setAwaitingStopDecision(true)
//       setShowSaveDialog(true)
//       console.log("Save dialog opened")
//     } catch (err) {
//       console.error("Error stopping:", err)
//       setError(err instanceof Error ? err.message : String(err))
//     }
//   }

//   const cleanupRoom = async () => {
//     if (room) {
//       try {
//         const v: any = publishedVideoRef.current
//         const s: any = publishedScreenRef.current
//         const a: any = publishedAudioRef.current
//         if (v) {
//           try {
//             await room.localParticipant.unpublishTrack(v)
//           } catch {}
//           try {
//             v.stop()
//           } catch {}
//         }
//         if (s) {
//           try {
//             await room.localParticipant.unpublishTrack(s)
//           } catch {}
//           try {
//             s.stop()
//           } catch {}
//         }
//         if (a) {
//           try {
//             await room.localParticipant.unpublishTrack(a)
//           } catch {}
//           try {
//             a.stop()
//           } catch {}
//         }
//       } catch {}
//       try {
//         await room.disconnect()
//       } catch {}
//     }

//     setRoom(null)
//     setConnected(false)
//     setPublishing(false)
//     publishedVideoRef.current = null
//     publishedScreenRef.current = null
//     publishedAudioRef.current = null
//     recordingStreamRef.current = null
//     activeRecordingVideoTrackRef.current = null
//     activeRecordingAudioTrackRef.current = null
//     setIsRecording(false)
//   }

//   const finalizeSave = async () => {
//     try {
//       let blobToSave = recordingBlobRef.current

//       if (!blobToSave || blobToSave.size === 0) {
//         if (recordingChunksRef.current.length > 0) {
//           console.log(`Creating blob from ${recordingChunksRef.current.length} chunks...`)
//           const options = getSupportedRecorderOptions()
//           blobToSave = new Blob(recordingChunksRef.current, { type: options?.mimeType || "video/webm" })
//           recordingChunksRef.current = []
//           recordingBlobRef.current = blobToSave
//           setHasRecordingData(true)
//           hasRecordingDataRef.current = true
//         }
//       }

//       if (!blobToSave || blobToSave.size === 0) {
//         console.log("Waiting for recording blob...")
//         await new Promise(resolve => setTimeout(resolve, 1000))
//         blobToSave = recordingBlobRef.current

//         if ((!blobToSave || blobToSave.size === 0) && recordingChunksRef.current.length > 0) {
//           console.log(`Creating blob from ${recordingChunksRef.current.length} chunks after wait...`)
//           const options = getSupportedRecorderOptions()
//           blobToSave = new Blob(recordingChunksRef.current, { type: options?.mimeType || "video/webm" })
//           recordingChunksRef.current = []
//           recordingBlobRef.current = blobToSave
//           setHasRecordingData(true)
//           hasRecordingDataRef.current = true
//         }
//       }

//       if (!blobToSave || blobToSave.size === 0) {
//         throw new Error("No recording data available. Please try again or check if recording was properly started.")
//       }

//       console.log(`Recording blob size: ${blobToSave.size} bytes`)

//       setSavingStatus("uploading")
//       setUploadProgress(0)
//       setSavingError(null)
//       setUploading(true)
//       setIsProcessingSave(true)

//       // Use appropriate file extension based on browser
//       const fileExtension = isIOS ? 'mp4' : 'webm'
//       const mimeType = isIOS ? 'video/mp4' : 'video/webm'

//       const file = new File([blobToSave], `creator-event-${eventId}-${Date.now()}.${fileExtension}`, {
//         type: mimeType,
//       })

//       console.log("📤 Starting upload...")
//       const result = await uploadCreatorVideo(file, (pct) => {
//         const progress = Math.round(pct)
//         setUploadProgress(progress)
//         console.log(`📊 Upload progress: ${progress}%`)
//       })

//       // NOTE: double-check this against what uploadCreatorVideo actually
//       // returns (log `result` once) — if the field names don't match, this
//       // throws "Upload completed without a valid video URL" even though the
//       // upload itself succeeded.
//       const uploadedUrl = result.videoUrl ?? result.fileUrl ?? result.ufsUrl
//       const uploadedFileId = result.key ?? result.fileUrl ?? result.ufsUrl

//       if (!uploadedUrl) {
//         throw new Error("Upload completed without a valid video URL")
//       }

//       console.log("✅ Upload completed:", uploadedUrl)
//       setRecordingUrl(uploadedUrl)
//       setUploadProgress(100)

//       setSavingStatus("saving")
//       console.log("💾 Saving to database...")

//       const response = await fetch(`/api/creator/events/${eventId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           recordedVideoUrl: uploadedUrl,
//           recordedVideoFileId: uploadedFileId,
//           recordingStatus: "ready",
//           hasRecordedVideo: true,
//         }),
//       })

//       if (!response.ok) {
//         const data = await response.json().catch(() => null)
//         throw new Error(data?.message || "Failed to save recorded video to the event")
//       }

//       console.log("✅ Database save completed")
//       recordingBlobRef.current = null
//       recordingChunksRef.current = []
//       setHasRecordingData(false)
//       hasRecordingDataRef.current = false
//       setSavingStatus("completed")
//       setUploading(false)
//       setIsProcessingSave(false)
//     } catch (err) {
//       const message = err instanceof Error ? err.message : String(err)
//       console.error("❌ Save error:", message)
//       setSavingError(message)
//       setSavingStatus("error")
//       setUploading(false)
//       setIsProcessingSave(false)
//       throw err
//     }
//   }

//   const finalizeDiscard = async () => {
//     recordingBlobRef.current = null
//     recordingChunksRef.current = []
//     setHasRecordingData(false)
//     hasRecordingDataRef.current = false
//     setRecordingUrl(null)
//     await endLiveEvent()
//     await cleanupRoom()
//   }

//   const handleSaveRecordingChoice = async (saveRecording: boolean) => {
//     try {
//       if (saveRecording) {
//         await finalizeSave()
//         setShowSaveDialog(false)
//         setAwaitingStopDecision(false)
//         await endLiveEvent()
//         await cleanupRoom()
//         router.push(`/tv`)
//       } else {
//         await finalizeDiscard()
//         setShowSaveDialog(false)
//         setAwaitingStopDecision(false)
//         router.push(`/tv`)
//       }
//     } catch (err) {
//       // FIX: previously only console.error'd. finalizeSave already puts the
//       // dialog into its "error" state (so the user sees "Save failed" and
//       // can retry), but surface it in the top-level error banner too in
//       // case the failure happened outside finalizeSave (e.g. endLiveEvent /
//       // cleanupRoom after a successful save).
//       console.error("Error in save decision:", err)
//       setError(err instanceof Error ? err.message : String(err))
//     }
//   }

//   const handleRetrySave = async () => {
//     setSavingError(null)
//     setSavingStatus("pending")
//     await handleSaveRecordingChoice(true)
//   }

//   return (
//     <div className="relative min-h-[100dvh] bg-black text-white">
//       <div className="absolute inset-0 overflow-hidden">
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           playsInline
//           className={`absolute inset-0 h-full w-full object-cover ${sourceMode === "screen" ? "hidden" : ""}`}
//         />
//         <video
//           ref={screenVideoRef}
//           autoPlay
//           muted
//           playsInline
//           className={`absolute inset-0 h-full w-full object-cover ${sourceMode === "camera" ? "hidden" : ""}`}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
//         <div className="absolute inset-x-0 top-0 p-4">
//           <div className="flex flex-col gap-2 max-w-5xl mx-auto">
//             <div className="flex flex-wrap items-center justify-between gap-3">
//               <div>
//                 <h1 className="text-xl font-semibold">Creator Live — {eventId}</h1>
//                 {isIOS && <p className="text-sm text-yellow-300">📱 iOS Mode</p>}
//                 {sourceMode === "screen" || sourceMode === "both" ? (
//                   <p className="text-sm text-amber-200">Screen recording mode</p>
//                 ) : null}
//                 {isRecording && (
//                   <div className="flex items-center gap-2 text-sm text-red-400">
//                     <span className="relative flex h-2 w-2">
//                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                       <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
//                     </span>
//                     <div className=" flex items-center gap-2">🔴 <span className="hidden lg:block">Recording live...</span></div>
//                   </div>
//                 )}
//                 {uploading && uploadProgress !== null && uploadProgress < 100 && (
//                   <div className="flex items-center gap-2 text-sm text-blue-300">
//                     <span className="animate-spin">⏳</span>
//                     Uploading: {uploadProgress}%
//                   </div>
//                 )}
//                 {uploading && uploadProgress === 100 && (
//                   <p className="text-sm text-emerald-300">✅ Processing upload...</p>
//                 )}
//                 {recordingUrl && (
//                   <p className="text-sm text-emerald-300">✅ Recording saved</p>
//                 )}
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {error ? (
//                   <span className="rounded-full bg-red-500/20 px-3 py-2 text-sm text-red-200">
//                     ❌ {error}
//                   </span>
//                 ) : null}
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               <button
//                 type="button"
//                 onClick={() => handleSourceModeChange("camera")}
//                 disabled={connecting || publishing || isProcessingSave}
//                 className={`rounded-full border px-3 py-2 text-sm transition ${
//                   sourceMode === "camera" ? "border-white bg-white/10 text-white" : "border-white/30 text-slate-200"
//                 } ${(connecting || publishing || isProcessingSave) ? 'cursor-not-allowed opacity-50' : ''}`}
//               >
//                 Camera only
//               </button>
//               <button
//                 type="button"
//                 onClick={() => handleSourceModeChange("screen")}
//                 disabled={connecting || publishing || isProcessingSave}
//                 className={`rounded-full border px-3 py-2 text-sm transition ${
//                   sourceMode === "screen" ? "border-white bg-white/10 text-white" : "border-white/30 text-slate-200"
//                 } ${(connecting || publishing || isProcessingSave) ? 'cursor-not-allowed opacity-50' : ''}`}
//               >
//                 Screen share only
//               </button>
//               <button
//                 type="button"
//                 onClick={() => handleSourceModeChange("both")}
//                 disabled={connecting || publishing || isProcessingSave}
//                 className={`rounded-full border px-3 py-2 text-sm transition ${
//                   sourceMode === "both" ? "border-white bg-white/10 text-white" : "border-white/30 text-slate-200"
//                 } ${(connecting || publishing || isProcessingSave) ? 'cursor-not-allowed opacity-50' : ''}`}
//               >
//                 Camera + screen share
//               </button>
//             </div>
//             {cameras.length > 0 ? (
//               <div className="flex gap-2 overflow-x-auto pb-2">
//                 {cameras.map((camera) => (
//                   <button
//                     type="button"
//                     key={camera.deviceId}
//                     onClick={() => handleSwitchCamera(camera.deviceId)}
//                     disabled={paused || isProcessingSave}
//                     className={`rounded-full border px-3 py-2 text-sm transition ${
//                       selectedCamera === camera.deviceId
//                         ? "border-white bg-white/10 text-white"
//                         : "border-white/30 text-slate-200"
//                     } ${(paused || isProcessingSave) ? 'cursor-not-allowed opacity-50' : ''}`}
//                   >
//                     {camera.label}
//                   </button>
//                 ))}
//               </div>
//             ) : null}
//           </div>
//         </div>
//         <div className="absolute inset-x-0 bottom-0 p-4">
//           <div className="mx-auto flex w-full max-w-5xl flex-wrap justify-end gap-2 rounded-3xl bg-black/60 p-3 backdrop-blur-md">
//             {!connected ? (
//               <Button onClick={handleConnectAndPublish} disabled={!token || connecting || publishing}>
//                 {connecting ? "Connecting..." : "Start live"}
//               </Button>
//             ) : (
//               <>
//                 <Button onClick={handleToggleAudio} disabled={publishing || isProcessingSave}>
//                   {audioEnabled ? "Mute" : "Unmute"}
//                 </Button>
//                 <Button onClick={handleToggleVideo} disabled={publishing || isProcessingSave}>
//                   {videoEnabled ? "Stop video" : "Start video"}
//                 </Button>
//                 {/* <Button onClick={handlePauseToggle} disabled={publishing || isProcessingSave}>
//                   {paused ? "Resume" : "Pause"}
//                 </Button> */}
//                 <Button variant="destructive" onClick={handleStop} disabled={publishing || awaitingStopDecision || isProcessingSave}>
//                   {isProcessingSave ? "Processing..." : "End live"}
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       <Dialog
//         open={showSaveDialog}
//         onOpenChange={(open) => {
//           if (!open && savingStatus !== "pending" && savingStatus !== "error") {
//             return
//           }
//           if (!open && savingStatus === "pending") {
//             setShowSaveDialog(false)
//             setAwaitingStopDecision(false)
//           }
//         }}
//       >
//         <DialogContent
//           className="max-w-sm"
//           onPointerDownOutside={(e) => {
//             if (savingStatus !== "pending" && savingStatus !== "error") {
//               e.preventDefault()
//             }
//           }}
//           onEscapeKeyDown={(e) => {
//             if (savingStatus !== "pending" && savingStatus !== "error") {
//               e.preventDefault()
//             }
//           }}
//         >
//           <DialogHeader>
//             <DialogTitle>
//               {savingStatus === "completed" ? "✅ Recording saved!" :
//                savingStatus === "error" ? "❌ Save failed" :
//                "Save live recording?"}
//             </DialogTitle>
//             <DialogDescription>
//               {savingStatus === "uploading" && "📤 Uploading video... Please don't close this window."}
//               {savingStatus === "saving" && "💾 Saving to database..."}
//               {savingStatus === "completed" && "Your recording has been successfully saved."}
//               {savingStatus === "error" && (savingError || "There was an error saving your recording. Please try again.")}
//               {savingStatus === "pending" && "Do you want to save this live recording?"}
//             </DialogDescription>
//           </DialogHeader>

//           <div className="py-4">
//             {savingStatus === "uploading" && (
//               <div className="space-y-3">
//                 <div className="text-sm font-medium text-foreground">
//                   Uploading: {uploadProgress ?? 0}%
//                 </div>
//                 <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
//                   <div
//                     className="h-full bg-blue-500 transition-all duration-300"
//                     style={{ width: `${uploadProgress ?? 0}%` }}
//                   />
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   ⚠️ Please keep this window open until upload completes
//                 </p>
//               </div>
//             )}

//             {savingStatus === "saving" && (
//               <div className="space-y-3">
//                 <div className="text-sm font-medium text-foreground">
//                    Finalizing...
//                 </div>
//                 <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
//                   <div className="h-full bg-green-500 animate-pulse" style={{ width: "100%" }} />
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   ⏳ Saving... please wait
//                 </p>
//                 {/* <p className="text-xs text-muted-foreground">
//                   ⏳ Saving to database... please wait
//                 </p> */}
//               </div>
//             )}

//             {savingStatus === "completed" && (
//               <div className="space-y-2 text-center">
//                 <div className="text-4xl">✅</div>
//                 <p className="text-sm text-muted-foreground">
//                   Your live recording has been successfully saved!
//                 </p>
//               </div>
//             )}

//             {savingStatus === "error" && (
//               <div className="space-y-3">
//                 <div className="rounded-md bg-red-500/10 border border-red-500/30 p-3">
//                   <p className="text-sm text-red-500">
//                     <strong>Error:</strong> {savingError || "Failed to save recording"}
//                   </p>
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   Tip: Make sure you have a stable internet connection and try again.
//                 </p>
//               </div>
//             )}

//             {savingStatus === "pending" && (
//               <p className="text-sm text-muted-foreground">
//                 Choose whether to upload the recording before ending the event.
//               </p>
//             )}
//           </div>

//           <DialogFooter className="flex gap-2">
//             {savingStatus === "pending" && (
//               <>
//                 <Button variant="outline" onClick={() => handleSaveRecordingChoice(false)}>
//                   Don't save
//                 </Button>
//                 <Button onClick={() => handleSaveRecordingChoice(true)}>
//                   Save recording
//                 </Button>
//               </>
//             )}
//             {savingStatus === "completed" && (
//               <Button onClick={() => {
//                 setShowSaveDialog(false)
//                 setAwaitingStopDecision(false)
//                 router.push(`/tv`)
//               }}>
//                 Done
//               </Button>
//             )}
//             {savingStatus === "error" && (
//               <>
//                 <Button variant="outline" onClick={() => {
//                   setShowSaveDialog(false)
//                   setAwaitingStopDecision(false)
//                   router.push(`/tv`)
//                 }}>
//                   Discard & Exit
//                 </Button>
//                 <Button onClick={handleRetrySave}>
//                   Retry Save
//                 </Button>
//               </>
//             )}
//             {(savingStatus === "uploading" || savingStatus === "saving") && (
//               <div className="text-xs text-muted-foreground">
//                 ⏳ Processing... do not close
//               </div>
//             )}
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }
