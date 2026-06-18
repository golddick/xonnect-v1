import { NextResponse } from "next/server"

import { prisma } from "@/lib/db/prisma"
import { serializePublicTicketEvent } from "@/lib/tickets"

const db = prisma as any

export async function GET() {
  try {
    const events = await db.creatorEvent.findMany({
      where: {
        isPrivate: false,
        status: {
          in: ["SCHEDULED", "LIVE", "ENDED"],
        },
        tickets: {
          some: {
            status: {
              in: ["ACTIVE", "SOLD_OUT"],
            },
          },
        },
      },
      orderBy: [
        { scheduledAt: "asc" },
        { createdAt: "desc" },
      ],
      include: {
        creator: {
          include: {
            profile: true,
          },
        },
        tickets: {
          where: {
            status: {
              in: ["ACTIVE", "SOLD_OUT"],
            },
          },
          orderBy: [
            { price: "asc" },
            { createdAt: "asc" },
          ],
        },
      },
    })

    const grouped = events.map((event: any) => serializePublicTicketEvent(event))

    return NextResponse.json(
      {
        events: grouped,
        total: grouped.length,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Public tickets GET error:", error)
    return NextResponse.json({ message: "Failed to load tickets" }, { status: 500 })
  }
}
