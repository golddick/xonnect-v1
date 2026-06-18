"use client"

import type React from "react"

import { useState } from "react"
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
} from "lucide-react"
import { LocationData } from "@/lib/type/location"
import LocationSearchModal from "./LocationSearchModal"

interface ScheduleEventProps {
  onClose?: () => void
}

export default function ScheduleEventComponent({ onClose }: ScheduleEventProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1) // 1: Details, 2: Schedule, 3: Settings
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "music",
    thumbnail: null as File | null,
    thumbnailPreview: "",
    video: null as File | null,
    videoPreview: "",
    tags: [] as string[],
    scheduledDate: "",
    scheduledTime: "",
    timezone: "Africa/Lagos",
    duration: 60, // minutes
    address: "",
    // city: "",
    location: null as LocationData | null,
    isPrivate: false, // For followers only
    requireTicket: false, // Ticket required = paid stream (amount set later)
    maxViewers: 0, // 0 = unlimited
    enableDonations: false,
    enableLocationRestriction: false,
    // FIXED: Changed from string[] to LocationData[]
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
    const { name, value, type } = e.target
    setEventData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'thumbnail' | 'video') => {
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

    if (fileType === 'thumbnail') {
      // Validate image
      if (!file.type.startsWith('image/')) {
        alert("Please upload an image file")
        return
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("Thumbnail image must be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setEventData(prev => ({ 
          ...prev, 
          thumbnail: file,
          thumbnailPreview: e.target?.result as string 
        }))
        setTimeout(() => {
          setUploadProgress(prev => ({ ...prev, thumbnail: 100 }))
          clearInterval(interval)
        }, 1000)
      }
      reader.readAsDataURL(file)
    } else {
      // Validate video
      if (!file.type.startsWith('video/')) {
        alert("Please upload a video file")
        return
      }
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        alert("Video must be less than 100MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setEventData(prev => ({ 
          ...prev, 
          video: file,
          videoPreview: e.target?.result as string 
        }))
        setTimeout(() => {
          setUploadProgress(prev => ({ ...prev, video: 100 }))
          clearInterval(interval)
        }, 1000)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeFile = (fileType: 'thumbnail' | 'video') => {
    if (fileType === 'thumbnail') {
      setEventData(prev => ({ 
        ...prev, 
        thumbnail: null,
        thumbnailPreview: "" 
      }))
    } else {
      setEventData(prev => ({ 
        ...prev, 
        video: null,
        videoPreview: "" 
      }))
    }
    setUploadProgress(prev => ({ ...prev, [fileType]: 0 }))
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!eventData.title.trim()) {
      alert("Please enter an event title")
      return
    }

    if (eventData.enableLocationRestriction && eventData.restrictedLocations.length === 0) {
      alert("Please add at least one location for location restriction, or disable location restriction.")
      return
    }

    if (!eventData.scheduledDate || !eventData.scheduledTime) {
      alert("Please select date and time")
      return
    }

    if (!eventData.thumbnail) {
      alert("Please upload a thumbnail image")
      return
    }

    // Check if date/time is in the future
    const scheduledDateTime = new Date(`${eventData.scheduledDate}T${eventData.scheduledTime}`)
    if (scheduledDateTime <= new Date()) {
      alert("Please select a future date and time")
      return
    }

    const streamWithDateTime = {
      ...eventData,
      scheduledDateTime: scheduledDateTime.toISOString(),
      id: Date.now(),
      status: "scheduled",
      createdAt: new Date().toISOString(),
      // Include city for backward compatibility
      city: eventData.location?.name || '',
      locationRestrictions: eventData.enableLocationRestriction ? {
        enabled: true,
        type: eventData.locationRestrictionType,
        locations: eventData.restrictedLocations,
      } : {
        enabled: false,
        type: null,
        locations: [],
      }
    }
    
    if (onClose) {
      onClose()
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
              Schedule Live Event
            </h2>
            <p className="text-muted-foreground text-sm">Set up your upcoming live event</p>
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
                  className="w-full border border-gray-700 rounded-lg px-4 py-3 text-foreground  focus:outline-none focus:ring-2 focus:ring-red-600"
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
                  className="w-full  border border-gray-700 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <select
                    name="category"
                    value={eventData.category}
                    onChange={handleInputChange}
                    className="w-full  border border-gray-700 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
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
                      className="w-full  border border-gray-700 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-gray-700/50 transition-colors text-left flex items-center justify-between group"
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
                  className="w-full  border border-gray-700 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              {/* Thumbnail Upload */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Thumbnail Image *</label>
                  <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center cursor-pointer hover:border-red-600 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'thumbnail')}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <label htmlFor="thumbnail-upload" className="cursor-pointer flex flex-col items-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-foreground text-sm">Click to upload thumbnail image</p>
                      <p className="text-gray-400 text-xs mt-1">Recommended: 1280x720px, max 5MB</p>
                    </label>
                  </div>
                  
                  {eventData.thumbnail && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{eventData.thumbnail.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile('thumbnail')}
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

                {/* Video Upload (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Intro Video (Optional)</label>
                  <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center cursor-pointer hover:border-red-600 transition-colors">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, 'video')}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-foreground text-sm">Click to upload intro video</p>
                      <p className="text-gray-400 text-xs mt-1">max 100MB</p>
                    </label>
                  </div>
                  
                  {eventData.video && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{eventData.video.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile('video')}
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
                        src={eventData.videoPreview}
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
                    className="flex-1  border border-gray-700 rounded-lg px-4 py-2 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className=" hover:bg-red-600 text-foreground px-4 py-2 rounded-lg transition-colors"
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
                Continue to Schedule
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
                    className="w-full  border border-gray-700 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
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
                    className="w-full  border border-gray-700 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
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
                  className="w-full  border border-gray-700 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value} className="bg-gray-800">
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
                  className="w-full  border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
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
                    {/* Public Stream Option */}
                    <button
                      type="button"
                      onClick={() => setEventData(prev => ({ ...prev, isPrivate: false }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${!eventData.isPrivate ? 'border-red-500 bg-red-500/10' : 'border-gray-700 bg-trasparent hover:border-gray-600'}`}
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

                    {/* Followers Only Option */}
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
                    {/* Enable Location Restriction Toggle */}
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
                            <div className={`w-4 h-4 absolute top-1 rounded-full bg-white transform transition-transform duration-200 ${eventData.enableLocationRestriction ? 'translate-x-5' : 'translate-x-1'} `} />
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
                        {/* Restriction Type */}
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

                        {/* Manage Locations Button */}
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

                          {/* Selected Locations Preview */}
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

                        {/* Help Text */}
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                            <div className="text-yellow-400 text-sm">
                              <p className="font-medium">How Location Restriction Works</p>
                              <ul className="mt-1 space-y-1 text-yellow-300">
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
                    {/* Require Ticket (Paid Stream) Option */}
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
                              <div className={`w-4 h-4 absolute top-1 rounded-full bg-white transform transition-transform duration-200 ${eventData.requireTicket ? 'translate-x-5' : 'translate-x-1'} `} />
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

                    {/* Enable Donations */}
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
                            <div className={`w-4 h-4 absolute top-1 rounded-full bg-white transform transition-transform duration-200 ${eventData.enableDonations ? 'translate-x-5' : 'translate-x-1'} `} />
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
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Schedule Stream
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
