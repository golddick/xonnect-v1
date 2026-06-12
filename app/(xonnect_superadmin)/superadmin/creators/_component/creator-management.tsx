"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  UserCheck,
  UserX,
  Eye,
  Mail,
  DollarSign,
  TrendingUp,
  Users,
  Video,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import SuperAdminSidebar from "../../_component/superadmin-sidebar"
import { toast } from "sonner"

const CreatorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedCreator, setSelectedCreator] = useState<any>(null)

  const creators = [
    {
      id: 1,
      name: "Alex Rodriguez",
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      agreementStatus: "signed",
      joinDate: "2024-01-15",
      totalRevenue: "$45,230",
      followers: 12500,
      videos: 89,
      events: 23,
      lastActive: "2 hours ago",
      avatar: "/creator-profile-photo.png",
      category: "Gaming",
      verificationLevel: "verified",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 (555) 234-5678",
      status: "active",
      agreementStatus: "signed",
      joinDate: "2024-01-20",
      totalRevenue: "$38,920",
      followers: 9800,
      videos: 67,
      events: 18,
      lastActive: "1 day ago",
      avatar: "/music-producer-avatar.png",
      category: "Music",
      verificationLevel: "verified",
    },
    {
      id: 3,
      name: "Marcus Chen",
      email: "marcus@example.com",
      phone: "+1 (555) 345-6789",
      status: "pending",
      agreementStatus: "pending",
      joinDate: "2024-02-01",
      totalRevenue: "$0",
      followers: 0,
      videos: 0,
      events: 0,
      lastActive: "5 minutes ago",
      avatar: "/user-avatar-1.png",
      category: "Tech",
      verificationLevel: "unverified",
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      email: "elena@example.com",
      phone: "+1 (555) 456-7890",
      status: "suspended",
      agreementStatus: "signed",
      joinDate: "2023-12-10",
      totalRevenue: "$12,450",
      followers: 3200,
      videos: 34,
      events: 8,
      lastActive: "1 week ago",
      avatar: "/ai-avatar.png",
      category: "Art",
      verificationLevel: "verified",
    },
  ]

  const filteredCreators = creators.filter((creator) => {
    const matchesSearch =
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || creator.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "suspended":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-muted-foreground border-gray-500/30"
    }
  }

  const getAgreementStatusIcon = (status: string) => {
    switch (status) {
      case "signed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />
    }
  }

  const handleApproveCreator = (creatorId: number) => {
    console.log("Approving creator:", creatorId)
    // Handle approval logic
  }

  const handleSuspendCreator = (creatorId: number) => {
    console.log("Suspending creator:", creatorId)
    // Handle suspension logic
  }


  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <div className="flex-1 w-full">
          {/* Header */}
          <div className="border-b border-border bg-transparent backdrop-blur-sm sticky p-4 top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Creator Management</h1>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="outline" className="border-border bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Bulk Email
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Approve Pending
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-8 border-none">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Creators</p>
                      <p className="text-2xl font-bold">12,847</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Active Creators</p>
                      <p className="text-2xl font-bold">11,203</p>
                    </div>
                    <UserCheck className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Pending Approval</p>
                      <p className="text-2xl font-bold">234</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Revenue</p>
                      <p className="text-2xl font-bold">$2.8M</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="p-8 border-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search creators..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-muted border-border text-foreground w-64"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-muted border border-border text-foreground px-4 py-2 rounded-lg"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <Button variant="outline" size="sm" className="border-border bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Creators Table */}
          <div className="p-8">
            <div className="bg-card border border-border  p-6 hover:bg-card/70 transition-all duration-300 text-foreground rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-transparent border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-semibold">Creator</th>
                      <th className="text-left p-4 font-semibold">Status</th>
                      <th className="text-left p-4 font-semibold">Agreement</th>
                      <th className="text-left p-4 font-semibold">Revenue</th>
                      <th className="text-left p-4 font-semibold">Followers</th>
                      <th className="text-left p-4 font-semibold">Content</th>
                      <th className="text-left p-4 font-semibold">Last Active</th>
                      <th className="text-left p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCreators.map((creator, index) => (
                      <motion.tr
                        key={creator.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={creator.avatar || "/placeholder.svg"}
                              alt={creator.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-semibold">{creator.name}</p>
                              <p className="text-sm text-muted-foreground">{creator.email}</p>
                              <p className="text-xs text-gray-500">{creator.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(creator.status)}>{creator.status}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {getAgreementStatusIcon(creator.agreementStatus)}
                            <span className="text-sm capitalize">{creator.agreementStatus}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold text-green-400">{creator.totalRevenue}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold">{creator.followers.toLocaleString()}</p>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <p>{creator.videos} videos</p>
                            <p className="text-muted-foreground">{creator.events} events</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-muted-foreground">{creator.lastActive}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-border bg-transparent"
                              onClick={() => setSelectedCreator(creator)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {creator.status === "pending" && (
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApproveCreator(creator.id)}
                              >
                                <UserCheck className="w-4 h-4" />
                              </Button>
                            )}
                            {creator.status === "active" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-600 text-red-400 hover:bg-red-600/10 bg-transparent"
                                onClick={() => handleSuspendCreator(creator.id)}
                              >
                                <UserX className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredCreators.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No creators found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filters"
                    : "No creators match your criteria"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Creator Detail Modal */}
      {selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border  p-6 hover:bg-card/70 transition-all duration-300 text-foreground overflow-hidden rounded-2xl w-full max-w-2xl max-h-[90vh] hidden-scrollbar overflow-y-auto m-4">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Creator Details</h3>
                <button
                  onClick={() => setSelectedCreator(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start space-x-6 mb-6">
                <img
                  src={selectedCreator.avatar || "/placeholder.svg"}
                  alt={selectedCreator.name}
                  className="w-20 h-20 rounded-full"
                />
                <div className="flex-1">
                  <h4 className="text-2xl font-bold mb-2">{selectedCreator.name}</h4>
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className={getStatusColor(selectedCreator.status)}>{selectedCreator.status}</Badge>
                    <span className="text-muted-foreground">{selectedCreator.category}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p>{selectedCreator.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p>{selectedCreator.phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Join Date</p>
                      <p>{selectedCreator.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Active</p>
                      <p>{selectedCreator.lastActive}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="font-bold text-green-400">{selectedCreator.totalRevenue}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Followers</p>
                  <p className="font-bold">{selectedCreator.followers.toLocaleString()}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <Video className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Videos</p>
                  <p className="font-bold">{selectedCreator.videos}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <TrendingUp className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Events</p>
                  <p className="font-bold">{selectedCreator.events}</p>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4">
                <Button variant="outline" className="border-border bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                {selectedCreator.status === "pending" && (
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleApproveCreator(selectedCreator.id)}
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Approve Creator
                  </Button>
                )}
                {selectedCreator.status === "active" && (
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600/10 bg-transparent"
                    onClick={() => handleSuspendCreator(selectedCreator.id)}
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    Suspend Creator
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreatorManagement

