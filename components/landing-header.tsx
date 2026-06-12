"use client"

import { motion } from "framer-motion"
import { ArrowRight, PlayCircle, Sparkles, Tv, Video, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function LandingHeader() {
  return (
    <section className="relative z-10 pt-20 pb-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-600/30 text-red-400 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>🚀 Now in Beta - Join the Revolution</span>
          </div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Left Column - Main Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-2 space-y-6 lg:space-y-8"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                  Stream. Create. Connect.
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Xonnect is the ultimate pay-on-demand platform for creators and audiences. Stream live events, upload
                premium videos, sell event tickets, and build your community. Experience the future of entertainment.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link
                href="/creator/signup"
                className="group bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 flex items-center justify-center sm:justify-start space-x-2 shadow-lg hover:shadow-red-600/25"
              >
                <span>Start Creating</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => (window.location.href = "/tutorial")}
                className="group bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 flex items-center justify-center sm:justify-start space-x-2 backdrop-blur-sm border border-white/20"
              >
                <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Watch Demo</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Feature Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4"
          >
            {[
              { icon: Tv, title: "Live Streams", desc: "HD quality events" },
              { icon: Video, title: "Premium Video", desc: "Monetize content" },
              { icon: Users, title: "Ticketing", desc: "Sell tickets" },
              { icon: Zap, title: "Creator Tools", desc: "Analytics & growth" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 sm:p-4 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600/20 rounded-lg flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-red-600/30 transition-colors">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                </div>
                <h3 className="text-sm sm:text-base font-bold">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-white/10"
        >
          {[
            { number: "10K+", label: "Creators" },
            { number: "1M+", label: "Members" },
            { number: "50M+", label: "Hours" },
            { number: "99.9%", label: "Uptime" },
          ].map((stat) => (
            <motion.div key={stat.label} whileHover={{ y: -5 }} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 mb-1 sm:mb-2">{stat.number}</div>
              <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
