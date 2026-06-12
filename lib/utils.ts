

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const getStatusColor = (status: string) => {
  switch (status) {
    case "live":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "scheduled":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "completed":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}


export const formatDate = (dateString: string | null) => {
  if (!dateString) return "-"
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export const formatTime = (dateString: string | null) => {
  if (!dateString) return "-"
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Ad tracking and interaction utils
export const trackAdInteraction = async (adId: string, type: 'IMPRESSION' | 'CLICK') => {
  // Mock implementation for now
  console.log(`Ad interaction: ${type} for ad ${adId}`);
  return { success: true };
};

export const isInternalUrl = (url: string) => {
  if (!url) return false;
  return url.startsWith('/') || url.includes(window.location.hostname);
};

export const handleInternalClick = (adId: string, url: string) => {
  trackAdInteraction(adId, 'CLICK');
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
};

export const handleThirdPartyClick = (adId: string, url: string) => {
  trackAdInteraction(adId, 'CLICK');
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};