"use client"

import { useState } from "react"
import {
  X,
  DollarSign,
  PieChart,
  Banknote,
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Download,
  User,
  Mail,
  Phone,
  AlertCircle,
  FileText,
  Eye,
} from "lucide-react"
import { toast } from "sonner"
import { UploadButton } from "@/lib/utils/uploadthing"

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

interface PayoutModalProps {
  payout: PayoutData | null
  onClose: () => void
  onRefresh: () => void
}

const PayoutModal: React.FC<PayoutModalProps> = ({ payout, onClose, onRefresh }) => {
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [showAccountDetails, setShowAccountDetails] = useState(false)
  const [showAccountNumber, setShowAccountNumber] = useState(false)
  const [approvalNote, setApprovalNote] = useState("")
  const [rejectionNote, setRejectionNote] = useState("")
  const [completionNote, setCompletionNote] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  if (!payout) return null

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600/20 text-yellow-400"
      case "processing":
        return "bg-blue-600/20 text-blue-400"
      case "rejected":
        return "bg-red-600/20 text-red-400"
      case "completed":
        return "bg-green-600/20 text-green-400"
      default:
        return "bg-gray-600/20 text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case "processing":
        return <CheckCircle className="w-5 h-5 text-blue-400" />
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-400" />
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      default:
        return null
    }
  }

  const handleApproveClick = () => {
    setShowApproveModal(true)
    setError("")
  }

  const handleRejectClick = () => {
    setShowRejectModal(true)
    setError("")
  }

  const handleCompleteClick = () => {
    setShowCompleteModal(true)
    setError("")
  }

  const submitApproval = async () => {
    setIsProcessing(true)
    setError("")

    try {
      const response = await fetch(`/api/superadmin/payouts/${payout.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve", note: approvalNote || "Payout approved and is being processed." }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.message || "Failed to approve payout")
      }

      toast.success("Payout approved")
      onRefresh()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve payout")
    } finally {
      setIsProcessing(false)
    }
  }

  const submitRejection = async () => {
    setIsProcessing(true)
    setError("")

    try {
      const response = await fetch(`/api/superadmin/payouts/${payout.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject", note: rejectionNote || "Payout request rejected." }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.message || "Failed to reject payout")
      }

      toast.success("Payout rejected")
      onRefresh()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject payout")
    } finally {
      setIsProcessing(false)
    }
  }

  const submitCompletion = async () => {
    setIsProcessing(true)
    setError("")

    try {
      const receiptUrl = payout.receiptUrl

      if (!receiptUrl) {
        throw new Error("Please upload a receipt before completing this payout")
      }

      const response = await fetch(`/api/superadmin/payouts/${payout.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "complete", note: completionNote || "Payout completed.", receiptUrl }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.message || "Failed to complete payout")
      }

      toast.success("Payout completed")
      onRefresh()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to complete payout")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden m-4">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Payout Details</h3>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="bg-muted/30 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" />
                Creator Information
              </h4>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    {payout.creatorAvatar ? (
                      <img src={payout.creatorAvatar} alt={payout.creatorName} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-foreground font-bold text-2xl">{payout.creatorName.charAt(0)}</span>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Creator Name</p>
                      <p className="text-foreground font-semibold">{payout.creatorName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Email</p>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <p className="text-foreground font-semibold">{payout.creatorEmail}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Status</p>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payout.status)}
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(payout.status)}`}>
                          {payout.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Transaction ID</p>
                      <p className="text-foreground font-semibold font-mono text-sm">{payout.transactionId || payout.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {payout.bankDetails && (
              <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/30 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-green-400" />
                    Payout Account Details
                  </h4>
                  <button onClick={() => setShowAccountDetails((value) => !value)} className="text-sm text-blue-400">
                    {showAccountDetails ? "Hide" : "View account details"}
                  </button>
                </div>

                {showAccountDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-muted-foreground text-sm">Bank Name</p>
                      <p className="text-foreground font-semibold text-lg">{payout.bankDetails.bankName}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-sm">Account Number</p>
                        <div className="flex items-center gap-2">
                          <p className="text-foreground font-semibold text-lg font-mono">
                            {showAccountNumber ? payout.bankDetails.accountNumber : `••••••••${payout.bankDetails.accountNumber.slice(-4)}`}
                          </p>
                          <button onClick={() => setShowAccountNumber((v) => !v)} className="text-blue-400 p-1 rounded">
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Account Name</p>
                      <p className="text-foreground font-semibold text-lg">{payout.bankDetails.accountName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Account Type</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${payout.bankDetails.isVerified ? "bg-green-600/20 text-green-400" : "bg-yellow-600/20 text-yellow-400"}`}>
                          {payout.bankDetails.accountType}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
              <div className="bg-muted/50 border border-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(payout.amount)}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Revenue split already applied at payment time; individual fees are omitted here.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">Payment Timeline</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground text-sm">Request Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <p className="text-foreground font-semibold">{new Date(payout.requestDate).toLocaleDateString()}</p>
                  </div>
                </div>
                {payout.processedDate && (
                  <div>
                    <p className="text-muted-foreground text-sm">Processed Date</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <p className="text-foreground font-semibold">{new Date(payout.processedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground text-sm">Payment Method</p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-purple-400" />
                    <p className="text-foreground font-semibold">{payout.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>

            {payout.note && (
              <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-xl p-4 mb-6">
                <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Admin Note
                </h4>
                <p className="text-yellow-300">{payout.note}</p>
              </div>
            )}

            {error && (
              <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4 mb-6">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-border">
              <button
                onClick={() => payout.receiptUrl && window.open(payout.receiptUrl, "_blank")}
                disabled={!payout.receiptUrl}
                className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-muted-foreground hover:text-foreground hover:border-gray-500 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Download className="w-4 h-4" />
                View Receipt
              </button>

              {payout.status === "pending" && (
                <>
                  <button onClick={handleRejectClick} className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-400 hover:bg-red-600/10 rounded-lg transition-colors">
                    <XCircle className="w-4 h-4" />
                    Reject Payout
                  </button>
                  <button onClick={handleApproveClick} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-foreground rounded-lg transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    Approve Payout
                  </button>
                </>
              )}

              {payout.status === "processing" && (
                <>
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={async (res) => {
                      if (!res || res.length === 0) {
                        toast.error("Upload failed")
                        return
                      }

                      const url = res[0].url ?? res[0].ufsUrl ?? null
                      if (!url) {
                        toast.error("Upload returned no URL")
                        return
                      }

                      try {
                        const r = await fetch(`/api/superadmin/payouts/${payout.id}`, {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ action: "upload-receipt", receiptUrl: url }),
                        })

                        const d = await r.json()
                        if (!r.ok) throw new Error(d?.message || "Failed to save receipt")

                        toast.success("Receipt uploaded")
                        onRefresh()
                      } catch (err) {
                        toast.error(err instanceof Error ? err.message : "Failed to save receipt")
                      }
                    }}
                    onUploadError={(err) => {
                      toast.error(`Upload failed: ${err?.message ?? "unknown"}`)
                    }}
                    className="uploadthing-button"
                  />

                  <button onClick={handleCompleteClick} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-foreground rounded-lg transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    Complete Payout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showApproveModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 m-4">
            <h4 className="text-lg font-semibold text-foreground mb-2">Approve Payout</h4>
            <p className="text-muted-foreground text-sm mb-6">Add a note for approving this payout to {payout.creatorName}.</p>

            <div className="mb-6">
              <label className="block text-muted-foreground text-sm mb-2">Approval Note</label>
              <textarea
                value={approvalNote}
                onChange={(e) => setApprovalNote(e.target.value)}
                placeholder="Optional note to send to the creator"
                className="w-full h-32 bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-gray-400 focus:outline-none focus:border-green-500 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setShowApproveModal(false); setApprovalNote("") }} className="flex-1 px-4 py-2 border border-gray-600 text-muted-foreground hover:text-foreground hover:border-gray-500 rounded-lg transition-colors" disabled={isProcessing}>Cancel</button>
              <button onClick={submitApproval} disabled={isProcessing} className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-foreground rounded-lg transition-colors flex items-center justify-center gap-2">
                {isProcessing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}

      {showRejectModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 m-4">
            <h4 className="text-lg font-semibold text-foreground mb-2">Reject Payout</h4>
            <p className="text-muted-foreground text-sm mb-6">Add a note explaining why this payout is being rejected.</p>

            <div className="mb-6">
              <label className="block text-muted-foreground text-sm mb-2">Rejection Reason</label>
              <textarea
                value={rejectionNote}
                onChange={(e) => setRejectionNote(e.target.value)}
                placeholder="Optional note to send to the creator"
                className="w-full h-32 bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-gray-400 focus:outline-none focus:border-red-500 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setShowRejectModal(false); setRejectionNote("") }} className="flex-1 px-4 py-2 border border-gray-600 text-muted-foreground hover:text-foreground hover:border-gray-500 rounded-lg transition-colors" disabled={isProcessing}>Cancel</button>
              <button onClick={submitRejection} disabled={isProcessing} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-foreground rounded-lg transition-colors flex items-center justify-center gap-2">
                {isProcessing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <XCircle className="w-4 h-4" />}
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {showCompleteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 m-4">
            <h4 className="text-lg font-semibold text-foreground mb-2">Complete Payout</h4>
            <p className="text-muted-foreground text-sm mb-6">Upload the transfer receipt and mark the payout completed.</p>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground">Upload a receipt first using the uploader above, then complete the payout.</p>
            </div>

            <div className="mb-6">
              <label className="block text-muted-foreground text-sm mb-2">Completion Note</label>
              <textarea
                value={completionNote}
                onChange={(e) => setCompletionNote(e.target.value)}
                placeholder="Optional note to send to the creator"
                className="w-full h-28 bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-gray-400 focus:outline-none focus:border-green-500 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setShowCompleteModal(false); setCompletionNote(""); setError("") }} className="flex-1 px-4 py-2 border border-gray-600 text-muted-foreground hover:text-foreground hover:border-gray-500 rounded-lg transition-colors" disabled={isProcessing}>Cancel</button>
              <button onClick={submitCompletion} disabled={isProcessing} className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-foreground rounded-lg transition-colors flex items-center justify-center gap-2">
                {isProcessing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                Mark Completed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PayoutModal;
