export type PublicTicketAccess = "STREAM" | "VENUE"

export type PublicTicketItem = {
  id: string
  ticketType: string
  access: PublicTicketAccess
  price: number
  quantity: number
  soldCount: number
  revenue: number
  description: string | null
  benefits: string[]
  status: string
  remaining: number
  isSoldOut: boolean
}

export type PublicTicketCreator = {
  id: string
  fullName: string
  avatarUrl: string | null
}

export type PublicTicketEvent = {
  id: string
  title: string
  description: string | null
  category: string
  status: string
  scheduledAt: string | null
  timezone: string
  address: string | null
  locationName: string | null
  locationFullAddress: string | null
  locationCountry: string | null
  locationState: string | null
  locationType: string | null
  thumbnailUrl: string | null
  thumbnailVideoUrl: string | null
  creator: PublicTicketCreator
  tickets: PublicTicketItem[]
  ticketCount: number
  totalSold: number
  totalCapacity: number
  minPrice: number
  maxPrice: number
  totalRevenue: number
  isHybrid: boolean
  eventType: "streaming" | "venue" | "hybrid"
}

function toDisplayName(fullName?: string | null, email?: string | null) {
  const trimmedName = fullName?.trim()
  if (trimmedName) return trimmedName

  const trimmedEmail = email?.trim()
  if (!trimmedEmail) return "Creator"

  return trimmedEmail.split("@")[0] ?? "Creator"
}

function normalizeAccess(access?: string | null): PublicTicketAccess {
  return (access ?? "STREAM").toString().toUpperCase() === "VENUE" ? "VENUE" : "STREAM"
}

function deriveEventType(tickets: PublicTicketItem[]): PublicTicketEvent["eventType"] {
  const hasVenue = tickets.some((ticket) => ticket.access === "VENUE")
  const hasStream = tickets.some((ticket) => ticket.access === "STREAM")

  if (hasVenue && hasStream) return "hybrid"
  if (hasVenue) return "venue"
  return "streaming"
}

export function serializePublicTicketEvent(event: any): PublicTicketEvent {
  const tickets: PublicTicketItem[] = (event.tickets ?? [])
    .map((ticket: any) => {
      const remaining = Math.max((ticket.quantity ?? 0) - (ticket.soldCount ?? 0), 0)

      return {
        id: ticket.id,
        ticketType: ticket.ticketType,
        access: normalizeAccess(ticket.access),
        price: ticket.price ?? 0,
        quantity: ticket.quantity ?? 0,
        soldCount: ticket.soldCount ?? 0,
        revenue: ticket.revenue ?? 0,
        description: ticket.description ?? null,
        benefits: Array.isArray(ticket.benefits) ? ticket.benefits.map(String) : [],
        status: ticket.status ?? "ACTIVE",
        remaining,
        isSoldOut: remaining <= 0 || (ticket.status ?? "").toString().toUpperCase() === "SOLD_OUT",
      }
    })
    .sort((left: PublicTicketItem, right: PublicTicketItem) => {
      if (left.access !== right.access) {
        return left.access === "VENUE" ? -1 : 1
      }
      return left.price - right.price
    })

  const prices = tickets.map((ticket) => ticket.price).filter((price) => Number.isFinite(price))
  const totalSold = tickets.reduce((sum, ticket) => sum + ticket.soldCount, 0)
  const totalCapacity = tickets.reduce((sum, ticket) => sum + ticket.quantity, 0)
  const totalRevenue = tickets.reduce((sum, ticket) => sum + ticket.revenue, 0)

  return {
    id: event.id,
    title: event.title,
    description: event.description ?? null,
    category: event.category ?? "general",
    status: event.status ?? "SCHEDULED",
    scheduledAt: event.scheduledAt ? new Date(event.scheduledAt).toISOString() : null,
    timezone: event.timezone ?? "Africa/Lagos",
    address: event.address ?? null,
    locationName: event.locationName ?? null,
    locationFullAddress: event.locationFullAddress ?? null,
    locationCountry: event.locationCountry ?? null,
    locationState: event.locationState ?? null,
    locationType: event.locationType ?? null,
    thumbnailUrl: event.thumbnailUrl ?? null,
    thumbnailVideoUrl: event.thumbnailVideoUrl ?? null,
    creator: {
      id: event.creator?.id ?? "",
      fullName: toDisplayName(event.creator?.profile?.fullName, event.creator?.profile?.email),
      avatarUrl: event.creator?.profile?.avatarUrl ?? null,
    },
    tickets,
    ticketCount: tickets.length,
    totalSold,
    totalCapacity,
    minPrice: prices.length > 0 ? Math.min(...prices) : 0,
    maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
    totalRevenue,
    isHybrid: tickets.some((ticket) => ticket.access === "VENUE") && tickets.some((ticket) => ticket.access === "STREAM"),
    eventType: deriveEventType(tickets),
  }
}
