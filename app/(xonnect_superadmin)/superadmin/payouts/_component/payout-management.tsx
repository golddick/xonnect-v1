"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  Download,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  CreditCard,
  Banknote,
  PieChart,
  X,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import PayoutModal from "./payout-model"

const PayoutManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedPayout, setSelectedPayout] = useState<any>(null)


  const payouts = [
    {
      id: 1,
      creatorName: "Alex Rodriguez",
      creatorEmail: "alex@example.com",
      creatorAvatar: "/creator-profile-photo.png",
      amount: 2450.0,
      platformFee: 245.0,
      creatorEarnings: 2205.0,
      status: "pending",
       bankDetails: {
      bankName: 'UBA (United Bank for Africa)',
      accountNumber: '1234567890',
      accountName: 'John Doe',
      accountType: 'Savings',
      isVerified: true
    },
      requestDate: "2024-02-15",
      processedDate: null,
      paymentMethod: "Bank Transfer",
      contentType: "Premium Videos",
      contentCount: 12,
      subscribers: 450,
      totalViews: 15600,
    },
    {
      id: 2,
      creatorName: "Sarah Johnson",
      creatorEmail: "sarah@example.com",
      creatorAvatar: "/music-producer-avatar.png",
      amount: 1890.0,
      platformFee: 189.0,
      creatorEarnings: 1701.0,
      status: "completed",
       bankDetails: {
      bankName: 'GTB (Guaranty Trust Bank)',
      accountNumber: '1234567890',
      accountName: 'John Doe',
      accountType: 'Savings',
      isVerified: true
    },
      requestDate: "2024-02-10",
      processedDate: "2024-02-12",
      paymentMethod: "Bank Transfer",
      contentType: "Live Stream Tips",
      contentCount: 8,
      subscribers: 320,
      totalViews: 12400,
    },
    {
      id: 3,
      creatorName: "Marcus Chen",
      creatorEmail: "marcus@example.com",
      creatorAvatar: "/user-avatar-1.png",
      amount: 3200.0,
      platformFee: 320.0,
      creatorEarnings: 2880.0,
      status: "processing",
      requestDate: "2024-02-14",
      processedDate: null,
      paymentMethod: "Bank Transfer",
      contentType: "Subscription Revenue",
      contentCount: 25,
      subscribers: 680,
      totalViews: 28900,
    },
    {
      id: 4,
      creatorName: "Elena Rodriguez",
      creatorEmail: "elena@example.com",
      creatorAvatar: "/ai-avatar.png",
      amount: 890.0,
      platformFee: 89.0,
      creatorEarnings: 801.0,
      status: "failed",
      requestDate: "2024-02-08",
      processedDate: null,
      paymentMethod: "Bank Transfer",
      contentType: "Premium Content",
      contentCount: 6,
      subscribers: 180,
      totalViews: 5600,
    },
  ]

  const filteredPayouts = payouts.filter((payout) => {
    const matchesSearch =
      payout.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.creatorEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || payout.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-muted-foreground border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "processing":
        return <TrendingUp className="w-4 h-4 text-blue-400" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const totalStats = {
    totalPayouts: payouts.reduce((sum, payout) => sum + payout.amount, 0),
    platformRevenue: payouts.reduce((sum, payout) => sum + payout.platformFee, 0),
    creatorEarnings: payouts.reduce((sum, payout) => sum + payout.creatorEarnings, 0),
    pendingPayouts: payouts.filter((p) => p.status === "pending").length,
  }

  const handleApprovePayout = (payoutId: number) => {
    console.log("Approving payout:", payoutId)
    // Handle approval logic
  }

  const handleRejectPayout = (payoutId: number) => {
    console.log("Rejecting payout:", payoutId)
    // Handle rejection logic
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">

        <div className="flex-1 w-full">
          {/* Header */}
          <div className="border-b border-border bg-transparent backdrop-blur-sm sticky p-4 top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Payout Management</h1>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="outline" className="border-border bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-8 border-b border-border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Payouts</p>
                      <p className="text-2xl font-bold">${totalStats.totalPayouts.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Platform Revenue</p>
                      <p className="text-2xl font-bold">${totalStats.platformRevenue.toLocaleString()}</p>
                    </div>
                    <PieChart className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Creator Earnings</p>
                      <p className="text-2xl font-bold">${totalStats.creatorEarnings.toLocaleString()}</p>
                    </div>
                    <Banknote className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Pending Requests</p>
                      <p className="text-2xl font-bold">{totalStats.pendingPayouts}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-500" />
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
                    placeholder="Search payouts..."
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
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <Button variant="outline" size="sm" className="border-border bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Payouts Table */}
          <div className="p-8">
            <div className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-transparent border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-semibold">Creator</th>
                      <th className="text-left p-4 font-semibold">Amount</th>
                      <th className="text-left p-4 font-semibold">Platform Fee</th>
                      <th className="text-left p-4 font-semibold">Creator Earnings</th>
                      <th className="text-left p-4 font-semibold">Status</th>
                      <th className="text-left p-4 font-semibold">Request Date</th>
                      <th className="text-left p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayouts.map((payout, index) => (
                      <motion.tr
                        key={payout.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={payout.creatorAvatar || "/placeholder.svg"}
                              alt={payout.creatorName}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-semibold">{payout.creatorName}</p>
                              <p className="text-sm text-muted-foreground">{payout.creatorEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-lg">${payout.amount.toFixed(2)}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold text-red-400">${payout.platformFee.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">10%</p>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold text-green-400">${payout.creatorEarnings.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">90%</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(payout.status)}
                            <Badge className={getStatusColor(payout.status)}>{payout.status}</Badge>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-sm">{payout.requestDate}</p>
                          {payout.processedDate && (
                            <p className="text-xs text-muted-foreground">Processed: {payout.processedDate}</p>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-border bg-transparent"
                              onClick={() => setSelectedPayout(payout)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {payout.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApprovePayout(payout.id)}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-600 text-red-400 hover:bg-red-600/10 bg-transparent"
                                  onClick={() => handleRejectPayout(payout.id)}
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredPayouts.length === 0 && (
              <div className="text-center py-12">
                <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No payouts found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filters"
                    : "No payout requests match your criteria"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payout Detail Modal */}
      {selectedPayout && (
        <PayoutModal
          payout={selectedPayout}
          onClose={() => setSelectedPayout(null)}
          // onApprove={handleApprovePayout}
          // onReject={handleRejectPayout}
          // onDownload={handleDownloadPayout}
          />
      )}
    </div>
  )
}

export default PayoutManagement

