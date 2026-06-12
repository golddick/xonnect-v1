export interface AdCampaign {
  id: string
  title: string
  description?: string
  type: "BANNER" | "VIDEO"
  status: "ACTIVE" | "PAUSED" | "ENDED" | "DRAFT"
  impressions: number
  clicks: number
  conversions: number
  ctr: string
  budget: number
  spent: number
  startDate: string
  endDate: string
  imageUrl?: string
  videoUrl?: string
  targetUrl: string
  position: "HERO" | "SIDEBAR" | "FOOTER" | "INLINE"
  createdAt: string
  updatedAt: string
}

export const staticHeroAds: AdCampaign[] = [
  {
    id: "hero-1",
    title: "Revolutionize Your Stream",
    description: "Join the most advanced creator community and start earning today.",
    type: "BANNER",
    status: "ACTIVE",
    impressions: 1200,
    clicks: 450,
    conversions: 20,
    ctr: "37.5%",
    budget: 500,
    spent: 120,
    startDate: "2026-04-01",
    endDate: "2026-05-01",
    imageUrl: "/ads/hero-stream.jpg",
    targetUrl: "/signup",
    position: "HERO",
    createdAt: "2026-04-01",
    updatedAt: "2026-04-01",
  },
  {
    id: "hero-2",
    title: "Global Reach, Local Impact",
    description: "Connect with audiences in every corner of the world.",
    type: "BANNER",
    status: "ACTIVE",
    impressions: 980,
    clicks: 310,
    conversions: 15,
    ctr: "31.6%",
    budget: 400,
    spent: 90,
    startDate: "2026-04-05",
    endDate: "2026-05-05",
    imageUrl: "/ads/hero-global.jpg",
    targetUrl: "/explore",
    position: "HERO",
    createdAt: "2026-04-05",
    updatedAt: "2026-04-05",
  }
];

export const staticSidebarAds: AdCampaign[] = [
  {
    id: "sidebar-1",
    title: "Get Xonnect Pro",
    description: "Unlock advanced analytics and premium features.",
    type: "BANNER",
    status: "ACTIVE",
    impressions: 5000,
    clicks: 120,
    conversions: 5,
    ctr: "2.4%",
    budget: 200,
    spent: 50,
    startDate: "2026-03-15",
    endDate: "2026-06-15",
    imageUrl: "/ads/pro-badge.jpg",
    targetUrl: "/pricing",
    position: "SIDEBAR",
    createdAt: "2026-03-15",
    updatedAt: "2026-03-15",
  },
  {
    id: "sidebar-2",
    title: "New Creator Kit",
    description: "Everything you need to start your streaming journey.",
    type: "BANNER",
    status: "ACTIVE",
    impressions: 3200,
    clicks: 85,
    conversions: 8,
    ctr: "2.6%",
    budget: 300,
    spent: 110,
    startDate: "2026-04-10",
    endDate: "2026-05-10",
    imageUrl: "/ads/creator-kit.jpg",
    targetUrl: "/shop",
    position: "SIDEBAR",
    createdAt: "2026-04-10",
    updatedAt: "2026-04-10",
  }
];
