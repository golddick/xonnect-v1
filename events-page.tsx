"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Clock,
  Eye,
  Users,
  Video,
  Search,
  Filter,
  Heart,
  Crown,
  CalendarDays,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import Navigation from "./components/navigation"
import Footer from "./components/footer"
import { motion } from "framer-motion"

export default function EventsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [showAllEvents, setShowAllEvents] = useState(false)

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
    "business",
  ]

  const sortOptions = [
    { value: "date", label: "Date" },
    { value: "popularity", label: "Popularity" },
    { value: "viewers", label: "Expected Viewers" },
    { value: "price", label: "Price" },
  ]

  const liveEvents = [
    {
      id: 1,
      title: "Live Music Concert - Afrobeats Night",
      creator: "Afro King",
      avatar: "/diverse-user-avatars.png",
      thumbnail: "/afrobeats-concert.png",
      category: "music",
      type: "live",
      viewers: 2500,
      startTime: new Date().toISOString(),
      duration: "3h 30m",
      location: "Lagos, Nigeria",
      price: 0,
      isPremium: false,
      tags: ["afrobeats", "live music", "concert"],
      description: "Join us for an electrifying night of Afrobeats music with top artists from across Africa.",
      likes: 1250,
      isLive: true,
    },
    {
      id: 2,
      title: "Gaming Tournament Finals - FIFA 24",
      creator: "ProGamer Mike",
      avatar: "/diverse-user-avatar-set-2.png",
      thumbnail: "/gaming-tournament.png",
      category: "gaming",
      type: "live",
      viewers: 4200,
      startTime: new Date().toISOString(),
      duration: "5h 00m",
      location: "Online",
      price: 500,
      isPremium: true,
      tags: ["fifa", "tournament", "esports"],
      description: "Watch the best FIFA players compete for the championship title and ₦500,000 prize pool.",
      likes: 890,
      isLive: true,
    },
  ]

  const scheduledEvents = [
    {
      id: 3,
      title: "Tech Talk: AI in Creative Industries",
      creator: "Tech Innovator",
      avatar: "/diverse-user-avatars.png",
      thumbnail: "/tech-presentation.png",
      category: "technology",
      type: "scheduled",
      expectedViewers: 1500,
      startTime: "2024-01-25T15:00:00Z",
      duration: "2h 00m",
      location: "Online",
      price: 0,
      isPremium: false,
      tags: ["AI", "technology", "creative"],
      description: "Explore how artificial intelligence is revolutionizing creative industries and workflows.",
      likes: 650,
      isLive: false,
    },
    {
      id: 4,
      title: "Cooking Masterclass - Nigerian Cuisine",
      creator: "Chef Amara",
      avatar: "/diverse-user-avatar-set-2.png",
      thumbnail: "/placeholder-6if9t.png",
      category: "lifestyle",
      type: "scheduled",
      expectedViewers: 800,
      startTime: "2024-01-26T18:00:00Z",
      duration: "1h 30m",
      location: "Online",
      price: 1200,
      isPremium: true,
      tags: ["cooking", "nigerian", "cuisine"],
      description: "Learn to cook authentic Nigerian dishes with professional chef techniques.",
      likes: 420,
      isLive: false,
    },
    {
      id: 5,
      title: "Business Workshop - Digital Marketing",
      creator: "Marketing Pro",
      avatar: "/diverse-user-avatars.png",
      thumbnail: "/placeholder-7l8ku.png",
      category: "business",
      type: "scheduled",
      expectedViewers: 1200,
      startTime: "2024-01-27T14:00:00Z",
      duration: "3h 00m",
      location: "Online",
      price: 2500,
      isPremium: true,
      tags: ["marketing", "business", "digital"],
      description: "Master digital marketing strategies to grow your business online.",
      likes: 780,
      isLive: false,
    },
  ]

  const publishedVideos = [
    {
      id: 6,
      title: "Music Production Masterclass",
      creator: "Beat Maker Pro",
      avatar: "/music-producer-avatar.png",
      thumbnail: "/music-production-setup.png",
      category: "education",
      type: "video",
      views: 25000,
      publishedDate: "2024-01-15T10:00:00Z",
      duration: "45:30",
      location: "Online",
      price: 1500,
      isPremium: true,
      tags: ["music production", "beats", "tutorial"],
      description: "Complete guide to music production from beginner to professional level.",
      likes: 1890,
      isLive: false,
    },
    {
      id: 7,
      title: "Photography Basics - Portrait Photography",
      creator: "Photo Master",
      avatar: "/diverse-user-avatars.png",
      thumbnail: "/photography-studio.png",
      category: "art",
      type: "video",
      views: 18500,
      publishedDate: "2024-01-12T16:00:00Z",
      duration: "32:15",
      location: "Online",
      price: 0,
      isPremium: false,
      tags: ["photography", "portrait", "basics"],
      description: "Learn the fundamentals of portrait photography with practical examples.",
      likes: 1240,
      isLive: false,
    },
    {
      id: 8,
      title: "Fitness Training - Home Workout Routine",
      creator: "Fitness Coach",
      avatar: "/diverse-user-avatar-set-2.png",
      thumbnail: "/placeholder-d1pia.png",
      category: "lifestyle",
      type: "video",
      views: 32000,
      publishedDate: "2024-01-10T08:00:00Z",
      duration: "28:45",
      location: "Online",
      price: 800,
      isPremium: true,
      tags: ["fitness", "workout", "home"],
      description: "Effective home workout routines that require no equipment.",
      likes: 2100,
      isLive: false,
    },
  ]

  const allEvents = [...liveEvents, ...scheduledEvents, ...publishedVideos]

  const filteredEvents = () => {
    let events = allEvents

    if (activeTab !== "all") {
      events = events.filter((event) => event.type === activeTab)
    }

    if (searchTerm) {
      events = events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory !== "all") {
      events = events.filter((event) => event.category === selectedCategory)
    }

    events.sort((a, b) => {
      switch (sortBy) {
        case "date":
          const dateA = new Date(a.startTime || a.publishedDate || 0)
          const dateB = new Date(b.startTime || b.publishedDate || 0)
          return dateB.getTime() - dateA.getTime()
        case "popularity":
          return (b.likes || 0) - (a.likes || 0)
        case "viewers":
          return (b.viewers || b.expectedViewers || b.views || 0) - (a.viewers || a.expectedViewers || a.views || 0)
        case "price":
          return (b.price || 0) - (a.price || 0)
        default:
          return 0
      }
    })

    return events
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTimeUntilEvent = (dateString: string) => {
    const now = new Date()
    const eventDate = new Date(dateString)
    const diff = eventDate.getTime() - now.getTime()

    if (diff < 0) return "Started"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section - Matching pricing/about/blog theme */}
      <section className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-600/30 text-red-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Discover, Watch & Connect</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                Live Events & Content
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Stream live shows, attend scheduled workshops, and watch premium videos from creators worldwide. All in
              one unified platform.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-8 space-y-12">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-red-500 mb-2">{liveEvents.length}</div>
            <div className="text-gray-400">Live Now</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">{scheduledEvents.length}</div>
            <div className="text-gray-400">Scheduled</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">{publishedVideos.length}</div>
            <div className="text-gray-400">Videos</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">{allEvents.filter((e) => e.isPremium).length}</div>
            <div className="text-gray-400">Premium</div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
        >
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events, creators, topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { key: "all", label: "All Events" },
              { key: "live", label: "Live Now" },
              { key: "scheduled", label: "Scheduled" },
              { key: "video", label: "Videos" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-red-600 text-white"
                    : "bg-white/10 text-gray-400 hover:text-white border border-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-col lg:flex-row gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-black">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-black">
                  Sort by {option.label}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2 text-gray-400">
              <Filter className="w-4 h-4" />
              <span className="text-sm">{filteredEvents().length} results</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Live Events */}
        {liveEvents.length > 0 && (activeTab === "all" || activeTab === "live") && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-3xl font-bold">Live Now</h2>
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {liveEvents.length} LIVE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {liveEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={event.thumbnail || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      LIVE
                    </div>
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white text-sm flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {event.viewers.toLocaleString()}
                      </span>
                    </div>
                    {event.isPremium && (
                      <div className="absolute bottom-4 right-4 bg-yellow-600/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-white text-sm font-medium flex items-center gap-1">
                          <Crown className="w-4 h-4" />₦{event.price}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <img
                        src={event.avatar || "/placeholder.svg"}
                        alt={event.creator}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                        <p className="text-gray-400 text-sm">{event.creator}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {event.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.duration}
                        </span>
                      </div>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Watch Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Main Events Grid */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">
            {activeTab === "all"
              ? "All Events"
              : activeTab === "live"
                ? "Live Events"
                : activeTab === "scheduled"
                  ? "Scheduled Events"
                  : "Published Videos"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents()
              .slice(0, showAllEvents ? undefined : 6)
              .map((event, index) => (
                <motion.div
                  key={`${event.type}-${event.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={event.thumbnail || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />

                    <div className="absolute top-4 left-4">
                      {event.type === "live" && (
                        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          LIVE
                        </span>
                      )}
                      {event.type === "scheduled" && (
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {getTimeUntilEvent(event.startTime)}
                        </span>
                      )}
                      {event.type === "video" && (
                        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          VIDEO
                        </span>
                      )}
                    </div>

                    <div className="absolute top-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                        <span className="text-white text-xs flex items-center gap-1">
                          {event.type === "live" && (
                            <>
                              <Eye className="w-3 h-3" />
                              {event.viewers?.toLocaleString()}
                            </>
                          )}
                          {event.type === "scheduled" && (
                            <>
                              <Users className="w-3 h-3" />
                              {event.expectedViewers?.toLocaleString()}
                            </>
                          )}
                          {event.type === "video" && (
                            <>
                              <Eye className="w-3 h-3" />
                              {event.views?.toLocaleString()}
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {event.isPremium && (
                      <div className="absolute bottom-4 right-4 bg-yellow-600/90 backdrop-blur-sm rounded-lg px-2 py-1">
                        <span className="text-white text-xs font-medium flex items-center gap-1">
                          <Crown className="w-3 h-3" />₦{event.price}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={event.avatar || "/placeholder.svg"}
                        alt={event.creator}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white line-clamp-2">{event.title}</h3>
                        <p className="text-gray-400 text-sm">{event.creator}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags?.slice(0, 2).map((tag, i) => (
                        <span key={i} className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2 mb-4">
                      {event.type === "scheduled" && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <CalendarDays className="w-4 h-4" />
                          <span>{formatDate(event.startTime)}</span>
                        </div>
                      )}
                      {event.type === "video" && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>Published {formatDate(event.publishedDate)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {event.likes.toLocaleString()}
                      </span>
                      <button
                        className={`px-4 py-2 rounded-lg transition-colors text-white text-sm ${
                          event.type === "live"
                            ? "bg-red-600 hover:bg-red-700"
                            : event.type === "scheduled"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {event.type === "live" ? "Watch" : event.type === "scheduled" ? "Register" : "Play"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {filteredEvents().length > 6 && !showAllEvents && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center mt-12"
            >
              <button
                onClick={() => setShowAllEvents(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg transition-colors font-semibold text-lg flex items-center gap-2"
              >
                <span>View All Events</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {filteredEvents().length === 0 && (
            <div className="text-center py-16">
              <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-600/20 to-purple-600/20 border border-red-600/30 rounded-2xl p-12 text-center"
        >
          <h3 className="text-4xl font-bold mb-6">
            Ready to Host Your Own <span className="text-red-500">Event</span>?
          </h3>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of creators who are building communities and monetizing their content on Xonnect.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => router.push("/creator/signup")}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <span>Become a Creator</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => router.push("/creator/live-streams/new")}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              Schedule Event
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
