import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { CreatorEventTicketAccessType, Role } from "@/lib/generated/prisma";

function assertAuthorized(role?: Role | null) {
  return role === Role.ADMIN || role === Role.SUPERADMIN;
}

function formatCurrency(amount: number | null | undefined) {
  const value = Number(amount ?? 0);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function getAccessLabel(access: CreatorEventTicketAccessType | string | null | undefined) {
  if (access === CreatorEventTicketAccessType.VENUE) return "Venue";
  return "Stream";
}

function getPlatformLabel(access: CreatorEventTicketAccessType | string | null | undefined) {
  if (access === CreatorEventTicketAccessType.VENUE) return "physical";
  return "streaming";
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email || !assertAuthorized(session.user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const tickets = await prisma.creatorEventTicket.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            creator: {
              select: {
                id: true,
                profile: {
                  select: {
                    fullName: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        purchases: {
          select: {
            id: true,
            buyerName: true,
            buyerEmail: true,
            amount: true,
            revenue: true,
            platformFee: true,
            status: true,
            transactionId: true,
            purchasedAt: true,
          },
        },
      },
    });

    const records = tickets.map((ticket) => {
      const creatorName = ticket.event?.creator?.profile?.fullName || "Unknown Creator";
      const creatorEmail = ticket.event?.creator?.profile?.email || "";
      const eventName = ticket.event?.title || "Untitled Event";
      const sold = Number(ticket.soldCount ?? 0);
      const total = Number(ticket.quantity ?? 0);
      const creatorRevenue = Number(ticket.revenue ?? 0);
      const platformRevenue = Number(ticket.platformFee ?? 0);
      const totalRevenue = creatorRevenue + platformRevenue;

      return {
        id: ticket.id,
        creator: creatorName,
        creatorEmail,
        eventName,
        ticketType: ticket.ticketType,
        totalIssued: total,
        totalSold: sold,
        revenue: totalRevenue,
        creatorRevenue,
        platformRevenue,
        access: getAccessLabel(ticket.access),
        createdDate: ticket.createdAt.toISOString(),
        status: ticket.status === "ACTIVE" ? "active" : "inactive",
        platform: getPlatformLabel(ticket.access),
        purchases: ticket.purchases.map((purchase) => ({
          id: purchase.id,
          buyer: purchase.buyerName || purchase.buyerEmail || "Unknown Buyer",
          amount: Number(purchase.amount ?? 0),
          creatorRevenue: Number(purchase.revenue ?? 0),
          platformRevenue: Number(purchase.platformFee ?? 0),
          status: purchase.status?.toLowerCase() || "completed",
          transactionId: purchase.transactionId,
          date: purchase.purchasedAt?.toISOString() || ticket.createdAt.toISOString(),
        })),
      };
    });

    const totalRevenue = records.reduce((sum, item) => sum + item.revenue, 0);
    const totalTicketsSold = records.reduce((sum, item) => sum + item.totalSold, 0);
    const activeTickets = records.filter((item) => item.status === "active").length;
    const streamTickets = records.filter((item) => item.access === "Stream").length;
    const venueTickets = records.filter((item) => item.access === "Venue").length;

    return NextResponse.json({
      records,
      stats: {
        totalRevenue,
        totalTicketsSold,
        activeTickets,
        streamTickets,
        venueTickets,
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Superadmin tickets GET error:", error);
    return NextResponse.json({ message: "Failed to load tickets" }, { status: 500 });
  }
}
