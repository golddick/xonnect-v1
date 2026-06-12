"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { Mail, User } from "lucide-react"

import AuthLayout from "@/components/auth-layout"

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ fullName, email }),
      })

      const payload = (await response.json()) as { error?: string }
      if (!response.ok) {
        throw new Error(payload.error || "Unable to create your account")
      }

      const result = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/profile?welcome=1",
      })

      if (result?.error) {
        throw new Error("Unable to send the magic link")
      }

      router.push("/auth/login?magicLink=sent")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign up")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title="Create account" subtitle="No password required to get started">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/60" />
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="John Doe"
              className="w-full rounded-xl border border-border bg-background px-10 py-3 text-foreground outline-none transition focus:border-foreground/30"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/60" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
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
          {isLoading ? "Creating account..." : "Create account"}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-foreground underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
