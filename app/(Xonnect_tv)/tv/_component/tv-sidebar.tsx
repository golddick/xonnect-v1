"use client"

import { useState } from "react"
import { ChevronDown, Menu, X, Home, Video, Film, Trophy, Tv, Sparkles, Gamepad2, MicVocal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"


interface TvSidebarProps {
  onItemClick?: () => void;
}


const TvSidebar = ({ onItemClick }: TvSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    following: true,
    recommended: true,
    topChannels: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const categories = [
    { id: "/", name: "Home", icon: Home, color: "text-red-500" },
    { id: "live-event", name: "Live Event", icon: Video, color: "text-red-400" },
    { id: "movie", name: "Movie", icon: Film, color: "text-purple-500" },
    { id: "sport", name: "Sport", icon: Trophy, color: "text-blue-500" },
    { id: "podcast", name: "Podcast", icon: MicVocal, color: "text-gold-500" },
    { id: "tv-show", name: "TV Show", icon: Tv, color: "text-green-500" },
    // { id: "entertainment", name: "Entertainment", icon: Sparkles, color: "text-yellow-500" },
    // { id: "game", name: "Game", icon: Gamepad2, color: "text-pink-500" },
  ]

  const followingChannels = [
    { id: 1, name: "Creative Studio", avatar: "🎨", viewers: "2.3K", live: true, category: "Music" },
    { id: 2, name: "Tech Talks", avatar: "💻", viewers: "5.1K", live: true, category: "Education" },
    { id: 3, name: "Gaming Pro", avatar: "🎮", viewers: "12K", live: true, category: "Gaming" },
  ]

  const recommendedChannels = [
    { id: 1, name: "Sports Live", viewers: "45K" },
    { id: 2, name: "Movie Night", viewers: "8.2K" },
    { id: 3, name: "DJ Sessions", viewers: "3.5K" },
  ]

  const topChannels = [
    { id: 1, name: "Major Event Live", viewers: "250K", trending: true },
    { id: 2, name: "Concert Stream", viewers: "180K", trending: true },
    { id: 3, name: "Gaming Tournament", viewers: "156K", trending: true },
  ]

  return (
    <div>
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? "60px" : "200px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-card/50 backdrop-blur-md border-r border-border h-screen hidden-scrollbar overflow-y-auto sticky top-0"
      >
        <div className="p-4 space-y-6">
          {/* Logo & Toggle */}
          <div className="hidden lg:flex items-center justify-between">
            {!isCollapsed && <h1 className="font-bold text-foreground text-lg">Xonnect TV</h1>}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isCollapsed ? <Menu className="w-5 h-5 text-foreground" /> : <X className="w-5 h-5 text-foreground" />}
            </button>
          </div>

          <div className="border-none">
            <button
              onClick={() => toggleSection("categories")}
              className="flex items-center justify-between w-full px-3 py-2 hover:bg-muted rounded-lg transition-colors"
            >
              {!isCollapsed && <h3 className="text-xs font-semibold text-muted-foreground uppercase">Categories</h3>}
              {!isCollapsed && (
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${expandedSections.categories ? "rotate-180" : ""}`}
                />
              )}
            </button>
            <AnimatePresence>
              {expandedSections.categories && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1 mt-2"
                >
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <Link
                        key={category.id}
                        href={`/tv/${category.id}`}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <Icon className={`w-5 h-5 flex-shrink-0 ${category.color}`} />
                        {!isCollapsed && (
                          <span className="text-sm text-muted-foreground group-hover:text-foreground">{category.name}</span>
                        )}
                      </Link>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Following Section */}
          <div className="border-t border-border pt-4">
            <button
              onClick={() => toggleSection("following")}
              className="flex items-center justify-between w-full px-3 py-2 hover:bg-muted rounded-lg transition-colors"
            >
              {!isCollapsed && <h3 className="text-xs font-semibold text-muted-foreground uppercase">Following</h3>}
              {!isCollapsed && (
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${expandedSections.following ? "rotate-180" : ""}`}
                />
              )}
            </button>
            <AnimatePresence>
              {expandedSections.following && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 mt-2"
                >
                  {followingChannels.map((channel) => (
                    <Link
                      key={channel.id}
                      href={`/tv/watch/${channel.id}`}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <span className="text-lg flex-shrink-0">{channel.avatar}</span>
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-muted-foreground group-hover:text-foreground truncate">{channel.name}</p>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-xs text-red-400">{channel.viewers} watching</span>
                          </div>
                        </div>
                      )}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Recommended Section */}
          <div className="border-t border-border pt-4">
            <button
              onClick={() => toggleSection("recommended")}
              className="flex items-center justify-between w-full px-3 py-2 hover:bg-muted rounded-lg transition-colors"
            >
              {!isCollapsed && <h3 className="text-xs font-semibold text-muted-foreground uppercase">Recommended</h3>}
              {!isCollapsed && (
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${expandedSections.recommended ? "rotate-180" : ""}`}
                />
              )}
            </button>
            <AnimatePresence>
              {expandedSections.recommended && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 mt-2"
                >
                  {recommendedChannels.map((channel) => (
                    <Link
                      key={channel.id}
                      href={`/tv/watch/${channel.id}`}
                      className="px-3 py-2 rounded-lg hover:bg-muted transition-colors group block"
                    >
                      {!isCollapsed && (
                        <p className="text-sm text-muted-foreground group-hover:text-foreground truncate">{channel.name}</p>
                      )}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Top Channels Section */}
          <div className="border-t border-border pt-4">
            <button
              onClick={() => toggleSection("topChannels")}
              className="flex items-center justify-between w-full px-3 py-2 hover:bg-muted rounded-lg transition-colors"
            >
              {!isCollapsed && <h3 className="text-xs font-semibold text-muted-foreground uppercase">Top Channels</h3>}
              {!isCollapsed && (
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${expandedSections.topChannels ? "rotate-180" : ""}`}
                />
              )}
            </button>
            <AnimatePresence>
              {expandedSections.topChannels && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 mt-2"
                >
                  {topChannels.map((channel) => (
                    <Link
                      key={channel.id}
                      href={`/tv/watch/${channel.id}`}
                      className="px-3 py-2 rounded-lg hover:bg-muted transition-colors group block"
                    >
                      {!isCollapsed && (
                        <div>
                          <p className="text-sm text-muted-foreground group-hover:text-foreground truncate">{channel.name}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <span className="text-xs text-red-400">{channel.viewers}</span>
                            {channel.trending && <span className="text-xs text-red-500">📈</span>}
                          </div>
                        </div>
                      )}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default TvSidebar

