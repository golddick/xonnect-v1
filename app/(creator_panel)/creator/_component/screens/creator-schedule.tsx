"use client"

import React, { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Video,
  Play,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Menu,
  X,
  Bell,
  BarChart3,
  DollarSign,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { sidebarItems } from "@/lib/constant"

export default function CreatorSchedule() {
   const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("month") // month, week, day


  const events = [
    {
      id: 1,
      title: "Live Music Performance",
      type: "live-stream",
      date: "2024-01-20",
      time: "20:00",
      duration: 120,
      status: "scheduled",
      attendees: 150,
      ticketPrice: 1500,
    },
    {
      id: 2,
      title: "Q&A Session",
      type: "live-stream",
      date: "2024-01-22",
      time: "18:00",
      duration: 90,
      status: "scheduled",
      attendees: 89,
      ticketPrice: 0,
    },
    {
      id: 3,
      title: "Music Production Workshop",
      type: "event",
      date: "2024-01-25",
      time: "15:00",
      duration: 180,
      status: "scheduled",
      attendees: 45,
      ticketPrice: 2500,
    },
    {
      id: 4,
      title: "Behind the Scenes Video",
      type: "video",
      date: "2024-01-18",
      time: "12:00",
      duration: 30,
      status: "published",
      attendees: 0,
      ticketPrice: 0,
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "live-stream":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      case "event":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
      case "video":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
      case "live":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "completed":
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
      case "published":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-muted/30 rounded-lg"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const dayEvents = events.filter((event) => event.date === dateStr)

      days.push(
        <div
          key={day}
          className="h-24 bg-card border border-border rounded-lg p-2 hover:bg-muted/50 transition-colors"
        >
          <div className="text-sm text-muted-foreground mb-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded border ${getEventTypeColor(event.type)} truncate`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
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
      <div className="w-full">
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
                  Schedule
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
                onClick={() => router.push("/creator/events/new")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Schedule Event</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Upcoming Events</p>
                  <p className="text-2xl font-bold text-foreground">
                    {events.filter((e) => e.status === "scheduled").length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">This Week</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Attendees</p>
                  <p className="text-2xl font-bold text-foreground">284</p>
                </div>
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Revenue Scheduled</p>
                  <p className="text-2xl font-bold text-yellow-500">₦6,500</p>
                </div>
                <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Calendar View */}
          <div className="bg-card border border-border rounded-2xl p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-foreground">
                  {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="bg-muted hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-lg p-2 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                {["month", "week", "day"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                      viewMode === mode
                        ? "bg-red-600 text-white"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-muted-foreground font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
          </div>

          {/* Upcoming Events List */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Upcoming Events</h3>
            <div className="space-y-4">
              {events
                .filter((event) => event.status === "scheduled")
                .map((event) => (
                  <div
                    key={event.id}
                    className="bg-muted/50 border border-border rounded-xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-foreground">{event.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getEventTypeColor(event.type)}`}>
                            {event.type.replace("-", " ")}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {event.time} ({event.duration}min)
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} registered</span>
                          </div>
                          {event.ticketPrice > 0 && (
                            <div className="flex items-center gap-1 text-yellow-500">
                              <DollarSign className="w-4 h-4" />
                              <span>₦{event.ticketPrice}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="bg-muted hover:bg-muted/80 text-foreground px-3 py-2 rounded-lg transition-colors border border-border">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="bg-muted hover:bg-muted/80 text-foreground px-3 py-2 rounded-lg transition-colors border border-border">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="bg-red-900/20 hover:bg-red-900/40 text-red-400 px-3 py-2 rounded-lg transition-colors border border-red-900/30">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
