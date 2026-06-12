export const mockStreams = [
  {
    id: "1",
    title: "Gaming Tournament Finals",
    creator: "John Streamer",
    creatorId: "user123",
    email: "john@example.com",
    status: "live" as const,
    scheduledTime: "2024-01-20T20:00:00Z",
    startTime: "2024-01-20T20:00:00Z",
    endTime: null,
    viewers: 12500,
    duration: 120,
    category: "Gaming",
    tags: ["esports", "tournament", "competitive"],
    revenue: "$12,450",
    Fee: "$1,245",
    thumbnail: "/community-building.jpg",
    isPaid: true,
    isLive: true,
    peakViewers: 15000,
    averageWatchTime: 45,
    totalParticipants: 50,
  },
  // Add more mock streams...
];

export const mockVideos = [
  {
    id: "1",
    title: "How to Build a React App",
    creator: "Jane Developer",
    creatorId: "user456",
    duration: "45:30",
    views: 125000,
    uploadDate: "2024-01-15T10:30:00Z",
    revenue: "$3,250",
    category: "Education",
    thumbnail: "/api/placeholder/400/225",
    description: "Learn React from scratch"
  },
  // Add more mock videos...
];









export interface RevenueData {
  total: number
  streams: number
  premiumVideos: number
  ads: number
  platformEarnings: number
  payoutEarnings: number
  growth: number
}

export interface EventRevenue {
  id: string
  creatorName: string
  streamTitle: string
  revenue: number
  platformEarnings: number
  payoutEarnings: number
  viewers: number
  duration: string
  date: string
  type: string
}

export interface VideoRevenue {
  id: string
  creatorName: string
  videoTitle: string
  revenue: number
  platformEarnings: number
  payoutEarnings: number
  views: number
  price: number
  sales: number
  date: string
}

export interface AdRevenue {
  id: string
  campaignName: string
  advertiser: string
  revenue: number
  impressions: number
  clicks: number
  ctr: number
  placement: string
  status: string
  startDate: string
  endDate: string
}

export const mockRevenueData: RevenueData = {
  total: 12500000,
  streams: 6500000,
  premiumVideos: 3500000,
  ads: 2500000,
  platformEarnings: 3750000,
  payoutEarnings: 8750000,
  growth: 12.5
}

export const mockStreamRevenue: EventRevenue[] = [
  {
    id: "1",
    creatorName: "John Doe",
    streamTitle: "Gaming Marathon Live",
    revenue: 1500000,
    platformEarnings: 450000,
    payoutEarnings: 1050000,
    viewers: 12500,
    duration: "4h 30m",
    date: "2024-01-15",
    type: "Premium"
  },
  {
    id: "2",
    creatorName: "Jane Smith",
    streamTitle: "Music Production Session",
    revenue: 950000,
    platformEarnings: 285000,
    payoutEarnings: 665000,
    viewers: 8500,
    duration: "3h 15m",
    date: "2024-01-14",
    type: "Standard"
  },
  {
    id: "3",
    creatorName: "Mike Johnson",
    streamTitle: "Fitness Workshop",
    revenue: 750000,
    platformEarnings: 225000,
    payoutEarnings: 525000,
    viewers: 6200,
    duration: "2h 45m",
    date: "2024-01-13",
    type: "Premium"
  }
]

export const mockPremiumVideoRevenue: VideoRevenue[] = [
  {
    id: "1",
    creatorName: "Alice Brown",
    videoTitle: "Advanced JavaScript Tutorial",
    revenue: 850000,
    platformEarnings: 255000,
    payoutEarnings: 595000,
    views: 12500,
    price: 2999,
    sales: 283,
    date: "2024-01-15"
  },
  {
    id: "2",
    creatorName: "Bob Wilson",
    videoTitle: "Digital Marketing Masterclass",
    revenue: 650000,
    platformEarnings: 195000,
    payoutEarnings: 455000,
    views: 9500,
    price: 4999,
    sales: 130,
    date: "2024-01-14"
  }
]

export const mockAdRevenue: AdRevenue[] = [
  {
    id: "1",
    campaignName: "Summer Promotion 2024",
    advertiser: "TechCorp Inc.",
    revenue: 1200000,
    impressions: 2500000,
    clicks: 125000,
    ctr: 5.0,
    placement: "Video Pre-roll",
    status: "ACTIVE",
    startDate: "2024-01-01",
    endDate: "2024-01-31"
  },
  {
    id: "2",
    campaignName: "New Product Launch",
    advertiser: "FashionStyle Ltd.",
    revenue: 850000,
    impressions: 1800000,
    clicks: 90000,
    ctr: 5.0,
    placement: "Banner Ad",
    status: "ACTIVE",
    startDate: "2024-01-01",
    endDate: "2024-01-31"
  }
]