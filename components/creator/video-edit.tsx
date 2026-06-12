'use client'

import React, { useState, useEffect } from 'react'
import { useCreatorVideos } from '@/lib/hooks/use-creator-videos'
import type { Video, UpdateVideoRequest } from '@/lib/type/creator-video'
import { X, Save, AlertCircle } from 'lucide-react'

interface VideoEditComponentProps {
  video: Video
  onClose?: () => void
  onSave?: (video: Video) => void
}

const VideoEditComponent: React.FC<VideoEditComponentProps> = ({
  video,
  onClose,
  onSave,
}) => {
  const { updateVideo, loading, error, clearError } = useCreatorVideos()
  const [formData, setFormData] = useState<UpdateVideoRequest>({
    title: video.title,
    description: video.description,
    category: video.category,
    duration: video.duration,
    tags: video.tags ?? [],
    packageName: video.packageName,
    isPrivate: video.isPrivate,
    isPremium: video.isPremium,
    monetizationType: video.monetizationType,
    rent24Price: video.rent24Price,
    rent48Price: video.rent48Price,
    purchasePrice: video.purchasePrice,
    allowComments: video.allowComments,
    ageRestriction: video.ageRestriction,
    status: video.status,
    publishNow: video.publishNow,
    scheduledAt: video.scheduledAt ? new Date(video.scheduledAt).toISOString().split('T')[0] : '',
    episodeIndex: video.episodeIndex,
  })

  const [savedMessage, setSavedMessage] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.currentTarget
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.currentTarget as HTMLInputElement).checked : value,
    }))
  }

  const handleTagsChange = (newTags: string[]) => {
    setFormData((prev) => ({ ...prev, tags: newTags }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    try {
      await updateVideo(video.id, formData)
      setSavedMessage('Video updated successfully!')
      setTimeout(() => setSavedMessage(''), 3000)
      onSave?.({ ...video, ...formData })
    } catch (error) {
      // Error handled by hook
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Edit Video</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Error</h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {savedMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-green-700 text-sm">
          {savedMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Basic Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Video title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description ?? ''}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Video description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category ?? ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Tutorial, Entertainment"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (HH:MM:SS)
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration ?? ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="12:34:56"
              />
            </div>
          </div>
        </section>

        {/* Tags & Series */}
        <section className="space-y-4 border-t pt-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Content Organization
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {formData.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagsChange(formData.tags?.filter((_, i) => i !== idx) ?? [])}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <TagInput onAddTag={(tag) => handleTagsChange([...(formData.tags ?? []), tag])} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package Name (Series)
              </label>
              <input
                type="text"
                name="packageName"
                value={formData.packageName ?? ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Course Series 1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Episode Index
              </label>
              <input
                type="number"
                name="episodeIndex"
                value={formData.episodeIndex ?? ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1"
              />
            </div>
          </div>
        </section>

        {/* Monetization */}
        <section className="space-y-4 border-t pt-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Monetization & Pricing
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monetization Type
            </label>
            <select
              name="monetizationType"
              value={formData.monetizationType ?? 'free'}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="free">Free</option>
              <option value="rent24">Rent 24h</option>
              <option value="rent48">Rent 48h</option>
              <option value="purchase">Purchase</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rent 24h Price
              </label>
              <input
                type="number"
                name="rent24Price"
                value={formData.rent24Price ?? ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rent 48h Price
              </label>
              <input
                type="number"
                name="rent48Price"
                value={formData.rent48Price ?? ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purchase Price
              </label>
              <input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice ?? ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPrivate"
                checked={formData.isPrivate ?? false}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Private Video</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPremium"
                checked={formData.isPremium ?? false}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Premium Only</span>
            </label>
          </div>
        </section>

        {/* Settings */}
        <section className="space-y-4 border-t pt-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Settings
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="allowComments"
                checked={formData.allowComments ?? true}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Allow Comments</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="ageRestriction"
                checked={formData.ageRestriction ?? false}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Age Restriction (18+)</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status ?? 'processing'}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="processing">Processing</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scheduled Date
              </label>
              <input
                type="date"
                name="scheduledAt"
                value={formData.scheduledAt ?? ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="publishNow"
              checked={formData.publishNow ?? true}
              onChange={handleInputChange}
              className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Publish Now</span>
          </label>
        </section>

        {/* Form Actions */}
        <div className="flex gap-3 border-t pt-6">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

interface TagInputProps {
  onAddTag: (tag: string) => void
}

const TagInput: React.FC<TagInputProps> = ({ onAddTag }) => {
  const [input, setInput] = useState('')

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault()
      onAddTag(input.trim())
      setInput('')
    }
  }

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={handleKeyPress}
      placeholder="Type and press Enter to add tag"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
    />
  )
}

export default VideoEditComponent
