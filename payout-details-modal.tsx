"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  X,
  User,
  DollarSign,
  CreditCard,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  Building,
  Phone,
  Mail,
  MapPin,
  Copy,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PayoutDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  payout: any
  onApprove: (id: number) => void
  onReject: (id: number) => void
}

const PayoutDetailsModal = ({ isOpen, onClose, payout, onApprove, onReject }: PayoutDetailsModalProps) => {
  const [showAccountDetails, setShowAccountDetails] = useState(false)

  if (!isOpen || !payout) return null

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
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Payout Request Details</h3>
              <p className="text-gray-400 mt-1">Review and manage payout request</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Creator Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-400" />
                Creator Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-6">
                <img
                  src={payout.creatorAvatar || "/placeholder.svg"}
                  alt={payout.creatorName}
                  className="w-20 h-20 rounded-full border-2 border-gray-700"
                />
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xl font-bold mb-2">{payout.creatorName}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{payout.creatorEmail}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{payout.creatorPhone || "+1 (555) 123-4567"}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{payout.creatorLocation || "New York, USA"}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-gray-400 text-sm">Creator ID</p>
                          <p className="font-mono text-sm bg-gray-900 px-2 py-1 rounded">
                            CR-{payout.id.toString().padStart(6, "0")}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Join Date</p>
                          <p className="font-semibold">January 15, 2024</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Status</p>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Verified Creator</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payout Summary */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                  Payout Summary
                </div>
                <Badge className={getStatusColor(payout.status)}>{payout.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-900 rounded-lg">
                  <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold">${payout.amount.toFixed(2)}</p>
                </div>
                <div className="text-center p-4 bg-gray-900 rounded-lg">
                  <Building className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Platform Fee (10%)</p>
                  <p className="text-2xl font-bold text-red-400">${payout.platformFee.toFixed(2)}</p>
                </div>
                <div className="text-center p-4 bg-gray-900 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Creator Earnings</p>
                  <p className="text-2xl font-bold text-green-400">${payout.creatorEarnings.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Details */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-400" />
                Content Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Content Type</p>
                    <p className="font-semibold">{payout.contentType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Items</p>
                    <p className="font-semibold">{payout.contentCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Views</p>
                    <p className="font-semibold">{payout.totalViews.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Subscribers</p>
                    <p className="font-semibold">{payout.subscribers}</p>
                  </div>
                </div>

                {/* Content List */}
                <div className="border-t border-gray-700 pt-4">
                  <h5 className="font-semibold mb-3">Recent Content</h5>
                  <div className="space-y-2">
                    {[
                      { name: "Music Production Masterclass", views: 5600, revenue: 890 },
                      { name: "Live Concert Performance", views: 8900, revenue: 1340 },
                      { name: "Behind the Scenes", views: 1100, revenue: 220 },
                    ].map((content, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                        <div>
                          <p className="font-medium">{content.name}</p>
                          <p className="text-sm text-gray-400">{content.views.toLocaleString()} views</p>
                        </div>
                        <p className="font-semibold text-green-400">${content.revenue}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-yellow-400" />
                  Payment Information
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAccountDetails(!showAccountDetails)}
                  className="border-gray-600 bg-transparent"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showAccountDetails ? "Hide" : "Show"} Account Details
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Payment Method</p>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-blue-400" />
                        <p className="font-semibold">{payout.paymentMethod}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Request Date</p>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <p className="font-semibold">{payout.requestDate}</p>
                      </div>
                    </div>
                    {payout.processedDate && (
                      <div>
                        <p className="text-gray-400 text-sm">Processed Date</p>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <p className="font-semibold">{payout.processedDate}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Account Details (Sensitive) */}
                {showAccountDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                      <p className="text-sm font-semibold text-yellow-400">Sensitive Information</p>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-gray-400">Bank Name</p>
                        <div className="flex items-center justify-between">
                          <p className="font-mono">Chase Bank</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard("Chase Bank")}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400">Account Number</p>
                        <div className="flex items-center justify-between">
                          <p className="font-mono">****-****-1234</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard("1234567890")}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400">Routing Number</p>
                        <div className="flex items-center justify-between">
                          <p className="font-mono">021000021</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard("021000021")}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400">Account Holder</p>
                        <p className="font-mono">{payout.creatorName}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-800">
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-gray-700 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="border-gray-700 bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                View Transaction Log
              </Button>
            </div>

            {payout.status === "pending" && (
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-600/10 bg-transparent"
                  onClick={() => onReject(payout.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Payout
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => onApprove(payout.id)}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Payout
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PayoutDetailsModal
