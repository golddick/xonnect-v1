// "use client"

// import Link from "next/link"
// import { BadgePercent, Lock } from "lucide-react"

// type PurchaseType = "rent24" | "rent48" | "purchase"

// type PurchaseOption = {
//   type: PurchaseType
//   label: string
//   price: number | null
// }

// type WatchAccessOverlayProps = {
//   title: string
//   description: string
//   accessCode: string
//   accessCodePlaceholder: string
//   onAccessCodeChange: (value: string) => void
//   onUnlock: () => void
//   isUnlocking: boolean
//   message: string | null
//   primaryActionLabel: string
//   loggedIn: boolean
//   showBuyerFields?: boolean
//   buyerName?: string
//   buyerEmail?: string
//   buyerPhone?: string
//   onBuyerNameChange?: (value: string) => void
//   onBuyerEmailChange?: (value: string) => void
//   onBuyerPhoneChange?: (value: string) => void
//   purchaseOptions?: PurchaseOption[]
//   onPurchase?: (purchaseType: PurchaseType) => void
//   isPurchasing?: PurchaseType | null
//   paymentAccessCode?: string
//   paymentUrl?: string
//   onUsePaymentCode?: () => void
//   onContinueToPayment?: () => void
//   secondaryActionLabel?: string
//   secondaryActionHref?: string
//   showAccessCodeInput?: boolean
// }

// const PURCHASE_LABELS: Record<PurchaseType, string> = {
//   rent24: "Rent 24h",
//   rent48: "Rent 48h",
//   purchase: "Purchase",
// }

// export default function WatchAccessOverlay({
//   title,
//   description,
//   accessCode,
//   accessCodePlaceholder,
//   onAccessCodeChange,
//   onUnlock,
//   isUnlocking,
//   message,
//   primaryActionLabel,
//   loggedIn,
//   showBuyerFields = false,
//   buyerName = "",
//   buyerEmail = "",
//   buyerPhone = "",
//   onBuyerNameChange,
//   onBuyerEmailChange,
//   onBuyerPhoneChange,
//   purchaseOptions = [],
//   onPurchase,
//   isPurchasing = null,
//   paymentAccessCode,
//   paymentUrl,
//   onUsePaymentCode,
//   onContinueToPayment,
//   secondaryActionLabel,
//   secondaryActionHref,
//   showAccessCodeInput = true,
// }: WatchAccessOverlayProps) {
//   return (
//     <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/72 backdrop-blur-sm p-4">
//       <div className="w-full max-w-xl rounded-2xl border border-border bg-background/95 p-4 md:p-6 space-y-4 shadow-2xl">
//         <div className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600/15 text-red-500">
//             <Lock className="h-5 w-5" />
//           </div>
//           <div>
//             <p className="text-sm font-semibold text-foreground">{title}</p>
//             <p className="text-xs text-muted-foreground">{description}</p>
//           </div>
//         </div>

//         {showAccessCodeInput ? (
//           <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
//             <label className="space-y-2 text-sm">
//               <span className="text-muted-foreground">Access code</span>
//               <input
//                 value={accessCode}
//                 onChange={(event) => onAccessCodeChange(event.target.value)}
//                 placeholder={accessCodePlaceholder}
//                 className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
//               />
//             </label>

//             <button
//               type="button"
//               onClick={onUnlock}
//               className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-foreground hover:bg-red-700 disabled:opacity-50"
//               disabled={isUnlocking}
//             >
//               {isUnlocking ? "Checking..." : primaryActionLabel}
//             </button>
//           </div>
//         ) : (
//           <div className="rounded-xl border border-border/60 bg-muted/20 p-3 text-sm text-muted-foreground">
//             You’re signed in. We’ll verify your purchase automatically and unlock this video as soon as access is available.
//           </div>
//         )}

//         {showBuyerFields && !loggedIn && (
//           <>
//             <div className="grid gap-3 md:grid-cols-3">
//               <label className="space-y-2 text-sm">
//                 <span className="text-muted-foreground">Name</span>
//                 <input
//                   value={buyerName}
//                   onChange={(event) => onBuyerNameChange?.(event.target.value)}
//                   placeholder="Buyer name"
//                   className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
//                 />
//               </label>
//               <label className="space-y-2 text-sm md:col-span-2">
//                 <span className="text-muted-foreground">Email</span>
//                 <input
//                   value={buyerEmail}
//                   onChange={(event) => onBuyerEmailChange?.(event.target.value)}
//                   placeholder="Buyer email"
//                   type="email"
//                   className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
//                 />
//               </label>
//             </div>

 
//           </>
//         )}

//         {purchaseOptions.length > 0 && onPurchase && (
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//             {purchaseOptions.map((option) => (
//               <button
//                 key={option.type}
//                 type="button"
//                 onClick={() => {
//                   if (option.price === null || option.price === undefined || option.price <= 0) return
//                   onPurchase(option.type)
//                 }}
//                 className="rounded-xl border border-border px-4 py-3 text-left transition-colors hover:border-red-600/60 disabled:cursor-not-allowed disabled:opacity-50"
//                 disabled={
//                   isPurchasing !== null || option.price === null || option.price === undefined || option.price <= 0
//                 }
//               >
//                 <div className="flex items-center justify-between gap-3">
//                   <span className="text-sm font-semibold text-foreground">{PURCHASE_LABELS[option.type]}</span>
//                   <BadgePercent className="h-4 w-4 text-muted-foreground" />
//                 </div>
//                 <p className="mt-1 text-xs text-muted-foreground">
//                   {option.price && option.price > 0 ? `NGN ${Number(option.price).toLocaleString()}` : "Unavailable"}
//                 </p>
//               </button>
//             ))}
//           </div>
//         )}

//         {secondaryActionHref && secondaryActionLabel && (
//           <Link
//             href={secondaryActionHref}
//             className="inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-foreground hover:bg-red-700"
//           >
//             {secondaryActionLabel}
//           </Link>
//         )}

//         {purchaseOptions.length > 0 &&
//           onPurchase &&
//           purchaseOptions.every((option) => !option.price || option.price <= 0) && (
//             <p className="text-sm text-muted-foreground">No purchase options are currently available.</p>
//           )}

//         {paymentAccessCode && (
//           <div className="rounded-xl border border-red-600/30 bg-red-600/10 p-4">
//             <p className="text-sm font-semibold text-foreground">Payment code</p>
//             <p className="mt-1 text-sm text-muted-foreground break-all">{paymentAccessCode}</p>
//             <div className="mt-3 flex flex-wrap gap-2">
//               <button
//                 type="button"
//                 onClick={() => onContinueToPayment?.()}
//                 className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-foreground hover:bg-red-700"
//               >
//                 Continue to payment
//               </button>
//               <button
//                 type="button"
//                 onClick={() => onUsePaymentCode?.()}
//                 className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-red-600/60"
//               >
//                 Use code here
//               </button>
//             </div>
//           </div>
//         )}

//         {message && <p className="text-sm text-muted-foreground">{message}</p>}
//       </div>
//     </div>
//   )
// }








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
  showAccessCodeInput?: boolean
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
  showAccessCodeInput = true,
}: WatchAccessOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/72 backdrop-blur-sm p-3 sm:p-4">
      <div className="w-full max-w-xl rounded-2xl border border-border/50 bg-background/95 p-4 sm:p-5 md:p-6 space-y-4 shadow-2xl max-h-[98vh] overflow-y-auto overscroll-contain">
        {/* Header */}
        <div className="flex items-start gap-3 sm:items-center">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-red-600/15 text-red-500">
            <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground leading-tight">{title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{description}</p>
          </div>
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
                placeholder={accessCodePlaceholder}
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3.5 sm:py-3 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
              />
            </label>

            <button
              type="button"
              onClick={onUnlock}
              className="rounded-xl bg-red-600 px-6 py-3.5 sm:py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-[0.98] w-full sm:w-auto sm:min-w-[120px]"
              disabled={isUnlocking}
            >
              {isUnlocking ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Checking...
                </span>
              ) : (
                primaryActionLabel
              )}
            </button>
          </div>
        ) : (
          <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 sm:p-4 text-sm text-muted-foreground leading-relaxed">
            You're signed in. We'll verify your purchase automatically and unlock this video as soon as access is available.
          </div>
        )}

        {/* Buyer Fields */}
        {showBuyerFields && !loggedIn && (
          <div className="space-y-3">
            <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3">
              <label className="space-y-1.5 text-sm">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Name</span>
                <input
                  value={buyerName}
                  onChange={(event) => onBuyerNameChange?.(event.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3.5 sm:py-3 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                />
              </label>
              <label className="space-y-1.5 text-sm sm:col-span-2">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Email</span>
                <input
                  value={buyerEmail}
                  onChange={(event) => onBuyerEmailChange?.(event.target.value)}
                  placeholder="Email address"
                  type="email"
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3.5 sm:py-3 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                />
              </label>
            </div>
            <label className="space-y-1.5 text-sm">
              <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Phone (optional)</span>
              <input
                value={buyerPhone}
                onChange={(event) => onBuyerPhoneChange?.(event.target.value)}
                placeholder="Phone number"
                type="tel"
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3.5 sm:py-3 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
              />
            </label>
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
        {paymentAccessCode && (
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
        )}

        {/* Message */}
        {message && (
          <p className="text-sm text-muted-foreground text-center bg-muted/30 px-4 py-2.5 rounded-xl">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}