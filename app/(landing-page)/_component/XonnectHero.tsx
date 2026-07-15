"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Info, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const heroVideo = "/video/xonnect-hero-video.mp4"

export default function XonnectHero() {
  const [email, setEmail] = useState("")

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" />
      </div>

      <div className="relative z-10 flex flex-col justify-center flex-1 px-6 sm:px-10 md:px-16 pt-24 pb-10 max-w-7xl mx-auto w-full">
        <div className="max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
            </span>
            <span className="text-red-400 text-sm font-bold uppercase tracking-widest">Live experiences, on demand</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-sm font-medium uppercase tracking-[0.3em] mb-3"
          >
            Xonnect · Watch. Belong.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4"
          >
            Your next favorite live moment starts here.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
          >
            Step into cinematic premium experiences built for all.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <Link href="/tv">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 font-bold px-8 gap-2 rounded-lg">
                <Play className="w-5 h-5 fill-black" /> Watch Now
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm font-semibold px-8 gap-2 rounded-lg"
              >
                <Info className="w-5 h-5" /> More Info
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 max-w-lg"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to get started"
              className="flex-1 bg-black/50 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors"
            />
            <Link href="/auth/signup">
              <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg gap-1 whitespace-nowrap w-full sm:w-auto">
                Get Started <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
