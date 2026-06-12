"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, ShoppingCart, X } from "lucide-react"

interface Ticket {
  id: string
  name: string
  price: number
  benefits: string[]
  quantity: number
  type: "physical" | "streaming"
  description: string
}

interface StreamPlayerProps {
  isLive: boolean
  title: string
  viewers: number
  hasTickets?: boolean
  tickets?: Ticket[]
  onTicketSelect?: (ticket: Ticket) => void
}

export default function StreamPlayer({
  isLive,
  title,
  viewers,
  hasTickets = false,
  tickets = [],
  onTicketSelect,
}: StreamPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(isLive)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showTickets, setShowTickets] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    onTicketSelect?.(ticket)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full bg-black rounded-2xl overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Container */}
      <div className="relative aspect-video bg-black flex items-center justify-center">
        <img src="/live-stream-setup.jpg" alt={title} className="w-full h-full object-cover" />

        {isLive && (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-full z-10"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-semibold">LIVE</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{viewers.toLocaleString()} watching</span>
          </motion.div>
        )}

        {hasTickets && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTickets(!showTickets)}
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors z-10"
          >
            <ShoppingCart className="w-5 h-5" />
            Tickets
          </motion.button>
        )}

        {/* Play Button Overlay */}
        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group/play hover:bg-black/20 transition-colors"
          >
            <div className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transform group-play/play:scale-110 transition-transform">
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </div>
          </button>
        )}

        {/* Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 space-y-2"
            >
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/20 rounded-full">
                <div className="h-full bg-red-600 rounded-full" style={{ width: "45%" }} />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <span className="text-xs text-gray-300">Live</span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>

                  <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showTickets && hasTickets && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTickets(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold">Get Your Ticket</h2>
                <button
                  onClick={() => setShowTickets(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Tickets Grid */}
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-4">
                  {tickets.map((ticket) => (
                    <motion.div
                      key={ticket.id}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedTicket?.id === ticket.id
                          ? "border-red-600 bg-red-600/10"
                          : "border-white/20 hover:border-white/40 bg-white/5"
                      }`}
                      onClick={() => handleTicketSelect(ticket)}
                    >
                      {/* Selected Badge */}
                      {selectedTicket?.id === ticket.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-3 -right-3 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold"
                        >
                          ✓
                        </motion.div>
                      )}

                      {/* Ticket Type Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold">{ticket.name}</h3>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            ticket.type === "physical"
                              ? "bg-blue-600/20 text-blue-400"
                              : "bg-purple-600/20 text-purple-400"
                          }`}
                        >
                          {ticket.type === "physical" ? "Physical" : "Streaming"}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-400 mb-4">{ticket.description}</p>

                      {/* Benefits */}
                      <div className="space-y-2 mb-4">
                        {ticket.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                            {benefit}
                          </div>
                        ))}
                      </div>

                      {/* Price and Availability */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Price</p>
                          <p className="text-2xl font-bold">₦{ticket.price.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400 mb-1">Available</p>
                          <p className="text-xl font-semibold text-green-400">{ticket.quantity}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer with Action Button */}
              <div className="p-6 border-t border-white/10 flex items-center justify-between bg-black/50">
                <div>
                  {selectedTicket && (
                    <div>
                      <p className="text-sm text-gray-400">Selected</p>
                      <p className="text-xl font-bold">{selectedTicket.name}</p>
                    </div>
                  )}
                </div>
                <button
                  disabled={!selectedTicket}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Purchase Ticket - ₦{selectedTicket?.price.toLocaleString()}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
