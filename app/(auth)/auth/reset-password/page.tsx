"use client"

import type { FormEvent } from "react"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Lock } from "lucide-react"

import AuthLayout from "@/components/auth-layout"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const passwordValue = passwordRef.current?.value ?? ""
    const confirmPasswordValue = confirmPasswordRef.current?.value ?? ""
    setError("")

    if (passwordValue !== confirmPasswordValue) {
      setError("Passwords do not match")
      return
    }

    if (passwordValue.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/password/reset/complete", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password: passwordValue }),
      })

      const payload = (await response.json()) as { error?: string }
      if (!response.ok) {
        throw new Error(payload.error || "Unable to reset password")
      }

      router.push("/auth/login?passwordReset=success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reset password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title="Choose a new password" subtitle="Your verification code was accepted">
      <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="new-password" className="block text-sm font-medium text-muted-foreground">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/60" />
              <input
                ref={passwordRef}
                id="new-password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                placeholder="Create a password"
                className="w-full rounded-xl border border-border bg-background px-10 py-3 text-foreground outline-none transition focus:border-foreground/30"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-muted-foreground">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/60" />
              <input
                ref={confirmPasswordRef}
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                minLength={8}
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
            {isLoading ? "Saving..." : "Reset password"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            <Link href="/auth/forgot-password" className="font-medium text-foreground underline-offset-4 hover:underline">
              Request another verification code
            </Link>
          </p>
      </form>
    </AuthLayout>
  )
}
