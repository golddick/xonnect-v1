'use client'

import React, { useEffect } from 'react'
import { useCreatorVideos } from '@/lib/hooks/use-creator-videos'
import type { Analytics } from '@/lib/type/creator-video'
import {
  X,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react'

interface VideoAnalyticsComponentProps {
  folderId: string
  onClose?: () => void
}

const VideoAnalyticsComponent: React.FC<VideoAnalyticsComponentProps> = ({
  folderId,
  onClose,
}) => {
  const { analytics, loading, error, fetchAnalytics, clearError } = useCreatorVideos()

  useEffect(() => {
    fetchAnalytics(folderId)
  }, [folderId, fetchAnalytics])

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">Analytics not available</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden max-w-6xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 flex items-start justify-between border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Analytics</h2>
          <p className="text-gray-600 text-sm mt-1">{analytics.folder.title}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-white rounded transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 p-4 flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-red-900">Error</h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
          <button
            onClick={clearError}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="p-6 space-y-8">
        {/* Key Metrics Grid */}
        <section>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Key Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              label="Total Views"
              value={analytics.folder.views}
              icon={Eye}
              color="blue"
            />
            <MetricCard
              label="Likes"
              value={analytics.folder.likes}
              icon={Heart}
              color="red"
            />
            <MetricCard
              label="Comments"
              value={analytics.folder.comments}
              icon={MessageCircle}
              color="green"
            />
            <MetricCard
              label="Shares"
              value={analytics.folder.shares}
              icon={Share2}
              color="purple"
            />
          </div>
        </section>

        {/* Monetization Metrics */}
        <section className="border-t pt-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Monetization
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              label="Purchases"
              value={analytics.folder.purchases}
              icon={ShoppingCart}
              color="purple"
            />
            <MetricCard
              label="Rentals (24h)"
              value={analytics.folder.rentals24h}
              icon={TrendingUp}
              color="orange"
            />
            <MetricCard
              label="Rentals (48h)"
              value={analytics.folder.rentals48h}
              icon={TrendingUp}
              color="yellow"
            />
          </div>
        </section>

        {/* Engagement Breakdown */}
        <section className="border-t pt-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Engagement Breakdown
          </h3>
          <div className="space-y-3">
            <EngagementBar
              label="Views"
              value={analytics.engagementBreakdown.likes}
              color="bg-blue-500"
            />
            <EngagementBar
              label="Likes"
              value={analytics.engagementBreakdown.likes}
              color="bg-red-500"
            />
            <EngagementBar
              label="Comments"
              value={analytics.engagementBreakdown.comments}
              color="bg-green-500"
            />
            <EngagementBar
              label="Shares"
              value={analytics.engagementBreakdown.shares}
              color="bg-purple-500"
            />
            <EngagementBar
              label="Purchases"
              value={analytics.engagementBreakdown.purchases}
              color="bg-yellow-500"
            />
          </div>
        </section>

        {/* Recent Comments */}
        {analytics.comments && analytics.comments.length > 0 && (
          <section className="border-t pt-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Recent Comments ({analytics.comments.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {analytics.comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          </section>
        )}

        {/* Content Info */}
        <section className="border-t pt-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Content Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Episodes:</span>
              <p className="text-gray-900 font-medium">{analytics.episodesCount}</p>
            </div>
            <div>
              <span className="text-gray-600">Content Type:</span>
              <p className="text-gray-900 font-medium capitalize">{analytics.folder.contentType}</p>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <p className="text-gray-900 font-medium capitalize">{analytics.folder.status}</p>
            </div>
            <div>
              <span className="text-gray-600">Total Duration:</span>
              <p className="text-gray-900 font-medium">
                {analytics.folder.duration ?? 'Not available'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

interface MetricCardProps {
  label: string
  value: number
  icon: React.ReactNode
  color: 'blue' | 'red' | 'green' | 'purple' | 'orange' | 'yellow'
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700',
    red: 'bg-red-50 text-red-700',
    green: 'bg-green-50 text-green-700',
    purple: 'bg-purple-50 text-purple-700',
    orange: 'bg-orange-50 text-orange-700',
    yellow: 'bg-yellow-50 text-yellow-700',
  }

  const iconColorClasses = {
    blue: 'text-blue-600',
    red: 'text-red-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    yellow: 'text-yellow-600',
  }

  return (
    <div className={`rounded-lg p-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-600">{label}</span>
        {typeof Icon === 'function' ? (
          <Icon className={`w-5 h-5 ${iconColorClasses[color]}`} />
        ) : (
          Icon
        )}
      </div>
      <p className="text-2xl font-bold">{value.toLocaleString()}</p>
    </div>
  )
}

interface EngagementBarProps {
  label: string
  value: number
  color: string
}

const EngagementBar: React.FC<EngagementBarProps> = ({ label, value, color }) => {
  const maxValue = 1000 // Adjust based on expected max
  const percentage = Math.min((value / maxValue) * 100, 100)

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">{value.toLocaleString()}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

interface CommentCardProps {
  comment: {
    id: string
    author: string
    text: string
    date: string
    likes: number
    replies: number
    avatar?: string | null
  }
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {comment.avatar ? (
            <img
              src={comment.avatar}
              alt={comment.author}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              {comment.author.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-gray-900 text-sm">{comment.author}</h4>
            <span className="text-xs text-gray-500">{comment.date}</span>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2">{comment.text}</p>
          <div className="flex gap-3 mt-2 text-xs text-gray-600">
            <span>👍 {comment.likes}</span>
            <span>💬 {comment.replies}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoAnalyticsComponent
