"use client"

import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Lock, LogIn, User, Zap } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CheckInLogin() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    let active = true

    async function loadSession() {
      try {
        const response = await fetch("/api/checkin/session", { cache: "no-store" })
        if (response.ok && active) {
          router.replace("/checkin/dashboard")
        }
      } catch {
        // No active session.
      } finally {
        if (active) setBooting(false)
      }
    }

    void loadSession()

    return () => {
      active = false
    }
  }, [router])

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/checkin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      const data = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(data.message ?? "Invalid credentials")
      }

      router.replace("/checkin/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in")
    } finally {
      setLoading(false)
    }
  }

  if (booting) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-10">
        <div className="w-full rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-semibold">Check-in access</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in with the credentials issued to your gate.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username or email</label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="username"
                  className="pl-9"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="password"
                  type="password"
                  className="pl-9"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
