"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  Heart,
  MessageSquare,
  Share2,
  Download,
  ToggleLeft,
  ToggleRight,
  Bell,
  Star,
  Gift,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const StreamAnalytics = () => {
  const [selectedStream, setSelectedStream] = useState("current")
  const [payoutEnabled, setPayoutEnabled] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("7d")

  const streamData = {
    current: {
      id: 1,
      title: "Music Production Masterclass - Live Session #5",
      status: "live",
      startTime: "2024-02-15T14:00:00Z",
      duration: "2h 15m",
      currentViewers: 1250,
      peakViewers: 1890,
      totalViews: 15600,
      likes: 890,
      comments: 234,
      shares: 67,
      revenue: 2450.5,
      tips: 890.25,
      subscriptions: 1560.25,
      isPremium: true,
      thumbnail: "/music-production-setup.png",
    },
  }

  const revenueBreakdown = {
    total: 2450.5,
    tips: 890.25,
    subscriptions: 1560.25,
    platformFee: 245.05,
    creatorEarnings: 2205.45,
  }

  const viewerEngagement = [
    { time: "14:00", viewers: 450, engagement: 85 },
    { time: "14:30", viewers: 780, engagement: 92 },
    { time: "15:00", viewers: 1250, engagement: 88 },
    { time: "15:30", viewers: 1890, engagement: 95 },
    { time: "16:00", viewers: 1650, engagement: 90 },
    { time: "16:15", viewers: 1250, engagement: 87 },
  ]

  const topViewers = [
    { name: "MusicLover23", tips: 125.5, messages: 45, duration: "2h 10m" },
    { name: "BeatMaster", tips: 89.25, messages: 32, duration: "2h 15m" },
    { name: "ProducerPro", tips: 67.75, messages: 28, duration: "1h 45m" },
    { name: "SoundWave", tips: 45.0, messages: 19, duration: "1h 30m" },
  ]

  const recentComments = [
    { user: "MusicLover23", message: "This beat is incredible! 🔥", time: "2 min ago", tip: 25.0 },
    { user: "BeatMaster", message: "Can you show the EQ settings again?", time: "5 min ago" },
    { user: "ProducerPro", message: "Amazing tutorial, learned so much!", time: "8 min ago", tip: 15.5 },
    { user: "SoundWave", message: "When will you release this track?", time: "12 min ago" },
  ]

  const handlePayoutToggle = () => {
    setPayoutEnabled(!payoutEnabled)
    // Show notification or modal for payout request
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Stream Analytics</h1>
            <p className="text-gray-400">Real-time insights and performance metrics</p>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg"
            >
              <option value="live">Live Now</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <Button variant="outline" className="border-gray-700 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Live Stream Status */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
                Currently Live
              </CardTitle>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">LIVE</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-6">
              <img
                src={streamData.current.thumbnail || "/placeholder.svg"}
                alt={streamData.current.title}
                className="w-32 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{streamData.current.title}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Duration</p>
                    <p className="font-semibold">{streamData.current.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Current Viewers</p>
                    <p className="font-semibold text-blue-400">{streamData.current.currentViewers.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Peak Viewers</p>
                    <p className="font-semibold text-green-400">{streamData.current.peakViewers.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Total Views</p>
                    <p className="font-semibold">{streamData.current.totalViews.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue & Payout Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Breakdown */}
          <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                  Revenue Breakdown
                </div>
                {streamData.current.isPremium && (
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Premium Content</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold">${revenueBreakdown.total.toFixed(2)}</p>
                </div>
                <div className="text-center">
                  <Gift className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Tips</p>
                  <p className="text-2xl font-bold text-blue-400">${revenueBreakdown.tips.toFixed(2)}</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Subscriptions</p>
                  <p className="text-2xl font-bold text-purple-400">${revenueBreakdown.subscriptions.toFixed(2)}</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Your Earnings</p>
                  <p className="text-2xl font-bold text-yellow-400">${revenueBreakdown.creatorEarnings.toFixed(2)}</p>
                </div>
              </div>

              {/* Platform Fee Breakdown */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Platform Fee (10%)</span>
                  <span className="text-red-400">-${revenueBreakdown.platformFee.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">You keep 90% of all revenue</p>
              </div>
            </CardContent>
          </Card>

          {/* Payout Control */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-yellow-400" />
                Payout Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold">Auto Payout</p>
                    <p className="text-sm text-gray-400">Automatically request payouts</p>
                  </div>
                  <button onClick={handlePayoutToggle} className="flex items-center">
                    {payoutEnabled ? (
                      <ToggleRight className="w-8 h-8 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Available for Payout</span>
                    <span className="font-semibold">${revenueBreakdown.creatorEarnings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Minimum Payout</span>
                    <span>$50.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Processing Time</span>
                    <span>3-5 business days</span>
                  </div>
                </div>

                <Button
                  className="w-full mt-4 bg-green-600 hover:bg-green-700"
                  disabled={revenueBreakdown.creatorEarnings < 50}
                >
                  Request Payout
                </Button>
              </div>

              {/* Payout History Preview */}
              <div>
                <h4 className="font-semibold mb-3">Recent Payouts</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Feb 1, 2024</span>
                    <span className="text-green-400">$1,890.50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Jan 15, 2024</span>
                    <span className="text-green-400">$2,340.75</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Jan 1, 2024</span>
                    <span className="text-green-400">$1,567.25</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Viewer Engagement Chart */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                Viewer Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                  <p className="text-gray-400">Real-time engagement chart</p>
                  <p className="text-sm text-gray-500 mt-2">Chart visualization would show viewer count over time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Stats */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Engagement Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{streamData.current.likes.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">Likes</p>
                </div>
                <div className="text-center">
                  <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{streamData.current.comments.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">Comments</p>
                </div>
                <div className="text-center">
                  <Share2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{streamData.current.shares}</p>
                  <p className="text-gray-400 text-sm">Shares</p>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold">1h 45m</p>
                  <p className="text-gray-400 text-sm">Avg Watch Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Viewers & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Viewers */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-400" />
                Top Supporters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topViewers.map((viewer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{viewer.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{viewer.name}</p>
                        <p className="text-sm text-gray-400">
                          {viewer.messages} messages • {viewer.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-400">${viewer.tips.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">in tips</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Comments */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
                Live Chat Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {recentComments.map((comment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm">{comment.user}</span>
                        {comment.tip && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            Tipped ${comment.tip.toFixed(2)}
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-300">{comment.message}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StreamAnalytics
