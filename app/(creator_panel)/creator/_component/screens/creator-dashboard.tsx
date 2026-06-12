"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  Calendar,
  DollarSign,
  Eye,
  Heart,
  MessageSquare,
  Play,
  Plus,
  Settings,
  Star,
  TrendingUp,
  Users,
  Video,
  Zap,
  Bell,
  Search,
  Menu,
  X,
  Ticket,
  Moon,
  Sun,
} from "lucide-react"
import { Bar } from "react-chartjs-2"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { sidebarItems } from "@/lib/constant"
import Sidebar from "@/app/(creator_panel)/creator/_component/sidebar/Sidebar";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)

export default function CreatorDashboard() {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Sample data
  const stats = {
    totalRevenue: 12450,
    totalViews: 45230,
    totalFollowers: 1250,
    liveStreams: 8,
  }

  const recentStreams = [
    {
      id: 1,
      title: "Music Production Masterclass",
      date: "2024-01-15",
      views: 1250,
      revenue: 450,
      status: "completed",
    },
    {
      id: 2,
      title: "Live Concert Performance",
      date: "2024-01-12",
      views: 2100,
      revenue: 850,
      status: "completed",
    },
    {
      id: 3,
      title: "Q&A with Fans",
      date: "2024-01-10",
      views: 890,
      revenue: 120,
      status: "completed",
    },
  ]

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 3000, 5000, 2000, 3000],
        backgroundColor: "rgba(220, 38, 38, 0.8)",
        borderColor: "rgb(220, 38, 38)",
        borderWidth: 2,
      },
      {
        label: "Views",
        data: [2400, 3800, 6000, 10000, 4000, 6000],
        backgroundColor: "rgba(255, 215, 0, 0.8)",
        borderColor: "rgb(255, 215, 0)",
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "hsl(var(--muted-foreground))",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "hsl(var(--muted-foreground))",
        },
        grid: {
          color: "hsl(var(--border))",
        },
      },
      y: {
        ticks: {
          color: "hsl(var(--muted-foreground))",
        },
        grid: {
          color: "hsl(var(--border))",
        },
      },
    },
  }

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
                  <Zap className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-xl font-bold">Xonnect</span>
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
                className="lg:hidden bg-red-600 text-white hover:bg-muted rounded-lg p-2 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Creator Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className=" bg-transparent border border-muted p-2.5 rounded-lg pl-10 pr-4 py-2 text-foreground  focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
              <button className="relative  border border-muted rounded-lg p-2.5 hover:bg-muted transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
              </button>
              <ThemeToggle />
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-foreground font-bold text-sm">J</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-foreground">₦{stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-green-400 text-sm mt-1">+12% from last month</p>
                </div>
                <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Views</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalViews.toLocaleString()}</p>
                  <p className="text-blue-400 text-sm mt-1">+8% from last month</p>
                </div>
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Followers</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalFollowers.toLocaleString()}</p>
                  <p className="text-purple-400 text-sm mt-1">+25 new this week</p>
                </div>
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Live Streams</p>
                  <p className="text-3xl font-bold text-foreground">{stats.liveStreams}</p>
                  <p className="text-green-400 text-sm mt-1">This month</p>
                </div>
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center gap-4 bg-muted border border-border rounded-xl p-4 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-foreground" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-foreground">Start Live Stream</h4>
                  <p className="text-sm text-muted-foreground">Go live instantly</p>
                </div>
              </button>

              <button className="flex items-center gap-4 bg-muted border border-border rounded-xl p-4 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300">
                <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-foreground" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-foreground">Upload Video</h4>
                  <p className="text-sm text-muted-foreground">Share new content</p>
                </div>
              </button>

              <button className="flex items-center gap-4 bg-muted border border-border rounded-xl p-4 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300">
                <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-foreground" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-foreground">Schedule Event</h4>
                  <p className="text-sm text-muted-foreground">Plan ahead</p>
                </div>
              </button>
            </div>
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Revenue Chart */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-red-400" />
                <h3 className="text-xl font-bold text-foreground">Revenue & Views</h3>
              </div>
              <div className="h-64 text-white">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>

            {/* Recent Streams */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">Recent Event</h3>
                <button className="text-red-500 hover:text-red-300 text-sm">View All</button>
              </div>
              <div className="space-y-4">
                {recentStreams.map((stream) => (
                  <div key={stream.id} className="bg-muted/50 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5  rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{stream.title}</h4>
                      <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded-full">
                        {stream.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{new Date(stream.date).toLocaleDateString()}</span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {stream.views}
                        </span>
                        <span className="flex items-center gap-1 text-yellow-500">
                          <DollarSign className="w-4 h-4" />₦{stream.revenue}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Engagement Overview */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Engagement Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-400" />
                </div>
                <h4 className="text-2xl font-bold text-foreground">2.4K</h4>
                <p className="text-muted-foreground">Total Likes</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="text-2xl font-bold text-foreground">892</h4>
                <p className="text-muted-foreground">Comments</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
                <h4 className="text-2xl font-bold text-foreground">4.8</h4>
                <p className="text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
