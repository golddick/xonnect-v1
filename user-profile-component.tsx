"use client"

import { useState } from "react"
import {
  User,
  MapPin,
  Calendar,
  LinkIcon,
  Heart,
  MessageSquare,
  Crown,
  Shield,
  Star,
  MoreHorizontal,
  UserPlus,
  UserMinus,
  Flag,
  X,
} from "lucide-react"

interface UserProfileProps {
  user: {
    id: string
    name: string
    username: string
    avatar: string
    coverImage?: string
    bio: string
    location?: string
    website?: string
    joinedDate: string
    isVerified?: boolean
    isPremium?: boolean
    isModerator?: boolean
    stats: {
      followers: number
      following: number
      posts: number
      videos: number
      likes: number
    }
    badges?: string[]
  }
  isFollowing?: boolean
  onClose?: () => void
  onFollow?: () => void
  onUnfollow?: () => void
  onMessage?: () => void
  onReport?: () => void
}

export default function UserProfileComponent({
  user,
  isFollowing = false,
  onClose,
  onFollow,
  onUnfollow,
  onMessage,
  onReport,
}: UserProfileProps) {
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [activeTab, setActiveTab] = useState("posts")

  const recentPosts = [
    {
      id: 1,
      content: "Just finished working on a new track! Can't wait to share it with you all 🎵",
      timestamp: "2024-01-15T14:30:00Z",
      likes: 45,
      comments: 12,
      image: "/music-studio.png",
    },
    {
      id: 2,
      content: "Behind the scenes from today's recording session. The energy was incredible! 🔥",
      timestamp: "2024-01-14T10:15:00Z",
      likes: 32,
      comments: 8,
    },
    {
      id: 3,
      content: "Thank you all for the amazing support! Next live stream is this Friday at 8 PM.",
      timestamp: "2024-01-13T16:45:00Z",
      likes: 67,
      comments: 23,
    },
  ]

  const recentVideos = [
    {
      id: 1,
      title: "Music Production Tutorial",
      thumbnail: "/music-production-setup.png",
      views: 1250,
      duration: "15:42",
      uploadDate: "2024-01-12",
    },
    {
      id: 2,
      title: "Studio Tour 2024",
      thumbnail: "/studio-tour.png",
      views: 890,
      duration: "8:23",
      uploadDate: "2024-01-10",
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-red-600/20 to-yellow-500/10 relative">
            {user.coverImage && (
              <img src={user.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-2 transition-colors hover:bg-black/80"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-16 mb-4">
              <div className="relative">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-gray-900 object-cover"
                />
                {user.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setShowMoreOptions(!showMoreOptions)}
                    className="bg-gray-800 hover:bg-gray-700 rounded-lg p-2 transition-colors"
                  >
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>

                  {showMoreOptions && (
                    <div className="absolute right-0 top-12 bg-gray-800 border border-gray-700 rounded-xl p-2 min-w-40 z-10">
                      <button
                        onClick={onReport}
                        className="w-full flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Flag className="w-4 h-4" />
                        Report User
                      </button>
                    </div>
                  )}
                </div>

                {isFollowing ? (
                  <button
                    onClick={onUnfollow}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <UserMinus className="w-4 h-4" />
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={onFollow}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Follow
                  </button>
                )}

                <button
                  onClick={onMessage}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Message
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  {user.isPremium && (
                    <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg px-2 py-1">
                      <Crown className="w-4 h-4 text-yellow-500" />
                    </div>
                  )}
                  {user.isModerator && (
                    <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg px-2 py-1">
                      <Shield className="w-4 h-4 text-blue-400" />
                    </div>
                  )}
                </div>
                <p className="text-gray-400">@{user.username}</p>
              </div>

              {user.bio && <p className="text-gray-300">{user.bio}</p>}

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                {user.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {user.location}
                  </span>
                )}
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-red-400 transition-colors"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Website
                  </a>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {formatDate(user.joinedDate)}
                </span>
              </div>

              {/* Badges */}
              {user.badges && user.badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-600/30 text-yellow-400 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                    >
                      <Star className="w-3 h-3" />
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-4 border-t border-gray-800">
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-xl font-bold text-white">{formatNumber(user.stats.followers)}</p>
              <p className="text-gray-400 text-sm">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-white">{formatNumber(user.stats.following)}</p>
              <p className="text-gray-400 text-sm">Following</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-white">{formatNumber(user.stats.posts)}</p>
              <p className="text-gray-400 text-sm">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-white">{formatNumber(user.stats.videos)}</p>
              <p className="text-gray-400 text-sm">Videos</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-white">{formatNumber(user.stats.likes)}</p>
              <p className="text-gray-400 text-sm">Likes</p>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="px-6 py-4 border-t border-gray-800">
          <div className="flex gap-2 mb-6">
            {["posts", "videos"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                  activeTab === tab
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Posts Tab */}
          {activeTab === "posts" && (
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {recentPosts.map((post) => (
                <div key={post.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <p className="text-gray-200 mb-3">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post content"
                      className="w-full max-w-sm rounded-lg mb-3"
                    />
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {post.comments}
                      </span>
                    </div>
                    <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === "videos" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
              {recentVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-colors cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                      <span className="text-white text-xs">{video.duration}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-white text-sm mb-1 line-clamp-2">{video.title}</h4>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{video.views.toLocaleString()} views</span>
                      <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {((activeTab === "posts" && recentPosts.length === 0) ||
            (activeTab === "videos" && recentVideos.length === 0)) && (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No {activeTab} yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
