// components/ads/HeroAd.tsx
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { AdContainer } from "./AdContainer"
import { handleInternalClick, handleThirdPartyClick, isInternalUrl } from "@/lib/utils"



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

interface HeroAdProps {
  ad: AdCampaign
  onImpression: (adId: string) => void
  className?: string
}

export const HeroAd = ({ ad, onImpression, className = '' }: HeroAdProps) => {
  const handleAdClick = () => {
    if (isInternalUrl(ad.targetUrl)) {
      handleInternalClick(ad.id, ad.targetUrl)
    } else {
      handleThirdPartyClick(ad.id, ad.targetUrl)
    }
  }

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const getDomainFromUrl = (url: string): string => {
    try {
      if (url.startsWith('/')) return 'Our Site'
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
      return urlObj.hostname
    } catch {
      return 'External Site'
    }
  }

  return (
    <AdContainer 
      onViewportEnter={() => onImpression(ad.id)}
      className={className}
    >
      <div 
        onClick={handleAdClick} 
        className="block bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-600/30 rounded-2xl p-8 hover:border-red-600/50 transition-all duration-300 group cursor-pointer"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <h3 className="text-2xl font-bold group-hover:text-red-400 transition-colors text-foreground">{ad.title}</h3>
              {!isInternalUrl(ad.targetUrl) && (
                <ExternalLink className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <p className="text-muted-foreground mb-4 capitalize">{ad.description}</p>
            <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-muted-foreground">
              <span>Sponsored</span>
              <span>•</span>
              <span>{getDomainFromUrl(ad.targetUrl)}</span>
            </div>
          </div>
          <div className="relative w-full md:w-48 h-32 flex-shrink-0">
            <Image 
              src={ad.imageUrl || "/placeholder.svg"} 
              alt={ad.title} 
              fill 
              className="object-cover rounded-lg" 
            />
          </div>
        </div>
      </div>
    </AdContainer>
  )
}