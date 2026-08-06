'use client'

import { useState, useEffect } from 'react'
import { X, Play, Heart, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useFollowCreator } from '@/lib/hooks/use-profile-interactions'

interface CreatorStats {
  followers: number
  videos: number
  events: number
  totalLikes: number
  totalViews: number
  totalComments: number
}

interface CreatorProfilePopupProps {
  creatorId: string
  creatorName: string
  creatorImage?: string | null
  isFollowing: boolean
  onFollowChange?: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreatorProfilePopup({
  creatorId,
  creatorName,
  creatorImage,
  isFollowing,
  onFollowChange,
  open,
  onOpenChange,
}: CreatorProfilePopupProps) {
  const [stats, setStats] = useState<CreatorStats>({
    followers: 0,
    videos: 0,
    events: 0,
    totalLikes: 0,
    totalViews: 0,
    totalComments: 0,
  })
  const [creatorProfile, setCreatorProfile] = useState<{
    fullName: string
    avatarUrl?: string | null
  }>({ fullName: creatorName, avatarUrl: creatorImage })
  const [loading, setLoading] = useState(false)
  const { toggle, isLoading: isFollowLoading } = useFollowCreator()

  useEffect(() => {
    if (!open || !creatorId) return

    const loadStats = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/profile/creator/${creatorId}/stats`)
        if (response.ok) {
          const data = await response.json()
          setStats(data.stats || {})
          setCreatorProfile({
            fullName: data.profile?.fullName || creatorName,
            avatarUrl: data.profile?.avatarUrl ?? creatorImage,
          })
        }
      } catch (error) {
        console.error('Failed to load creator stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [open, creatorId, creatorImage, creatorName])

  const handleFollowClick = async () => {
    const result = await toggle(creatorId, isFollowing)
    if (result && onFollowChange) {
      onFollowChange()
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Creator Profile</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 p-1 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Profile Header */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-red-600/20 to-red-600/10 flex items-center justify-center flex-shrink-0 border-2 border-border">
              {creatorProfile.avatarUrl ? (
                <Image
                  src={creatorProfile.avatarUrl}
                  alt={creatorProfile.fullName}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-red-500">
                  {getInitials(creatorProfile.fullName)}
                </span>
              )}
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-bold text-foreground">{creatorProfile.fullName}</h3>
              <p className="text-sm text-muted-foreground">
                {stats.followers?.toLocaleString() || 0} followers
              </p>
            </div>
            <Button
              onClick={handleFollowClick}
              disabled={isFollowLoading}
              className="rounded-lg"
              variant={isFollowing ? 'outline' : 'default'}
            >
              {isFollowLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : isFollowing ? (
                'Unfollow'
              ) : (
                'Follow'
              )}
            </Button>
          </div>

          {/* Stats Grid - Instagram Style */}
          <div className="grid grid-cols-3 gap-3">
            {/* Videos */}
            <div className="bg-muted/50 rounded-xl p-4 text-center space-y-2 hover:bg-muted/70 transition-colors cursor-pointer">
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">
                  {stats.videos?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-muted-foreground">Videos</p>
              </div>
            </div>

            {/* Events */}
            <div className="bg-muted/50 rounded-xl p-4 text-center space-y-2 hover:bg-muted/70 transition-colors cursor-pointer">
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-500" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">
                  {stats.events?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-muted-foreground">Events</p>
              </div>
            </div>

            {/* Likes */}
            <div className="bg-muted/50 rounded-xl p-4 text-center space-y-2 hover:bg-muted/70 transition-colors cursor-pointer">
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-pink-600/20 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-500" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">
                  {(stats.totalLikes || 0) > 1000
                    ? `${(stats.totalLikes / 1000).toFixed(1)}K`
                    : stats.totalLikes?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-muted-foreground">Likes</p>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Total Views</span>
              <span className="font-semibold text-foreground">
                {(stats.totalViews || 0) > 1000000
                  ? `${(stats.totalViews / 1000000).toFixed(1)}M`
                  : (stats.totalViews || 0) > 1000
                    ? `${(stats.totalViews / 1000).toFixed(1)}K`
                    : stats.totalViews?.toLocaleString() || 0}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Total Comments</span>
              <span className="font-semibold text-foreground">
                {(stats.totalComments || 0) > 1000
                  ? `${(stats.totalComments / 1000).toFixed(1)}K`
                  : stats.totalComments?.toLocaleString() || 0}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
