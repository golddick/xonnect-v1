export interface BlogComment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  publishedAt: string;
}

export interface BlogAuthor {
  name: string;
  avatar: string;
  bio?: string;
}

export interface BlogContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  featuredImage?: string;
  featuredVideo?: string | null;
  galleryImages?: string[];
  allowComments: boolean;
  commentsCount: number;
  comments?: BlogComment[];
  author: BlogAuthor;
  publishedAt: string;
  readTime: string;
  views?: number;
  viewCount?: number;
  likes?: number;
  category?: string;
  tags?: string[];
}

export interface DropAphiBlogAuthor {
  fullName?: string;
  name?: string;
  avatar?: string;
  bio?: string;
}

export interface DropAphiBlogPost {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  featuredImage?: string;
  publishedAt?: string;
  author?: DropAphiBlogAuthor;
  tags?: string[];
  viewCount?: number;
  category?: string;
  seoTitle?: string;
  seoDesc?: string;
  isFeatured?: boolean;
  isApproved?: boolean;
  status?: string;
  scheduledAt?: string | null;
  workspace?: {
    name?: string;
    slug?: string;
    logoUrl?: string;
  };
}

export interface DropAphiBlogPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface BlogListApiResponse {
  success: boolean;
  data: {
    posts: DropAphiBlogPost[];
    pagination: DropAphiBlogPagination;
  };
  error?: string;
}

export interface BlogSingleApiResponse {
  success: boolean;
  data: DropAphiBlogPost;
  error?: string;
}

export interface BlogResponse {
  success: boolean;
  data: BlogContent;
  error?: string;
}
