"use client"

export const dynamic = "force-dynamic"

import { useEffect, useMemo, useState } from "react"
import type { ChangeEvent } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  Save,
  Plus,
  FolderPlus,
  Film,
  Library,
  Clapperboard,
  Video,
  Play,
  Trash2,
  DollarSign,
} from "lucide-react"
import { UploadButton } from "@/lib/utils/uploadthing"
import { getVideoDuration } from "@/lib/utils/video-duration"

type VideoFormData = {
  title: string
  description: string
  category: string
  contentType: string
  packageName: string
  videoUrl: string
  videoFileId: string
  isPremium: boolean
  monetizationType: string
  rent24Price: string
  rent48Price: string
  purchasePrice: string
  tags: string[]
  duration: string
  uploadDate: string
  isPrivate: boolean
  allowComments: boolean
  ageRestriction: boolean
  status: string
  publishNow: boolean
  scheduledAt: string
  episodeIndex: string
  parts: Array<{ id: string; title: string; duration: string }>
}

const emptyFormData: VideoFormData = {
  title: "",
  description: "",
  category: "",
  contentType: "series",
  packageName: "",
  videoUrl: "",
  videoFileId: "",
  isPremium: false,
  monetizationType: "free",
  rent24Price: "",
  rent48Price: "",
  purchasePrice: "",
  tags: [],
  duration: "",
  uploadDate: "",
  isPrivate: false,
  allowComments: true,
  ageRestriction: false,
  status: "processing",
  publishNow: true,
  scheduledAt: "",
  episodeIndex: "",
  parts: [],
}

function buildFormData(folder: any, part: any): VideoFormData {
  return {
    title: part?.title ?? folder?.title ?? "",
    description: part?.description ?? "",
    category: part?.category ?? "",
    contentType: folder?.contentType ?? "series",
    packageName: part?.packageName ?? folder?.title ?? "",
    videoUrl: part?.videoUrl ?? "",
    videoFileId: part?.videoFileId ?? "",
    isPremium: part?.isPremium ?? false,
    monetizationType: part?.monetizationType ?? "free",
    rent24Price: part?.rent24Price?.toString?.() ?? "",
    rent48Price: part?.rent48Price?.toString?.() ?? "",
    purchasePrice: part?.purchasePrice?.toString?.() ?? "",
    tags: part?.tags ?? [],
    duration: part?.duration ?? "",
    uploadDate: part?.uploadDate
      ? new Date(part.uploadDate).toISOString().split("T")[0]
      : "",
    isPrivate: part?.isPrivate ?? false,
    allowComments: part?.allowComments ?? true,
    ageRestriction: part?.ageRestriction ?? false,
    status: part?.status ?? "processing",
    publishNow: part?.publishNow ?? true,
    scheduledAt: part?.scheduledAt
      ? new Date(part.scheduledAt).toISOString().split("T")[0]
      : "",
    episodeIndex: part?.episodeIndex?.toString?.() ?? "",
    parts:
      folder?.parts?.map((item: any) => ({
        id: item.id,
        title: item.title,
        duration: item.duration || "00:00",
      })) ?? [],
  }
}

function toNumberOrNull(value: string) {
  if (!value || !value.trim()) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export default function EditVideoPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  const presetVideoId = searchParams.get("video")

  const [folderData, setFolderData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPartId, setSelectedPartId] = useState<string | null>(presetVideoId)
  const [formData, setFormData] = useState<VideoFormData>(emptyFormData)
  const [pendingReplacementDuration, setPendingReplacementDuration] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadFolder() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`/api/creator/videos/${params.id}`)
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.message || "Failed to load folder")
        }

        const data = await res.json()
        const folder = data?.folder ?? null

        if (cancelled) return

        setFolderData(folder)

        const partList = folder?.parts ?? []
        const nextSelectedPart =
          partList.find((part: any) => part.id === presetVideoId) ??
          partList[0] ??
          null

        setSelectedPartId(nextSelectedPart?.id ?? null)
        setFormData(buildFormData(folder, nextSelectedPart))
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load folder")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadFolder()

    return () => {
      cancelled = true
    }
  }, [params.id, presetVideoId])

  const selectedPart = useMemo(() => {
    return folderData?.parts?.find((part: any) => part.id === selectedPartId) ?? null
  }, [folderData, selectedPartId])

  useEffect(() => {
    if (!folderData || !selectedPart) return
    setFormData(buildFormData(folderData, selectedPart))
  }, [folderData, selectedPart?.id])

  const currentVideoUrl = selectedPart?.videoUrl ?? ""
  const hasPendingReplacement = Boolean(formData.videoUrl && formData.videoUrl !== currentVideoUrl)

  const handleSaveChanges = async () => {
    if (!selectedPart?.id) {
      setError("Select a part to edit before saving.")
      return
    }

    try {
      setSaving(true)
      setError(null)

      const resp = await fetch(`/api/creator/videos/${selectedPart.id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          contentType: formData.contentType,
          videoUrl: formData.videoUrl || null,
          videoFileId: formData.videoFileId || null,
          duration: formData.duration,
          monetizationType: formData.monetizationType,
          isPremium: formData.isPremium,
          isPrivate: formData.isPrivate,
          rent24Price: toNumberOrNull(formData.rent24Price),
          rent48Price: toNumberOrNull(formData.rent48Price),
          purchasePrice: toNumberOrNull(formData.purchasePrice),
          tags: formData.tags,
          packageName: formData.packageName,
          allowComments: formData.allowComments,
          ageRestriction: formData.ageRestriction,
          status: formData.status,
          publishNow: formData.publishNow,
          scheduledAt: formData.scheduledAt || null,
          episodeIndex: formData.episodeIndex ? Number(formData.episodeIndex) : null,
        }),
      })

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}))
        throw new Error(data?.message || "Failed to save changes")
      }

      router.push(`/creator/videos/${params.id}/view`)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  const handleReplaceVideoBeforeUpload = async (files: File[]) => {
    const file = files[0]
    if (!file) return files

    const duration = await getVideoDuration(file)
    setPendingReplacementDuration(duration)
    return files
  }

  const handleDeleteVideo = async (videoId: string) => {
    if (!videoId) return

    const confirmed = window.confirm("Delete this video permanently?")
    if (!confirmed) return

    try {
      setSaving(true)
      setError(null)

      const resp = await fetch(`/api/creator/videos/${videoId}/edit`, {
        method: "DELETE",
      })

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}))
        throw new Error(data?.message || "Failed to delete video")
      }

      router.push(`/creator/videos/${params.id}/view`)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete video")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteFolder = async () => {
    const confirmed = window.confirm("Delete this folder and all videos inside it?")
    if (!confirmed) return

    try {
      setSaving(true)
      setError(null)

      const resp = await fetch(`/api/creator/videos/${params.id}`, {
        method: "DELETE",
      })

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}))
        throw new Error(data?.message || "Failed to delete folder")
      }

      router.push("/creator/videos")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete folder")
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.currentTarget
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.currentTarget as HTMLInputElement).checked : value,
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!folderData) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-lg font-semibold">Video folder not found</p>
          {error && <p className="text-sm text-muted-foreground">{error}</p>}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Video</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {folderData.title}
            </p>
          </div>

          <div className="min-w-[240px]">
            <label className="block text-xs font-medium text-muted-foreground mb-2">
              Editing Part
            </label>
            <select
              value={selectedPartId ?? ""}
              onChange={(e) => setSelectedPartId(e.target.value)}
              className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              {(folderData.parts ?? []).map((part: any, index: number) => (
                <option key={part.id} value={part.id} className="bg-background">
                  {index + 1}. {part.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-600/30 bg-red-600/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Content Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: "video", label: "Video", icon: Video },
                { id: "movie", label: "Movie", icon: Film },
                { id: "documentary", label: "Documentary", icon: Clapperboard },
                { id: "series", label: "Series", icon: Library },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, contentType: type.id }))}
                  className={`p-3 rounded-xl border transition-all text-center flex flex-col items-center gap-2 ${
                    formData.contentType === type.id
                      ? "border-red-600 bg-red-600/10 text-red-600"
                      : "border-border hover:border-red-600/50 text-muted-foreground"
                  }`}
                >
                  <type.icon className="w-5 h-5" />
                  <p className="text-xs font-semibold">{type.label}</p>
                </button>
              ))}
            </div>
          </div>

          {(formData.contentType === "series" ||
            formData.contentType === "movie" ||
            formData.contentType === "documentary") && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-2xl border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <FolderPlus className="w-5 h-5 text-red-500" />
                  <span>Content Folder / Package</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-yellow-600/10 border border-yellow-600/20 rounded-full">
                  <DollarSign className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs font-medium text-yellow-500 capitalize">
                    Monetization: {formData.monetizationType}
                  </span>
                </div>
              </div>

              <input
                type="text"
                value={formData.packageName}
                onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                placeholder="Folder Name (e.g. Movie Title or Series Name)"
                className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              />

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Folder Contents {folderData.contentType === "series" ? "(Episodes)" : "(Videos)"}
                    </h4>
                    <button
                      onClick={() => router.push(`/creator/videos/upload?folder=${params.id}`)}
                      className="text-xs flex items-center gap-1 text-red-500 hover:text-red-400 font-medium"
                      type="button"
                    >
                      <Plus className="w-3 h-3" />
                      {folderData.contentType === "series" ? "Add episode" : "Add video"}
                    </button>
                  </div>

                <div className="space-y-2">
                  {formData.parts.map((part) => (
                    <div
                      key={part.id}
                      className="flex items-center justify-between p-3 bg-background border border-border rounded-xl group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                          <Play className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{part.title}</p>
                          <p className="text-xs text-muted-foreground">{part.duration}</p>
                        </div>
                      </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteVideo(part.id)}
                          className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 p-4 bg-muted/30 rounded-2xl border border-border">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Replace Video File</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Upload a new file for this part. Duration is captured automatically before the upload starts.
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                Duration: <span className="text-foreground font-medium">{formData.duration || "N/A"}</span>
              </div>
            </div>

            <div className="border border-dashed border-border rounded-2xl p-4">
              <UploadButton
                endpoint="creatorVideoUploader"
                onBeforeUploadBegin={handleReplaceVideoBeforeUpload}
                onClientUploadComplete={(res) => {
                  const uploaded = res?.[0] as any
                  const videoUrl = uploaded?.ufsUrl || uploaded?.url || ""
                  const videoFileId = uploaded?.key || ""

                  if (!videoUrl || !videoFileId) return

                  setFormData((prev) => ({
                    ...prev,
                    videoUrl,
                    videoFileId,
                    duration: pendingReplacementDuration ?? prev.duration,
                  }))
                  setPendingReplacementDuration(null)
                }}
                onUploadError={(error: Error) => {
                  setError(error.message)
                }}
              />
            </div>

            {formData.videoUrl && (
              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      {hasPendingReplacement ? "Uploaded replacement preview" : "Current video preview"}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {hasPendingReplacement
                        ? "This uploaded video is ready. Click Update Video to save it."
                        : "This is the saved video for the selected part."}
                    </p>
                  </div>

                  {hasPendingReplacement && (
                    <span className="w-fit rounded-full border border-red-600/20 bg-red-600/10 px-3 py-1 text-xs font-medium text-red-400">
                      Pending update
                    </span>
                  )}
                </div>

                <video
                  key={formData.videoUrl}
                  src={formData.videoUrl}
                  controls
                  playsInline
                  className="w-full rounded-xl bg-black"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Video Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Tags</label>
            <input
              type="text"
              value={formData.tags.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),
                })
              }
              className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Rent 24h Price
              </label>
              <input
                type="number"
                name="rent24Price"
                value={formData.rent24Price}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Rent 48h Price
              </label>
              <input
                type="number"
                name="rent48Price"
                value={formData.rent48Price}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Purchase Price
              </label>
              <input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPrivate"
                checked={formData.isPrivate}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Private Video</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPremium"
                checked={formData.isPremium}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Premium Only</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="allowComments"
                checked={formData.allowComments}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Allow Comments</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="ageRestriction"
                checked={formData.ageRestriction}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Age Restriction (18+)</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="processing">Processing</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Scheduled Date
              </label>
              <input
                type="date"
                name="scheduledAt"
                value={formData.scheduledAt}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Episode Index
              </label>
              <input
                type="number"
                name="episodeIndex"
                value={formData.episodeIndex}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer md:mt-8">
              <input
                type="checkbox"
                name="publishNow"
                checked={formData.publishNow}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Publish Now</span>
            </label>
          </div>

          <div className="flex gap-3 border-t pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleDeleteVideo(selectedPart.id)}
              disabled={saving || !selectedPart?.id}
              className="px-4 py-2 border border-red-600/40 rounded-lg text-red-500 font-medium hover:bg-red-600/10 transition-colors disabled:opacity-50"
            >
              Delete Video
            </button>
            <button
              type="button"
              onClick={handleDeleteFolder}
              disabled={saving}
              className="px-4 py-2 border border-red-600 rounded-lg text-red-500 font-medium hover:bg-red-600/10 transition-colors disabled:opacity-50"
            >
              Delete Folder
            </button>
            <button
              type="button"
              disabled={saving || !selectedPart?.id}
              onClick={handleSaveChanges}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              <Save className="w-4 h-4" />
              {saving ? "Updating..." : "Update Video"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
