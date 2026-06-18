"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Calendar,
  FileVideo,
  Image as ImageIcon,
  Link,
  Loader2,
  Settings,
  Trash2,
} from "lucide-react"
import { UploadButton } from "@/lib/utils/uploadthing"

type CategoryOption = {
  id: string
  name: string
  slug: string
}

type EventResponse = {
  event: {
    id: string
    title: string
    description: string | null
    category: string
    status: string
    scheduledAt: string | null
    timezone: string
    durationMinutes: number
    address: string | null
    thumbnailUrl: string | null
    thumbnailFileId: string | null
    thumbnailVideoUrl: string | null
    thumbnailVideoFileId: string | null
    recordedVideoUrl: string | null
    recordedVideoFileId: string | null
    recordingEnabled: boolean
    recordingStatus: string
    recordingUrl: string | null
    isPrivate: boolean
    isPaid: boolean
    requireTicket: boolean
    enableDonations: boolean
    enableLocationRestriction: boolean
    locationRestrictionType: "BLOCK" | "ALLOW"
    maxViewers: number | ""
    tags: string[]
  }
}

type EditState = {
  title: string
  description: string
  category: string
  scheduledDate: string
  scheduledTime: string
  timezone: string
  durationMinutes: number
  address: string
  thumbnailUrl: string
  thumbnailFileId: string
  thumbnailPreview: string
  thumbnailVideoUrl: string
  thumbnailVideoFileId: string
  thumbnailVideoPreview: string
  recordedVideoUrl: string
  recordedVideoFileId: string
  isPrivate: boolean
  isPaid: boolean
  requireTicket: boolean
  enableDonations: boolean
  enableLocationRestriction: boolean
  locationRestrictionType: "block" | "allow"
  maxViewers: number | ""
  tags: string[]
  recordingEnabled: boolean
  recordingStatus: "disabled" | "pending" | "recording" | "processing" | "ready" | "failed"
}

const emptyState: EditState = {
  title: "",
  description: "",
  category: "",
  scheduledDate: "",
  scheduledTime: "",
  timezone: "Africa/Lagos",
  durationMinutes: 60,
  address: "",
  thumbnailUrl: "",
  thumbnailFileId: "",
  thumbnailPreview: "",
  thumbnailVideoUrl: "",
  thumbnailVideoFileId: "",
  thumbnailVideoPreview: "",
  recordedVideoUrl: "",
  recordedVideoFileId: "",
  isPrivate: false,
  isPaid: false,
  requireTicket: false,
  enableDonations: false,
  enableLocationRestriction: false,
  locationRestrictionType: "block",
  maxViewers: "",
  tags: [],
  recordingEnabled: true,
  recordingStatus: "pending",
}

export default function EventEditPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const eventId = params.id

  const [state, setState] = useState<EditState>(emptyState)
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false)
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [currentTag, setCurrentTag] = useState("")
  const [error, setError] = useState("")
  const [eventStatus, setEventStatus] = useState("")
  const [recordingUrl, setRecordingUrl] = useState("")

  useEffect(() => {
    let active = true

    const loadCategories = async () => {
      try {
        setLoadingCategories(true)
        const response = await fetch("/api/categories", { cache: "no-store" })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data?.message ?? "Failed to load categories")
        }

        if (!active) return
        const nextCategories = (data?.categories ?? []).map((category: any) => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
        }))

        setCategories(nextCategories)
      } catch (err) {
        console.error("Failed to load categories:", err)
      } finally {
        if (active) setLoadingCategories(false)
      }
    }

    const loadEvent = async () => {
      try {
        setLoading(true)
        setError("")
        const response = await fetch(`/api/creator/events/${eventId}`, { cache: "no-store" })
        const data = (await response.json()) as EventResponse & { message?: string }

        if (!response.ok) {
          throw new Error(data.message ?? "Failed to load event")
        }

        if (!active) return

        const event = data.event
        const scheduledDate = event.scheduledAt ? new Date(event.scheduledAt).toISOString().split("T")[0] : ""
        const scheduledTime = event.scheduledAt ? new Date(event.scheduledAt).toISOString().slice(11, 16) : ""

        setState({
          title: event.title,
          description: event.description ?? "",
          category: event.category ?? "",
          scheduledDate,
          scheduledTime,
          timezone: event.timezone ?? "Africa/Lagos",
          durationMinutes: event.durationMinutes ?? 60,
          address: event.address ?? "",
          thumbnailUrl: event.thumbnailUrl ?? "",
          thumbnailFileId: event.thumbnailFileId ?? "",
          thumbnailPreview: event.thumbnailUrl ?? "",
          thumbnailVideoUrl: event.thumbnailVideoUrl ?? "",
          thumbnailVideoFileId: event.thumbnailVideoFileId ?? "",
          thumbnailVideoPreview: event.thumbnailVideoUrl ?? "",
          recordedVideoUrl: event.recordedVideoUrl ?? "",
          recordedVideoFileId: event.recordedVideoFileId ?? "",
          isPrivate: event.isPrivate,
          isPaid: event.isPaid,
          requireTicket: event.requireTicket,
          enableDonations: event.enableDonations,
          enableLocationRestriction: event.enableLocationRestriction,
          locationRestrictionType: event.locationRestrictionType === "ALLOW" ? "allow" : "block",
          maxViewers: typeof event.maxViewers === "number" && event.maxViewers > 0 ? event.maxViewers : "",
          tags: event.tags ?? [],
          recordingEnabled: event.recordingEnabled,
          recordingStatus: (event.recordingStatus.toLowerCase() as EditState["recordingStatus"]) || "pending",
        })
        setEventStatus(event.status)
        setRecordingUrl(event.recordingUrl ?? "")
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load event")
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadCategories()
    void loadEvent()

    return () => {
      active = false
    }
  }, [eventId])

  const canEdit = useMemo(() => {
    const scheduledAt = state.scheduledDate && state.scheduledTime ? new Date(`${state.scheduledDate}T${state.scheduledTime}`) : null
    const passed = scheduledAt ? scheduledAt <= new Date() : false
    return eventStatus !== "LIVE" && eventStatus !== "ENDED" && !passed
  }, [eventStatus, state.scheduledDate, state.scheduledTime])

  const update = <K extends keyof EditState>(key: K, value: EditState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const isYouTubeUrl = (value: string) => /(?:youtube\.com|youtu\.be)/i.test(value)

  const getYouTubeEmbedUrl = (value: string) => {
    try {
      const url = new URL(value)
      let videoId = url.searchParams.get("v")

      if (!videoId && url.hostname.includes("youtu.be")) {
        videoId = url.pathname.split("/").filter(Boolean)[0] ?? null
      }

      if (!videoId) {
        const match = url.pathname.match(/\/shorts\/([^/?]+)/i)
        videoId = match?.[1] ?? null
      }

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    } catch {
      return null
    }
  }

  const addTag = () => {
    const next = currentTag.trim()
    if (!next || state.tags.includes(next)) return
    setState((prev) => ({ ...prev, tags: [...prev.tags, next] }))
    setCurrentTag("")
  }

  const removeTag = (tag: string) => {
    setState((prev) => ({ ...prev, tags: prev.tags.filter((item) => item !== tag) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!canEdit) {
      setError("This event can no longer be edited.")
      return
    }

    try {
      setSaving(true)
      const scheduledAt =
        state.scheduledDate && state.scheduledTime
          ? new Date(`${state.scheduledDate}T${state.scheduledTime}`).toISOString()
          : null

      const response = await fetch(`/api/creator/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: state.title,
          description: state.description,
          category: state.category,
          scheduledAt,
          timezone: state.timezone,
          durationMinutes: state.durationMinutes,
          address: state.address,
          thumbnailUrl: state.thumbnailUrl || state.thumbnailPreview || null,
          thumbnailFileId: state.thumbnailFileId || null,
          thumbnailVideoUrl: state.thumbnailVideoUrl || state.thumbnailVideoPreview || null,
          thumbnailVideoFileId: state.thumbnailVideoFileId || null,
          recordedVideoUrl: state.recordedVideoUrl || null,
          recordedVideoFileId: state.recordedVideoFileId || null,
          isPrivate: state.isPrivate,
          isPaid: state.isPaid,
          requireTicket: state.requireTicket,
          enableDonations: state.enableDonations,
          enableLocationRestriction: state.enableLocationRestriction,
          locationRestrictionType: state.locationRestrictionType,
          maxViewers:
            typeof state.maxViewers === "number" && state.maxViewers > 0
              ? state.maxViewers
              : null,
          tags: state.tags,
          recordingEnabled: state.recordingEnabled,
          recordingStatus: state.recordingStatus,
          recordingUrl: recordingUrl || null,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.message ?? "Failed to update event")
      }

      router.push(`/creator/events/${eventId}/analytics`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update event")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 text-foreground">
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-red-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 text-foreground md:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Back
          </button>
          <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wide text-muted-foreground">
            {eventStatus || "Unknown"}
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-bold">Edit Event</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Changes are blocked once the event is live or the scheduled time has passed.
          </p>
        </div>

        {!canEdit && (
          <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
            This event is no longer editable.
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-600/30 bg-red-600/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 rounded-2xl border border-border bg-card p-3">
          {[
            { step: 1, label: "Basics", icon: ImageIcon },
            { step: 2, label: "Schedule", icon: Calendar },
            { step: 3, label: "Settings", icon: Settings },
          ].map(({ step, label, icon: Icon }) => (
            <button
              key={step}
              type="button"
              onClick={() => setCurrentStep(step)}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm transition-colors ${
                currentStep === step
                  ? "bg-red-600 text-white"
                  : "border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-6">
          {currentStep === 1 && (
            <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Title *</label>
              <input
                type="text"
                value={state.title}
                onChange={(e) => update("title", e.target.value)}
                disabled={!canEdit}
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Description</label>
              <textarea
                value={state.description}
                onChange={(e) => update("description", e.target.value)}
                disabled={!canEdit}
                className="min-h-28 w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold">Thumbnail Image</h2>
              </div>
              <div className="rounded-2xl border border-dashed border-border p-5">
                <UploadButton
                  endpoint="imageUploader"
                  onUploadBegin={() => {
                    setError("")
                    setUploadingThumbnail(true)
                  }}
                  onClientUploadComplete={(res) => {
                    const uploaded = res?.[0] as any
                    const imageUrl = uploaded?.ufsUrl || uploaded?.url || ""
                    const imageFileId = uploaded?.key || ""
                    if (!imageUrl) return
                    setState((prev) => ({
                      ...prev,
                      thumbnailUrl: imageUrl,
                      thumbnailFileId: imageFileId,
                      thumbnailPreview: imageUrl,
                    }))
                    setUploadingThumbnail(false)
                  }}
                  onUploadError={(uploadError: Error) => {
                    setUploadingThumbnail(false)
                    setError(uploadError.message)
                  }}
                />
              </div>
              {uploadingThumbnail && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading thumbnail...
                </div>
              )}
              {state.thumbnailPreview && (
                <img src={state.thumbnailPreview} alt="Thumbnail preview" className="h-48 w-full rounded-2xl object-cover" />
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileVideo className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold">Thumbnail Video</h2>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <UploadButton
                  endpoint="creatorVideoUploader"
                  onClientUploadComplete={(res) => {
                    const uploaded = res?.[0] as any
                    const videoUrl = uploaded?.ufsUrl || uploaded?.url || ""
                    const videoFileId = uploaded?.key || ""
                    if (!videoUrl) return
                    setState((prev) => ({
                      ...prev,
                      thumbnailVideoPreview: videoUrl,
                      thumbnailVideoUrl: videoUrl,
                      thumbnailVideoFileId: videoFileId,
                    }))
                  }}
                  onUploadError={(uploadError: Error) => setError(uploadError.message)}
                />
              </div>
              <input
                type="url"
                value={state.thumbnailVideoUrl}
                onChange={(e) =>
                  update("thumbnailVideoUrl", e.target.value)
                }
                disabled={!canEdit}
                placeholder="Paste a thumbnail video URL or YouTube link"
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
              />
              {state.thumbnailVideoUrl && (
                isYouTubeUrl(state.thumbnailVideoUrl) ? (
                  <iframe
                    className="h-56 w-full rounded-2xl border border-border bg-black"
                    src={getYouTubeEmbedUrl(state.thumbnailVideoUrl) ?? undefined}
                    title="Thumbnail video preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={state.thumbnailVideoUrl} controls className="h-48 w-full rounded-2xl bg-black object-cover" />
                )
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Link className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-semibold">Video URL</h2>
            </div>
            <input
              type="url"
              value={state.recordedVideoUrl}
              onChange={(e) => update("recordedVideoUrl", e.target.value)}
              disabled={!canEdit}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
            />
            {state.recordedVideoUrl && (
              isYouTubeUrl(state.recordedVideoUrl) ? (
                <iframe
                  className="h-56 w-full rounded-2xl border border-border bg-black"
                  src={getYouTubeEmbedUrl(state.recordedVideoUrl) ?? undefined}
                  title="Video URL preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={state.recordedVideoUrl} controls className="h-48 w-full rounded-2xl bg-black object-cover" />
              )
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex items-start gap-3 rounded-2xl border border-border p-4">
              <input
                type="checkbox"
                checked={state.isPrivate}
                onChange={(e) => update("isPrivate", e.target.checked)}
                disabled={!canEdit}
                className="mt-1 h-4 w-4"
              />
              <span>
                <span className="block font-medium">Private event</span>
                <span className="block text-sm text-muted-foreground">Restrict access.</span>
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-2xl border border-border p-4">
              <input
                type="checkbox"
                checked={state.requireTicket}
                onChange={(e) => update("requireTicket", e.target.checked)}
                disabled={!canEdit}
                className="mt-1 h-4 w-4"
              />
              <span>
                <span className="block font-medium">Require ticket</span>
                <span className="block text-sm text-muted-foreground">Gate the stream behind ticketing.</span>
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-2xl border border-border p-4">
              <input
                type="checkbox"
                checked={state.enableDonations}
                onChange={(e) => update("enableDonations", e.target.checked)}
                disabled={!canEdit}
                className="mt-1 h-4 w-4"
              />
              <span>
                <span className="block font-medium">Enable donations</span>
                <span className="block text-sm text-muted-foreground">Allow gifts during the event.</span>
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-2xl border border-border p-4">
              <input
                type="checkbox"
                checked={state.recordingEnabled}
                onChange={(e) => update("recordingEnabled", e.target.checked)}
                disabled={!canEdit}
                className="mt-1 h-4 w-4"
              />
              <span>
                <span className="block font-medium">Recording enabled</span>
                <span className="block text-sm text-muted-foreground">LiveKit will update the recording URL when egress completes.</span>
              </span>
            </label>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => setCurrentStep(2)} className="flex-1 rounded-xl border border-border px-4 py-3">
              Next: Schedule
            </button>
          </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Timezone</label>
                  <input
                    type="text"
                    value={state.timezone}
                    onChange={(e) => update("timezone", e.target.value)}
                    disabled={!canEdit}
                    className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Scheduled Date</label>
                  <input
                    type="date"
                    value={state.scheduledDate}
                    onChange={(e) => update("scheduledDate", e.target.value)}
                    disabled={!canEdit}
                    className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Scheduled Time</label>
                  <input
                    type="time"
                    value={state.scheduledTime}
                    onChange={(e) => update("scheduledTime", e.target.value)}
                    disabled={!canEdit}
                    className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Duration Minutes</label>
                  <input
                    type="number"
                    min={1}
                    value={state.durationMinutes}
                    onChange={(e) => update("durationMinutes", Number(e.target.value))}
                    disabled={!canEdit}
                    className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Max Viewers</label>
                  <input
                    type="number"
                    min={1}
                    value={state.maxViewers}
                    onChange={(e) =>
                      update(
                        "maxViewers",
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    disabled={!canEdit}
                    className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">Address</label>
                  <input
                    type="text"
                    value={state.address}
                    onChange={(e) => update("address", e.target.value)}
                    disabled={!canEdit}
                    className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setCurrentStep(1)} className="flex-1 rounded-xl border border-border px-4 py-3">
                  Back
                </button>
                <button type="button" onClick={() => setCurrentStep(3)} className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-white">
                  Next: Settings
                </button>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Recording Status</label>
              <select
                value={state.recordingStatus}
                onChange={(e) => update("recordingStatus", e.target.value as EditState["recordingStatus"])}
                disabled={!canEdit}
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
              >
                <option value="disabled">Disabled</option>
                <option value="pending">Pending</option>
                <option value="recording">Recording</option>
                <option value="processing">Processing</option>
                <option value="ready">Ready</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Recording URL</label>
              <input
                type="url"
                value={recordingUrl}
                onChange={(e) => setRecordingUrl(e.target.value)}
                disabled={!canEdit}
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
                placeholder="Filled automatically by LiveKit webhook"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium">Tags</label>
              <button type="button" onClick={addTag} className="text-sm text-red-400">
                Add tag
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                disabled={!canEdit}
                className="flex-1 rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
                placeholder="Add a tag"
              />
              <button type="button" onClick={addTag} disabled={!canEdit} className="rounded-xl bg-red-600 px-4 py-3 text-white disabled:opacity-50">
                <Trash2 className="h-4 w-4 rotate-45" />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {state.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} disabled={!canEdit}>
                    <Trash2 className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="flex-1 rounded-xl border border-border px-4 py-3"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-xl border border-border px-4 py-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canEdit || saving}
              className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
            </>
          )}
        </form>

        {recordingUrl && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Recording Output</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Webhooks update this URL after LiveKit egress finishes.
            </p>
            <input
              readOnly
              value={recordingUrl}
              className="mt-4 w-full rounded-xl border border-border bg-transparent px-4 py-3"
            />
          </div>
        )}
      </div>
    </div>
  )
}
