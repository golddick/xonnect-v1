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


const SuperAdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("90d")

  const stats = [
    {
      title: "Total Revenue",
      value: "$2,847,392",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Active Creators",
      value: "12,847",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Views",
      value: "89.2M",
      change: "+15.3%",
      icon: Eye,
      color: "text-purple-500",
    },
    {
      title: "Platform Fee",
      value: "$284,739",
      change: "+12.5%",
      icon: CreditCard,
      color: "text-red-500",
    },
  ]

  const recentActivities = [
    {
      type: "creator_signup",
      message: "New creator Sarah Johnson signed up",
      time: "2 minutes ago",
      icon: UserCheck,
    },
    {
      type: "payout_request",
      message: "Payout request from Marcus Chen - $2,450",
      time: "15 minutes ago",
      icon: DollarSign,
    },
    {
      type: "ad_campaign",
      message: "New ad campaign 'Summer Boost' went live",
      time: "1 hour ago",
      icon: Megaphone,
    },
    {
      type: "system_alert",
      message: "Server maintenance scheduled for tonight",
      time: "2 hours ago",
      icon: AlertCircle,
    },
  ]

  const topCreators = [
    {
      name: "Alex Rodriguez",
      revenue: "$45,230",
      views: "2.3M",
      growth: "+23%",
      avatar: "/creator-profile-photo.png",
    },
    {
      name: "Sarah Johnson",
      revenue: "$38,920",
      views: "1.8M",
      growth: "+18%",
      avatar: "/music-producer-avatar.png",
    },
    {
      name: "Marcus Chen",
      revenue: "$32,150",
      views: "1.5M",
      growth: "+15%",
      avatar: "/user-avatar-1.png",
    },
  ]

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
              {stats.map((stat, index) => (
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
                          <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
                        </div>
                        <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Revenue Chart */}
              <Card className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-red-500" />
                    Revenue Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4 text-red-500" />
                      <p>Revenue chart visualization would go here</p>
                      <p className="text-sm mt-2">Integration with charting library needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Growth */}
              <Card className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-red-500" />
                    User Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Activity className="w-12 h-12 mx-auto mb-4 text-red-500" />
                      <p>User growth chart would go here</p>
                      <p className="text-sm mt-2">Shows creator and viewer growth trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <div className="p-2 bg-red-600/20 rounded-lg">
                          <activity.icon className="w-4 h-4 text-red-400" />
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

