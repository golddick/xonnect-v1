"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import Link from "next/link"
import { Lock } from "lucide-react"

import AuthLayout from "@/components/auth-layout"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/password/set", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const payload = (await response.json()) as { error?: string }
      if (!response.ok) {
        throw new Error(payload.error || "Unable to set password")
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to set password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title="Set a password" subtitle="Add password login later if you want it">
      {!success ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/60" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
                className="w-full rounded-xl border border-border bg-background px-10 py-3 text-foreground outline-none transition focus:border-foreground/30"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/60" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm password"
                className="w-full rounded-xl border border-border bg-background px-10 py-3 text-foreground outline-none transition focus:border-foreground/30"
                required
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-foreground px-4 py-3 font-semibold text-background transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Saving..." : "Save password"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            <Link href="/auth/login" className="font-medium text-foreground underline-offset-4 hover:underline">
              Back to login
            </Link>
          </p>
        </form>
      ) : (
        <div className="space-y-4 text-center">
          <div className="rounded-2xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            Password saved successfully.
          </div>
          <Link
            href="/dashboard"
            className="block rounded-xl bg-foreground px-4 py-3 font-semibold text-background transition hover:opacity-90"
          >
            Go to dashboard
          </Link>
        </div>
      )}
    </AuthLayout>
  )
}
