"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Play,
  Eye,
  Users,
  Calendar,
  Heart,
  Search,
  Filter,
  Zap,
  Ticket,
  Video,
  Radio,
  UserPlus,
  Crown,
  TrendingUp,
  Grid,
  List,
  DollarSign,
} from "lucide-react"
import { motion } from "framer-motion"

export default function StreamExplorer() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  const categories = [
    "all",
    "music",
    "gaming",
    "education",
    "entertainment",
    "technology",
    "lifestyle",
    "sports",
    "art",
  ]

  const liveStreams = [
    {
      id: 1,
      title: "Live Music Performance - Jazz Night",
      creator: "Sarah Johnson",
      avatar: "/diverse-user-avatars.png",
      thumbnail: "/vibrant-concert.png",
      category: "music",
      viewers: 1250,
      isLive: true,
      duration: "2h 15m",
      tags: ["jazz", "live music", "performance"],
      isPremium: false,
    },
    {
      id: 2,
      title: "Gaming Tournament Finals",
      creator: "ProGamer Mike",
      avatar: "/diverse-user-avatar-set-2.png",
      thumbnail: "/gaming-tournament.png",
      category: "gaming",
      viewers: 3400,
      isLive: true,
      duration: "4h 30m",
      tags: ["esports", "tournament", "competitive"],
      isPremium: true,
      price: 500,
    },
  ]

  const videos = [
    {
      id: 1,
      title: "Music Production Masterclass",
      creator: "Beat Maker Pro",
      avatar: "/diverse-user-avatars.png",
      thumbnail: "/music-production-setup.png",
      category: "education",
      views: 12500,
      likes: 890,
      duration: "25:42",
      uploadDate: "2024-01-15",
      tags: ["music production", "tutorial", "beats"],
      isPremium: true,
      price: 1200,
    },
    {
      id: 2,
      title: "Behind the Scenes: Studio Tour",
      creator: "Creative Studios",
      avatar: "/diverse-user-avatar-set-2.png",
      thumbnail: "/studio-tour.png",
      category: "entertainment",
      views: 8900,
      likes: 654,
      duration: "15:23",
      uploadDate: "2024-01-12",
      tags: ["behind the scenes", "studio", "creative"],
      isPremium: false,
    },
    {
      id: 3,
      title: "Advanced Photography Techniques",
      creator: "Photo Master",
      avatar: "/diverse-user-avatars.png",
      thumbnail: "/photography-studio.png",
      category: "education",
      views: 6700,
      likes: 445,
      duration: "32:18",
      uploadDate: "2024-01-10",
      tags: ["photography", "techniques", "advanced"],
      isPremium: true,
      price: 800,
    },
  ]

  const scheduledEvents = [
    {
      id: 1,
      title: "Live Concert: Afrobeats Night",
      creator: "Afro King",
      avatar: "/diverse-user-avatars.png",
      thumbnail: "/afrobeats-concert.png",
      category: "music",
      scheduledFor: "2024-01-25T20:00:00Z",
      expectedViewers: 2500,
      ticketPrice: 1500,
      tags: ["afrobeats", "concert", "live"],
    },
    {
      id: 2,
      title: "Tech Talk: AI in Creative Industries",
      creator: "Tech Innovator",
      avatar: "/diverse-user-avatar-set-2.png",
      thumbnail: "/tech-presentation.png",
      category: "technology",
      scheduledFor: "2024-01-22T15:00:00Z",
      expectedViewers: 800,
      ticketPrice: 0,
      tags: ["AI", "technology", "creative"],
    },
  ]

  const communities = [
    {
      id: 1,
      name: "Music Producers Hub",
      description: "Connect with fellow music producers and share your beats",
      members: 12500,
      category: "music",
      image: "/vibrant-music-community.png",
      isJoined: false,
      tags: ["music", "production", "beats"],
    },
    {
      id: 2,
      name: "Creative Minds",
      description: "A space for artists, designers, and creative professionals",
      members: 8900,
      category: "art",
      image: "/creative-community.png",
      isJoined: true,
      tags: ["art", "design", "creative"],
    },
    {
      id: 3,
      name: "Gaming Legends",
      description: "Join the ultimate gaming community for pros and enthusiasts",
      members: 25600,
      category: "gaming",
      image: "/vibrant-gaming-community.png",
      isJoined: false,
      tags: ["gaming", "esports", "community"],
    },
  ]

  const filteredContent = () => {
    let allContent = []

    if (activeTab === "all" || activeTab === "live") {
      allContent = [...allContent, ...liveStreams.map((item) => ({ ...item, type: "live" }))]
    }
    if (activeTab === "all" || activeTab === "videos") {
      allContent = [...allContent, ...videos.map((item) => ({ ...item, type: "video" }))]
    }
    if (activeTab === "all" || activeTab === "scheduled") {
      allContent = [...allContent, ...scheduledEvents.map((item) => ({ ...item, type: "scheduled" }))]
    }

    return allContent.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "live":
        return <Radio className="w-4 h-4 text-red-400" />
      case "video":
        return <Play className="w-4 h-4 text-blue-400" />
      case "scheduled":
        return <Calendar className="w-4 h-4 text-yellow-400" />
      default:
        return <Video className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Xonnect</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                  Explore
                </h1>
                <p className="text-gray-400 text-sm">Discover amazing content from creators worldwide</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/creator/signup")}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Become a Creator
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner with Gradient */}
      <section className="relative h-64 md:h-80 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-purple-600/20 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 h-full flex items-center px-6 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent mb-4">
                Discover Amazing Content
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Stream live events, watch premium videos, and connect with creators worldwide
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 space-y-12">
        {/* Enhanced Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search streams, videos, events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-black">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-xl border transition-all ${
                    viewMode === "grid"
                      ? "bg-red-600 border-red-600 text-white"
                      : "bg-white/10 border-white/20 text-gray-400 hover:text-white"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-xl border transition-all ${
                    viewMode === "list"
                      ? "bg-red-600 border-red-600 text-white"
                      : "bg-white/10 border-white/20 text-gray-400 hover:text-white"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tab Filters */}
            <div className="flex flex-wrap gap-2">
              {["all", "live", "videos", "scheduled"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg transition-all capitalize flex items-center gap-2 ${
                    activeTab === tab
                      ? "bg-red-600 text-white"
                      : "bg-white/10 text-gray-400 hover:text-white border border-white/20"
                  }`}
                >
                  {tab === "live" && <Radio className="w-4 h-4" />}
                  {tab === "videos" && <Play className="w-4 h-4" />}
                  {tab === "scheduled" && <Calendar className="w-4 h-4" />}
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trending Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-red-500" />
              Trending Now
            </h2>
            <button
              onClick={() => router.push("/events")}
              className="text-red-400 hover:text-red-300 text-sm font-semibold"
            >
              View All →
            </button>
          </div>

          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : ""}`}>
            {liveStreams.slice(0, 4).map((stream, index) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={stream.thumbnail || "/placeholder.svg"}
                    alt={stream.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                    <span className="text-white text-xs flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {stream.viewers.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">{stream.title}</h3>
                  <p className="text-gray-400 text-xs mb-3">{stream.creator}</p>
                  {stream.isPremium && (
                    <div className="flex items-center gap-1 text-yellow-400 text-xs font-semibold">
                      <Crown className="w-3 h-3" />
                      Premium - ₦{stream.price}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Tickets Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6 bg-gradient-to-r from-red-600/10 to-purple-600/10 border border-red-600/20 rounded-2xl p-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Ticket className="w-8 h-8 text-red-500" />
              Available Tickets
            </h2>
            <button
              onClick={() => router.push("/tickets")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center gap-2"
            >
              <span>View All Tickets</span>
              <Eye className="w-4 h-4" />
            </button>
          </div>

          <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : ""}`}>
            {scheduledEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-white line-clamp-2">{event.title}</h3>
                    <p className="text-gray-400 text-sm">{event.creator}</p>
                  </div>
                  {event.ticketPrice > 0 && (
                    <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                      ₦{event.ticketPrice}
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-red-400" />
                    <span>{new Date(event.scheduledFor).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-red-400" />
                    <span>{event.expectedViewers.toLocaleString()} expected</span>
                  </div>
                </div>

                <button className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                  <Ticket className="w-4 h-4" />
                  Get Ticket
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">
                {activeTab === "all" ? "All Content" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <div className="flex items-center gap-2 text-gray-400">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Results</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredContent().map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:bg-gray-900/70 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      {item.type === "live" && (
                        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          LIVE
                        </span>
                      )}
                      {item.type === "scheduled" && (
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          SCHEDULED
                        </span>
                      )}
                      {item.type === "video" && item.isPremium && (
                        <span className="bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Crown className="w-3 h-3" />
                          PREMIUM
                        </span>
                      )}
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute top-3 right-3 space-y-1">
                      {item.type === "live" && (
                        <div className="bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                          <span className="text-white text-xs flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {item.viewers?.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {item.type === "video" && (
                        <div className="bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                          <span className="text-white text-xs">{item.duration}</span>
                        </div>
                      )}
                      {item.type === "scheduled" && (
                        <div className="bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                          <span className="text-white text-xs flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {item.expectedViewers?.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price Badge */}
                    {(item.isPremium || item.ticketPrice > 0) && (
                      <div className="absolute bottom-3 right-3 bg-yellow-600/90 backdrop-blur-sm rounded px-2 py-1">
                        <span className="text-white text-xs font-medium flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />₦{item.price || item.ticketPrice}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={item.avatar || "/placeholder.svg"}
                        alt={item.creator}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.creator}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags?.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-4">
                        {item.type === "video" && (
                          <>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {item.views?.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {item.likes?.toLocaleString()}
                            </span>
                          </>
                        )}
                        {item.type === "scheduled" && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(item.scheduledFor).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <span className="capitalize text-xs bg-gray-800 px-2 py-1 rounded">{item.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredContent().length === 0 && (
              <div className="text-center py-16">
                <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No content found</h3>
                <p className="text-gray-500">Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Communities */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Communities</h3>
                <button className="text-red-400 hover:text-red-300 text-sm">View All</button>
              </div>

              <div className="space-y-4">
                {communities.map((community) => (
                  <div
                    key={community.id}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={community.image || "/placeholder.svg"}
                        alt={community.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{community.name}</h4>
                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{community.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-xs flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {community.members.toLocaleString()} members
                          </span>
                          <button
                            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                              community.isJoined
                                ? "bg-gray-700 text-gray-300"
                                : "bg-red-600 hover:bg-red-700 text-white"
                            }`}
                          >
                            {community.isJoined ? "Joined" : "Join"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Creators */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Top Creators</h3>
                <button className="text-red-400 hover:text-red-300 text-sm">View All</button>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Sarah Johnson", followers: "125K", category: "Music", avatar: "/diverse-user-avatars.png" },
                  {
                    name: "ProGamer Mike",
                    followers: "89K",
                    category: "Gaming",
                    avatar: "/diverse-user-avatar-set-2.png",
                  },
                  {
                    name: "Beat Maker Pro",
                    followers: "67K",
                    category: "Education",
                    avatar: "/diverse-user-avatars.png",
                  },
                ].map((creator, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <img
                      src={creator.avatar || "/placeholder.svg"}
                      alt={creator.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">{creator.name}</h4>
                      <p className="text-gray-400 text-xs">{creator.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm font-medium">{creator.followers}</p>
                      <button className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1">
                        <UserPlus className="w-3 h-3" />
                        Follow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
