"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Plus, Search, Eye, Edit, BarChart3, Video, Settings, Ticket, Menu, X, Bell, Zap, Play } from "lucide-react"
import { DollarSign, Users } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { sidebarItems } from "@/lib/constant"

export default function CreatorTicketsManagement() {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")


  const tickets = [
    {
      id: 1,
      streamTitle: "Music Production Masterclass",
      ticketType: "VIP Pass",
      access: "Venue",
      price: 5000,
      benefit: "Front row seat + exclusive merchandise",
      totalSold: 45,
      totalRevenue: 225000,
      availableSlots: 55,
    },
    {
      id: 2,
      streamTitle: "Q&A Session with Fans",
      ticketType: "Standard",
      access: "Stream",
      price: 2000,
      benefit: "Access to stream",
      totalSold: 120,
      totalRevenue: 240000,
      availableSlots: 80,
    },
  ]

  const filteredTickets = tickets.filter((ticket) =>
    ticket.streamTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
                  onClick={() => {
                    router.push(item.route)
                    setSidebarOpen(false)
                  }}
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
        <div className="border-b border-border bg-transparent backdrop-blur-sm sticky top-0 z-10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Tickets Management
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
                onClick={() => router.push("/creator/tickets/create")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Ticket</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full bg-transparent  border border-border rounded-xl pl-10 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              />
          </div>

          {/* Tickets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{ticket.streamTitle}</h3>
                    <p className="text-red-400 text-sm font-medium">{ticket.ticketType}</p>
                  </div>
                  <Ticket className="w-5 h-5 text-red-500" />
                </div>

                <div className="space-y-3 mb-4">
                  <p className="text-muted-foreground text-sm">{ticket.benefit}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="text-yellow-500 font-bold">₦{ticket.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Access:</span>
                    <span className="text-red-500 font-bold">{ticket.access}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Sold:</span>
                    <span className="text-foreground font-bold">{ticket.totalSold}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="text-green-400 font-bold">₦{ticket.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Available:</span>
                    <span className="text-blue-400 font-bold">{ticket.availableSlots}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/creator/tickets/${ticket.id}/edit`)}
                    className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => router.push(`/creator/tickets/${ticket.id}/sales`)}
                    className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Sales
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredTickets.length === 0 && (
            <div className="text-center py-16">
              <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No tickets found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? "Try adjusting your search terms" : "Create your first ticket to start selling"}
              </p>
              <button
                onClick={() => router.push("/creator/tickets/create")}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Create Your First Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}








