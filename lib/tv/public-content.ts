import { prisma } from "@/lib/db/prisma"
import { CreatorEventStatus } from "@/lib/generated/prisma"

type PublicTvContentType = "live" | "scheduled" | "video" | "folder"

export type PublicTvCategory = {
  id: string
  label: string
  href: string
}

export type PublicTvCard = {
  id: string
  watchId?: string | null
  title: string
  thumbnail: string
  channelName: string
  channelAvatar: string
  channelAvatarUrl: string | null
  viewers: number
  isLive: boolean
  category: string
  type: PublicTvContentType
  duration?: string | null
  scheduledAt?: string | null
  folderType?: string | null
  itemsCount?: number
  videos?: PublicTvCard[]
}

export type PublicTvLandingPayload = {
  featuredCarousel: PublicTvCard[]
  priorityFeed: PublicTvCard[]
  contentColumns: {
    live: PublicTvCard[]
    video: PublicTvCard[]
  }
  sidebar: {
    categories: PublicTvCategory[]
    liveEvents: PublicTvCard[]
  }
}

export type PublicTvLiveEventPayload = {
  live: PublicTvCard[]
  scheduled: PublicTvCard[]
  all: PublicTvCard[]
  sidebar: {
    categories: PublicTvCategory[]
    liveEvents: PublicTvCard[]
  }
}

export type PublicTvSportPayload = {
  sport: {
    liveBroadcasts: PublicTvCard[]
    scheduledBroadcasts: PublicTvCard[]
    videoFolders: PublicTvCard[]
    all: PublicTvCard[]
  }
  sidebar: {
    categories: PublicTvCategory[]
    liveEvents: PublicTvCard[]
  }
}

export type PublicTvMoviePayload = {
  items: PublicTvCard[]
  total: number
  filters: {
    pricing: string
    search: string
  }
  source: "folders" | "direct_videos" | "empty"
}

const DEFAULT_CATEGORIES: PublicTvCategory[] = [
  { id: "live-event", label: "Live Event", href: "/tv/live-event" },
  { id: "video", label: "Video", href: "/tv/video" },
  { id: "sport", label: "Sport", href: "/tv/sport" },
  { id: "podcast", label: "Podcast", href: "/tv/podcast" },
  { id: "tv-show", label: "TV Show", href: "/tv/tv-show" },
]

const PUBLIC_VIDEO_STATUSES = new Set(["published", "scheduled"])

function toSlug(value: string) {
  return value.trim().toLowerCase()
}

function toInitials(value: string) {
  const parts = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length === 0) return "TV"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

function buildThumbnail(...values: Array<string | null | undefined>) {
  const firstValue = values.find((value) => typeof value === "string" && value.trim().length > 0)
  return firstValue ?? "/placeholder.svg?query=xonnect-tv"
}

function toViewerCount(value: number | null | undefined, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback
}

function mapEventToCard(event: {
  id: string
  title: string
  description: string | null
  category: string
  status: string
  thumbnailUrl: string | null
  thumbnailVideoUrl: string | null
  scheduledAt: Date | null
  durationMinutes: number
  currentViewersCount: number
  peakViewersCount: number
  creator: {
    profile: {
      fullName: string | null
      avatarUrl: string | null
    }
  }
}): PublicTvCard {
  const channelName = event.creator.profile.fullName?.trim() || "Xonnect Creator"
  const channelAvatarUrl = event.creator.profile.avatarUrl ?? null

  return {
    id: event.id,
    watchId: event.id,
    title: event.title,
    thumbnail: buildThumbnail(event.thumbnailUrl, event.thumbnailVideoUrl),
    channelName,
    channelAvatarUrl,
    channelAvatar: channelAvatarUrl ? toInitials(channelName) : toInitials(channelName),
    viewers: toViewerCount(event.currentViewersCount, event.peakViewersCount),
    isLive: event.status === "LIVE",
    category: event.category,
    type: event.status === "LIVE" ? "live" : "scheduled",
    duration: `${event.durationMinutes}m`,
    scheduledAt: event.scheduledAt?.toISOString() ?? null,
  }
}

function mapVideoToCard(video: {
  id: string
  title: string
  category: string | null
  status: string
  thumbnailUrl: string | null
  duration: string | null
  viewsCount: number
  scheduledAt: Date | null
  folder?: {
    id: string
    title: string
    folderType: string
  }
  creator: {
    profile: {
      fullName: string | null
      avatarUrl: string | null
    }
  }
}): PublicTvCard {
  const channelName = video.creator.profile.fullName?.trim() || "Xonnect Creator"
  const channelAvatarUrl = video.creator.profile.avatarUrl ?? null

  return {
    id: video.id,
    watchId: video.folder?.id ?? video.id,
    title: video.title,
    thumbnail: buildThumbnail(video.thumbnailUrl),
    channelName,
    channelAvatarUrl,
    channelAvatar: toInitials(channelName),
    viewers: toViewerCount(video.viewsCount),
    isLive: false,
    category: video.category || video.folder?.folderType || "video",
    type: "video",
    duration: video.duration ?? null,
    scheduledAt: video.scheduledAt?.toISOString() ?? null,
    folderType: video.folder?.folderType ?? null,
  }
}

function mapFolderToCard(folder: {
  id: string
  title: string
  folderType: string
  status: string
  thumbnailUrl: string | null
  creator: {
    profile: {
      fullName: string | null
      avatarUrl: string | null
    }
  }
  videos: Array<{
    id: string
    title: string
    category: string | null
    status: string
    thumbnailUrl: string | null
    duration: string | null
    viewsCount: number
    scheduledAt: Date | null
    creator: {
      profile: {
        fullName: string | null
        avatarUrl: string | null
      }
    }
  }>
}): PublicTvCard {
  const channelName = folder.creator.profile.fullName?.trim() || "Xonnect Creator"
  const channelAvatarUrl = folder.creator.profile.avatarUrl ?? null
  const videos = folder.videos.map(mapVideoToCard)

  return {
    id: folder.id,
    watchId: folder.id,
    title: folder.title,
    thumbnail: buildThumbnail(folder.thumbnailUrl, videos[0]?.thumbnail),
    channelName,
    channelAvatarUrl,
    channelAvatar: toInitials(channelName),
    viewers: videos.reduce((sum, video) => sum + video.viewers, 0),
    isLive: false,
    category: folder.folderType,
    type: "folder",
    folderType: folder.folderType,
    itemsCount: videos.length,
    videos,
  }
}

function orderPriority(cards: PublicTvCard[]) {
  return cards.sort((left, right) => {
    if (left.isLive !== right.isLive) return left.isLive ? -1 : 1

    const leftScheduled = left.scheduledAt ? Date.parse(left.scheduledAt) : Number.POSITIVE_INFINITY
    const rightScheduled = right.scheduledAt ? Date.parse(right.scheduledAt) : Number.POSITIVE_INFINITY

    if (leftScheduled !== rightScheduled) return leftScheduled - rightScheduled

    return right.viewers - left.viewers
  })
}

export function getTvCategories() {
  return DEFAULT_CATEGORIES
}

export async function getTvLandingPayload(options?: {
  liveLimit?: number
  scheduledLimit?: number
  videoLimit?: number
  category?: string | null
}) : Promise<PublicTvLandingPayload> {
  const category = options?.category ? toSlug(options.category) : null
  const liveLimit = options?.liveLimit ?? 6
  const scheduledLimit = options?.scheduledLimit ?? 6
  const videoLimit = options?.videoLimit ?? 12

  const eventWhere = {
    isPrivate: false,
    ...(category ? { category: { equals: category, mode: "insensitive" as const } } : {}),
  }

  const videoWhere = {
    isPrivate: false,
    status: { in: Array.from(PUBLIC_VIDEO_STATUSES) },
    ...(category
      ? {
          OR: [
            { category: { equals: category, mode: "insensitive" as const } },
            { folder: { folderType: { equals: category, mode: "insensitive" as const } } },
          ],
        }
      : {}),
  }

  const [liveEvents, scheduledEvents, videoFolders] = await Promise.all([
    prisma.creatorEvent.findMany({
      where: { ...eventWhere, status: CreatorEventStatus.LIVE },
      orderBy: [{ currentViewersCount: "desc" }, { peakViewersCount: "desc" }, { createdAt: "desc" }],
      take: liveLimit,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        status: true,
        thumbnailUrl: true,
        thumbnailVideoUrl: true,
        scheduledAt: true,
        durationMinutes: true,
        currentViewersCount: true,
        peakViewersCount: true,
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
    }),
    prisma.creatorEvent.findMany({
      where: { ...eventWhere, status: CreatorEventStatus.SCHEDULED },
      orderBy: [{ scheduledAt: "asc" }, { createdAt: "desc" }],
      take: scheduledLimit,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        status: true,
        thumbnailUrl: true,
        thumbnailVideoUrl: true,
        scheduledAt: true,
        durationMinutes: true,
        currentViewersCount: true,
        peakViewersCount: true,
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
    }),
    prisma.creatorVideoFolder.findMany({
      where: {
        status: "active",
        ...(category
          ? {
              OR: [
                { folderType: { equals: category, mode: "insensitive" as const } },
                {
                  videos: {
                    some: {
                      isPrivate: false,
                      status: { in: Array.from(PUBLIC_VIDEO_STATUSES) },
                      OR: [
                        { category: { equals: category, mode: "insensitive" as const } },
                      ],
                    },
                  },
                },
              ],
            }
          : {}),
      },
      orderBy: [{ createdAt: "desc" }],
      take: videoLimit,
      select: {
        id: true,
        title: true,
        folderType: true,
        status: true,
        thumbnailUrl: true,
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
        videos: {
          where: {
            isPrivate: false,
            status: { in: Array.from(PUBLIC_VIDEO_STATUSES) },
            ...(category
              ? {
                  OR: [
                    { category: { equals: category, mode: "insensitive" as const } },
                    { folder: { folderType: { equals: category, mode: "insensitive" as const } } },
                  ],
                }
              : {}),
          },
          orderBy: [{ scheduledAt: "asc" }, { createdAt: "desc" }],
          select: {
            id: true,
            title: true,
            category: true,
            status: true,
            thumbnailUrl: true,
            duration: true,
            viewsCount: true,
            scheduledAt: true,
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
            folder: {
              select: {
                id: true,
                title: true,
                folderType: true,
              },
            },
          },
        },
      },
    }),
  ])

  const liveCards = liveEvents.map(mapEventToCard)
  const scheduledCards = scheduledEvents.map(mapEventToCard)
  const folderCards = videoFolders.map(mapFolderToCard)
  const videoCards = folderCards.flatMap((folder) => folder.videos ?? [])

  const priorityFeed = orderPriority([...liveCards, ...scheduledCards, ...videoCards])
  const sidebarEvents = orderPriority([...liveCards, ...scheduledCards]).slice(0, 4)

  return {
    featuredCarousel: priorityFeed.slice(0, 5),
    priorityFeed,
    contentColumns: {
      live: [...liveCards, ...scheduledCards],
      video: folderCards,
    },
    sidebar: {
      categories: DEFAULT_CATEGORIES,
      liveEvents: sidebarEvents,
    },
  }
}

export async function getTvLiveEventPayload(options?: {
  limit?: number
  category?: string | null
}): Promise<PublicTvLiveEventPayload> {
  const limit = options?.limit ?? 12
  const category = options?.category ? toSlug(options.category) : null

  const where = {
    isPrivate: false,
    ...(category ? { category: { equals: category, mode: "insensitive" as const } } : {}),
  }

  const [liveEvents, scheduledEvents] = await Promise.all([
    prisma.creatorEvent.findMany({
      where: { ...where, status: CreatorEventStatus.LIVE },
      orderBy: [{ currentViewersCount: "desc" }, { peakViewersCount: "desc" }, { createdAt: "desc" }],
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        status: true,
        thumbnailUrl: true,
        thumbnailVideoUrl: true,
        scheduledAt: true,
        durationMinutes: true,
        currentViewersCount: true,
        peakViewersCount: true,
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
    }),
    prisma.creatorEvent.findMany({
      where: { ...where, status: CreatorEventStatus.SCHEDULED },
      orderBy: [{ scheduledAt: "asc" }, { createdAt: "desc" }],
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        status: true,
        thumbnailUrl: true,
        thumbnailVideoUrl: true,
        scheduledAt: true,
        durationMinutes: true,
        currentViewersCount: true,
        peakViewersCount: true,
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
    }),
  ])

  const live = liveEvents.map(mapEventToCard)
  const scheduled = scheduledEvents.map(mapEventToCard)

  return {
    live,
    scheduled,
    all: orderPriority([...live, ...scheduled]),
    sidebar: {
      categories: DEFAULT_CATEGORIES,
      liveEvents: orderPriority([...live, ...scheduled]).slice(0, 4),
    },
  }
}

export async function getTvSportPayload(options?: {
  limit?: number
  contentType?: "all" | "live" | "scheduled" | "video"
}): Promise<PublicTvSportPayload> {
  const limit = options?.limit ?? 12
  const contentType = options?.contentType ?? "all"
  const category = "sport"

  const eventWhere = {
    isPrivate: false,
    category: { equals: category, mode: "insensitive" as const },
  }

  const videoWhere = {
    isPrivate: false,
    status: { in: Array.from(PUBLIC_VIDEO_STATUSES) },
    OR: [
      { category: { equals: category, mode: "insensitive" as const } },
      { folder: { folderType: { equals: category, mode: "insensitive" as const } } },
    ],
  }

  const [liveBroadcasts, scheduledBroadcasts, sportVideoFolders] = await Promise.all([
    contentType === "video"
      ? Promise.resolve([])
      : prisma.creatorEvent.findMany({
          where: { ...eventWhere, status: CreatorEventStatus.LIVE },
          orderBy: [{ currentViewersCount: "desc" }, { peakViewersCount: "desc" }, { createdAt: "desc" }],
          take: limit,
          select: {
            id: true,
            title: true,
            description: true,
            category: true,
            status: true,
            thumbnailUrl: true,
            thumbnailVideoUrl: true,
            scheduledAt: true,
            durationMinutes: true,
            currentViewersCount: true,
            peakViewersCount: true,
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
        }),
    contentType === "video"
      ? Promise.resolve([])
      : prisma.creatorEvent.findMany({
          where: { ...eventWhere, status: CreatorEventStatus.SCHEDULED },
          orderBy: [{ scheduledAt: "asc" }, { createdAt: "desc" }],
          take: limit,
          select: {
            id: true,
            title: true,
            description: true,
            category: true,
            status: true,
            thumbnailUrl: true,
            thumbnailVideoUrl: true,
            scheduledAt: true,
            durationMinutes: true,
            currentViewersCount: true,
            peakViewersCount: true,
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
        }),
    contentType === "live" || contentType === "scheduled"
      ? Promise.resolve([])
      : prisma.creatorVideoFolder.findMany({
          where: {
            status: "active",
            OR: [
              { folderType: { equals: category, mode: "insensitive" as const } },
              {
                videos: {
                  some: videoWhere,
                },
              },
            ],
          },
          orderBy: [{ createdAt: "desc" }],
          take: limit,
          select: {
            id: true,
            title: true,
            folderType: true,
            status: true,
            thumbnailUrl: true,
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
            videos: {
              where: videoWhere,
              orderBy: [{ scheduledAt: "asc" }, { createdAt: "desc" }],
              select: {
                id: true,
                title: true,
                category: true,
                status: true,
                thumbnailUrl: true,
                duration: true,
                viewsCount: true,
                scheduledAt: true,
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
                folder: {
                  select: {
                    id: true,
                    title: true,
                    folderType: true,
                  },
                },
              },
            },
          },
        }),
  ])

  const live = liveBroadcasts.map(mapEventToCard)
  const scheduled = scheduledBroadcasts.map(mapEventToCard)
  const folders = sportVideoFolders.map(mapFolderToCard)

  const all = orderPriority([...live, ...scheduled, ...folders.flatMap((folder) => folder.videos ?? [])])

  return {
    sport: {
      liveBroadcasts: live,
      scheduledBroadcasts: scheduled,
      videoFolders: folders,
      all,
    },
    sidebar: {
      categories: DEFAULT_CATEGORIES,
      liveEvents: orderPriority([...live, ...scheduled]).slice(0, 4),
    },
  }
}



export async function getTvMoviePayload(options?: {
  pricing?: string | null
  search?: string | null
  limit?: number
}): Promise<PublicTvMoviePayload> {
  const pricing = options?.pricing ?? null
  const search = options?.search ?? null
  const limit = options?.limit ?? 50

  console.log("🔍 [getTvMoviePayload] Starting with:", { pricing, search, limit })

  // Helper: Check if video matches pricing filter
  function matchesPricing(video: { monetizationType: string | null; isPremium: boolean }, pricingFilter: string | null) {
    if (!pricingFilter || pricingFilter === "all") return true
    const monetizationType = (video.monetizationType ?? "free").toLowerCase()

    if (pricingFilter === "free") {
      return monetizationType === "free" || !video.isPremium
    }

    if (pricingFilter === "rent") {
      return monetizationType === "rent"
    }

    if (pricingFilter === "purchase") {
      return monetizationType === "purchase"
    }

    return true
  }

  // Helper: Check if video matches search
  function matchesSearch(
    folderTitle: string | null,
    videoTitle: string,
    category: string | null,
    searchQuery: string | null
  ) {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      (folderTitle?.toLowerCase().includes(query) ?? false) ||
      videoTitle.toLowerCase().includes(query) ||
      (category ?? "").toLowerCase().includes(query)
    )
  }

  // 🔍 Step 1: Get total videos count first
  const totalVideos = await prisma.creatorVideo.count({
    where: {
      isPrivate: false,
    },
  })
  console.log(`📊 [getTvMoviePayload] Total public videos in DB: ${totalVideos}`)

  // 🔍 Step 1.5: Get sample videos to check status
  const sampleVideos = await prisma.creatorVideo.findMany({
    where: {
      isPrivate: false,
      status: { in: Array.from(PUBLIC_VIDEO_STATUSES) },
    },
    take: 3,
    select: {
      id: true,
      title: true,
      status: true,
      isPrivate: true,
      monetizationType: true,
      isPremium: true,
      folderId: true,
    },
  })
  console.log(`📹 [getTvMoviePayload] Sample videos:`, JSON.stringify(sampleVideos, null, 2))

  // 🔍 Step 2: Try to get folders with videos
  console.log("🔍 [getTvMoviePayload] Fetching folders with videos...")
  
  const folders = await prisma.creatorVideoFolder.findMany({
    where: {
      status: "active",
      videos: {
        some: {
          isPrivate: false,
          // status: { in: Array.from(PUBLIC_VIDEO_STATUSES) },
        },
      },
    },
    orderBy: [{ createdAt: "desc" }],
    take: limit,
    select: {
      id: true,
      title: true,
      folderType: true,
      status: true,
      thumbnailUrl: true,
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
      videos: {
        where: {
          isPrivate: false,
          status: { in: Array.from(PUBLIC_VIDEO_STATUSES) },
        },
        orderBy: [{ episodeIndex: "asc" }, { createdAt: "asc" }],
        select: {
          id: true,
          title: true,
          category: true,
          status: true,
          thumbnailUrl: true,
          duration: true,
          viewsCount: true,
          scheduledAt: true,
          monetizationType: true,
          isPremium: true,
          rent24Price: true,
          rent48Price: true,
          purchasePrice: true,
          episodeIndex: true,
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
          folder: {
            select: {
              id: true,
              title: true,
              folderType: true,
            },
          },
        },
      },
    },
  })

  console.log(`📁 [getTvMoviePayload] Found ${folders.length} folders with videos`)

  // Process folders
  if (folders.length > 0) {
    console.log(`📁 [getTvMoviePayload] Processing ${folders.length} folders...`)
    
    const folderItems = folders
      .map((folder) => {
        console.log(`  📂 Processing folder: "${folder.title}" with ${folder.videos.length} videos`)
        
        // Filter videos by pricing
        const videos = folder.videos.filter((video) => matchesPricing(video, pricing))
        console.log(`    📊 After pricing filter: ${videos.length} videos`)
        
        if (videos.length === 0) return null

        // Filter by search
        const visibleVideos = videos.filter((video) =>
          matchesSearch(folder.title, video.title, video.category, search)
        )
        console.log(`    📊 After search filter: ${visibleVideos.length} videos`)
        
        if (visibleVideos.length === 0) return null

        console.log(`    ✅ Folder "${folder.title}" passed all filters`)
        
        // Use existing mapFolderToCard function
        return mapFolderToCard({
          ...folder,
          videos: visibleVideos,
        })
      })
      .filter(Boolean) as PublicTvCard[]

    console.log(`✅ [getTvMoviePayload] Created ${folderItems.length} folder items`)

    if (folderItems.length > 0) {
      return {
        items: folderItems,
        total: folderItems.length,
        filters: {
          pricing: pricing ?? "all",
          search: search ?? "",
        },
        source: "folders",
      }
    }
  }

  // 🔍 Step 3: Fallback - Get videos directly
  console.log("🔍 [getTvMoviePayload] No folders found or folders had no videos. Fetching direct videos...")
  
  const directVideos = await prisma.creatorVideo.findMany({
    where: {
      isPrivate: false,
      status: { in: Array.from(PUBLIC_VIDEO_STATUSES) },
    },
    orderBy: [{ createdAt: "desc" }],
    take: limit,
    select: {
      id: true,
      title: true,
      category: true,
      status: true,
      thumbnailUrl: true,
      duration: true,
      viewsCount: true,
      scheduledAt: true,
      monetizationType: true,
      isPremium: true,
      rent24Price: true,
      rent48Price: true,
      purchasePrice: true,
      episodeIndex: true,
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
      folder: {
        select: {
          id: true,
          title: true,
          folderType: true,
        },
      },
    },
  })

  console.log(`📹 [getTvMoviePayload] Found ${directVideos.length} direct videos`)

  // Filter and map direct videos
  const videoItems = directVideos
    .filter((video) => {
      const matches = matchesPricing(video, pricing)
      if (!matches) {
        console.log(`  ❌ Video "${video.title}" filtered out by pricing`)
      }
      return matches
    })
    .filter((video) => {
      const matches = matchesSearch(null, video.title, video.category, search)
      if (!matches) {
        console.log(`  ❌ Video "${video.title}" filtered out by search`)
      }
      return matches
    })
    .map((video) => {
      console.log(`  ✅ Video "${video.title}" passed all filters`)
      return mapVideoToCard(video)
    })

  console.log(`✅ [getTvMoviePayload] Created ${videoItems.length} video items`)

  if (videoItems.length > 0) {
    return {
      items: videoItems,
      total: videoItems.length,
      filters: {
        pricing: pricing ?? "all",
        search: search ?? "",
      },
      source: "direct_videos",
    }
  }

  // 🔍 Step 4: No content found
  console.log("❌ [getTvMoviePayload] No content found at all!")
  
  return {
    items: [],
    total: 0,
    filters: {
      pricing: pricing ?? "all",
      search: search ?? "",
    },
    source: "empty",
  }
}