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

type PeerTile = {
  peerId: string
  stream: MediaStream
}

function parseSignalPayload(payload: string) {
  try {
    return JSON.parse(payload) as any
  } catch {
    return null
  }
}

/** Renders a single phone's live stream; attaches the MediaStream via ref. */
function PeerVideo({ stream }: { stream: MediaStream }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="aspect-video w-full rounded-lg bg-black object-cover"
    />
  )
}

export default function CameraSessionPanel({ onTokenChange }: CameraSessionPanelProps) {
  // One RTCPeerConnection per connected phone, keyed by the phone's peerId.
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map())
  const pollTimerRef = useRef<number | null>(null)
  const lastSignalAtRef = useRef<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [peers, setPeers] = useState<PeerTile[]>([])
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

  const upsertPeerStream = (peerId: string, stream: MediaStream) => {
    setPeers((prev) => {
      if (prev.some((peer) => peer.peerId === peerId)) {
        return prev.map((peer) => (peer.peerId === peerId ? { ...peer, stream } : peer))
      }
      return [...prev, { peerId, stream }]
    })
  }

  const removePeer = (peerId: string) => {
    const pc = peerConnectionsRef.current.get(peerId)
    if (pc) {
      pc.close()
      peerConnectionsRef.current.delete(peerId)
    }
    setPeers((prev) => prev.filter((peer) => peer.peerId !== peerId))
  }

  const stopAllPeers = () => {
    if (pollTimerRef.current) {
      window.clearInterval(pollTimerRef.current)
      pollTimerRef.current = null
    }

    peerConnectionsRef.current.forEach((pc) => pc.close())
    peerConnectionsRef.current.clear()
    setPeers([])
  }

  const syncSession = async (token: string) => {
    try {
      const data = await loadCameraSession(token, lastSignalAtRef.current)
      setSessionStatus(data.session.status)

      if (data.session.status === "COMPLETED" || data.session.status === "REVOKED" || data.session.status === "EXPIRED") {
        stopAllPeers()
        onTokenChange?.(null)
        return
      }

      for (const signal of data.signals) {
        lastSignalAtRef.current = signal.createdAt
        const payload = parseSignalPayload(signal.payload)
        if (!payload) continue

        // Only handle signals coming from phones, routed by their peerId.
        if (signal.sender !== "phone") continue
        const peerId: string | undefined = payload.peerId
        if (!peerId) continue

        if (signal.type === "offer") {
          // A new/restarted phone — replace any prior connection for this peerId.
          const existing = peerConnectionsRef.current.get(peerId)
          if (existing) {
            existing.close()
            peerConnectionsRef.current.delete(peerId)
          }

          const peerConnection = new RTCPeerConnection({ iceServers: ICE_SERVERS })
          peerConnectionsRef.current.set(peerId, peerConnection)

          peerConnection.ontrack = (event) => {
            const stream = event.streams[0]
            if (stream) upsertPeerStream(peerId, stream)
          }

          peerConnection.onicecandidate = async (candidateEvent) => {
            if (candidateEvent.candidate) {
              await sendCameraSessionAction(token, "signal", {
                sender: "operator",
                type: "candidate",
                payload: { peerId, ...candidateEvent.candidate.toJSON() },
              })
            }
          }

          peerConnection.onconnectionstatechange = async () => {
            const state = peerConnection.connectionState
            if (state === "connected") {
              await sendCameraSessionAction(token, "connect", {
                clientLabel: navigator.userAgent,
              })
            }
            if (state === "failed" || state === "closed" || state === "disconnected") {
              removePeer(peerId)
            }
          }

          await peerConnection.setRemoteDescription(
            new RTCSessionDescription({ type: payload.type, sdp: payload.sdp })
          )
          const answer = await peerConnection.createAnswer()
          await peerConnection.setLocalDescription(answer)

          await sendCameraSessionAction(token, "signal", {
            sender: "operator",
            type: "answer",
            payload: { peerId, type: answer.type, sdp: answer.sdp },
          })
        }

        if (signal.type === "candidate") {
          const pc = peerConnectionsRef.current.get(peerId)
          if (pc && payload.candidate) {
            try {
              await pc.addIceCandidate(new RTCIceCandidate(payload))
            } catch {
              // Ignore ICE noise.
            }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.token])

  useEffect(() => {
    return () => {
      stopAllPeers()
    }
  }, [])

  const handleGenerate = async () => {
    setLoading(true)
    setError("")
    stopAllPeers()

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
      stopAllPeers()
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
            Generate a link for one or more nearby phones to act as temporary cameras.
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
            <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span>Live feeds</span>
              </div>
              <span className="text-xs">
                {peers.length > 0 ? `${peers.length} phone${peers.length > 1 ? "s" : ""} connected` : ""}
              </span>
            </div>

            {peers.length > 0 ? (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {peers.map((peer) => (
                  <PeerVideo key={peer.peerId} stream={peer.stream} />
                ))}
              </div>
            ) : (
              <div className="mt-3 flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-border bg-black/5 text-center text-xs text-muted-foreground">
                Waiting for a phone to join the session.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
