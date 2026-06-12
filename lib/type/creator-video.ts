// Creator Video Types

export type VideoStatus = 'processing' | 'published' | 'scheduled' | 'draft' | 'failed'
export type MonetizationType = 'free' | 'rent24' | 'rent48' | 'purchase' | 'premium'
export type FolderType = 'series' | 'single' | 'collection' | 'playlist'

export interface Video {
  id: string
  title: string
  description?: string | null
  duration?: string | null
  category?: string | null
  status: VideoStatus
  isPrivate: boolean
  isPremium: boolean
  monetizationType: MonetizationType
  views: number
  likes: number
  comments: number
  revenue: number
  thumbnailUrl?: string | null
  videoUrl?: string | null
  createdAt: Date
  updatedAt: Date
  revenue: number // in cents
  
  // Pricing
  rent24Price?: number | null
  rent48Price?: number | null
  purchasePrice?: number | null
  
  // Series/Episode
  packageName?: string | null
  episodeIndex?: number | null
  tags?: string[]
  
  // Settings
  allowComments: boolean
  ageRestriction: boolean
  publishNow: boolean
  scheduledAt?: Date | null
}

export interface Folder {
  id: string
  title: string
  type: FolderType
  status: string
  thumbnail?: string | null
  uploadDate: Date
  itemsCount: number
  videos?: Video[]
}

export interface FolderListItem {
  id: string
  title: string
  thumbnail?: string | null
  status: string
  type: FolderType
  isFolder: true
  uploadDate: Date
  itemsCount: number
  revenue: number
  videos: VideoListItem[]
}

export interface VideoListItem {
  id: string
  title: string
  duration?: string | null
  status: VideoStatus
  thumbnail?: string | null
  uploadDate: Date
}

export interface Comment {
  id: string
  author: string
  text: string
  date: string
  likes: number
  replies: number
  avatar?: string | null
}

export interface Analytics {
  folder: {
    id: string
    title: string
    contentType: FolderType
    status: string
    thumbnail?: string | null
    uploadDate: Date
    views: number
    likes: number
    comments: number
    revenue: number
    shares: number
    watchTimeSeconds: number
    purchases: number
    rentals24h: number
    rentals48h: number
    isPremium: boolean
    duration?: string | null
    description?: string | null
    tags?: string[]
  }
  timeSeries: {
    range: string
    items: TimeSeriesItem[]
  }
  comments: Comment[]
  engagementBreakdown: {
    likes: number
    comments: number
    shares: number
    purchases: number
    rentals24h: number
    rentals48h: number
  }
  episodesCount: number
}

export interface TimeSeriesItem {
  date: string
  views: number
  likes: number
  comments: number
  revenue?: number
}

export interface VideoDetailResponse {
  folder: {
    id: string
    title: string
    contentType: FolderType
    status: string
    thumbnail?: string | null
    uploadDate: Date
    description?: string | null
    parts: Video[]
  }
}

export interface CreateVideoRequest {
  title: string
  description?: string | null
  category?: string | null
  videoUrl?: string | null
  videoFileId?: string | null
  thumbnailUrl?: string | null
  thumbnailFileId?: string | null
  isPrivate?: boolean
  isPremium?: boolean
  monetizationType?: MonetizationType
  rent24Price?: number | null
  rent48Price?: number | null
  purchasePrice?: number | null
  status?: VideoStatus
  publishNow?: boolean
  scheduledAt?: string | null
  tags?: string[]
  allowComments?: boolean | null
  ageRestriction?: boolean | null
  packageName?: string | null
  episodeIndex?: number | null
  folderId: string
}

export interface UpdateVideoRequest {
  title?: string
  description?: string | null
  category?: string | null
  duration?: string | null
  tags?: string[]
  packageName?: string | null
  isPrivate?: boolean
  isPremium?: boolean
  monetizationType?: MonetizationType
  rent24Price?: number | null
  rent48Price?: number | null
  purchasePrice?: number | null
  allowComments?: boolean | null
  ageRestriction?: boolean | null
  status?: VideoStatus
  publishNow?: boolean | null
  scheduledAt?: string | null
  episodeIndex?: number | null
}

export interface ApiListResponse {
  items: FolderListItem[]
}

export interface ApiVideoDetailResponse {
  folder: {
    id: string
    title: string
    contentType: FolderType
    status: string
    thumbnail?: string | null
    uploadDate: Date
    description?: string | null
    parts: Video[]
  }
}

export interface ApiUpdateResponse {
  video: Video
}

export interface ApiAnalyticsResponse extends Analytics {}
