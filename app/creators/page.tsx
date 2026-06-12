"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Users, Sparkles } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function CreatorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("followers")

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

  const creators = [
    {
      id: 1,
      name: "ProGamer Mike",
      avatar: "/diverse-user-avatar-set-2.png",
      category: "gaming",
      followers: 45000,
      bio: "Professional esports player and tournament host",
      totalStreams: 234,
      totalVideos: 89,
      avgViewers: 3500,
      isVerified: true,
      featured: true,
    },
    {
      id: 2,
      name: "Beat Maker Pro",
      avatar: "/music-producer-avatar.png",
      category: "music",
      followers: 32000,
      bio: "Music producer specializing in beats and sound design",
      totalStreams: 156,
      totalVideos: 124,
      avgViewers: 2100,
      isVerified: true,
      featured: true,
    },
    {
      id: 3,
      name: "Chef Amara",
      avatar: "/diverse-user-avatar-set-2.png",
      category: "lifestyle",
      followers: 28000,
      bio: "Chef teaching authentic African cuisine",
      totalStreams: 89,
      totalVideos: 234,
      avgViewers: 1800,
      isVerified: true,
      featured: false,
    },
    {
      id: 4,
      name: "Tech Innovator",
      avatar: "/diverse-user-avatars.png",
      category: "technology",
      followers: 52000,
      bio: "Tech trends, AI, and digital innovation",
      totalStreams: 201,
      totalVideos: 167,
      avgViewers: 4200,
      isVerified: true,
      featured: true,
    },
    {
      id: 5,
      name: "Photo Master",
      avatar: "/diverse-user-avatars.png",
      category: "art",
      followers: 19000,
      bio: "Photography tutorials and creative inspiration",
      totalStreams: 67,
      totalVideos: 95,
      avgViewers: 1200,
      isVerified: false,
      featured: false,
    },
    {
      id: 6,
      name: "Fitness Coach",
      avatar: "/diverse-user-avatar-set-2.png",
      category: "lifestyle",
      followers: 35000,
      bio: "Home workouts and fitness motivation",
      totalStreams: 178,
      totalVideos: 289,
      avgViewers: 2800,
      isVerified: true,
      featured: false,
    },
    {
      id: 7,
      name: "Business Mentor",
      avatar: "/diverse-user-avatars.png",
      category: "business",
      followers: 41000,
      bio: "Entrepreneurship and business growth strategies",
      totalStreams: 145,
      totalVideos: 156,
      avgViewers: 3100,
      isVerified: true,
      featured: false,
    },
    {
      id: 8,
      name: "Afro King",
      avatar: "/diverse-user-avatar-set-2.png",
      category: "music",
      followers: 58000,
      bio: "Afrobeats music artist and live performance host",
      totalStreams: 267,
      totalVideos: 198,
      avgViewers: 5600,
      isVerified: true,
      featured: true,
    },
  ]

  const filteredCreators = () => {
    let filtered = creators

    if (searchTerm) {
      filtered = filtered.filter(
        (creator) =>
          creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creator.bio.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((creator) => creator.category === selectedCategory)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "followers":
          return b.followers - a.followers
        case "trending":
          return b.avgViewers - a.avgViewers
        case "new":
          return b.id - a.id
        default:
          return 0
      }
    })

    return filtered
  }

  const featuredCreators = creators.filter((c) => c.featured)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
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
              <span>Discover Amazing Creators</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                Explore Creators
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Follow your favorite creators and get notified about their latest streams, events, and exclusive content.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-12 space-y-12">
        {/* Featured Creators */}
        {featuredCreators.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Featured Creators</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCreators.map((creator, index) => (
                <motion.div
                  key={creator.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-red-600/30 transition-all duration-300"
                >
                  <div className="relative mb-6">
                    <img
                      src={creator.avatar || "/placeholder.svg"}
                      alt={creator.name}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="text-lg font-bold">{creator.name}</h3>
                      {creator.isVerified && <span className="text-blue-400 text-sm">✓</span>}
                    </div>

                    <p className="text-sm text-gray-400 mb-4 capitalize">{creator.category}</p>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">{creator.bio}</p>

                    <div className="space-y-2 mb-6 text-sm text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{creator.followers.toLocaleString()} followers</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span>{creator.totalStreams} streams</span>
                      </div>
                    </div>

                    <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                      Follow
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

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
              placeholder="Search creators by name or bio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

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
              <option value="followers" className="bg-black">
                Sort by Followers
              </option>
              <option value="trending" className="bg-black">
                Trending
              </option>
              <option value="new" className="bg-black">
                New
              </option>
            </select>

            <div className="flex items-center gap-2 text-gray-400">
              <Filter className="w-4 h-4" />
              <span className="text-sm">{filteredCreators().length} creators</span>
            </div>
          </div>
        </motion.div>

        {/* All Creators Grid */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">All Creators</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators().map((creator, index) => (
              <motion.div
                key={creator.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-center">
                  <img
                    src={creator.avatar || "/placeholder.svg"}
                    alt={creator.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-red-600"
                  />

                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-lg font-bold">{creator.name}</h3>
                    {creator.isVerified && <span className="text-blue-400">✓</span>}
                  </div>

                  <p className="text-sm text-gray-400 mb-3 capitalize">{creator.category}</p>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2 min-h-10">{creator.bio}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-xs text-gray-400">
                    <div>
                      <div className="font-semibold text-white">{creator.followers.toLocaleString()}</div>
                      <div>Followers</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{creator.totalStreams}</div>
                      <div>Streams</div>
                    </div>
                  </div>

                  <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium mb-2">
                    Follow
                  </button>
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors border border-white/20">
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCreators().length === 0 && (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No creators found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
