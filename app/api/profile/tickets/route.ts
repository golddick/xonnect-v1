
import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/db/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const profile = await prisma.profile.findFirst({
      where: { email: session.user.email.toLowerCase() },
      select: { id: true, email: true },
    })

    if (!profile) {
      return NextResponse.json({ tickets: [], videos: [] })
    }

    // Get event ticket purchases
    const rawEventTickets = await prisma.creatorEventTicketPurchase.findMany({
      where: { buyerEmail: profile.email?.toLowerCase() },
      select: {
        id: true,
        purchasedAt: true,
        status: true,
        quantity: true,
        amount: true,
        ticketCode: true,
        ticket: {
          select: {
            id: true,
            ticketType: true,
            description: true,
            price: true,
            quantity: true,
            soldCount: true,
            event: {
              select: {
                id: true,
                title: true,
                description: true,
                thumbnailUrl: true,
                scheduledAt: true,
                creatorId: true,
                creator: {
                  select: {
                    profile: {
                      select: {
                        fullName: true,
                        avatarUrl: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { purchasedAt: 'desc' },
    })

    // Get video purchases
    const rawVideoPurchases = await prisma.creatorVideoPurchase.findMany({
      where: { buyerProfileId: profile.id },
      select: {
        id: true,
        purchasedAt: true,
        status: true,
        amount: true,
        creatorVideo: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnailUrl: true,
            createdAt: true,
            creatorId: true,
            creator: {
              select: {
                profile: {
                  select: {
                    fullName: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { purchasedAt: 'desc' },
    })

    const tickets = rawEventTickets.map((purchase) => ({
      id: purchase.id,
      createdAt: purchase.purchasedAt.toISOString(),
      status: purchase.status,
      quantity: purchase.quantity,
      totalPrice: purchase.amount,
      ticketCode: purchase.ticketCode,
      ticket: {
        id: purchase.ticket.id,
        name: purchase.ticket.ticketType,
        description: purchase.ticket.description,
        price: purchase.ticket.price,
        quantity: purchase.ticket.quantity,
        quantitySold: purchase.ticket.soldCount,
      },
      event: purchase.ticket.event,
    }))

    const videos = rawVideoPurchases.map((purchase) => ({
      id: purchase.id,
      createdAt: purchase.purchasedAt.toISOString(),
      status: purchase.status,
      totalPrice: purchase.amount,
      video: purchase.creatorVideo,
    }))

    return NextResponse.json({
      tickets,
      videos,
    })
  } catch (error) {
    console.error('Error fetching user tickets:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
