"use client"

import { useEffect, useMemo, useState } from "react"
import type { FormEvent } from "react"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  CheckCircle2,
  LogOut,
  Search,
  Ticket,
  User,
  Users,
  Zap,
} from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CameraSessionPanel from "./_components/camera-session-panel"
import { sendCameraSessionAction } from "@/lib/checkin-camera-client"
import LoadingSplash from "@/components/splash_screen/loading-splash"

type DashboardResponse = {
  user: {
    id: string
    fullName: string
    username: string
    gateName: string
    email: string
    scansToday: number
    totalScans: number
    lastLoginAt: string | null
    event: {
      id: string
      title: string
      status: string
      scheduledAt: string | null
      venueTicketCount: number
      streamingTicketCount: number
      isHybrid: boolean
    }
  }
  stats: {
    totalScans: number
    scansToday: number
    venueTickets: number
    checkedInPurchases: number
  }
  recentScans: Array<{
    id: string
    attendeeName: string | null
    attendeeEmail: string | null
    gateName: string
    status: string
    scannedAt: string
    code: string
    ticketType: string | null
  }>
}

type ScanResult =
  | {
      status: "success"
      attendeeName: string
      ticketCode: string
      ticketType: string
      access: string
    }
  | {
      status: "already"
      attendeeName: string
      ticketCode: string
      message: string
    }
  | {
      status: "invalid"
      message: string
    }

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-NG", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value))
}

export default function CheckInDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [session, setSession] = useState<DashboardResponse | null>(null)
  const [ticketCode, setTicketCode] = useState("")
  const [error, setError] = useState("")
  const [result, setResult] = useState<ScanResult | null>(null)
  const [activeCameraToken, setActiveCameraToken] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function loadSession() {
      try {
        const response = await fetch("/api/checkin/session", { cache: "no-store" })
        if (response.status === 401) {
          router.replace("/checkin")
          return
        }

        const data = (await response.json()) as DashboardResponse & { message?: string }

        if (!response.ok) {
          throw new Error(data.message ?? "Failed to load session")
        }

        if (active) {
          setSession(data)
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load session")
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadSession()

    return () => {
      active = false
    }
  }, [router])

  const stats = useMemo(() => {
    return session?.stats ?? {
      totalScans: 0,
      scansToday: 0,
      venueTickets: 0,
      checkedInPurchases: 0,
    }
  }, [session])

  const handleLogout = async () => {
    await fetch("/api/checkin/logout", { method: "POST" })
    router.replace("/checkin")
  }

  const handleCheckIn = async (event: FormEvent) => {
    event.preventDefault()
    if (!ticketCode.trim()) return

    setSubmitting(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/checkin/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: ticketCode }),
      })

      const data = (await response.json()) as ScanResult & { message?: string }

      if (!response.ok && data.status !== "already" && data.status !== "invalid") {
        throw new Error(data.message ?? "Unable to process ticket")
      }

      setResult(data as ScanResult)
      setTicketCode("")

      if (data.status === "success" && activeCameraToken) {
        try {
          await sendCameraSessionAction(activeCameraToken, "complete", {
            message: "Ticket check-in completed",
          })
          setActiveCameraToken(null)
        } catch (cameraError) {
          setError(cameraError instanceof Error ? cameraError.message : "Failed to complete camera session")
        }
      }

      const refreshed = await fetch("/api/checkin/session", { cache: "no-store" })
      if (refreshed.ok) {
        setSession((await refreshed.json()) as DashboardResponse)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to process ticket")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
               
                <LoadingSplash />
        
            </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{session.user.event.title}</h1>
              <p className="text-sm text-muted-foreground">
                {session.user.fullName} · {session.user.gateName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={() => void handleLogout()}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Scans today</p>
            <p className="mt-2 text-3xl font-semibold">{stats.scansToday}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total scans</p>
            <p className="mt-2 text-3xl font-semibold">{stats.totalScans}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Venue tickets</p>
            <p className="mt-2 text-3xl font-semibold">{stats.venueTickets}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Checked in</p>
            <p className="mt-2 text-3xl font-semibold">{stats.checkedInPurchases}</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="lg:col-span-2">
            <CameraSessionPanel onTokenChange={setActiveCameraToken} />
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Scan ticket</h2>
                <p className="text-sm text-muted-foreground">
                  Paste or scan the ticket code from the venue QR ticket.
                </p>
              </div>
              <Badge variant="secondary" className="rounded-full">
                {session.user.event.isHybrid ? "Hybrid event" : "Venue event"}
              </Badge>
            </div>

            <form onSubmit={handleCheckIn} className="space-y-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={ticketCode}
                  onChange={(event) => setTicketCode(event.target.value)}
                  placeholder="Scan or paste ticket code"
                  className="h-11 pl-9"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
                {submitting ? "Checking in..." : "Check in ticket"}
              </Button>
            </form>

            {result && (
              <div
                className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
                  result.status === "success"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                    : result.status === "already"
                    ? "border-amber-500/30 bg-amber-500/10 text-amber-500"
                    : "border-red-500/30 bg-red-500/10 text-red-500"
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.status === "success" ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">
                      {result.status === "success"
                        ? `Checked in ${result.attendeeName}`
                        : result.status === "already"
                        ? result.message
                        : result.message}
                    </p>
                    {"ticketCode" in result && (
                      <p className="mt-1 text-xs opacity-80">{result.ticketCode}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <Ticket className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Session</h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{session.user.fullName}</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2">
                <span className="text-muted-foreground">Username</span>
                <span className="font-medium">{session.user.username}</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2">
                <span className="text-muted-foreground">Gate</span>
                <span className="font-medium">{session.user.gateName}</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2">
                <span className="text-muted-foreground">Last login</span>
                <span className="font-medium">
                  {session.user.lastLoginAt ? formatDateTime(session.user.lastLoginAt) : "-"}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Recent checks</h2>
          </div>

          <div className="space-y-3">
            {session.recentScans.length === 0 ? (
              <p className="text-sm text-muted-foreground">No scans yet.</p>
            ) : (
              session.recentScans.map((scan) => (
                <div
                  key={scan.id}
                  className="flex flex-col gap-2 rounded-lg border border-border bg-background px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">
                      {scan.attendeeName ?? "Unknown attendee"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {scan.code} · {scan.ticketType ?? "Ticket"} · {scan.gateName}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDateTime(scan.scannedAt)}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
