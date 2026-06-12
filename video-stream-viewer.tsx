"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  Share2,
  MessageSquare,
  Users,
  Eye,
  Clock,
  Star,
  Send,
  Settings,
  UserPlus,
  Calendar,
  X,
} from "lucide-react"
import CustomVideoPlayer from "./custom-video-player"
import CommunitySetup from "./community-setup"
import UserProfileComponent from "./user-profile-component"
import EndUserCommunities from "./end-user-communities"

interface VideoStreamViewerProps {
  videoId: string
  isLive?: boolean
  userRole?: "viewer" | "creator" | "moderator"
}

const VideoStreamViewer = ({ videoId, isLive = false, userRole = "viewer" }: VideoStreamViewerProps) => {
  const [showCommunitySetup, setShowCommunitySetup] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showCommunities, setShowCommunities] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [isFollowing, setIsFollowing] = useState(false)
  const [likes, setLikes] = useState(1247)
  const [isLiked, setIsLiked] = useState(false)
  const [liveViewers, setLiveViewers] = useState(342)

  // Mock video data
  const videoData = {
    title: isLive
      ? "🔴 LIVE: Music Production Masterclass - Creating Beats from Scratch"
      : "Complete Guide to Music Production - Episode 1",
    creator: {
      name: "Alex Rivera",
      username: "@alexbeats",
      avatar: "/music-producer-avatar.png",
      verified: true,
      followers: "125K",
      isLive: isLive,
    },
    stats: {
      views: isLive ? liveViewers : 45672,
      likes: likes,
      duration: isLive ? null : "1:23:45",
      uploadDate: "2 days ago",
      category: "Music & Audio",
    },
    description: `Join me for an in-depth look at modern music production techniques. In this ${isLive ? "live session" : "episode"}, we'll cover:

• Beat creation fundamentals
• Sound design principles  
• Mixing and mastering basics
• Industry-standard workflows
• Q&A session

Perfect for beginners and intermediate producers looking to level up their skills!

🎵 Download the project files: link in bio
🔔 Subscribe for weekly production tips
💬 Join our Discord community for exclusive content`,
    tags: ["Music Production", "Beats", "Tutorial", "Live", "Education"],
    isPremium: false,
    price: null,
  }

  // Mock chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      user: "MusicFan23",
      message: "This is amazing! Thanks for the tips 🔥",
      timestamp: "2 min ago",
      role: "viewer",
      avatar: "/user-avatar-1.png",
    },
    {
      id: 2,
      user: "ProducerLife",
      message: "Can you show the EQ settings again?",
      timestamp: "3 min ago",
      role: "premium",
      avatar: "/diverse-user-avatar-set-2.png",
    },
    {
      id: 3,
      user: "BeatMaker101",
      message: "Following from Germany! 🇩🇪",
      timestamp: "5 min ago",
      role: "viewer",
      avatar: "/diverse-user-avatars-3.png",
    },
  ])

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: "You",
        message: chatMessage,
        timestamp: "now",
        role: userRole,
        avatar: "/ai-avatar.png",
      }
      setChatMessages([...chatMessages, newMessage])
      setChatMessage("")
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  // Simulate live viewer count changes
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setLiveViewers((prev) => prev + Math.floor(Math.random() * 10) - 5)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isLive])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <CustomVideoPlayer
                src="/placeholder-video.mp4"
                poster="/music-production-setup.png"
                isLive={isLive}
                isPremium={videoData.isPremium}
                price={videoData.price}
              />
            </motion.div>

            {/* Video Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              {/* Title and Stats */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{videoData.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>
                      {isLive ? `${videoData.stats.views} watching` : `${videoData.stats.views.toLocaleString()} views`}
                    </span>
                  </div>
                  {!isLive && (
                    <>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{videoData.stats.duration}</span>
                      </div>
                      <span>{videoData.stats.uploadDate}</span>
                    </>
                  )}
                  <div className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium">
                    {videoData.stats.category}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isLiked ? "bg-red-600 text-white" : "bg-white/10 hover:bg-white/20 text-gray-300"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                    <span>{likes.toLocaleString()}</span>
                  </button>

                  <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>

                  {/* Mobile Chat Toggle */}
                  <button
                    onClick={() => setShowChat(true)}
                    className="lg:hidden flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat</span>
                  </button>
                </div>
              </div>

              {/* Creator Info */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={videoData.creator.avatar || "/placeholder.svg"}
                      alt={videoData.creator.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {isLive && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{videoData.creator.name}</h3>
                      {videoData.creator.verified && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{videoData.creator.followers} followers</p>
                  </div>
                </div>

                <button
                  onClick={handleFollow}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isFollowing
                      ? "bg-white/10 text-gray-300 hover:bg-white/20"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Description</h4>
                <div className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">{videoData.description}</div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {videoData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/10">
                {userRole === "creator" && (
                  <button
                    onClick={() => setShowCommunitySetup(true)}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Community Setup</span>
                  </button>
                )}

                <button
                  onClick={() => setShowUserProfile(true)}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={() => setShowCommunities(true)}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Communities & Events</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Chat Sidebar - Desktop */}
          {isLive && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Live Chat</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{liveViewers}</span>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((message) => (
                    <div key={message.id} className="flex space-x-3">
                      <img
                        src={message.avatar || "/placeholder.svg"}
                        alt={message.user}
                        className="w-6 h-6 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span
                            className={`text-sm font-medium ${
                              message.role === "creator"
                                ? "text-red-400"
                                : message.role === "moderator"
                                  ? "text-blue-400"
                                  : message.role === "premium"
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                            }`}
                          >
                            {message.user}
                          </span>
                          {message.role === "creator" && (
                            <span className="bg-red-600/20 text-red-400 px-2 py-0.5 rounded text-xs">Creator</span>
                          )}
                          {message.role === "premium" && <Star className="w-3 h-3 text-yellow-400 fill-current" />}
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-300 break-words">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-end"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="w-full h-3/4 bg-gray-900 rounded-t-2xl flex flex-col"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-semibold">Live Chat</h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className="flex space-x-3">
                    <img
                      src={message.avatar || "/placeholder.svg"}
                      alt={message.user}
                      className="w-6 h-6 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span
                          className={`text-sm font-medium ${
                            message.role === "creator"
                              ? "text-red-400"
                              : message.role === "moderator"
                                ? "text-blue-400"
                                : message.role === "premium"
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                          }`}
                        >
                          {message.user}
                        </span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-300 break-words">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {showCommunitySetup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <CommunitySetup onClose={() => setShowCommunitySetup(false)} />
            </motion.div>
          </motion.div>
        )}

        {showUserProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <UserProfileComponent onClose={() => setShowUserProfile(false)} />
            </motion.div>
          </motion.div>
        )}

        {showCommunities && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            >
              <EndUserCommunities onClose={() => setShowCommunities(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VideoStreamViewer
