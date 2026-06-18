import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarDays, CircleDollarSign, MapPin, Ticket, Users } from "lucide-react"

import { prisma } from "@/lib/db/prisma"
import { buildTicketPayload, createTicketQrDataUrl } from "@/lib/ticket-media"

const db = prisma as any

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
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

export default async function TicketDocumentPage({
  params,
}: {
  params: Promise<{ ticketCode: string }>
}) {
  const { ticketCode } = await params

  const purchase = await db.creatorEventTicketPurchase.findUnique({
    where: { ticketCode },
    include: {
      ticket: {
        include: {
          event: {
            include: {
              creator: {
                include: {
                  profile: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!purchase) {
    notFound()
  }

  const event = purchase.ticket.event
  const location =
    event.locationFullAddress ??
    event.locationName ??
    event.address ??
    event.locationCountry ??
    "Online"

  let qrImageDataUrl: string | null = null

  if (purchase.ticket.access === "VENUE") {
    try {
      qrImageDataUrl = await createTicketQrDataUrl(
        buildTicketPayload({
          eventId: event.id,
          ticketId: purchase.ticket.id,
          purchaseId: purchase.id,
          ticketCode: purchase.ticketCode,
          quantity: purchase.quantity,
        })
      )
    } catch (error) {
      console.error("Failed to build ticket QR image:", error)
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link href="/tickets" className="text-sm text-muted-foreground hover:text-foreground">
            Back to tickets
          </Link>
          <span className="text-sm text-muted-foreground">Ticket document</span>
        </div>

        <section className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Xonnect Ticket Pass
            </p>
            <h1 className="mt-2 text-2xl font-semibold">{event.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {purchase.ticket.access === "VENUE" ? "Venue pass" : "Streaming pass"} for {purchase.ticket.ticketType}
            </p>
          </div>

          <div className="grid gap-6 p-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
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
                  <p className="mt-2 text-sm font-medium">{location}</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Quantity</span>
                  </div>
                  <p className="mt-2 text-sm font-medium">{purchase.quantity}</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CircleDollarSign className="h-4 w-4" />
                    <span>Total</span>
                  </div>
                  <p className="mt-2 text-sm font-medium">{formatCurrency(purchase.amount)}</p>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Ticket className="h-4 w-4" />
                  <span>Ticket code</span>
                </div>
                <p className="mt-2 break-all text-xl font-semibold tracking-[0.18em]">{purchase.ticketCode}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {purchase.ticket.access === "VENUE"
                    ? "Present the QR ticket at the gate."
                    : "Use this code for streaming access."}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-background p-5">
              {qrImageDataUrl ? (
                <img
                  src={qrImageDataUrl}
                  alt="Ticket QR code"
                  className="w-full max-w-[320px]"
                />
              ) : (
                <div className="flex h-[320px] w-full max-w-[320px] items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                  Streaming ticket document
                </div>
              )}
              <p className="mt-4 text-center text-sm text-muted-foreground">
                {purchase.ticket.access === "VENUE"
                  ? "This QR ticket includes the platform logo at the center for venue verification."
                  : "This document stores your ticket code and purchase details."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
