"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AlertTriangle, Copy, Link2, Trash2, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { loadCameraSession, createCameraSession, sendCameraSessionAction } from "@/lib/checkin-camera-client"

export type CheckInScan = {
  id: string
  attendeeName: string | null
  attendeeEmail: string | null
  gateName: string
  status: string
  scannedAt: string
  code: string
  ticketType: string | null
}

type CameraSessionPanelProps = {
  onTokenChange?: (token: string | null) => void
  /** Live check-in feed, polled by the dashboard, rendered in place of the old video feed. */
  recentScans?: CheckInScan[]
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value))
}

function scanStatusBadge(status: string) {
  const normalized = status.toUpperCase()
  if (normalized === "SUCCESS") {
    return { label: "Checked in", className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600" }
  }
  if (normalized === "DUPLICATE") {
    return { label: "Duplicate", className: "border-amber-500/30 bg-amber-500/10 text-amber-600" }
  }
  return { label: "Invalid", className: "border-red-500/30 bg-red-500/10 text-red-600" }
}

export default function CameraSessionPanel({ onTokenChange, recentScans = [] }: CameraSessionPanelProps) {
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

  const stopPolling = () => {
    if (pollTimerRef.current) {
      window.clearInterval(pollTimerRef.current)
      pollTimerRef.current = null
    }
  }

  // Light status poll: reflects when a phone opens/connects and auto-clears the
  // session once it ends. No video is streamed — paired phones scan tickets
  // locally and each check-in surfaces in the live table below.
  const refreshStatus = async (token: string) => {
    try {
      const data = await loadCameraSession(token, lastSignalAtRef.current)
      setSessionStatus(data.session.status)

      const latest = data.signals[data.signals.length - 1]
      if (latest) lastSignalAtRef.current = latest.createdAt

      if (
        data.session.status === "COMPLETED" ||
        data.session.status === "REVOKED" ||
        data.session.status === "EXPIRED"
      ) {
        stopPolling()
        onTokenChange?.(null)
      }
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : "Camera sync failed")
    }
  }

  useEffect(() => {
    if (!session?.token) return

    onTokenChange?.(session.token)

    pollTimerRef.current = window.setInterval(() => {
      void refreshStatus(session.token)
    }, 3000)

    void refreshStatus(session.token)

    return () => {
      stopPolling()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.token])

  useEffect(() => {
    return () => {
      stopPolling()
    }
  }, [])

  const handleGenerate = async () => {
    setLoading(true)
    setError("")
    stopPolling()

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
      stopPolling()
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
            Pair one or more phones to scan tickets. Every check-in appears in the table on the right — no refresh needed.
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

          {session?.cameraUrl && (
            <div className="rounded-lg border border-border bg-background p-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link2 className="h-4 w-4" />
                <span>Camera URL</span>
              </div>
              <p className="mt-2 break-all text-xs font-medium">{session.cameraUrl}</p>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-border bg-background">
          <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Live check-ins</span>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
          </div>

          {recentScans.length === 0 ? (
            <div className="flex min-h-[220px] items-center justify-center px-4 py-8 text-center text-sm text-muted-foreground">
              No check-ins yet. Scans from paired phones appear here automatically.
            </div>
          ) : (
            <div className="max-h-[360px] overflow-y-auto">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-background text-xs uppercase tracking-wide text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="px-4 py-2 font-medium">Attendee</th>
                    <th className="px-4 py-2 font-medium">Ticket</th>
                    <th className="hidden px-4 py-2 font-medium sm:table-cell">Gate</th>
                    <th className="px-4 py-2 font-medium">Time</th>
                    <th className="px-4 py-2 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentScans.map((scan) => {
                    const badge = scanStatusBadge(scan.status)
                    return (
                      <tr key={scan.id} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-2.5">
                          <p className="font-medium">{scan.attendeeName ?? "Unknown attendee"}</p>
                          <p className="font-mono text-xs text-muted-foreground">{scan.code}</p>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">{scan.ticketType ?? "Ticket"}</td>
                        <td className="hidden px-4 py-2.5 text-muted-foreground sm:table-cell">{scan.gateName}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{formatTime(scan.scannedAt)}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${badge.className}`}>
                            {badge.label}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
