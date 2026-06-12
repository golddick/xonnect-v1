"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar, MapPin, ArrowLeft, Star, Users, Clock, CheckCircle, Play, Heart, Share2
} from "lucide-react"
import Link from "next/link"

// ─── Demo Data ────────────────────────────────────────────────────────────────
const ticketData: Record<string, {
  title: string; creator: string; category: string; date: string; time: string
  location: string; isPhysical: boolean; thumbnail: string; rating: number
  reviews: number; sold: number; capacity: number; description: string
  ticketTypes: { id: string; label: string; price: number; perks: string[] }[]
}> = {
  AVL001: {
    title: "Afrobeats Night — Live Concert",
    creator: "Afro King",
    category: "Music",
    date: "Feb 15, 2025",
    time: "8:00 PM",
    location: "Lagos Convention Center, Nigeria",
    isPhysical: true,
    thumbnail: "/afrobeats-concert-stage.jpg",
    rating: 4.8,
    reviews: 234,
    sold: 450,
    capacity: 500,
    description: "An unforgettable night of authentic Afrobeats featuring top artists from across Africa and the diaspora. Live performances, interactive sessions, and exclusive merchandise.",
    ticketTypes: [
      { id: "STD", label: "Standard", price: 1500, perks: ["General seating", "Merch discount"] },
      { id: "VIP", label: "VIP", price: 2500, perks: ["Front row", "Meet & greet", "Exclusive merch"] },
      { id: "PREM", label: "Premium", price: 4000, perks: ["VIP seating", "Backstage pass", "Private dinner"] },
    ],
  },
  AVL002: {
    title: "FIFA 24 Tournament Finals",
    creator: "ProGamer Mike",
    category: "Gaming",
    date: "Feb 10, 2025",
    time: "6:00 PM",
    location: "Online",
    isPhysical: false,
    thumbnail: "/gaming-esports-tournament.jpg",
    rating: 4.5,
    reviews: 156,
    sold: 2340,
    capacity: 5000,
    description: "Watch the best FIFA 24 players battle it out in the ultimate tournament finals. HD stream, live commentary, and exclusive player interviews.",
    ticketTypes: [
      { id: "STREAM", label: "Stream Pass", price: 500, perks: ["HD stream", "Live chat", "Replay access"] },
      { id: "VIP", label: "VIP Stream", price: 1200, perks: ["HD+ stream", "Exclusive commentary", "Player interviews"] },
    ],
  },
  AVL003: {
    title: "AI in Creative Industries — Tech Talk",
    creator: "Tech Innovator",
    category: "Technology",
    date: "Jan 25, 2025",
    time: "3:00 PM",
    location: "Online",
    isPhysical: false,
    thumbnail: "/tech-conference-ai-presentation.jpg",
    rating: 4.9,
    reviews: 412,
    sold: 1205,
    capacity: 2000,
    description: "A deep-dive webinar on how AI is reshaping creative industries. Q&A session, slides download, and optional 1-on-1 consultation for premium attendees.",
    ticketTypes: [
      { id: "FREE", label: "Free Access", price: 0, perks: ["Webinar access", "Q&A session", "Slides download"] },
      { id: "PREM", label: "Premium Pass", price: 800, perks: ["All free perks", "1-on-1 consultation", "Certificate"] },
    ],
  },
}

const fallback = {
  title: "Live Event",
  creator: "Xonnect Creator",
  category: "Event",
  date: "TBA",
  time: "TBA",
  location: "TBA",
  isPhysical: false,
  thumbnail: "/vibrant-concert.png",
  rating: 4.5,
  reviews: 0,
  sold: 0,
  capacity: 100,
  description: "Details coming soon.",
  ticketTypes: [
    { id: "STD", label: "Standard", price: 1000, perks: ["Event access"] },
  ],
}

export default function TicketDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const event = ticketData[id] ?? fallback
  const [selected, setSelected] = useState(event.ticketTypes[0].id)
  const [wishlisted, setWishlisted] = useState(false)

  const selectedType = event.ticketTypes.find((t) => t.id === selected)!

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Back ── */}
      <div className="pt-24 pb-4 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tickets
        </button>
      </div>

      {/* ── Main ── */}
      <div className="px-4 sm:px-6 md:px-8 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left: Event Info ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Thumbnail */}
            <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 bg-muted">
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = "/vibrant-concert.png" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <Badge variant="destructive">{event.category}</Badge>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-black/60 text-white">
                  {event.isPhysical ? "📍 In-Person" : "🌐 Online"}
                </span>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="w-9 h-9 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? "fill-red-500 text-red-500" : "text-white"}`} />
                </button>
                <button className="w-9 h-9 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors">
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Title & Meta */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">{event.title}</h1>
              <p className="text-red-500 font-semibold text-sm">by {event.creator}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{event.date} · {event.time}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{event.location}</span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {event.rating} ({event.reviews} reviews)
                </span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{event.sold} attending</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="font-bold text-foreground mb-2">About this Event</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
            </div>

            {/* Capacity */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-foreground">Availability</span>
                <span className="text-muted-foreground">{event.sold} / {event.capacity} sold</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all"
                  style={{ width: `${Math.min((event.sold / event.capacity) * 100, 100)}%` }}
                />
              </div>
              {event.sold / event.capacity > 0.8 && (
                <p className="text-xs text-red-500 font-semibold mt-2">⚡ Selling fast — limited spots left!</p>
              )}
            </div>
          </motion.div>

          {/* ── Right: Ticket Selector ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5 sticky top-24">
              <h2 className="font-black text-foreground text-lg">Choose Your Ticket</h2>

              {/* Ticket type selector */}
              <div className="space-y-3">
                {event.ticketTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelected(type.id)}
                    className={`w-full text-left rounded-xl border p-4 transition-all ${
                      selected === type.id
                        ? "border-red-500 bg-red-600/10"
                        : "border-border bg-background hover:border-red-500/40"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-foreground text-sm">{type.label}</span>
                      <span className="font-black text-foreground text-sm">
                        {type.price === 0 ? "FREE" : `₦${type.price.toLocaleString()}`}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {type.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Selected</span>
                  <span className="font-semibold text-foreground">{selectedType.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-black text-foreground text-lg">
                    {selectedType.price === 0 ? "FREE" : `₦${selectedType.price.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 text-base gap-2">
                <Play className="w-4 h-4" />
                {selectedType.price === 0 ? "Register Free" : "Buy Ticket"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Secure checkout · Instant confirmation · Free cancellation within 24h
              </p>
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  )
}
