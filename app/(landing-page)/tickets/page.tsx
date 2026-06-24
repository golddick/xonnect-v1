"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  CalendarDays,
  Search,
  Ticket,
  MapPin,
  Users,
  ArrowRight,
  Video,
  Building2,
  BookAIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { PublicTicketEvent } from "@/lib/tickets"
import HeroSection2 from "../_component/heroSection"

type TicketsResponse = {
  events: PublicTicketEvent[]
  total: number
}

function formatCurrency(amount: number) {
  if (amount === 0) return "Free"
  return `NGN ${amount.toLocaleString()}`
}

function formatDate(dateString: string | null) {
  if (!dateString) return "Date not set"

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return "Date not set"

  return new Intl.DateTimeFormat("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function formatLocation(event: PublicTicketEvent) {
  return (
    event.locationName ||
    event.locationFullAddress ||
    event.address ||
    event.locationCountry ||
    "Online"
  )
}

function formatEventType(eventType: PublicTicketEvent["eventType"]) {
  if (eventType === "hybrid") return "Hybrid"
  if (eventType === "venue") return "Venue"
  return "Streaming"
}

export default function TicketsPage() {
  const [events, setEvents] = useState<PublicTicketEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    let active = true

    async function loadTickets() {
      try {
        setLoading(true)
        setError("")

        const response = await fetch("/api/tickets", {
          cache: "no-store",
        })
        const data = (await response.json()) as TicketsResponse & { message?: string }

        if (!response.ok) {
          throw new Error(data.message ?? "Failed to load tickets")
        }

        if (active) {
          setEvents(data.events ?? [])
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load tickets")
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadTickets()

    return () => {
      active = false
    }
  }, [])

  const categories = useMemo(() => {
    const unique = new Set(events.map((event) => event.category).filter(Boolean))
    return ["all", ...Array.from(unique).sort((left, right) => left.localeCompare(right))]
  }, [events])

  const filteredEvents = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return events.filter((event) => {
      const matchesCategory = activeCategory === "all" || event.category.toLowerCase() === activeCategory
      const matchesSearch =
        searchTerm.length === 0 ||
        event.title.toLowerCase().includes(searchTerm) ||
        event.creator.fullName.toLowerCase().includes(searchTerm) ||
        event.description?.toLowerCase().includes(searchTerm) ||
        event.tickets.some((ticket) => ticket.ticketType.toLowerCase().includes(searchTerm))

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, events, search])

  return (
    <div className="min-h-screen bg-background text-foreground">

     <HeroSection2
          title=" Your Front Row Seat Anywhere on Earth."
          ICON={<BookAIcon className="w-5 h-5 text-red-400" />}
          iconTitle="Our Tickets "
      />

      <section className="border-b px-4 lg:px-6 border-border bg-card/40">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
          {/* <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">Tickets</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Browse public events and ticket types</h1>
          </div> */}

          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search events, creators, or ticket types"
                className="h-11 pl-10"
              />
            </div>

          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const active = activeCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex h-9 items-center rounded-full border px-3 text-sm transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category === "all" ? "All" : category}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-[360px] animate-pulse rounded-lg border border-border bg-card" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-card/40 px-6 text-center">
            <Ticket className="h-10 w-10 text-muted-foreground" />
            <p className="text-lg font-medium">No events found</p>
            <p className="max-w-md text-sm text-muted-foreground">
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <Link key={event.id} href={`/tickets/${event.id}`} className="group">
                <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors group-hover:border-primary/50">
                  <div className="relative aspect-[16/9] border-b border-border bg-muted">
                    {event.thumbnailUrl ? (
                      <img
                        src={event.thumbnailUrl}
                        alt={event.title}
                        className="h-full w-full object-cover"
                        onError={(eventImage) => {
                          ;(eventImage.target as HTMLImageElement).style.display = "none"
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Video className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}

                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="rounded-full bg-background/90 text-foreground">
                        {formatEventType(event.eventType)}
                      </Badge>
                      {event.isHybrid && (
                        <Badge className="rounded-full bg-primary text-primary-foreground">Hybrid</Badge>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <Badge variant="secondary" className="rounded-full bg-background/90 text-foreground">
                        {formatCurrency(event.minPrice)}{event.maxPrice !== event.minPrice ? ` - ${formatCurrency(event.maxPrice)}` : ""}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="line-clamp-2 text-base font-semibold">{event.title}</h2>
                        <Badge variant="outline" className="shrink-0 rounded-full">
                          {event.category}
                        </Badge>
                      </div>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {event.description ?? "Event details and ticket options."}
                      </p>
                    </div>

                    <div className="grid gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>{formatDate(event.scheduledAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{formatLocation(event)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{event.ticketCount} ticket types</span>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span className="line-clamp-1">{event.creator.fullName}</span>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-foreground">
                        Open
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
