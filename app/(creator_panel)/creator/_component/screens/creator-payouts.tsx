"use client"

import React, { useState } from "react"
import {
  DollarSign,
  Calendar,
  CreditCard,
  Plus,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Banknote,
  Bell,
  Menu,
  X,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePathname, useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { sidebarItems } from "@/lib/constant"

const CreatorPayouts = () => { 
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [otpStep, setOtpStep] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [payoutAmount, setPayoutAmount] = useState("")
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null)

  const currentEarnings = {
    totalEarnings: 8540.0,
    availableForPayout: 1250.0,
    pendingPayouts: 3200.0,
    thisMonth: 1890.0,
  }

  const payoutHistory = [
    {
      id: 1,
      amount: 2450.0,
      status: "completed",
      requestDate: "2024-02-01",
      processedDate: "2024-02-03",
      method: "Bank Transfer",
      transactionId: "TXN-2024-001",
    },
    {
      id: 2,
      amount: 1890.0,
      status: "completed",
      requestDate: "2024-01-01",
      processedDate: "2024-01-03",
      method: "PayPal",
      transactionId: "TXN-2024-002",
    },
    {
      id: 3,
      amount: 3200.0,
      status: "pending",
      requestDate: "2024-02-15",
      processedDate: null,
      method: "Bank Transfer",
      transactionId: null,
    },
  ]

  const savedAccounts = [
    { id: 1, name: "Zenith Bank", accountNumber: "****5432", type: "Bank Transfer" },
    { id: 2, name: "PayPal", email: "user@******.com", type: "PayPal" },
  ]

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
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const handleRequestPayout = () => {
    setOtpStep(true)
  }

  const handleVerifyOtp = () => {
    if (otpCode.length === 6 && selectedAccount && payoutAmount) {
      alert("OTP verified! Payout request submitted successfully!")
      setShowRequestModal(false)
      setOtpStep(false)
      setOtpCode("")
      setPayoutAmount("")
      setSelectedAccount(null)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground ">

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
                  Your Payouts & Earnings
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative bg-background hover:bg-muted rounded-lg p-2 transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>

    <div className="p-6 space-y-8">


        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 mt-4">
          <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Earnings</p>
                  <p className="text-2xl font-bold">₦{currentEarnings.totalEarnings.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Available for Payout</p>
                  <p className="text-2xl font-bold text-green-500">
                    ₦{currentEarnings.availableForPayout.toLocaleString()}
                  </p>
                </div>
                <Banknote className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Pending Payouts</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    ₦{currentEarnings.pendingPayouts.toLocaleString()}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">This Month</p>
                  <p className="text-2xl font-bold text-blue-500">₦{currentEarnings.thisMonth.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Payout History</h2>
            <p className="text-muted-foreground">Track your payout requests and earnings</p>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-border bg-transparent hover:bg-muted">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button
              onClick={() => setShowRequestModal(true)}
              disabled={currentEarnings.availableForPayout < 50}
              className="bg-red-600 hover:bg-red-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Request Payout
            </Button>
          </div>
        </div>

        {/* Minimum Payout Notice */}
        {currentEarnings.availableForPayout < 50 && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="font-semibold text-yellow-400">Minimum Payout Amount</p>
                <p className="text-sm text-gray-300">
                  You need at least ₦50.00 in available earnings to request a payout. Current available: ₦
                  {currentEarnings.availableForPayout.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payout History Table */}
        <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
          <CardHeader>
            <CardTitle>Recent Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-semibold">Amount</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Method</th>
                    <th className="text-left p-4 font-semibold">Request Date</th>
                    <th className="text-left p-4 font-semibold">Processed Date</th>
                    <th className="text-left p-4 font-semibold">Transaction ID</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutHistory.map((payout) => (
                    <tr key={payout.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-lg">₦{payout.amount.toFixed(2)}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(payout.status)}
                          <Badge className={getStatusColor(payout.status)}>{payout.status}</Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-muted-foreground" />
                          <span>{payout.method}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{payout.requestDate}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {payout.processedDate ? (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>{payout.processedDate}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        {payout.transactionId ? (
                          <code className="bg-muted px-2 py-1 rounded text-sm">{payout.transactionId}</code>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Payout Request Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                Request Payout
              </h2>

              {!otpStep ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Select Account *</label>
                    <select
                      value={selectedAccount || ""}
                      onChange={(e) => setSelectedAccount(e.target.value ? Number(e.target.value) : null)}
                      className="w-full bg-transparent border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="">Choose an account</option>
                      {savedAccounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name} - {acc.accountNumber || acc.email}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Amount (₦) *</label>
                    <input
                      type="number"
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                      max={currentEarnings.availableForPayout}
                      className="w-full bg-transparent border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder={`Max: ₦${currentEarnings.availableForPayout}`}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowRequestModal(false)}
                      className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors border border-border"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRequestPayout}
                      disabled={!selectedAccount || !payoutAmount || Number(payoutAmount) <= 0}
                      className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-muted disabled:text-muted-foreground text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                    <p className="text-blue-400 text-sm">
                      An OTP has been sent to your registered email. Please enter it below to verify your payout
                      request.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Enter OTP Code *</label>
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      maxLength={6}
                      placeholder="000000"
                      className="w-full bg-transparent border border-border rounded-lg px-4 py-2 text-foreground text-center text-xl font-mono focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong>Amount:</strong> ₦{payoutAmount}
                    </p>
                    <p>
                      <strong>Account:</strong> {savedAccounts.find((acc) => acc.id === selectedAccount)?.name}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setOtpStep(false)
                        setOtpCode("")
                      }}
                      className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors border border-border"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleVerifyOtp}
                      disabled={otpCode.length !== 6}
                      className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-muted disabled:text-muted-foreground text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Verify & Request Payout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default CreatorPayouts
