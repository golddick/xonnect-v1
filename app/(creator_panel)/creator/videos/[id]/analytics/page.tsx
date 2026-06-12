"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Eye,
  ThumbsUp,
  MessageCircle,
  BarChart3,
  TrendingUp,
  DollarSign,
  X,
  ArrowLeft,
  Download,
  Share2,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { motion, AnimatePresence } from "framer-motion"

type AnalyticsTimeRange = "7d" | "30d" | "90d" | "all"

type AnalyticsComment = {
  id: string
  author: string
  text: string
  date: string
  likes: number
  replies: number
  avatar: string | null
}
type AnalyticsTimeSeriesItem = {
  date: string
  views: number
  likes: number
  comments: number
  shares: number
  watchTime: number
  purchases: number
  rentals24h: number
  rentals48h: number
}
type AnalyticsResponse = {
  folder: {
    id: string
    title: string
    contentType: string
    status: string
    thumbnail: string | null
    uploadDate: string | Date
    views: number
    likes: number
    comments: number
    revenue: number
    shares: number
    watchTimeSeconds: number
    purchases: number
    rentals24h: number
    rentals48h: number
    isPremium: boolean
    duration: string | null
    description: string | null
    tags: string[]
  }
  timeSeries: {
    range: string
    items: AnalyticsTimeSeriesItem[]
  }
  comments: AnalyticsComment[]
  engagementBreakdown: {
    likes: number
    comments: number
    shares: number
    purchases: number
    rentals24h: number
    rentals48h: number
  }
  episodesCount: number
}

const demographicsData = [
  { name: "18-24 years", value: 35, fill: "#dc2626" },
  { name: "25-34 years", value: 40, fill: "#ef4444" },
  { name: "35-44 years", value: 15, fill: "#f87171" },
  { name: "45+ years", value: 10, fill: "#fca5a5" },
]

function TrashSvg() {
  return (

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

export default function VideoAnalyticsPage() {
  const params = useParams()
  const router = useRouter()
  const folderId = params.id as string

  const [activeTimeRange, setActiveTimeRange] = useState<AnalyticsTimeRange>("7d")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null)

  const [showCommentsModal, setShowCommentsModal] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`/api/creator/videos/${folderId}/analytics`)
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.message || "Failed to load analytics")
        }

        const json = (await res.json()) as AnalyticsResponse
        if (!cancelled) setAnalytics(json)
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load analytics")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [folderId])

  const video = analytics?.folder
  const timeSeries = analytics?.timeSeries.items ?? []
  const comments = analytics?.comments ?? []

  const timeSeriesForCharts = useMemo(() => {
    if (timeSeries.length > 0) return timeSeries
    return [
      {
        date: "—",
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        watchTime: 0,
        purchases: 0,
        rentals24h: 0,
        rentals48h: 0,
      },
    ] satisfies AnalyticsTimeSeriesItem[]
  }, [timeSeries])

  const computed = useMemo(() => {
    const baseViews = video?.views ?? 0
    const baseLikes = video?.likes ?? 0
    const baseComments = video?.comments ?? 0
    const baseShares = video?.shares ?? 0
    const baseRevenue = video?.revenue ?? 0

    const viewsTrend = baseViews === 0 ? 0 : 12
    const likesTrend = baseLikes === 0 ? 0 : 8
    const commentsTrend = baseComments === 0 ? 0 : 15
    const sharesTrend = baseShares === 0 ? 0 : 5
    const revenueTrend = baseRevenue === 0 ? 0 : 10

    const sign = (pct: number) => (pct >= 0 ? "+" : "-") + Math.abs(pct).toFixed(0) + "%"

    return {
      views: sign(viewsTrend),
      likes: sign(likesTrend),
      comments: sign(commentsTrend),
      shares: sign(sharesTrend),
      revenue: sign(revenueTrend),
      engagement:
        baseViews === 0 ? "0%" : `${(((baseLikes + baseComments) / Math.max(1, baseViews)) * 100).toFixed(1)}%`,
    }
  }, [video])

  const handleExportAnalytics = () => {
    alert("Analytics exported as CSV (placeholder)")
  }

  const handleDeleteComment = (_commentId: string) => {
    alert("Delete comment not wired")
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Videos</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {video?.title ?? (loading ? "Loading…" : "Analytics")}
              </h1>
              <p className="text-gray-400">
                {video?.uploadDate
                  ? `Uploaded on ${new Date(video.uploadDate).toLocaleDateString()}`
                  : ""}
              </p>
            </div>

            <div className="w-full md:w-52 overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={video?.thumbnail || "/placeholder.svg"}
                alt={video?.title ?? "Folder thumbnail"}
                className="h-32 w-full object-cover"
              />
            </div>
          </div>

          <button
            onClick={handleExportAnalytics}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium w-fit"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {(["7d", "30d", "90d", "all"] as AnalyticsTimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setActiveTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-all font-medium ${
                activeTimeRange === range
                  ? "bg-red-600 text-white"
                  : "bg-muted border text-black border-border rounded-2xl hover:bg-muted-foreground transition-all duration-300 hover:text-red-400"
              }`}
            >
              {range === "7d" ? "Last 7d" : range === "30d" ? "Last 30d" : range === "90d" ? "Last 90d" : "All time"}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="max-w-3xl mx-auto bg-red-600/10 border border-red-600/30 rounded-xl p-6 text-red-600">
          {error}
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 md:gap-6">
          {[
            {
              label: "Views",
              value: (video?.views ?? 0).toLocaleString(),
              icon: Eye,
              color: "text-blue-400",
              trend: computed.views,
            },
            {
              label: "Likes",
              value: (video?.likes ?? 0).toLocaleString(),
              icon: ThumbsUp,
              color: "text-red-400",
              trend: computed.likes,
            },
            {
              label: "Comments",
              value: (video?.comments ?? 0).toLocaleString(),
              icon: MessageCircle,
              color: "text-green-400",
              trend: computed.comments,
            },
            {
              label: "Shares",
              value: (video?.shares ?? 0).toLocaleString(),
              icon: Share2,
              color: "text-yellow-400",
              trend: computed.shares,
            },
            {
              label: "Revenue",
              value: (video?.revenue ?? 0).toLocaleString(),
              icon: DollarSign,
              color: "text-amber-400",
              trend: computed.revenue,
            },
            {
              label: "Engagement",
              value: computed.engagement,
              icon: TrendingUp,
              color: "text-purple-400",
              trend: "+0%",
            },
            {
              label: "Purchases",
              value: (video?.purchases ?? 0).toLocaleString(),
              icon: Download,
              color: "text-green-500",
              trend: "+0%",
            },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 duration-300 text-foreground backdrop-blur-sm rounded-xl p-6 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <span className="text-green-400 text-xs font-medium">{stat.trend}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 text-foreground rounded-2xl transition-all duration-300 p-6"
          >
            <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-red-500" />
              Performance Over Time
            </h3>

            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesForCharts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#dc2626" strokeWidth={2} name="Views" />
                  <Line type="monotone" dataKey="likes" stroke="#16a34a" strokeWidth={2} name="Likes" />
                  <Line type="monotone" dataKey="comments" stroke="#2563eb" strokeWidth={2} name="Comments" />
                  {video?.isPremium && (
                    <>
                      <Line type="monotone" dataKey="purchases" stroke="#22c55e" strokeWidth={2} name="Purchases" />
                      <Line type="monotone" dataKey="rentals24h" stroke="#eab308" strokeWidth={2} name="Rentals (24h)" />
                      <Line type="monotone" dataKey="rentals48h" stroke="#f97316" strokeWidth={2} name="Rentals (48h)" />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 text-foreground transition-all duration-300 p-6 rounded-2xl"
          >
            <h3 className="font-bold mb-6 text-foreground">Viewer Demographics</h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographicsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {demographicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-white rounded-xl p-6"
        >
          <h3 className="font-bold mb-6 text-foreground">Engagement Breakdown</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSeriesForCharts}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="likes" fill="#16a34a" name="Likes" />
                <Bar dataKey="comments" fill="#2563eb" name="Comments" />
                <Bar dataKey="shares" fill="#ea580c" name="Shares" />
                {video?.isPremium && (
                  <>
                    <Bar dataKey="purchases" fill="#22c55e" name="Purchases" />
                    <Bar dataKey="rentals24h" fill="#eab308" name="Rentals (24h)" />
                    <Bar dataKey="rentals48h" fill="#f97316" name="Rentals (48h)" />
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-white rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold flex items-center text-foreground gap-2">
                <MessageCircle className="w-5 h-5 text-green-400" />
                Recent Comments
              </h3>
              <p className="text-sm text-gray-400 mt-1">{(video?.comments ?? 0).toLocaleString()} total comments</p>
            </div>
            <button
              onClick={() => setShowCommentsModal(true)}
              className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {comments.slice(0, 3).map((comment) => (
              <div key={comment.id} className="bg-transparent border border-border rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={comment.avatar || "/placeholder.svg"}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-bold text-sm">{comment.author}</p>
                      <span className="text-xs text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-sm text-gray-400">{comment.text}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <TrashSvg />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400 ml-13">
                  <button className="hover:text-red-400 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="ml-1">{comment.likes}</span>
                  </button>
                  <button className="hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="ml-1">{comment.replies} replies</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showCommentsModal && (
          <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-card backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-foreground">All Comments</h2>
                  <p className="text-muted-foreground text-sm">{(video?.comments ?? 0).toLocaleString()} comments on this video</p>
                </div>
                <button
                  onClick={() => setShowCommentsModal(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-muted/50 backdrop-blur-sm border border-border rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.author}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-bold text-sm text-foreground">{comment.author}</p>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{comment.text}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-muted-foreground hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <TrashSvg />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground ml-13">
                      <button className="hover:text-red-400 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="ml-1">{comment.likes}</span>
                      </button>
                      <button className="hover:text-blue-400 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="ml-1">{comment.replies} replies</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowCommentsModal(false)}
                className="w-full mt-6 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors border border-border font-medium"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
