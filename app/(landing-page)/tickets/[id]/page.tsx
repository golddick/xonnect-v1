"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Loader2,
  MapPin,
  Play,
  Ticket,
  Users,
  Video,
} from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PublicTicketEvent, PublicTicketItem } from "@/lib/tickets"
import LoadingSplash from "@/components/splash_screen/loading-splash"

type EventResponse = {
  event: PublicTicketEvent
}

type SessionResponse = {
  user?: {
    email?: string | null
    name?: string | null
  } | null
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
    weekday: "short",
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

function getYouTubeVideoId(videoUrl: string) {
  try {
    const url = new URL(videoUrl)
    const hostname = url.hostname.replace(/^www\./, "")
    const isYouTubeHost =
      hostname === "youtube.com" ||
      hostname.endsWith(".youtube.com") ||
      hostname === "youtube-nocookie.com" ||
      hostname.endsWith(".youtube-nocookie.com")

    if (hostname === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] ?? null
    }

    if (isYouTubeHost) {
      if (url.pathname.startsWith("/watch")) {
        return url.searchParams.get("v")
      }

      const pathParts = url.pathname.split("/").filter(Boolean)
      const shortFormId = pathParts[1] ?? pathParts[0] ?? null

      if (pathParts[0] === "embed" || pathParts[0] === "shorts" || pathParts[0] === "live") {
        return shortFormId
      }
    }
  } catch {
    return null
  }

  return null
}

function getYouTubeEmbedUrl(videoUrl: string) {
  const videoId = getYouTubeVideoId(videoUrl)
  if (!videoId) return null

  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`
}

function TicketHeroMedia({
  title,
  thumbnailUrl,
  videoUrl,
}: {
  title: string
  thumbnailUrl: string | null
  videoUrl: string | null
}) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [thumbnailUrl, videoUrl])

  const youtubeEmbedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null
  const poster = thumbnailUrl || null
  const hasVideo = Boolean(videoUrl)

  if (!hasVideo) {
    return poster ? (
      <img
        src={poster}
        alt={title}
        className="h-full w-full object-cover"
        onError={(eventImage) => {
          ;(eventImage.target as HTMLImageElement).style.display = "none"
        }}
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center">
        <Video className="h-14 w-14 text-muted-foreground" />
      </div>
    )
  }

  if (youtubeEmbedUrl) {
    if (!isOpen) {
      return (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative h-full w-full overflow-hidden text-left"
        >
          {poster ? (
            <img src={poster} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Video className="h-14 w-14 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg">
              <Play className="h-7 w-7 fill-current" />
            </div>
          </div>
        </button>
      )
    }

    return (
      <iframe
        src={youtubeEmbedUrl}
        title={title}
        className="h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    )
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative h-full w-full overflow-hidden text-left"
      >
        {poster ? (
          <img src={poster} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <Video className="h-14 w-14 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg">
            <Play className="h-7 w-7 fill-current" />
          </div>
        </div>
      </button>
    )
  }

  return (
    <video
      src={videoUrl ?? ""}
      poster={poster ?? undefined}
      controls
      autoPlay
      playsInline
      className="h-full w-full object-cover"
    />
  )
}

export default function TicketDetailsPage() {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const eventId = params.id

  const [event, setEvent] = useState<PublicTicketEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [selectedTicketId, setSelectedTicketId] = useState("")
  const [buyerName, setBuyerName] = useState("")
  const [buyerEmail, setBuyerEmail] = useState("")
  const [buyerPhone, setBuyerPhone] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [submitting, setSubmitting] = useState(false)

  const reference = searchParams.get("reference")

  useEffect(() => {
    let active = true

    async function loadEvent() {
      try {
        setLoading(true)
        setError("")

        const response = await fetch(`/api/tickets/${eventId}`, {
          cache: "no-store",
        })
        const data = (await response.json()) as EventResponse & { message?: string }

        if (!response.ok) {
          throw new Error(data.message ?? "Failed to load event")
        }

        if (active) {
          setEvent(data.event)
          setSelectedTicketId(data.event.tickets[0]?.id || "")
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load event")
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadEvent()

    return () => {
      active = false
    }
  }, [eventId])

  useEffect(() => {
    let active = true

    async function loadSession() {
      try {
        const response = await fetch("/api/auth/session", { cache: "no-store" })
        const data = (await response.json()) as SessionResponse

        if (!active) return

        const email = data.user?.email?.trim()
        const name = data.user?.name?.trim()

        if (email) {
          setBuyerEmail((current) => current || email)
        }

        if (name) {
          setBuyerName((current) => current || name)
        }
      } catch {
        // Session lookup is best-effort.
      }
    }

    void loadSession()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (reference) {
      setSuccess(`Payment reference: ${reference}`)
    }
  }, [reference])

  const selectedTicket = useMemo<PublicTicketItem | null>(() => {
    if (!event) return null
    return event.tickets.find((ticket) => ticket.id === selectedTicketId) ?? event.tickets[0] ?? null
  }, [event, selectedTicketId])

  const totalAmount = useMemo(() => {
    if (!selectedTicket) return 0
    return selectedTicket.price * quantity
  }, [quantity, selectedTicket])

  useEffect(() => {
    if (!selectedTicket) return
    setQuantity((current) => {
      const nextQuantity = Math.max(1, Math.min(current, selectedTicket.remaining))
      return nextQuantity
    })
  }, [selectedTicket])

  async function handlePurchase() {
    if (!event || !selectedTicket) return

    if (!buyerName.trim()) {
      setError("Buyer name is required")
      return
    }

    if (!buyerEmail.trim()) {
      setError("Buyer email is required")
      return
    }

    setSubmitting(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch(`/api/tickets/${event.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId: selectedTicket.id,
          buyerName: buyerName.trim(),
          buyerEmail: buyerEmail.trim(),
          buyerPhone: buyerPhone.trim() || null,
          quantity,
        }),
      })

      const data = (await response.json()) as {
        message?: string
        payment?: {
          type?: string
          authorization_url?: string
        }
      }

      if (!response.ok) {
        throw new Error(data.message ?? "Failed to start checkout")
      }

      if (data.payment?.type === "free") {
        setSuccess("Ticket reserved successfully.")
        const refreshed = await fetch(`/api/tickets/${event.id}`, { cache: "no-store" })
        const refreshedData = (await refreshed.json()) as EventResponse
        if (refreshed.ok) {
          setEvent(refreshedData.event)
        }
        return
      }

      if (data.payment?.authorization_url) {
        window.location.href = data.payment.authorization_url
        return
      }

      throw new Error("Paystack did not return a checkout URL")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start checkout")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background px-2 text-foreground">
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/tickets" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to tickets
        </Link>

        {loading ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <LoadingSplash />
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        ) : event ? (
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            <section className="space-y-6">
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="relative aspect-[16/7] border-b border-border bg-muted">
                  <TicketHeroMedia
                    title={event.title}
                    thumbnailUrl={event.thumbnailUrl}
                    videoUrl={event.thumbnailVideoUrl}
                  />

                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded-full bg-background/90 text-foreground">
                      {formatEventType(event.eventType)}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4 p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{event.creator.fullName}</p>
                      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{event.title}</h1>
                    </div>
                    <Badge variant="outline" className="w-fit rounded-full">
                      {event.category}
                    </Badge>
                  </div>

                  <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                    {event.description ?? "Event details and ticket options."}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-border bg-background p-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        <span>Date</span>
                      </div>
                      <p className="mt-2 text-sm font-medium">{formatDate(event.scheduledAt)}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-background p-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>Location</span>
                      </div>
                      <p className="mt-2 text-sm font-medium">{formatLocation(event)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-lg font-semibold">Ticket types</h2>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {event.tickets.map((ticket) => {
                    const selected = ticket.id === selectedTicketId

                    return (
                      <button
                        key={ticket.id}
                        type="button"
                        onClick={() => setSelectedTicketId(ticket.id)}
                        className={`rounded-lg border p-4 text-left transition-colors ${
                          selected
                            ? "border-primary bg-primary/10"
                            : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base font-medium">{ticket.ticketType}</h3>
                              <Badge variant="outline" className="rounded-full">
                                {ticket.access === "VENUE" ? "Venue" : "Streaming"}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {ticket.description ?? "Ticket details not provided."}
                            </p>
                          </div>
                          {selected && <CheckCircle2 className="h-5 w-5 text-primary" />}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <CircleDollarSign className="h-4 w-4" />
                            {formatCurrency(ticket.price)}
                          </span>
                          <span>{ticket.remaining} left</span>
                          {ticket.isSoldOut && <span className="text-red-500">Sold out</span>}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </section>

            <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-lg border border-border bg-card p-4">
                <h2 className="text-lg font-semibold">Checkout</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedTicket ? selectedTicket.ticketType : "Select a ticket type"}
                </p>

                <div className="mt-4 space-y-3">
                  <div className="rounded-lg border border-border bg-background p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-medium">{selectedTicket ? formatCurrency(selectedTicket.price) : "-"}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Availability</span>
                      <span className="font-medium">{selectedTicket ? selectedTicket.remaining : 0}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-medium">{selectedTicket ? formatCurrency(totalAmount) : "-"}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quantity</label>
                    <Input
                      type="number"
                      min={1}
                      max={selectedTicket?.remaining ?? 1}
                      value={quantity}
                      onChange={(event) => {
                        const nextValue = Number.parseInt(event.target.value, 10)
                        if (Number.isNaN(nextValue)) {
                          setQuantity(1)
                          return
                        }

                        const max = selectedTicket?.remaining ?? 1
                        setQuantity(Math.max(1, Math.min(nextValue, max)))
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input value={buyerName} onChange={(event) => setBuyerName(event.target.value)} placeholder="Buyer name" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      value={buyerEmail}
                      onChange={(event) => setBuyerEmail(event.target.value)}
                      placeholder="Buyer email"
                      type="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      value={buyerPhone}
                      onChange={(event) => setBuyerPhone(event.target.value)}
                      placeholder="Phone number"
                      type="tel"
                    />
                  </div>

                  {success && (
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-500">
                      {success}
                    </div>
                  )}

                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => void handlePurchase()}
                    disabled={submitting || !selectedTicket || selectedTicket.isSoldOut}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing
                      </>
                    ) : selectedTicket?.price === 0 ? (
                      "Claim free ticket"
                    ) : (
                      "Proceed to Paystack"
                    )}
                  </Button>
                </div>
              </div>

              {selectedTicket && (
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="text-sm font-medium">Included</h3>
                  {selectedTicket.benefits.length > 0 ? (
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {selectedTicket.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">No extra benefits listed.</p>
                  )}
                </div>
              )}
            </aside>
          </div>
        ) : null}
      </main>
    </div>
  )
}
