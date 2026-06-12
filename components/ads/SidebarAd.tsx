// components/ads/SidebarAd.tsx
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

interface SidebarAdProps {
  ad: AdCampaign
  onImpression: (adId: string) => void
  className?: string
}

export const SidebarAd = ({ ad, onImpression, className = '' }: SidebarAdProps) => {
  const handleAdClick = () => {
    if (isInternalUrl(ad.targetUrl)) {
      handleInternalClick(ad.id, ad.targetUrl)
    } else {
      handleThirdPartyClick(ad.id, ad.targetUrl)
    }
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
        className="block bg-card border border-border rounded-xl p-6 hover:border-red-600/50 transition-all duration-300 group cursor-pointer shadow-sm"
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold group-hover:text-red-400 transition-colors text-foreground">{ad.title}</h4>
          {!isInternalUrl(ad.targetUrl) && (
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
        <div className="relative w-full h-32 mb-4">
          <Image fill src={ad.imageUrl || "/placeholder.svg"} alt={ad.title} className="object-cover rounded-lg" />
        </div>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{ad.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{getDomainFromUrl(ad.targetUrl)}</span>
          {/* <span>{ad.clicks.toLocaleString()} clicks</span> */}
        </div>
      </div>
    </AdContainer>
  )
}