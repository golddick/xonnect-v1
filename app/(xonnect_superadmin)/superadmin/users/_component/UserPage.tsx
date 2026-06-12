"use client"

import { useState } from "react"
import { Search, Filter, Download, Eye, MoreVertical, Ban, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "2 hours ago",
      purchases: 12,
      totalSpent: "$234.50",
      savedEvents: 5,
      followers: 45,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "30 minutes ago",
      purchases: 8,
      totalSpent: "$156.75",
      savedEvents: 3,
      followers: 32,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      status: "inactive",
      joinDate: "2023-12-20",
      lastActive: "2 weeks ago",
      purchases: 3,
      totalSpent: "$45.00",
      savedEvents: 1,
      followers: 8,
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      status: "suspended",
      joinDate: "2024-01-05",
      lastActive: "Never",
      purchases: 0,
      totalSpent: "$0.00",
      savedEvents: 0,
      followers: 0,
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "inactive":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "suspended":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-muted-foreground border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "inactive":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "suspended":
        return <Ban className="w-4 h-4 text-red-400" />
      default:
        return <Eye className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">

        <div className="flex-1 w-full">

          <div className="border-b border-border bg-transparent backdrop-blur-sm sticky p-4 top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Users Management</h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-muted border-border text-foreground w-64"
                  />
                </div>
                <Button variant="outline" size="sm" className="border-border bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="border-border bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex gap-4 mb-6">
              {["all", "active", "inactive", "suspended"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === status ? "bg-red-600 text-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left p-4 font-semibold">Name</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                        <th className="text-left p-4 font-semibold">Purchases</th>
                        <th className="text-left p-4 font-semibold">Total Spent</th>
                        <th className="text-left p-4 font-semibold">Saved Events</th>
                        <th className="text-left p-4 font-semibold">Followers</th>
                        <th className="text-left p-4 font-semibold">Last Active</th>
                        <th className="text-center p-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-muted-foreground text-sm">{user.email}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(user.status)}
                              <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                            </div>
                          </td>
                          <td className="p-4">{user.purchases}</td>
                          <td className="p-4 text-green-400">{user.totalSpent}</td>
                          <td className="p-4">{user.savedEvents}</td>
                          <td className="p-4">{user.followers}</td>
                          <td className="p-4 text-muted-foreground text-sm">{user.lastActive}</td>
                          <td className="p-4 text-center">
                            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersPage

