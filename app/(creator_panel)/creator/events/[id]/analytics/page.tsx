"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Copy, Loader2, Radio, RefreshCw, Ticket, Users, Eye, DollarSign } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type AnalyticsTicketSale = {
  id: string
  ticketType: string
  access: string
  status: string
  price: number
  quantity: number
  soldCount: number
  revenue: number
  completedSales: number
  refundedSales: number
  availableSlots: number
}

type AnalyticsCheckInUser = {
  id: string
  fullName: string
  email: string
  gateName: string
  status: string
  scansToday: number
  totalScans: number
  lastLoginAt: string | null
}

type AnalyticsResponse = {
  analytics: {
    event: {
      id: string
      title: string
      status: string
      category: string
      scheduledAt: string | null
      timezone: string
      durationMinutes: number
      livekitRoomName: string | null
      ingressId: string | null
      streamKey: string | null
      rtmpUrl: string | null
      recordingEnabled: boolean
      recordingStatus: string
      recordingUrl: string | null
      recordingStartedAt: string | null
      recordingEndedAt: string | null
      revenue: number
      viewsCount: number
      likesCount: number
      commentsCount: number
      peakViewersCount: number
      currentViewersCount: number
      venueParticipantCount: number
    }
    summary: {
      totalTicketRevenue: number
      totalSales: number
      totalRefunds: number
      checkInUsers: number
      successfulScans: number
      duplicateScans: number
      invalidScans: number
    }
    ticketSales: AnalyticsTicketSale[]
    checkInUsers: AnalyticsCheckInUser[]
    recentScans: Array<{
      id: string
      attendeeName: string | null
      attendeeEmail: string | null
      gateName: string | null
      status: string
      scannedAt: string
    }>
    totals: {
      users: number
      activeUsers: number
      inactiveUsers: number
      scans: number
      successfulScans: number
      duplicateScans: number
      invalidScans: number
    }
  }
}

export default function EventAnalyticsPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const eventId = params.id

  const [analytics, setAnalytics] = useState<AnalyticsResponse["analytics"] | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState("")

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await fetch(`/api/creator/events/${eventId}/analytics`, { cache: "no-store" })
      const data = (await response.json()) as AnalyticsResponse & { message?: string }

      if (!response.ok) {
        throw new Error(data.message ?? "Failed to load analytics")
      }

      setAnalytics(data.analytics)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load analytics")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (eventId) {
      loadAnalytics()
    }
  }, [eventId])

  const generateStreamKey = async () => {
    try {
      setGenerating(true)
      const response = await fetch(`/api/creator/events/${eventId}/livekit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message ?? "Failed to generate LiveKit ingress")
      }

      await loadAnalytics()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate LiveKit ingress")
    } finally {
      setGenerating(false)
    }
  }

  const copyToClipboard = async (value: string | null | undefined) => {
    if (!value) return
    await navigator.clipboard.writeText(value)
  }

  const webSocketUrl = process.env.NEXT_PUBLIC_LIVEKIT_WS_URL ?? ""

  const ticketSummary = useMemo(() => {
    if (!analytics) return { sold: 0, revenue: 0 }

    return analytics.ticketSales.reduce(
      (acc, ticket) => {
        acc.sold += ticket.completedSales
        acc.revenue += ticket.revenue
        return acc
      },
      { sold: 0, revenue: 0 }
    )
  }, [analytics])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-red-500" />
          <p className="text-muted-foreground">Loading event analytics...</p>
        </div>
      </div>
    )
  }

  if (error && !analytics) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => loadAnalytics()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!analytics) return null

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </button>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{analytics.event.title}</h1>
            <p className="text-muted-foreground mt-2">
              {analytics.event.category} - {analytics.event.status}
            </p>
          </div>

          <button
            type="button"
            onClick={generateStreamKey}
            disabled={generating}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Generate Stream Key
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="bg-card border border-border rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Views</p>
                  <p className="text-2xl font-bold">{analytics.event.viewsCount.toLocaleString()}</p>
                </div>
                <Eye className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Venue Participants</p>
                  <p className="text-2xl font-bold">{analytics.event.venueParticipantCount.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Ticket Sales</p>
                  <p className="text-2xl font-bold">{ticketSummary.sold.toLocaleString()}</p>
                </div>
                <Ticket className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Revenue</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    NGN {(analytics.summary.totalTicketRevenue + analytics.event.revenue).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border border-border rounded-2xl">
          <CardHeader>
            <CardTitle className="text-foreground">LiveKit Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">RTMP URL</label>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={analytics.event.rtmpUrl ?? "Generate stream key to create RTMP URL"}
                    className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(analytics.event.rtmpUrl)}
                    className="border border-border rounded-lg px-3 py-2 hover:bg-muted"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Stream Key</label>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={analytics.event.streamKey ?? "Click generate to create"}
                    className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(analytics.event.streamKey)}
                    className="border border-border rounded-lg px-3 py-2 hover:bg-muted"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Ingress ID</label>
                <input
                  readOnly
                  value={analytics.event.ingressId ?? "Not generated"}
                  className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Room Name</label>
                <input
                  readOnly
                  value={analytics.event.livekitRoomName ?? "Not generated"}
                  className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">WebSocket URL</label>
                <input
                  readOnly
                  value={webSocketUrl || "NEXT_PUBLIC_LIVEKIT_WS_URL not set"}
                  className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Recording Status</label>
                <input
                  readOnly
                  value={analytics.event.recordingStatus}
                  className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="bg-card border border-border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-foreground">Ticket Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="py-2 pr-4">Type</th>
                      <th className="py-2 pr-4">Sold</th>
                      <th className="py-2 pr-4">Revenue</th>
                      <th className="py-2 pr-4">Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.ticketSales.map((ticket) => (
                      <tr key={ticket.id} className="border-b border-border/50">
                        <td className="py-3 pr-4 font-medium">{ticket.ticketType}</td>
                        <td className="py-3 pr-4">{ticket.completedSales}</td>
                        <td className="py-3 pr-4">NGN {ticket.revenue.toLocaleString()}</td>
                        <td className="py-3 pr-4">{ticket.access}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-foreground">Check-In Crew</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.checkInUsers.map((user) => (
                  <div key={user.id} className="border border-border rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{user.fullName}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-sm text-muted-foreground">{user.gateName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{user.status}</p>
                      <p className="text-xs text-muted-foreground">{user.totalScans} scans</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border border-border rounded-2xl">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-2 pr-4">Attendee</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Gate</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.recentScans.map((scan) => (
                    <tr key={scan.id} className="border-b border-border/50">
                      <td className="py-3 pr-4">{scan.attendeeName ?? "Unknown"}</td>
                      <td className="py-3 pr-4">{scan.attendeeEmail ?? "-"}</td>
                      <td className="py-3 pr-4">{scan.gateName ?? "-"}</td>
                      <td className="py-3 pr-4">{scan.status}</td>
                      <td className="py-3 pr-4">{new Date(scan.scannedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {error && <p className="text-red-400">{error}</p>}
      </div>
    </div>
  )
}
