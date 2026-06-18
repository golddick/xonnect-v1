"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AlertTriangle, Copy, Link2, RefreshCw, Trash2, Video } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { loadCameraSession, createCameraSession, sendCameraSessionAction } from "@/lib/checkin-camera-client"

const ICE_SERVERS: RTCIceServer[] = [{ urls: "stun:stun.l.google.com:19302" }]

type CameraSessionPanelProps = {
  onTokenChange?: (token: string | null) => void
}

function parseSignalPayload(payload: string) {
  try {
    return JSON.parse(payload) as any
  } catch {
    return null
  }
}

export default function CameraSessionPanel({ onTokenChange }: CameraSessionPanelProps) {
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const pollTimerRef = useRef<number | null>(null)
  const lastSignalAtRef = useRef<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [session, setSession] = useState<{
    token: string
    tokenPrefix: string
    cameraUrl: string
    qrDataUrl: string
    expiresAt: string
    session: {
      id: string
      tokenPrefix: string
      status: string
      expiresAt: string | null
      openedAt: string | null
      connectedAt: string | null
      completedAt: string | null
      revokedAt: string | null
      lastSeenAt: string | null
      event: { id: string; title: string; status: string }
      operator: { id: string; fullName: string; username: string; gateName: string }
    }
  } | null>(null)
  const [sessionStatus, setSessionStatus] = useState("")

  const stopPeer = () => {
    if (pollTimerRef.current) {
      window.clearInterval(pollTimerRef.current)
      pollTimerRef.current = null
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close()
      peerConnectionRef.current = null
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null
    }
  }

  const syncSession = async (token: string) => {
    try {
      const data = await loadCameraSession(token, lastSignalAtRef.current)
      setSessionStatus(data.session.status)

      if (data.session.status === "COMPLETED" || data.session.status === "REVOKED" || data.session.status === "EXPIRED") {
        stopPeer()
        onTokenChange?.(null)
        return
      }

      const latest = data.signals[data.signals.length - 1]
      if (latest) {
        lastSignalAtRef.current = latest.createdAt
      }

      for (const signal of data.signals) {
        lastSignalAtRef.current = signal.createdAt
        const payload = parseSignalPayload(signal.payload)
        if (!payload) continue

        if (signal.type === "offer") {
          if (!peerConnectionRef.current) {
            const peerConnection = new RTCPeerConnection({ iceServers: ICE_SERVERS })
            peerConnectionRef.current = peerConnection

            peerConnection.ontrack = (event) => {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0] ?? null
              }
            }

            peerConnection.onicecandidate = async (candidateEvent) => {
              if (candidateEvent.candidate) {
                await sendCameraSessionAction(token, "signal", {
                  sender: "operator",
                  type: "candidate",
                  payload: candidateEvent.candidate.toJSON(),
                })
              }
            }

            peerConnection.onconnectionstatechange = async () => {
              if (peerConnection.connectionState === "connected") {
                await sendCameraSessionAction(token, "connect", {
                  clientLabel: navigator.userAgent,
                })
              }
            }
          }

          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(payload))
          const answer = await peerConnectionRef.current.createAnswer()
          await peerConnectionRef.current.setLocalDescription(answer)

          await sendCameraSessionAction(token, "signal", {
            sender: "operator",
            type: "answer",
            payload: answer.toJSON(),
          })
        }

        if (signal.type === "candidate" && peerConnectionRef.current && payload.candidate) {
          try {
            await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(payload))
          } catch {
            // Ignore ICE noise.
          }
        }
      }
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : "Camera sync failed")
    }
  }

  useEffect(() => {
    if (!session?.token) return

    onTokenChange?.(session.token)

    pollTimerRef.current = window.setInterval(() => {
      void syncSession(session.token)
    }, 1200)

    void syncSession(session.token)

    return () => {
      if (pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current)
        pollTimerRef.current = null
      }
    }
  }, [session?.token])

  const handleGenerate = async () => {
    setLoading(true)
    setError("")
    stopPeer()

    try {
      const created = await createCameraSession()
      setSession(created)
      setSessionStatus(created.session.status)
      lastSignalAtRef.current = null
      onTokenChange?.(created.token)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create camera session")
    } finally {
      setLoading(false)
    }
  }

  const handleRevoke = async () => {
    if (!session?.token) return
    setLoading(true)
    setError("")
    try {
      await sendCameraSessionAction(session.token, "revoke", {
        message: "Operator revoked the camera session",
      })
      setSessionStatus("REVOKED")
      stopPeer()
      onTokenChange?.(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to revoke camera session")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!session?.cameraUrl) return
    await navigator.clipboard.writeText(session.cameraUrl)
  }

  const isActive = useMemo(() => {
    return sessionStatus === "ACTIVE" || sessionStatus === "OPENED" || sessionStatus === "CONNECTED"
  }, [sessionStatus])

  return (
    <section className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Camera QR</h2>
          <p className="text-sm text-muted-foreground">
            Generate a one-time link for a nearby phone to act as a temporary camera.
          </p>
        </div>
        <Badge variant="secondary" className="rounded-full">
          {sessionStatus || "Idle"}
        </Badge>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-background p-3">
            {session?.qrDataUrl ? (
              <img src={session.qrDataUrl} alt="Camera QR" className="w-full" />
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                QR not generated
              </div>
            )}
          </div>

          <Button className="w-full" onClick={() => void handleGenerate()} disabled={loading}>
            {loading && !session ? "Generating..." : session?.token ? "Regenerate QR" : "Generate QR"}
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full" onClick={() => void handleCopy()} disabled={!session?.cameraUrl}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button variant="outline" className="w-full" onClick={() => void handleRevoke()} disabled={!isActive || loading}>
              <Trash2 className="mr-2 h-4 w-4" />
              Revoke
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-background p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link2 className="h-4 w-4" />
              <span>Camera URL</span>
            </div>
            <p className="mt-2 break-all text-sm font-medium">{session?.cameraUrl || "Generate a session to get a link"}</p>
          </div>

          <div className="rounded-lg border border-border bg-background p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Video className="h-4 w-4" />
              <span>Live feed</span>
            </div>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="mt-3 aspect-video w-full rounded-lg bg-black object-cover"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              {sessionStatus === "CONNECTED"
                ? "Phone stream connected."
                : "Waiting for the phone to join the session."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
