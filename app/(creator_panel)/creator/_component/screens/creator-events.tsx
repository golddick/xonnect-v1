"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  Bell,
  DollarSign,
  Eye,
  HouseIcon,
  Menu,
  Plus,
  Search,
  Ticket,
  Users,
  X,
  Zap,
} from "lucide-react"
import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { sidebarItems } from "@/lib/constant"

type EventListItem = {
  id: string
  title: string
  description: string | null
  status: string
  scheduledAt: string | null
  thumbnailUrl: string | null
  viewsCount: number
  revenue: number
  venueParticipantCount: number
  currentViewersCount: number
  peakViewersCount: number
  ingressId: string | null
  streamKey: string | null
  livekitRoomName: string | null
  _count?: {
    tickets: number
    checkInUsers: number
    restrictedLocations: number
    checkInScans: number
  }
}

type EventsResponse = {
  events: EventListItem[]
}

export default function CreatorEvents() {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [events, setEvents] = useState<EventListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/creator/events", { cache: "no-store" })
        const data = (await response.json()) as EventsResponse & { message?: string }

        if (!response.ok) {
          throw new Error(data.message ?? "Failed to load events")
        }

        setEvents(data.events ?? [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load events")
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description ?? "").toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTab = activeTab === "all" || event.status.toLowerCase() === activeTab

      return matchesSearch && matchesTab
    })
  }, [activeTab, events, searchTerm])

  const summary = useMemo(() => {
    return events.reduce(
      (acc, event) => {
        const status = event.status.toLowerCase()
        if (status === "live") acc.live += 1
        if (status === "scheduled") acc.scheduled += 1
        if (status === "ended") acc.ended += 1
        acc.revenue += event.revenue ?? 0
        acc.venueParticipants += event.venueParticipantCount ?? 0
        acc.viewers += event.currentViewersCount ?? 0
        return acc
      },
      { live: 0, scheduled: 0, ended: 0, revenue: 0, venueParticipants: 0, viewers: 0 }
    )
  }, [events])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">Xonnect</span>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => router.push(item.route)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    pathname === item.route
                      ? "bg-red-600/20 text-red-400 border border-red-600/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="border-b border-border bg-transparent backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Events</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative border border-muted rounded-lg p-2.5 hover:bg-muted transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full" />
              </button>
              <ThemeToggle />
              <button
                onClick={() => router.push("/creator/events/new")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Event</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Live Now</p>
                  <p className="text-2xl font-bold text-red-400">{summary.live}</p>
                </div>
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Viewers</p>
                  <p className="text-2xl font-bold text-foreground">{summary.viewers.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Venue participants</p>
                  <p className="text-2xl font-bold text-foreground">{summary.venueParticipants.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <HouseIcon className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Event Revenue</p>
                  <p className="text-2xl font-bold text-yellow-500">NGN {summary.revenue.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl">
            <div className="flex flex-col lg:flex-row gap-4 p-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border border-muted p-2.5 rounded-lg pl-10 pr-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div className="flex gap-2">
                {["all", "live", "scheduled", "ended"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                      activeTab === tab
                        ? "bg-red-600 text-white"
                        : "border-muted border p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-16 text-muted-foreground">Loading events...</div>
          )}

          {error && !loading && (
            <div className="text-center py-16 text-red-400">{error}</div>
          )}

          {!loading && !error && filteredEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-foreground line-clamp-2">{event.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                        {event.description ?? "No description yet"}
                      </p>
                    </div>
                    <Ticket className="w-5 h-5 text-red-500 flex-shrink-0" />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.status.toLowerCase() === "live"
                          ? "bg-red-600/20 text-red-400"
                          : event.status.toLowerCase() === "scheduled"
                          ? "bg-blue-600/20 text-blue-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {event.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {event.scheduledAt ? new Date(event.scheduledAt).toLocaleString() : "Unscheduled"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-muted-foreground">Views</p>
                      <p className="font-semibold">{(event.viewsCount ?? 0).toLocaleString()}</p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-semibold">NGN {(event.revenue ?? 0).toLocaleString()}</p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-muted-foreground">Tickets</p>
                      <p className="font-semibold">{event._count?.tickets ?? 0}</p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-muted-foreground">Crew</p>
                      <p className="font-semibold">{event._count?.checkInUsers ?? 0}</p>
                    </div>
                  </div>

                  <div className="flex gap-2"> 
                    <Link
                      href={`/creator/events/${event.id}/edit`}
                      className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/creator/events/${event.id}/analytics`}
                      className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? "Try adjusting your search terms" : "Create your first event to get started"}
              </p>
              <button
                onClick={() => router.push("/creator/events/new")}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Create Your First Event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
