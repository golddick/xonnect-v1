"use client"

import { useState } from "react"
import { X, Lock, CreditCard, Check } from "lucide-react"
import { motion } from "framer-motion"

interface PaymentOverlayProps {
  isPaid: boolean
  price: number
  title: string
  onClose?: () => void
}

const PaymentOverlay = ({ isPaid, price, title, onClose }: PaymentOverlayProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  if (!isPaid) return null

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsCompleted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Premium Content</h2>
          {onClose && (
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Content Info */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
            <Lock className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-sm text-gray-400">Locked Content</p>
              <p className="text-white font-semibold">{title}</p>
            </div>
          </div>
        </div>

        {/* Status */}
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center space-y-4 py-6"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">Payment Successful!</p>
              <p className="text-sm text-gray-400">You now have access to this content</p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Price */}
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold text-white">${price}</span>
              <span className="text-gray-400">one-time payment</span>
            </div>

            {/* Benefits */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <p className="text-sm font-semibold text-white">What you get:</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Instant access to this event</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>High-quality streaming</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>24-hour replay access</span>
                </li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>{isProcessing ? "Processing..." : "Complete Purchase"}</span>
              </button>
              <button className="w-full border border-white/20 hover:bg-white/10 text-white font-semibold py-3 rounded-lg transition-colors">
                Use Credit
              </button>
            </div>

            {/* Security Note */}
            <p className="text-xs text-gray-500 text-center">
              🔒 Secure payment powered by Stripe. Your payment information is encrypted.
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default PaymentOverlay
