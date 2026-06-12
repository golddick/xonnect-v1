"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react"

import AuthLayout from "@/components/auth-layout"

export default function SuperadminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/superadmin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const payload = (await response.json()) as {
        error?: string
        loginToken?: string
      }

      if (!response.ok || !payload.loginToken) {
        throw new Error(payload.error || "Unable to sign in")
      }

      const result = await signIn("credentials", {
        email,
        loginToken: payload.loginToken,
        redirect: false,
        callbackUrl: "/superadmin/dashboard",
      })

      if (result?.error) {
        throw new Error("Unable to complete the privileged sign-in")
      }

      router.push("/superadmin/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Superadmin access"
      subtitle="Use an admin or superadmin account to reach the privileged dashboard"
    >
      <div className="mb-6 rounded-2xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 text-foreground">
          <ShieldCheck className="h-4 w-4" />
          <span className="font-medium">Privileged sign-in</span>
        </div>
        <p className="mt-2">
          Admin and superadmin accounts can access the dashboard here. Normal user login stays unchanged.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/60" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@xonnect.com"
              className="w-full rounded-xl border border-border bg-background px-10 py-3 text-foreground outline-none transition focus:border-foreground/30"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/60" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-border bg-background px-10 py-3 pr-10 text-foreground outline-none transition focus:border-foreground/30"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-muted-foreground/60 transition hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
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
          {isLoading ? "Signing in..." : "Enter dashboard"}
        </button>

        <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
          <Link href="/auth/forgot-password" className="font-medium text-foreground underline-offset-4 hover:underline">
            Reset password
          </Link>
          <Link href="/auth/login" className="font-medium text-foreground underline-offset-4 hover:underline">
            Normal login
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
