"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Heart,
  DollarSign,
  Calendar,
  Download,
  Filter,
  Zap,
  Menu,
  X,
  Bell,
  Video,
  Play,
  Settings,
} from "lucide-react"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"
import { ThemeToggle } from "@/components/theme-toggle"
import { sidebarItems } from "@/lib/constant"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement)

export default function CreatorAnalytics() {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [timeRange, setTimeRange] = useState("30d")

  const analyticsData = {
    totalViews: 125430,
    viewsGrowth: 15.2,
    totalFollowers: 8945,
    followersGrowth: 8.7,
    engagement: 12.4,
    engagementGrowth: -2.1,
    revenue: 18750,
    revenueGrowth: 22.3,
  }

  const viewsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Views",
        data: [15000, 18500, 22000, 19500, 25000, 28000],
        borderColor: "rgb(220, 38, 38)",
        backgroundColor: "rgba(220, 38, 38, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const engagementData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Likes",
        data: [1200, 1500, 1800, 1600, 2100, 2400],
        backgroundColor: "rgba(220, 38, 38, 0.8)",
        borderColor: "rgb(220, 38, 38)",
        borderWidth: 2,
      },
      {
        label: "Comments",
        data: [300, 450, 520, 480, 650, 720],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
      },
      {
        label: "Shares",
        data: [150, 200, 180, 220, 280, 320],
        backgroundColor: "rgba(255, 215, 0, 0.8)",
        borderColor: "rgb(255, 215, 0)",
        borderWidth: 2,
      },
    ],
  }

  const audienceData = {
    labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
    datasets: [
      {
        data: [35, 28, 20, 12, 5],
        backgroundColor: ["#dc2626", "#ffd700", "#9ca3af", "#6b7280", "hsl(var(--muted))"],
        borderColor: ["#dc2626", "#ffd700", "#9ca3af", "#6b7280", "hsl(var(--muted))"],
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
          color: "hsl(var(--foreground))",
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

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "hsl(var(--text-foreground))",
        },
      },
    },
  }

  const topContent = [
    {
      id: 1,
      title: "Music Production Masterclass",
      type: "video",
      views: 15600,
      engagement: 18.5,
      revenue: 2400,
    },
    {
      id: 2,
      title: "Live Concert Performance",
      type: "stream",
      views: 12800,
      engagement: 22.1,
      revenue: 3200,
    },
    {
      id: 3,
      title: "Behind the Scenes Studio Tour",
      type: "video",
      views: 9500,
      engagement: 15.8,
      revenue: 1800,
    },
  ]

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
                className="lg:hidden bg-muted hover:bg-gray-700 rounded-lg p-2 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Analytics
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex gap-2">
                {["7d", "30d", "90d", "1y"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-lg transition-colors text-sm ${
                      timeRange === range
                        ? "bg-red-600 text-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <button className="relative bg-background hover:bg-muted rounded-lg p-2 transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
              </button>
              <ThemeToggle />
              <button className="bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Views</p>
                  <p className="text-3xl font-bold text-foreground">{analyticsData.totalViews.toLocaleString()}</p>
                  <p
                    className={`text-sm mt-1 flex items-center gap-1 ${
                      analyticsData.viewsGrowth > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {analyticsData.viewsGrowth > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {Math.abs(analyticsData.viewsGrowth)}% vs last period
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Followers</p>
                  <p className="text-3xl font-bold text-foreground">{analyticsData.totalFollowers.toLocaleString()}</p>
                  <p
                    className={`text-sm mt-1 flex items-center gap-1 ${
                      analyticsData.followersGrowth > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {analyticsData.followersGrowth > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {Math.abs(analyticsData.followersGrowth)}% vs last period
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Engagement Rate</p>
                  <p className="text-3xl font-bold text-foreground">{analyticsData.engagement}%</p>
                  <p
                    className={`text-sm mt-1 flex items-center gap-1 ${
                      analyticsData.engagementGrowth > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {analyticsData.engagementGrowth > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {Math.abs(analyticsData.engagementGrowth)}% vs last period
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Revenue</p>
                  <p className="text-3xl font-bold text-foreground">₦{analyticsData.revenue.toLocaleString()}</p>
                  <p
                    className={`text-sm mt-1 flex items-center gap-1 ${
                      analyticsData.revenueGrowth > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {analyticsData.revenueGrowth > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {Math.abs(analyticsData.revenueGrowth)}% vs last period
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Views Chart */}
            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Eye className="w-5 h-5 text-red-400" />
                  Views Over Time
                </h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
              <div className="h-64">
                <Line data={viewsData} options={chartOptions} />
              </div>
            </div>

            {/* Engagement Chart */}
            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  Engagement Metrics
                </h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
              <div className="h-64">
                <Bar data={engagementData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Audience Demographics and Top Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Audience Demographics */}
            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-red-400" />
                Audience Age Groups
              </h3>
              <div className="h-64 flex items-center justify-center">
                <Doughnut data={audienceData} options={doughnutOptions} />
              </div>
            </div>

            {/* Top Performing Content */}
            <div className="lg:col-span-2 bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-400" />
                Top Performing Content
              </h3>
              <div className="space-y-4">
                {topContent.map((content, index) => (
                  <div key={content.id} className="bg-muted/50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                          <h4 className="font-semibold text-foreground">{content.title}</h4>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              content.type === "video"
                                ? "bg-yellow-600/20 text-yellow-400 border border-yellow-600/30"
                                : "bg-red-600/20 text-red-400 border border-red-600/30"
                            }`}
                          >
                            {content.type}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-gray-400">
                              <Eye className="w-4 h-4" />
                              <span>{content.views.toLocaleString()}</span>
                            </div>
                            <p className="text-gray-500 text-xs">Views</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-red-400">
                              <Heart className="w-4 h-4" />
                              <span>{content.engagement}%</span>
                            </div>
                            <p className="text-gray-500 text-xs">Engagement</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-green-400">
                              <DollarSign className="w-4 h-4" />
                              <span>₦{content.revenue}</span>
                            </div>
                            <p className="text-gray-500 text-xs">Revenue</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Analytics Table */}
          <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Detailed Analytics</h3>
              <div className="flex gap-2">

                <button className="bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium">Content</th>
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium">Type</th>
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium">Views</th>
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium">Engagement</th>
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium">Revenue</th>
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {topContent.map((content) => (
                    <tr key={content.id} className="border-t border-border hover:bg-muted/30">
                      <td className="py-4 px-6 text-foreground font-medium">{content.title}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            content.type === "video" ? "bg-yellow-600/20 text-yellow-400" : "bg-red-600/20 text-red-400"
                          }`}
                        >
                          {content.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">{content.views.toLocaleString()}</td>
                      <td className="py-4 px-6 text-muted-foreground">{content.engagement}%</td>
                      <td className="py-4 px-6 text-green-400">₦{content.revenue}</td>
                      <td className="py-4 px-6 text-muted-foreground">Jan 15, 2024</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
