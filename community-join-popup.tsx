"use client"

import { useState } from "react"
import {
  X,
  Users,
  MessageSquare,
  ImageIcon,
  Video,
  Calendar,
  Shield,
  Crown,
  Lock,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

interface Community {
  id: string
  name: string
  description: string
  coverImage: string
  profileImage: string
  creator: {
    name: string
    avatar: string
    verified: boolean
  }
  memberCount: number
  postCount: number
  isActive: boolean
  isPremium: boolean
  isPrivate: boolean
  category: string
  rules: string[]
  welcomeMessage: string
  features: {
    posts: boolean
    images: boolean
    videos: boolean
    events: boolean
  }
  moderationLevel: "Low" | "Medium" | "High"
  joinRequirement: "Open" | "Approval" | "Invite"
  recentPosts: Array<{
    id: string
    author: {
      name: string
      avatar: string
    }
    content: string
    timestamp: string
    likes: number
    comments: number
    image?: string
  }>
}

interface CommunityJoinPopupProps {
  community: Community
  isOpen: boolean
  onClose: () => void
}

export default function CommunityJoinPopup({ community, isOpen, onClose }: CommunityJoinPopupProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "rules" | "community">("overview")
  const [isJoined, setIsJoined] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [newPost, setNewPost] = useState("")

  if (!isOpen) return null

  const handleJoin = async () => {
    setIsJoining(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsJoined(true)
    setIsJoining(false)
    setActiveTab("community")
  }

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // Handle post submission
      setNewPost("")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative">
          <img
            src={community.coverImage || "/placeholder.svg"}
            alt={`${community.name} cover`}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute -bottom-12 left-6">
            <img
              src={community.profileImage || "/placeholder.svg"}
              alt={community.name}
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>

        {/* Community Info */}
        <div className="pt-16 px-6 pb-4 border-b">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold">{community.name}</h2>
                {community.isPremium && <Crown className="w-5 h-5 text-yellow-500" />}
                {community.isPrivate && <Lock className="w-5 h-5 text-gray-500" />}
              </div>
              <p className="text-gray-600 mb-3">{community.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {community.memberCount.toLocaleString()} members
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  {community.postCount} posts
                </span>
                <Badge variant={community.isActive ? "default" : "secondary"}>
                  {community.isActive ? "Active" : "Inactive"}
                </Badge>
                <Badge variant="outline">{community.category}</Badge>
              </div>
            </div>
            {!isJoined && (
              <Button onClick={handleJoin} disabled={isJoining} className="bg-red-600 hover:bg-red-700">
                {isJoining
                  ? "Joining..."
                  : community.joinRequirement === "Approval"
                    ? "Request to Join"
                    : "Join Community"}
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={community.creator.avatar || "/placeholder.svg"} />
              <AvatarFallback>{community.creator.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">
              Created by <span className="font-medium">{community.creator.name}</span>
              {community.creator.verified && <Shield className="w-4 h-4 text-blue-500 inline ml-1" />}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "overview" ? "text-red-600 border-b-2 border-red-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "rules" ? "text-red-600 border-b-2 border-red-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Rules
          </button>
          {isJoined && (
            <button
              onClick={() => setActiveTab("community")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "community"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Community
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Welcome Message</h3>
                <p className="text-gray-600">{community.welcomeMessage}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Community Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg ${community.features.posts ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">Text Posts</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg ${community.features.images ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-sm">Images</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg ${community.features.videos ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}
                  >
                    <Video className="w-4 h-4" />
                    <span className="text-sm">Videos</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg ${community.features.events ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Events</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Moderation</h3>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      community.moderationLevel === "High"
                        ? "destructive"
                        : community.moderationLevel === "Medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {community.moderationLevel} Moderation
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {community.joinRequirement === "Approval" && "Approval required to join"}
                    {community.joinRequirement === "Invite" && "Invite only"}
                    {community.joinRequirement === "Open" && "Open to everyone"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "rules" && (
            <div>
              <h3 className="font-semibold mb-4">Community Rules</h3>
              <div className="space-y-4">
                {community.rules.map((rule, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{rule}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Violation of community rules may result in warnings, temporary suspension,
                  or permanent removal from the community.
                </p>
              </div>
            </div>
          )}

          {activeTab === "community" && isJoined && (
            <div className="space-y-6">
              {/* Post Creation */}
              {community.features.posts && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Share something with the community..."
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="min-h-[80px] resize-none border-0 p-0 focus-visible:ring-0"
                        />
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <ImageIcon className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Video className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button onClick={handlePostSubmit} disabled={!newPost.trim()} size="sm">
                            <Send className="w-4 h-4 mr-1" />
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recent Posts */}
              <div>
                <h3 className="font-semibold mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {community.recentPosts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-sm">{post.author.name}</span>
                              <span className="text-xs text-gray-500">{post.timestamp}</span>
                            </div>
                            <p className="text-gray-700 mb-3">{post.content}</p>
                            {post.image && (
                              <img
                                src={post.image || "/placeholder.svg"}
                                alt="Post image"
                                className="rounded-lg max-w-full h-48 object-cover mb-3"
                              />
                            )}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                                <Heart className="w-4 h-4" />
                                {post.likes}
                              </button>
                              <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                {post.comments}
                              </button>
                              <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                                <Share2 className="w-4 h-4" />
                                Share
                              </button>
                              <button className="ml-auto hover:text-gray-700 transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {isJoined && (
          <div className="border-t p-4 bg-gray-50">
            <Button onClick={() => window.open(`/community/${community.id}`, "_blank")} className="w-full">
              Open Full Community Page
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
