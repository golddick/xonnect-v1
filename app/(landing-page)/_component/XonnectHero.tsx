"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Info, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import WorldTreeGlobe from "@/components/common_component/worldGlobe"

export default function XonnectHero() {
  const [email, setEmail] = useState("")
 
  return (
    <section className="relative w-full  overflow-hidden ">
      
      <div className="relative z-10 w-full mx-auto px-6 sm:px-10 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 lg:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
              </span>
              <span className="text-red-400 text-sm font-bold uppercase tracking-widest">Live experiences, on demand</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-black text-foreground leading-tight"
            >
              Your next favorite live moment starts here.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl"
            >
              Step into cinematic premium experiences built for all.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <Link href="/tv">
                <Button size="lg" className="bg-red-600 text-white hover:bg-foreground font-bold px-8 gap-2 rounded-lg">
                  <Play className="w-5 h-5 fill-white" /> Watch Now
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-white bg-black hover:bg-white/20 backdrop-blur-sm font-semibold px-8 gap-2 rounded-lg"
                >
                  <Info className="w-5 h-5" /> More Info
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 max-w-xl"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email to get started"
                className="flex-1 bg-white/10 text-white placeholder:text-muted-foreground backdrop-blur-xl border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors"
              />
              <Link href="/auth/signup">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg gap-1 whitespace-nowrap w-full sm:w-auto">
                  Get Started <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:flex items-center justify-center px-4 py-10 lg:p-0"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full bg-red-500/10 blur-3xl" />
              <div className="relative mx-auto w-[280px] sm:w-[320px] lg:w-[380px]">
                <WorldTreeGlobe size={370} accent="#F02330" dotColor="#F8FAFC" />
              </div>

              <div className="absolute top-6 right-0 w-32 p-3 bg-card backdrop-blur-xl border border-border rounded-3xl text-foreground text-xs text-center">
                <strong className="block text-sm text-foreground">Live</strong>
                Global events
              </div>
              <div className="absolute bottom-8 left-0 w-32 p-3 bg-white/10 backdrop-blur-xl border border-border rounded-3xl text-foreground text-xs text-center">
                <strong className="block text-sm text-foreground">Instant</strong>
                Creator access
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
