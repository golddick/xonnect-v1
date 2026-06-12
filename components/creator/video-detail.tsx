'use client'

import React, { useState, useEffect } from 'react'
import { useCreatorVideos } from '@/lib/hooks/use-creator-videos'
import type { Folder } from '@/lib/type/creator-video'
import { X, Play, Calendar, Clock, Eye, Heart, MessageCircle, Edit } from 'lucide-react'

interface VideoDetailComponentProps {
  folderId: string
  onClose?: () => void
  onEdit?: (videoId: string) => void
}

const VideoDetailComponent: React.FC<VideoDetailComponentProps> = ({
  folderId,
  onClose,
  onEdit,
}) => {
  const { currentFolder, loading, error, fetchFolderDetail, clearError } =
    useCreatorVideos()

  useEffect(() => {
    fetchFolderDetail(folderId)
  }, [folderId, fetchFolderDetail])

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading folder details...</p>
        </div>
      </div>
    )
  }

  if (!currentFolder) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">Folder not found</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden max-w-4xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 flex items-start justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">{currentFolder.title}</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-white rounded transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>

      {/* Messages */}
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

      {/* Folder Metadata */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-300">
              {currentFolder.thumbnail ? (
                <img
                  src={currentFolder.thumbnail}
                  alt={currentFolder.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                  <Play className="w-12 h-12 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Type
              </h3>
              <p className="text-lg text-gray-900 capitalize">{currentFolder.contentType}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Status
              </h3>
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {currentFolder.status}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Published
              </h3>
              <div className="flex items-center gap-2 text-gray-900">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span>
                  {new Date(currentFolder.uploadDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Episodes
              </h3>
              <p className="text-lg text-gray-900">
                {currentFolder.parts?.length || 0} video{currentFolder.parts?.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Videos List */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Episodes</h3>

        {currentFolder.parts && currentFolder.parts.length > 0 ? (
          <div className="space-y-3">
            {currentFolder.parts.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onEdit={() => onEdit?.(video.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-600">No episodes in this folder</p>
          </div>
        )}
      </div>
    </div>
  )
}

interface VideoCardProps {
  video: any
  onEdit?: () => void
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onEdit }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:bg-gray-50 transition-colors">
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-24 h-24 rounded-md overflow-hidden bg-gray-200">
          {video.thumbnailUrl ? (
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
              <Play className="w-6 h-6 text-gray-600" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h4 className="font-semibold text-gray-900 line-clamp-2">{video.title}</h4>
              {video.description && (
                <p className="text-sm text-gray-600 line-clamp-1 mt-1">{video.description}</p>
              )}
            </div>
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-1 hover:bg-white rounded transition-colors flex-shrink-0"
              >
                <Edit className="w-4 h-4 text-gray-600 hover:text-blue-600" />
              </button>
            )}
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-3">
            {video.duration && (
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                <Clock className="w-3 h-3" />
                <span>{video.duration}</span>
              </div>
            )}

            <span className="capitalize bg-gray-100 px-2 py-1 rounded">
              {video.status}
            </span>

            {video.category && <span className="text-gray-500">{video.category}</span>}
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>0 views</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4" />
              <span>0 likes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span>0 comments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monetization Info */}
      {(video.monetizationType !== 'free' || video.isPremium) && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex gap-2">
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded capitalize">
              {video.monetizationType}
            </span>
            {video.isPremium && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                Premium Only
              </span>
            )}
            {video.isPrivate && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                Private
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoDetailComponent
