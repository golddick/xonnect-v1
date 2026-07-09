import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { Role } from "@/lib/generated/prisma";

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

function mapEventStatus(status: string | null | undefined) {
  switch (status) {
    case "LIVE":
      return "live";
    case "SCHEDULED":
      return "scheduled";
    case "COMPLETED":
      return "completed";
    case "CANCELLED":
      return "completed";
    default:
      return "scheduled";
  }
}

function getThumbnail(event: {
  thumbnailUrl: string | null;
  thumbnailVideoUrl: string | null;
}) {
  return event.thumbnailUrl || event.thumbnailVideoUrl || "https://placehold.co/320x180/111827/ffffff?text=No+Image";
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email || !assertAuthorized(session.user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const [events, videos] = await Promise.all([
      prisma.creatorEvent.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          creatorId: true,
          title: true,
          description: true,
          category: true,
          status: true,
          isPaid: true,
          thumbnailUrl: true,
          thumbnailVideoUrl: true,
          scheduledAt: true,
          startedAt: true,
          endedAt: true,
          durationMinutes: true,
          tags: true,
          viewsCount: true,
          likesCount: true,
          commentsCount: true,
          peakViewersCount: true,
          currentViewersCount: true,
          venueParticipantCount: true,
          revenue: true,
          amount: true,
          platformFee: true,
          createdAt: true,
          updatedAt: true,
          creator: {
            select: {
              id: true,
              profile: {
                select: {
                  fullName: true,
                  email: true,
                  avatarUrl: true,
                },
              },
            },
          },
        },
      }),
      prisma.creatorVideo.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          creatorId: true,
          title: true,
          description: true,
          category: true,
          thumbnailUrl: true,
          thumbnailFileId: true,
          duration: true,
          viewsCount: true,
          revenue: true,
          amount: true,
          platformFee: true,
          createdAt: true,
          updatedAt: true,
          creator: {
            select: {
              id: true,
              profile: {
                select: {
                  fullName: true,
                  email: true,
                  avatarUrl: true,
                },
              },
            },
          },
        },
      }),
    ]);

    const formattedEvents = events.map((event) => ({
      id: event.id,
      title: event.title,
      creator: event.creator?.profile?.fullName || "Unknown Creator",
      creatorId: event.creatorId,
      email: event.creator?.profile?.email || "",
      status: mapEventStatus(event.status),
      scheduledTime: event.scheduledAt?.toISOString() ?? null,
      startTime: event.startedAt?.toISOString() ?? null,
      endTime: event.endedAt?.toISOString() ?? null,
      viewers: event.currentViewersCount || event.viewsCount || 0,
      duration: event.durationMinutes || 0,
      category: event.category || "General",
      tags: event.tags || [],
      revenue: formatCurrency(event.revenue),
      Fee: formatCurrency(event.platformFee),
      thumbnail: getThumbnail(event),
      isPaid: event.isPaid,
      isLive: event.status === "LIVE",
      peakViewers: event.peakViewersCount || 0,
      averageWatchTime: 0,
      totalParticipants: event.venueParticipantCount || event.viewsCount || 0,
      platformRevenue: formatCurrency(event.platformFee),
      creatorRevenue: formatCurrency(event.revenue),
    }));

    const formattedVideos = videos.map((video) => ({
      id: video.id,
      title: video.title,
      creator: video.creator?.profile?.fullName || "Unknown Creator",
      creatorId: video.creatorId,
      duration: video.duration || "0:00",
      views: video.viewsCount || 0,
      uploadDate: video.createdAt.toISOString(),
      revenue: formatCurrency(video.revenue),
      category: video.category || "General",
      thumbnail: video.thumbnailUrl || "https://placehold.co/320x180/111827/ffffff?text=No+Image",
      description: video.description || "",
      platformRevenue: formatCurrency(video.platformFee),
      creatorRevenue: formatCurrency(video.revenue),
    }));

    return NextResponse.json({ events: formattedEvents, videos: formattedVideos }, { status: 200 });
  } catch (error) {
    console.error("Superadmin content GET error:", error);
    return NextResponse.json({ message: "Failed to load content" }, { status: 500 });
  }
}
