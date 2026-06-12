"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, TrendingUp, Video, Users, Zap } from "lucide-react"
import Navigation from "../../../components/navigation"
import Footer from "../../../components/footer"
import Link from "next/link"

const BlogPage = () => {
  const featuredPost = {
    title: "The Future of Creator Economy: Trends to Watch in 2024",
    excerpt:
      "Discover the emerging trends that are reshaping how creators build communities, monetize content, and connect with audiences in the digital age.",
    author: "Sarah Kim",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Industry Insights",
    image: "/futuristic-creator-workspace-with-charts-and-analy.png",
    slug: "future-creator-economy-2024",
  }

  const blogPosts = [
    {
      title: "10 Tips for Growing Your Live Streaming Audience",
      excerpt:
        "Learn proven strategies to attract and retain viewers, build engagement, and grow your streaming community organically.",
      author: "Marcus Johnson",
      date: "December 12, 2024",
      readTime: "6 min read",
      category: "Creator Tips",
      image: "/live-streaming-setup-with-multiple-cameras.png",
      slug: "growing-streaming-audience",
    },
    {
      title: "Monetization Strategies That Actually Work",
      excerpt:
        "Explore different revenue streams and learn how successful creators are building sustainable income from their content.",
      author: "Elena Rodriguez",
      date: "December 10, 2024",
      readTime: "7 min read",
      category: "Monetization",
      image: "/creator-counting-money-with-laptop-showing-analyti.png",
      slug: "monetization-strategies",
    },
    {
      title: "Building Authentic Communities in the Digital Age",
      excerpt:
        "Discover how to foster genuine connections and create meaningful experiences for your audience members.",
      author: "Alex Thompson",
      date: "December 8, 2024",
      readTime: "5 min read",
      category: "Community",
      image: "/diverse-group-of-people-connecting-online.png",
      slug: "building-authentic-communities",
    },
    {
      title: "The Psychology of Viewer Engagement",
      excerpt:
        "Understanding what drives audience participation and how to create content that resonates on a deeper level.",
      author: "Dr. Lisa Chen",
      date: "December 5, 2024",
      readTime: "9 min read",
      category: "Psychology",
      image: "/brain-with-social-media-icons-and-engagement-metri.png",
      slug: "psychology-viewer-engagement",
    },
    {
      title: "Technical Setup Guide for Professional Streaming",
      excerpt: "Everything you need to know about equipment, software, and settings for broadcast-quality streams.",
      author: "Tech Team",
      date: "December 3, 2024",
      readTime: "12 min read",
      category: "Technical",
      image: "/professional-streaming-equipment-setup.png",
      slug: "technical-streaming-guide",
    },
    {
      title: "Creator Burnout: Recognition and Recovery",
      excerpt:
        "How to identify the signs of burnout and implement strategies for maintaining long-term creative sustainability.",
      author: "Sarah Kim",
      date: "December 1, 2024",
      readTime: "8 min read",
      category: "Wellness",
      image: "/creator-taking-a-break-from-computer-in-peaceful-s.png",
      slug: "creator-burnout-recovery",
    },
  ]

  const categories = [
    { name: "All Posts", count: 24, icon: Zap },
    { name: "Creator Tips", count: 8, icon: TrendingUp },
    { name: "Technical", count: 6, icon: Video },
    { name: "Community", count: 5, icon: Users },
    { name: "Industry Insights", count: 3, icon: TrendingUp },
    { name: "Monetization", count: 2, icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                Creator
              </span>
              <br />
              <span className="text-red-500">Insights</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
              Tips, strategies, and insights to help you succeed as a creator. Learn from industry experts and
              successful creators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Article</h2>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-8 lg:p-12">
                  <div className="inline-block bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {featuredPost.category}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{featuredPost.title}</h3>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center text-red-400 hover:text-red-300 font-semibold transition-colors"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
                <div className="lg:p-8">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24"
              >
                <h3 className="text-xl font-bold mb-6">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((category, index) => (
                    <li key={category.name}>
                      <button className="flex items-center justify-between w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors group">
                        <div className="flex items-center space-x-3">
                          <category.icon className="w-4 h-4 text-red-400" />
                          <span className="group-hover:text-white transition-colors">{category.name}</span>
                        </div>
                        <span className="text-sm text-gray-400">{category.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="inline-block bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium mb-3">
                        {post.category}
                      </div>
                      <h3 className="text-xl font-bold mb-3 leading-tight">{post.title}</h3>
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <div className="flex items-center space-x-3">
                          <span>{post.author}</span>
                          <span>{post.date}</span>
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-red-400 hover:text-red-300 font-semibold text-sm transition-colors"
                      >
                        Read More
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Load More */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20">
                  Load More Articles
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12"
          >
            <h2 className="text-4xl font-bold mb-6">
              Stay Updated with <span className="text-red-500">Creator Insights</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the latest tips, strategies, and industry insights delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4">No spam, unsubscribe at any time.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BlogPage
