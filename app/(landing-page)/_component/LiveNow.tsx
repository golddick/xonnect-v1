"use client"

import { motion } from "framer-motion"
import { Play, Users, Radio, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

const liveShows = [
  {
    id: "1",
    title: "Afrobeats World Tour Live",
    host: "DJ Kolade",
    viewers: 14200,
    thumbnail: "/afrobeats-concert-stage.jpg",
    category: "Music",
    isLive: true,
    duration: "2h 14m",
  },
  {
    id: "2",
    title: "Pro Gaming Championship Finals",
    host: "Team Nexus",
    viewers: 9800,
    thumbnail: "/gaming-esports-tournament.jpg",
    category: "Gaming",
    isLive: true,
    duration: "1h 42m",
  },
  {
    id: "3",
    title: "Tech Founders Summit 2025",
    host: "Xonnect Events",
    viewers: 6500,
    thumbnail: "/tech-conference-ai-presentation.jpg",
    category: "Tech",
    isLive: true,
    duration: "45m",
  },
  {
    id: "4",
    title: "Masterclass: Music Production",
    host: "BeatsByAde",
    viewers: 3200,
    thumbnail: "/music-production-setup.png",
    category: "Education",
    isLive: false,
    duration: "58m",
  },
  {
    id: "5",
    title: "Fashion Week Runway Show",
    host: "StyleHouse Africa",
    viewers: 7100,
    thumbnail: "/fashion-show-runway.png",
    category: "Fashion",
    isLive: false,
    duration: "1h 10m",
  },
  {
    id: "6",
    title: "Community Fitness Challenge",
    host: "FitWithTemi",
    viewers: 2900,
    thumbnail: "/diverse-group-workout.png",
    category: "Fitness",
    isLive: false,
    duration: "35m",
  },
]

function formatViewers(count: number) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}

export default function LiveNow() {
  const hasLive = liveShows.some((s) => s.isLive)
  const label = hasLive ? "🔴 Live Now" : "🔥 Trending Now"

  return (
    <section className="relative z-10 py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {hasLive ? (
              <span className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Live Now</h2>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Trending Now</h2>
              </span>
            )}
          </div>
          <Link
            href="/tv"
            className="text-sm text-red-500 hover:text-red-400 font-semibold transition-colors flex items-center gap-1"
          >
            See All <span className="text-lg">›</span>
          </Link>
        </div>

        {/* Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {liveShows.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="group relative cursor-pointer"
            >
              <Link href="/tv">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted">
                  <img
                    src={show.thumbnail}
                    alt={show.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <Play className="w-5 h-5 text-white fill-white" />
                      </div>
                    </div>
                    <p className="text-white text-xs font-semibold line-clamp-2">{show.title}</p>
                    <p className="text-white/70 text-xs mt-1">{show.host}</p>
                  </div>

                  {/* Live / Category Badge */}
                  <div className="absolute top-2 left-2">
                    {show.isLive ? (
                      <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide flex items-center gap-1">
                        <Radio className="w-2.5 h-2.5" /> Live
                      </span>
                    ) : (
                      <span className="bg-black/60 backdrop-blur-sm text-white/80 text-[10px] font-medium px-2 py-0.5 rounded uppercase tracking-wide">
                        {show.category}
                      </span>
                    )}
                  </div>

                  {/* Viewers */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-white/80 text-[10px]">
                    <Users className="w-2.5 h-2.5" />
                    {formatViewers(show.viewers)}
                  </div>
                </div>

                {/* Title below card */}
                <div className="mt-2 px-0.5">
                  <p className="text-xs sm:text-sm font-semibold text-foreground line-clamp-1 group-hover:text-red-400 transition-colors">
                    {show.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> {show.duration}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
