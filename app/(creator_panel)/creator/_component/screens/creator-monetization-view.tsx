"use client"

import React, { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  Users,
  Calendar,
  Settings,
  Plus,
  Zap,
  Menu,
  X,
  Bell,
  BarChart3,
  Video,
  Play,
  PieChart,
  ArrowUpRight,
} from "lucide-react"
import { Bar, Doughnut } from "react-chartjs-2"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"
import { sidebarItems } from "@/lib/constant"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

type RevenueSummary = {
  totalRevenue: number
  streamRevenue: number
  venueRevenue: number
  videoRevenue: number
  availableForPayout: number
  pendingPayouts: number
  minimumPayoutAmount: number
}

export default function CreatorMonetizationView() {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [revenueData, setRevenueData] = useState<RevenueSummary>({
    totalRevenue: 0,
    streamRevenue: 0,
    venueRevenue: 0,
    videoRevenue: 0,
    availableForPayout: 0,
    pendingPayouts: 0,
    minimumPayoutAmount: 50,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRevenue = async () => {
      try {
        const response = await fetch("/api/creator/monetization/summary", { cache: "no-store" })
        if (!response.ok) {
          throw new Error("Failed to load summary")
        }
        const payload = await response.json()
        setRevenueData(payload.summary ?? payload)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadRevenue()
  }, [])

  const chartData = useMemo(() => ({
    labels: ["Streaming tickets", "Venue tickets", "Video"],
    datasets: [
      {
        label: "Revenue",
        data: [revenueData.streamRevenue, revenueData.venueRevenue, revenueData.videoRevenue],
        backgroundColor: ["rgba(220, 38, 38, 0.8)", "rgba(156, 163, 175, 0.8)", "rgba(255, 215, 0, 0.8)"],
        borderColor: ["rgb(220, 38, 38)", "rgb(156, 163, 175)", "rgb(255, 215, 0)"],
        borderWidth: 2,
      },
    ],
  }), [revenueData])

  const doughnutData = useMemo(() => ({
    labels: ["Streaming tickets", "Venue tickets", "Video"],
    datasets: [
      {
        data: [revenueData.streamRevenue, revenueData.venueRevenue, revenueData.videoRevenue],
        backgroundColor: ["#dc2626", "#9ca3af", "#ffd700"],
        borderColor: ["#dc2626", "#9ca3af", "#ffd700"],
        borderWidth: 2,
      },
    ],
  }), [revenueData])

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

  return (
    <div className="min-h-screen bg-background text-foreground">
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

      <div className="w-full">
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
                <h1 className="text-2xl font-bold text-foreground">Monetization</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative bg-background hover:bg-muted rounded-lg p-2 transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full" />
              </button>
              <ThemeToggle />
              <button
                onClick={() => router.push("/creator/monetization/payout")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Request Payout
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-500 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-foreground">
                    {loading ? "—" : `₦${revenueData.totalRevenue.toLocaleString()}`}
                  </p>
                  <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />All monetization sources
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>

            <div className="bg-card hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Streaming Tickets</p>
                  <p className="text-2xl font-bold text-foreground">
                    {loading ? "—" : `₦${revenueData.streamRevenue.toLocaleString()}`}
                  </p>
                  <p className="text-red-400 text-sm mt-1">Live stream access</p>
                </div>
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Venue Tickets</p>
                  <p className="text-2xl font-bold text-foreground">
                    {loading ? "—" : `₦${revenueData.venueRevenue.toLocaleString()}`}
                  </p>
                  <p className="text-yellow-500 text-sm mt-1">In-person entry</p>
                </div>
                <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
            </div>

            <div className="bg-card hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Video Revenue</p>
                  <p className="text-2xl font-bold text-foreground">
                    {loading ? "—" : `₦${revenueData.videoRevenue.toLocaleString()}`}
                  </p>
                  <p className="text-purple-400 text-sm mt-1">On-demand content</p>
                </div>
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-400" />
                Revenue Breakdown
              </h3>
              <div className="h-64">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-red-400" />
                Revenue Distribution
              </h3>
              <div className="h-64 flex items-center justify-center">
                <Doughnut
                  data={doughnutData}
                  options={{ responsive: true, plugins: { legend: { labels: { color: "hsl(var(--foreground))" } } } }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
