export interface BlogComment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  publishedAt: string;
}

export interface BlogContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  featuredVideo?: string | null;
  galleryImages?: string[];
  allowComments: boolean;
  commentsCount: number;
  comments?: BlogComment[];
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  readTime: string;
  views: number;
  likes: number;
  category: string;
  tags: string[];
}

export interface BlogResponse {
  success: boolean;
  data: BlogContent;
  error?: string;
}
