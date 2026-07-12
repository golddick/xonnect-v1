"use client"

import type { FormEvent } from "react"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react"

import AuthLayout from "@/components/auth-layout"

type LookupResult = {
  exists: boolean
  hasPassword: boolean
  emailVerified: boolean
  fullName: string | null
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"email" | "password" | "otp">("email")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [fullName, setFullName] = useState<string | null>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const otpRef = useRef<HTMLInputElement>(null)

  const lookupAccount = async (value: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: value }),
    })

    const data = (await response.json()) as LookupResult & { error?: string }
    if (!response.ok) {
      throw new Error(data.error || "Unable to check account")
    }

    return data
  }

  const handleEmailSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const emailValue = emailRef.current?.value.trim() ?? ""
    setEmail(emailValue)
    setError("")
    setIsLoading(true)

    try {
      const result = await lookupAccount(emailValue)
      if (!result.exists) {
        setError("No account found for that email. Create one from the signup page.")
        return
      }

      setFullName(result.fullName)
      if (result.hasPassword) {
        setStep("password")
      } else {
        const sendResponse = await fetch("/api/auth/otp/send", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: emailValue }),
        })

        if (!sendResponse.ok) {
          const payload = await sendResponse.json()
          throw new Error(payload.error || "Unable to send OTP")
        }

        setStep("otp")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to continue")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordLogin = async (event: FormEvent) => {
    event.preventDefault()
    const passwordValue = passwordRef.current?.value ?? ""
    setError("")
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password: passwordValue,
        redirect: false,
        callbackUrl: "/tv?welcomeBack=1",
      })

      if (result?.error) {
        throw new Error("Incorrect email or password")
      }

      router.push("/tv?welcomeBack=1")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpLogin = async (event: FormEvent) => {
    event.preventDefault()
    const otpValue = otpRef.current?.value ?? ""
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, code: otpValue }),
      })

      const payload = (await response.json()) as { error?: string; loginToken?: string }
      if (!response.ok || !payload.loginToken) {
        throw new Error(payload.error || "Invalid OTP")
      }

      const result = await signIn("credentials", {
        email,
        loginToken: payload.loginToken,
        redirect: false,
        callbackUrl: "/tv?welcomeBack=1",
      })

      if (result?.error) {
        throw new Error("OTP sign-in failed")
      }

      router.push("/tv?welcomeBack=1")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to verify OTP")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Use email first, then password or OTP depending on your account state"
    >
     

      {step === "email" && (
        <form onSubmit={handleEmailSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/60" />
              <input
                ref={emailRef}
                type="email"
                defaultValue={email}
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
            {isLoading ? "Checking account..." : "Continue"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link href="/auth/signup" className="font-medium text-foreground underline-offset-4 hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      )}

      {step === "password" && (
        <form onSubmit={handlePasswordLogin} className="space-y-5">
          <div className="rounded-2xl border border-border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="mt-1 font-medium text-foreground">{fullName || email}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/60" />
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-border bg-background px-10 py-3 text-foreground outline-none transition focus:border-foreground/30"
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
            {isLoading ? "Signing in..." : "Sign in with password"}
          </button>

          <button
            type="button"
            onClick={() => setStep("email")}
            className="w-full rounded-xl border border-border px-4 py-3 font-semibold text-foreground transition hover:bg-muted"
          >
            Change email
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleOtpLogin} className="space-y-5">
          <div className="rounded-2xl border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              <span>OTP sent to {email}</span>
            </div>
            <p className="mt-2 font-medium text-foreground">{fullName || "Your account"}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">One-time code</label>
            <input
              ref={otpRef}
              type="text"
              inputMode="numeric"
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
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={() => setStep("email")}
            className="w-full rounded-xl border border-border px-4 py-3 font-semibold text-foreground transition hover:bg-muted"
          >
            Use another email
          </button>
        </form>
      )}
    </AuthLayout>
  )
}
