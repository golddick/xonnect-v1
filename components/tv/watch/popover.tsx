"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BadgePercent, Lock, X } from "lucide-react"
import Link from "next/link"

type PurchaseType = "rent24" | "rent48" | "purchase"

type PurchaseOption = {
  type: PurchaseType
  label: string
  price: number | null
}

type WatchAccessPopoverProps = {
  title: string
  description: string
  accessCode: string
  accessCodePlaceholder: string
  onAccessCodeChange: (value: string) => void
  onUnlock: () => void
  isUnlocking: boolean
  message: string | null
  primaryActionLabel: string
  loggedIn: boolean
  showBuyerFields?: boolean
  buyerName?: string
  buyerEmail?: string
  buyerPhone?: string
  onBuyerNameChange?: (value: string) => void
  onBuyerEmailChange?: (value: string) => void
  onBuyerPhoneChange?: (value: string) => void
  purchaseOptions?: PurchaseOption[]
  onPurchase?: (purchaseType: PurchaseType) => void
  isPurchasing?: PurchaseType | null
  paymentAccessCode?: string
  paymentUrl?: string
  onUsePaymentCode?: () => void
  onContinueToPayment?: () => void
  secondaryActionLabel?: string
  secondaryActionHref?: string
  showAccessCodeInput?: boolean
  showGuestEmailPrompt?: boolean
  guestEmail?: string
  onGuestEmailChange?: (value: string) => void
  onGuestEmailSubmit?: () => void
  onDismiss?: () => void
}

const PURCHASE_LABELS: Record<PurchaseType, string> = {
  rent24: "Rent 24h",
  rent48: "Rent 48h",
  purchase: "Purchase",
}

export default function WatchAccessPopover({
  title,
  description,
  accessCode,
  accessCodePlaceholder,
  onAccessCodeChange,
  onUnlock,
  isUnlocking,
  message,
  primaryActionLabel,
  loggedIn,
  showBuyerFields = false,
  buyerName = "",
  buyerEmail = "",
  buyerPhone = "",
  onBuyerNameChange,
  onBuyerEmailChange,
  onBuyerPhoneChange,
  purchaseOptions = [],
  onPurchase,
  isPurchasing = null,
  paymentAccessCode,
  paymentUrl,
  onUsePaymentCode,
  onContinueToPayment,
  secondaryActionLabel,
  secondaryActionHref,
  showAccessCodeInput = true,
  showGuestEmailPrompt = false,
  guestEmail = "",
  onGuestEmailChange,
  onGuestEmailSubmit,
  onDismiss,
}: WatchAccessPopoverProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Lock className="h-4 w-4" />
          Purchase Access
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[min(100vw-2rem,32rem)] p-0 border-border/60"
        align="center"
        sideOffset={8}
      >
        <div className="w-full max-h-[min(92vh,44rem)] overflow-y-auto rounded-3xl bg-background/95 p-4 shadow-2xl sm:p-5 md:p-6 space-y-4 overscroll-contain">
          {/* Header */}
          <div className="flex items-start gap-3 sm:items-center">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-red-600/15 text-red-500">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 flex-1 hidden lg:block">
              <p className="text-sm font-semibold text-foreground leading-tight">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{description}</p>
            </div>
            {onDismiss ? (
              <button
                type="button"
                onClick={onDismiss}
                className="inline-flex h-2.5 w-2.5 lg:h-9 lg:w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                aria-label="Close access prompt"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-2.5 w-2.5 lg:h-9 lg:w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                aria-label="Close access prompt"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Access Code Input */}
          {showAccessCodeInput ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="space-y-1.5 text-sm w-full">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                  Access code
                </span>
                <input
                  value={accessCode}
                  onChange={(event) => onAccessCodeChange(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault()
                      onUnlock()
                    }
                  }}
                  placeholder={accessCodePlaceholder}
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3.5 sm:py-3 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck={false}
                  autoFocus
                />
              </label>

              <button
                type="button"
                onClick={onUnlock}
                className="w-full rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] sm:w-auto sm:min-w-[128px] sm:py-3"
                disabled={isUnlocking}
              >
                {isUnlocking ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span className="hidden lg:block"> Checking... </span>
                  </span>
                ) : (
                  primaryActionLabel
                )}
              </button>
            </div>
          ) : (
            <div className="hidden lg:block rounded-xl border border-border/60 bg-muted/20 p-3.5 sm:p-4 text-sm text-muted-foreground leading-relaxed">
              You're signed in. We'll verify your purchase automatically and unlock this video as soon as access is available.
            </div>
          )}

          {/* Guest email prompt */}
          {showGuestEmailPrompt && !loggedIn && (
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 sm:p-4 space-y-3">
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-foreground">Continue with your email</p>
                <p className="text-sm text-muted-foreground">We only need your email address to start checkout. We'll use it to create your display name.</p>
              </div>
              <label className="space-y-1.5 text-sm block">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Email</span>
                <input
                  value={guestEmail}
                  onChange={(event) => onGuestEmailChange?.(event.target.value)}
                  placeholder="Email address"
                  type="email"
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3.5 sm:py-3 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                />
              </label>
              <button
                type="button"
                onClick={onGuestEmailSubmit}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
              >
                Continue to payment
              </button>
            </div>
          )}

          {/* Purchase Options */}
          {purchaseOptions.length > 0 && onPurchase && (
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {purchaseOptions.map((option) => {
                const isDisabled =
                  isPurchasing !== null ||
                  option.price === null ||
                  option.price === undefined ||
                  option.price <= 0

                return (
                  <button
                    key={option.type}
                    type="button"
                    onClick={() => {
                      if (isDisabled) return
                      onPurchase(option.type)
                    }}
                    className="rounded-xl border border-border px-4 py-3.5 sm:py-3 text-left transition-all hover:border-red-600/60 hover:bg-red-600/5 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-background"
                    disabled={isDisabled}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-foreground">
                        {PURCHASE_LABELS[option.type]}
                      </span>
                      <BadgePercent className="h-4 w-4 text-muted-foreground shrink-0" />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {option.price && option.price > 0
                        ? `₦${Number(option.price).toLocaleString()}`
                        : "Unavailable"}
                    </p>
                  </button>
                )
              })}
            </div>
          )}

          {/* Secondary Action */}
          {secondaryActionHref && secondaryActionLabel && (
            <Link
              href={secondaryActionHref}
              className="inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-6 py-3.5 sm:py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors active:scale-[0.98]"
            >
              {secondaryActionLabel}
            </Link>
          )}

          {/* No Purchase Options Message */}
          {purchaseOptions.length > 0 &&
            onPurchase &&
            purchaseOptions.every((option) => !option.price || option.price <= 0) && (
              <p className="text-sm text-muted-foreground text-center py-2">
                No purchase options are currently available.
              </p>
            )}

          {/* Payment Code Section */}
          {/* {paymentAccessCode && (
            <div className="rounded-xl border border-red-600/30 bg-red-600/10 p-4 space-y-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Payment code</p>
                <p className="mt-1 text-sm text-muted-foreground break-all font-mono bg-muted/30 px-3 py-2 rounded-lg">
                  {paymentAccessCode}
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => onContinueToPayment?.()}
                  className="rounded-lg bg-red-600 px-5 py-3 sm:py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors active:scale-[0.98] w-full sm:w-auto"
                >
                  Continue to payment
                </button>
                <button
                  type="button"
                  onClick={() => onUsePaymentCode?.()}
                  className="rounded-lg border border-border px-5 py-3 sm:py-2.5 text-sm font-semibold text-foreground hover:border-red-600/60 hover:bg-red-600/5 transition-colors active:scale-[0.98] w-full sm:w-auto"
                >
                  Use code here
                </button>
              </div>
            </div>
          )} */}

          {/* Message */}
          {message && (
            <p className="text-sm text-muted-foreground text-center bg-muted/30 px-4 py-2.5 rounded-xl">
              {message}
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}