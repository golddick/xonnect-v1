"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, Filter, Download, DollarSign, TrendingUp, CheckCircle, Clock, XCircle, Eye, Banknote, PieChart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import PayoutModal from "./payout-model"

type PayoutData = {
  id: string
  creatorId: string
  creatorName: string
  creatorEmail: string
  creatorAvatar?: string
  amount: number
  status: string
  note?: string | null
  receiptUrl?: string | null
  transactionId?: string | null
  requestDate: string
  processedDate?: string | null
  paymentMethod: string
  bankDetails?: {
    bankName: string
    accountNumber: string
    accountName: string
    accountType: string
    isVerified: boolean
  }
}

const PayoutManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedPayout, setSelectedPayout] = useState<PayoutData | null>(null)
  const [payouts, setPayouts] = useState<PayoutData[]>([])
  const [loading, setLoading] = useState(true)

  const loadPayouts = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/superadmin/payouts")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || "Failed to load payout requests")
      }

      setPayouts(data.payouts ?? [])
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : "Failed to load payout requests")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPayouts()
  }, [])

  const filteredPayouts = useMemo(() => {
    return payouts.filter((payout) => {
      const matchesSearch =
        payout.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payout.creatorEmail.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === "all" || payout.status === filterStatus
      return matchesSearch && matchesFilter
    })
  }, [payouts, searchTerm, filterStatus])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "rejected":
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
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const totalStats = {
    totalPayouts: payouts.reduce((sum, payout) => sum + payout.amount, 0),
    platformRevenue: payouts.reduce((sum, payout) => sum + Math.round(payout.amount * 0.1), 0),
    creatorEarnings: payouts.reduce((sum, payout) => sum + Math.round(payout.amount * 0.9), 0),
    pendingPayouts: payouts.filter((p) => p.status === "pending").length,
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-transparent backdrop-blur-sm sticky p-4 top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Payout Management</h1>
          </div>

          <Button variant="outline" className="border-border bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="p-8 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Payouts</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalStats.totalPayouts)}</p>
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
                  <p className="text-2xl font-bold">{formatCurrency(totalStats.platformRevenue)}</p>
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
                  <p className="text-2xl font-bold">{formatCurrency(totalStats.creatorEarnings)}</p>
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
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <Button variant="outline" size="sm" className="border-border bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      <div className="p-8">
        <div className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-transparent border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold">Creator</th>
                  <th className="text-left p-4 font-semibold">Amount</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Request Date</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      Loading payout requests...
                    </td>
                  </tr>
                ) : filteredPayouts.length > 0 ? (
                  filteredPayouts.map((payout) => (
                    <tr key={payout.id} className="border-b border-border hover:bg-muted/50 transition-colors">
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
                        <p className="font-bold text-lg">{formatCurrency(payout.amount)}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(payout.status)}
                          <Badge className={getStatusColor(payout.status)}>{payout.status}</Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{new Date(payout.requestDate).toLocaleDateString()}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="border-border bg-transparent" onClick={() => setSelectedPayout(payout)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center">
                      <div className="text-center py-8">
                        <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No payouts found</h3>
                        <p className="text-muted-foreground">
                          {searchTerm || filterStatus !== "all"
                            ? "Try adjusting your search or filters"
                            : "No payout requests match your criteria"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedPayout && (
        <PayoutModal
          payout={selectedPayout}
          onClose={() => setSelectedPayout(null)}
          onRefresh={loadPayouts}
        />
      )}
    </div>
  )
}

export default PayoutManagement

