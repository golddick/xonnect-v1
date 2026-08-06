"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Bell,
  Search,
  Filter,
  Download,
  BarChart3,
  PieChart,
  Activity,
  Megaphone,
  CreditCard,
  UserCheck,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {ThemeToggle} from "@/components/theme-toggle";
import OverviewTab from "../../revenue/_component/OverviewTab"
import BarChartComponent from "../../revenue/_component/BarChart"


const SuperAdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("90d")
  const [loading, setLoading] = useState(false)
  const [overview, setOverview] = useState<any | null>(null)
  const [revenueData, setRevenueData] = useState<any | null>(null)
  const [revenueTrend, setRevenueTrend] = useState<any[]>([])
  const [topCreators, setTopCreators] = useState<any[]>([])
  const [recentActivities, setRecentActivities] = useState<any[]>([])

  async function loadData() {
    try {
      setLoading(true)
      const res = await fetch("/api/superadmin/dashboard")
      if (!res.ok) throw new Error("Failed to load")
      const data = await res.json()
      setOverview(data.overview || null)
      setRevenueData(data.revenueData || null)
      setRevenueTrend(data.revenueTrend || [])
      setTopCreators(data.topCreators || [])
      setRecentActivities(data.recent || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  // colors for bars
  const colors = ["#ef4444", "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"]
  const topCreatorsChartData = React.useMemo(() => {
    const total = topCreators.reduce((s, c) => s + Number(c.revenue || 0), 0) || 1
    return topCreators.map((c: any, idx: number) => ({
      name: c.name || "Unknown",
      value: Number(c.revenue || 0),
      color: colors[idx % colors.length],
      percentage: Math.round(((Number(c.revenue || 0) / total) * 100) || 0),
    }))
  }, [topCreators])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">

        <div className="flex-1 w-full">
          {/* Header */}
          <div className="border-b border-border bg-transparent backdrop-blur-sm sticky p-4 top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
              </div>

              <div className="flex items-center space-x-4">

                <div className="flex items-center space-x-4">
                  <button className="relative bg-background hover:bg-muted rounded-lg p-2 transition-colors">
                    <Bell className="w-5 h-5" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
                  </button>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Time Period Selector */}
              <div className="flex items-center space-x-2 mb-8">
                <span className="text-foreground">Period:</span>
                {["7d", "30d", "90d"].map((period) => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(period)}
                    className={selectedPeriod === period ? "bg-red-600 hover:bg-red-700" : "border-border text-foreground hover:bg-muted"}
                  >
                    {period}
                  </Button>
                ))}
              </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {overview ? (
                [
                  { title: "Total Revenue", value: `$${overview.totalRevenue || 0}`, icon: DollarSign, color: "text-green-500" },
                  { title: "Active Creators", value: `${overview.activeCreators || 0}`, icon: Users, color: "text-blue-500" },
                  { title: "Total Views", value: `${overview.totalViews || 0}`, icon: Eye, color: "text-purple-500" },
                  { title: "Platform Fee", value: `$${overview.platformFee || 0}`, icon: CreditCard, color: "text-red-500" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-card border border-border rounded-2xl hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-muted-foreground text-sm">{stat.title}</p>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                          </div>
                          <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-4">
                  <Card className="p-6 text-center">Loading stats...</Card>
                </div>
              )}
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Revenue Overview */}
              <OverviewTab revenueData={revenueData || { total: 0, streams: 0, premiumVideos: 0, ads: 0, platformEarnings: 0, payoutEarnings: 0, growth: 0 }} loading={loading} />

              {/* Revenue Trend Chart */}
              <Card className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                    Revenue Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {revenueTrend.length > 0 ? (
                    <div className="space-y-3">
                      {revenueTrend.map((item: any, index: number) => (
                        <div key={`${item.name}-${index}`} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{item.name}</span>
                            <span className="font-semibold">${item.value || 0}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.round((item.value / Math.max(...revenueTrend.map((entry: any) => entry.value), 1)) * 100)}%`,
                                backgroundColor: "#10b981",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                      <p>No trend data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Top Creators Chart */}
              <Card className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-red-500" />
                    Top Creators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChartComponent data={topCreatorsChartData} title="Top Creator Revenue" />
                </CardContent>
              </Card>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-h-450 mx-auto">
              {/* Top Creators */}
              <Card className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
                <CardHeader>
                  <CardTitle>Top Performing Creators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCreators.map((creator, index) => (
                      <div key={creator.name} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img
                            src={creator.avatar || "/placeholder.svg"}
                            alt={creator.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-semibold">{creator.name}</p>
                            <p className="text-sm text-muted-foreground">{creator.views} views</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-500">{creator.revenue}</p>
                          <p className="text-sm text-muted-foreground">{creator.growth}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.length === 0 && !loading && <p className="text-sm text-muted-foreground">No recent activity</p>}
                    {recentActivities.map((activity, index) => (
                      <div key={activity.id || index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <div className="p-2 bg-red-600/20 rounded-lg">
                          <Bell className="w-4 h-4 text-red-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminDashboard

