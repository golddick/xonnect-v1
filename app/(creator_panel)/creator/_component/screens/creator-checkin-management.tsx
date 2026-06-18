"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Bell,
  CheckCircle2,
  CheckSquare,
  Copy,
  Menu,
  Plus,
  Search,
  Trash2,
  X,
  XCircle,
  Zap,
} from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { sidebarItems } from "@/lib/constant"

type EventOption = {
  id: string
  title: string
  status: string
}

type CheckInUser = {
  id: string
  fullName: string
  email: string
  gateName: string
  status: string
  scansToday: number
  totalScans: number
  username: string
}

export default function CreatorCheckinManagement() {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [events, setEvents] = useState<EventOption[]>([])
  const [selectedEventId, setSelectedEventId] = useState("")
  const [users, setUsers] = useState<CheckInUser[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [generatedCreds, setGeneratedCreds] = useState({ username: "", password: "" })
  const [newUser, setNewUser] = useState({ name: "", email: "", gate: "" })
  const [error, setError] = useState("")

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/creator/events", { cache: "no-store" })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message ?? "Failed to load events")
        }

        const mappedEvents: EventOption[] = (data.events ?? []).map((event: { id: string; title: string; status: string }) => ({
          id: event.id,
          title: event.title,
          status: event.status,
        }))

        setEvents(mappedEvents)

        if (mappedEvents.length > 0) {
          setSelectedEventId(mappedEvents[0].id)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load events")
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  useEffect(() => {
    const loadUsers = async () => {
      if (!selectedEventId) {
        setUsers([])
        return
      }

      try {
        const response = await fetch(`/api/creator/events/${selectedEventId}/checkin-users`, {
          cache: "no-store",
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message ?? "Failed to load check-in users")
        }

        setUsers((data.users ?? []).map((user: {
          id: string
          fullName: string
          email: string
          gateName: string
          status: string
          scansToday: number
          totalScans: number
          username: string
        }) => ({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          gateName: user.gateName,
          status: user.status,
          scansToday: user.scansToday ?? 0,
          totalScans: user.totalScans ?? 0,
          username: user.username,
        })))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load check-in users")
      }
    }

    loadUsers()
  }, [selectedEventId])

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.gateName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, users])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEventId) return

    try {
      setSubmitting(true)
      setError("")
      const response = await fetch(`/api/creator/events/${selectedEventId}/checkin-users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          gate: newUser.gate,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message ?? "Failed to create check-in user")
      }

      setUsers((prev) => [
        ...prev,
        {
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          gateName: data.user.gateName,
          status: data.user.status,
          scansToday: data.user.scansToday ?? 0,
          totalScans: data.user.totalScans ?? 0,
          username: data.user.username,
        },
      ])
      setGeneratedCreds(data.credentials)
      setIsModalOpen(false)
      setNewUser({ name: "", email: "", gate: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create check-in user")
    } finally {
      setSubmitting(false)
    }
  }

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status.toLowerCase() === "active" ? "INACTIVE" : "ACTIVE" }
          : user
      )
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-xl font-bold">Xonnect</span>
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

      <div className="w-full">
        <div className="border-b border-border bg-transparent backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden bg-red-600 text-white hover:bg-muted rounded-lg p-2 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Check-In Management</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative border border-muted rounded-lg p-2.5 hover:bg-muted transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full" />
              </button>
              <ThemeToggle />
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-foreground font-bold text-sm">J</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground mb-2">Manage your event check-in staff and gates.</p>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full lg:max-w-md bg-transparent border border-border rounded-xl px-4 py-3"
              >
                <option value="">Select an event</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title} ({event.status})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              disabled={!selectedEventId}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-4 py-2 rounded-xl transition-all font-medium"
            >
              <Plus className="w-5 h-5" />
              Create Check-In User
            </button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border border-muted p-2.5 rounded-lg pl-10 pr-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>

          {error && <p className="text-red-400">{error}</p>}

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="p-4 font-semibold text-muted-foreground">Name</th>
                    <th className="p-4 font-semibold text-muted-foreground">Gate</th>
                    <th className="p-4 font-semibold text-muted-foreground">Status</th>
                    <th className="p-4 font-semibold text-muted-foreground">Scans Today</th>
                    <th className="p-4 font-semibold text-muted-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-foreground">{user.fullName}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                          <div className="text-xs text-muted-foreground">{user.username}</div>
                        </td>
                        <td className="p-4 text-sm text-foreground">{user.gateName}</td>
                        <td className="p-4 text-sm text-foreground">{user.status}</td>
                        <td className="p-4 text-center font-bold text-foreground">{user.scansToday}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                              title="Toggle status"
                            >
                              {user.status.toLowerCase() === "active" ? (
                                <XCircle className="w-4 h-4" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                            <CheckSquare className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <div className="text-lg font-medium text-foreground">No check-in users found</div>
                          <p className="text-muted-foreground">Create your first staff account to start managing event entry.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-bold">Create Check-In User</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border border-border p-2.5 rounded-xl focus:ring-2 focus:ring-red-600 outline-none"
                  value={newUser.name}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-transparent border border-border p-2.5 rounded-xl focus:ring-2 focus:ring-red-600 outline-none"
                  value={newUser.email}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Assign to Gate</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gate A, VIP Entrance"
                  className="w-full bg-transparent border border-border p-2.5 rounded-xl focus:ring-2 focus:ring-red-600 outline-none"
                  value={newUser.gate}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, gate: e.target.value }))}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-3 rounded-xl font-bold transition-colors mt-4"
              >
                {submitting ? "Creating..." : "Generate Staff Account"}
              </button>
            </form>
          </div>
        </div>
      )}

      {generatedCreds.username && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setGeneratedCreds({ username: "", password: "" })} />
          <div className="relative bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Staff Account Created</h2>
            <p className="text-muted-foreground mb-6">Share these temporary credentials with your staff member.</p>

            <div className="space-y-4 text-left">
              <div className="bg-muted p-4 rounded-xl relative">
                <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Username</p>
                <p className="font-mono text-lg">{generatedCreds.username}</p>
                <button
                  onClick={() => copyToClipboard(generatedCreds.username)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-background rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-muted p-4 rounded-xl relative">
                <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Temporary Password</p>
                <p className="font-mono text-lg">{generatedCreds.password}</p>
                <button
                  onClick={() => copyToClipboard(generatedCreds.password)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-background rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setGeneratedCreds({ username: "", password: "" })}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-colors mt-8"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
