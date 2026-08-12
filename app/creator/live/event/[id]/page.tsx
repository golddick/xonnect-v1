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
  const recorderRef = useRef<MediaRecorder | null>(null)
  const recorderStopResolver = useRef<(() => void) | null>(null)
  const recordingChunksRef = useRef<Blob[]>([])
  const recordingBlobRef = useRef<Blob | null>(null)
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
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [sourceMode, setSourceMode] = useState<"camera" | "screen" | "both">("camera")
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [awaitingStopDecision, setAwaitingStopDecision] = useState(false)
  const [paused, setPaused] = useState(false)

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

        // auto connect and publish when token arrives
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
      if (uploading) {
        event.preventDefault()
        event.returnValue = ""
        return ""
      }
    }

    if (uploading) {
      window.addEventListener("beforeunload", handleBeforeUnload)
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [uploading])

  const getSupportedRecorderOptions = () => {
    if (typeof MediaRecorder === "undefined") return undefined
    const candidates = [
      "video/webm;codecs=vp8,opus",
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
      if (!videoTrack?.mediaStreamTrack || !audioTrack?.mediaStreamTrack) return
      if (typeof window === "undefined" || typeof MediaRecorder === "undefined") {
        setError("Recording is not supported in this browser")
        return
      }

      const options = getSupportedRecorderOptions()
      if (!options) {
        setError(
          "Recording is not supported by this browser because no supported video format could be found. Try a modern browser like Chrome, Edge, or Safari 16+."
        )
        return
      }

      const stream = new MediaStream()
      stream.addTrack(videoTrack.mediaStreamTrack)
      stream.addTrack(audioTrack.mediaStreamTrack)

      const recorder = new MediaRecorder(stream, options)
      recorderRef.current = recorder
      recordingChunksRef.current = []

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordingChunksRef.current.push(event.data)
        }
      }

      recorder.onstop = async () => {
        setIsRecording(false)
        const blob = new Blob(recordingChunksRef.current, { type: "video/webm" })
        recordingChunksRef.current = []

        if (blob.size > 0) {
          recordingBlobRef.current = blob
        }

        recorderStopResolver.current?.()
        recorderStopResolver.current = null
      }

      recorder.start()
      setIsRecording(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const stopMediaRecorder = () => {
    return new Promise<void>((resolve) => {
      const recorder = recorderRef.current
      if (!recorder || recorder.state === "inactive") {
        resolve()
        return
      }
      recorderStopResolver.current = resolve
      recorder.stop()
    })
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

      const statusResponse = await fetch(`/api/creator/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "live" }),
      })

      if (!statusResponse.ok) {
        const data = await statusResponse.json().catch(() => null)
        throw new Error(data?.message || "Failed to update event status to live")
      }

      await startMediaRecorder(readyVideoTrack, aTrack)
    } catch (err) {
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
        const v: any = publishedVideoRef.current
        const s: any = publishedScreenRef.current
        const a: any = publishedAudioRef.current

        if (sourceMode === "camera" || sourceMode === "both") {
          if (v) {
            await room.localParticipant.publishTrack(v)
          }
        }

        if (sourceMode === "screen" || sourceMode === "both") {
          if (s) {
            await room.localParticipant.publishTrack(s)
          }
        }

        if (a) {
          await room.localParticipant.publishTrack(a)
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

      if (v) await room.localParticipant.unpublishTrack(v)
      if (s) await room.localParticipant.unpublishTrack(s)
      if (a) await room.localParticipant.unpublishTrack(a)

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
    if (!room || !connected) return

    setPublishing(true)
    try {
      const newTrack = await createLocalVideoTrack({ deviceId })
      const oldTrack: any = publishedVideoRef.current

      try {
        await room.localParticipant.publishTrack(newTrack)
      } catch (err) {
        console.warn("Failed to publish new camera track", err)
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

  const handleStop = async () => {
    if (!connected || awaitingStopDecision) return

    try {
      await stopMediaRecorder()
      setAwaitingStopDecision(true)
      setShowSaveDialog(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const finalizeDiscard = async () => {
    await endLiveEvent()

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
      await room.disconnect()
    }

    recordingBlobRef.current = null
    setRecordingUrl(null)
  }

  const finalizeSave = async () => {
    if (recordingBlobRef.current && recordingBlobRef.current.size > 0) {
      setUploading(true)
      setUploadProgress(0)

      try {
        const file = new File([recordingBlobRef.current], `creator-event-${eventId}-${Date.now()}.webm`, {
          type: "video/webm",
        })
        const result = await uploadCreatorVideo(file, (pct) => {
          setUploadProgress(Math.round(pct))
        })
        const uploadedUrl = result.videoUrl ?? result.fileUrl ?? result.ufsUrl
        const uploadedFileId = result.key ?? result.fileUrl ?? result.ufsUrl

        if (!uploadedUrl) {
          throw new Error("Upload completed without a valid video URL")
        }

        setRecordingUrl(uploadedUrl)
        const response = await fetch(`/api/creator/events/${eventId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recordedVideoUrl: uploadedUrl,
            recordedVideoFileId: uploadedFileId,
            recordingUrl: uploadedUrl,
            recordingStatus: "ready",
          }),
        })

        if (!response.ok) {
          const data = await response.json().catch(() => null)
          throw new Error(data?.message || "Failed to save recorded video to the event")
        }

        recordingBlobRef.current = null
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        setError(message)
        setUploadError(message)
        return
      } finally {
        setUploading(false)
        setUploadProgress(null)
      }
    }

    await endLiveEvent()

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
      await room.disconnect()
    }
  }

  const handleSaveRecordingChoice = async (saveRecording: boolean) => {
    setShowSaveDialog(false)
    setAwaitingStopDecision(false)

    try {
      if (saveRecording) {
        await finalizeSave()
      } else {
        await finalizeDiscard()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setRoom(null)
      setConnected(false)
      setPublishing(false)
      publishedVideoRef.current = null
      publishedScreenRef.current = null
      publishedAudioRef.current = null
      setIsRecording(false)
      router.push(`/tv`)
    }
  }

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-black text-white">
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          ref={screenVideoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 hidden h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 p-4">
          <div className="flex flex-col gap-2 max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold">Creator Live — {eventId}</h1>
                {sourceMode === "screen" || sourceMode === "both" ? (
                  <p className="text-sm text-amber-200">Screen recording mode</p>
                ) : null}
                {recordingUrl ? (
                  <p className="text-sm text-emerald-300">Recording uploaded</p>
                ) : isRecording ? (
                  <p className="text-sm text-sky-200">Recording live...</p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                {uploading ? (
                  <span className="rounded-full bg-white/10 px-3 py-2 text-sm">
                    Uploading {uploadProgress ?? 0}%
                  </span>
                ) : null}
                {error ? (
                  <span className="rounded-full bg-red-500/20 px-3 py-2 text-sm text-red-200">
                    {error}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSourceMode("camera")}
                className={`rounded-full border px-3 py-2 text-sm transition ${
                  sourceMode === "camera" ? "border-white bg-white/10 text-white" : "border-white/30 text-slate-200"
                }`}
              >
                Camera only
              </button>
              <button
                type="button"
                onClick={() => setSourceMode("screen")}
                className={`rounded-full border px-3 py-2 text-sm transition ${
                  sourceMode === "screen" ? "border-white bg-white/10 text-white" : "border-white/30 text-slate-200"
                }`}
              >
                Screen share only
              </button>
              <button
                type="button"
                onClick={() => setSourceMode("both")}
                className={`rounded-full border px-3 py-2 text-sm transition ${
                  sourceMode === "both" ? "border-white bg-white/10 text-white" : "border-white/30 text-slate-200"
                }`}
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
                    className={`rounded-full border px-3 py-2 text-sm transition ${
                      selectedCamera === camera.deviceId
                        ? "border-white bg-white/10 text-white"
                        : "border-white/30 text-slate-200"
                    }`}
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
                <Button onClick={handleToggleAudio} disabled={publishing}>
                  {audioEnabled ? "Mute" : "Unmute"}
                </Button>
                <Button onClick={handleToggleVideo} disabled={publishing}>
                  {videoEnabled ? "Stop video" : "Start video"}
                </Button>
                <Button onClick={handlePauseToggle} disabled={publishing}>
                  {paused ? "Resume" : "Pause"}
                </Button>
                <Button variant="destructive" onClick={handleStop} disabled={publishing || awaitingStopDecision}>
                  End live
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showSaveDialog} onOpenChange={(open) => {
        if (!open) {
          setShowSaveDialog(false)
          setAwaitingStopDecision(false)
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save live recording?</DialogTitle>
            <DialogDescription>
              Do you want to save this live recording?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-sm text-muted-foreground">
            Choose whether to upload the recording before ending the event.
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => handleSaveRecordingChoice(false)}>
              Don’t save / discard
            </Button>
            <Button onClick={() => handleSaveRecordingChoice(true)}>
              Save recording
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
