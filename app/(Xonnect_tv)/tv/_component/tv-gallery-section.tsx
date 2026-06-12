"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const TvGallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const gallery = [
    { id: "1", title: "Event Setup", emoji: "🎪", category: "Behind the Scenes" },
    { id: "2", title: "Crowd Shot", emoji: "👥", category: "Event" },
    { id: "3", title: "Technical Setup", emoji: "🎛️", category: "Behind the Scenes" },
    { id: "4", title: "Main Stage", emoji: "🎤", category: "Event" },
    { id: "5", title: "Lighting Rig", emoji: "💡", category: "Production" },
    { id: "6", title: "Control Room", emoji: "📊", category: "Production" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
          <span>Gallery</span>
          <span>🖼️</span>
        </h2>
        <div className="text-sm text-muted-foreground">{gallery.length} photos</div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(item.id)}
            className="relative aspect-square bg-gradient-to-br from-gray-800 to-black rounded-lg overflow-hidden cursor-pointer group border border-white/10 hover:border-red-500/50 transition-all"
          >
            {/* Image Placeholder */}
            <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
              <span className="text-6xl">{item.emoji}</span>
              <h3 className="text-foreground font-semibold text-lg text-center px-4 group-hover:text-red-400 transition-colors">
                {item.title}
              </h3>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-foreground text-4xl">👁️</div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-2 left-2 bg-background/60 px-2 py-1 rounded text-xs text-foreground font-semibold">
              {item.category}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-40 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
                <span className="text-8xl">{gallery.find((g) => g.id === selectedImage)?.emoji}</span>
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-lg">
                <h3 className="text-foreground text-xl font-bold">{gallery.find((g) => g.id === selectedImage)?.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{gallery.find((g) => g.id === selectedImage)?.category}</p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 p-3 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View All Button */}
      <div className="flex justify-center pt-4">
        <button className="px-6 py-2 border border-red-600 text-red-600 hover:bg-red-600/10 rounded-lg font-semibold transition-colors">
          View All Photos
        </button>
      </div>
    </div>
  )
}

export default TvGallerySection

