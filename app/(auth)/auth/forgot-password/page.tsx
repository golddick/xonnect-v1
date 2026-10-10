"use client"

import type { FormEvent } from "react"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, ShieldCheck } from "lucide-react"

import AuthLayout from "@/components/auth-layout"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null)
  const codeRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"email" | "code">("email")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRequestCode = async (event: FormEvent) => {
    event.preventDefault()
    const emailValue = emailRef.current?.value.trim().toLowerCase() ?? ""
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/password/reset/request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: emailValue }),
      })
      const payload = (await response.json()) as { error?: string }
      if (!response.ok) {
        throw new Error(payload.error || "Unable to send a verification code")
      }

      setEmail(emailValue)
      setStep("code")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send a verification code")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (event: FormEvent) => {
    event.preventDefault()
    const code = codeRef.current?.value.trim() ?? ""
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/password/reset/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, code }),
      })
      const payload = (await response.json()) as { error?: string }
      if (!response.ok) {
        throw new Error(payload.error || "Unable to verify the code")
      }

      router.push("/auth/reset-password")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to verify the code")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle={step === "email" ? "Verify your email to choose a new password" : "Enter the code sent to your email"}
    >
      {step === "email" ? (
        <form onSubmit={handleRequestCode} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="reset-email" className="block text-sm font-medium text-muted-foreground">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/60" />
              <input
                ref={emailRef}
                id="reset-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-background px-10 py-3 text-foreground outline-none transition focus:border-foreground/30"
                required
              />
            </div>
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            If the email belongs to an account that can sign in with a password, we&apos;ll send a verification code.
          </p>

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
            {isLoading ? "Sending code..." : "Send verification code"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            <Link href="/auth/login" className="font-medium text-foreground underline-offset-4 hover:underline">
              Back to login
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-5">
          <div className="rounded-2xl bg-muted/30 p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              <span>Verification code sent to {email}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="reset-code" className="block text-sm font-medium text-muted-foreground">
              Verification code
            </label>
            <input
              ref={codeRef}
              id="reset-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="123456"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-center text-lg tracking-[0.4em] text-foreground outline-none transition focus:border-foreground/30"
              maxLength={6}
              required
            />
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
            {isLoading ? "Verifying..." : "Verify code"}
          </button>

          <button
            type="button"
            onClick={() => {
              setError("")
              setStep("email")
            }}
            className="w-full rounded-xl border border-border px-4 py-3 font-semibold text-foreground transition hover:bg-muted"
          >
            Use another email
          </button>
        </form>
      )}
    </AuthLayout>
  )
}
