"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Zap,
  Camera,
  Search,
  LogOut,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Ticket,
  Wifi,
  WifiOff,
  RefreshCcw,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock Ticket Data
const MOCK_TICKETS = [
  { id: "1", name: "Alice Johnson", ref: "TKT-001", status: "Valid" },
  { id: "2", name: "Bob Smith", ref: "TKT-002", status: "Checked-In" },
  { id: "3", name: "Charlie Brown", ref: "TKT-003", status: "Valid" },
]

export default function CheckInDashboard() {
  const router = useRouter()
  const [scanCount, setScanCount] = useState(0)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [scanResult, setScanResult] = useState<{ status: "success" | "already" | "invalid"; name?: string; ref?: string } | null>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [syncQueue, setSyncQueue] = useState<string[]>([])
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)

  // Simulation of online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleScan = (ticketRef: string) => {
    if (scanResult) return // Prevent multiple scans during reset

    const ticket = MOCK_TICKETS.find(t => t.ref === ticketRef)

    if (!ticket) {
      setScanResult({ status: "invalid" })
    } else if (ticket.status === "Checked-In") {
      setScanResult({ status: "already" })
    } else {
      setScanResult({ status: "success", name: ticket.name, ref: ticket.ref })
      setScanCount(prev => prev + 1)
      if (!isOnline) {
        setSyncQueue(prev => [...prev, ticket.ref])
      }
      // Update local mock status
      ticket.status = "Checked-In"
    }

    setTimeout(() => {
      setScanResult(null)
    }, 3000)
  }

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault()
    handleScan(searchQuery)
    setSearchQuery("")
  }

  const handleSignOut = () => {
    router.push("/checkin")
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-y-auto pointer-events-auto relative z-0">
      {/* Header */}
      <header className="border-b border-border p-4 bg-card flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold leading-none">Music Production Masterclass</h2>
            <p className="text-xs text-muted-foreground mt-1">Gate A • John Staff</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase ${isOnline ? "bg-green-600/10 text-green-500" : "bg-yellow-600/10 text-yellow-500"}`}>
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isOnline ? "Online" : "Offline Mode"}
          </div>
          <ThemeToggle />
          <button 
            onClick={() => setShowSignOutConfirm(true)}
            className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full space-y-8">
        {/* Scan Counter */}
        <div className="bg-card border border-border rounded-3xl p-8 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm mb-2">Valid Scans Today</p>
            <div className="text-7xl font-black text-red-600 tabular-nums">{scanCount}</div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <CheckCircle className="w-32 h-32 text-foreground" />
          </div>
        </div>

        {/* Scanner Viewfinder Area */}
        <div className="relative aspect-square bg-muted rounded-3xl overflow-hidden border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center group">
          {isCameraActive ? (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              {/* Simulated Camera Feed */}
              <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
              <div className="absolute w-64 h-64 border-2 border-red-600 rounded-2xl">
                <div className="absolute inset-0 border-t-4 border-red-600 animate-scan"></div>
              </div>
              <button 
                onClick={() => setIsCameraActive(false)}
                className="absolute bottom-8 bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full border border-white/20 hover:bg-white/20"
              >
                Close Camera
              </button>
            </div>
          ) : (
            <>
              <Camera className="w-16 h-16 text-muted-foreground mb-4" />
              <button
                onClick={() => setIsCameraActive(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-red-600/20 transition-all"
              >
                Activate Camera
              </button>
            </>
          )}

          {/* Scan Result Overlays */}
          {scanResult && (
            <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300 ${
              scanResult.status === "success" ? "bg-green-600" : "bg-red-600"
            } text-white`}>
              {scanResult.status === "success" ? (
                <>
                  <CheckCircle className="w-24 h-24 mb-6 animate-bounce" />
                  <h2 className="text-4xl font-black mb-2">{scanResult.name}</h2>
                  <p className="text-xl opacity-80">{scanResult.ref}</p>
                  <p className="mt-8 font-bold uppercase tracking-widest">Access Granted</p>
                </>
              ) : scanResult.status === "already" ? (
                <>
                  <AlertTriangle className="w-24 h-24 mb-6" />
                  <h2 className="text-4xl font-black mb-2">Already Checked In</h2>
                  <p className="text-xl opacity-80">This ticket has been used</p>
                  <p className="mt-8 font-bold uppercase tracking-widest">Access Denied</p>
                </>
              ) : (
                <>
                  <XCircle className="w-24 h-24 mb-6" />
                  <h2 className="text-4xl font-black mb-2">Invalid Ticket</h2>
                  <p className="text-xl opacity-80">No record found</p>
                  <p className="mt-8 font-bold uppercase tracking-widest">Access Denied</p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Manual Search */}
        <form onSubmit={handleManualSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search Name or Order #"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none transition-all shadow-sm"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
            >
              Search
            </button>
          </div>
        </form>

        {!isOnline && syncQueue.length > 0 && (
          <div className="bg-yellow-600/10 border border-yellow-600/20 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCcw className="w-5 h-5 text-yellow-500 animate-spin" />
              <p className="text-sm font-medium text-yellow-500">{syncQueue.length} scans waiting to sync...</p>
            </div>
          </div>
        )}
      </main>

      {/* Sign Out Confirmation */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowSignOutConfirm(false)} />
          <div className="relative bg-card border border-border w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Sign Out?</h2>
            <p className="text-muted-foreground mb-8">You will need to log in again to continue scanning.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-3 rounded-xl font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scan {
          from { top: 0%; }
          to { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  )
}
