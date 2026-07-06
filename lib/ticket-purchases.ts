import { dropid } from "dropid"

import { prisma } from "@/lib/db/prisma"
import { CreatorEventTicketAccessType } from "@/lib/generated/prisma"
import { createPurchaseTicketCode, createTicketItemCode } from "@/lib/paystack"
import { sendTicketConfirmationEmail } from "@/lib/auth/notifications"

const db = prisma as any

export type TicketPurchaseParticipant = {
  buyerName: string
  buyerEmail: string
  buyerPhone?: string | null
}

export function calculateRevenueSplit(amount: number, platformFeePercentage: number) {
  const safeAmount = Math.max(Math.round(amount), 0)
  const safeFeePercentage = Math.max(Math.round(platformFeePercentage), 0)
  const platformFeeAmount = Math.round((safeAmount * safeFeePercentage) / 100)
  const creatorRevenueAmount = Math.max(safeAmount - platformFeeAmount, 0)

  return {
    amount: safeAmount,
    platformFeeAmount,
    creatorRevenueAmount,
  }
}

export async function getCreatorTicketFeePercentage(ticketId: string) {
  const ticket = await db.creatorEventTicket.findUnique({
    where: { id: ticketId },
    select: {
      access: true,
      event: {
        select: {
          creator: {
            select: {
              eventStreamPayout: true,
              eventVenuePayout: true,
            },
          },
        },
      },
    },
  })

  if (!ticket) {
    throw new Error("Ticket not found")
  }

  const creator = ticket.event?.creator
  if (!creator) {
    throw new Error("Creator not found for ticket")
  }

  return ticket.access === CreatorEventTicketAccessType.VENUE
    ? creator.eventVenuePayout
    : creator.eventStreamPayout
}

export async function completePurchase(args: {
  purchaseId: string
  ticketId: string
  eventId: string
  amount: number
  reference: string
  buyer: TicketPurchaseParticipant
  currency?: string
}) {
  const existing = await db.creatorEventTicketPurchase.findUnique({
    where: { id: args.purchaseId },
    select: { id: true, status: true, quantity: true },
  })

  if (!existing) {
    throw new Error("Purchase record not found")
  }

  if (existing.status === "COMPLETED") {
    return { alreadyCompleted: true }
  }

  const ticket = await db.creatorEventTicket.findUnique({
    where: { id: args.ticketId },
    select: {
      quantity: true,
      soldCount: true,
      status: true,
      access: true,
      eventId: true,
      platformFee: true,
      event: {
        select: {
          creator: {
            select: {
              eventStreamPayout: true,
              eventVenuePayout: true,
            },
          },
        },
      },
    },
  })

  if (!ticket) {
    throw new Error("Ticket not found")
  }

  const feePercentage = ticket.event?.creator
    ? ticket.access === CreatorEventTicketAccessType.VENUE
      ? ticket.event.creator.eventVenuePayout
      : ticket.event.creator.eventStreamPayout
    : 0

  const revenueSplit = calculateRevenueSplit(args.amount, feePercentage)
  const ticketCode = createPurchaseTicketCode(args.ticketId, args.reference)

  const purchaseQuantity = Math.max(existing.quantity ?? 1, 1)

  if (ticket.soldCount >= ticket.quantity) {
    throw new Error("Ticket is sold out")
  }

  if (ticket.soldCount + purchaseQuantity > ticket.quantity) {
    throw new Error("Ticket is sold out")
  }

  const shouldMarkSoldOut = ticket.soldCount + purchaseQuantity >= ticket.quantity

  await db.$transaction(async (tx: any) => {
    await tx.creatorEventTicketPurchase.update({
      where: { id: args.purchaseId },
      data: {
        buyerName: args.buyer.buyerName,
        buyerEmail: args.buyer.buyerEmail,
        buyerPhone: args.buyer.buyerPhone ?? null,
        quantity: purchaseQuantity,
        amount: revenueSplit.amount,
        currency: args.currency ?? "NGN",
        status: "COMPLETED",
        transactionId: args.reference,
        ticketCode,
      },
    })

    const ticketItems = [] as { ticketCode: string }[]
    for (let index = 0; index < purchaseQuantity; index += 1) {
      const ticketItemCode = createTicketItemCode(args.ticketId, args.reference, index)
      ticketItems.push({ ticketCode: ticketItemCode })
      await tx.creatorEventTicketItem.create({
        data: {
          id: dropid("ticketItem"),
          purchaseId: args.purchaseId,
          ticketId: args.ticketId,
          ticketCode: ticketItemCode,
          quantity: 1,
        },
      })
    }

    await tx.creatorEventTicket.update({
      where: { id: args.ticketId },
      data: {
        soldCount: { increment: purchaseQuantity },
        revenue: { increment: revenueSplit.amount },
        platformFee: { increment: revenueSplit.platformFeeAmount },
        ...(shouldMarkSoldOut ? { status: "SOLD_OUT" } : {}),
      },
    })

    await tx.creatorEvent.update({
      where: { id: args.eventId },
      data: {
        revenue: { increment: revenueSplit.creatorRevenueAmount },
        platformFee: { increment: revenueSplit.platformFeeAmount },
      },
    })
  })

  const completedPurchase = await db.creatorEventTicketPurchase.findUnique({
    where: { id: args.purchaseId },
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
      ticketItems: {
        select: {
          ticketCode: true,
        },
      },
    },
  })

  if (completedPurchase) {
    sendTicketConfirmationEmail({
      email: completedPurchase.buyerEmail,
      fullName: completedPurchase.buyerName,
      eventId: completedPurchase.ticket.event.id,
      eventTitle: completedPurchase.ticket.event.title,
      eventScheduledAt: completedPurchase.ticket.event.scheduledAt?.toISOString() ?? null,
      location:
        completedPurchase.ticket.event.locationFullAddress ??
        completedPurchase.ticket.event.locationName ??
        completedPurchase.ticket.event.address ??
        null,
      ticketId: completedPurchase.ticket.id,
      ticketType: completedPurchase.ticket.ticketType,
      access: completedPurchase.ticket.access,
      quantity: completedPurchase.quantity,
      amount: completedPurchase.amount,
      ticketCode: completedPurchase.ticketCode,
      purchaseId: completedPurchase.id,
      ticketItemCodes: (completedPurchase.ticketItems as Array<{ ticketCode: string }>).map((item) => item.ticketCode),
    }).catch((error) => {
      console.error("Failed to send ticket confirmation email:", error)
    })
  }

  return {
    alreadyCompleted: false,
    feePercentage,
    platformFeeAmount: revenueSplit.platformFeeAmount,
    creatorRevenueAmount: revenueSplit.creatorRevenueAmount,
    ticketCode,
    ticketItemCodes: Array.from({ length: purchaseQuantity }, (_, index) =>
      createTicketItemCode(args.ticketId, args.reference, index)
    ),
  }
}

export async function createPendingPurchase(args: {
  ticketId: string
  amount: number
  buyer: TicketPurchaseParticipant
  quantity?: number
  reference?: string
  currency?: string
}) {
  const reference = args.reference ?? dropid("pay")
  const ticketCode = createPurchaseTicketCode(args.ticketId, reference)

  const purchase = await db.creatorEventTicketPurchase.create({
    data: {
      id:dropid("purchase"),
      ticketId: args.ticketId,
      buyerName: args.buyer.buyerName,
      buyerEmail: args.buyer.buyerEmail,
      buyerPhone: args.buyer.buyerPhone ?? null,
      quantity: Math.max(Math.round(args.quantity ?? 1), 1),
      amount: Math.max(Math.round(args.amount), 0),
      currency: args.currency ?? "NGN",
      status: "PENDING",
      transactionId: reference,
      ticketCode,
    },
  })

  return {
    purchase,
    reference,
    ticketCode,
  }
}
