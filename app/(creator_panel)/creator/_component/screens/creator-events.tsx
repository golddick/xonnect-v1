"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Video,
  Plus,
  Search,
  Eye,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Settings,
  Play,
  Square,
  Edit,
  ExternalLink,
  Zap,
  Menu,
  X,
  Bell,
  BarChart3,
  Ticket, HouseIcon,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { sidebarItems } from "@/lib/constant"
import Link from "next/link"

export default function CreatorEvents() {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")



  const liveStreams = [
    {
      id: 1,
      title: "Music Production Masterclass",
      status: "live",
      viewers: 1250,
      revenue: 450,
      startTime: "2024-01-15T14:00:00Z",
      duration: "2h 15m",
      thumbnail: "/music-production-setup.png",
    },
    {
      id: 2,
      title: "Q&A Session with Fans",
      status: "scheduled",
      viewers: 0,
      revenue: 0,
      startTime: "2024-01-20T18:00:00Z",
      duration: "1h 30m",
      thumbnail: "/qa-session.png",
    },
    {
      id: 3,
      title: "Live Concert Performance",
      status: "ended",
      viewers: 2100,
      revenue: 850,
      startTime: "2024-01-12T20:00:00Z",
      duration: "3h 45m",
      thumbnail: "/vibrant-concert.png",
    },
    {
      id: 4,
      title: "Behind the Scenes Studio Tour",
      status: "ended",
      viewers: 890,
      revenue: 120,
      startTime: "2024-01-10T16:00:00Z",
      duration: "45m",
      thumbnail: "/studio-tour.png",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      case "scheduled":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
      case "ended":
        return "bg-gray-600/20 text-muted-foreground border-gray-600/30"
      default:
        return "bg-gray-600/20 text-muted-foreground border-gray-600/30"
    }
  }

  const filteredStreams = liveStreams.filter((stream) => {
    const matchesSearch = stream.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || stream.status === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
  
      {/* Mobile Sidebar Overlay */}
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
                Events
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative  border border-muted rounded-lg p-2.5 hover:bg-muted transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
              </button>
              <ThemeToggle />
              <button
                onClick={() => router.push("/creator/events/new")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Event</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5  rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Live Now</p>
                  <p className="text-2xl font-bold text-red-400">1</p>
                </div>
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5  rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Viewers</p>
                  <p className="text-2xl font-bold text-foreground">4,240</p>
                </div>
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5  rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Venue participant</p>
                  <p className="text-2xl font-bold text-foreground">2,000</p>
                </div>
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <HouseIcon className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5  rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Stream Revenue</p>
                  <p className="text-2xl font-bold text-yellow-500">₦1,420</p>
                </div>
                <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
            </div>

          </div>

          {/* Filters and Search */}
          <div className="bg-card rounded-2xl ">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search streams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className=" w-full bg-transparent border border-muted p-2.5 rounded-lg pl-10 pr-4 py-2 text-foreground  focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div className="flex gap-2">
                {["all", "live", "scheduled", "ended"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                      activeTab === tab
                        ? "bg-red-600 text-white"
                        : " border-muted border p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Streams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStreams.map((stream) => (
              <div
                key={stream.id}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:bg-muted/50 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={stream.thumbnail || "/placeholder.svg"}
                    alt={stream.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(stream.status)}`}
                    >
                      {stream.status === "live" && (
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          LIVE
                        </span>
                      )}
                      {stream.status === "scheduled" && "SCHEDULED"}
                      {stream.status === "ended" && "ENDED"}
                    </span>
                  </div>
                  {stream.status === "live" && (
                    <div className="absolute top-4 right-4 bg-background/70 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-foreground text-sm flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {stream.viewers.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{stream.title}</h3>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(stream.startTime).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {stream.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Users className="w-4 h-4" />
                        {stream.viewers.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-yellow-500">
                        <DollarSign className="w-4 h-4" />₦{stream.revenue}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {stream.status === "live" && (
                      <button className="flex-1 text-white bg-red-600 hover:bg-red-700 text-foreground px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                        {/*<Square className="w-4 h-4" />*/}
                        End
                      </button>
                    )}
                    {stream.status === "scheduled" && (
                      <button className="flex-1 text-white bg-yellow-600 hover:bg-yellow-700 text-foreground px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                        {/*<Play className="w-4 h-4" />*/}
                        Start
                      </button>
                    )}
                    {stream.status === "ended" && (
                      <button 
                      onClick={() => router.push(`/creator/events/${stream.id}/stats`)}
                      className="flex-1 text-white bg-black hover:bg-gray-600 text-foreground px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                        {/*<ExternalLink className="w-4 h-4" />*/}
                        Recording
                      </button>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/creator/events/${stream.id}/edit`)}
                        className="bg-muted hover:bg-muted-foreground text-foreground px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        {/*<Edit className="w-4 h-4" />*/}
                        Edit
                      </button>
                      <button
                        onClick={() => router.push(`/creator/events/${stream.id}/analytics`)}
                        className="bg-muted hover:bg-muted-foreground text-foreground px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        {/*<BarChart3 className="w-4 h-4" />*/}
                        Analytics
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredStreams.length === 0 && (
            <div className="text-center py-16">
              <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No event found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Start your first event to engage with your audience"}
              </p>
              <button
                onClick={() => router.push("/creator/events/new")}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Create New Event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
