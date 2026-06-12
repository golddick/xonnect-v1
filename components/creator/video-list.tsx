'use client'

import React, { useState, useEffect } from 'react'
import { useCreatorVideos } from '@/lib/hooks/use-creator-videos'
import type { FolderListItem, VideoListItem } from '@/lib/type/creator-video'
import { ChevronDown, Play, Eye, Heart, MessageCircle } from 'lucide-react'

interface VideoListComponentProps {
  onSelectFolder?: (folderId: string) => void
  onSelectVideo?: (videoId: string, folderId: string) => void
  onAnalytics?: (folderId: string) => void
}

const VideoListComponent: React.FC<VideoListComponentProps> = ({
  onSelectFolder,
  onSelectVideo,
  onAnalytics,
}) => {
  const { folders, loading, error, fetchVideoList, clearError } = useCreatorVideos()
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchVideoList()
  }, [fetchVideoList])

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading videos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex justify-between items-start">
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

      {folders.length === 0 ? (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Play className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">No videos yet</h3>
          <p className="text-gray-600 text-sm">
            Create a folder and upload your first video to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {folders.map((folder) => (
            <FolderItem
              key={folder.id}
              folder={folder}
              isExpanded={expandedFolders.has(folder.id)}
              onToggleExpand={() => toggleFolder(folder.id)}
              onSelectFolder={() => onSelectFolder?.(folder.id)}
              onSelectVideo={(videoId) => onSelectVideo?.(videoId, folder.id)}
              onAnalytics={() => onAnalytics?.(folder.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface FolderItemProps {
  folder: FolderListItem
  isExpanded: boolean
  onToggleExpand: () => void
  onSelectFolder: () => void
  onSelectVideo: (videoId: string) => void
  onAnalytics: () => void
}

const FolderItem: React.FC<FolderItemProps> = ({
  folder,
  isExpanded,
  onToggleExpand,
  onSelectFolder,
  onSelectVideo,
  onAnalytics,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors">
      {/* Folder Header */}
      <div
        className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-colors"
        onClick={onToggleExpand}
      >
        <div className="flex items-start gap-4">
          {/* Thumbnail Cover */}
          <div className="relative flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden bg-gray-300">
            {folder.thumbnail ? (
              <img
                src={folder.thumbnail}
                alt={folder.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                <Play className="w-8 h-8 text-white" />
              </div>
            )}
            {/* Status Badge */}
            <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded capitalize">
              {folder.status}
            </div>
          </div>

          {/* Folder Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-semibold text-lg text-gray-900 truncate">
                {folder.title}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <span className="capitalize">{folder.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <Play className="w-4 h-4" />
                <span>{folder.itemsCount} episode{folder.itemsCount !== 1 ? 's' : ''}</span>
              </div>
              <div className="text-xs">
                {new Date(folder.uploadDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectFolder()
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md text-sm font-medium transition-colors"
              >
                View Details
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onAnalytics()
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-md text-sm font-medium transition-colors"
              >
                Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Videos List (Expandable) */}
      {isExpanded && folder.videos && folder.videos.length > 0 && (
        <div className="bg-white border-t border-gray-200 divide-y divide-gray-200">
          {folder.videos.map((video) => (
            <VideoListItemRow
              key={video.id}
              video={video}
              onSelect={() => onSelectVideo(video.id)}
            />
          ))}
        </div>
      )}

      {isExpanded && (!folder.videos || folder.videos.length === 0) && (
        <div className="bg-white border-t border-gray-200 p-6 text-center text-gray-500 text-sm">
          No videos in this folder
        </div>
      )}
    </div>
  )
}

interface VideoListItemRowProps {
  video: VideoListItem
  onSelect: () => void
}

const VideoListItemRow: React.FC<VideoListItemRowProps> = ({ video, onSelect }) => {
  return (
    <div
      className="p-4 hover:bg-blue-50 cursor-pointer transition-colors group"
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        {/* Video Thumbnail */}
        <div className="relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden bg-gray-200">
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
              <Play className="w-5 h-5 text-gray-600" />
            </div>
          )}
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all">
            <Play className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Video Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {video.title}
          </h4>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            {video.duration && (
              <span className="bg-gray-100 px-2 py-0.5 rounded">
                {video.duration}
              </span>
            )}
            <span className="capitalize">{video.status}</span>
            <span>
              {new Date(video.uploadDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex-shrink-0 flex gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>0</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>0</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoListComponent
