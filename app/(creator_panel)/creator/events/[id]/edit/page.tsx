"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { 
  ArrowLeft, 
  Save, 
  Calendar,
  Video,
  Settings,
  DollarSign,
  Users,
  Lock,
  Upload,
  X,
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
  Clock,
  Tag,
  Image,
  FileVideo,
  MapPin as MapIcon,
  Link,
  Trash2,
  Loader2
} from "lucide-react"
import { LocationData } from "@/lib/type/location"
import LocationSearchModal from "../../_component/LocationSearchModal"

// Mock data - in real app, this would come from an API
const mockEventData = {
  title: "Music Production Masterclass",
  description: "Learn professional music production techniques from industry experts",
  category: "music",
  isPaid: true,
  address: "123 Music Studio Lane",
  location: {
    name: "Lagos",
    country: "Nigeria",
    state: "Lagos State",
    type: 'city' as const,
    lat: 6.5244,
    lon: 3.3792
  },
  thumbnailUrl: "https://2ysecm1ojd.ufs.sh/f/Sgkj9xKh6THfGhRKP1nLWxoe2Nrf45qY0a9CdAGk7lTsjhpE",
  thumbnailVideoUrl: "hhttps://2ysecm1ojd.ufs.sh/f/Sgkj9xKh6THf1765yFk45YtuQkr7xaTRAoqwO03ViLgBdc6J",
  hasRecordedVideo: true,
  recordedVideoUrl: "https://2ysecm1ojd.ufs.sh/f/Sgkj9xKh6THf1765yFk45YtuQkr7xaTRAoqwO03ViLgBdc6J",
  isPrivate: false,
  requireTicket: true,
  enableDonations: true,
  enableLocationRestriction: false,
  restrictedLocations: [] as LocationData[],
  locationRestrictionType: "block" as "block" | "allow",
  scheduledDate: "2024-12-25",
  scheduledTime: "18:00",
  timezone: "Africa/Lagos",
  duration: 120,
  tags: ["music", "production", "masterclass", "audio"],
  status: "scheduled" as "scheduled" | "live" | "ended",
  maxViewers: 1000,
  estimatedUsers: 150
}

export default function EditEvent() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("basic")
  const [isLoading, setIsLoading] = useState(true)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [locationModalMode, setLocationModalMode] = useState<'event-location' | 'restriction'>('event-location')
  const [currentTag, setCurrentTag] = useState("")
  const [uploadProgress, setUploadProgress] = useState({
    thumbnail: 0,
    thumbnailVideo: 0,
    recordedVideo: 0
  })

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "music",
    isPaid: false,
    address: "",
    location: null as LocationData | null,
    thumbnailUrl: "",
    thumbnail: undefined as File | undefined,
    thumbnailPreview: "",
    thumbnailVideoUrl: "",
    thumbnailVideo: undefined as File | undefined,
    thumbnailVideoPreview: "",
    hasRecordedVideo: false,
    recordedVideoUrl: "",
    recordedVideo: undefined as File | undefined,
    recordedVideoPreview: "",
    isPrivate: false,
    requireTicket: false,
    enableDonations: false,
    enableLocationRestriction: false,
    restrictedLocations: [] as LocationData[],
    locationRestrictionType: "block" as "block" | "allow",
    scheduledDate: "",
    scheduledTime: "",
    timezone: "Africa/Lagos",
    duration: 60,
    tags: [] as string[],
    status: "scheduled" as "scheduled" | "live" | "ended",
    maxViewers: 0,
    estimatedUsers: 0
  })

  const categories = [
    "music",
    "gaming",
    "education",
    "entertainment",
    "technology",
    "lifestyle",
    "sports",
    "art",
    "cooking",
    "fitness",
  ]

  const timezones = [
    { value: "Africa/Lagos", label: "Lagos (WAT)" },
    { value: "UTC", label: "UTC" },
    { value: "America/New_York", label: "New York (EST)" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  ]

  useEffect(() => {
    // Simulate loading event data
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        title: mockEventData.title,
        description: mockEventData.description,
        category: mockEventData.category,
        isPaid: mockEventData.isPaid,
        address: mockEventData.address,
        location: mockEventData.location,
        thumbnailUrl: mockEventData.thumbnailUrl,
        thumbnailPreview: mockEventData.thumbnailUrl,
        thumbnailVideoUrl: mockEventData.thumbnailVideoUrl,
        thumbnailVideoPreview: mockEventData.thumbnailVideoUrl,
        hasRecordedVideo: mockEventData.hasRecordedVideo,
        recordedVideoUrl: mockEventData.recordedVideoUrl,
        recordedVideoPreview: mockEventData.recordedVideoUrl,
        isPrivate: mockEventData.isPrivate,
        requireTicket: mockEventData.requireTicket,
        enableDonations: mockEventData.enableDonations,
        enableLocationRestriction: mockEventData.enableLocationRestriction,
        restrictedLocations: mockEventData.restrictedLocations,
        locationRestrictionType: mockEventData.locationRestrictionType,
        scheduledDate: mockEventData.scheduledDate,
        scheduledTime: mockEventData.scheduledTime,
        timezone: mockEventData.timezone,
        duration: mockEventData.duration,
        tags: mockEventData.tags,
        status: mockEventData.status,
        maxViewers: mockEventData.maxViewers,
        estimatedUsers: mockEventData.estimatedUsers
      }))
      setIsLoading(false)
    }, 500)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    setFormData(prev => {
      const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : 
                      type === "number" ? Number(value) : value
      
      // If changing URL fields, also update their preview fields
      if (name === "thumbnailUrl") {
        return {
          ...prev,
          thumbnailUrl: newValue as string,
          thumbnailPreview: newValue as string,
          thumbnail: undefined // Clear uploaded file when using URL
        }
      }
      if (name === "thumbnailVideoUrl") {
        return {
          ...prev,
          thumbnailVideoUrl: newValue as string,
          thumbnailVideoPreview: newValue as string,
          thumbnailVideo: undefined // Clear uploaded file when using URL
        }
      }
      if (name === "recordedVideoUrl") {
        return {
          ...prev,
          recordedVideoUrl: newValue as string,
          recordedVideoPreview: newValue as string,
          recordedVideo: undefined // Clear uploaded file when using URL
        }
      }
      
      return {
        ...prev,
        [name]: newValue
      }
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'thumbnail' | 'thumbnailVideo' | 'recordedVideo') => {
    const file = e.target.files?.[0]
    if (!file) return

    // Simulate upload progress
    setUploadProgress(prev => ({ ...prev, [fileType]: 0 }))
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev[fileType] >= 100) {
          clearInterval(interval)
          return prev
        }
        return { ...prev, [fileType]: prev[fileType] + 10 }
      })
    }, 100)

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      
      if (fileType === 'thumbnail') {
        if (!file.type.startsWith('image/')) {
          alert("Please upload an image file")
          clearInterval(interval)
          return
        }
        if (file.size > 5 * 1024 * 1024) {
          alert("Thumbnail image must be less than 5MB")
          clearInterval(interval)
          return
        }

        setFormData(prev => ({ 
          ...prev, 
          thumbnail: file,
          thumbnailPreview: result,
          thumbnailUrl: "" // Clear URL since we're using uploaded file
        }))
      } 
      else if (fileType === 'thumbnailVideo') {
        if (!file.type.startsWith('video/')) {
          alert("Please upload a video file")
          clearInterval(interval)
          return
        }
        if (file.size > 50 * 1024 * 1024) {
          alert("Thumbnail video must be less than 50MB")
          clearInterval(interval)
          return
        }

        setFormData(prev => ({ 
          ...prev, 
          thumbnailVideo: file,
          thumbnailVideoPreview: result,
          thumbnailVideoUrl: "" // Clear URL since we're using uploaded file
        }))
      }
      else {
        if (!file.type.startsWith('video/')) {
          alert("Please upload a video file")
          clearInterval(interval)
          return
        }
        if (file.size > 500 * 1024 * 1024) {
          alert("Video must be less than 500MB")
          clearInterval(interval)
          return
        }

        setFormData(prev => ({ 
          ...prev, 
          recordedVideo: file,
          recordedVideoPreview: result,
          recordedVideoUrl: "" // Clear URL since we're using uploaded file
        }))
      }

      setTimeout(() => {
        setUploadProgress(prev => ({ ...prev, [fileType]: 100 }))
        clearInterval(interval)
      }, 1000)
    }
    
    reader.onerror = () => {
      alert("Error reading file")
      clearInterval(interval)
    }
    
    reader.readAsDataURL(file)
  }

  const removeFile = (fileType: 'thumbnail' | 'thumbnailVideo' | 'recordedVideo') => {
    if (fileType === 'thumbnail') {
      setFormData(prev => ({ 
        ...prev, 
        thumbnail: undefined,
        thumbnailPreview: "",
        thumbnailUrl: ""
      }))
    } 
    else if (fileType === 'thumbnailVideo') {
      setFormData(prev => ({ 
        ...prev, 
        thumbnailVideo: undefined,
        thumbnailVideoPreview: "",
        thumbnailVideoUrl: ""
      }))
    }
    else {
      setFormData(prev => ({ 
        ...prev, 
        recordedVideo: undefined,
        recordedVideoPreview: "",
        recordedVideoUrl: ""
      }))
    }
    setUploadProgress(prev => ({ ...prev, [fileType]: 0 }))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
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
    
    // Validation
    if (!formData.title.trim()) {
      alert("Please enter an event title")
      return
    }

    if (formData.enableLocationRestriction && formData.restrictedLocations.length === 0) {
      alert("Please add at least one location for location restriction, or disable location restriction.")
      return
    }

    if (!formData.scheduledDate || !formData.scheduledTime) {
      alert("Please select date and time")
      return
    }

    // Check if date/time is in the future (only for scheduled events)
    if (formData.status === "scheduled") {
      const scheduledDateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`)
      if (scheduledDateTime <= new Date()) {
        alert("Please select a future date and time for scheduled events")
        return
      }
    }

    // Prepare data for submission
    const eventData = {
      ...formData,
      // Include city for backward compatibility
      city: formData.location?.name || '',
      state: formData.location?.state || '',
      country: formData.location?.country || '',
      locationRestrictions: formData.enableLocationRestriction ? {
        enabled: true,
        type: formData.locationRestrictionType,
        locations: formData.restrictedLocations,
      } : {
        enabled: false,
        type: null,
        locations: [],
      }
    }

    console.log("Submitting event data:", eventData)
    
    // Here you would typically make an API call to update the event
    // await updateEvent(params.id, eventData)
    
    alert("Event updated successfully!")
    router.push("/events")
  }

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Video },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "privacy", label: "Privacy & Access", icon: Lock },
    { id: "monetization", label: "Monetization", icon: DollarSign },
    { id: "media", label: "Media", icon: Image },
  ]

  const isEventEnded = formData.status === "ended"
  const isEventLive = formData.status === "live"
  const canEditSchedule = formData.status === "scheduled"

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading event data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </button>
          
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              formData.status === "scheduled" ? "bg-yellow-600/20 text-yellow-400" :
              formData.status === "live" ? "bg-green-600/20 text-green-400" :
              "bg-gray-600/20 text-gray-400"
            }`}>
              {formData.status === "scheduled" ? "Scheduled" :
               formData.status === "live" ? "Live Now" : "Ended"}
            </span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
          Edit Event
        </h1>
        <p className="text-muted-foreground mb-8">Update your event details and settings</p>

        {/* Status Warning */}
        {isEventEnded && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="font-medium text-yellow-400">Event has ended</p>
                <p className="text-yellow-300 text-sm">You can only update basic information and upload recorded video.</p>
              </div>
            </div>
          </div>
        )}

        {isEventLive && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div>
                <p className="font-medium text-red-400">Event is currently live</p>
                <p className="text-red-300 text-sm">Some settings cannot be changed during a live stream.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 whitespace-nowrap text-sm font-medium transition-all border-b-2 ${
                  activeTab === tab.id 
                    ? "border-red-600 text-foreground" 
                    : "border-transparent text-gray-400 hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <form onSubmit={handleSubmit} className="bg-card text-foreground border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6 ">
          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground">Basic Information</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Event Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter event title"
                    className="w-full bg-transparent  border border-gray-700 rounded-xl px-4 py-3  focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                    required
                    disabled={isEventLive}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your event"
                    rows={4}
                    className="w-full bg-transparent border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none disabled:opacity-50"
                    disabled={isEventLive}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-gray-700 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                      disabled={isEventLive}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Event Location</label>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => {
                          setLocationModalMode('event-location')
                          setShowLocationModal(true)
                        }}
                        disabled={isEventLive}
                        className="w-full bg-transparent border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-colors text-left flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {formData.location ? (
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-transparent rounded-lg">
                              {(() => {
                                const type = formData.location.type
                                switch (type) {
                                  case 'country': return <Flag className="w-4 h-4 text-red-500" />
                                  case 'state': return <MapPin className="w-4 h-4 text-green-500" />
                                  case 'city': return <Building className="w-4 h-4 text-yellow-500" />
                                  default: return <Globe className="w-4 h-4 text-gray-400" />
                                }
                              })()}
                            </div>
                            <div>
                              <span className="font-medium text-foreground">{formData.location.name}</span>
                              <p className="text-sm text-gray-400">
                                {formData.location.state && `${formData.location.state}, `}{formData.location.country}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">Select event location</span>
                        )}
                        <Search className="w-4 h-4 text-gray-500 bg-transparent group-hover:text-foreground transition-colors" />
                      </button>
                      
                      {formData.location && !isEventLive && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, location: null }))}
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
                  <label className="block text-sm font-medium text-foreground mb-2">Address (Venu location)</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter venue address"
                    className="w-full border bg-transparent border-gray-700 rounded-xl px-4 py-3  focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                    disabled={isEventLive}
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Add tags"
                      className="flex-1 bg-transparent border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      disabled={isEventLive}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className=" bg-red-600 text-white hover:text-black  px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isEventLive}
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <div
                        key={tag}
                        className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        {!isEventLive && (
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="  hover:text-red-300"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === "schedule" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground">Schedule Settings</h2>
              
              {canEditSchedule ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Date *</label>
                      <input
                        type="date"
                        name="scheduledDate"
                        value={formData.scheduledDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full  border bg-transparent border-gray-700 rounded-xl px-4 py-3 text-foregroundfocus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent disabled:opacity-50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Time *</label>
                      <input
                        type="time"
                        name="scheduledTime"
                        value={formData.scheduledTime}
                        onChange={handleInputChange}
                        className="w-full border bg-transparent border-gray-700 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent disabled:opacity-50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-gray-700 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    >
                      {timezones.map((tz) => (
                        <option key={tz.value} value={tz.value} className="border bg-transparent  border-gray-700 rounded-xl px-4 py-3 text-foreground ">
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
                      value={formData.duration}
                      onChange={handleInputChange}
                      min="15"
                      max="480"
                      className="w-full bg-transparent  border border-gray-700 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                    <p className="text-gray-500 text-xs mt-1">Minimum 15 minutes, maximum 8 hours</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Maximum Viewers</label>
                    <input
                      type="number"
                      name="maxViewers"
                      value={formData.maxViewers}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="0 = unlimited"
                      className="w-full  border bg-transparent  border-gray-700 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                    <p className="text-gray-500 text-xs mt-1">Set to 0 for unlimited viewers</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 border bg-transparent  border-gray-700 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-gray-300 font-medium">
                        {isEventEnded 
                          ? "This event has already ended" 
                          : "This event is currently live"}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Schedule settings cannot be modified {isEventEnded ? "for ended events" : "during live streams"}.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Privacy & Access Tab */}
          {activeTab === "privacy" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground">Privacy & Access Settings</h2>
              
              <div className="space-y-8">
                {/* Privacy Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5 text-red-500" />
                    Privacy Settings
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Public Stream Option */}
                    <button
                      type="button"
                      onClick={() => !isEventLive && setFormData(prev => ({ ...prev, isPrivate: false }))}
                      disabled={isEventLive}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${!formData.isPrivate ? 'border-red-500 bg-red-500/10' : 'border-red-700 bg-transparent hover:border-red-600'} ${isEventLive ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${!formData.isPrivate ? 'border-red-500 bg-red-500' : 'border-gray-600'}`}>
                          {!formData.isPrivate && <Check className="w-4 h-4 text-foreground" />}
                        </div>
                        <Globe className="w-5 h-5 text-red-400" />
                        <div className="text-left">
                          <h4 className="font-medium text-foreground">Public Stream</h4>
                          <p className="text-sm text-gray-400">Visible to everyone</p>
                        </div>
                      </div>
                    </button>

                    {/* Followers Only Option */}
                    <button
                      type="button"
                      onClick={() => !isEventLive && setFormData(prev => ({ ...prev, isPrivate: true }))}
                      disabled={isEventLive}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${formData.isPrivate ? 'border-yellow-500 bg-yellow-500/10' : 'border-yellow-700 bg-transparent hover:border-yellow-600'} ${isEventLive ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.isPrivate ? 'border-yellow-500 bg-yellow-500' : 'border-yellow-600'}`}>
                          {formData.isPrivate && <Check className="w-4 h-4 text-foreground" />}
                        </div>
                        <UserCheck className="w-5 h-5 text-yellow-400" />
                        <div className="text-left">
                          <h4 className="font-medium text-foreground">Followers Only</h4>
                          <p className="text-sm text-gray-400">Only your followers can watch</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {formData.isPrivate && (
                    <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                      <div className="flex items-center gap-2 text-yellow-400 text-sm">
                        <Lock className="w-4 h-4" />
                        <p>This event will only be visible to your followers</p>
                      </div>
                    </div>
                  )}

                  {isEventLive && (
                    <div className="mt-4 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <p>Privacy settings cannot be changed during a live stream</p>
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

                  <div className="space-y-6 border border-border p-4 rounded-xl">
                    {/* Enable Location Restriction Toggle */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="enableLocationRestriction"
                            checked={formData.enableLocationRestriction}
                            onChange={(e) => !isEventLive && setFormData(prev => ({ 
                              ...prev, 
                              enableLocationRestriction: e.target.checked,
                            }))}
                            className="sr-only"
                            disabled={isEventLive}
                          />
                          <div className={`w-10 h-6 relative rounded-full transition-all duration-200 ${formData.enableLocationRestriction ? 'bg-red-600' : 'bg-gray-700'} ${isEventLive ? 'opacity-50' : ''}`}>
                            <div className={`w-4 h-4 absolute top-1 rounded-full bg-white transform transition-transform duration-200 ${formData.enableLocationRestriction ? 'translate-x-5' : 'translate-x-1'} `} />
                          </div>
                        </div>
                        <div>
                          <span className="text-foreground font-medium">Enable Location Restriction</span>
                          <p className="text-gray-400 text-sm">Restrict access based on viewer's location</p>
                        </div>
                      </label>
                    </div>

                    {formData.enableLocationRestriction && (
                      <div className="space-y-4">
                        {/* Restriction Type */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Restriction Type</label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <div className="relative">
                                <input
                                  type="radio"
                                  name="locationRestrictionType"
                                  checked={formData.locationRestrictionType === "block"}
                                  onChange={() => !isEventLive && setFormData(prev => ({ ...prev, locationRestrictionType: "block" }))}
                                  className="sr-only"
                                  disabled={isEventLive}
                                />
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.locationRestrictionType === "block" ? 'border-red-500' : 'border-gray-600'} ${isEventLive ? 'opacity-50' : ''}`}>
                                  {formData.locationRestrictionType === "block" && (
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
                                  checked={formData.locationRestrictionType === "allow"}
                                  onChange={() => !isEventLive && setFormData(prev => ({ ...prev, locationRestrictionType: "allow" }))}
                                  className="sr-only"
                                  disabled={isEventLive}
                                />
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.locationRestrictionType === "allow" ? 'border-green-500' : 'border-gray-600'} ${isEventLive ? 'opacity-50' : ''}`}>
                                  {formData.locationRestrictionType === "allow" && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                  )}
                                </div>
                              </div>
                              <span className="text-foreground text-sm">Allow Only Locations</span>
                            </label>
                          </div>
                          <p className="text-gray-400 text-xs mt-2">
                            {formData.locationRestrictionType === "block" 
                              ? "Users in these locations will NOT be able to access the stream"
                              : "ONLY users in these locations will be able to access the stream"}
                          </p>
                        </div>

                        {/* Manage Locations Button */}
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              if (!isEventLive) {
                                setLocationModalMode('restriction')
                                setShowLocationModal(true)
                              }
                            }}
                            disabled={isEventLive}
                            className={`w-full  rounded-xl px-4 py-3 text-foreground border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-colors flex items-center justify-between group ${isEventLive ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-900 rounded-lg">
                                {formData.locationRestrictionType === "block" ? (
                                  <X className="w-4 h-4 text-red-500" />
                                ) : (
                                  <Check className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                              <div>
                                <span className="font-medium text-foreground">
                                  {formData.restrictedLocations.length > 0 
                                    ? `${formData.restrictedLocations.length} location${formData.restrictedLocations.length !== 1 ? 's' : ''} selected`
                                    : 'Add locations'}
                                </span>
                                <p className="text-sm text-gray-400">
                                  {formData.locationRestrictionType === "block" 
                                    ? 'Select locations to block'
                                    : 'Select locations to allow'}
                                </p>
                              </div>
                            </div>
                            <Plus className="w-4 h-4 text-gray-500 group-hover:text-foreground transition-colors" />
                          </button>

                          {/* Selected Locations Preview */}
                          {formData.restrictedLocations.length > 0 && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-400">Selected locations:</span>
                                {!isEventLive && (
                                  <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, restrictedLocations: [] }))}
                                    className="text-xs text-red-400 hover:text-red-300"
                                  >
                                    Clear all
                                  </button>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {formData.restrictedLocations.slice(0, 3).map((location, index) => (
                                  <div
                                    key={index}
                                    className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 ${
                                      formData.locationRestrictionType === "block" 
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
                                    {!isEventLive && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setFormData(prev => ({
                                            ...prev,
                                            restrictedLocations: prev.restrictedLocations.filter((_, i) => i !== index)
                                          }))
                                        }}
                                        className="hover:text-foreground"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                                {formData.restrictedLocations.length > 3 && (
                                  <div className={`px-3 py-1.5 rounded-full text-sm ${
                                    formData.locationRestrictionType === "block" 
                                      ? 'bg-red-600/20 text-red-400' 
                                      : 'bg-green-600/20 text-green-400'
                                  }`}>
                                    +{formData.restrictedLocations.length - 3} more
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Monetization Tab */}
          {activeTab === "monetization" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground">Monetization Settings</h2>
              
              <div className="space-y-6  border border-border p-4 md:p-6 rounded-xl">
                {isEventLive ? (
                  <div className="p-4  border border-border rounded-xl">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-300 font-medium">Monetization settings cannot be changed during a live stream</p>
                        <p className="text-gray-400 text-sm mt-1">You can only update these settings before or after the stream.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Free vs Paid Toggle */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="isPaid"
                              checked={formData.isPaid}
                              onChange={(e) => setFormData(prev => ({ 
                                ...prev, 
                                isPaid: e.target.checked 
                              }))}
                              className="sr-only"
                            />
                            <div className={`w-10 h-6 relative rounded-full transition-all duration-200 ${formData.isPaid ? 'bg-red-600' : 'bg-green-600'}`}>
                              <div className={`w-4 h-4 absolute top-1 rounded-full bg-white transform transition-transform duration-200 ${formData.isPaid ? 'translate-x-5' : 'translate-x-1'} `} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Ticket className="w-4 h-4 text-yellow-500" />
                              <span className="text-white font-medium">
                                {formData.isPaid ? "Paid Event" : "Free Event"}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">
                              {formData.isPaid 
                                ? "Viewers need to purchase access to watch" 
                                : "Anyone can watch for free"}
                            </p>
                          </div>
                        </label>
                      </div>

                      {formData.isPaid && (
                        <div className="ml-12 space-y-3">
                          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                              <div className="text-yellow-400 text-sm">
                                <p className="font-medium">Paid Event</p>
                                <p className="text-yellow-300 mt-1">
                                  This is a paid event. Viewers will need to purchase access to participate.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Enable Gifting */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="enableDonations"
                            checked={formData.enableDonations}
                            onChange={(e) => setFormData(prev => ({ 
                              ...prev, 
                              enableDonations: e.target.checked 
                            }))}
                            className="sr-only"
                          />
                          <div className={`w-10 h-6 relative rounded-full transition-all duration-200 ${formData.enableDonations ? 'bg-green-600' : 'bg-gray-700'}`}>
                            <div className={`w-4 h-4 absolute top-1 rounded-full bg-white transform transition-transform duration-200 ${formData.enableDonations ? 'translate-x-5' : 'translate-x-1'} `} />
                          </div>
                        </div>
                        <div>
                          <span className="text-foreground font-medium">Enable Gifting</span>
                          <p className="text-gray-400 text-sm">Allow viewers to send gifts during stream</p>
                        </div>
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Media Tab  */}
          {activeTab === "media" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground">Media & Content</h2>
              
              <div className="space-y-8">
                {/* Thumbnail Image */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Image className="w-5 h-5 text-red-500" />
                    Thumbnail Image
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Upload File */}
                    <div>
                      <label className="block text-sm font-medium text-forground mb-2">Upload New Thumbnail</label>
                      <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center cursor-pointer hover:border-red-600 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'thumbnail')}
                          className="hidden"
                          id="thumbnail-upload"
                          disabled={isEventLive}
                        />
                        <label htmlFor="thumbnail-upload" className={`cursor-pointer flex flex-col items-center ${isEventLive ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-foreground text-sm">Click to upload thumbnail image</p>
                          <p className="text-gray-400 text-xs mt-1">Recommended: 1280x720px, max 5MB</p>
                        </label>
                      </div>
                      
                      {formData.thumbnail && (
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">{formData.thumbnail.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile('thumbnail')}
                              className="text-red-500 hover:text-red-400 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                          {uploadProgress.thumbnail > 0 && uploadProgress.thumbnail < 100 && (
                            <div className="w-fullrounded-full h-2">
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
                        </div>
                      )}
                    </div>

                    {/* Or Paste URL */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Or Use Image URL</label>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <input
                            type="url"
                            name="thumbnailUrl"
                            value={formData.thumbnailUrl}
                            onChange={handleInputChange}
                            placeholder="https://example.com/thumbnail.jpg"
                            className="flex-1 bg-transparent  border border-gray-700 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                            disabled={isEventLive}
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, thumbnailPreview: formData.thumbnailUrl }))}
                            className=" bg-red-600 text-white px-4 py-3 rounded-xl transition-colors disabled:opacity-50"
                            disabled={isEventLive}
                          >
                            <Link className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Current Thumbnail Preview */}
                        {(formData.thumbnailPreview || formData.thumbnailUrl) && (
                          <div>
                            <p className="text-sm text-gray-400 mb-2">Current thumbnail:</p>
                            <img
                              src={formData.thumbnailPreview || formData.thumbnailUrl || "/placeholder.svg"}
                              alt="Thumbnail preview"
                              className="w-full h-48 object-cover rounded-xl"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thumbnail Video */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <FileVideo className="w-5 h-5 text-red-500" />
                    Thumbnail Video (Optional)
                  </h3>
                  <p className="text-gray-400 text-sm">A short video that plays when users hover over your event thumbnail</p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Upload File */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Upload Thumbnail Video</label>
                      <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center cursor-pointer hover:border-red-600 transition-colors">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileUpload(e, 'thumbnailVideo')}
                          className="hidden"
                          id="thumbnail-video-upload"
                          disabled={isEventLive}
                        />
                        <label htmlFor="thumbnail-video-upload" className={`cursor-pointer flex flex-col items-center ${isEventLive ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-foreground text-sm">Click to upload thumbnail video</p>
                          <p className="text-gray-400 text-xs mt-1">max 50MB, recommended: 5-15 seconds</p>
                        </label>
                      </div>
                      
                      {formData.thumbnailVideo && (
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">{formData.thumbnailVideo.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile('thumbnailVideo')}
                              className="text-red-500 hover:text-red-400 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                          {uploadProgress.thumbnailVideo > 0 && uploadProgress.thumbnailVideo < 100 && (
                            <div className="w-full rounded-full h-2">
                              <div 
                                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress.thumbnailVideo}%` }}
                              ></div>
                            </div>
                          )}
                          {uploadProgress.thumbnailVideo === 100 && (
                            <div className="flex items-center gap-2 text-green-500 text-sm">
                              <Check className="w-4 h-4" />
                              Upload complete
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Or Paste URL */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Or Use Video URL</label>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <input
                            type="url"
                            name="thumbnailVideoUrl"
                            value={formData.thumbnailVideoUrl}
                            onChange={handleInputChange}
                            placeholder="https://example.com/thumbnail-video.mp4"
                            className="flex-1 bg-transparent   border border-gray-700 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                            disabled={isEventLive}
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, thumbnailVideoPreview: formData.thumbnailVideoUrl }))}
                            className=" bg-red-600 text-white px-4 py-3 rounded-xl transition-colors disabled:opacity-50"
                            disabled={isEventLive}
                          >
                            <Link className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Current Thumbnail Video Preview */}
                        {(formData.thumbnailVideoPreview || formData.thumbnailVideoUrl) && (
                          <div>
                            <p className="text-sm text-gray-400 mb-2">Current thumbnail video:</p>
                            <video
                              src={formData.thumbnailVideoPreview || formData.thumbnailVideoUrl}
                              controls
                              className="w-full h-48 object-cover rounded-xl"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recorded Video - Only for ended events */}
                {(isEventEnded || formData.hasRecordedVideo) && (
                  <div className="space-y-4 ">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <FileVideo className="w-5 h-5 text-yellow-500" />
                      Recorded Stream Video
                    </h3>

                    <div className="space-y-6 bg-transparent  border border-border p-4 md:p-6 rounded-xl">
                      {!isEventEnded && (
                        <div className="flex items-center gap-3 mb-4">
                          <input
                            type="checkbox"
                            checked={formData.hasRecordedVideo}
                            onChange={(e) => setFormData(prev => ({ ...prev, hasRecordedVideo: e.target.checked }))}
                            className="w-4 h-4 text-red-600 bg-transparent  border-gray-700 rounded"
                          />
                          <label className="text-foreground">Upload recorded stream after completion</label>
                        </div>
                      )}

                      {(formData.hasRecordedVideo || isEventEnded) && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Upload Video File */}
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Upload Recorded Video</label>
                            <div className="border-2 border-dashed bg-transparent  border-gray-700 rounded-xl p-6 text-center cursor-pointer hover:border-yellow-600 transition-colors">
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleFileUpload(e, 'recordedVideo')}
                                className="hidden"
                                id="recorded-video-upload"
                              />
                              <label htmlFor="recorded-video-upload" className="cursor-pointer flex flex-col items-center">
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-white text-sm">Click to upload recorded video</p>
                                <p className="text-gray-400 text-xs mt-1">max 500MB</p>
                              </label>
                            </div>
                            
                            {formData.recordedVideo && (
                              <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-300">{formData.recordedVideo.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeFile('recordedVideo')}
                                    className="text-red-500 hover:text-red-400 text-sm"
                                  >
                                    Remove
                                  </button>
                                </div>
                                {uploadProgress.recordedVideo > 0 && uploadProgress.recordedVideo < 100 && (
                                  <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div 
                                      className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${uploadProgress.recordedVideo}%` }}
                                    ></div>
                                  </div>
                                )}
                                {uploadProgress.recordedVideo === 100 && (
                                  <div className="flex items-center gap-2 text-green-500 text-sm">
                                    <Check className="w-4 h-4" />
                                    Upload complete
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Or Paste Video URL */}
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Or Use Video URL</label>
                            <div className="space-y-4">
                              <div className="flex gap-2">
                                <input
                                  type="url"
                                  name="recordedVideoUrl"
                                  value={formData.recordedVideoUrl}
                                  onChange={handleInputChange}
                                  placeholder="https://example.com/recorded-video.mp4"
                                  className="flex-1 bg-transparent   border border-gray-700 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-yellow-600"
                                />
                                <button
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, recordedVideoPreview: formData.recordedVideoUrl }))}
                                  className=" hover:bg-red-600 text-foregroundpx-4 py-3 rounded-xl transition-colors"
                                >
                                  <Link className="w-4 h-4" />
                                </button>
                              </div>
                              
                              {(formData.recordedVideoPreview || formData.recordedVideoUrl) && (
                                <div>
                                  <p className="text-sm text-gray-400 mb-2">Current recorded video:</p>
                                  <video
                                    src={formData.recordedVideoPreview || formData.recordedVideoUrl}
                                    controls
                                    className="w-full h-48 object-cover rounded-xl"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8 border-none">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1  hover:bg-black hover:text-white text-foreground px-4 py-3 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Location Search Modal */}
      <LocationSearchModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelectLocations={(locations) => {
          if (locationModalMode === 'restriction') {
            setFormData(prev => ({ ...prev, restrictedLocations: locations }))
          }
        }}
        onSelectSingleLocation={(location) => {
          if (locationModalMode === 'event-location') {
            setFormData(prev => ({ ...prev, location }))
          }
        }}
        initialLocations={
          locationModalMode === 'restriction' 
            ? formData.restrictedLocations 
            : formData.location ? [formData.location] : []
        }
        restrictionType={formData.locationRestrictionType}
        mode={locationModalMode}
        title={
          locationModalMode === 'event-location' 
            ? 'Select Event Location' 
            : formData.locationRestrictionType === 'block'
              ? 'Block Locations'
              : 'Allow Locations'
        }
        description={
          locationModalMode === 'event-location'
            ? 'Search for the location where your event is taking place'
            : formData.locationRestrictionType === 'block'
              ? 'Select locations to block from viewing your stream'
              : 'Select locations to allow viewing your stream'
        }
      />
    </div>
  )
}