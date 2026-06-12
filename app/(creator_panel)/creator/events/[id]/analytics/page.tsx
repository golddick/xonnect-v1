"use client"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {Eye, Heart, DollarSign, TrendingUp, Radio, RadioIcon, EyeOff, ArrowLeft} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import {router} from "next/client";

const EventAnalyticsPage = () => {

  const [showStreamKey, setShowStreamKey] = useState(false)

  // Added: Flag to indicate if event is free
  const isFreeEvent = true // Set this based on your actual event data

  // Added: Sample user reservation data for free events
  const userReservations = [
    { id: 1, name: "John Doe", email: "john@example.com", reservationDate: "2024-03-15", status: "Confirmed" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", reservationDate: "2024-03-16", status: "Confirmed" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", reservationDate: "2024-03-16", status: "Pending" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", reservationDate: "2024-03-17", status: "Confirmed" },
    { id: 5, name: "David Brown", email: "david@example.com", reservationDate: "2024-03-17", status: "Confirmed" },
  ]

  const streamData = {
    title: "Gaming Tournament Championship 2024",
    totalViews: 125420,
    avgViewers: 8234,
    peakViewers: 15680,
    duration: "3h 45m",
    likes: 3450,
    comments: 892,
    revenue: 8540.5,
    streamKey: "",
    rtmpUrl: "",
  }

  const generateStreamKey = () => {
    const router = useRouter()
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const rtmp = `rtmp://live.xonnect.com/live/${key}`
  }

  const viewsOverTime = [
    { time: "00:00", viewers: 1200 },
    { time: "00:30", viewers: 3500 },
    { time: "01:00", viewers: 7200 },
    { time: "01:30", viewers: 9800 },
    { time: "02:00", viewers: 12300 },
    { time: "02:30", viewers: 15680 },
    { time: "03:00", viewers: 14200 },
    { time: "03:30", viewers: 8500 },
    { time: "04:00", viewers: 3200 },
  ]

  const ticketBreakdown = [
    { name: "Venue Access", value: 45, revenue: 3825 },
    { name: "Stream Access", value: 78, revenue: 2340 },
    { name: "Premium Access", value: 32, revenue: 2375 },
  ]


  const viewerDemographics = [
    { country: "USA", percentage: 35 },
    { country: "UK", percentage: 18 },
    { country: "Canada", percentage: 15 },
    { country: "Australia", percentage: 12 },
    { country: "Nigeria", percentage: 18 },
    { country: "Ghana", percentage: 15 },
    { country: "South Africa", percentage: 12 },
    { country: "Others", percentage: 20 },
  ]

  const COLORS = ["#ef4444", "#ec4899", "#06b6d4", "#8b5cf6", "#6366f1"]

  return (
      <div className="min-h-screen bg-background text-foreground p-8">
        <div className="max-w-7xl mx-auto">
          <button
              onClick={() => router.back()}
              className="flex items-center mb-2 gap-2 text-gray-400 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </button>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{streamData.title}</h1>
            <p className="text-gray-400">Event Analytics, Performance Metrics & Stream Key</p>
          </div>

          <div className="space-y-4  gap-6 mb-8">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <RadioIcon className="w-5 h-5 text-red-400" />
              Stream Configuration
            </h3>

            <div className=" hover:bg-muted/70 transition-all duration-300 rounded-xl">
              <div className="flex w-full justify-between gap-6 flex-col md:flex-row">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">RTMP URL</label>
                  <div className="flex gap-2">
                    <input
                        type="text"
                        value={streamData.rtmpUrl || "rtmp://live.xonnect.com/live/"}
                        readOnly
                        className="flex-1 border bg-transparent border-gray-600 rounded-lg px-3 py-2 text-foreground text-sm w-full lg:w-96"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Stream Key</label>
                  <div className="flex gap-2">
                    <input
                        type={showStreamKey ? "text" : "password"}
                        value={streamData.streamKey || "Click generate to create"}
                        readOnly
                        className="flex-1  border bg-transparent border-gray-600 rounded-lg px-3 py-2 text-foreground text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowStreamKey(!showStreamKey)}
                        className="bg-background hover:bg-gray-600 rounded-lg p-2 transition-colors"
                    >
                      {showStreamKey ? (
                          <EyeOff className="w-4 h-4 text-foreground" />
                      ) : (
                          <Eye className="w-4 h-4 text-foreground" />
                      )}
                    </button>
                    <button
                        type="button"
                        onClick={generateStreamKey}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border border-border rounded-2xl  hover:bg-muted/50 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Views</p>
                    <p className="text-3xl font-bold text-foreground">{streamData.totalViews.toLocaleString()}</p>
                  </div>
                  <Eye className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border rounded-2xl  hover:bg-muted/50 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Venu participant</p>
                    <p className="text-3xl font-bold text-foreground">{streamData.peakViewers.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border rounded-2xl  hover:bg-muted/50 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Engagement</p>
                    <p className="text-3xl font-bold">{(streamData.likes + streamData.comments).toLocaleString()}</p>
                  </div>
                  <Heart className="w-8 h-8 text-pink-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border rounded-2xl  hover:bg-muted/50 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Revenue</p>
                    <p className="text-3xl font-bold text-foreground">₦{streamData.revenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card border border-border rounded-2xl  hover:bg-muted/50 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
              <CardHeader>
                <CardTitle className={"text-foreground"}>Viewers Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={viewsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
                    <Line type="monotone" dataKey="viewers" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border rounded-2xl  hover:bg-muted/50 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
              <CardHeader>
                <CardTitle className={"text-foreground"}>Ticket Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                        data={ticketBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                      {ticketBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">

            <Card className=" bg-card border border-border rounded-2xl  hover:bg-muted/50 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
              <CardHeader>
                <CardTitle className={"text-foreground"}>Ticket Sales Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-800">
                    <tr>
                      <th className="text-left p-4 font-semibold">Ticket Type</th>
                      <th className="text-left p-4 font-semibold">Quantity Sold</th>
                      <th className="text-left p-4 font-semibold">Revenue</th>
                      <th className="text-left p-4 font-semibold">Percentage</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ticketBreakdown.map((ticket, idx) => (
                        <tr key={idx} className="border-b border-gray-800 hover:bg-red-800/50">
                          <td className="p-4">{ticket.name}</td>
                          <td className="p-4 font-semibold">{ticket.value}</td>
                          <td className="p-4 text-green-400">₦{ticket.revenue.toLocaleString()}</td>
                          <td className="p-4">{Math.round((ticket.revenue / streamData.revenue) * 100)}%</td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Added: User Reservations Table for Free Events */}
            {isFreeEvent && (
                <div className="mb-8">
                  <Card className="bg-card border border-border rounded-2xl hover:bg-muted/50 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
                    <CardHeader>
                      <CardTitle className={"text-foreground"}>User Reservations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="border-b border-gray-800">
                          <tr>
                            <th className="text-left p-4 font-semibold">User Name</th>
                            <th className="text-left p-4 font-semibold">Email</th>
                            <th className="text-left p-4 font-semibold">Reservation Date</th>
                            <th className="text-left p-4 font-semibold">Status</th>
                          </tr>
                          </thead>
                          <tbody>
                          {userReservations.map((user) => (
                              <tr key={user.id} className="border-b border-gray-800 hover:bg-red-800/50">
                                <td className="p-4">{user.name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">{user.reservationDate}</td>
                                <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                                user.status === "Confirmed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                            }`}>
                              {user.status}
                            </span>
                                </td>
                              </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
            )}

            <Card className="bg-card border border-border rounded-2xl  hover:bg-muted/50 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
              <CardHeader>
                <CardTitle className={"text-foreground"}>Viewer Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={viewerDemographics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="country" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
                    <Bar dataKey="percentage" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

          </div>

        </div>
      </div>
  )
}

export default EventAnalyticsPage