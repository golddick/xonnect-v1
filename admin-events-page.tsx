"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Search,
  Filter,
  ChevronDown,
  Plus,
  ArrowUpDown,
  Star,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  MoreHorizontal,
  Users,
  Ticket,
} from "lucide-react"
import { getAllEvents, deleteEvent, updateEventPriority } from "@/actions/admin"

interface Event {
  id: string
  name: string
  date: string
  status: "UPCOMING" | "LIVE" | "COMPLETED" | "CANCELLED"
  isPriority: boolean
  creator?: {
    name: string
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
  attendees?: {
    physical: number
    stream: number
    total: number
  }
}

export default function AdminEventsPage() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [actionEvent, setActionEvent] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isPriorityUpdating, setIsPriorityUpdating] = useState<string | null>(null)

  useEffect(() => {
    loadEvents()
  }, [])

  useEffect(() => {
    filterAndSortEvents()
  }, [events, searchTerm, statusFilter, sortBy, sortDirection])

  const loadEvents = async () => {
    try {
      setLoading(true)
      const data = await getAllEvents()
      setEvents(data as Event[])
    } catch (error) {
      console.error("Failed to load events:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortEvents = () => {
    let filtered = [...events]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (event.creator?.name && event.creator.name.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((event) => event.status === statusFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case "revenue":
          comparison = a.totals.combined.net - b.totals.combined.net
          break
        case "attendance":
          const aAttendance =
            a.attendees?.total || a.slots.totalSlots - a.slots.remainingSlots + (a.attendees?.stream || 0)
          const bAttendance =
            b.attendees?.total || b.slots.totalSlots - b.slots.remainingSlots + (b.attendees?.stream || 0)
          comparison = aAttendance - bAttendance
          break
        default:
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

    setFilteredEvents(filtered)
  }

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortDirection("desc")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id)
      await deleteEvent(id)
      setEvents(events.filter((event) => event.id !== id))
    } catch (error) {
      console.error("Failed to delete event:", error)
    } finally {
      setIsDeleting(null)
    }
  }

  const handlePriorityToggle = async (id: string, currentStatus: boolean) => {
    try {
      setIsPriorityUpdating(id)
      await updateEventPriority(id, !currentStatus)
      setEvents(events.map((event) => (event.id === id ? { ...event, isPriority: !currentStatus } : event)))
    } catch (error) {
      console.error("Failed to update priority status:", error)
    } finally {
      setIsPriorityUpdating(null)
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
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                Events Management
              </h1>
              <p className="text-gray-400 mt-2">Create, manage, and monitor all events</p>
            </div>

            <button
              onClick={() => router.push("/admin/events/new")}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create Event</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Filters and Search */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events or creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent text-white focus:outline-none appearance-none pr-8"
                  >
                    <option value="all">All Statuses</option>
                    <option value="UPCOMING">Upcoming</option>
                    <option value="LIVE">Live</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4" />
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3">
                  <ArrowUpDown className="w-5 h-5 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="bg-transparent text-white focus:outline-none appearance-none pr-8"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="revenue">Sort by Revenue</option>
                    <option value="attendance">Sort by Attendance</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4" />
                </div>
              </div>

              <button
                onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 hover:bg-gray-700 transition-colors"
              >
                {sortDirection === "asc" ? "Ascending" : "Descending"}
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    sortDirection === "desc" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 animate-pulse">
                <div className="h-8 bg-gray-800 rounded w-1/3 mb-4"></div>
                <div className="h-6 bg-gray-800 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-gray-800 rounded w-1/5 mb-4"></div>
                <div className="flex gap-4">
                  <div className="h-10 bg-gray-800 rounded w-24"></div>
                  <div className="h-10 bg-gray-800 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Events Found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Create your first event to get started"}
            </p>
            {searchTerm || statusFilter !== "all" ? (
              <button
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                }}
                className="mt-6 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            ) : (
              <button
                onClick={() => router.push("/admin/events/new")}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Create Event
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className="text-xl font-bold text-white cursor-pointer hover:text-gray-300 transition-colors"
                        onClick={() => router.push(`/admin/events/${event.id}`)}
                      >
                        {event.name}
                      </h3>
                      {event.isPriority && (
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400"  />
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(event.date)}</span>
                      </div>
                      {event.creator && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>By {event.creator.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div
                        className={`flex items-center space-x-2 ${getStatusColor(
                          event.status,
                        )} px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm`}
                      >
                        {event.status === "LIVE" && <CheckCircle className="w-3 h-3" />}
                        {event.status === "CANCELLED" && <XCircle className="w-3 h-3" />}
                        {event.status === "UPCOMING" && <Clock className="w-3 h-3" />}
                        {event.status === "COMPLETED" && <CheckCircle className="w-3 h-3" />}
                        <span>{event.status}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-300">
                        <Ticket className="w-4 h-4" />
                        <span>
                          {event.slots.remainingSlots} / {event.slots.totalSlots} slots available
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="w-4 h-4" />
                        <span>
                          {(
                            event.attendees?.total ||
                            event.slots.totalSlots - event.slots.remainingSlots + (event.attendees?.stream || 0)
                          ).toLocaleString()}{" "}
                          attendees
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-gray-800/50 rounded-lg px-3 py-1">
                        <span className="text-gray-400 text-sm">Revenue:</span>{" "}
                        <span className="text-white font-semibold">₦{event.totals.combined.net.toLocaleString()}</span>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg px-3 py-1">
                        <span className="text-gray-400 text-sm">Physical:</span>{" "}
                        <span className="text-white font-semibold">₦{event.totals.physical.net.toLocaleString()}</span>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg px-3 py-1">
                        <span className="text-gray-400 text-sm">Stream:</span>{" "}
                        <span className="text-white font-semibold">₦{event.totals.stream.net.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => router.push(`/admin/events/${event.id}`)}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>

                    <button
                      onClick={() => router.push(`/admin/events/${event.id}/edit`)}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>

                    <div className="relative">
                      <button
                        onClick={() => setActionEvent(actionEvent === event.id ? null : event.id)}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                        <span>More</span>
                      </button>

                      {actionEvent === event.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                          <button
                            onClick={() => handlePriorityToggle(event.id, event.isPriority)}
                            disabled={isPriorityUpdating === event.id}
                            className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors flex items-center gap-2 rounded-t-lg"
                          >
                            <Star className={`w-4 h-4 ${event.isPriority ? "fill-yellow-400 text-yellow-400" : ""}`} />
                            <span>{event.isPriority ? "Remove Priority" : "Mark as Priority"}</span>
                            {isPriorityUpdating === event.id && (
                              <div className="ml-auto w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                            )}
                          </button>

                          <button
                            onClick={() => router.push(`/admin/events/${event.id}/export`)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Export Data</span>
                          </button>

                          <button
                            onClick={() => handleDelete(event.id)}
                            disabled={isDeleting === event.id}
                            className="w-full text-left px-4 py-2 hover:bg-red-900/30 text-red-400 transition-colors flex items-center gap-2 rounded-b-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete Event</span>
                            {isDeleting === event.id && (
                              <div className="ml-auto w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination (if needed) */}
        {filteredEvents.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                Previous
              </button>
              <div className="flex items-center gap-1">
                <button className="bg-red-600 text-white w-8 h-8 rounded-lg">1</button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white w-8 h-8 rounded-lg transition-colors">
                  2
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white w-8 h-8 rounded-lg transition-colors">
                  3
                </button>
              </div>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
