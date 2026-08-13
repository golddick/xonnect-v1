// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Play, Eye, ThumbsUp, MessageCircle, Trash2, BarChart3, TrendingUp, X, Search, Zap, Menu, Bell, Plus } from "lucide-react"
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { useRouter } from "next/router"
// import { usePathname } from "next/navigation"
// import { sidebarItems } from "@/lib/constant"
// import Logo from "@/components/nav/logo"

// interface Video {
//   id: string
//   title: string
//   uploadDate: string
//   duration: string
//   thumbnail: string
//   views: number
//   likes: number
//   comments: number
//   shares: number
//   averageWatchTime: string
//   viewers: number
//   engagement: number
//   status: "published" | "draft"
// }

// interface Comment {
//   id: string
//   author: string
//   text: string
//   date: string
//   likes: number
//   replies: number
//   avatar: string
// }

// interface AnalyticsData {
//   date: string
//   views: number
//   likes: number
//   comments: number
//   shares: number
//   watchTime: number
// }

// export default function CreatorVideoAnalytics() {
//   const router = useRouter()
//   const pathname = usePathname()
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [activeTab, setActiveTab] = useState("overview")
//   const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
//   const [showCommentsModal, setShowCommentsModal] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortBy, setSortBy] = useState("views")




//   // Mock video data
//   const [videos] = useState<Video[]>([
//     {
//       id: "VID-001",
//       title: "How to Produce Beats Like a Pro - Full Tutorial",
//       uploadDate: "2024-01-20",
//       duration: "45:32",
//       thumbnail: "/music-production-setup.png",
//       views: 15420,
//       likes: 1250,
//       comments: 324,
//       shares: 189,
//       averageWatchTime: "38:12",
//       viewers: 12500,
//       engagement: 8.5,
//       status: "published",
//     },
//     {
//       id: "VID-002",
//       title: "Music Production Mistakes to Avoid",
//       uploadDate: "2024-01-18",
//       duration: "28:45",
//       thumbnail: "/music-production-setup.png",
//       views: 8920,
//       likes: 756,
//       comments: 189,
//       shares: 95,
//       averageWatchTime: "25:30",
//       viewers: 7200,
//       engagement: 7.2,
//       status: "published",
//     },
//     {
//       id: "VID-003",
//       title: "Creating Professional Beats with Minimal Equipment",
//       uploadDate: "2024-01-15",
//       duration: "32:15",
//       thumbnail: "/music-production-setup.png",
//       views: 22150,
//       likes: 1890,
//       comments: 512,
//       shares: 287,
//       averageWatchTime: "29:45",
//       viewers: 18900,
//       engagement: 9.1,
//       status: "published",
//     },
//   ])

//   // Mock comments data
//   const [videoComments] = useState<Comment[]>([
//     {
//       id: "COM-001",
//       author: "Chukwu Beats",
//       text: "This is exactly what I needed! Finally understand how to layer drums properly.",
//       date: "2024-01-22",
//       likes: 245,
//       replies: 12,
//       avatar: "/diverse-user-avatar-set-2.png",
//     },
//     {
//       id: "COM-002",
//       author: "Tunde Music",
//       text: "The best tutorial I've seen. Can you do a follow-up on mixing techniques?",
//       date: "2024-01-21",
//       likes: 189,
//       replies: 8,
//       avatar: "/diverse-user-avatars.png",
//     },
//     {
//       id: "COM-003",
//       author: "Ngozi Sound",
//       text: "Amazing content! Subscribed and hit the bell.",
//       date: "2024-01-21",
//       likes: 156,
//       replies: 5,
//       avatar: "/music-producer-avatar.png",
//     },
//   ])

//   // Mock analytics data
//   const [analyticsData] = useState<AnalyticsData[]>([
//     { date: "Jan 15", views: 1200, likes: 95, comments: 28, shares: 15, watchTime: 850 },
//     { date: "Jan 16", views: 1890, likes: 145, comments: 42, shares: 28, watchTime: 1320 },
//     { date: "Jan 17", views: 2150, likes: 178, comments: 55, shares: 35, watchTime: 1580 },
//     { date: "Jan 18", views: 1650, likes: 130, comments: 38, shares: 22, watchTime: 1220 },
//     { date: "Jan 19", views: 2890, likes: 235, comments: 78, shares: 48, watchTime: 2100 },
//     { date: "Jan 20", views: 3420, likes: 285, comments: 95, shares: 62, watchTime: 2450 },
//     { date: "Jan 21", views: 2320, likes: 192, comments: 62, shares: 41, watchTime: 1680 },
//   ])

//   const filteredVideos = videos
//     .filter((v) => v.title.toLowerCase().includes(searchTerm.toLowerCase()))
//     .sort((a, b) => {
//       if (sortBy === "views") return b.views - a.views
//       if (sortBy === "engagement") return b.engagement - a.engagement
//       if (sortBy === "recent") return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
//       return 0
//     })

//   const totalViews = videos.reduce((sum, v) => sum + v.views, 0)
//   const totalLikes = videos.reduce((sum, v) => sum + v.likes, 0)
//   const totalComments = videos.reduce((sum, v) => sum + v.comments, 0)
//   const avgEngagement = (videos.reduce((sum, v) => sum + v.engagement, 0) / videos.length).toFixed(1)

//   const handleDeleteComment = (commentId: string) => {
//     alert(`Comment ${commentId} deleted!`)
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
// `

//        {/* Mobile Sidebar */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-50 lg:hidden">
//           <div className="fixed inset-0 bg-background/50" onClick={() => setSidebarOpen(false)} />
//           <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border">
//             <div className="flex items-center justify-between p-6 border-b border-border">
//               <div className="flex items-center space-x-2">
//                <Logo/>
//                 <span className="text-xl font-bold text-foreground">Xonnect</span>
//               </div>
//               <button onClick={() => setSidebarOpen(false)}>
//                 <X className="w-6 h-6 text-muted-foreground" />
//               </button>
//             </div>
//             <nav className="p-4 space-y-2">
//               {sidebarItems.map((item, index) => (
//                 <button
//                   key={index}
//                   onClick={() => router.push(item.route)}
//                   className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
//                     pathname === item.route
//                       ? "bg-red-600/20 text-red-400 border border-red-600/30"
//                       : "text-muted-foreground hover:text-foreground hover:bg-muted"
//                   }`}
//                 >
//                   <item.icon className="w-5 h-5" />
//                   <span>{item.label}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//         <div className="border-b border-border bg-transparent backdrop-blur-sm sticky top-0 z-10">
//           <div className="flex items-center justify-between p-6">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors"
//               >
//                 <Menu className="w-5 h-5" />
//               </button>
//               <div>
//                 <h1 className="text-2xl font-bold text-foreground">
//                   Video Analytics
//                 </h1>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button className="relative bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors">
//                 <Bell className="w-5 h-5" />
//                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
//               </button>
//               <ThemeToggle />
//               <button
//                 onClick={() => router.push("/creator/schedule/new")}
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span>Schedule Event</span>
//               </button>
//             </div>
//           </div>
//         </div>


//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl md:text-4xl font-bold mb-2">Video Analytics</h1>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//         {[
//           {
//             label: "Total Views",
//             value: totalViews.toLocaleString(),
//             icon: Eye,
//             color: "text-blue-400",
//             trend: "+12%",
//           },
//           {
//             label: "Total Likes",
//             value: totalLikes.toLocaleString(),
//             icon: ThumbsUp,
//             color: "text-red-400",
//             trend: "+8%",
//           },
//           {
//             label: "Total Comments",
//             value: totalComments.toLocaleString(),
//             icon: MessageCircle,
//             color: "text-green-400",
//             trend: "+15%",
//           },
//           {
//             label: "Avg Engagement",
//             value: `${avgEngagement}%`,
//             icon: TrendingUp,
//             color: "text-yellow-400",
//             trend: "+5%",
//           },
//         ].map((stat, index) => {
//           const Icon = stat.icon
//           return (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: index * 0.1 }}
//               className="bg-card backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-muted/50 transition-all"
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-muted-foreground text-sm">{stat.label}</span>
//                 <Icon className={`w-5 h-5 ${stat.color}`} />
//               </div>
//               <div className="flex items-end justify-between">
//                 <p className="text-2xl font-bold">{stat.value}</p>
//                 <span className="text-green-400 text-xs font-medium">{stat.trend}</span>
//               </div>
//             </motion.div>
//           )
//         })}
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto pb-4">
//         {[
//           { key: "overview", label: "Overview" },
//           { key: "videos", label: "Videos" },
//           { key: "analytics", label: "Analytics" },
//         ].map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             className={`px-4 py-2 whitespace-nowrap text-sm font-medium transition-all border-b-2 ${
//               activeTab === tab.key ? "border-red-600 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div>
//         {/* Overview Tab */}
//         {activeTab === "overview" && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             className="space-y-8"
//           >
//             {/* Chart */}
//             <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6">
//               <h3 className="font-bold mb-6 flex items-center gap-2 text-foreground">
//                 <BarChart3 className="w-5 h-5 text-red-500" />
//                 7-Day Performance
//               </h3>
//               <div className="w-full h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={analyticsData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
//                     <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
//                     <YAxis stroke="rgba(255,255,255,0.5)" />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "rgba(0,0,0,0.8)",
//                         border: "1px solid rgba(255,255,255,0.2)",
//                         borderRadius: "8px",
//                       }}
//                     />
//                     <Legend />
//                     <Line type="monotone" dataKey="views" stroke="#dc2626" strokeWidth={2} />
//                     <Line type="monotone" dataKey="likes" stroke="#16a34a" strokeWidth={2} />
//                     <Line type="monotone" dataKey="comments" stroke="#2563eb" strokeWidth={2} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Top Videos */}
//             <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6">
//               <h3 className="font-bold mb-6 text-foreground">Top Performing Videos</h3>
//               <div className="space-y-4">
//                 {videos
//                   .sort((a, b) => b.views - a.views)
//                   .slice(0, 3)
//                   .map((video, index) => (
//                     <div
//                       key={video.id}
//                       className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-all"
//                     >
//                       <div className="flex items-center gap-4 flex-1 min-w-0">
//                         <span className="text-2xl font-bold text-red-500 flex-shrink-0">#{index + 1}</span>
//                         <div className="min-w-0 flex-1">
//                           <p className="font-medium text-sm truncate text-foreground">{video.title}</p>
//                           <p className="text-xs text-muted-foreground mt-1">{video.views.toLocaleString()} views</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-6 flex-shrink-0 ml-4">
//                         <div className="text-right">
//                           <p className="text-sm font-bold text-foreground">{video.engagement}%</p>
//                           <p className="text-xs text-muted-foreground">engagement</p>
//                         </div>
//                         <button
//                           onClick={() => {
//                             setSelectedVideo(video)
//                             setActiveTab("videos")
//                           }}
//                           className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-3 py-1 rounded text-xs font-medium border border-red-600/30"
//                         >
//                           View
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Videos Tab */}
//         {activeTab === "videos" && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             className="space-y-6"
//           >
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
//               <div className="flex-1 w-full sm:max-w-md">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                   <input
//                     type="text"
//                     placeholder="Search videos..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full bg-muted border border-border rounded-lg px-10 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
//                   />
//                 </div>
//               </div>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="bg-muted border border-border rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
//               >
//                 <option value="views">Sort by Views</option>
//                 <option value="engagement">Sort by Engagement</option>
//                 <option value="recent">Sort by Recent</option>
//               </select>
//             </div>

//             <div className="space-y-4">
//               {filteredVideos.map((video, index) => (
//                 <motion.div
//                   key={video.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className="bg-card backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-muted/50 transition-all cursor-pointer"
//                   onClick={() => {
//                     setSelectedVideo(video)
//                     setShowCommentsModal(true)
//                   }}
//                 >
//                   <div className="flex flex-col md:flex-row gap-6">
//                     <div className="relative flex-shrink-0">
//                       <img
//                         src={video.thumbnail || "/placeholder.svg"}
//                         alt={video.title}
//                         className="w-full md:w-48 h-40 md:h-32 object-cover rounded-lg"
//                       />
//                       <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg hover:bg-black/60 transition-all">
//                         <Play className="w-8 h-8 text-red-500" />
//                       </div>
//                       <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-medium text-white">
//                         {video.duration}
//                       </span>
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="mb-4">
//                         <h3 className="text-lg font-bold mb-1 break-words text-foreground">{video.title}</h3>
//                         <p className="text-sm text-muted-foreground">Uploaded {video.uploadDate}</p>
//                       </div>

//                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-sm">
//                         <div>
//                           <p className="text-muted-foreground text-xs mb-1">Views</p>
//                           <p className="font-bold text-foreground">{video.views.toLocaleString()}</p>
//                         </div>
//                         <div>
//                           <p className="text-muted-foreground text-xs mb-1">Likes</p>
//                           <p className="font-bold text-foreground">{video.likes.toLocaleString()}</p>
//                         </div>
//                         <div>
//                           <p className="text-muted-foreground text-xs mb-1">Comments</p>
//                           <p className="font-bold text-foreground">{video.comments.toLocaleString()}</p>
//                         </div>
//                         <div>
//                           <p className="text-gray-500 text-xs mb-1">Engagement</p>
//                           <p className="font-bold text-green-400">{video.engagement}%</p>
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap gap-2">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             setSelectedVideo(video)
//                             setShowCommentsModal(true)
//                           }}
//                           className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium text-sm border border-blue-600/30"
//                         >
//                           <MessageCircle className="w-4 h-4" />
//                           Comments
//                         </button>
//                         <button className="bg-green-600/20 hover:bg-green-600/30 text-green-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium text-sm border border-green-600/30">
//                           <BarChart3 className="w-4 h-4" />
//                           Details
//                         </button>
//                         <button className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium text-sm border border-red-600/30">
//                           <Trash2 className="w-4 h-4" />
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Analytics Tab */}
//         {activeTab === "analytics" && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             className="space-y-8"
//           >
//             <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6">
//               <h3 className="font-bold mb-6 text-foreground">Engagement Breakdown</h3>
//               <div className="w-full h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={analyticsData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                     <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
//                     <YAxis stroke="hsl(var(--muted-foreground))" />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "hsl(var(--background))",
//                         border: "1px solid hsl(var(--border))",
//                         borderRadius: "8px",
//                         color: "hsl(var(--foreground))"
//                       }}
//                     />
//                     <Legend />
//                     <Bar dataKey="likes" fill="#16a34a" />
//                     <Bar dataKey="comments" fill="#2563eb" />
//                     <Bar dataKey="shares" fill="#ea580c" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6">
//                 <h3 className="font-bold mb-6 text-foreground">Watch Time Distribution</h3>
//                 <div className="space-y-4">
//                   {[
//                     { range: "0-25%", percentage: 15, viewers: 2345 },
//                     { range: "25-50%", percentage: 25, viewers: 3890 },
//                     { range: "50-75%", percentage: 35, viewers: 5420 },
//                     { range: "75-100%", percentage: 25, viewers: 3876 },
//                   ].map((item, index) => (
//                     <div key={index}>
//                       <div className="flex items-center justify-between mb-2 text-sm">
//                         <span className="text-muted-foreground">{item.range}</span>
//                         <span className="font-bold text-foreground">{item.viewers.toLocaleString()} viewers</span>
//                       </div>
//                       <div className="w-full bg-muted rounded-full h-2">
//                         <div
//                           className="bg-red-600 h-2 rounded-full"
//                           style={{ width: `${item.percentage}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6">
//                 <h3 className="font-bold mb-6 text-foreground">Viewer Demographics</h3>
//                 <div className="space-y-4">
//                   {[
//                     { label: "18-24 years", percentage: 35 },
//                     { label: "25-34 years", percentage: 40 },
//                     { label: "35-44 years", percentage: 15 },
//                     { label: "45+ years", percentage: 10 },
//                   ].map((item, index) => (
//                     <div key={index}>
//                       <div className="flex items-center justify-between mb-2 text-sm">
//                         <span className="text-muted-foreground">{item.label}</span>
//                         <span className="font-bold text-foreground">{item.percentage}%</span>
//                       </div>
//                       <div className="w-full bg-muted rounded-full h-2">
//                         <div
//                           className="bg-blue-600 h-2 rounded-full"
//                           style={{ width: `${item.percentage}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>

//       {/* Comments Modal */}
//       <AnimatePresence>
//         {showCommentsModal && selectedVideo && (
//           <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               transition={{ duration: 0.3 }}
//               className="bg-card backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h2 className="text-2xl font-bold mb-2 text-foreground">{selectedVideo.title}</h2>
//                   <p className="text-muted-foreground text-sm">{selectedVideo.comments.toLocaleString()} comments</p>
//                 </div>
//                 <button
//                   onClick={() => setShowCommentsModal(false)}
//                   className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 {videoComments.map((comment) => (
//                   <div key={comment.id} className="bg-muted/50 backdrop-blur-sm border border-border rounded-lg p-4">
//                     <div className="flex items-start gap-3 mb-3">
//                       <img
//                         src={comment.avatar || "/placeholder.svg"}
//                         alt={comment.author}
//                         className="w-10 h-10 rounded-full object-cover flex-shrink-0"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center justify-between gap-2 mb-1">
//                           <p className="font-bold text-sm text-foreground">{comment.author}</p>
//                           <span className="text-xs text-muted-foreground">{comment.date}</span>
//                         </div>
//                         <p className="text-sm text-muted-foreground mb-3">{comment.text}</p>
//                       </div>
//                       <button
//                         onClick={() => handleDeleteComment(comment.id)}
//                         className="text-muted-foreground hover:text-red-400 transition-colors flex-shrink-0"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                     <div className="flex items-center gap-4 text-xs text-muted-foreground ml-13">
//                       <button className="hover:text-red-400 transition-colors">
//                         <ThumbsUp className="w-4 h-4" />
//                         <span className="ml-1">{comment.likes}</span>
//                       </button>
//                       <button className="hover:text-blue-400 transition-colors">
//                         <MessageCircle className="w-4 h-4" />
//                         <span className="ml-1">{comment.replies} replies</span>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <button
//                 onClick={() => setShowCommentsModal(false)}
//                 className="w-full mt-6 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors border border-border font-medium"
//               >
//                 Close
//               </button>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }




"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Eye, ThumbsUp, MessageCircle, Trash2, BarChart3, TrendingUp, X, Search, Zap, Menu, Bell, Plus, Loader2 } from "lucide-react"
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
} from "recharts"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { sidebarItems } from "@/lib/constant"
import Logo from "@/components/nav/logo"
import { useParams } from "next/navigation"
import LoadingSplash from "@/components/splash_screen/loading-splash"

interface Video {
  id: string
  title: string
  description: string | null
  duration: number | null
  createdAt: string
  videoUrl: string | null
  thumbnailUrl: string | null
  status: string
  monetizationType: string | null
  isPremium: boolean
  viewsCount: number
  likesCount: number
  commentsCount: number
  revenue: number
  rent24Price: number | null
  rent48Price: number | null
  purchasePrice: number | null
  tags: string[]
}

interface Comment {
  id: string
  author: string
  text: string
  date: string
  likes: number
  replies: number
  avatar: string | null
}

interface TimeSeriesItem {
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

interface FolderData {
  id: string
  title: string
  contentType: string
  status: string
  thumbnail: string | null
  uploadDate: string
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
  duration: number | null
  description: string | null
  tags: string[]
}

interface AnalyticsResponse {
  folder: FolderData
  timeSeries: {
    range: string
    items: TimeSeriesItem[]
  }
  comments: Comment[]
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

export default function CreatorVideoAnalytics() {
  const router = useRouter()
  const params = useParams()
  const folderId = params?.id as string
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [showCommentsModal, setShowCommentsModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("views")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsResponse | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [range, setRange] = useState("7d")

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!folderId) return
      
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/api/creator/analytics/folder/${folderId}?range=${range}`)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to fetch analytics")
        }
        
        const data: AnalyticsResponse = await response.json()
        setAnalyticsData(data)
        setVideos(data.folder ? [{
          id: data.folder.id,
          title: data.folder.title,
          description: data.folder.description,
          duration: data.folder.duration,
          createdAt: data.folder.uploadDate,
          videoUrl: null,
          thumbnailUrl: data.folder.thumbnail,
          status: data.folder.status,
          monetizationType: null,
          isPremium: data.folder.isPremium,
          viewsCount: data.folder.views,
          likesCount: data.folder.likes,
          commentsCount: data.folder.comments,
          revenue: data.folder.revenue,
          rent24Price: null,
          rent48Price: null,
          purchasePrice: null,
          tags: data.folder.tags,
        }] : [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load analytics")
        console.error("Error fetching analytics:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchAnalytics()
  }, [folderId, range])

  const totalViews = analyticsData?.folder.views || 0
  const totalLikes = analyticsData?.folder.likes || 0
  const totalComments = analyticsData?.folder.comments || 0
  const avgEngagement = videos.length > 0 
    ? ((totalLikes + totalComments) / (totalViews || 1) * 100).toFixed(1)
    : "0"

  const filteredVideos = videos
    .filter((v) => v.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "views") return (b.viewsCount || 0) - (a.viewsCount || 0)
      if (sortBy === "engagement") return ((b.likesCount || 0) + (b.commentsCount || 0)) - ((a.likesCount || 0) + (a.commentsCount || 0))
      if (sortBy === "recent") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      return 0
    })

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await fetch(`/api/creator/comments/${commentId}`, {
        method: "DELETE",
      })
      
      if (!response.ok) {
        throw new Error("Failed to delete comment")
      }
      
      // Refresh data
      const refreshResponse = await fetch(`/api/creator/analytics/folder/${folderId}?range=${range}`)
      if (refreshResponse.ok) {
        const data = await refreshResponse.json()
        setAnalyticsData(data)
      }
    } catch (err) {
      console.error("Error deleting comment:", err)
      alert("Failed to delete comment")
    }
  }

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "00:00"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <LoadingSplash />
      </div>
    )
  }

  if (error || !analyticsData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Failed to load analytics"}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground w-full p-4 md:p-8">
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <Logo />
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
                    item.route === "/creator/analytics"
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
                {analyticsData.folder.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {analyticsData.episodesCount} episodes • {analyticsData.folder.contentType}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            <button className="relative bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
            </button>
            <ThemeToggle />
           
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 mt-8">
        {[
          {
            label: "Total Views",
            value: totalViews.toLocaleString(),
            icon: Eye,
            color: "text-blue-400",
          },
          {
            label: "Total Likes",
            value: totalLikes.toLocaleString(),
            icon: ThumbsUp,
            color: "text-red-400",
          },
          {
            label: "Total Comments",
            value: totalComments.toLocaleString(),
            icon: MessageCircle,
            color: "text-green-400",
          },
          {
            label: "Avg Engagement",
            value: `${avgEngagement}%`,
            icon: TrendingUp,
            color: "text-yellow-400",
          },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-muted/50 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-sm">{stat.label}</span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto pb-4">
        {[
          { key: "overview", label: "Overview" },
          { key: "videos", label: "Videos" },
          { key: "analytics", label: "Analytics" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 whitespace-nowrap text-sm font-medium transition-all border-b-2 ${
              activeTab === tab.key
                ? "border-red-600 text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Chart */}
            <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6">
              <h3 className="font-bold mb-6 flex items-center gap-2 text-foreground">
                <BarChart3 className="w-5 h-5 text-red-500" />
                Performance Over Time
              </h3>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.timeSeries.items}>
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
                    <Line type="monotone" dataKey="views" stroke="#dc2626" strokeWidth={2} />
                    <Line type="monotone" dataKey="likes" stroke="#16a34a" strokeWidth={2} />
                    <Line type="monotone" dataKey="comments" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Engagement Breakdown */}
            <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6">
              <h3 className="font-bold mb-6 text-foreground">Engagement Breakdown</h3>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.timeSeries.items}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))"
                      }}
                    />
                    <Legend />
                    <Bar dataKey="likes" fill="#16a34a" />
                    <Bar dataKey="comments" fill="#2563eb" />
                    <Bar dataKey="purchases" fill="#ea580c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* Videos Tab */}
        {activeTab === "videos" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex-1 w-full sm:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-muted border border-border rounded-lg px-10 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
                  />
                </div>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-muted border border-border rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="views">Sort by Views</option>
                <option value="engagement">Sort by Engagement</option>
                <option value="recent">Sort by Recent</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredVideos.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No videos found</p>
                </div>
              ) : (
                filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-muted/50 transition-all cursor-pointer"
                    onClick={() => {
                      setSelectedVideo(video)
                      setShowCommentsModal(true)
                    }}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnailUrl || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full md:w-48 h-40 md:h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg hover:bg-black/60 transition-all">
                          <Play className="w-8 h-8 text-red-500" />
                        </div>
                        {video.duration && (
                          <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-medium text-white">
                            {formatDuration(video.duration)}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold mb-1 break-words text-foreground">{video.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Uploaded {new Date(video.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-sm">
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">Views</p>
                            <p className="font-bold text-foreground">{video.viewsCount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">Likes</p>
                            <p className="font-bold text-foreground">{video.likesCount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">Comments</p>
                            <p className="font-bold text-foreground">{video.commentsCount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">Revenue</p>
                            <p className="font-bold text-green-400">${(video.revenue || 0).toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedVideo(video)
                              setShowCommentsModal(true)
                            }}
                            className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium text-sm border border-blue-600/30"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Comments
                          </button>
                          <button className="bg-green-600/20 hover:bg-green-600/30 text-green-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium text-sm border border-green-600/30">
                            <BarChart3 className="w-4 h-4" />
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="font-bold mb-4 text-foreground">Revenue</h3>
                <p className="text-3xl font-bold text-green-400">
                  ${(analyticsData.folder.revenue || 0).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Total revenue from this folder</p>
              </div>
              <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="font-bold mb-4 text-foreground">Purchases</h3>
                <p className="text-3xl font-bold text-blue-400">
                  {analyticsData.folder.purchases}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {analyticsData.folder.rentals24h} rentals (24h) • {analyticsData.folder.rentals48h} rentals (48h)
                </p>
              </div>
              <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6">
                <h3 className="font-bold mb-4 text-foreground">Premium Content</h3>
                <p className="text-3xl font-bold text-yellow-400">
                  {analyticsData.folder.isPremium ? "Yes" : "No"}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {analyticsData.folder.tags?.length || 0} tags
                </p>
              </div>
            </div>

            <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6">
              <h3 className="font-bold mb-6 text-foreground">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {analyticsData.folder.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-muted px-3 py-1 rounded-full text-sm text-foreground"
                  >
                    #{tag}
                  </span>
                ))}
                {(!analyticsData.folder.tags || analyticsData.folder.tags.length === 0) && (
                  <p className="text-muted-foreground">No tags available</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Comments Modal */}
      <AnimatePresence>
        {showCommentsModal && selectedVideo && (
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
                  <h2 className="text-2xl font-bold mb-2 text-foreground">{selectedVideo.title}</h2>
                  <p className="text-muted-foreground text-sm">{selectedVideo.commentsCount.toLocaleString()} comments</p>
                </div>
                <button
                  onClick={() => setShowCommentsModal(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {analyticsData.comments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No comments yet</p>
                  </div>
                ) : (
                  analyticsData.comments.map((comment) => (
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
                          <Trash2 className="w-4 h-4" />
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
                  ))
                )}
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