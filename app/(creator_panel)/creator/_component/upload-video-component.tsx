"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { uploadFile as uploadDropaphiFile } from "@/lib/auth/dropaphi-upload"
import { getVideoDuration } from "@/lib/utils/video-duration"

import { UploadButton } from "@/lib/utils/uploadthing"

import {
  Upload,
  Video,
  ImageIcon,
  DollarSign,
  Settings,
  X,
  Play,
  Lock,
  Globe,
  AlertCircle,
  FileVideo,
  Crown,
  Film,
  Clapperboard,
  Library,
  Plus,
  Trash2,
  FolderPlus,
} from "lucide-react"


interface UploadVideoProps {
  onClose?: () => void
  onUpload?: (videoData: any) => void
  initialFolderId?: string | null
}

export default function UploadVideoComponent({ onClose, onUpload, initialFolderId = null }: UploadVideoProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "music",
    contentType: "video", // "video", "movie", "documentary", "series"
    packageName: "", // (optional) display name, grouping should come from folder

    // Folder-first: every upload must belong to a folder
    folderId: null as string | null,

    // UploadThing outputs (no raw File anymore)
    videoUrl: null as string | null,
    videoFileId: null as string | null,
    videoDuration: null as string | null,
    episodes: [] as {
      id: string
      title: string
      videoUrl: string | null
      videoFileId: string | null
      duration: string | null
    }[],



    // DropAphi still uses raw File
    thumbnail: null as File | null,

    tags: [] as string[],
    isPrivate: false,
    isPremium: false,
    monetizationType: "free", // "free", "rent", "buy", "both"
    rent24Price: 0,
    rent48Price: 0,
    purchasePrice: 0,
    price: 0,
    allowComments: true,
    ageRestriction: false,
    publishNow: true,
    scheduledDate: "",
    scheduledTime: "",
  })

  const [currentTag, setCurrentTag] = useState("")
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const [uploadOpen] = useState(false)

  const [currentStep, setCurrentStep] = useState(1) // 1: Type & Folder, 2: Upload Files, 3: Details, 4: Monetization & Settings

  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([])
  const [folders, setFolders] = useState<Array<{ id: string; title: string; folderType?: string }>>([])
  const [folderLoading, setFolderLoading] = useState(false)
  const [categoriesLoading, setCategoriesLoading] = useState(false)

  // Folder creation states
  const [folderCreationMode, setFolderCreationMode] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [folderError, setFolderError] = useState("")

  // Upload completion indicators
  const [videoUploadComplete, setVideoUploadComplete] = useState(false)
  const [episodeUploadCount, setEpisodeUploadCount] = useState(0)
  const [pendingVideoDuration, setPendingVideoDuration] = useState<string | null>(null)

  useEffect(() => {
    if (!initialFolderId || folders.length === 0) return

    const initialFolder = folders.find((folder) => folder.id === initialFolderId)
    if (!initialFolder) return

    setFormData((prev) => ({
      ...prev,
      folderId: initialFolder.id,
      contentType: initialFolder.folderType ?? prev.contentType,
    }))
  }, [initialFolderId, folders])

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      try {
        setCategoriesLoading(true)
        const res = await fetch("/api/categories")
        const data = await res.json()
        if (!isMounted) return
        setCategories(data?.categories ?? [])
      } catch {
        // ignore
      } finally {
        if (isMounted) setCategoriesLoading(false)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      try {
        setFolderLoading(true)
        const res = await fetch("/api/creator/videos/folders")
        const data = await res.json()
        if (!isMounted) return
        setFolders(
          (data?.folders ?? []).map((folder: any) => ({
            id: folder.id,
            title: folder.title,
            folderType: folder.folderType,
          }))
        )
      } catch {
        // ignore
      } finally {
        if (isMounted) setFolderLoading(false)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [])



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const captureUploadDuration = async (files: File[]) => {
    const file = files[0]
    if (!file) return files

    const duration = await getVideoDuration(file)
    setPendingVideoDuration(duration)
    return files
  }

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      setFolderError("Folder name is required")
      return
    }

    setIsCreatingFolder(true)
    setFolderError("")

    try {
      const res = await fetch("/api/creator/videos/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newFolderName.trim(),
          folderType: formData.contentType,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || "Failed to create folder")
      }

        const data = await res.json()
        const createdFolder = data?.folder

        if (!createdFolder?.id) {
          throw new Error("Folder created but ID missing")
        }

      // Auto-select the newly created folder
      setFormData((prev) => ({ ...prev, folderId: createdFolder.id }))
      setFolders((prev) => [...prev, { id: createdFolder.id, title: createdFolder.title, folderType: createdFolder.folderType }])

      // Reset creation mode
      setFolderCreationMode(false)
      setNewFolderName("")
    } catch (error) {
      setFolderError(error instanceof Error ? error.message : "Failed to create folder")
    } finally {
      setIsCreatingFolder(false)
    }
  }

  // Legacy (raw File) upload handler kept unused after UploadThing wiring.

  const removeEpisode = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      episodes: prev.episodes.filter((ep) => ep.id !== id),
    }))
  }

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }))
      const reader = new FileReader()
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    setUploadProgress(0)

    try {
  

      let folderIdToUse = formData.folderId

      // Auto-create a folder if user didn't select one but provided a packageName
      // Backend expects: title + folderType (and status defaults to "active")
      if (!folderIdToUse && formData.packageName) {
        const createFolderResp = await fetch("/api/creator/videos/folders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.packageName,
            folderType: formData.contentType,
          }),
        })

        if (!createFolderResp.ok) {
          const data = await createFolderResp.json().catch(() => ({}))
          throw new Error(data?.message || "Failed to create folder")
        }

        const created = await createFolderResp.json()
        const createdFolderId = created?.folder?.id as string | undefined
        if (!createdFolderId) {
          throw new Error("Folder created but id missing")
        }

        folderIdToUse = createdFolderId
        setFormData((prev) => ({ ...prev, folderId: createdFolderId }))
      }

      if (!folderIdToUse) {
        throw new Error("Select a folder before uploading")
      }

      if (formData.contentType === "series" && formData.episodes.length === 0) {
        throw new Error("Series requires at least one episode upload")
      }
      if (formData.contentType !== "series" && !formData.videoUrl) {
        throw new Error("Video upload is required")
      }


      // 1) Upload thumbnail (DropAphi)
      let thumbnailUrl: string | null = null
      let thumbnailFileId: string | null = null

      if (formData.thumbnail) {
        const thumbRes = await uploadDropaphiFile(
          formData.thumbnail, 
          formData.thumbnail.name,
          {
            folder: "creator-thumbnails",
            visibility: "PUBLIC",
            filename: formData.thumbnail.name,
          }
        )

        if (!thumbRes.ok) {
          throw new Error(thumbRes.message || "Thumbnail upload failed")
        }

        thumbnailUrl = thumbRes.url ?? null
        thumbnailFileId = thumbRes.fileId ?? null
      }

      // Helper: scheduledAt
      const scheduledAt = !formData.publishNow
        ? new Date(`${formData.scheduledDate}T${formData.scheduledTime || "00:00"}:00Z`).toISOString()
        : null

      // Common payload fields
      const basePayload = {
        title: "" as string,
        description: formData.description || null,
        category: formData.category || null,
        isPrivate: formData.isPrivate,
        isPremium: formData.isPremium,
        monetizationType: formData.monetizationType,
        rent24Price: formData.monetizationType === "rent" || formData.monetizationType === "both" ? formData.rent24Price : null,
        rent48Price: formData.monetizationType === "rent" || formData.monetizationType === "both" ? formData.rent48Price : null,
        purchasePrice: formData.monetizationType === "buy" || formData.monetizationType === "both" ? formData.purchasePrice : null,
        allowComments: formData.allowComments,
        ageRestriction: formData.ageRestriction,
        publishNow: formData.publishNow,
        scheduledAt,
        tags: formData.tags,
        thumbnailUrl,
        thumbnailFileId,
        // Folder-first: all uploads belong to a folder
        folderId: formData.folderId,
      }



      // 2) Create videos in DB using already-uploaded UploadThing URLs/IDs
      const totalFiles = formData.contentType === "series" ? formData.episodes.length : 1
      let completed = 0
      const createdVideos: any[] = []

      if (formData.contentType === "series") {
        for (let i = 0; i < formData.episodes.length; i++) {
          const ep = formData.episodes[i]

          if (!ep.videoUrl || !ep.videoFileId) {
            throw new Error(`Episode ${i + 1} is missing videoUrl/videoFileId`)
          }

          const episodePayload = {
            ...basePayload,
            title: ep.title,
            packageName: formData.packageName,
            episodeIndex: i,
            videoUrl: ep.videoUrl,
            videoFileId: ep.videoFileId,
            duration: ep.duration ?? null,
          }

          const resp = await fetch("/api/creator/videos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(episodePayload),
          })

          if (!resp.ok) {
            const data = await resp.json().catch(() => ({}))
            throw new Error(data?.message || "Failed to create creator video")
          }

          const data = await resp.json()
          createdVideos.push(data?.video)
          completed++
          setUploadProgress((completed / totalFiles) * 100)
        }
      } else {
        if (!formData.videoUrl || !formData.videoFileId) {
          throw new Error("Missing videoUrl/videoFileId")
        }

        const payload = {
          ...basePayload,
          title: formData.title,
          videoUrl: formData.videoUrl,
          videoFileId: formData.videoFileId,
          packageName: formData.contentType === "movie" ? formData.packageName : null,
          episodeIndex: null,
          duration: formData.videoDuration ?? null,
        }

        const resp = await fetch("/api/creator/videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        if (!resp.ok) {
          const data = await resp.json().catch(() => ({}))
          throw new Error(data?.message || "Failed to create creator video")
        }

        const data = await resp.json()
        createdVideos.push(data?.video)
        setUploadProgress(100)
      }

      onUpload?.(createdVideos)
      onClose?.()
      router.push("/creator/videos")
    } catch (error) {
      console.error("Error uploading video:", error)
      setIsUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[90vh]  hidden-scrollbar overflow-y-auto">
        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Upload Video
            </h2>
            <p className="text-muted-foreground text-sm">Share your content with the world</p>
          </div>
          <button onClick={onClose} className="bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: "Type", icon: Library },
              { step: 2, label: "Upload", icon: Upload },
              { step: 3, label: "Details", icon: Video },
              { step: 4, label: "Settings", icon: Settings },
            ].map(({ step, label, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step ? "bg-red-600 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`ml-2 text-sm ${currentStep >= step ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
                {step < 4 && <div className={` hidden lg:block w-12 h-0.5 mx-2 ${currentStep > step ? "bg-red-600" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Type & Folder */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">What are you uploading?</h3>
                <p className="text-muted-foreground">Choose the content type and organize it</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    className={`p-6 rounded-2xl border transition-all text-center flex flex-col items-center gap-3 ${
                      formData.contentType === type.id
                        ? "border-red-600 bg-red-600/10 text-red-600 shadow-lg shadow-red-600/5"
                        : "border-border hover:border-red-600/50 text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    <type.icon className="w-8 h-8" />
                    <p className="font-semibold">{type.label}</p>
                  </button>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <FolderPlus className="w-5 h-5 text-red-500" />
                    <span>Select or Create Folder</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">All uploads will be saved into this folder.</p>

                {!folderCreationMode ? (
                  <div className="space-y-3">
                    <select
                      value={formData.folderId ?? ""}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === "__create_new__") {
                          setFolderCreationMode(true)
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            folderId: value || null,
                          }))
                        }
                      }}
                      className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    >
                      <option value="" disabled>
                        {folderLoading ? "Loading folders..." : "Choose a folder..."}
                      </option>
                      {folders.map((f) => (
                        <option key={f.id} value={f.id} className="bg-muted">
                          {f.title}
                        </option>
                      ))}
                      <option value="__create_new__" className="bg-muted font-semibold">
                        + Create New Folder
                      </option>
                    </select>
                    {formData.folderId && (
                      <div className="flex items-center gap-2 p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
                        <Play className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">Folder selected</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 p-4 bg-muted/30 border border-border rounded-xl">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Folder Name</label>
                      <input
                        type="text"
                        value={newFolderName}
                        onChange={(e) => {
                          setNewFolderName(e.target.value)
                          setFolderError("")
                        }}
                        placeholder={formData.contentType === "series" ? "Series name (e.g., Amazing Journey S1)" : "Folder name"}
                        className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        disabled={isCreatingFolder}
                      />
                    </div>
                    {folderError && (
                      <div className="flex items-center gap-2 p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-600">{folderError}</span>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleCreateFolder}
                        disabled={isCreatingFolder || !newFolderName.trim()}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      >
                        {isCreatingFolder ? "Creating..." : "Create Folder"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFolderCreationMode(false)
                          setNewFolderName("")
                          setFolderError("")
                        }}
                        disabled={isCreatingFolder}
                        className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-xl transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {(formData.contentType === "series" || formData.contentType === "movie") && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <Film className="w-5 h-5 text-red-500" />
                    <span>Package Name</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Display name to group {formData.contentType === "series" ? "episodes" : "content"} together.
                  </p>
                  <input
                    type="text"
                    name="packageName"
                    value={formData.packageName}
                    onChange={handleInputChange}
                    placeholder={formData.contentType === "series" ? "e.g., My Amazing Journey S1" : "Movie title"}
                    className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              )}

              <div className="flex justify-end pt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!formData.folderId}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Continue to Upload
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Upload Files */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {formData.contentType === "series" ? "Add Episodes" : "Upload Video File"}
                </h3>
                <p className="text-muted-foreground">
                  {formData.contentType === "series"
                    ? `Upload the episodes for "${formData.packageName}"`
                    : `Select the video file for your ${formData.contentType}`}
                </p>
              </div>

              {formData.contentType === "series" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {formData.episodes.map((ep) => (
                      <div key={ep.id} className="bg-muted/50 border border-border rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-red-600/10 p-2 rounded-lg">
                            <Play className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{ep.title}</p>
                            {ep.videoFileId ? (
                              <p className="text-xs text-muted-foreground">Uploaded</p>
                            ) : (
                              <p className="text-xs text-muted-foreground">Pending upload</p>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeEpisode(ep.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-muted-foreground/50 transition-colors">
                    <UploadButton
                      endpoint="creatorVideoUploader"
                      onBeforeUploadBegin={captureUploadDuration}
                      onClientUploadComplete={(res) => {
                        const uploaded = res?.[0] as any
                        console.log("UploadThing complete (series episode):", res, "uploaded:", uploaded)

                        const videoUrl = uploaded?.ufsUrl || uploaded?.url || null
                        const videoFileId = (uploaded?.key ?? null) as string | null

                        if (!videoUrl || !videoFileId) return

                        const nextIndex = formData.episodes.length + 1
                        const fallbackTitle = formData.packageName
                          ? `${formData.packageName} Episode ${nextIndex}`
                          : `Episode ${nextIndex}`

                        setFormData((prev) => ({
                          ...prev,
                          episodes: [
                            ...prev.episodes,
                            {
                              id: Math.random().toString(36).substr(2, 9),
                              title: fallbackTitle,
                              videoUrl,
                              videoFileId,
                              duration: pendingVideoDuration,
                            },
                          ],
                        }))
                        setPendingVideoDuration(null)
                      }}
                      onUploadError={(error: Error) => {
                        console.error(error)
                        alert(`ERROR! ${error.message}`)
                      }}
                    />
                  </div>
                </div>
              ) : (
              <div className="space-y-6">
                {videoUploadComplete && (
                  <div className="bg-green-600/10 border border-green-600/30 rounded-xl p-4 flex items-center gap-4">
                    <div className="bg-green-600/20 p-3 rounded-lg">
                      <Play className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-green-600">Video uploaded successfully</p>
                      <p className="text-sm text-green-600/80">Ready to add details</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setVideoUploadComplete(false)
                        setVideoPreview(null)
                        setPendingVideoDuration(null)
                        setFormData((prev) => ({ ...prev, videoUrl: null, videoFileId: null, videoDuration: null }))
                      }}
                      className="text-green-600 hover:text-green-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {!videoUploadComplete && (
                  <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-muted-foreground/50 transition-colors">
                    <UploadButton
                      endpoint="creatorVideoUploader"
                      onBeforeUploadBegin={captureUploadDuration}
                      onClientUploadComplete={(res) => {
                        const uploaded = res?.[0] as any
                        console.log("UploadThing complete res (single):", res, "uploaded:", uploaded)

                        const videoUrl = uploaded?.ufsUrl || uploaded?.url || null
                        const videoFileId = (uploaded?.key ?? null) as string | null

                        if (!videoUrl) return

                        setVideoPreview(videoUrl)
                        setVideoUploadComplete(true)
                        setFormData((prev) => ({
                          ...prev,
                          videoUrl,
                          videoFileId,
                          videoDuration: pendingVideoDuration,
                        }))
                        setPendingVideoDuration(null)
                      }}
                      onUploadError={(error: Error) => {
                        console.error(error)
                        alert(`ERROR! ${error.message}`)
                      }}
                    />
                  </div>
                )}
              </div>
              )}

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="bg-black text-white px-8 py-3 rounded-xl transition-colors"
                >
                  Back
                </button>

                {((formData.contentType === "series" && formData.episodes.length > 0) ||
                  (formData.contentType !== "series" && videoUploadComplete)) && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl transition-colors"
                  >
                    Continue to Details
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {currentStep === 3 && (
            <div className="space-y-8">
              {/* Video Preview */}
              {videoPreview && (
                <div className="bg-muted/50 border border-border rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-20 bg-muted rounded-lg flex items-center justify-center">
                      <Play className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Video uploaded</h4>
                      <p className="text-muted-foreground text-sm">
                        {formData.videoFileId ? `File ID: ${formData.videoFileId}` : "Ready"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setVideoPreview(null)
                        setPendingVideoDuration(null)
                        setFormData((prev) => ({ ...prev, videoUrl: null, videoFileId: null, videoDuration: null }))
                        setCurrentStep(1)
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Basic Information */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Video Details</h3>
                  <div className="flex items-center gap-2 px-3 py-1 bg-yellow-600/10 border border-yellow-600/20 rounded-full">
                    <DollarSign className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs font-medium text-yellow-500 capitalize">Monetization: {formData.monetizationType}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter video title"
                    className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your video..."
                    rows={4}
                    className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.slug} className="bg-muted">
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Thumbnail</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-muted-foreground/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="hidden"
                        id="thumbnail-upload"
                      />
                      <label htmlFor="thumbnail-upload" className="cursor-pointer">
                        <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground text-sm">Upload custom thumbnail</p>
                        <p className="text-muted-foreground/60 text-xs mt-1">PNG, JPG up to 5MB</p>
                      </label>
                    </div>
                  </div>

                  {thumbnailPreview && (
                    <div>
                      <div className="relative">
                        <img
                          src={thumbnailPreview || "/placeholder.svg"}
                          alt="Thumbnail preview"
                          className="w-full h-32 object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setThumbnailPreview(null)
                            setFormData((prev) => ({ ...prev, thumbnail: null }))
                          }}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 rounded-full p-1 transition-colors"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Tags</h3>

                <div>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      placeholder="Add a tag"
                      className="flex-1 bg-transparent border border-border rounded-xl px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-transparent border border-border text-muted-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-muted-foreground hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-black  hover:bg-muted/80 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Monetization & Settings */}
          {currentStep === 4 && (
            <div className="space-y-8">
              {/* Monetization */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-yellow-500" />
                    Monetization
                  </h3>
                  {formData.contentType === "series" && (
                    <span className="text-xs bg-yellow-600/10 text-yellow-500 px-3 py-1 rounded-full border border-yellow-600/20">
                      Applies to all episodes
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {["free", "rent", "buy", "both"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, monetizationType: type, isPremium: type !== "free" }))}
                        className={`p-4 rounded-xl border transition-all text-center ${
                          formData.monetizationType === type
                            ? "border-red-600 bg-red-600/10 text-red-600"
                            : "border-border hover:border-red-600/50 text-muted-foreground"
                        }`}
                      >
                        <p className="capitalize font-medium">{type}</p>
                      </button>
                    ))}
                  </div>

                  {(formData.monetizationType === "rent" || formData.monetizationType === "both") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">24h Rental Price (₦)</label>
                        <input
                          type="number"
                          name="rent24Price"
                          value={formData.rent24Price}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full bg-transparent border border-border rounded-xl px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">48h Rental Price (₦)</label>
                        <input
                          type="number"
                          name="rent48Price"
                          value={formData.rent48Price}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full bg-transparent border border-border rounded-xl px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {(formData.monetizationType === "buy" || formData.monetizationType === "both") && (
                    <div className="pt-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Purchase Price (₦)</label>
                      <input
                        type="number"
                        name="purchasePrice"
                        value={formData.purchasePrice}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full max-w-xs bg-transparent border border-border rounded-xl px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-4">
                    <input
                      type="checkbox"
                      id="isPremium"
                      name="isPremium"
                      disabled={formData.monetizationType !== "free"}
                      checked={formData.isPremium || formData.monetizationType !== "free"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-red-600 bg-transparent border-border rounded focus:ring-red-600"
                    />
                    <label htmlFor="isPremium" className="text-muted-foreground flex items-center gap-2">
                      <Crown className="w-4 h-4 text-yellow-500" />
                      Make this a premium video
                    </label>
                  </div>
                </div>
              </div>

              {/* Privacy & Settings */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Settings className="w-5 h-5 text-red-400" />
                  Privacy & Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isPrivate"
                      name="isPrivate"
                      checked={formData.isPrivate}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-red-600 bg-transparent border-border rounded focus:ring-red-600"
                    />
                    <label htmlFor="isPrivate" className="text-muted-foreground flex items-center gap-2">
                      {formData.isPrivate ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                      Followers Only (only followers can see it)
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="allowComments"
                      name="allowComments"
                      checked={formData.allowComments}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-red-600 bg-transparent border-border rounded focus:ring-red-600"
                    />
                    <label htmlFor="allowComments" className="text-muted-foreground">
                      Allow comments
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="ageRestriction"
                      name="ageRestriction"
                      checked={formData.ageRestriction}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-red-600 bg-muted border-border rounded focus:ring-red-600"
                    />
                    <label htmlFor="ageRestriction" className="text-muted-foreground">
                      Age restriction (18+)
                    </label>
                  </div>
                </div>
              </div>

              {/* Publishing */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Publishing</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="publishNow"
                      name="publishOption"
                      checked={formData.publishNow}
                      onChange={() => setFormData((prev) => ({ ...prev, publishNow: true }))}
                      className="w-4 h-4 text-red-600 bg-transparent border-border focus:ring-red-600"
                    />
                    <label htmlFor="publishNow" className="text-muted-foreground">
                      Publish immediately
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="schedulePublish"
                      name="publishOption"
                      checked={!formData.publishNow}
                      onChange={() => setFormData((prev) => ({ ...prev, publishNow: false }))}
                      className="w-4 h-4 text-red-600 bg-transparent border-border focus:ring-red-600"
                    />
                    <label htmlFor="schedulePublish" className="text-muted-foreground">
                      Schedule for later
                    </label>
                  </div>

                  {!formData.publishNow && (
                    <div className="ml-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Date</label>
                        <input
                          type="date"
                          name="scheduledDate"
                          value={formData.scheduledDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full bg-transparent border border-border rounded-xl px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Time</label>
                        <input
                          type="time"
                          name="scheduledTime"
                          value={formData.scheduledTime}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border border-border rounded-xl px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="bg-black hover:bg-muted/80 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-[2] bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      {formData.publishNow 
                        ? (formData.contentType === "series" ? "Upload Series Package" : formData.contentType === "movie" ? "Upload Movie Package" : formData.contentType === "documentary" ? "Upload Documentary" : "Upload Video") 
                        : "Schedule Upload"}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-6 bg-transparent border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-foreground font-medium">Uploading video...</span>
                <span className="text-muted-foreground">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-2 mt-3 text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Please don't close this window while uploading</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
