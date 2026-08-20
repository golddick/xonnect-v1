
"use client"

import { motion } from "framer-motion"
import {
  Calendar, ArrowRight, TrendingUp, Video, Users, Zap,
  ShieldQuestion, BookAIcon, Clock, MessageCircle
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import NewsLetterSection from "../_component/NewsLetter-section"
import HeroSection2 from "@/app/(landing-page)/_component/heroSection";
import Image from "next/image"
import { BlogContent } from "@/lib/type/blog";
import { blogPosts } from "@/lib/data/blogData";

const BlogPage = () => {
  const stripHtml = (html: string): string => {
    if (!html) return ''
    return html.replace(/<[^>]*>/g, '').trim()
  }
  const categories = [
    { name: "All Posts", icon: Zap },
    { name: "Creator Tips", icon: TrendingUp },
    { name: "Technical", icon: Video },
    { name: "Community", icon: Users },
    { name: "Industry Insights", icon: TrendingUp },
    { name: "Monetization", icon: TrendingUp },
  ]

  const [activeCategory, setActiveCategory] = useState("All Posts")
  const [posts, setPosts] = useState<BlogContent[]>(blogPosts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog', { cache: 'no-store' })
        const payload = await response.json()

        

        if (!mounted || !response.ok || !payload?.success || !Array.isArray(payload?.data?.posts)) {
          setPosts(blogPosts)
          return
        }

        const dropaphiPosts = payload.data.posts


        const mappedPosts: BlogContent[] = dropaphiPosts.map((post: any, index: number) => {
          // Match local post only by slug (if present); but do NOT inherit
          // author/engagement/readTime/category/tags from unrelated local posts.
          const fallback = blogPosts.find((source) => source.slug === post.slug) ?? undefined

          const cleanedAvatar = post.author?.avatar?.trim()
          const authorAvatar = cleanedAvatar && cleanedAvatar.length > 0 ? cleanedAvatar : '/placeholder.svg'

          return {
            id: post.id ?? `${post.slug}-${index}`,
            title: post.title ?? (fallback?.title ?? 'Untitled'),
            slug: post.slug ?? (fallback?.slug ?? ''),
            content: post.content ?? (fallback?.content ?? ''),
            excerpt: post.excerpt ?? (post.content ? stripHtml(post.content).slice(0, 180) : (fallback?.excerpt ?? '')),
            coverImage: post.coverImage ?? post.featuredImage ?? (fallback?.coverImage ?? fallback?.featuredImage) ?? '/video/thumbnail.png',
            featuredImage: post.featuredImage ?? post.coverImage ?? (fallback?.featuredImage ?? fallback?.coverImage) ?? '/video/thumbnail.png',
            // Engagement and author fields MUST come from remote post only; if absent use neutral defaults
            allowComments: post.allowComments ?? true,
            commentsCount: post.commentsCount ?? 0,
            comments: Array.isArray(post.comments) ? post.comments : [],
            author: {
              name: post.author?.fullName ?? post.author?.name ?? 'Unknown Author',
              avatar: authorAvatar,
              bio: post.author?.bio ?? (fallback?.author?.bio ?? ''),
            },
            publishedAt: post.publishedAt ?? new Date().toISOString(),
            readTime: post.readTime ?? '',
            views: post.views ?? 0,
            viewCount: post.viewCount ?? post.views ?? 0,
            likes: post.likes ?? 0,
            // Do not pull category/tags from unrelated local posts
            category: post.category ?? undefined,
            tags: Array.isArray(post.tags) ? post.tags : [],
          }
        })

        setPosts(mappedPosts)
      } catch (error) {
        console.error('[Blog Page Fetch Error]', error)
        setPosts(blogPosts)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchPosts()

    return () => {
      mounted = false
    }
  }, [])

  const filteredPosts = activeCategory === "All Posts"
    ? posts
    : posts.filter(post => post.category === activeCategory)

  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-x-hidden">
     
      <HeroSection2
            title="Read latest Blog News from Xonnect."
            ICON={<BookAIcon className="w-5 h-5 text-red-400" />}
            iconTitle="Our Blog"
        />
      <div className="w-full max-w-7xl mx-auto px-4">

       

        {/* <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all ${
                activeCategory === cat.name
                ? "bg-red-500 border-red-500 text-white"
                : "bg-card border-border hover:border-red-500/50"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{cat.name}</span>
            </button>
          ))}
        </div> */}

        {loading && posts.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map((item) => (
              <div key={item} className="rounded-2xl border border-border p-6 animate-pulse">
                <div className="h-52 bg-muted rounded-xl" />
                <div className="mt-4 h-4 bg-muted rounded" />
                <div className="mt-3 h-5 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={post.id}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/10 transition-all group"
              >
                <Link href={`/blog/${post.slug}`} className="block relative h-52 overflow-hidden">
                  <Image
                    src={post.coverImage ?? post.featuredImage ?? '/video/thumbnail.png'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {post.category ? (
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
                        {post.category}
                      </span>
                    </div>
                  ) : null}
                </Link>

                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-red-500" />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-red-500" />
                      {post.readTime}
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-muted-foreground mb-6 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border">
                        <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">{post.author.name}</span>
                        
                      </div>
                    </div>
                    {(post.content && post.content.length > (post.excerpt?.length ?? 0)) && (
                      <Link href={`/blog/${post.slug}`} className="text-red-500 hover:text-red-600 font-bold text-sm flex items-center group/link">
                        Read More
                        <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-card border border-dashed border-border rounded-2xl p-12 max-w-md mx-auto">
              <ShieldQuestion className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No posts found</h3>
              <p className="text-muted-foreground">We haven't published any posts in this category yet. Check back soon!</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-20">
        <NewsLetterSection />
      </div>
    </div>
  )
}

export default BlogPage
