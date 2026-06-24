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

// GET /api/creator/tickets/:id/sales
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const { id } = await params
    const ticket = await db.creatorEventTicket.findFirst({
      where: {
        id,
        event: {
          creatorId: creatorResult.creatorId,
        },
      },
      include: {
        event: true,
        purchases: {
          orderBy: { purchasedAt: "desc" },
        },
      },
    })

    if (!ticket) {
      return NextResponse.json({ message: "Ticket not found" }, { status: 404 })
    }

    const search = request.nextUrl.searchParams.get("search")?.trim().toLowerCase() ?? ""
    const status = request.nextUrl.searchParams.get("status")?.trim().toLowerCase() ?? "all"

    const sales = ticket.purchases.filter((purchase: any) => {
      const matchesSearch =
        !search ||
        purchase.buyerName.toLowerCase().includes(search) ||
        purchase.buyerEmail.toLowerCase().includes(search) ||
        purchase.quantity.toLowerCase().includes(search) || 
        purchase.transactionId.toLowerCase().includes(search)

      const matchesStatus = status === "all" || purchase.status.toLowerCase() === status

      return matchesSearch && matchesStatus
    })

    return NextResponse.json(
      {
        ticket: {
          id: ticket.id,
          ticketType: ticket.ticketType,
          price: ticket.price,
          quantity: ticket.quantity,
          soldCount: ticket.soldCount,
          revenue: ticket.revenue,
          access: ticket.access,
          description: ticket.description,
          event: {
            id: ticket.event.id,
            title: ticket.event.title,
            status: ticket.event.status,
            scheduledAt: ticket.event.scheduledAt,
          },
        },
        sales,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Creator ticket sales GET error:", error)
    return NextResponse.json({ message: "Failed to load ticket sales" }, { status: 500 })
  }
}
