
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
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
  Bell,
  BellOff,
} from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import LoadingSplash from "@/components/splash_screen/loading-splash"

interface ContentItem {
  id: string
  title: string
  creator: string
  avatar: string
  thumbnail: string
  category: string
  type: "live" | "video" | "scheduled"
  tags: string[]
  isPremium?: boolean
  price?: number
  viewers?: number
  isLive?: boolean
  duration?: string
  views?: number
  likes?: number
  uploadDate?: string
  scheduledFor?: string
  expectedViewers?: number
  ticketPrice?: number
  slug: string
  description: string
  hasReminder?: boolean
}

interface ApiResponse {
  content: ContentItem[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}

interface ReminderResponse {
  success: boolean
  message: string
  reminder?: any
}

export default function EventsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [showAllEvents, setShowAllEvents] = useState(false)
  const [events, setEvents] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reminderLoading, setReminderLoading] = useState<string | null>(null)

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

  // Fetch data from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const params = new URLSearchParams()
        
        if (activeTab !== "all") {
          if (activeTab === "live") params.append("type", "live")
          else if (activeTab === "scheduled") params.append("type", "scheduled")
          else if (activeTab === "video") params.append("type", "videos")
        }
        
        if (selectedCategory !== "all") {
          params.append("category", selectedCategory)
        }
        
        if (searchTerm) {
          params.append("search", searchTerm)
        }
        
        params.append("limit", "10")
        
        const response = await fetch(`/api/content?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch events")
        }
        
        const data: ApiResponse = await response.json()
        setEvents(data.content)
      } catch (err) {
        console.error("Error fetching events:", err)
        setError("Failed to load events. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [activeTab, selectedCategory, searchTerm])

  // Toggle reminder for an event
  const toggleReminder = async (event: ContentItem) => {
    if (event.type !== "scheduled") return; // Only allow reminders for scheduled events
    
    try {
      setReminderLoading(event.id)
      
      const response = await fetch('/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event.id,
          eventType: 'STREAM', // or 'COMMUNITY_EVENT' based on your event type
          scheduledTime: event.scheduledFor,
        }),
      })

      const result: ReminderResponse = await response.json()

      if (result.success) {
        // Update the event's reminder status locally
        toast.success(`Reminder ${event.hasReminder ? 'removed' : 'set'} for "${event.title}"`)
        setEvents(prevEvents => 
          prevEvents.map(e => 
            e.id === event.id 
              ? { ...e, hasReminder: !e.hasReminder } 
              : e
          )
        )
      } else {
        toast.error(`Failed to ${event.hasReminder ? 'remove' : 'set'} reminder for "${event.title}": ${result.message}`)
        console.error('Failed to toggle reminder:', result.message)
      }
    } catch (err) {
      console.error('Error toggling reminder:', err)
    } finally {
      setReminderLoading(null)
    }
  }

  // Filter and sort events client-side
  const filteredEvents = () => {
    let filtered = [...events]

    if (activeTab === "live") {
      filtered = filtered.filter(event => event.type === "live")
    } else if (activeTab === "scheduled") {
      filtered = filtered.filter(event => event.type === "scheduled")
    } else if (activeTab === "video") {
      filtered = filtered.filter(event => event.type === "video")
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          const dateA = new Date(getEventDate(a) || 0)
          const dateB = new Date(getEventDate(b) || 0)
          return dateB.getTime() - dateA.getTime()
        case "popularity":
          return (b.likes || 0) - (a.likes || 0)
        case "viewers":
          return (getViewerCount(b) - getViewerCount(a))
        case "price":
          return ((b.price || b.ticketPrice || 0) - (a.price || a.ticketPrice || 0))
        default:
          return 0
      }
    })

    return filtered
  }

  const getEventDate = (event: ContentItem) => {
    if (event.type === "scheduled") return event.scheduledFor
    if (event.type === "video") return event.uploadDate
    return new Date().toISOString()
  }

  const getViewerCount = (event: ContentItem) => {
    if (event.type === "live") return event.viewers || 0
    if (event.type === "scheduled") return event.expectedViewers || 0
    if (event.type === "video") return event.views || 0
    return 0
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

  const handleEventClick = (event: ContentItem) => {
    if (event.type === "live") {
      router.push(`/watch/stream/${event.slug}`)
    } else if (event.type === "video") {
      router.push(`/watch/video/${event.slug}`)
    } else if (event.type === "scheduled") {
      router.push(`/watch/stream/${event.slug}`)
    }
  }

  if (loading && events.length === 0) {
    return (
      <LoadingSplash/>
    )
  }

  if (error && events.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Error loading events</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-[120rem] mx-auto text-center">
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
                On Xonnect
              </span>
            </h1>

          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-[120rem] mx-auto px-6 md:px-8 py-8 space-y-12">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-red-500 mb-2">
              {events.filter(e => e.type === "live" && e.isLive).length}
            </div>
            <div className="text-gray-400">Live Now</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {events.filter(e => e.type === "scheduled").length}
            </div>
            <div className="text-gray-400">Scheduled</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">
              {events.filter(e => e.type === "video").length}
            </div>
            <div className="text-gray-400">Videos</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">
              {events.filter((e) => e.isPremium || e.price || e.ticketPrice).length}
            </div>
            <div className="text-gray-400">Premium</div>
          </div>
        </motion.div>

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

          {/* {loading && (
            <div className="flex justify-center py-8">
              <LoaderPage />
            </div>
          )} */}

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
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="relative">
                    <Image
                      src={event.thumbnail || "/placeholder.svg"}
                      alt={event.title}
                      width={400}
                      height={192}
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
                          {getTimeUntilEvent(event.scheduledFor || "")}
                        </span>
                      )}
                      {event.type === "video" && (
                        <span className="bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-medium">
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
                              {(event.viewers || 0).toLocaleString()}
                            </>
                          )}
                          {event.type === "scheduled" && (
                            <>
                              <Users className="w-3 h-3" />
                              {(event.expectedViewers || 0).toLocaleString()}
                            </>
                          )}
                          {event.type === "video" && (
                            <>
                              <Eye className="w-3 h-3" />
                              {(event.views || 0).toLocaleString()}
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {(event.isPremium || event.price || event.ticketPrice) && (
                      <div className="absolute bottom-4 right-4 bg-yellow-600/90 backdrop-blur-sm rounded-lg px-2 py-1">
                        <span className="text-white text-xs font-medium flex items-center gap-1">
                          <Crown className="w-3 h-3" />₦{event.price || event.ticketPrice || 0}
                        </span>
                      </div>
                    )}

                    {/* Reminder Button for Scheduled Events */}
                    {event.type === "scheduled" && (
                      <div className="absolute bottom-4 left-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleReminder(event)
                          }}
                          disabled={reminderLoading === event.id}
                          className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                            event.hasReminder
                              ? "bg-green-600/90 border-green-500 text-white"
                              : "bg-black/70 border-white/30 text-gray-300 hover:bg-black/90 hover:text-white"
                          } ${reminderLoading === event.id ? "opacity-50 cursor-not-allowed" : ""}`}
                          title={event.hasReminder ? "Remove reminder" : "Set reminder"}
                        >
                          {reminderLoading === event.id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : event.hasReminder ? (
                            <Bell className="w-4 h-4" />
                          ) : (
                            <BellOff className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <Image
                        src={event.avatar || "/placeholder.svg"}
                        alt={event.creator}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white line-clamp-2">{event.title}</h3>
                        <p className="text-gray-400 text-sm">{event.creator}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {event.description || `Join ${event.creator} for this ${event.type} event`}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags?.slice(0, 2).map((tag, i) => (
                        <span key={i} className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2 mb-4">
                      {event.type === "scheduled" && event.scheduledFor && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <CalendarDays className="w-4 h-4" />
                          <span>{formatDate(event.scheduledFor)}</span>
                          {event.hasReminder && (
                            <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                              <Bell className="w-3 h-3" />
                              Reminder Set
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {(event.likes || 0).toLocaleString()}
                      </span>
                      <button
                        className={`px-4 py-2 rounded-lg transition-colors text-white text-sm ${
                          event.type === "live"
                            ? "bg-red-600 hover:bg-red-700"
                            : event.type === "scheduled"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-yellow-600 hover:bg-yellow-700"
                        }`}
                      >
                        {event.type === "live" ? "Watch" : event.type === "scheduled" ? "View" : "Play"}
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

          {filteredEvents().length === 0 && !loading && (
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
    </div>
  )
}