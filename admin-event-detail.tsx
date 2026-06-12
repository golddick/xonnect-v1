"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  Star,
  ArrowLeft,
  Ticket,
  Eye,
  BarChart3,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { updateEventPriority } from "@/actions/admin"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface EventDetailProps {
  event: {
    id: string
    name: string
    date: string
    description?: string
    isPriority: boolean
    status: "UPCOMING" | "LIVE" | "COMPLETED" | "CANCELLED"
    originalPrices: {
      physical: number
      stream: number
    }
    totals: {
      physical: { raw: number; net: number }
      stream: { raw: number; net: number }
      combined: { raw: number; net: number }
    }
    slots: {
      remainingSlots: number
      totalSlots: number
    }
    creator?: {
      name: string
      email: string
      id: string
    }
    attendees?: {
      physical: number
      stream: number
      total: number
    }
    streamUrl?: string
    location?: string
    category?: string
    tags?: string[]
  }
}

export default function AdminEventDetail({ event }: EventDetailProps) {
  const router = useRouter()
  const [isPriority, setIsPriority] = useState(event.isPriority)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handlePriorityToggle = async () => {
    try {
      setIsUpdating(true)
      await updateEventPriority(event.id, !isPriority)
      setIsPriority(!isPriority)
      setShowConfirmation(true)
      setTimeout(() => setShowConfirmation(false), 3000)
    } catch (error) {
      console.error("Failed to update priority status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
      case "LIVE":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "COMPLETED":
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
      case "CANCELLED":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const revenueData = {
    labels: ["Physical", "Stream", "Total"],
    datasets: [
      {
        label: "Gross Revenue",
        data: [event.totals.physical.raw, event.totals.stream.raw, event.totals.combined.raw],
        backgroundColor: "rgba(220, 38, 38, 0.8)",
        borderColor: "rgb(220, 38, 38)",
        borderWidth: 1,
      },
      {
        label: "Net Revenue",
        data: [event.totals.physical.net, event.totals.stream.net, event.totals.combined.net],
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderColor: "rgb(255, 255, 255)",
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += "₦" + context.parsed.y.toLocaleString()
            }
            return label
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          color: "#374151",
          drawBorder: true,
        },
        border: {
          color: "#374151",
        },
      },
      y: {
        ticks: {
          color: "#9ca3af",
          callback: (value: any) => "₦" + value.toLocaleString(),
        },
        grid: {
          color: "#374151",
          drawBorder: true,
        },
        border: {
          color: "#374151",
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
        borderSkipped: false,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Event Details
                </h1>
                <p className="text-gray-400 mt-1">Manage event information and settings</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`flex items-center space-x-2 ${getStatusColor(event.status)} px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm`}
              >
                {event.status === "LIVE" && <CheckCircle className="w-4 h-4" />}
                {event.status === "CANCELLED" && <XCircle className="w-4 h-4" />}
                {event.status === "UPCOMING" && <Clock className="w-4 h-4" />}
                {event.status === "COMPLETED" && <CheckCircle className="w-4 h-4" />}
                <span>{event.status}</span>
              </div>

              <div className="flex gap-2">
                <button className="bg-gray-800 hover:bg-gray-700 rounded-lg p-2 transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-lg p-2 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Event Title and Priority Toggle */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{event.name}</h2>
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(event.date)}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3">
                <span className="text-gray-400">Priority Status:</span>
                <button
                  onClick={handlePriorityToggle}
                  disabled={isUpdating}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isPriority
                      ? "bg-red-600/20 text-red-400 border border-red-600/30"
                      : "bg-gray-800 text-gray-400 border border-gray-700"
                  }`}
                >
                  <Star className={`w-4 h-4 ${isPriority ? "fill-red-400" : ""}`} />
                  <span>{isPriority ? "Priority" : "Regular"}</span>
                  {isUpdating && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                      <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
              </div>
              {showConfirmation && (
                <div className="text-sm text-green-400 animate-fade-in">Status updated successfully!</div>
              )}
            </div>
          </div>

          {event.description && (
            <div className="mt-6 bg-gray-800/50 rounded-xl p-4 text-gray-300">{event.description}</div>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-white">₦{event.totals.combined.net.toLocaleString()}</p>
                <p className="text-green-400 text-sm mt-1">
                  +₦{(event.totals.combined.raw - event.totals.combined.net).toLocaleString()} platform fee
                </p>
              </div>
              <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Physical Tickets</p>
                <p className="text-3xl font-bold text-white">
                  {event.attendees?.physical || event.slots.totalSlots - event.slots.remainingSlots}
                </p>
                <p className="text-blue-400 text-sm mt-1">
                  {((event.slots.totalSlots - event.slots.remainingSlots) / event.slots.totalSlots) * 100}% capacity
                </p>
              </div>
              <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                <Ticket className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Stream Viewers</p>
                <p className="text-3xl font-bold text-white">{event.attendees?.stream || 0}</p>
                <p className="text-yellow-400 text-sm mt-1">Online attendees</p>
              </div>
              <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Attendees</p>
                <p className="text-3xl font-bold text-white">
                  {(
                    event.attendees?.total ||
                    (event.attendees?.physical || event.slots.totalSlots - event.slots.remainingSlots) +
                      (event.attendees?.stream || 0)
                  ).toLocaleString()}
                </p>
                <p className="text-purple-400 text-sm mt-1">Combined attendance</p>
              </div>
              <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-red-400" />
            <h3 className="text-xl font-bold text-white">Revenue Breakdown</h3>
          </div>
          <div className="h-80 w-full">
            <Bar data={revenueData} options={chartOptions} />
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticket Information */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-red-400" />
              Ticket Information
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-gray-400 mb-2">Physical Tickets</h4>
                <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Price:</span>
                    <span className="text-white font-semibold">
                      {event.originalPrices.physical > 0
                        ? `₦${event.originalPrices.physical.toLocaleString()}`
                        : "Free"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Available:</span>
                    <span className="text-white font-semibold">
                      {event.slots.remainingSlots} / {event.slots.totalSlots}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Revenue:</span>
                    <span className="text-white font-semibold">₦{event.totals.physical.net.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{
                        width: `${((event.slots.totalSlots - event.slots.remainingSlots) / event.slots.totalSlots) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-gray-400 mb-2">Stream Access</h4>
                <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Price:</span>
                    <span className="text-white font-semibold">
                      {event.originalPrices.stream > 0 ? `₦${event.originalPrices.stream.toLocaleString()}` : "Free"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Viewers:</span>
                    <span className="text-white font-semibold">{event.attendees?.stream || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Revenue:</span>
                    <span className="text-white font-semibold">₦{event.totals.stream.net.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Creator Information */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-red-400" />
              Creator Information
            </h3>

            {event.creator ? (
              <div className="bg-gray-800/50 rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{event.creator.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{event.creator.name}</div>
                    <div className="text-sm text-gray-400">{event.creator.email}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-700">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Creator ID:</span>
                    <span className="text-white">{event.creator.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Revenue Share:</span>
                    <span className="text-white">70%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/50 rounded-lg p-4 text-gray-400 text-center">
                No creator information available
              </div>
            )}
          </div>

          {/* Stream Information */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-red-400" />
              Stream Information
            </h3>

            {event.streamUrl ? (
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="mb-2 text-gray-400">Stream URL:</div>
                  <div className="bg-gray-900 p-2 rounded border border-gray-700 text-gray-300 break-all">
                    {event.streamUrl}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button className="bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg px-4 py-2 hover:bg-red-600/30 transition-colors">
                    View Stream
                  </button>
                  <button className="bg-gray-800 text-gray-300 border border-gray-700 rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors">
                    Copy URL
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-gray-400">No stream URL has been set for this event.</p>
                <button className="mt-4 bg-gray-700 text-white rounded-lg px-4 py-2 hover:bg-gray-600 transition-colors">
                  Set Stream URL
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Additional Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-gray-400 mb-2">Category</h4>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <span className="text-white">{event.category || "Uncategorized"}</span>
              </div>
            </div>

            <div>
              <h4 className="text-gray-400 mb-2">Tags</h4>
              <div className="bg-gray-800/50 rounded-lg p-4">
                {event.tags && event.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400">No tags</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
