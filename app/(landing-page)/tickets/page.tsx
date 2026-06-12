"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Ticket, Calendar, MapPin, Users, Search, ArrowRight, Star,
  Music, Gamepad2, Laptop, Utensils, Dumbbell, Mic2, Filter, Play, BookAIcon
} from "lucide-react"
import Link from "next/link"
import HeroSection2 from "@/app/(landing-page)/_component/heroSection";

// ─── Demo Data ────────────────────────────────────────────────────────────────
const tickets = [
  {
    id: "AVL001",
    title: "Afrobeats Night — Live Concert",
    creator: "Afro King",
    category: "Music",
    date: "Feb 15, 2025",
    time: "8:00 PM",
    location: "Lagos Convention Center",
    isPhysical: true,
    price: 1500,
    rating: 4.8,
    reviews: 234,
    sold: 450,
    capacity: 500,
    thumbnail: "/afrobeats-concert-stage.jpg",
    tags: ["Concert", "Live", "Afrobeats"],
    badge: "Selling Fast",
  },
  {
    id: "AVL002",
    title: "FIFA 24 Tournament Finals",
    creator: "ProGamer Mike",
    category: "Gaming",
    date: "Feb 10, 2025",
    time: "6:00 PM",
    location: "Online",
    isPhysical: false,
    price: 500,
    rating: 4.5,
    reviews: 156,
    sold: 2340,
    capacity: 5000,
    thumbnail: "/gaming-esports-tournament.jpg",
    tags: ["Esports", "FIFA", "Tournament"],
    badge: "Live Stream",
  },
  {
    id: "AVL003",
    title: "AI in Creative Industries — Tech Talk",
    creator: "Tech Innovator",
    category: "Technology",
    date: "Jan 25, 2025",
    time: "3:00 PM",
    location: "Online",
    isPhysical: false,
    price: 0,
    rating: 4.9,
    reviews: 412,
    sold: 1205,
    capacity: 2000,
    thumbnail: "/tech-conference-ai-presentation.jpg",
    tags: ["AI", "Webinar", "Free"],
    badge: "Free",
  },
  {
    id: "AVL004",
    title: "Nigerian Cuisine Masterclass",
    creator: "Chef Amara",
    category: "Lifestyle",
    date: "Mar 5, 2025",
    time: "2:00 PM",
    location: "Abuja Culinary Studio",
    isPhysical: true,
    price: 1200,
    rating: 4.7,
    reviews: 89,
    sold: 22,
    capacity: 30,
    thumbnail: "/cooking-show.jpg",
    tags: ["Cooking", "Masterclass", "Food"],
    badge: "Almost Full",
  },
  {
    id: "AVL005",
    title: "HIIT & Strength — Live Fitness Session",
    creator: "FitCoach Temi",
    category: "Fitness",
    date: "Feb 20, 2025",
    time: "7:00 AM",
    location: "Online",
    isPhysical: false,
    price: 300,
    rating: 4.6,
    reviews: 67,
    sold: 340,
    capacity: 1000,
    thumbnail: "/vibrant-concert.png",
    tags: ["Fitness", "HIIT", "Live"],
    badge: null,
  },
  {
    id: "AVL006",
    title: "Stand-Up Comedy Night",
    creator: "Laugh Factory NG",
    category: "Comedy",
    date: "Mar 1, 2025",
    time: "9:00 PM",
    location: "Eko Hotel, Lagos",
    isPhysical: true,
    price: 2000,
    rating: 4.9,
    reviews: 178,
    sold: 180,
    capacity: 200,
    thumbnail: "/gaming-tournament.png",
    tags: ["Comedy", "Live", "Night Out"],
    badge: "Hot 🔥",
  },
]

const categories = ["All", "Music", "Gaming", "Technology", "Lifestyle", "Fitness", "Comedy"]

const categoryIcons: Record<string, React.ElementType> = {
  Music: Music,
  Gaming: Gamepad2,
  Technology: Laptop,
  Lifestyle: Utensils,
  Fitness: Dumbbell,
  Comedy: Mic2,
}

export default function TicketsPage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = tickets.filter((t) => {
    const matchCat = activeCategory === "All" || t.category === activeCategory
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.creator.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Hero ── */}

      <HeroSection2
          title=" Your Front Row Seat Anywhere on Earth."
          ICON={<BookAIcon className="w-5 h-5 text-red-400" />}
          iconTitle="Our Tickets "
      />

      {/* ── Category Filter ── */}
      <section className="px-4 sm:px-6 md:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat]
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    activeCategory === cat
                      ? "bg-red-600 border-red-600 text-white"
                      : "bg-card border-border text-muted-foreground hover:border-red-500/50 hover:text-foreground"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Ticket Grid ── */}
      <section className="px-4 sm:px-6 md:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Ticket className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-semibold">No events found</p>
              <p className="text-sm mt-1">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((ticket, i) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link href={`/tickets/${ticket.id}`}>
                    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-red-500/40 transition-all hover:shadow-xl hover:shadow-red-600/5 cursor-pointer">
                      {/* Thumbnail */}
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <img
                          src={ticket.thumbnail}
                          alt={ticket.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder-event.jpg"
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {ticket.badge && (
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                              ticket.badge === "Free" ? "bg-green-600 text-white" :
                              ticket.badge === "Live Stream" ? "bg-blue-600 text-white" :
                              "bg-red-600 text-white"
                            }`}>
                              {ticket.badge}
                            </span>
                          )}
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            ticket.isPhysical ? "bg-black/60 text-white" : "bg-black/60 text-white"
                          }`}>
                            {ticket.isPhysical ? "📍 In-Person" : "🌐 Online"}
                          </span>
                        </div>
                        {/* Play overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center">
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          </div>
                        </div>
                        {/* Price */}
                        <div className="absolute bottom-3 right-3">
                          <span className="bg-black/70 text-white text-sm font-black px-3 py-1 rounded-full">
                            {ticket.price === 0 ? "FREE" : `₦${ticket.price.toLocaleString()}`}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-foreground text-sm leading-snug line-clamp-2 flex-1">
                            {ticket.title}
                          </h3>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs text-muted-foreground">{ticket.rating}</span>
                          </div>
                        </div>

                        <p className="text-xs text-red-500 font-semibold">by {ticket.creator}</p>

                        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{ticket.date} · {ticket.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{ticket.location}</span>
                          </div>
                        </div>

                        {/* Capacity bar */}
                        <div>
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{ticket.sold} sold</span>
                            <span>{ticket.capacity} capacity</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500 rounded-full"
                              style={{ width: `${Math.min((ticket.sold / ticket.capacity) * 100, 100)}%` }}
                            />
                          </div>
                        </div>

                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm h-9 gap-2">
                          Get Tickets <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
