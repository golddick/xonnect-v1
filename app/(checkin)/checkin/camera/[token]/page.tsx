"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useParams } from "next/navigation"
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Loader2,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  loadCameraSession,
  sendCameraSessionAction,
} from "@/lib/checkin-camera-client"

const ICE_SERVERS: RTCIceServer[] = [{ urls: "stun:stun.l.google.com:19302" }]

type CameraStatus = "idle" | "starting" | "connecting" | "connected" | "completed" | "error"

function parseSignalPayload(payload: string) {
  try {
    return JSON.parse(payload) as any
  } catch {
    return null
  }
}

export default function CameraTokenPage() {
  const params = useParams<{ token: string }>()
  const token = params.token

  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const pollTimerRef = useRef<number | null>(null)
  const lastSignalAtRef = useRef<string | null>(null)
  const activeRef = useRef(true)

  const [status, setStatus] = useState<CameraStatus>("idle")
  const [error, setError] = useState("")
  const [sessionLabel, setSessionLabel] = useState("")
  const [sessionState, setSessionState] = useState<string>("")
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [sessionTitle, setSessionTitle] = useState("")
  const [connectedAt, setConnectedAt] = useState<string | null>(null)

  const canStart = useMemo(() => status === "idle" || status === "error", [status])

  const stopStream = () => {
    if (pollTimerRef.current) {
      window.clearInterval(pollTimerRef.current)
      pollTimerRef.current = null
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close()
      peerConnectionRef.current = null
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop())
      localStreamRef.current = null
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null
    }
  }

  const disconnect = async (nextStatus: CameraStatus = "completed") => {
    stopStream()
    setStatus(nextStatus)
    try {
      await sendCameraSessionAction(token, "signal", {
        sender: "phone",
        type: nextStatus === "completed" ? "completed" : "revoked",
        payload: { reason: nextStatus },
      })
    } catch {
      // Best effort.
    }
  }

  useEffect(() => {
    activeRef.current = true
    let cancelled = false

    async function loadSession() {
      try {
        const data = await loadCameraSession(token)
        if (cancelled) return

        setSessionState(data.session.status)
        setExpiresAt(data.session.expiresAt)
        setSessionTitle(data.session.event.title)
        setSessionLabel(`${data.session.operator.fullName} · ${data.session.operator.gateName}`)
        const latest = data.signals[data.signals.length - 1]
        if (latest) {
          lastSignalAtRef.current = latest.createdAt
        }

        if (data.session.status === "COMPLETED" || data.session.status === "REVOKED" || data.session.status === "EXPIRED") {
          await disconnect(data.session.status === "COMPLETED" ? "completed" : "error")
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load camera session")
          setStatus("error")
        }
      }
    }

    void loadSession()

    return () => {
      cancelled = true
      activeRef.current = false
      stopStream()
    }
  }, [token])

  useEffect(() => {
    if (status !== "connecting" && status !== "connected") return

    pollTimerRef.current = window.setInterval(async () => {
      try {
        const data = await loadCameraSession(token, lastSignalAtRef.current)

        setSessionState(data.session.status)
        setExpiresAt(data.session.expiresAt)

        if (data.session.status === "COMPLETED" || data.session.status === "REVOKED" || data.session.status === "EXPIRED") {
          await disconnect(data.session.status === "COMPLETED" ? "completed" : "error")
          return
        }

        for (const signal of data.signals) {
          lastSignalAtRef.current = signal.createdAt
          const payload = parseSignalPayload(signal.payload)

          if (!payload) continue

          if (signal.type === "answer" && peerConnectionRef.current) {
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(payload))
          }

          if (signal.type === "candidate" && peerConnectionRef.current && payload.candidate) {
            try {
              await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(payload))
            } catch {
              // Ignore ICE noise.
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Camera session sync failed")
      }
    }, 1200)

    return () => {
      if (pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current)
        pollTimerRef.current = null
      }
    }
  }, [status, token])

  const startCamera = async () => {
    try {
      setError("")
      setStatus("starting")

      const session = await loadCameraSession(token)
      setSessionState(session.session.status)
      setExpiresAt(session.session.expiresAt)
      setSessionTitle(session.session.event.title)
      setSessionLabel(`${session.session.operator.fullName} · ${session.session.operator.gateName}`)

      if (session.session.status !== "ACTIVE" && session.session.status !== "OPENED") {
        throw new Error("This camera session is no longer active")
      }

      await sendCameraSessionAction(token, "open", {
        clientLabel: navigator.userAgent,
      })

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      })

      localStreamRef.current = stream
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }

      const peerConnection = new RTCPeerConnection({ iceServers: ICE_SERVERS })
      peerConnectionRef.current = peerConnection

      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream)
      })

      peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
          await sendCameraSessionAction(token, "signal", {
            sender: "phone",
            type: "candidate",
            payload: event.candidate.toJSON(),
          })
        }
      }

      peerConnection.onconnectionstatechange = async () => {
        if (peerConnection.connectionState === "connected") {
          setStatus("connected")
          setConnectedAt(new Date().toISOString())
          await sendCameraSessionAction(token, "connect", {
            clientLabel: navigator.userAgent,
          })
        }

        if (peerConnection.connectionState === "failed" || peerConnection.connectionState === "disconnected") {
          setStatus("error")
        }
      }

      const offer = await peerConnection.createOffer({
        offerToReceiveVideo: false,
        offerToReceiveAudio: false,
      })
      await peerConnection.setLocalDescription(offer)

      peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        // Convert the candidate to a plain object using toJSON
        const candidateJSON = event.candidate.toJSON();
        await sendCameraSessionAction(token, "signal", {
          sender: "phone",
          type: "candidate",
          payload: candidateJSON,
        });
      }
    }
      
      // await sendCameraSessionAction(token, "signal", {
      //   sender: "phone",
      //   type: "offer",
      //   payload: offer.toJSON(),
      // }) 

      lastSignalAtRef.current = new Date().toISOString()
      setStatus("connecting")
    } catch (err) {
      stopStream()
      setStatus("error")
      setError(err instanceof Error ? err.message : "Failed to start camera")
    }
  }

  const refreshSession = async () => {
    try {
      const data = await loadCameraSession(token)
      setSessionState(data.session.status)
      setExpiresAt(data.session.expiresAt)
      setSessionTitle(data.session.event.title)
      setSessionLabel(`${data.session.operator.fullName} · ${data.session.operator.gateName}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh session")
    }
  }

  useEffect(() => {
    return () => {
      if (!activeRef.current) return
      stopStream()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8 sm:px-6">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Camera className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-semibold">{sessionTitle || "Check-in camera"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {sessionLabel || "No session loaded"}
          </p>
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="secondary" className="rounded-full">
              {sessionState || "Loading"}
            </Badge>
            {expiresAt && (
              <span className="text-xs text-muted-foreground">
                Expires {new Date(expiresAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
              </span>
            )}
          </div>

          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="aspect-[3/4] w-full rounded-lg bg-black object-cover"
          />

          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {status === "connected" && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-500">
              <CheckCircle2 className="h-4 w-4" />
              <span>Live feed connected</span>
            </div>
          )}

          {connectedAt && (
            <p className="text-xs text-muted-foreground">
              Connected at {new Date(connectedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
            </p>
          )}

          <div className="grid gap-2 sm:grid-cols-2">
            <Button onClick={() => void startCamera()} disabled={!canStart}>
              {status === "starting" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Starting
                </>
              ) : status === "connecting" ? (
                "Waiting for operator"
              ) : status === "connected" ? (
                "Camera active"
              ) : (
                "Start camera"
              )}
            </Button>
            <Button variant="outline" onClick={() => void refreshSession()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Keep this page open until the operator completes the check-in.
        </p>
      </main>
    </div>
  )
}
