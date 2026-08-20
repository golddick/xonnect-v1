// "use client"

// import React, { useEffect, useState } from "react"
// import { usePathname, useRouter } from "next/navigation"
// import {
//   DollarSign,
//   Calendar,
//   CreditCard,
//   Plus,
//   Download,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   TrendingUp,
//   Banknote,
//   Bell,
//   Menu,
//   X,
//   Zap,
//   Loader2,
// } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { sidebarItems } from "@/lib/constant"
// import Logo from "@/components/nav/logo"
// import { formatCurrency } from "@/lib/utils"

// type PayoutAccount = {
//   id: string
//   bankName: string
//   accountName: string
//   accountNumber: string
//   accountType: string
//   isPrimary: boolean
//   verified: boolean
// }

// type PayoutRequest = {
//   id: string
//   amount: number
//   status: string
//   requestedAt: string
//   processedAt?: string | null
//   payoutAccount?: {
//     bankName: string
//     accountName: string
//     accountNumber: string
//     accountType: string
//   } | null
// }

// type RevenueSummary = {
//   totalRevenue: number
//   streamRevenue: number
//   venueRevenue: number
//   videoRevenue: number
//   availableForPayout: number
//   pendingPayouts: number
//   minimumPayoutAmount: number
// }

// const CreatorPayouts = () => {
//   const router = useRouter() 
//   const pathname = usePathname()
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [showRequestModal, setShowRequestModal] = useState(false)
//   const [otpStep, setOtpStep] = useState(false)
//   const [otpCode, setOtpCode] = useState("")
//   const [payoutAmount, setPayoutAmount] = useState("")
//   const [selectedAccount, setSelectedAccount] = useState("")
//   const [accounts, setAccounts] = useState<PayoutAccount[]>([])
//   const [payoutHistory, setPayoutHistory] = useState<PayoutRequest[]>([])
//   const [summary, setSummary] = useState<RevenueSummary>({
//     totalRevenue: 0,
//     streamRevenue: 0,
//     venueRevenue: 0,
//     videoRevenue: 0,
//     availableForPayout: 0,
//     pendingPayouts: 0,
//     minimumPayoutAmount: 500,
//   })
//   const [loading, setLoading] = useState(true)
//   const [submitting, setSubmitting] = useState(false)
//   const [feedback, setFeedback] = useState<string | null>(null)
//   const [error, setError] = useState<string | null>(null)

//   const loadData = async () => {
//     setLoading(true)
//     try {
//       const [summaryRes, accountsRes, payoutsRes] = await Promise.all([
//         fetch("/api/creator/monetization/summary", { cache: "no-store" }),
//         fetch("/api/creator/monetization/payout-accounts", { cache: "no-store" }),
//         fetch("/api/creator/monetization/payouts", { cache: "no-store" }),
//       ])
 
//       if (summaryRes.ok) {
//         const summaryPayload = await summaryRes.json()
//         setSummary(summaryPayload.summary ?? summaryPayload)
//       }
//       if (accountsRes.ok) {
//         const accountPayload = await accountsRes.json()
//         setAccounts(accountPayload.payoutAccounts ?? [])
//       }
//       if (payoutsRes.ok) {
//         const payoutPayload = await payoutsRes.json()
//         setPayoutHistory(payoutPayload.payoutRequests ?? [])
//       }
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     void loadData()
//   }, [])

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "completed":
//         return "bg-green-500/20 text-green-400 border-green-500/30"
//       case "pending":
//         return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
//       case "processing":
//         return "bg-blue-500/20 text-blue-400 border-blue-500/30"
//       case "failed":
//         return "bg-red-500/20 text-red-400 border-red-500/30"
//       default:
//         return "bg-gray-500/20 text-muted-foreground border-gray-500/30"
//     }
//   }

//   const getStatusIcon = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "completed":
//         return <CheckCircle className="w-4 h-4 text-green-400" />
//       case "pending":
//         return <Clock className="w-4 h-4 text-yellow-400" />
//       case "processing":
//         return <TrendingUp className="w-4 h-4 text-blue-400" />
//       case "failed":
//         return <AlertCircle className="w-4 h-4 text-red-400" />
//       default:
//         return <Clock className="w-4 h-4 text-muted-foreground" />
//     }
//   }

//   const handleRequestPayout = async () => {
//     setError(null)
//     setFeedback(null)

//     if (!selectedAccount || !payoutAmount || Number(payoutAmount) <= 0) {
//       setError("Choose an account and enter an amount to continue.")
//       return
//     }

//     const amount = Number(payoutAmount)
//     if (amount > summary.availableForPayout) {
//       setError("The amount exceeds your available balance.")
//       return
//     }

//     try {
//       setSubmitting(true)
//       const response = await fetch("/api/creator/monetization/payouts/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ accountId: selectedAccount, amount }),
//       })

//       const payload = await response.json()
//       if (!response.ok) {
//         throw new Error(payload.message || "Unable to send OTP")
//       }

//       setOtpStep(true)
//       setFeedback("OTP sent to your email. Enter the code to confirm the payout request.")
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Unable to send OTP")
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   const handleVerifyOtp = async () => {
//     if (otpCode.length !== 6) {
//       setError("Enter the 6-digit OTP.")
//       return
//     }

//     try {
//       setSubmitting(true)
//       const response = await fetch("/api/creator/monetization/payouts/verify", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ accountId: selectedAccount, amount: Number(payoutAmount), code: otpCode }),
//       })

//       const payload = await response.json()
//       if (!response.ok) {
//         throw new Error(payload.message || "Unable to verify payout")
//       }

//       setShowRequestModal(false)
//       setOtpStep(false)
//       setOtpCode("")
//       setPayoutAmount("")
//       setSelectedAccount("")
//       setFeedback("Payout request submitted successfully. It is now pending.")
//       await loadData()
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Unable to verify payout")
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   // const formatCurrency = (value: number) => `₦${value.toLocaleString()}`

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-50 lg:hidden">
//           <div className="fixed inset-0 bg-background/50" onClick={() => setSidebarOpen(false)} />
//           <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border">
//             <div className="flex items-center justify-between p-6 border-b border-border">
//               <div className="flex items-center space-x-2">
//                 <Logo />
//                 <span className="text-xl font-bold text-foreground">Xonnect</span>
//               </div>
//               <button onClick={() => setSidebarOpen(false)}>
//                 <X className="w-6 h-6 text-muted-foreground" />
//               </button>
//             </div>
//             <nav className="p-4 space-y-2">
//               {sidebarItems.map((item, index) => (
//                 <button
//                   key={index}
//                   onClick={() => router.push(item.route)}
//                   className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
//                     pathname === item.route
//                       ? "bg-red-600/20 text-red-400 border border-red-600/30"
//                       : "text-muted-foreground hover:text-foreground hover:bg-muted"
//                   }`}
//                 >
//                   <item.icon className="w-5 h-5" />
//                   <span>{item.label}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>
//       )}

//       <div className="w-full">
//         <div className="border-b border-border bg-transparent backdrop-blur-sm sticky top-0 z-10">
//           <div className="flex items-center justify-between p-6">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors"
//               >
//                 <Menu className="w-5 h-5" />
//               </button>
//               <div>
//                 <h1 className="text-2xl hidden md:block font-bold text-foreground">Your Payouts & Earnings</h1>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button className="relative bg-background hover:bg-muted rounded-lg p-2 transition-colors">
//                 <Bell className="w-5 h-5" />
//                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full" />
//               </button>
//               <ThemeToggle />
//             </div>
//           </div>
//         </div>

//         <div className="p-6 space-y-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
//             <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-muted-foreground text-sm">Total Earnings</p>
//                     <p className="text-2xl font-bold">{loading ? "—" : formatCurrency(summary.totalRevenue)}</p>
//                   </div>
//                   <span className="w-8 h-8 text-green-500" >₦</span>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-muted-foreground text-sm">Available for Payout</p>
//                     <p className="text-2xl font-bold text-green-500">
//                       {loading ? "—" : formatCurrency(summary.availableForPayout)}
//                     </p>
//                   </div>
//                   <Banknote className="w-8 h-8 text-green-500" />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-muted-foreground text-sm">Pending Payouts</p>
//                     <p className="text-2xl font-bold text-yellow-500">
//                       {loading ? "—" : formatCurrency(summary.pendingPayouts)}
//                     </p>
//                   </div>
//                   <Clock className="w-8 h-8 text-yellow-500" />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-muted-foreground text-sm">Revenue Sources</p>
//                     <p className="text-lg font-semibold text-foreground">
//                       {loading ? "—" : `${summary.streamRevenue + summary.venueRevenue + summary.videoRevenue}`}
//                     </p>
//                   </div>
//                   <TrendingUp className="w-8 h-8 text-blue-500" />
//                 </div>
//               </CardContent>
//             </Card> */}
//           </div>

//           <div className="text-sm text-muted-foreground hidden md:block ">
//             <p className="font-medium text-foreground">Earnings breakdown</p>
//             <div className=" flex gap-2 items-center">
//               <p className="mt-1">
//               Streaming tickets: {formatCurrency(summary.streamRevenue)} 
//              </p>
//             •
//               <p className="mt-1">
//                Venue tickets: {formatCurrency(summary.venueRevenue)} 
//               </p>
//             •
//               <p className="mt-1">
//               Video revenue: {formatCurrency(summary.videoRevenue)}
//               </p>
//               </div>
//           </div>

//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h2 className="text-2xl font-bold mb-2">Payout History</h2>
//               <p className="text-muted-foreground">Track your payout requests and earnings</p>
//             </div>

//             <div className="flex items-center space-x-4">
//               <Button variant="outline" className="border-border bg-transparent hover:bg-muted">
//                 <Download className="w-4 h-4 mr-2" />
//                <span className="hidden lg:block"> Export Report</span>
//               </Button>
//               <Button
//                 onClick={() => {
//                   setError(null)
//                   setFeedback(null)
//                   setShowRequestModal(true)
//                 }}
//                 disabled={summary.availableForPayout < summary.minimumPayoutAmount || accounts.length === 0}
//                 className="bg-red-600 hover:bg-red-700"
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 <span className="hidden lg:block">Request Payout</span>
//               </Button>
//             </div>
//           </div>

//           {summary.availableForPayout < summary.minimumPayoutAmount && (
//             <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
//               <div className="flex items-center space-x-3">
//                 <AlertCircle className="w-5 h-5 text-yellow-400" />
//                 <div>
//                   <p className="font-semibold text-yellow-400">Minimum Payout Amount</p>
//                   <p className="text-sm text-gray-300">
//                     You need at least {formatCurrency(summary.minimumPayoutAmount)} in available earnings to request a payout. Current available: {formatCurrency(summary.availableForPayout)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {accounts.length === 0 && (
//             <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6 text-sm text-muted-foreground">
//               You currently have no verified payout accounts to select from. Please use your account settings to add one before requesting a payout.
//             </div>
//           )}

//           {feedback && <div className="rounded-lg border border-green-600/30 bg-green-600/10 p-3 text-sm text-green-400">{feedback}</div>}
//           {error && <div className="rounded-lg border border-red-600/30 bg-red-600/10 p-3 text-sm text-red-400">{error}</div>}

//           <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
//             <CardHeader>
//               <CardTitle>Recent Payouts</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="border-b border-border">
//                     <tr>
//                       <th className="text-left p-4 font-semibold">Amount</th>
//                       <th className="text-left p-4 font-semibold">Status</th>
//                       <th className="text-left p-4 font-semibold">Account</th>
//                       <th className="text-left p-4 font-semibold">Requested</th>
//                       <th className="text-left p-4 font-semibold">Processed</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {payoutHistory.map((payout) => (
//                       <tr key={payout.id} className="border-b border-border hover:bg-muted/50 transition-colors">
//                         <td className="p-4">
//                           <p className="font-bold text-lg">{formatCurrency(payout.amount)}</p>
//                         </td>
//                         <td className="p-4">
//                           <div className="flex items-center space-x-2">
//                             {getStatusIcon(payout.status)}
//                             <Badge className={getStatusColor(payout.status)}>{payout.status}</Badge>
//                           </div>
//                         </td>
//                         <td className="p-4">
//                           <div className="flex items-center space-x-2">
//                             <CreditCard className="w-4 h-4 text-muted-foreground" />
//                             <span>{payout.payoutAccount ? `${payout.payoutAccount.bankName} • ${payout.payoutAccount.accountNumber}` : "—"}</span>
//                           </div>
//                         </td>
//                         <td className="p-4">
//                           <div className="flex items-center space-x-2">
//                             <Calendar className="w-4 h-4 text-muted-foreground" />
//                             <span>{new Date(payout.requestedAt).toLocaleDateString("en-NG")}</span>
//                           </div>
//                         </td>
//                         <td className="p-4">
//                           {payout.processedAt ? (
//                             <div className="flex items-center space-x-2">
//                               <CheckCircle className="w-4 h-4 text-green-400" />
//                               <span>{new Date(payout.processedAt).toLocaleDateString("en-NG")}</span>
//                             </div>
//                           ) : (
//                             <span className="text-muted-foreground">Pending</span>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {showRequestModal && (
//         <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 space-y-6">
//             <h2 className="text-2xl font-bold text-foreground">Request Payout</h2>

//             {!otpStep ? (
//               <>
//                 <div>
//                   <label className="block text-sm font-medium text-muted-foreground mb-2">Select Account *</label>
//                   <select
//                     value={selectedAccount}
//                     onChange={(e) => setSelectedAccount(e.target.value)}
//                     className="w-full bg-transparent border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
//                   >
//                     <option value="">Choose an account</option>
//                     {accounts.map((acc) => (
//                       <option key={acc.id} value={acc.id}>
//                         {acc.bankName} • {acc.accountNumber}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-muted-foreground mb-2">Amount (₦) *</label>
//                   <input
//                     type="number"
//                     value={payoutAmount}
//                     onChange={(e) => setPayoutAmount(e.target.value)}
//                     max={summary.availableForPayout}
//                     className="w-full bg-transparent border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
//                     placeholder={`Max: ${formatCurrency(summary.availableForPayout)}`}
//                   />
//                 </div>

//                 <div className="flex gap-4">
//                   <button
//                     onClick={() => {
//                       setShowRequestModal(false)
//                       setOtpStep(false)
//                       setOtpCode("")
//                       setError(null)
//                       setFeedback(null)
//                     }}
//                     className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors border border-border"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleRequestPayout}
//                     disabled={!selectedAccount || !payoutAmount || Number(payoutAmount) <= 0 || submitting}
//                     className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-muted disabled:text-muted-foreground text-white px-4 py-2 rounded-lg transition-colors"
//                   >
//                     {submitting ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Continue"}
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
//                   <p className="text-red-400 text-sm">
//                     An OTP has been sent to your registered email. Please enter it below to verify your payout request.
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-muted-foreground mb-2">Enter OTP Code *</label>
//                   <input
//                     type="text"
//                     value={otpCode}
//                     onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
//                     maxLength={6}
//                     placeholder="000000"
//                     className="w-full bg-transparent border border-border rounded-lg px-4 py-2 text-foreground text-center text-xl font-mono focus:outline-none focus:ring-2 focus:ring-red-600"
//                   />
//                 </div>

//                 <div className="space-y-2 text-sm text-muted-foreground">
//                   <p>
//                     <strong>Amount:</strong> {formatCurrency(Number(payoutAmount))}
//                   </p>
//                   <p>
//                     <strong>Account:</strong> {accounts.find((acc) => acc.id === selectedAccount)?.bankName}
//                   </p>
//                 </div>

//                 <div className="flex gap-4">
//                   <button
//                     onClick={() => {
//                       setOtpStep(false)
//                       setOtpCode("")
//                       setError(null)
//                     }}
//                     className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors border border-border"
//                   >
//                     Back
//                   </button>
//                   <button
//                     onClick={handleVerifyOtp}
//                     disabled={otpCode.length !== 6 || submitting}
//                     className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-muted disabled:text-muted-foreground text-white px-4 py-2 rounded-lg transition-colors"
//                   >
//                     {submitting ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Verify & Request Payout"}
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default CreatorPayouts








"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
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
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { sidebarItems } from "@/lib/constant"
import Logo from "@/components/nav/logo"
import { formatCurrency } from "@/lib/utils"

type PayoutAccount = {
  id: string
  bankName: string
  accountName: string
  accountNumber: string
  accountType: string
  isPrimary: boolean
  verified: boolean
}

type PayoutRequest = {
  id: string
  amount: number
  status: string
  requestedAt: string
  processedAt?: string | null
  payoutAccount?: {
    bankName: string
    accountName: string
    accountNumber: string
    accountType: string
  } | null
}

type RevenueSummary = {
  totalRevenue: number
  streamRevenue: number
  venueRevenue: number
  videoRevenue: number
  availableForPayout: number
  pendingPayouts: number
  minimumPayoutAmount: number
}

const CreatorPayouts = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [otpStep, setOtpStep] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [payoutAmount, setPayoutAmount] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("")
  const [accounts, setAccounts] = useState<PayoutAccount[]>([])
  const [payoutHistory, setPayoutHistory] = useState<PayoutRequest[]>([])
  const [summary, setSummary] = useState<RevenueSummary>({
    totalRevenue: 0,
    streamRevenue: 0,
    venueRevenue: 0,
    videoRevenue: 0,
    availableForPayout: 0,
    pendingPayouts: 0,
    minimumPayoutAmount: 500,
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    setLoading(true)
    try {
      const [summaryRes, accountsRes, payoutsRes] = await Promise.all([
        fetch("/api/creator/monetization/summary", { cache: "no-store" }),
        fetch("/api/creator/monetization/payout-accounts", { cache: "no-store" }),
        fetch("/api/creator/monetization/payouts", { cache: "no-store" }),
      ])

      if (summaryRes.ok) {
        const summaryPayload = await summaryRes.json()
        setSummary(summaryPayload.summary ?? summaryPayload)
      }
      if (accountsRes.ok) {
        const accountPayload = await accountsRes.json()
        setAccounts(accountPayload.payoutAccounts ?? [])
      }
      if (payoutsRes.ok) {
        const payoutPayload = await payoutsRes.json()
        setPayoutHistory(payoutPayload.payoutRequests ?? [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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
    switch (status.toLowerCase()) {
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

  const handleRequestPayout = async () => {
    setError(null)
    setFeedback(null)

    if (!selectedAccount || !payoutAmount || Number(payoutAmount) <= 0) {
      setError("Choose an account and enter an amount to continue.")
      return
    }

    const amount = Number(payoutAmount)
    if (amount > summary.availableForPayout) {
      setError("The amount exceeds your available balance.")
      return
    }

    try {
      setSubmitting(true)
      const response = await fetch("/api/creator/monetization/payouts/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: selectedAccount, amount }),
      })

      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload.message || "Unable to send OTP")
      }

      setOtpStep(true)
      setFeedback("OTP sent to your email. Enter the code to confirm the payout request.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send OTP")
    } finally {
      setSubmitting(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (otpCode.length !== 6) {
      setError("Enter the 6-digit OTP.")
      return
    }

    try {
      setSubmitting(true)
      const response = await fetch("/api/creator/monetization/payouts/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: selectedAccount, amount: Number(payoutAmount), code: otpCode }),
      })

      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload.message || "Unable to verify payout")
      }

      setShowRequestModal(false)
      setOtpStep(false)
      setOtpCode("")
      setPayoutAmount("")
      setSelectedAccount("")
      setFeedback("Payout request submitted successfully. It is now pending.")
      await loadData()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to verify payout")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-[80vw] max-w-64 bg-card border-r border-border overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
              <div className="flex items-center space-x-2 min-w-0">
                <Logo />
                <span className="text-xl font-bold text-foreground truncate">Xonnect</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="shrink-0">
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
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="border-b border-border bg-transparent backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between gap-3 p-4 sm:p-6">
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">
                  <span className="hidden sm:inline">Your Payouts & Earnings</span>
                  <span className="sm:hidden">Payouts</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
              <button className="relative bg-background hover:bg-muted rounded-lg p-2 transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full" />
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
            <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-sm">Total Earnings</p>
                    <p className="text-xl sm:text-2xl font-bold truncate">
                      {loading ? "—" : formatCurrency(summary.totalRevenue)}
                    </p>
                  </div>
                  <span className="w-8 h-8 shrink-0 text-green-500 text-2xl leading-8 text-center">₦</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-sm">Available for Payout</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-500 truncate">
                      {loading ? "—" : formatCurrency(summary.availableForPayout)}
                    </p>
                  </div>
                  <Banknote className="w-8 h-8 shrink-0 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-sm">Pending Payouts</p>
                    <p className="text-xl sm:text-2xl font-bold text-yellow-500 truncate">
                      {loading ? "—" : formatCurrency(summary.pendingPayouts)}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 shrink-0 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Earnings breakdown</p>
            <div className="flex sm:flex-row sm:flex-wrap gap-1 sm:gap-2 sm:items-center mt-1">
              <p>Streaming tickets: {formatCurrency(summary.streamRevenue)}</p>
              <span className="hidden sm:inline">•</span>
              <p>Venue tickets: {formatCurrency(summary.venueRevenue)}</p>
              <span className="hidden sm:inline">•</span>
              <p>Video revenue: {formatCurrency(summary.videoRevenue)}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Payout History</h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Track your payout requests and earnings
              </p>
            </div>

            <div className="flex items-center gap-3 sm:space-x-4">
              <Button
                variant="outline"
                className="border-border bg-transparent hover:bg-muted flex-1 sm:flex-none justify-center"
              >
                <Download className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Export Report</span>
              </Button>
              <Button
                onClick={() => {
                  setError(null)
                  setFeedback(null)
                  setShowRequestModal(true)
                }}
                disabled={summary.availableForPayout < summary.minimumPayoutAmount || accounts.length === 0}
                className="bg-red-600 hover:bg-red-700 flex-1 sm:flex-none justify-center"
              >
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Request Payout</span>
              </Button>
            </div>
          </div>

          {summary.availableForPayout < summary.minimumPayoutAmount && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-start sm:items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <p className="font-semibold text-yellow-400">Minimum Payout Amount</p>
                  <p className="text-sm text-gray-300">
                    You need at least {formatCurrency(summary.minimumPayoutAmount)} in available earnings to
                    request a payout. Current available: {formatCurrency(summary.availableForPayout)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {accounts.length === 0 && (
            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6 text-sm text-muted-foreground">
              You currently have no verified payout accounts to select from. Please use your account settings to
              add one before requesting a payout.
            </div>
          )}

          {feedback && (
            <div className="rounded-lg border border-green-600/30 bg-green-600/10 p-3 text-sm text-green-400">
              {feedback}
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-red-600/30 bg-red-600/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <Card className="bg-card border border-border rounded-2xl overflow-hidden hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
            <CardHeader>
              <CardTitle>Recent Payouts</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left p-3 sm:p-4 font-semibold whitespace-nowrap">Amount</th>
                      <th className="text-left p-3 sm:p-4 font-semibold whitespace-nowrap">Status</th>
                      <th className="text-left p-3 sm:p-4 font-semibold whitespace-nowrap hidden md:table-cell">
                        Account
                      </th>
                      <th className="text-left p-3 sm:p-4 font-semibold whitespace-nowrap hidden sm:table-cell">
                        Requested
                      </th>
                      <th className="text-left p-3 sm:p-4 font-semibold whitespace-nowrap hidden md:table-cell">
                        Processed
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payoutHistory.map((payout) => (
                      <tr key={payout.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="p-3 sm:p-4 whitespace-nowrap">
                          <p className="font-bold text-base sm:text-lg">{formatCurrency(payout.amount)}</p>
                          <p className="text-xs text-muted-foreground sm:hidden">
                            {new Date(payout.requestedAt).toLocaleDateString("en-NG")}
                          </p>
                        </td>
                        <td className="p-3 sm:p-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(payout.status)}
                            <Badge className={getStatusColor(payout.status)}>{payout.status}</Badge>
                          </div>
                        </td>
                        <td className="p-3 sm:p-4 whitespace-nowrap hidden md:table-cell">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span>
                              {payout.payoutAccount
                                ? `${payout.payoutAccount.bankName} • ${payout.payoutAccount.accountNumber}`
                                : "—"}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 sm:p-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span>{new Date(payout.requestedAt).toLocaleDateString("en-NG")}</span>
                          </div>
                        </td>
                        <td className="p-3 sm:p-4 whitespace-nowrap hidden md:table-cell">
                          {payout.processedAt ? (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                              <span>{new Date(payout.processedAt).toLocaleDateString("en-NG")}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Pending</span>
                          )}
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

      {showRequestModal && (
        <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Request Payout</h2>

            {!otpStep ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Select Account *
                  </label>
                  <select
                    value={selectedAccount}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                    className="w-full bg-transparent border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="">Choose an account</option>
                    {accounts.map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.bankName} • {acc.accountNumber}
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
                    max={summary.availableForPayout}
                    className="w-full bg-transparent border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder={`Max: ${formatCurrency(summary.availableForPayout)}`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => {
                      setShowRequestModal(false)
                      setOtpStep(false)
                      setOtpCode("")
                      setError(null)
                      setFeedback(null)
                    }}
                    className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors border border-border"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRequestPayout}
                    disabled={!selectedAccount || !payoutAmount || Number(payoutAmount) <= 0 || submitting}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-muted disabled:text-muted-foreground text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {submitting ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Continue"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
                  <p className="text-red-400 text-sm">
                    An OTP has been sent to your registered email. Please enter it below to verify your payout
                    request.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Enter OTP Code *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                    placeholder="000000"
                    className="w-full bg-transparent border border-border rounded-lg px-4 py-2 text-foreground text-center text-xl font-mono focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div className="space-y-2 text-sm text-muted-foreground break-words">
                  <p>
                    <strong>Amount:</strong> {formatCurrency(Number(payoutAmount))}
                  </p>
                  <p>
                    <strong>Account:</strong> {accounts.find((acc) => acc.id === selectedAccount)?.bankName}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => {
                      setOtpStep(false)
                      setOtpCode("")
                      setError(null)
                    }}
                    className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors border border-border"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleVerifyOtp}
                    disabled={otpCode.length !== 6 || submitting}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-muted disabled:text-muted-foreground text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {submitting ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Verify & Request Payout"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CreatorPayouts
