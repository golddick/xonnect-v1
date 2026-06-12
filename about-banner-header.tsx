"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface AboutBannerHeaderProps {
  title?: string
  subtitle?: string
  description?: string
}

const AboutBannerHeader = ({
  title = "About Xonnect",
  subtitle = "Building the Future of Digital Connection",
  description = "We're a passionate team dedicated to revolutionizing how creators connect, collaborate, and monetize their content in the digital world.",
}: AboutBannerHeaderProps) => {
  return (
    <section className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden bg-black text-white">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-600/30 text-red-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm mb-8">
            <Heart className="w-4 h-4" />
            <span>Our Story</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-8">{subtitle}</h2>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">{description}</p>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutBannerHeader
