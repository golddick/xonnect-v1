"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Video,
  Settings,
  DollarSign,
  Users,
  Lock,
  Upload,
  X,
  Save,
  AlertCircle,
  Globe,
  Check,
  UserCheck,
  Ticket,
  Flag,
  MapPin,
  Building,
  Search,
  Plus,
  Loader2,
} from "lucide-react"
import { LocationData } from "@/lib/type/location"
import { toast } from "sonner"
import LocationSearchModal from "./LocationSearchModal"
import { UploadButton } from "@/lib/utils/uploadthing"
import UploadFile from "@/components/common_component/DropAPHI-upload"
// import { uploadFileRaw } from "@/lib/auth/dropaphi-upload"

interface ScheduleEventProps {
  onClose?: () => void
}

type CategoryOption = {
  id: string
  name: string
  slug: string
}

export default function ScheduleEventComponent({ onClose }: ScheduleEventProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "", 
    thumbnailPreview: "",
    video: "", 
    videoPreview: "",
    thumbnailVideoUrl: "",
    thumbnailVideoPreview: "",
    tags: [] as string[],
    scheduledDate: "",
    scheduledTime: "",
    timezone: "Africa/Lagos",
    duration: 60,
    address: "",
    location: null as LocationData | null,
    isPrivate: false,
    requireTicket: false,
    maxViewers: 0,
    enableDonations: false,
    enableLocationRestriction: false,
    restrictedLocations: [] as LocationData[],
    locationRestrictionType: "block" as "block" | "allow",
  })

  const [currentLocation, setCurrentLocation] = useState("")
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [locationModalMode, setLocationModalMode] = useState<'event-location' | 'restriction'>('event-location')
  const [currentTag, setCurrentTag] = useState("")
  const [uploadProgress, setUploadProgress] = useState({
    thumbnail: 0,
    video: 0
  })
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false)

  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true)
        const response = await fetch("/api/categories", { cache: "no-store" })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data?.message ?? "Failed to load categories")
        }

        const nextCategories = (data?.categories ?? []).map((category: any) => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
        }))

        setCategories(nextCategories)
        
        // Optionally set default category if available
        if (nextCategories.length > 0) {
          setEventData(prev => ({ ...prev, category: nextCategories[0].id }))
        }
      } catch (err) {
        console.error("Failed to load categories:", err)
        toast.error("Failed to load categories")
      } finally {
        setLoadingCategories(false)
      }
    }

    loadCategories()
  }, [])

  const timezones = [
    { value: "Africa/Lagos", label: "Lagos (WAT)" },
    { value: "UTC", label: "UTC" },
    { value: "America/New_York", label: "New York (EST)" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  ]

  const addLocation = () => {
    if (currentLocation.trim() && !eventData.restrictedLocations.some(loc => loc.name === currentLocation.trim())) {
      setEventData(prev => ({
        ...prev,
        restrictedLocations: [...prev.restrictedLocations, {
          name: currentLocation.trim(),
          country: "",
          type: 'city'
        }],
      }))
      setCurrentLocation("")
    }
  }

  const removeLocation = (locationToRemove: string) => {
    setEventData(prev => ({
      ...prev,
      restrictedLocations: prev.restrictedLocations.filter(loc => loc.name !== locationToRemove),
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    const { name } = target
    const value = target.type === "checkbox"
      ? (target as HTMLInputElement).checked
      : target.type === "number"
        ? Number(target.value)
        : target.value

    setEventData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  

  const removeThumbnail = () => {
    setEventData(prev => ({ 
      ...prev, 
      thumbnail: "",
      thumbnailPreview: "" 
    }))
    setUploadProgress(prev => ({ ...prev, thumbnail: 0 }))
  }

  const removeVideo = () => {
    setEventData(prev => ({ 
      ...prev, 
      video: "",
      videoPreview: "",
      thumbnailVideoUrl: "",
      thumbnailVideoPreview: ""
    }))
    setUploadProgress(prev => ({ ...prev, video: 0 }))
  }

  const addTag = () => {
    if (currentTag.trim() && !eventData.tags.includes(currentTag.trim())) {
      setEventData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setEventData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(false)

    if (!eventData.title.trim()) {
      const message = "Please enter an event title"
      setSubmitError(message)
      toast.error(message)
      return
    }

    if (!eventData.thumbnail) {
      const message = "Please upload a thumbnail image"
      setSubmitError(message)
      toast.error(message)
      return
    }

    if (!eventData.location) {
      const message = "Please select an event location"
      setSubmitError(message)
      toast.error(message)
      return
    }

    if (eventData.enableLocationRestriction && eventData.restrictedLocations.length === 0) {
      const message = "Please add at least one location for location restriction, or disable location restriction."
      setSubmitError(message)
      toast.error(message)
      return
    }

    if (!eventData.scheduledDate || !eventData.scheduledTime) {
      const message = "Please select date and time"
      setSubmitError(message)
      toast.error(message)
      return
    }

    const scheduledDateTime = new Date(`${eventData.scheduledDate}T${eventData.scheduledTime}`)
    if (scheduledDateTime <= new Date()) {
      const message = "Please select a future date and time"
      setSubmitError(message)
      toast.error(message)
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        title: eventData.title.trim(),
        description: eventData.description.trim() || null,
        category: eventData.category,
        status: "scheduled",
        isPrivate: eventData.isPrivate,
        isPaid: eventData.requireTicket,
        requireTicket: eventData.requireTicket,
        enableDonations: eventData.enableDonations,
        enableLocationRestriction: eventData.enableLocationRestriction,
        locationRestrictionType: eventData.locationRestrictionType,
        address: eventData.address.trim() || null,
        locationName: eventData.location?.name || null,
        locationCountry: eventData.location?.country || null,
        locationState: eventData.location?.state || null,
        locationType: eventData.location?.type || null,
        locationLat: eventData.location?.lat ?? null,
        locationLon: eventData.location?.lon ?? null,
        locationFullAddress: eventData.location?.fullAddress || eventData.address.trim() || null,
        thumbnailUrl: eventData.thumbnail || null,
        thumbnailVideoUrl: eventData.thumbnailVideoUrl.trim() || eventData.video.trim() || null,
        timezone: eventData.timezone,
        scheduledAt: scheduledDateTime.toISOString(),
        durationMinutes: Number(eventData.duration) || 60,
        maxViewers: eventData.maxViewers > 0 ? eventData.maxViewers : null,
        tags: eventData.tags,
        restrictedLocations: eventData.enableLocationRestriction ? eventData.restrictedLocations.map((location) => ({
          name: location.name,
          country: location.country,
          state: location.state || null,
          lat: location.lat ?? null,
          lon: location.lon ?? null,
          type: location.type,
          fullAddress: location.fullAddress || null,
        })) : [],
      }

      console.log("Submitting event payload:", payload)

      const response = await fetch("/api/creator/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        const message = data?.message || "Failed to schedule event. Please try again."
        setSubmitError(message)
        toast.error(message)
        return
      }

      setSubmitSuccess(true)
      toast.success("Event scheduled successfully")

      setTimeout(() => {
        if (onClose) {
          onClose()
        }
        router.push('/dashboard/creator/events')
      }, 1200)
    } catch (error) {
      console.error("Error submitting event:", error)
      const message = error instanceof Error ? error.message : "Failed to schedule event. Please try again."
      setSubmitError(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValidDateTime = () => {
    if (!eventData.scheduledDate || !eventData.scheduledTime) return false
    const scheduledDateTime = new Date(`${eventData.scheduledDate}T${eventData.scheduledTime}`)
    return scheduledDateTime > new Date()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-white rounded-2xl w-full max-w-4xl max-h-[90vh] hidden-scrollbar hidden-scrollbar::-webkit-scrollbar overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Schedule Event
            </h2>
            <p className="text-muted-foreground text-sm hidden md:block">Set up your upcoming live event</p>
          </div>
          <button onClick={onClose} className="bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: "Details", icon: Video },
              { step: 2, label: "Schedule", icon: Calendar },
              { step: 3, label: "Settings", icon: Settings },
            ].map(({ step, label, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step ? "bg-red-600 text-foreground" : "bg-black text-gray-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`ml-2 text-sm ${currentStep >= step ? "text-foreground" : "text-gray-400"}`}>{label}</span>
                {step < 3 && <div className={`w-16 hidden lg:block h-0.5 mx-4 ${currentStep > step ? "bg-red-600" : "bg-gray-800"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="mx-6 mt-4 p-4 bg-red-600/20 border border-red-600/30 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{submitError}</p>
            <button 
              onClick={() => setSubmitError(null)}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Success Message */}
        {submitSuccess && (
          <div className="mx-6 mt-4 p-4 bg-green-600/20 border border-green-600/30 rounded-xl flex items-center gap-3">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-sm">Event scheduled successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Stream Details</h2>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Stream Title *</label>
                <input
                  type="text"
                  name="title"
                  value={eventData.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                  className="w-full border border-border bg-transparent rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your event"
                  rows={4}
                  className="w-full border border-border bg-transparent rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <select
                    name="category"
                    value={eventData.category}
                    onChange={handleInputChange}
                    className="w-full border border-border bg-background rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                    disabled={loadingCategories}
                  >
                    {loadingCategories ? (
                      <option className="text-muted-foreground" value="">Loading categories...</option>
                    ) : categories.length === 0 ? (
                      <option className="text-muted-foreground" value="">No categories available</option>
                    ) : (
                      categories.map((cat) => (
                        <option className="text-muted-foreground" key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))
                    )}
                  </select>
                  {loadingCategories && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Event Location *</label>
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        setLocationModalMode('event-location')
                        setShowLocationModal(true)
                      }}
                      className="w-full border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-gray-700/50 transition-colors text-left flex items-center justify-between group"
                    >
                      {eventData.location ? (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-900 rounded-lg">
                            {(() => {
                              const type = eventData.location.type
                              switch (type) {
                                case 'country': return <Flag className="w-4 h-4 text-red-500" />
                                case 'state': return <MapPin className="w-4 h-4 text-green-500" />
                                case 'city': return <Building className="w-4 h-4 text-yellow-500" />
                                default: return <Globe className="w-4 h-4 text-gray-400" />
                              }
                            })()}
                          </div>
                          <div>
                            <span className="font-medium text-foreground">{eventData.location.name}</span>
                            <p className="text-sm text-gray-400">
                              {eventData.location.state && `${eventData.location.state}, `}{eventData.location.country}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Select event location</span>
                      )}
                      <Search className="w-4 h-4 text-gray-500 group-hover:text-foreground transition-colors" />
                    </button>
                    
                    {eventData.location && (
                      <button
                        type="button"
                        onClick={() => setEventData(prev => ({ ...prev, location: null }))}
                        className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        Clear location
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Address (if physical event)</label>
                <input
                  type="text"
                  name="address"
                  value={eventData.address}
                  onChange={handleInputChange}
                  placeholder="Enter venue address"
                  className="w-full border border-border bg-transparent rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Thumbnail Image *</label>
                <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-red-600 transition-colors">
                  
                  <UploadFile
                initialUrl={eventData.thumbnail || null}
                onUploaded={(url) => {
                  setEventData(prev => ({ 
                    ...prev, 
                    thumbnail: url,
                    thumbnailPreview: url 
                  }))
                  setUploadProgress(prev => ({ ...prev, thumbnail: 100 }))
                  toast.success("Thumbnail uploaded successfully")
                }}
                size={120}
                rounded="lg"
                uploadText="Click to upload thumbnail image"
                noImageText="No thumbnail"
                accept="image/*"
                className="w-full flex justify-center items-center"
                containerClassName="space-y-4 flex justify-center items-center w-full"
                previewClassName="shadow-lg border-2 border-dashed border-gray-700"
              />
                  {/* <label htmlFor="thumbnail-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-foreground text-sm">
                      {isUploadingThumbnail ? "Uploading..." : "Click to upload thumbnail image"}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">Recommended: 1280x720px, max 5MB</p>
                  </label> */}
                </div>
                
                {eventData.thumbnailPreview && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Thumbnail uploaded</span>
                      <button
                        type="button"
                        onClick={removeThumbnail}
                        className="text-red-500 hover:text-red-400 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    {uploadProgress.thumbnail > 0 && uploadProgress.thumbnail < 100 && (
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress.thumbnail}%` }}
                        ></div>
                      </div>
                    )}
                    {uploadProgress.thumbnail === 100 && (
                      <div className="flex items-center gap-2 text-green-500 text-sm">
                        <Check className="w-4 h-4" />
                        Upload complete
                      </div>
                    )}
                    <img
                      src={eventData.thumbnailPreview || "/placeholder.svg"}
                      alt="Thumbnail preview"
                      className="w-full h-48 object-cover rounded-lg mt-2"
                    />
                  </div>
                )}
              </div>

              {/* Thumbnail Video Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Thumbnail Video (Optional)</label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-red-600 transition-colors">
                  {!eventData.thumbnailVideoUrl ? (
                    <div className="space-y-4">
                      <UploadButton
                        endpoint="creatorVideoUploader"
                        onClientUploadComplete={(res) => {
                          if (res && res.length > 0) {
                            const url = res[0].url
                            setEventData(prev => ({
                              ...prev,
                              thumbnailVideoUrl: url,
                              thumbnailVideoPreview: url,
                              video: url,
                              videoPreview: url,
                            }))
                            setUploadProgress(prev => ({ ...prev, video: 100 }))
                          }
                        }}
                        onUploadProgress={(progress) => {
                          setUploadProgress(prev => ({ ...prev, video: progress }))
                        }}
                        onUploadError={(error) => {
                          toast.error(`Upload failed: ${error.message}`)
                        }}
                        className="uploadthing-button"
                      />
                      <input
                        type="url"
                        value={eventData.thumbnailVideoUrl}
                        onChange={(e) => {
                          const value = e.target.value
                          setEventData(prev => ({
                            ...prev,
                            thumbnailVideoUrl: value,
                            thumbnailVideoPreview: value,
                            video: value,
                            videoPreview: value,
                          }))
                        }}
                        placeholder="Or paste a video URL"
                        className="w-full border border-border bg-transparent rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Thumbnail video ready</span>
                        <button
                          type="button"
                          onClick={removeVideo}
                          className="text-red-500 hover:text-red-400 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      {uploadProgress.video > 0 && uploadProgress.video < 100 && (
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress.video}%` }}
                          ></div>
                        </div>
                      )}
                      {uploadProgress.video === 100 && (
                        <div className="flex items-center gap-2 text-green-500 text-sm">
                          <Check className="w-4 h-4" />
                          Upload complete
                        </div>
                      )}
                      <video
                        src={eventData.thumbnailVideoUrl || eventData.videoPreview}
                        controls
                        className="w-full h-48 object-cover rounded-lg mt-2"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add tags"
                    className="flex-1 border border-border bg-transparent rounded-lg px-4 py-2 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="hover:bg-red-600 text-foreground px-4 py-2 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {eventData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors"
              >
                Continue 
              </button>
            </div>
          )}

          {/* Step 2: Schedule */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Date *</label>
                  <input
                    type="date"
                    name="scheduledDate"
                    value={eventData.scheduledDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border border-border bg-transparent rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Time *</label>
                  <input
                    type="time"
                    name="scheduledTime"
                    value={eventData.scheduledTime}
                    onChange={handleInputChange}
                    className="w-full border border-border bg-transparent rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
                <select
                  name="timezone"
                  value={eventData.timezone}
                  onChange={handleInputChange}
                  className="w-full border border-border bg-transparent rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value} className="bg-background text-foreground">
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Expected Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={eventData.duration}
                  onChange={handleInputChange}
                  min="15"
                  max="480"
                  className="w-full border border-border bg-transparent rounded-xl px-4 py-3 text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
                <p className="text-gray-500 text-xs mt-1">Minimum 15 minutes, maximum 8 hours</p>
              </div>

              {!isValidDateTime() && eventData.scheduledDate && eventData.scheduledTime && (
                <div className="bg-red-600/20 border border-red-600/30 rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-400 text-sm">Please select a future date and time</p>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="bg-black text-white px-6 py-3 rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={!isValidDateTime()}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-black disabled:text-gray-500 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Settings */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Event Settings</h2>
              
              <div className="space-y-8">
                {/* Privacy Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5 text-red-500" />
                    Privacy Settings
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setEventData(prev => ({ ...prev, isPrivate: false }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${!eventData.isPrivate ? 'border-red-500 bg-red-500/10' : 'border-gray-700 bg-transparent hover:border-gray-600'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${!eventData.isPrivate ? 'border-red-500 bg-red-500' : 'border-gray-600'}`}>
                          {!eventData.isPrivate && <Check className="w-4 h-4 text-foreground" />}
                        </div>
                        <Globe className="w-5 h-5 text-red-400" />
                        <div className="text-left">
                          <h4 className="font-medium text-foreground">Public Stream</h4>
                          <p className="text-sm text-gray-400">Visible to everyone</p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEventData(prev => ({ ...prev, isPrivate: true }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${eventData.isPrivate ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-700 bg-transparent hover:border-gray-600'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${eventData.isPrivate ? 'border-yellow-500 bg-yellow-500' : 'border-gray-600'}`}>
                          {eventData.isPrivate && <Check className="w-4 h-4 text-foreground" />}
                        </div>
                        <UserCheck className="w-5 h-5 text-yellow-400" />
                        <div className="text-left">
                          <h4 className="font-medium text-foreground">Followers Only</h4>
                          <p className="text-sm text-gray-400">Only your followers can watch</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {eventData.isPrivate && (
                    <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                      <div className="flex items-center gap-2 text-yellow-400 text-sm">
                        <Lock className="w-4 h-4" />
                        <p>This event will only be visible to your followers</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Location Restriction Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Globe className="w-5 h-5 text-red-500" />
                    Location Restrictions
                  </h3>

                  <div className="space-y-6 rounded-xl">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="enableLocationRestriction"
                            checked={eventData.enableLocationRestriction}
                            onChange={(e) => setEventData(prev => ({ 
                              ...prev, 
                              enableLocationRestriction: e.target.checked,
                            }))}
                            className="sr-only"
                          />
                          <div className={`w-10 h-6 relative rounded-full transition-all duration-200 ${eventData.enableLocationRestriction ? 'bg-blue-600' : 'bg-gray-700'}`}>
                            <div className={`w-4 h-4 absolute top-1 rounded-full bg-white transform transition-transform duration-200 ${eventData.enableLocationRestriction ? 'translate-x-5' : 'translate-x-1'}`} />
                          </div>
                        </div>
                        <div>
                          <span className="text-foreground font-medium">Enable Location Restriction</span>
                          <p className="text-gray-400 text-sm">Restrict access based on viewer's location</p>
                        </div>
                      </label>
                    </div>

                    {eventData.enableLocationRestriction && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Restriction Type</label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <div className="relative">
                                <input
                                  type="radio"
                                  name="locationRestrictionType"
                                  checked={eventData.locationRestrictionType === "block"}
                                  onChange={() => setEventData(prev => ({ ...prev, locationRestrictionType: "block" }))}
                                  className="sr-only"
                                />
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${eventData.locationRestrictionType === "block" ? 'border-red-500' : 'border-gray-600'}`}>
                                  {eventData.locationRestrictionType === "block" && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                  )}
                                </div>
                              </div>
                              <span className="text-foreground text-sm">Block Locations</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <div className="relative">
                                <input
                                  type="radio"
                                  name="locationRestrictionType"
                                  checked={eventData.locationRestrictionType === "allow"}
                                  onChange={() => setEventData(prev => ({ ...prev, locationRestrictionType: "allow" }))}
                                  className="sr-only"
                                />
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${eventData.locationRestrictionType === "allow" ? 'border-green-500' : 'border-gray-600'}`}>
                                  {eventData.locationRestrictionType === "allow" && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                  )}
                                </div>
                              </div>
                              <span className="text-foreground text-sm">Allow Only Locations</span>
                            </label>
                          </div>
                          <p className="text-gray-400 text-xs mt-2">
                            {eventData.locationRestrictionType === "block" 
                              ? "Users in these locations will NOT be able to access the stream"
                              : "ONLY users in these locations will be able to access the stream"}
                          </p>
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              setLocationModalMode('restriction')
                              setShowLocationModal(true)
                            }}
                            className="w-full border border-border rounded-lg px-4 py-3 text-foreground hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-colors flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-900 rounded-lg">
                                {eventData.locationRestrictionType === "block" ? (
                                  <X className="w-4 h-4 text-red-500" />
                                ) : (
                                  <Check className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                              <div>
                                <span className="font-medium text-foreground">
                                  {eventData.restrictedLocations.length > 0 
                                    ? `${eventData.restrictedLocations.length} location${eventData.restrictedLocations.length !== 1 ? 's' : ''} selected`
                                    : 'Add locations'}
                                </span>
                                <p className="text-sm text-gray-400">
                                  {eventData.locationRestrictionType === "block" 
                                    ? 'Select locations to block'
                                    : 'Select locations to allow'}
                                </p>
                              </div>
                            </div>
                            <Plus className="w-4 h-4 text-gray-500 group-hover:text-foreground transition-colors" />
                          </button>

                          {eventData.restrictedLocations.length > 0 && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-400">Selected locations:</span>
                                <button
                                  type="button"
                                  onClick={() => setEventData(prev => ({ ...prev, restrictedLocations: [] }))}
                                  className="text-xs text-red-400 hover:text-red-300"
                                >
                                  Clear all
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {eventData.restrictedLocations.slice(0, 3).map((location, index) => (
                                  <div
                                    key={index}
                                    className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 ${
                                      eventData.locationRestrictionType === "block" 
                                        ? 'bg-red-600/20 text-red-400' 
                                        : 'bg-green-600/20 text-green-400'
                                    }`}
                                  >
                                    {location.type === 'country' ? (
                                      <Flag className="w-3 h-3" />
                                    ) : location.type === 'state' ? (
                                      <MapPin className="w-3 h-3" />
                                    ) : (
                                      <Building className="w-3 h-3" />
                                    )}
                                    {location.name}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEventData(prev => ({
                                          ...prev,
                                          restrictedLocations: prev.restrictedLocations.filter((_, i) => i !== index)
                                        }))
                                      }}
                                      className="hover:text-foreground"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                                {eventData.restrictedLocations.length > 3 && (
                                  <div className={`px-3 py-1.5 rounded-full text-sm ${
                                    eventData.locationRestrictionType === "block" 
                                      ? 'bg-red-600/20 text-red-400' 
                                      : 'bg-green-600/20 text-green-400'
                                  }`}>
                                    +{eventData.restrictedLocations.length - 3} more
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                            <div className="text-yellow-500 text-sm">
                              <p className="font-medium">How Location Restriction Works</p>
                              <ul className="mt-1 space-y-1 text-yellow-600">
                                <li className="flex items-start gap-2">
                                  <span className="mt-1">•</span>
                                  <span>Locations are determined by viewer's IP address</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="mt-1">•</span>
                                  <span>Search and select specific countries, states, or cities</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Monetization */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-yellow-500" />
                    Monetization
                  </h3>

                  <div className="space-y-6 border border-border p-4 rounded-xl">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="requireTicket"
                              checked={eventData.requireTicket}
                              onChange={(e) => setEventData(prev => ({ 
                                ...prev, 
                                requireTicket: e.target.checked 
                              }))}
                              className="sr-only"
                            />
                            <div className={`w-10 h-6 relative rounded-full transition-all duration-200 ${eventData.requireTicket ? 'bg-red-600' : 'bg-gray-700'}`}>
                              <div className={`w-4 h-4 absolute top-1 rounded-full bg-white transform transition-transform duration-200 ${eventData.requireTicket ? 'translate-x-5' : 'translate-x-1'}`} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Ticket className="w-4 h-4 text-yellow-500" />
                              <span className="text-foreground font-medium">Require Ticket to Watch</span>
                            </div>
                            <p className="text-gray-400 text-sm">Viewers need to purchase a ticket to access your stream</p>
                          </div>
                        </label>
                      </div>

                      {eventData.requireTicket && (
                        <div className="ml-12 space-y-3">
                          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                              <div className="text-yellow-400 text-sm">
                                <p className="font-medium">Paid Stream</p>
                                <p className="text-yellow-300 mt-1">This is a paid stream. Create a ticket via Ticket Management.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="enableDonations"
                            checked={eventData.enableDonations}
                            onChange={(e) => setEventData(prev => ({ 
                              ...prev, 
                              enableDonations: e.target.checked 
                            }))}
                            className="sr-only"
                          />
                          <div className={`w-10 h-6 relative rounded-full transition-all duration-200 ${eventData.enableDonations ? 'bg-green-600' : 'bg-gray-700'}`}>
                            <div className={`w-4 h-4 absolute top-1 rounded-full bg-white transform transition-transform duration-200 ${eventData.enableDonations ? 'translate-x-5' : 'translate-x-1'}`} />
                          </div>
                        </div>
                        <div>
                          <span className="text-foreground font-medium">Enable Gifting</span>
                          <p className="text-gray-400 text-sm">Allow viewers to send gifts during stream</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-black text-white px-6 py-3 rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Schedule Stream
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Location Search Modal */}
      <LocationSearchModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelectLocations={(locations) => {
          if (locationModalMode === 'restriction') {
            setEventData(prev => ({ ...prev, restrictedLocations: locations }))
          }
        }}
        onSelectSingleLocation={(location) => {
          if (locationModalMode === 'event-location') {
            setEventData(prev => ({ ...prev, location }))
          }
        }}
        initialLocations={
          locationModalMode === 'restriction' 
            ? eventData.restrictedLocations 
            : eventData.location ? [eventData.location] : []
        }
        restrictionType={eventData.locationRestrictionType}
        mode={locationModalMode}
        title={
          locationModalMode === 'event-location' 
            ? 'Select Event Location' 
            : eventData.locationRestrictionType === 'block'
              ? 'Block Locations'
              : 'Allow Locations'
        }
        description={
          locationModalMode === 'event-location'
            ? 'Search for the location where your event is taking place'
            : eventData.locationRestrictionType === 'block'
              ? 'Select locations to block from viewing your stream'
              : 'Select locations to allow viewing your stream'
        }
      />
    </div>
  )
}



