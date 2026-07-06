'use client'

import { Heart } from 'lucide-react'
import { useFollowCreator, useLikeContent } from '@/lib/hooks/use-profile-interactions'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

interface FollowButtonProps {
  creatorId: string
  isFollowing: boolean
  isSelf?: boolean
  onFollowChange?: () => void
}

export function FollowButton({
  creatorId,
  isFollowing,
  isSelf = false,
  onFollowChange,
}: FollowButtonProps) {
  const { toggle, isLoading } = useFollowCreator()
  const { data: session } = useSession()
  const router = useRouter()

  const handleClick = async () => {
    if (!session) {
      toast.error('Please log in to follow creators')
      router.push('/auth/login')
      return
    }

    const result = await toggle(creatorId, isFollowing)
    if (result && onFollowChange) {
      onFollowChange()
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all ${
        isFollowing
          ? 'bg-muted text-muted-foreground hover:bg-muted/80'
          : 'bg-primary text-primary-foreground hover:bg-primary/90'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : isFollowing ? (
        'Unfollow'
      ) : (
        'Follow'
      )}
    </button>
  )
}

interface LikeButtonProps {
  kind: 'event' | 'video'
  itemId: string
  isLiked: boolean
  count?: number
  onLikeChange?: (newLikesCount: number) => void
}

export function LikeButton({
  kind,
  itemId,
  isLiked,
  count = 0,
  onLikeChange,
}: LikeButtonProps) {
  const { toggle, isLoading } = useLikeContent()
  const { data: session } = useSession()
  const router = useRouter()

  const handleClick = async () => {
    if (!session) {
      toast.error('Please log in to like content')
      router.push('/auth/login')
      return
    }

    const result = await toggle(kind, itemId, isLiked)
    if (result && onLikeChange) {
      onLikeChange(result.likesCount ?? count)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
      title={isLiked ? 'Unlike' : 'Like'}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : isLiked ? (
        <Heart className="h-5 w-5 fill-destructive text-destructive" />
      ) : (
        <Heart className="h-5 w-5 text-muted-foreground" />
      )}
      {count > 0 && <span className="text-sm font-medium">{count}</span>}
    </button>
  )
}
