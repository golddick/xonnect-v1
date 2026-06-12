"use client"

import { motion } from "framer-motion"
import { ArrowRight, PlayCircle, Sparkles, Globe, Zap, Users, Tv, Tv2Icon, Smartphone } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative z-10 pt-20  lg:pb-20 mb-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-4 lg:mt-8"
        >
          <div className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-600/30 text-red-400 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-4 backdrop-blur-sm">
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
              <h1 className="text-4xl items-center text-center justify-center lg:text-start sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent">
                  Connecting Every Home to Global Experiences
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base text-center lg:text-start sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Whether on your TV, laptop, or phone, Xonnect brings the world's most exciting live events directly to your family, making sure you never miss a moment together.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center text-center justify-center lg:justify-start lg:text-start  sm:flex-row gap-4 pt-2"
            >
              <Link
                href="/tv"
                className="group bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-red-600/50"
              >
                <span>Start Watching</span>
              </Link>
              <button
                onClick={() => (window.location.href = "/tutorials")}
                className="group bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm border border-border"
              >
                <span className=" flex gap-2">
                  <p className=" hidden lg:block">Explore</p> Videos</span>
              </button>
            </motion.div>

            {/* Highlight Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xs sm:text-sm  text-center lg:justify-start justify-center lg:text-start  text-muted-foreground flex items-center space-x-2 pt-2"
            >
              <span className="w-2 h-2 bg-red-500 rounded-full hidden lg:block"></span>
              <span>Built for creators. Designed for viewers. Powered by global connection.</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Premium Tech Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] sm:h-[600px] hidden lg:flex items-center justify-center"
          >
            {/* Main Visual: Family Watching Experience */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-red-600/10 rounded-full blur-[120px] animate-pulse"></div>

              {/* TV Representation */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative z-20 w-[80%] aspect-video bg-card border-[12px] border-muted rounded-[2rem] shadow-2xl overflow-hidden flex items-center justify-center"
              >
                {/* Simulated Content on TV */}
                <div className="absolute inset-0 bg-gradient-to-tr from-red-900/40 via-background to-red-600/20"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <PlayCircle className="w-16 h-16 text-red-600 mb-4 animate-pulse" />
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                    <span className="text-white text-sm font-bold tracking-widest uppercase">Live: World Tour</span>
                  </div>
                </div>

                {/* Reflection effect */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 skew-y-[-10deg] -translate-y-1/2"></div>
              </motion.div>

              {/* Laptop Representation (Overlapping) */}
              <motion.div
                initial={{ x: 50, y: 50, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute bottom-[10%] right-[5%] z-30 w-[45%] aspect-[16/10] bg-card border-4 border-muted rounded-xl shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="flex-1 bg-background/80 flex items-center justify-center">
                  <Users className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <div className="h-4 bg-muted w-full"></div>
              </motion.div>

              {/* Mobile Phone Representation */}
              <motion.div
                initial={{ x: -20, y: 40, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-[5%] left-[10%] z-40 w-[15%] aspect-[9/19] bg-card border-[3px] border-muted rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="flex-1 bg-gradient-to-b from-red-600/20 to-background flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-muted-foreground/40" />
                </div>
                <div className="h-1 bg-muted w-4 mx-auto my-1 rounded-full"></div>
              </motion.div>

              {/* Family Connection Visual Elements */}
              <div className="absolute -inset-10 pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/20 rounded-full blur-2xl"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-red-600/10 rounded-full blur-3xl"
                />
              </div>

              {/* Floating Labels */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 bg-card/10 backdrop-blur-md border border-border px-4 py-2 rounded-full z-40"
              >
                <span className="text-xs font-bold text-foreground flex items-center gap-2">
                  <Tv className="w-3 h-3 text-red-500" /> Big Screen Experience
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
