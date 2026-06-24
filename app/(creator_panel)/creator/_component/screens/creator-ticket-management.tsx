"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Bell, Edit, Eye, Menu, Plus, Search, Ticket, X, Zap } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { sidebarItems } from "@/lib/constant"
import LoadingSplash from "@/components/splash_screen/loading-splash"

type EventOption = {
  id: string
  title: string
  status: string
}

type TicketRow = {
  id: string
  ticketType: string
  access: string
  price: number
  quantity: number
  soldCount: number
  revenue: number
  description: string | null
}

export default function CreatorTicketsManagement() {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [events, setEvents] = useState<EventOption[]>([])
  const [selectedEventId, setSelectedEventId] = useState("")
  const [tickets, setTickets] = useState<TicketRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/creator/events", { cache: "no-store" })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message ?? "Failed to load events")
        }

        const mappedEvents = (data.events ?? []).map((event: { id: string; title: string; status: string }) => ({
          id: event.id,
          title: event.title,
          status: event.status,
        }))

        setEvents(mappedEvents)

        if (mappedEvents.length > 0) {
          setSelectedEventId(mappedEvents[0].id)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load events")
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  useEffect(() => {
    const loadTickets = async () => {
      if (!selectedEventId) {
        setTickets([])
        return
      }

      try {
        const response = await fetch(`/api/creator/events/${selectedEventId}/tickets`, {
          cache: "no-store",
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message ?? "Failed to load tickets")
        }

        setTickets((data.tickets ?? []).map((ticket: TicketRow) => ({
          id: ticket.id,
          ticketType: ticket.ticketType,
          access: ticket.access,
          price: ticket.price,
          quantity: ticket.quantity,
          soldCount: ticket.soldCount ?? 0,
          revenue: ticket.revenue ?? 0,
          description: ticket.description ?? null,
        })))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tickets")
      }
    }

    loadTickets()
  }, [selectedEventId])

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) =>
      ticket.ticketType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.access.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ticket.description ?? "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, tickets])

  const selectedEvent = events.find((event) => event.id === selectedEventId)

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
        <div className="border-b border-border bg-transparent backdrop-blur-sm sticky top-0 z-10 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Tickets </h1>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent ? selectedEvent.title : "Select an event "}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* <button className="relative bg-background hover:bg-muted rounded-lg p-2 transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full" />
              </button> */}
              <ThemeToggle />
              <button
                onClick={() => router.push("/creator/tickets/create")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden md:block">Create Ticket</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Event</label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full bg-transparent border border-border rounded-xl px-4 py-3"
              >
                <option value="">Select</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title} ({event.status})
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label className="block text-sm text-muted-foreground mb-2">Search </label>
              <Search className="absolute left-3 top-[3.1rem] transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border border-border rounded-xl pl-10 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          {loading && <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
             <LoadingSplash />
            </div>}
          {error && <div className="text-red-400">{error}</div>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{ticket.ticketType}</h3>
                      <p className="text-red-400 text-sm font-medium">{ticket.access}</p>
                    </div>
                    <Ticket className="w-5 h-5 text-red-500" />
                  </div>

                  <div className="space-y-3 mb-4">
                    <p className="text-muted-foreground text-sm">{ticket.description ?? "No description"}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="text-yellow-500 font-bold">NGN {ticket.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Sold:</span>
                      <span className="text-foreground font-bold">{ticket.soldCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Revenue:</span>
                      <span className="text-green-400 font-bold">NGN {ticket.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Available:</span>
                      <span className="text-blue-400 font-bold">{Math.max(ticket.quantity - ticket.soldCount, 0)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/creator/tickets/${ticket.id}/edit`)}
                      className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => router.push(`/creator/tickets/${ticket.id}/sales`)}
                      className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Sales
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && filteredTickets.length === 0 && (
            <div className="text-center py-16">
              <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No tickets found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? "Try adjusting your search terms" : "Create your first ticket to start selling"}
              </p>
              <button
                onClick={() => router.push("/creator/tickets/create")}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Create Your First Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
