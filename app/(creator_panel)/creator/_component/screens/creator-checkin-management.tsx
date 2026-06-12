"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Copy,
  CheckSquare,
  Menu,
  X,
  Bell,
  Zap,
  Edit,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { sidebarItems } from "@/lib/constant"
import { usePathname, useRouter } from "next/navigation"

interface CheckInUser {
  id: string
  name: string
  event: string
  gate: string
  email: string
  status: "Active" | "Inactive"
  lastLogin: string
  scansToday: number
  username: string
  tempPassword?: string
}

export default function CreatorCheckinManagement() {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const [users, setUsers] = useState<CheckInUser[]>([
    {
      id: "1",
      name: "John Staff",
      event: "Music Production Masterclass",
      gate: "Main Gate",
      email: "john@example.com",
      status: "Active",
      lastLogin: "2024-04-21 10:30 AM",
      scansToday: 45,
      username: "john_masterclass",
    },
    {
      id: "2",
      name: "Sarah Entry",
      event: "Live Concert Performance",
      gate: "VIP Section",
      email: "sarah@example.com",
      status: "Inactive",
      lastLogin: "2024-04-20 02:15 PM",
      scansToday: 0,
      username: "sarah_concert",
    },
  ])

  const [newUser, setNewUser] = useState({
    name: "",
    event: "",
    gate: "",
    email: "",
  })

  const [generatedCreds, setGeneratedCreds] = useState({
    username: "",
    password: "",
  })

  const [editingUser, setEditingUser] = useState<CheckInUser | null>(null)

  const events = [
    "Music Production Masterclass",
    "Live Concert Performance",
    "Q&A with Fans",
  ]

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    const username = newUser.name.toLowerCase().replace(/\s+/g, "_") + "_" + Math.floor(Math.random() * 1000)
    const password = Math.random().toString(36).slice(-8)

    const user: CheckInUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...newUser,
      status: "Active",
      lastLogin: "Never",
      scansToday: 0,
      username,
      tempPassword: password,
    }

    setUsers([...users, user])
    setGeneratedCreds({ username, password })
    setIsModalOpen(false)
    setIsSuccessModalOpen(true)
    setNewUser({ name: "", event: "", gate: "", email: "" })
  }

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return

    setUsers(users.map(u => u.id === editingUser.id ? { ...editingUser } : u))
    setEditingUser(null)
    setIsModalOpen(false)
  }

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
      }
      return u
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast here
  }

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.event.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Sidebar Overlay (Consistent with Dashboard) */}
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

      {/* Main Content */}
      <div className="w-full">
        {/* Header */}
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
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border border-muted p-2.5 rounded-lg pl-10 pr-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
              <button className="relative border border-muted rounded-lg p-2.5 hover:bg-muted transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
              </button>
              <ThemeToggle />
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-foreground font-bold text-sm">J</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-muted-foreground">Manage your event check-in staff and gates.</p>
            </div>
            <button
              onClick={() => {
                setEditingUser(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-all font-medium"
            >
              <Plus className="w-5 h-5" />
              Create Check-In User
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="p-4 font-semibold text-muted-foreground">Name</th>
                    <th className="p-4 font-semibold text-muted-foreground">Assigned Event</th>
                    <th className="p-4 font-semibold text-muted-foreground">Gate</th>
                    <th className="p-4 font-semibold text-muted-foreground">Status</th>
                    <th className="p-4 font-semibold text-muted-foreground">Last Login</th>
                    <th className="p-4 font-semibold text-muted-foreground text-center">Scans Today</th>
                    <th className="p-4 font-semibold text-muted-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-foreground">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </td>
                        <td className="p-4 text-sm text-foreground">{user.event}</td>
                        <td className="p-4 text-sm text-foreground">{user.gate}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === "Active" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{user.lastLogin}</td>
                        <td className="p-4 text-center font-bold text-foreground">{user.scansToday}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => {
                                setEditingUser(user);
                                setIsModalOpen(true);
                              }}
                              className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              className={`p-2 hover:bg-muted rounded-lg transition-colors ${
                                user.status === "Active" ? "text-red-400 hover:text-red-300" : "text-green-400 hover:text-green-300"
                              }`}
                              title={user.status === "Active" ? "Deactivate" : "Activate"}
                            >
                              {user.status === "Active" ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-12 text-center">
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

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingUser ? "Edit Check-In User" : "Create Check-In User"}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border border-border p-2.5 rounded-xl focus:ring-2 focus:ring-red-600 outline-none"
                  value={editingUser ? editingUser.name : newUser.name}
                  onChange={(e) => editingUser ? setEditingUser({...editingUser, name: e.target.value}) : setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-transparent border border-border p-2.5 rounded-xl focus:ring-2 focus:ring-red-600 outline-none"
                  value={editingUser ? editingUser.email : newUser.email}
                  onChange={(e) => editingUser ? setEditingUser({...editingUser, email: e.target.value}) : setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Assign to Event</label>
                <select
                  required
                  className="w-full bg-background border border-border p-2.5 rounded-xl focus:ring-2 focus:ring-red-600 outline-none"
                  value={editingUser ? editingUser.event : newUser.event}
                  onChange={(e) => editingUser ? setEditingUser({...editingUser, event: e.target.value}) : setNewUser({...newUser, event: e.target.value})}
                >
                  <option value="">Select an event</option>
                  {events.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Assign to Gate</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gate A, VIP Entrance"
                  className="w-full bg-transparent border border-border p-2.5 rounded-xl focus:ring-2 focus:ring-red-600 outline-none"
                  value={editingUser ? editingUser.gate : newUser.gate}
                  onChange={(e) => editingUser ? setEditingUser({...editingUser, gate: e.target.value}) : setNewUser({...newUser, gate: e.target.value})}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-colors mt-4"
              >
                {editingUser ? "Update User" : "Generate Staff Account"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal - Credentials Display */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsSuccessModalOpen(false)} />
          <div className="relative bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Staff Account Created!</h2>
            <p className="text-muted-foreground mb-6">Share these temporary credentials with your staff member.</p>
            
            <div className="space-y-4 text-left">
              <div className="bg-muted p-4 rounded-xl relative group">
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

            <p className="text-sm text-yellow-500 mt-6 font-medium">
              Note: Credentials are only shown once. Please copy them now.
            </p>

            <button
              onClick={() => setIsSuccessModalOpen(false)}
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
