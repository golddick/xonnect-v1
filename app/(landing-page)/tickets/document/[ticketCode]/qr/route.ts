import { prisma } from "@/lib/db/prisma"
import { buildTicketPayload, createTicketQrPng } from "@/lib/ticket-media"

// Needs the Node runtime: Prisma + the `sharp` logo compositing in
// `createTicketQrPng` are not edge-compatible.
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const db = prisma as any

/**
 * Serves the scannable venue QR for a ticket as a real PNG over HTTPS.
 *
 * Confirmation emails reference this URL directly (`<img src=".../qr">`) because
 * email clients render neither SVG nor `data:` URI images — a hosted raster is
 * the only thing that shows up. The QR encodes the same payload the check-in
 * scanner expects (`buildTicketPayload`), so it is scannable at the gate.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ticketCode: string }> }
) {
  const { ticketCode } = await params
  if (!ticketCode) {
    return new Response("Not found", { status: 404 })
  }

  // Mirror the ticket-document lookup: try the purchase-level code first, then
  // fall back to a per-seat ticket item code.
  let purchase = await db.creatorEventTicketPurchase.findUnique({
    where: { ticketCode },
    include: { ticket: { select: { id: true, eventId: true, access: true } } },
  })

  if (!purchase) {
    const ticketItem = await db.creatorEventTicketItem.findUnique({
      where: { ticketCode },
      include: {
        purchase: {
          include: { ticket: { select: { id: true, eventId: true, access: true } } },
        },
      },
    })

    if (ticketItem?.purchase) {
      purchase = ticketItem.purchase
    }
  }

  // Only venue tickets carry a QR; streaming tickets use a plain code.
  if (!purchase || purchase.ticket?.access !== "VENUE") {
    return new Response("Not found", { status: 404 })
  }

  const payload = buildTicketPayload({
    eventId: purchase.ticket.eventId,
    ticketId: purchase.ticket.id,
    purchaseId: purchase.id,
    ticketCode,
    quantity: 1,
  })

  try {
    const png = await createTicketQrPng(payload)

    return new Response(new Uint8Array(png), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Length": String(png.length),
        // Immutable per code — safe to cache aggressively at the client/CDN.
        "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
      },
    })
  } catch (error) {
    console.error("Failed to render ticket QR PNG:", error)
    return new Response("Failed to render QR", { status: 500 })
  }
}
