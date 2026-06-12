import { useState, useCallback } from 'react'
import type {
  Video,
  Folder,
  Analytics,
  CreateVideoRequest,
  UpdateVideoRequest,
  ApiListResponse,
  ApiVideoDetailResponse,
  ApiAnalyticsResponse,
  ApiUpdateResponse,
  FolderListItem,
} from '@/lib/type/creator-video'

interface UseCreatorVideosState {
  folders: FolderListItem[]
  currentFolder: Folder | null
  currentVideo: Video | null
  analytics: Analytics | null
  loading: boolean
  error: string | null
}

interface UseCreatorVideosActions {
  fetchVideoList: () => Promise<void>
  fetchFolderDetail: (folderId: string) => Promise<void>
  updateVideo: (videoId: string, data: UpdateVideoRequest) => Promise<void>
  fetchAnalytics: (folderId: string) => Promise<void>
  clearError: () => void
  reset: () => void
}

export const useCreatorVideos = (): UseCreatorVideosState & UseCreatorVideosActions => {
  const [state, setState] = useState<UseCreatorVideosState>({
    folders: [],
    currentFolder: null,
    currentVideo: null,
    analytics: null,
    loading: false,
    error: null,
  })

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }))
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, loading }))
  }, [])

  const fetchVideoList = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/creator/videos/list', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to fetch video list')
      }

      const data: ApiListResponse = await response.json()
      setState((prev) => ({
        ...prev,
        folders: data.items,
        loading: false,
      }))
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      setError(errorMsg)
      setLoading(false)
    }
  }, [])

  const fetchFolderDetail = useCallback(
    async (folderId: string) => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/creator/videos/${folderId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.message || 'Failed to fetch folder details')
        }

        const data: ApiVideoDetailResponse = await response.json()
        setState((prev) => ({
          ...prev,
          currentFolder: data.folder as Folder,
          loading: false,
        }))
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        setError(errorMsg)
        setLoading(false)
      }
    },
    []
  )

  const updateVideo = useCallback(
    async (videoId: string, updateData: UpdateVideoRequest) => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/creator/videos/${videoId}/edit`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.message || 'Failed to update video')
        }

        const data: ApiUpdateResponse = await response.json()
        setState((prev) => ({
          ...prev,
          currentVideo: data.video,
          loading: false,
        }))
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        setError(errorMsg)
        setLoading(false)
        throw error
      }
    },
    []
  )

  const fetchAnalytics = useCallback(
    async (folderId: string) => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/creator/videos/${folderId}/analytics`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.message || 'Failed to fetch analytics')
        }

        const data: ApiAnalyticsResponse = await response.json()
        setState((prev) => ({
          ...prev,
          analytics: data,
          loading: false,
        }))
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        setError(errorMsg)
        setLoading(false)
      }
    },
    []
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const reset = useCallback(() => {
    setState({
      folders: [],
      currentFolder: null,
      currentVideo: null,
      analytics: null,
      loading: false,
      error: null,
    })
  }, [])

  return {
    ...state,
    fetchVideoList,
    fetchFolderDetail,
    updateVideo,
    fetchAnalytics,
    clearError,
    reset,
  }
}
