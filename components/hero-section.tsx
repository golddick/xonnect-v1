"use client"

import { motion } from "framer-motion"
import { ArrowRight, PlayCircle, Sparkles, Globe, Zap, Users, Tv } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative z-10 pt-20 pb-32 px-4 sm:px-6 md:px-8">
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

        {/* Main Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-white via-gray-100 to-red-500 bg-clip-text text-transparent">
                  Experience the World, Without Missing a Moment
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                Xonnect brings the world's experiences to you so you never miss out. Discover entertainment, events, and
                live moments from across the globe — all in one place.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link
                href="/creator/signup"
                className="group bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-red-600/50"
              >
                <span>Start Watching</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => (window.location.href = "/features")}
                className="group bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm border border-white/20 hover:border-white/30"
              >
                <span>Explore Features</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Highlight Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xs sm:text-sm text-gray-400 flex items-center space-x-2 pt-2"
            >
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>Built for creators. Designed for viewers. Powered by global connection.</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Premium Tech Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 sm:h-[500px] hidden lg:flex items-center justify-center"
          >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-full blur-3xl"></div>

            {/* Glowing World Map Container */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute w-64 h-64 rounded-full border-2 border-red-500/30 flex items-center justify-center"
            >
              <Globe className="w-32 h-32 text-red-500/40" />
            </motion.div>

            {/* Connection Lines - City Nodes */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Connection lines */}
              <motion.line x1="100" y1="100" x2="300" y2="150" stroke="url(#lineGrad)" strokeWidth="2" opacity="0.6" />
              <motion.line x1="150" y1="80" x2="280" y2="220" stroke="url(#lineGrad)" strokeWidth="2" opacity="0.6" />
              <motion.line x1="120" y1="280" x2="320" y2="200" stroke="url(#lineGrad)" strokeWidth="2" opacity="0.6" />

              {/* Animated dots for cities */}
              <motion.circle
                cx="100"
                cy="100"
                r="4"
                fill="#ef4444"
                animate={{ r: [4, 6, 4] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.circle
                cx="300"
                cy="150"
                r="4"
                fill="#ef4444"
                animate={{ r: [4, 6, 4] }}
                transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.circle
                cx="280"
                cy="220"
                r="4"
                fill="#8b5cf6"
                animate={{ r: [4, 6, 4] }}
                transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.circle
                cx="120"
                cy="280"
                r="4"
                fill="#ef4444"
                animate={{ r: [4, 6, 4] }}
                transition={{ duration: 2.1, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.circle
                cx="320"
                cy="200"
                r="4"
                fill="#8b5cf6"
                animate={{ r: [4, 6, 4] }}
                transition={{ duration: 2.3, repeat: Number.POSITIVE_INFINITY }}
              />
            </svg>

            {/* Floating Content Screens */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="absolute top-8 left-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 w-28 text-center"
            >
              <Tv className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-xs text-gray-300 font-semibold">Live Concerts</p>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              className="absolute top-32 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 w-28 text-center"
            >
              <Zap className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-xs text-gray-300 font-semibold">Sports Events</p>
            </motion.div>

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
              className="absolute bottom-12 left-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 w-28 text-center"
            >
              <Users className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-xs text-gray-300 font-semibold">Education</p>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
              className="absolute bottom-20 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 w-28 text-center"
            >
              <PlayCircle className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-xs text-gray-300 font-semibold">Entertainment</p>
            </motion.div>

            {/* Floating Red Bubbles */}
            <motion.div
              animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              className="absolute w-3 h-3 bg-red-500/60 rounded-full blur-sm top-12 left-12"
            ></motion.div>
            <motion.div
              animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              className="absolute w-4 h-4 bg-red-500/40 rounded-full blur-sm bottom-20 right-16"
            ></motion.div>
            <motion.div
              animate={{ x: [0, 25, 0], y: [0, 15, 0] }}
              transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
              className="absolute w-2 h-2 bg-red-500/50 rounded-full blur-sm top-1/3 right-1/4"
            ></motion.div>

            {/* Futuristic Dashboard UI */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 w-64 shadow-2xl"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Live Streams</span>
                  <span className="text-xs text-red-500 font-semibold">+2.5K</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: ["0%", "85%", "0%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    className="h-full bg-gradient-to-r from-red-500 to-purple-500"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
