"use client"

import { motion } from "framer-motion"

export default function LoadingSplash() {
  return (
    // <div className="fixed inset-0  flex items-center justify-center bg-black/95 backdrop-blur-sm">
    <div className="min-h-screen bg-background p-4 md:p-6 flex items-center justify-center">
      <div className="relative">
        {/* Simple rotating ring */}
        <motion.div
          className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* XONNECT text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        >
          <span className="text-foreground text-sm font-semibold tracking-wider">XONNECT</span>
        </motion.div>
      </div>
    </div>
  )
}
