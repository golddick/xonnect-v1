// components/ads/HeroAdsSwiper.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HeroAd } from './HeroAd'
import { trackAdInteraction } from '@/lib/utils'

interface AdCampaign {
  id: string
  title: string
  description?: string
  type: "BANNER" | "VIDEO"
  status: "ACTIVE" | "PAUSED" | "ENDED" | "DRAFT"
  impressions: number
  clicks: number
  conversions: number
  ctr: string
  budget: number
  spent: number
  startDate: string
  endDate: string
  imageUrl?: string
  videoUrl?: string
  targetUrl: string
  position: "HERO" | "SIDEBAR" | "FOOTER" | "INLINE"
  createdAt: string
  updatedAt: string
}

interface HeroAdsSwiperProps {
  ads: AdCampaign[]
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export const HeroAdsSwiper = ({ 
  ads, 
  className = '',
  autoPlay = true,
  autoPlayInterval = 5000 
}: HeroAdsSwiperProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || ads.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [ads.length, autoPlay, autoPlayInterval])

  const nextAd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length)
  }

  const prevAd = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length)
  }

  const handleImpression = (adId: string) => {
    trackAdInteraction(adId, 'IMPRESSION')
  }

  if (ads.length === 0) return null

  if (ads.length === 1) {
    return (
      <div className={className}>
        <HeroAd 
          ad={ads[0]} 
          onImpression={handleImpression}
        />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <HeroAd 
            ad={ads[currentIndex]} 
            onImpression={handleImpression}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevAd}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={nextAd}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-4">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-red-500' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}