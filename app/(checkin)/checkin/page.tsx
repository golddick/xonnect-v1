"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Zap, Lock, User, AlertCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CheckInLogin() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Demo Logic
    setTimeout(() => {
      if (username === "deactivated") {
        setError("This account has been deactivated.")
      } else if (username === "staff" && password === "password") {
        router.push("/checkin/dashboard")
      } else {
        setError("Invalid credentials.")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute top-8 right-8">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-600/20">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Xonnect Staff</h1>
          <p className="text-muted-foreground mt-2">Event Check-In System</p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-muted/50 border border-border p-3 pl-10 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-all"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-muted/50 border border-border p-3 pl-10 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-all"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-600/10 border border-red-600/20 text-red-500 p-3 rounded-xl flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/20"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </div>
  )
}
