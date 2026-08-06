import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarDays, CircleDollarSign, MapPin, Ticket, Users } from "lucide-react"

import { prisma } from "@/lib/db/prisma"
import { buildTicketPayload, createTicketQrDataUrl } from "@/lib/ticket-media"
import { TicketDownloadButton } from "@/components/ticket-download-button"

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

  let purchase = await db.creatorEventTicketPurchase.findUnique({
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
      ticketItems: true,
    },
  })

  if (!purchase) {
    const ticketItem = await db.creatorEventTicketItem.findUnique({
      where: { ticketCode },
      include: {
        purchase: {
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
            ticketItems: true,
          },
        },
      },
    })

    if (!ticketItem) {
      notFound()
    }

    purchase = ticketItem.purchase
  }

  const event = purchase.ticket.event
  const location =
    event.locationFullAddress ??
    event.locationName ??
    event.address ??
    event.locationCountry ??
    "Online"

  const ticketCodes =
    purchase.ticketItems && purchase.ticketItems.length > 0
      ? purchase.ticketItems.map((item) => item.ticketCode)
      : [purchase.ticketCode]

  const qrImageDataUrls: string[] = []

  if (purchase.ticket.access === "VENUE") {
    try {
      for (const ticketCodeItem of ticketCodes) {
        const qrImageDataUrl = await createTicketQrDataUrl(
          buildTicketPayload({
            eventId: event.id,
            ticketId: purchase.ticket.id,
            purchaseId: purchase.id,
            ticketCode: ticketCodeItem,
            quantity: 1,
          })
        )

        qrImageDataUrls.push(qrImageDataUrl)
      }
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
          <TicketDownloadButton
            ticketCode={purchase.ticketCode}
            eventTitle={event.title}
            location={location}
            date={formatDate(event.scheduledAt)}
            quantity={purchase.quantity}
            total={formatCurrency(purchase.amount)}
            ticketType={purchase.ticket.ticketType}
            ticketCodes={ticketCodes}
            qrImageDataUrls={qrImageDataUrls}
          />
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
                  <span>{ticketCodes.length > 1 ? "Ticket codes" : "Ticket code"}</span>
                </div>
                <div className="mt-3 space-y-2 text-sm font-semibold text-foreground">
                  {ticketCodes.map((code) => (
                    <p key={code} className="break-all">{code}</p>
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {purchase.ticket.access === "VENUE"
                    ? "Present the QR ticket(s) at the gate."
                    : "Use this code for streaming access."}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-background p-5">
              {qrImageDataUrls.length > 0 ? (
                <div className="grid gap-4 w-full">
                  {qrImageDataUrls.map((url, index) => (
                    <img
                      key={`${url}-${index}`}
                      src={url}
                      alt={`Ticket QR code ${index + 1}`}
                      className="w-full max-w-[320px]"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex h-[320px] w-full max-w-[320px] items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                  Streaming ticket document
                </div>
              )}
              <p className="mt-4 text-center text-sm text-muted-foreground">
                {purchase.ticket.access === "VENUE"
                  ? "Each QR code is unique to a ticket and should be scanned individually at the venue gate."
                  : "This document stores your ticket code and purchase details."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
