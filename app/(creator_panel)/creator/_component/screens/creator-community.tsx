"use client"

import type React from "react"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Search,
  TrendingUp,
  Calendar,
  Zap,
  Menu,
  X,
  Bell,
  BarChart3,
  Video,
  Play,
  DollarSign,
  Settings,
  Send,
  ImageIcon,
  Smile,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { sidebarItems } from "@/lib/constant"

export default function CreatorCommunity() {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("posts")
  const [newPost, setNewPost] = useState("")
  const [isCommunityActive, setIsCommunityActive] = useState(false)
  const [communitySettings, setCommunitySettings] = useState({
    allowMessaging: true,
    allowFileUpload: true,
    allowAudioUpload: true,
  })
  const [showCommentInput, setShowCommentInput] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")


  const communityStats = {
    totalFollowers: 12450,
    activeMembers: 8900,
    totalPosts: 156,
    engagement: 89.5,
  }

  const posts = [
    {
      id: 1,
      content:
        "Just finished working on a new track! Can't wait to share it with you all. What genre should I explore next? 🎵",
      timestamp: "2024-01-15T14:30:00Z",
      likes: 234,
      comments: 45,
      shares: 12,
      image: "/music-studio.png",
    },
    {
      id: 2,
      content:
        "Thank you all for the amazing support during yesterday's live stream! The energy was incredible. Next stream is scheduled for Friday at 8 PM. See you there! 🔥",
      timestamp: "2024-01-14T10:15:00Z",
      likes: 189,
      comments: 67,
      shares: 23,
    },
    {
      id: 3,
      content:
        "Behind the scenes from today's video shoot. The team worked so hard to make this happen. Grateful for everyone involved! 📸",
      timestamp: "2024-01-13T16:45:00Z",
      likes: 156,
      comments: 34,
      shares: 8,
      image: "/placeholder-6if9t.png",
    },
  ]

  const comments = [
    {
      id: 1,
      postId: 1,
      user: "Sarah M.",
      avatar: "/diverse-user-avatars.png",
      content: "Love your music! Can't wait for the new track 🎶",
      timestamp: "2024-01-15T15:00:00Z",
      likes: 12,
    },
    {
      id: 2,
      postId: 1,
      user: "Mike J.",
      avatar: "/diverse-user-avatar-set-2.png",
      content: "Try some jazz fusion! Would love to hear your take on it",
      timestamp: "2024-01-15T14:45:00Z",
      likes: 8,
    },
  ]

  const followers = [
    {
      id: 1,
      name: "Sarah Mitchell",
      username: "@sarahm",
      avatar: "/placeholder-0bpcn.png",
      followedDate: "2024-01-10",
      isActive: true,
      role: "Member",
    },
    {
      id: 2,
      name: "Mike Johnson",
      username: "@mikej",
      avatar: "/placeholder-d1pia.png",
      followedDate: "2024-01-08",
      isActive: false,
      role: "Member",
    },
    {
      id: 3,
      name: "Emma Davis",
      username: "@emmad",
      avatar: "/placeholder-2213v.png",
      followedDate: "2024-01-05",
      isActive: true,
      role: "Moderator",
    },
  ]

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim()) {
      // Handle post submission
      console.log("New post:", newPost)
      setNewPost("")
    }
  }

  const handleCommentSubmit = (e: React.FormEvent, postId: number) => {
    e.preventDefault()
    if (newComment.trim()) {
      console.log(`New comment on post ${postId}:`, newComment)
      setNewComment("")
      setShowCommentInput(null)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">Xonnect</span>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => router.push(item.route)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    pathname === item.route
                      ? "bg-red-600/20 text-red-400 border border-red-600/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}


      {/* Main Content */}
      <div className="w-full">
        {/* Header */}
        <div className="border-b border-border bg-transparent backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Community
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative bg-background hover:bg-muted rounded-lg p-2 transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Community Activation Banner */}
          {!isCommunityActive && (
            <div className="bg-red-600/10 border border-red-600/20 rounded-2xl p-8 text-center">
              <Users className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Activate Your Community</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start building your dedicated space where you can share exclusive updates,
                interact with your fans, and manage your community.
              </p>
              <button
                onClick={() => setIsCommunityActive(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-red-600/20"
              >
                Activate Community Now
              </button>
            </div>
          )}

          {isCommunityActive && (
            <div className="space-y-8">
              {/* Community Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Followers</p>
                      <p className="text-2xl font-bold text-foreground">{communityStats.totalFollowers.toLocaleString()}</p>
                    </div>
                    <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-red-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Active Members</p>
                      <p className="text-2xl font-bold text-foreground">{communityStats.activeMembers.toLocaleString()}</p>
                    </div>
                    <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Posts</p>
                      <p className="text-2xl font-bold text-foreground">{communityStats.totalPosts}</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Engagement Rate</p>
                      <p className="text-2xl font-bold text-foreground">{communityStats.engagement}%</p>
                    </div>
                    <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {["posts", "members", "messages", "settings"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                        activeTab === tab
                          ? "bg-red-600 text-white"
                          : "bg-transparent border border-border text-muted-foreground hover:text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Posts Tab */}
                {activeTab === "posts" && (
                  <div className="space-y-6">
                    {/* Create New Post */}
                    <form onSubmit={handlePostSubmit} className="bg-muted/50 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">J</span>
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="Share something with your community..."
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                            rows={3}
                          />
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4">
                              <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
                                <ImageIcon className="w-5 h-5" />
                              </button>
                              <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Smile className="w-5 h-5" />
                              </button>
                            </div>
                            <button
                              type="submit"
                              disabled={!newPost.trim()}
                              className="bg-red-600 hover:bg-red-700 disabled:bg-muted disabled:text-muted-foreground text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                            >
                              <Send className="w-4 h-4" />
                              Post
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>

                    {/* Posts List */}
                    <div className="space-y-6">
                      {posts.map((post) => (
                        <div key={post.id} className="bg-muted/50 rounded-xl p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">J</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-foreground">John Doe</span>
                                <span className="text-muted-foreground text-sm">
                                  {new Date(post.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-foreground/90 mb-4">{post.content}</p>
                              {post.image && (
                                <img
                                  src={post.image || "/placeholder.svg"}
                                  alt="Post content"
                                  className="w-full max-w-md rounded-xl mb-4"
                                />
                              )}
                              <div className="flex items-center gap-6">
                                <button className="flex items-center gap-2 text-muted-foreground hover:text-red-400 transition-colors">
                                  <Heart className="w-5 h-5" />
                                  <span>{post.likes}</span>
                                </button>
                                <button
                                  onClick={() => setShowCommentInput(showCommentInput === post.id ? null : post.id)}
                                  className="flex items-center gap-2 text-muted-foreground hover:text-blue-400 transition-colors"
                                >
                                  <MessageSquare className="w-5 h-5" />
                                  <span>{post.comments}</span>
                                </button>
                                <button className="flex items-center gap-2 text-muted-foreground hover:text-green-400 transition-colors">
                                  <Share2 className="w-5 h-5" />
                                  <span>{post.shares}</span>
                                </button>
                              </div>

                              {showCommentInput === post.id && (
                                <form
                                  onSubmit={(e) => handleCommentSubmit(e, post.id)}
                                  className="mt-4 flex items-center gap-2"
                                >
                                  <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                                    autoFocus
                                  />
                                  <button
                                    type="submit"
                                    disabled={!newComment.trim()}
                                    className="bg-red-600 hover:bg-red-700 disabled:bg-muted text-white p-2 rounded-lg transition-colors"
                                  >
                                    <Send className="w-4 h-4" />
                                  </button>
                                </form>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Members Tab */}
                {activeTab === "members" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">Community Members</h3>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search members..."
                          className="bg-muted border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      {followers.map((follower) => (
                        <div key={follower.id} className="flex items-center justify-between bg-muted/50 rounded-xl p-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={follower.avatar || "/placeholder.svg"}
                              alt={follower.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <h4 className="font-semibold text-foreground">{follower.name}</h4>
                              <p className="text-muted-foreground text-sm">{follower.username}</p>
                            </div>
                            {follower.isActive && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                            <span className="px-2 py-0.5 bg-red-600/10 text-red-400 text-xs rounded-full border border-red-600/20">
                              {follower.role}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <select
                              className="bg-background border border-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                              defaultValue={follower.role}
                            >
                              <option value="Member">Member</option>
                              <option value="Moderator">Moderator</option>
                              <option value="VIP">VIP</option>
                            </select>
                            <button className="text-red-400 hover:text-red-300 text-sm">View Profile</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages Tab */}
                {activeTab === "messages" && (
                  <div className="text-center py-16">
                    <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-muted-foreground mb-2">Direct Messages</h3>
                    <p className="text-muted-foreground mb-6">Connect directly with your most engaged followers</p>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
                      Start Conversation
                    </button>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Community Settings</h3>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                          <div>
                            <h4 className="font-medium text-foreground">Community Visibility</h4>
                            <p className="text-sm text-muted-foreground">Turn your community page on or off</p>
                          </div>
                          <button
                            onClick={() => setIsCommunityActive(!isCommunityActive)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${
                              isCommunityActive ? "bg-red-600" : "bg-muted-foreground/30"
                            }`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                isCommunityActive ? "left-7" : "left-1"
                              }`}
                            ></div>
                          </button>
                        </div>

                        <div className="grid gap-4">
                          <h4 className="font-medium text-foreground px-1">Permissions</h4>
                          {[
                            { key: "allowMessaging", label: "Allow Messaging from Members", desc: "Members can send you direct messages" },
                            { key: "allowFileUpload", label: "Allow File Uploads", desc: "Members can upload documents and images in posts" },
                            { key: "allowAudioUpload", label: "Allow Audio Uploads", desc: "Members can share audio clips in the community" },
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                              <div>
                                <h5 className="font-medium text-foreground text-sm">{item.label}</h5>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                              </div>
                              <button
                                onClick={() => setCommunitySettings(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                                className={`w-10 h-5 rounded-full transition-colors relative ${
                                  communitySettings[item.key as keyof typeof communitySettings] ? "bg-red-600" : "bg-muted-foreground/30"
                                }`}
                              >
                                <div
                                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                                    communitySettings[item.key as keyof typeof communitySettings] ? "left-5.5" : "left-0.5"
                                  }`}
                                ></div>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border">
                      <button
                        onClick={() => setIsCommunityActive(false)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        Deactivate Community and Delete All Data
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
