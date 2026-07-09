"use client"

import { useEffect, useMemo, useState } from "react"
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
import { toast } from "sonner"
import EmailModal from "@/components/common_component/EmailModal"

interface CreatorProfile {
  id: string
  email: string
  fullName?: string | null
  avatarUrl?: string | null
}

interface CreatorItem {
  id: string
  profileId: string
  status: string
  videoPayoutPercent: number
  eventStreamPayout: number
  eventVenuePayout: number
  followersCount: number
  followingCount: number
  profile: CreatorProfile
  totalRevenue: number
  platformRevenue: number
  createdAt: string
  updatedAt: string
  name: string
  email: string
  phone?: string
  agreementStatus: string
  joinDate?: string
  lastActive?: string
  avatar?: string
  category?: string
  verificationLevel?: string
  videos?: number
  events?: number
}

interface CreatorStats {
  totalCreators: number
  activeCreators: number
  platformRevenue: number
  creatorRevenue: number
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value || 0)

const emailTemplates = [
  {
    label: "Suspension Notice",
    subject: "Your Xonnect creator account has been suspended",
    body:
      "Hello,\n\nYour creator account has been suspended due to a policy violation. Please contact support if you believe this is a mistake.\n\nBest regards,\nXonnect Team",
  },
  {
    label: "Platform Update",
    subject: "Update from Xonnect for creators",
    body:
      "Hello,\n\nWe are updating our platform policies and payout information. Please log in to your creator dashboard for more details.\n\nBest regards,\nXonnect Team",
  },
]

const CreatorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [creators, setCreators] = useState<CreatorItem[]>([])
  const [stats, setStats] = useState<CreatorStats>({
    totalCreators: 0,
    activeCreators: 0,
    platformRevenue: 0,
    creatorRevenue: 0,
  })
  const [selectedCreator, setSelectedCreator] = useState<CreatorItem | null>(null)
  const [selectedCreatorDetails, setSelectedCreatorDetails] = useState({
    videoPayoutPercent: 70,
    eventStreamPayout: 70,
    eventVenuePayout: 70,
  })
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [isBulkEmail, setIsBulkEmail] = useState(false)
  const [emailContent, setEmailContent] = useState({
    subject: "Creator account update from Xonnect",
    body: "Hello creators,\n\nThis is a message from the Xonnect platform.\n\nBest regards,\nXonnect Team",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchCreators()
  }, [])

  const fetchCreators = async () => {
    setIsLoading(true)

    try {
      const res = await fetch("/api/superadmin/creators")
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch creators")
      }

      setCreators(
        data.creators.map((creator: CreatorItem) => ({
          ...creator,
          name: creator.profile.fullName || creator.profile.email,
          email: creator.profile.email,
          avatar: creator.profile.avatarUrl || "/placeholder.svg",
          agreementStatus: creator.status === "pending" ? "pending" : "signed",
          joinDate: new Date(creator.createdAt).toLocaleDateString(),
          lastActive: creator.updatedAt ? new Date(creator.updatedAt).toLocaleDateString() : "N/A",
          category: "Creator",
          videos: 0,
          events: 0,
        }))
      )
      setStats(data.stats)
    } catch (error) {
      console.error(error)
      toast.error("Unable to load creators")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredCreators = useMemo(
    () =>
      creators.filter((creator) => {
        const matchesSearch =
          creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creator.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filterStatus === "all" || creator.status === filterStatus
        return matchesSearch && matchesFilter
      }),
    [creators, filterStatus, searchTerm]
  )

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

  const handleApproveCreator = async (creatorId: string) => {
    setIsSaving(true)

    try {
      const res = await fetch(`/api/superadmin/creators/${creatorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "active" }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data?.message || "Failed to approve creator")

      toast.success("Creator approved")
      await fetchCreators()
    } catch (error) {
      console.error(error)
      toast.error("Unable to approve creator")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSuspendCreator = async (creatorId: string) => {
    setIsSaving(true)

    try {
      const res = await fetch(`/api/superadmin/creators/${creatorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "suspended" }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data?.message || "Failed to suspend creator")

      const emailRes = await fetch("/api/superadmin/creators/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorId,
          subject: "Your Xonnect creator account has been suspended",
          message:
            "Hello,\n\nYour Xonnect creator account has been suspended. If you believe this is a mistake, please contact support.\n\nBest regards,\nXonnect Team",
        }),
      })
      const emailData = await emailRes.json()
      if (!emailRes.ok) {
        console.error(emailData)
        toast.error("Creator suspended, but email notification failed")
      } else {
        toast.success("Creator suspended and notified by email")
      }

      await fetchCreators()
      setSelectedCreator(null)
    } catch (error) {
      console.error(error)
      toast.error("Unable to suspend creator")
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdateCreatorPayouts = async () => {
    if (!selectedCreator) return
    setIsSaving(true)

    try {
      const res = await fetch(`/api/superadmin/creators/${selectedCreator.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoPayoutPercent: selectedCreatorDetails.videoPayoutPercent,
          eventStreamPayout: selectedCreatorDetails.eventStreamPayout,
          eventVenuePayout: selectedCreatorDetails.eventVenuePayout,
        }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data?.message || "Failed to update payouts")

      toast.success("Creator payout settings updated")
      await fetchCreators()
      setSelectedCreator(null)
    } catch (error) {
      console.error(error)
      toast.error("Unable to update payout settings")
    } finally {
      setIsSaving(false)
    }
  }

  const openEmailModal = (bulk: boolean, creator?: CreatorItem) => {
    setIsBulkEmail(bulk)
    setShowEmailModal(true)

    if (bulk) {
      setSelectedCreator(null)
      setEmailContent({
        subject: "Important update for Xonnect creators",
        body: "Hello creators,\n\nThis is an important platform update from Xonnect.\n\nBest regards,\nXonnect Team",
      })
    } else if (creator) {
      setSelectedCreator(creator)
      setEmailContent({
        subject: `Message for ${creator.profile.fullName || creator.email}`,
        body: `Hello ${creator.profile.fullName || "Creator"},\n\n`,
      })
    }
  }

  const handleSendEmail = async () => {
    if (!emailContent.subject.trim() || !emailContent.body.trim()) {
      toast.error("Please fill in email subject and body")
      return
    }

    setIsSaving(true)

    try {
      const res = await fetch("/api/superadmin/creators/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sendToAll: isBulkEmail,
          creatorId: isBulkEmail ? undefined : selectedCreator?.id,
          subject: emailContent.subject,
          message: emailContent.body,
        }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data?.message || "Failed to send email")

      toast.success(data.message || "Email sent successfully")
      setShowEmailModal(false)
    } catch (error) {
      console.error(error)
      toast.error("Unable to send email")
    } finally {
      setIsSaving(false)
    }
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
                <Button
                  variant="outline"
                  className="border-border bg-transparent"
                  onClick={() => openEmailModal(true)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Bulk Email
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
                      <p className="text-2xl font-bold">{stats.totalCreators.toLocaleString()}</p>
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
                      <p className="text-2xl font-bold">{stats.activeCreators.toLocaleString()}</p>
                    </div>
                    <UserCheck className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Platform Revenue</p>
                      <p className="text-2xl font-bold">{formatCurrency(stats.platformRevenue)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Creator Total Revenue</p>
                      <p className="text-2xl font-bold">{formatCurrency(stats.creatorRevenue)}</p>
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
                          <p className="font-semibold text-green-400">{formatCurrency(creator.totalRevenue)}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold">{creator.followersCount.toLocaleString()}</p>
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
                              onClick={() => {
                                setSelectedCreator(creator)
                                setSelectedCreatorDetails({
                                  videoPayoutPercent: creator.videoPayoutPercent,
                                  eventStreamPayout: creator.eventStreamPayout,
                                  eventVenuePayout: creator.eventVenuePayout,
                                })
                              }}
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

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="font-bold text-green-400">{formatCurrency(selectedCreator.totalRevenue)}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <TrendingUp className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Platform Revenue</p>
                  <p className="font-bold text-yellow-400">{formatCurrency(selectedCreator.platformRevenue)}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <DollarSign className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Creator Payout</p>
                  <p className="font-bold text-cyan-400">
                    {formatCurrency(Math.max(selectedCreator.totalRevenue - selectedCreator.platformRevenue, 0))}
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Followers</p>
                  <p className="font-bold">{selectedCreator.followersCount.toLocaleString()}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <Video className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Videos</p>
                  <p className="font-bold">{selectedCreator.videos}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Video Payout</p>
                  <p className="font-bold">{selectedCreatorDetails.videoPayoutPercent}%</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <Video className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Event Stream Payout</p>
                  <p className="font-bold">{selectedCreatorDetails.eventStreamPayout}%</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <TrendingUp className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Event Venue Payout</p>
                  <p className="font-bold">{selectedCreatorDetails.eventVenuePayout}%</p>
                </div>
              </div>

              <div className="border-t border-border pt-6 mb-6">
                <h4 className="text-lg font-semibold mb-4">Payout Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Video Payout %</p>
                    <Input
                      type="number"
                      value={selectedCreatorDetails.videoPayoutPercent}
                      onChange={(e) =>
                        setSelectedCreatorDetails((prev) => ({
                          ...prev,
                          videoPayoutPercent: Number(e.target.value),
                        }))
                      }
                      min={0}
                      max={100}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Event Stream Payout %</p>
                    <Input
                      type="number"
                      value={selectedCreatorDetails.eventStreamPayout}
                      onChange={(e) =>
                        setSelectedCreatorDetails((prev) => ({
                          ...prev,
                          eventStreamPayout: Number(e.target.value),
                        }))
                      }
                      min={0}
                      max={100}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Event Venue Payout %</p>
                    <Input
                      type="number"
                      value={selectedCreatorDetails.eventVenuePayout}
                      onChange={(e) =>
                        setSelectedCreatorDetails((prev) => ({
                          ...prev,
                          eventVenuePayout: Number(e.target.value),
                        }))
                      }
                      min={0}
                      max={100}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4">
                <Button variant="outline" className="border-border bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleUpdateCreatorPayouts}
                  disabled={isSaving}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Save Payouts
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

