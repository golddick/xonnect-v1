"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Info, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const featuredShows = [
  {
    id: "1",
    title: "Afrobeats World Tour — Live",
    description:
      "The biggest Afrobeats artists from Lagos to London take the stage in a once-in-a-lifetime global concert experience. Watch live, feel every beat.",
    thumbnail: "/afrobeats-concert-stage.jpg",
    category: "Music · Live Event",
    isLive: true,
    viewers: "14.2K watching",
  },
  {
    id: "2",
    title: "Pro Gaming Championship Finals",
    description:
      "The world's top esports teams clash in the ultimate showdown. High stakes, insane plays, and a $500K prize pool on the line. Don't miss a second.",
    thumbnail: "/gaming-esports-tournament.jpg",
    category: "Gaming · Esports",
    isLive: true,
    viewers: "9.8K watching",
  },
  {
    id: "3",
    title: "Tech Founders Summit 2025",
    description:
      "Africa's most visionary founders, investors, and innovators gather to shape the future of tech. Keynotes, panels, and live Q&As all day.",
    thumbnail: "/tech-conference-ai-presentation.jpg",
    category: "Tech · Conference",
    isLive: false,
    viewers: "6.5K views",
  },
]

export default function XonnectHero() {
  const [active, setActive] = useState(0)
  const [email, setEmail] = useState("")
  const show = featuredShows[active]

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {featuredShows.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={s.thumbnail}
              alt={s.title}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        ))}
        {/* Gradient overlays */}
        {/*<div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />*/}
        {/*<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />*/}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center flex-1 px-6 sm:px-10 md:px-16 pt-24 pb-10 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl">
          {/* Live badge */}
          {show.isLive && (
            <motion.div
              key={`live-${active}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
              </span>
              <span className="text-red-400 text-sm font-bold uppercase tracking-widest">Live Now · {show.viewers}</span>
            </motion.div>
          )}

          {/* Category */}
          <motion.p
            key={`cat-${active}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-sm font-medium uppercase tracking-widest mb-3"
          >
            {show.category}
          </motion.p>

          {/* Title */}
          <motion.h1
            key={`title-${active}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4"
          >
            {show.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            key={`desc-${active}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/75 text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
          >
            {show.description}
          </motion.p>

          {/* CTA Buttons */}
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

          {/* Email signup */}
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

      {/* Slide Selectors */}
      <div className="relative z-10 px-6 sm:px-10 md:px-16 pb-8 max-w-7xl mx-auto w-full">
        <div className="flex gap-2">
          {featuredShows.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="flex flex-col gap-1 group"
            >
              <div
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === active ? "bg-red-500 w-12" : "bg-white/30 w-6 group-hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
