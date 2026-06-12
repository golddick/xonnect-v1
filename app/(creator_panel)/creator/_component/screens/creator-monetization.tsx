"use client"

import React, { useState } from "react"
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
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"
import { sidebarItems } from "@/lib/constant"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default function CreatorMonetization() {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")


  const revenueData = {
    totalRevenue: 24750,
    monthlyGrowth: 12.5,
    streamRevenue: 15600,
    videoRevenue: 6800,
    ticketRevenue: 2350,
    venueRevenue: 10000,
    streamingTicketsRevenue: 5600,
  }

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Streaming Tickets",
        data: [2400, 3200, 2800, 4100, 3600, 4200],
        backgroundColor: "rgba(220, 38, 38, 0.8)",
        borderColor: "rgb(220, 38, 38)",
        borderWidth: 2,
      },
      {
        label: "VOD",
        data: [1200, 1800, 1600, 2200, 1900, 2400],
        backgroundColor: "rgba(255, 215, 0, 0.8)",
        borderColor: "rgb(255, 215, 0)",
        borderWidth: 2,
      },
      {
        label: "Venue Tickets",
        data: [800, 600, 900, 1100, 800, 1200],
        backgroundColor: "rgba(156, 163, 175, 0.8)",
        borderColor: "rgb(156, 163, 175)",
        borderWidth: 2,
      },
    ],
  }

  const doughnutData = {
    labels: ["Venue Tickets", "Streaming Tickets", "VOD", ],
    datasets: [
      {
        data: [
          revenueData.streamingTicketsRevenue,
          revenueData.venueRevenue,
          revenueData.videoRevenue,
        ],
        backgroundColor: [ "#9ca3af", "#dc2626","#ffd700", "#dc2626", ],
        borderColor: ["#9ca3af", "#dc2626","#ffd700", "#dc2626",],
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
      <div className=" w-full">
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
                  Monetization
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
                onClick={() => router.push("/creator/payouts")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Request Payout
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Revenue Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-500 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-foreground">₦{revenueData.totalRevenue.toLocaleString()}</p>
                  <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />+{revenueData.monthlyGrowth}% this month
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
                  <p className="text-muted-foreground text-sm">Venue Revenue</p>
                  <p className="text-2xl font-bold text-foreground">₦{revenueData.venueRevenue.toLocaleString()}</p>
                  <p className="text-red-400 text-sm mt-1">40% of total</p>
                </div>
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Streaming Tickets Revenue</p>
                  <p className="text-2xl font-bold text-foreground">
                    ₦{revenueData.streamingTicketsRevenue.toLocaleString()}
                  </p>
                  <p className="text-yellow-500 text-sm mt-1">22% of total</p>
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
                  <p className="text-2xl font-bold text-foreground">₦{revenueData.videoRevenue.toLocaleString()}</p>
                  <p className="text-purple-400 text-sm mt-1">27% of total</p>
                </div>
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </div>

          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-400" />
                Revenue Trends
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
