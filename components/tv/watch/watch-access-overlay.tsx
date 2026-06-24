"use client"

import Link from "next/link"
import { BadgePercent, Lock } from "lucide-react"

type PurchaseType = "rent24" | "rent48" | "purchase"

type PurchaseOption = {
  type: PurchaseType
  label: string
  price: number | null
}

type WatchAccessOverlayProps = {
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
}

const PURCHASE_LABELS: Record<PurchaseType, string> = {
  rent24: "Rent 24h",
  rent48: "Rent 48h",
  purchase: "Purchase",
}

export default function WatchAccessOverlay({
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
}: WatchAccessOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/72 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-background/95 p-4 md:p-6 space-y-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600/15 text-red-500">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <label className="space-y-2 text-sm">
            <span className="text-muted-foreground">Access code</span>
            <input
              value={accessCode}
              onChange={(event) => onAccessCodeChange(event.target.value)}
              placeholder={accessCodePlaceholder}
              className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </label>

          <button
            type="button"
            onClick={onUnlock}
            className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-foreground hover:bg-red-700 disabled:opacity-50"
            disabled={isUnlocking}
          >
            {isUnlocking ? "Checking..." : primaryActionLabel}
          </button>
        </div>

        {showBuyerFields && !loggedIn && (
          <>
            <div className="grid gap-3 md:grid-cols-3">
              <label className="space-y-2 text-sm">
                <span className="text-muted-foreground">Name</span>
                <input
                  value={buyerName}
                  onChange={(event) => onBuyerNameChange?.(event.target.value)}
                  placeholder="Buyer name"
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </label>
              <label className="space-y-2 text-sm md:col-span-2">
                <span className="text-muted-foreground">Email</span>
                <input
                  value={buyerEmail}
                  onChange={(event) => onBuyerEmailChange?.(event.target.value)}
                  placeholder="Buyer email"
                  type="email"
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm block">
              <span className="text-muted-foreground">Phone number</span>
              <input
                value={buyerPhone}
                onChange={(event) => onBuyerPhoneChange?.(event.target.value)}
                placeholder="Optional phone number"
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </label>
          </>
        )}

        {purchaseOptions.length > 0 && onPurchase && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {purchaseOptions.map((option) => (
              <button
                key={option.type}
                type="button"
                onClick={() => {
                  if (option.price === null || option.price === undefined || option.price <= 0) return
                  onPurchase(option.type)
                }}
                className="rounded-xl border border-border px-4 py-3 text-left transition-colors hover:border-red-600/60 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={
                  isPurchasing !== null || option.price === null || option.price === undefined || option.price <= 0
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-foreground">{PURCHASE_LABELS[option.type]}</span>
                  <BadgePercent className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {option.price && option.price > 0 ? `NGN ${Number(option.price).toLocaleString()}` : "Unavailable"}
                </p>
              </button>
            ))}
          </div>
        )}

        {secondaryActionHref && secondaryActionLabel && (
          <Link
            href={secondaryActionHref}
            className="inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-foreground hover:bg-red-700"
          >
            {secondaryActionLabel}
          </Link>
        )}

        {purchaseOptions.length > 0 &&
          onPurchase &&
          purchaseOptions.every((option) => !option.price || option.price <= 0) && (
            <p className="text-sm text-muted-foreground">No purchase options are currently available.</p>
          )}

        {paymentAccessCode && (
          <div className="rounded-xl border border-red-600/30 bg-red-600/10 p-4">
            <p className="text-sm font-semibold text-foreground">Payment code</p>
            <p className="mt-1 text-sm text-muted-foreground break-all">{paymentAccessCode}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onContinueToPayment?.()}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-foreground hover:bg-red-700"
              >
                Continue to payment
              </button>
              <button
                type="button"
                onClick={() => onUsePaymentCode?.()}
                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-red-600/60"
              >
                Use code here
              </button>
            </div>
          </div>
        )}

        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  )
}
