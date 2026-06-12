"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  ChevronLeft, 
  User, 
  MessageSquare,
  ArrowRight,
  MessageCircle
} from 'lucide-react'
import { BlogContent } from '@/lib/type/blog'
import { blogPosts } from '@/lib/data/blogData'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import LoadingSplash from "@/components/splash_screen/loading-splash";
import CommentComponent from './CommentComponent'

const ReadBlog = () => {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  
  const [blog, setBlog] = useState<BlogContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = (window.scrollY / totalHeight) * 100
    setScrollProgress(progress)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (!slug) return

    setLoading(true)
    // Simulate a slight delay for realism if desired, or just set immediately
    const foundBlog = blogPosts.find(post => post.slug === slug)
    
    if (foundBlog) {
      setBlog(foundBlog)
      setError(null)
    } else {
      setError('Blog post not found')
    }
    setLoading(false)
  }, [slug])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        url: window.location.href,
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  if (loading) return <LoadingSplash />

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
            <div className="relative flex items-center justify-center h-full">
               <span className="text-5xl">⚠️</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Post Not Found</h2>
          <p className="text-gray-400">
            {error || "We couldn't find the blog post you're looking for. It might have been moved or deleted."}
          </p>
          <Button 
            variant="outline" 
            onClick={() => router.push('/blog')}
            className="rounded-full px-8 bg-transparent hover:bg-white hover:text-black border-white/20"
          >
            Back to Blog
          </Button>
        </div>
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black/5 pb-20">
      {/* Navigation Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100/50 z-[100]">
        <div 
          className="h-full bg-black transition-all duration-150 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      {/* Hero Section */}
      <header className="relative w-full h-[60vh] md:h-[75vh] min-h-[500px] overflow-hidden">
        <Image 
          src={blog.featuredImage} 
          alt={blog.title} 
          fill 
          priority
          className="object-cover transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 text-white">
          <div className="max-w-5xl mx-auto space-y-6">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors mb-4 group"
            >
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to Stories
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-none backdrop-blur-md px-4 py-1">
                {blog.category}
              </Badge>
              {blog.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="outline" className="border-white/30 text-white/90 px-3">
                  #{tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tighter max-w-4xl">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/10 text-white/70 text-sm">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-white/20">
                  <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                  <AvatarFallback className="bg-white/10 text-white font-bold">{blog.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-lg text-white leading-none mb-1">{blog.author.name}</p>
                  <p className="text-xs opacity-80 uppercase tracking-widest">{formatDate(blog.publishedAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-white font-bold">{blog.readTime}</span>
                  <span className="text-[10px] uppercase tracking-tighter opacity-60">Read Time</span>
                </div>
                <div className="flex flex-col border-l border-white/20 pl-6">
                  <span className="text-white font-bold">{blog.views.toLocaleString()}</span>
                  <span className="text-[10px] uppercase tracking-tighter opacity-60">Views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-16 md:pt-24">
        <article className="prose prose-xl prose-stone max-w-none">
          {/* Content Render */}
          <div 
            className="blog-content prose-headings:font-extrabold prose-p:text-muted-foreground prose-h2:text-foreground prose-p:leading-relaxed prose-img:rounded-3xl"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </article>

        {/* Post Actions Sticky Mobile / Regular Desktop */}
        <div className="mt-20 py-10 flex items-center justify-between border-t border-border">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all active:scale-95 ${
                isLiked ? 'bg-red-500/10 text-red-600' : 'bg-card border border-border text-muted-foreground hover:border-red-500/50 hover:text-foreground'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="font-bold">{(blog.likes + (isLiked ? 1 : 0)).toLocaleString()}</span>
            </button>
            <button 
              onClick={() => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border text-muted-foreground hover:border-red-500/50 hover:text-foreground transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-bold">{blog.commentsCount}</span>
            </button>
          </div>
          
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black hover:bg-stone-200 transition-all active:scale-95 shadow-lg shadow-white/10"
          >
            <Share2 className="w-4 h-4" />
            <span className="font-bold uppercase tracking-widest text-xs">Share Story</span>
          </button>
        </div>

        {/* Comments Section */}
        <div id="comments-section">
          {blog.allowComments && (
            <CommentComponent comments={blog.comments || []} />
          )}
        </div>

        {/* Author Bio */}
        {blog.author.bio && (
          <section className="mt-24 p-10 md:p-14 rounded-[3rem] bg-stone-50 border border-stone-100 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 flex flex-col md:flex-row gap-10 items-center md:items-start">
            <Avatar className="w-28 h-28 md:w-32 md:h-32 ring-8 ring-white shadow-2xl">
              <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
              <AvatarFallback className="text-2xl font-black">{blog.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-black">Written by {blog.author.name}</h3>
                <p className="text-stone-600 mt-4 leading-relaxed text-lg">
                  {blog.author.bio}
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button variant="default" className="rounded-full bg-black text-white hover:bg-stone-800 px-8">
                  Follow Author
                </Button>
                <Button variant="outline" className="rounded-full bg-black text-white hover:text-black border-stone-200 hover:bg-white px-8">
                   All Stories
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mt-24 rounded-[3.5rem] bg-card border border-border text-foreground hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 p-12 md:p-20 relative overflow-hidden text-center">
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">Stay in the loop.</h2>
            <p className="text-gray-400 text-xl font-medium">
              Join 10,000+ readers getting our weekly digest of tech, design, and culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="flex-1 bg-transparent border border-border rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              />
              <Button className="bg-white text-black hover:bg-stone-200 rounded-2xl px-10 py-4 font-black h-auto">
                JOIN
              </Button>
            </div>
          </div>
          {/* Decorative Gradients */}
          {/*<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-red-500/10 to-transparent pointer-events-none" />*/}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
        </section>
      </main>

      {/* Footer Related */}
      <footer className=" mt-24">
         <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16">
               <div className="space-y-2">
                  <h2 className="text-3xl font-black tracking-tighter text-foreground uppercase">Read more</h2>
                  <div className="h-1.5 w-12 bg-black rounded-full" />
               </div>
               <Link href="/blog" className="font-bold text-foreground text-sm uppercase tracking-widest flex items-center gap-2 hover:mr-2 transition-all group">
                  EXPLORE ALL STORIES <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group space-y-4 rounded-[2rem] border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5">
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-100">
                    <div className="absolute inset-0 bg-stone-200 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                    <div className="h-6 w-full bg-gray-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
         </div>
      </footer>
    </div>
  )
}

export default ReadBlog



