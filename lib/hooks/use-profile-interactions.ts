'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export function useFollowCreator() {
  const [isLoading, setIsLoading] = useState(false)

  const toggle = async (creatorId: string, isFollowing: boolean) => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/profile/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creatorId }),
      })

      if (!res.ok) {
        const data = await res.json()
        toast.error(data.message || 'Failed to update follow')
        return null
      }

      const data = await res.json()
      toast.success(isFollowing ? 'Unfollowed' : 'Following')
      return data
    } catch (error) {
      toast.error('Network error')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { toggle, isLoading }
}

export function useLikeContent() {
  const [isLoading, setIsLoading] = useState(false)

  const toggle = async (kind: 'event' | 'video', itemId: string, isLiked: boolean) => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/profile/interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, itemId }),
      })

      if (!res.ok) {
        const data = await res.json()
        if (res.status === 401) {
          toast.error('Please log in to like content')
        } else {
          toast.error(data.message || 'Failed to update like')
        }
        return null
      }

      const data = await res.json()
      toast.success(isLiked ? 'Unliked' : 'Liked')
      return data
    } catch (error) {
      toast.error('Network error')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { toggle, isLoading }
}
