
"use client"

import { motion } from "framer-motion"
import {
  Calendar, User, ArrowRight, TrendingUp, Video, Users, Zap, Eye, Heart, Share, FileText, Plus, RefreshCw,
  ShieldQuestion, BookAIcon, Clock, MessageCircle
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import NewsLetterSection from "../_component/NewsLetter-section"
import HeroSection2 from "@/app/(landing-page)/_component/heroSection";
import { blogPosts } from "@/lib/data/blogData";
import Image from "next/image"

const BlogPage = () => {
  const categories = [
    { name: "All Posts", icon: Zap },
    { name: "Creator Tips", icon: TrendingUp },
    { name: "Technical", icon: Video },
    { name: "Community", icon: Users },
    { name: "Industry Insights", icon: TrendingUp },
    { name: "Monetization", icon: TrendingUp },
  ]

  const [activeCategory, setActiveCategory] = useState("All Posts")

  const filteredPosts = activeCategory === "All Posts" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="max-w-6xl 2xl:max-w-[100rem] mx-auto px-4">

        <HeroSection2
            title="Read latest Blog News from Xonnect."
            ICON={<BookAIcon className="w-5 h-5 text-red-400" />}
            iconTitle="Our Blog"
        />

        <div className="flex flex-wrap gap-4 mb-12 justify-center">
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
        </div>

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
                  src={post.featuredImage} 
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
                    {post.category}
                  </span>
                </div>
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
                       <div className="flex items-center text-[10px] text-muted-foreground">
                          <MessageCircle className="w-2.5 h-2.5 mr-1" /> {post.commentsCount}
                       </div>
                    </div>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-red-500 hover:text-red-600 font-bold text-sm flex items-center group/link">
                    Read More 
                    <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
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
