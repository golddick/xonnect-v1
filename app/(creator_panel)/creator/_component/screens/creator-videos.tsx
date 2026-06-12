"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Play,
  Search,
  Eye,
  Heart,
  MessageSquare,
  Upload,
  Calendar,
  Zap,
  Menu,
  X,
  Bell,
  DollarSign,
  Folder,
  ChevronDown,
  ChevronRight,
  Film,
  Clapperboard,
  Library, Plus,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { sidebarItems } from "@/lib/constant"

export default function CreatorVideos() {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedFolders, setExpandedFolders] = useState<string[]>([])

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => {
      if (!id) return prev
      return prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    })
  }




  type CreatorVideoListItem = {
    id: string
    title: string
    thumbnail: string | null
    status: string
    type: string
    isFolder: boolean
    uploadDate: string | Date
    views: number
    likes: number
    comments: number
    revenue: number
    itemsCount?: number
    videos?: Array<{
      id: string
      title: string
      duration?: string | null
      status: string
      thumbnail?: string | null
      uploadDate: string | Date
      views: number
      likes: number
      comments: number
      revenue: number
    }>
  }

  const [videos, setVideos] = useState<CreatorVideoListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadVideos() {
      try {
        setIsLoading(true)
        const res = await fetch("/api/creator/videos/list")

        if (!res.ok) {
          throw new Error("Failed to load videos")
        }

        const data = await res.json()
        if (!cancelled) {
          setVideos((data?.items ?? []) as CreatorVideoListItem[])
        }
      } catch (error) {
        console.error(error)
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadVideos()

    return () => {
      cancelled = true
    }
  }, [])


  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "draft":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
      case "processing":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
      default:
        return "bg-gray-600/20 text-muted-foreground border-gray-600/30"
    }
  }

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || video.status === activeTab
    return matchesSearch && matchesTab
  })

  const todayKey = new Date().toDateString()
  const todayFolders = videos.filter((video) => new Date(video.uploadDate).toDateString() === todayKey).length
  const totalViews = videos.reduce((sum, video) => sum + (video.views ?? 0), 0)
  const totalLikes = videos.reduce((sum, video) => sum + (video.likes ?? 0), 0)
  const totalRevenue = videos.reduce((sum, video) => sum + (video.revenue ?? 0), 0)

  const videoActions = (video: any) => {
    const actions = [
      {
        label: "Edit",
        onClick: () => router.push(`/creator/videos/${video.id}/edit`),
      },
      {
        label: "View Folder",
        onClick: () => router.push(`/creator/videos/${video.id}/view`)
      },
      {
        label: "Analytics",
        onClick: () => router.push(`/creator/videos/${video.id}/analytics`),
      },
    ]

    // if (video.isFolder || video.type === "series" || video.type === "movie" || video.type === "documentary") {
    //   actions.unshift({
    //     label: "Add Episode/Part",
    //     onClick: () => router.push(`/creator/videos/${video.id}/edit?add=true`),
    //   })
    // }

    return actions
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        Loading videos...
      </div>
    )
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
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Videos
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative bg-background hover:bg-muted rounded-lg p-2 transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
              </button>
              <ThemeToggle />
              <button
                onClick={() => router.push("/creator/videos/upload")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Video</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Today&apos;s Folders</p>
                  <p className="text-2xl font-bold text-foreground">{todayFolders}</p>
                </div>
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <Folder className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Views</p>
                  <p className="text-2xl font-bold text-foreground">{totalViews.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Likes</p>
                  <p className="text-2xl font-bold text-foreground">{totalLikes.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Video Revenue</p>
                  <p className="text-2xl font-bold text-yellow-500">₦{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-card  rounded-2xl ">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border border-border rounded-xl pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div className="flex gap-2">
                {["all", "published", "draft", "processing"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                      activeTab === tab
                        ? "bg-red-600 text-white"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300"
              >
                <div className="relative group">
                  <img
                    src={video.thumbnail || video.videos?.[0]?.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 bg-background/70 backdrop-blur-sm rounded px-2 py-1">
                        <span className="text-foreground text-sm">{video.itemsCount ? `${video.itemsCount} items` : ""}</span>

                  </div>
                  <div className="absolute top-2 left-2 flex gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(video.status)}`}
                    >
                      {video.status.toUpperCase()}
                    </span>
                    {(video as any).isFolder && (
                      <span className="bg-blue-600/20 text-blue-400 border border-blue-600/30 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Folder className="w-3 h-3" />
                        PACKAGE
                      </span>
                    )}
                  </div>
                </div>

      <div className="p-6">

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-foreground line-clamp-2">{video.title}</h3>
                    {(video as any).isFolder && (
                      <button 
                        onClick={() => toggleFolder(video.id)}
                        className="p-1 hover:bg-muted rounded-lg transition-colors"
                      >
                        {expandedFolders.includes(video.id) ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}

                      </button>
                    )}
                  </div>

                  {expandedFolders.includes(video.id) && video.videos && (
                    <div className="mb-4 space-y-2 pl-4 border-l-2 border-muted">
                      {video.videos.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm py-1">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Play className="w-3 h-3 text-red-500" />
                            {item.title}
                          </span>
                          <span className="text-xs text-muted-foreground/60">{item.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(video.uploadDate).toLocaleDateString()}
                    </span>
                    <span className="capitalize flex items-center gap-1">
                      {(video as any).type === "series" && <Library className="w-4 h-4 text-blue-400" />}
                      {(video as any).type === "movie" && <Film className="w-4 h-4 text-purple-400" />}
                      {(video as any).type === "documentary" && <Clapperboard className="w-4 h-4 text-green-400" />}
                      {(video as any).type || "video"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-400">
                        <Eye className="w-4 h-4" />
                        <span>{(video.views ?? 0).toLocaleString()}</span>
                      </div>
                      <p className="text-gray-500 text-xs">Views</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-red-400">
                        <Heart className="w-4 h-4" />
                        <span>{(video.likes ?? 0).toLocaleString()}</span>
                      </div>
                      <p className="text-gray-500 text-xs">Likes</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-blue-400">
                        <MessageSquare className="w-4 h-4" />
                        <span>{(video.comments ?? 0).toLocaleString()}</span>
                      </div>
                      <p className="text-gray-500 text-xs">Comments</p>
                    </div>
                  </div>



                  <div className="flex w-full flex-wrap justify-between gap-2">
                    {videoActions(video).map((action, index) => (
                      <button
                        key={index}
                        onClick={action.onClick}
                        className={`flex-1 min-w-[80px] bg-muted hover:bg-muted/80 text-foreground px-2 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 border border-border text-xs ${action.label === "Add" ? "bg-red-600/10 border-red-600/20 text-red-500" : ""}`}
                      >
                        {action.label === "Add" && <Plus className="w-3 h-3" />}
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No videos found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Upload your first video to start building your content library"}
              </p>
              <button
                onClick={() => router.push("/creator/videos/upload")}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Upload Video
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
