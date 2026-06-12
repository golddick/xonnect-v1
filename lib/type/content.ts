export interface Event {
  id: string
  title: string
  creator: string
  creatorId: string
  email: string
  status: 'live' | 'scheduled' | 'completed'
  scheduledTime: string | null
  startTime: string | null
  endTime: string | null
  viewers: number
  duration: number
  category: string
  tags: string[]
  revenue: string
  Fee: string
  thumbnail: string
  isPaid: boolean
  isLive: boolean
  peakViewers: number
  averageWatchTime: number
  totalParticipants: number
}

export interface Video {
  id: string
  title: string
  creator: string
  creatorId: string
  duration: string
  views: number
  uploadDate: string
  revenue: string
  category: string
  thumbnail: string
  description?: string
}

export interface EventsResponse {
  event: Event[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface VideosResponse {
  videos: Video[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}