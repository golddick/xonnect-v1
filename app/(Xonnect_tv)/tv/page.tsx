"use client"

import { useState } from "react"
import { Search, Grid3x3, List, Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import TvSidebar from "@/app/(Xonnect_tv)/tv/_component/tv-sidebar"
import StreamCard from "@/app/(Xonnect_tv)/tv/_component/stream-card"
import { AvatarDropdownMenu } from "@/components/common_component/AvatarDropdown"
import { ThemeToggle } from "@/components/theme-toggle"

const TvPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("viewers")
  const [selectedCategory, setSelectedCategory] = useState("home")
  const [showMobileMenu, setShowMobileMenu] = useState(false)



  const featuredStreams = [
    {
      id: "1",
      title: "Championship Finals - Live Coverage",
      channel: "Sports Channel",
      thumbnail: "/sports-event.jpg",
      viewers: 125000,
      category: "Sports",
    },
    {
      id: "2",
      title: "Electronic Music Festival - Day 2",
      channel: "Music Live",
      thumbnail: "/music-festival.jpg",
      viewers: 85000,
      category: "Music",
    },
    {
      id: "3",
      title: "Tech Conference 2024 - Opening Keynote",
      channel: "Tech World",
      thumbnail: "/tech-conference.jpg",
      viewers: 56000,
      category: "Education",
    },
  ]

  const liveStreams = [
    {
      id: "1",
      thumbnail: "/gaming-setup.png",
      title: "Competitive Gaming Tournament - Grand Finals",
      channelName: "GamePro Network",
      channelAvatar: "🎮",
      viewers: 45000,
      isLive: true,
      category: "Gaming",
    },
    {
      id: "2",
      thumbnail: "/music-performance.jpg",
      title: "Live DJ Set - Electronic Vibes",
      channelName: "DJ Sessions",
      channelAvatar: "🎧",
      viewers: 28000,
      isLive: true,
      category: "Music",
    },
    {
      id: "3",
      thumbnail: "/cooking-show.jpg",
      title: "Master Chef Cooking Tutorial",
      channelName: "Culinary Arts",
      channelAvatar: "👨‍🍳",
      viewers: 18000,
      isLive: true,
      category: "Lifestyle",
    },
    {
      id: "4",
      thumbnail: "/diverse-group-workout.png",
      title: "Live Fitness Training - HIIT Session",
      channelName: "FitLife TV",
      channelAvatar: "💪",
      viewers: 12000,
      isLive: true,
      category: "Lifestyle",
    },
    {
      id: "5",
      thumbnail: "/movie-premiere.jpg",
      title: "Movie Premiere - Exclusive Watch Party",
      channelName: "Cinema Live",
      channelAvatar: "🎬",
      viewers: 92000,
      isLive: true,
      category: "Movies",
    },
    {
      id: "6",
      thumbnail: "/coding-session.jpg",
      title: "Web Development Masterclass",
      channelName: "Code Academy",
      channelAvatar: "💻",
      viewers: 8500,
      isLive: true,
      category: "Education",
    },
  ]

  const [carouselIndex, setCarouselIndex] = useState(0)

  return (
    <div className="flex h-screen bg-background overflow-hidden hidden-scrollbar flex-col lg:flex-row">


      {/* Main Content */}
      <div className="flex-1 overflow-y-auto hidden-scrollbar flex flex-col">
        {/* Category Navigation - Horizontal scrollable on desktop, dropdown on mobile */}
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md ">

          {/* Top Bar with Search and Controls */}
          <div className=" hidden lg:flex items-center justify-between gap-4 px-4 md:px-6 py-3 border-t border-white/10 lg:border-t-0">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Discover</h1>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search streams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-gray-500 focus:outline-none focus:border-red-500 text-sm w-64"
                />
              </div>

              {/* View Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-red-600" : "bg-white/10 hover:bg-white/20"}`}
                >
                  <Grid3x3 className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors hidden md:block ${viewMode === "list" ? "bg-red-600" : "bg-white/10 hover:bg-white/20"}`}
                >
                  <List className="w-4 h-4 text-foreground" />
                </button>
              </div>

               <ThemeToggle />
               <AvatarDropdownMenu/>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 space-y-8">
          {/* Featured Carousel */}
          <div className="space-y-4">
            <motion.div
              key={carouselIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative rounded-2xl overflow-hidden bg-muted aspect-video"
            >
              <img
                src={featuredStreams[carouselIndex].thumbnail || "/placeholder.svg"}
                alt={featuredStreams[carouselIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-red-500 text-sm font-bold">LIVE</span>
                  <span className="text-foreground text-sm">
                    {featuredStreams[carouselIndex].viewers.toLocaleString()} watching
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {featuredStreams[carouselIndex].title}
                </h3>
                <p className="text-muted-foreground mb-4">{featuredStreams[carouselIndex].channel}</p>
                <button className="w-fit bg-red-600 hover:bg-red-700 text-foreground px-8 py-3 rounded-lg font-bold transition-colors">
                  Watch Now
                </button>
              </div>
            </motion.div>

            {/* Carousel Navigation */}
            <div className="flex gap-2 justify-center">
              {featuredStreams.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCarouselIndex(index)}
                  className={`h-1 rounded-full transition-all ${index === carouselIndex ? "bg-red-600 w-8" : "bg-white/20 w-2 hover:bg-white/40"}`}
                />
              ))}
            </div>
          </div>

          {/* Live Streams Grid */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Live Now</h2>
            <div
              className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
            >
              {liveStreams.map((stream) => (
                <StreamCard key={stream.id} {...stream} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TvPage

