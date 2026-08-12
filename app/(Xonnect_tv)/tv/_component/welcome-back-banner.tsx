"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"

type WelcomeBackBannerProps = {
  userName?: string | null
  visible?: boolean
  duration?: number
  className?: string
}

export default function WelcomeBackBanner({
  userName,
  visible = true,
  duration = 4000,
  className = "",
}: WelcomeBackBannerProps) {
  const [isVisible, setIsVisible] = useState(Boolean(visible && userName))

  useEffect(() => {
    if (!visible || !userName) {
      setIsVisible(false)
      return
    }

    setIsVisible(true)

    const timer = window.setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => window.clearTimeout(timer)
  }, [duration, userName, visible])

  if (!isVisible || !userName) return null

  return (
    <div
      className={`relative rounded-3xl border border-red-200 bg-red-600/10 p-4 text-sm text-foreground shadow-sm ${className}`}
      aria-live="polite"
    >
      <button
        type="button"
        aria-label="Close welcome message"
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition hover:bg-red-500/20 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="pr-8">
        <p className="font-semibold">Welcome back, {userName}!</p>
        <p className="text-muted-foreground">Your TV home is ready.</p>
      </div>
    </div>
  )
}
