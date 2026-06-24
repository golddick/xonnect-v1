import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

const db = prisma as any

async function getCreatorIdOrResponse() {
  const session = await auth()
  const role = session?.user?.role

  if (!session?.user?.email || role !== Role.CREATOR) {
    return { response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) }
  }

  const email = session.user.email.toLowerCase()
  const creator = await db.creator.findFirst({
    where: { profile: { email } },
    select: { id: true },
  })

  if (!creator) {
    return { response: NextResponse.json({ message: "Creator profile not found" }, { status: 404 }) }
  }

  return { creatorId: creator.id }
}

type PurchaseRow = {
  status: string
  amount: number
}

type TicketRow = {
  id: string
  ticketType: string
  access: string
  status: string
  price: number
  quantity: number
  soldCount: number
  purchases: PurchaseRow[]
}

type TicketSaleRow = {
  id: string
  ticketType: string
  access: string
  status: string
  price: number
  quantity: number
  soldCount: number
  revenue: number
  completedSales: number
  refundedSales: number
  availableSlots: number
}

type CheckInUserRow = {
  id: string
  fullName: string
  email: string
  gateName: string
  status: string
  scansToday: number
  totalScans: number
  lastLoginAt: Date | null
}

type ScanRow = {
  id: string
  attendeeName: string | null
  attendeeEmail: string | null
  gateName: string | null
  status: string
  scannedAt: Date
}

// Creator: analytics summary for one event.
// GET /api/creator/events/:id/analytics
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const { id } = await params

    const event = await db.creatorEvent.findFirst({
      where: {
        id,
        creatorId: creatorResult.creatorId,
      },
      include: {
        tickets: {
          include: {
            purchases: {
              select: {
                id: true,
                amount: true,
                status: true,
                purchasedAt: true,
              },
            },
          },
        },
        checkInUsers: {
          select: {
            id: true,
            fullName: true,
            email: true,
            gateName: true,
            status: true,
            scansToday: true,
            totalScans: true,
            lastLoginAt: true,
          },
        },
        checkInScans: {
          orderBy: { scannedAt: "desc" },
          take: 50,
          select: {
            id: true,
            attendeeName: true,
            attendeeEmail: true,
            gateName: true,
            status: true,
            scannedAt: true,
          },
        },
      },
    })

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    const tickets = event.tickets as TicketRow[]
    const checkInUsers = event.checkInUsers as CheckInUserRow[]
    const scans = event.checkInScans as ScanRow[]

    const ticketSales = tickets.map((ticket: TicketRow) => {
      const completedPurchases = ticket.purchases.filter((purchase: PurchaseRow) => purchase.status === "COMPLETED")
      const refundedPurchases = ticket.purchases.filter((purchase: PurchaseRow) => purchase.status === "REFUNDED")
      const revenue = completedPurchases.reduce((sum: number, purchase: PurchaseRow) => sum + purchase.amount, 0)

      return {
        id: ticket.id,
        ticketType: ticket.ticketType,
        access: ticket.access,
        status: ticket.status, 
        price: ticket.price,
        quantity: ticket.quantity,
        soldCount: ticket.soldCount,
        revenue,
        completedSales: completedPurchases.length,
        refundedSales: refundedPurchases.length,
        availableSlots: Math.max(ticket.quantity - ticket.soldCount, 0),
      }
    })

    const totalTicketRevenue = ticketSales.reduce((sum: number, ticket: TicketSaleRow) => sum + ticket.revenue, 0)
    const totalSales = ticketSales.reduce((sum: number, ticket: TicketSaleRow) => sum + ticket.completedSales, 0)
    const totalRefunds = ticketSales.reduce((sum: number, ticket: TicketSaleRow) => sum + ticket.refundedSales, 0)

    const checkInTotals = {
      users: checkInUsers.length,
      activeUsers: checkInUsers.filter((user: CheckInUserRow) => user.status === "ACTIVE").length,
      inactiveUsers: checkInUsers.filter((user: CheckInUserRow) => user.status === "INACTIVE").length,
      scans: scans.length,
      successfulScans: scans.filter((scan: ScanRow) => scan.status === "SUCCESS").length,
      duplicateScans: scans.filter((scan: ScanRow) => scan.status === "DUPLICATE").length,
      invalidScans: scans.filter((scan: ScanRow) => scan.status === "INVALID").length,
    }

    const analytics = {
      event: {
        id: event.id,
        title: event.title,
        status: event.status,
        category: event.category,
        scheduledAt: event.scheduledAt,
        timezone: event.timezone,
        durationMinutes: event.durationMinutes,
        livekitRoomName: event.livekitRoomName,
        rtmpUrl: event.rtmpUrl,
        ingressId: event.ingressId,
        streamKey: event.streamKey,
        recordingEnabled: event.recordingEnabled,
        recordingStatus: event.recordingStatus,
        recordingUrl: event.recordingUrl,
        recordingStartedAt: event.recordingStartedAt,
        recordingEndedAt: event.recordingEndedAt,
        revenue: event.revenue,
        viewsCount: event.viewsCount,
        likesCount: event.likesCount,
        commentsCount: event.commentsCount,
        peakViewersCount: event.peakViewersCount,
        currentViewersCount: event.currentViewersCount,
        venueParticipantCount: event.venueParticipantCount,
      },
      summary: {
        totalTicketRevenue,
        totalSales,
        totalRefunds,
        checkInUsers: checkInTotals.users,
        successfulScans: checkInTotals.successfulScans,
        duplicateScans: checkInTotals.duplicateScans,
        invalidScans: checkInTotals.invalidScans,
      },
      ticketSales,
      checkInUsers,
      recentScans: scans,
      totals: checkInTotals,
    }

    return NextResponse.json({ analytics }, { status: 200 })
  } catch (error) {
    console.error("Creator event analytics error:", error)
    return NextResponse.json({ message: "Failed to load creator event analytics" }, { status: 500 })
  }
}
