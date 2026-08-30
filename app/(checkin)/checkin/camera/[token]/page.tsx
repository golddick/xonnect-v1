"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { BrowserQRCodeReader } from "@zxing/browser"
import { toast } from "sonner"
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Ticket,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  loadCameraSession,
  lookupCheckInTicket,
  sendCameraSessionAction,
  submitCheckIn,
  type CheckInSubmitResult,
  type CheckInTicketLookup,
} from "@/lib/checkin-camera-client"
import Logo from "@/components/nav/logo"

const ICE_SERVERS: RTCIceServer[] = [{ urls: "stun:stun.l.google.com:19302" }]

type CameraStatus = "idle" | "starting" | "connecting" | "connected" | "completed" | "error"

function parseSignalPayload(payload: string) {
  try {
    return JSON.parse(payload) as any
  } catch {
    return null
  }
}

function createPeerId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return `peer-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`
}

function formatTime(value: string | null | undefined) {
  if (!value) return ""
  return new Date(value).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
}

type PendingTicket = {
  code: string
  lookup: CheckInTicketLookup
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
  const peerIdRef = useRef<string>("")
  if (!peerIdRef.current) peerIdRef.current = createPeerId()

  const [status, setStatus] = useState<CameraStatus>("idle")
  const [error, setError] = useState("")
  const [sessionLabel, setSessionLabel] = useState("")
  const [sessionState, setSessionState] = useState<string>("")
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [sessionTitle, setSessionTitle] = useState("")
  const [connectedAt, setConnectedAt] = useState<string | null>(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "looking">("idle")

  // Two-step review → confirm flow.
  const [pending, setPending] = useState<PendingTicket | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<CheckInSubmitResult | null>(null)

  const canStart = useMemo(() => status === "idle" || status === "error", [status])

  const scanControlsRef = useRef<{ stop: () => void } | null>(null)
  // True while a lookup is in flight or the review modal is open, so the
  // scanner callback stops firing new detections until the operator re-arms it.
  const processingRef = useRef(false)
  const scanCooldownRef = useRef(0)

  const stopScanner = () => {
    if (scanControlsRef.current) {
      try {
        scanControlsRef.current.stop()
      } catch {
        // Ignore scanner cleanup errors.
      }
      scanControlsRef.current = null
    }
    setScanStatus("idle")
  }

  const stopStream = () => {
    stopScanner()

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

    setCameraReady(false)
    processingRef.current = false
    setPending(null)
    setSubmitResult(null)
  }

  const disconnect = async (nextStatus: CameraStatus = "completed") => {
    stopStream()
    setStatus(nextStatus)
    try {
      await sendCameraSessionAction(token, "signal", {
        sender: "phone",
        type: nextStatus === "completed" ? "completed" : "revoked",
        payload: { peerId: peerIdRef.current, reason: nextStatus },
      })
    } catch {
      // Best effort.
    }
  }

  const handleDetectedCode = async (code: string) => {
    if (processingRef.current) return

    const now = Date.now()
    if (now - scanCooldownRef.current < 1200) return

    processingRef.current = true
    scanCooldownRef.current = now
    setScanStatus("looking")

    try {
      const lookup = await lookupCheckInTicket(token, code)
      setSubmitResult(null)
      setPending({ code, lookup })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to look up ticket"
      toast.error(message)
      // Allow another attempt since nothing is on screen.
      processingRef.current = false
    } finally {
      setScanStatus((current) => (current === "looking" ? "scanning" : current))
    }
  }

  const handleConfirmCheckIn = async () => {
    if (!pending) return

    setSubmitting(true)
    try {
      const result = await submitCheckIn(token, pending.code)
      setSubmitResult(result)

      if (result.status === "success") {
        toast.success(result.message || "Ticket checked in")
      } else if (result.status === "already") {
        toast(result.message || "Ticket already checked in")
      } else {
        toast.error(result.message || "Ticket not valid")
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to check in ticket"
      toast.error(message)
      setSubmitResult({ status: "invalid", message })
    } finally {
      setSubmitting(false)
    }
  }

  const handleScanNext = () => {
    setPending(null)
    setSubmitResult(null)
    // Cooldown so the same code in view does not instantly re-open the modal.
    scanCooldownRef.current = Date.now()
    processingRef.current = false
  }

  const startScanner = async () => {
    if (!localVideoRef.current) return
    if (scanControlsRef.current) return

    try {
      const codeReader = new BrowserQRCodeReader()
      setScanStatus("scanning")

      scanControlsRef.current = await codeReader.decodeFromVideoElement(
        localVideoRef.current,
        (result, decodeError) => {
          if (!result) {
            if (decodeError && (decodeError as Error).name !== "NotFoundException") {
              console.warn("QR scan warning:", decodeError)
            }
            return
          }

          const scannedValue = result.getText()
          if (!scannedValue) return

          void handleDetectedCode(scannedValue)
        }
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : "QR code scanning is not supported in this browser."
      setError(message)
      setScanStatus("idle")
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

          // Only react to answers/candidates the operator addressed to THIS phone.
          if (signal.sender !== "operator" || payload.peerId !== peerIdRef.current) continue

          if (signal.type === "answer" && peerConnectionRef.current) {
            await peerConnectionRef.current.setRemoteDescription(
              new RTCSessionDescription({ type: payload.type, sdp: payload.sdp })
            )
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

      if (session.session.status !== "ACTIVE" && session.session.status !== "OPENED" && session.session.status !== "CONNECTED") {
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
      setCameraReady(true)
      void startScanner()

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
            payload: { peerId: peerIdRef.current, ...event.candidate.toJSON() },
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

      // Publish the offer so the operator can answer this specific phone.
      await sendCameraSessionAction(token, "signal", {
        sender: "phone",
        type: "offer",
        payload: { peerId: peerIdRef.current, type: offer.type, sdp: offer.sdp },
      })

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

  // Derive what the review/confirm modal should show.
  const dialogOpen = pending !== null
  const lookupStatus = pending?.lookup.status
  const resultStatus = submitResult?.status

  const modalTone: "ok" | "already" | "invalid" | "success" = resultStatus
    ? resultStatus === "success"
      ? "success"
      : resultStatus === "already"
      ? "already"
      : "invalid"
    : lookupStatus === "ok"
    ? "ok"
    : lookupStatus === "already"
    ? "already"
    : "invalid"

  const attendeeName = submitResult?.attendeeName ?? pending?.lookup.attendeeName ?? "Unknown attendee"
  const ticketType = submitResult?.ticketType ?? pending?.lookup.ticketType ?? "Ticket"
  const ticketCode = submitResult?.ticketCode ?? pending?.lookup.ticketCode ?? pending?.code ?? ""

  const toneStyles: Record<typeof modalTone, string> = {
    ok: "border-primary/30 bg-primary/10 text-primary",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
    already: "border-amber-500/30 bg-amber-500/10 text-amber-600",
    invalid: "border-red-500/30 bg-red-500/10 text-red-600",
  }

  const toneLabel: Record<typeof modalTone, string> = {
    ok: "Valid ticket",
    success: "Checked in",
    already: "Already checked in",
    invalid: "Not valid",
  }

  const showConfirmButton = !submitResult && lookupStatus === "ok"
  const isInvalidReview = !submitResult && lookupStatus === "invalid"

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8 sm:px-6">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex  items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Logo />
          </div>
          <h1 className="text-2xl font-semibold">{sessionTitle || "Check in camera"}</h1>
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
                Expires {formatTime(expiresAt)}
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

          {cameraReady && scanStatus !== "idle" && (
            <div className="flex w-full items-center gap-2 rounded-lg border border-border bg-background p-3 text-sm text-muted-foreground">
              {scanStatus === "looking" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Reading ticket…</span>
                </>
              ) : (
                <span>Point the camera at a ticket QR code to check someone in.</span>
              )}
            </div>
          )}

          {connectedAt && (
            <p className="text-xs text-muted-foreground">
              Connected at {formatTime(connectedAt)}
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
                cameraReady ? "Scanning tickets" : "Connecting camera"
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
          Hold a ticket QR code in front of the camera. You will confirm each check-in before it is recorded.
        </p>
      </main>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open && !submitting) handleScanNext()
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {submitResult
                ? resultStatus === "success"
                  ? "Checked in"
                  : resultStatus === "already"
                  ? "Already checked in"
                  : "Not checked in"
                : isInvalidReview
                ? "Ticket not found"
                : "Confirm check-in"}
            </DialogTitle>
            <DialogDescription>
              {submitResult
                ? submitResult.message ?? ""
                : isInvalidReview
                ? "This QR code is not a valid ticket for this event."
                : "Review the ticket details, then confirm the check-in."}
            </DialogDescription>
          </DialogHeader>

          {!isInvalidReview && (
            <div className="space-y-3">
              <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${toneStyles[modalTone]}`}>
                {modalTone === "ok" || modalTone === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                )}
                <span className="font-medium">{toneLabel[modalTone]}</span>
              </div>

              <div className="space-y-2 rounded-lg border border-border bg-background p-3 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{attendeeName}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Ticket className="h-4 w-4" />
                  <span>{ticketType}</span>
                </div>
                {ticketCode && (
                  <p className="break-all font-mono text-xs text-muted-foreground">{ticketCode}</p>
                )}
                {(submitResult?.status === "already" || (!submitResult && lookupStatus === "already")) &&
                  pending?.lookup.checkedInAt && (
                    <p className="text-xs text-amber-600">
                      Checked in at {formatTime(pending.lookup.checkedInAt)}
                    </p>
                  )}
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-2">
            {showConfirmButton && (
              <Button onClick={() => void handleConfirmCheckIn()} disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking in
                  </>
                ) : (
                  "Check in"
                )}
              </Button>
            )}
            <Button variant={showConfirmButton ? "outline" : "default"} onClick={handleScanNext} disabled={submitting}>
              Scan next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
