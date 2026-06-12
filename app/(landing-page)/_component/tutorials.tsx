


// app/tutorials/page.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { PlayCircle, BookOpen, Users, Zap, ArrowRight, Loader2, X, Volume2, VolumeX, Maximize, Minimize, Settings } from "lucide-react"
import Link from "next/link"

interface Tutorial {
  id: string
  title: string
  description: string | null
  videoUrl: string | null
  videoKey: string | null
  thumbnailUrl: string | null
  category: "CREATOR" | "VIEWER" | "PARTNERSHIP" | "GENERAL"
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  duration: number | null
  views: number
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  createdAt: string
  createdBy: {
    id: string
    userName: string | null
    email: string
  }
}

const VideoPlayer = ({ 
  tutorial, 
  onClose 
}: { 
  tutorial: Tutorial 
  onClose: () => void 
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  const isYouTube = tutorial.videoUrl?.includes('youtube.com') || tutorial.videoUrl?.includes('youtu.be')
  const isVimeo = tutorial.videoUrl?.includes('vimeo.com')
  const isDirectVideo = tutorial.videoUrl?.match(/\.(mp4|webm|ogg|mov|avi)$/i)

  // Extract YouTube video ID
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    return match ? match[1] : null
  }

  const getVimeoVideoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/)
    return match ? match[1] : null
  }

  const youtubeVideoId = tutorial.videoUrl ? getYouTubeVideoId(tutorial.videoUrl) : null
  const vimeoVideoId = tutorial.videoUrl ? getVimeoVideoId(tutorial.videoUrl) : null

  // Controls visibility
  const showControlsTemporarily = () => {
    setShowControls(true)
    clearTimeout(controlsTimeoutRef.current)
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  useEffect(() => {
    if (isDirectVideo && videoRef.current) {
      const video = videoRef.current
      
      const updateTime = () => setCurrentTime(video.currentTime)
      const updateDuration = () => setDuration(video.duration)
      const handleLoadStart = () => setIsLoading(true)
      const handleCanPlay = () => setIsLoading(false)
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)
      const handleEnded = () => setIsPlaying(false)

      video.addEventListener('timeupdate', updateTime)
      video.addEventListener('loadedmetadata', updateDuration)
      video.addEventListener('loadstart', handleLoadStart)
      video.addEventListener('canplay', handleCanPlay)
      video.addEventListener('play', handlePlay)
      video.addEventListener('pause', handlePause)
      video.addEventListener('ended', handleEnded)

      return () => {
        video.removeEventListener('timeupdate', updateTime)
        video.removeEventListener('loadedmetadata', updateDuration)
        video.removeEventListener('loadstart', handleLoadStart)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('ended', handleEnded)
      }
    }
  }, [isDirectVideo])

  useEffect(() => {
    return () => {
      clearTimeout(controlsTimeoutRef.current)
    }
  }, [])

  const togglePlay = () => {
    if (isDirectVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
    // For YouTube and Vimeo, we rely on their native controls
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDirectVideo || !videoRef.current) return
    
    const progressBar = e.currentTarget
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left
    const percentage = clickPosition / progressBar.offsetWidth
    const newTime = percentage * duration
    
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const volumeBar = e.currentTarget
    const clickPosition = e.clientX - volumeBar.getBoundingClientRect().left
    const percentage = clickPosition / volumeBar.offsetWidth
    const newVolume = Math.max(0, Math.min(1, percentage))
    
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (!playerRef.current) return

    if (!isFullscreen) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  if (isYouTube && youtubeVideoId) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    )
  }

  if (isVimeo && vimeoVideoId) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-full h-full">
            <iframe
              src={`https://player.vimeo.com/video/${vimeoVideoId}?autoplay=1`}
              className="w-full h-full rounded-lg"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={playerRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Video Container */}
      <div className="relative w-full max-w-6xl max-h-[80vh] bg-black rounded-lg overflow-hidden">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
          </div>
        )}

        {/* Direct Video Player */}
        {isDirectVideo && (
          <video
            ref={videoRef}
            className="w-full h-full"
            poster={tutorial.thumbnailUrl || undefined}
            onClick={togglePlay}
          >
            <source src={tutorial.videoUrl!} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Fallback for unsupported URLs */}
        {!isYouTube && !isVimeo && !isDirectVideo && (
          <div className="aspect-video flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <p className="text-gray-400 mb-4">Video format not supported</p>
              <button
                onClick={() => window.open(tutorial.videoUrl!, '_blank')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Open in New Tab
              </button>
            </div>
          </div>
        )}

        {/* Custom Controls for Direct Videos */}
        {isDirectVideo && (
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Progress Bar */}
            <div 
              className="w-full h-2 bg-white/30 rounded-full mb-4 cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-red-600 rounded-full relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full shadow-lg" />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-red-400 transition-colors"
                >
                  {isPlaying ? (
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-4 bg-white ml-1" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
                    </div>
                  ) : (
                    <PlayCircle className="w-8 h-8 fill-white" />
                  )}
                </button>

                {/* Time Display */}
                <span className="text-white text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-red-400 transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  <div 
                    className="w-20 h-1 bg-white/30 rounded-full cursor-pointer"
                    onClick={handleVolumeChange}
                  >
                    <div 
                      className="h-full bg-white rounded-full"
                      style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-red-400 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Play Button Overlay for Direct Videos */}
        {isDirectVideo && !isPlaying && showControls && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={togglePlay}
              className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center cursor-pointer bg-gradient-to-br from-red-600 to-red-700 shadow-2xl"
            >
              <PlayCircle className="w-12 h-12 text-white fill-white" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}

const TutorialPage = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [tutorials, setTutorials] = useState<Tutorial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)

  // Fetch tutorials on component mount
  useEffect(() => {
    fetchTutorials()
  }, [])

  const fetchTutorials = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/tutorials?status=PUBLISHED')
      
      if (response.ok) {
        const data = await response.json()
        setTutorials(data)
      } else {
        setError('Failed to fetch tutorials')
      }
    } catch (error) {
      console.error('Error fetching tutorials:', error)
      setError('Failed to load tutorials')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatCategory = (category: string) => {
    return category.toLowerCase()
  }

  const formatLevel = (level: string) => {
    return level.charAt(0) + level.slice(1).toLowerCase()
  }

  const handleTutorialSelect = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial)
    setShowVideoPlayer(true)
  }

  const handleCloseVideoPlayer = () => {
    setShowVideoPlayer(false)
    // Keep the selected tutorial for the preview section
  }

  const filteredTutorials =
    selectedCategory === "all" 
      ? tutorials 
      : tutorials.filter((t) => formatCategory(t.category) === selectedCategory)

  const categories = [
    { id: "all", label: "All Tutorials", icon: PlayCircle },
    { id: "creator", label: "Creator Guide", icon: Zap },
    { id: "viewer", label: "Viewer Guide", icon: Users },
    { id: "partnership", label: "Partnerships", icon: BookOpen },
  ]

  const getThumbnailUrl = (tutorial: Tutorial) => {
    return tutorial.thumbnailUrl || "/placeholder.svg"
  }

  const getVideoType = (videoUrl: string | null) => {
    if (!videoUrl) return 'unknown'
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) return 'youtube'
    if (videoUrl.includes('vimeo.com')) return 'vimeo'
    if (videoUrl.match(/\.(mp4|webm|ogg|mov|avi)$/i)) return 'direct'
    return 'external'
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Tutorials</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchTutorials}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Video Player Modal */}
      {showVideoPlayer && selectedTutorial && (
        <VideoPlayer 
          tutorial={selectedTutorial} 
          onClose={handleCloseVideoPlayer}
        />
      )}

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-12 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                Learn Xonnect
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch our comprehensive video tutorials to master the Xonnect platform, from creators to viewers to
              partners.
            </p>
          </motion.div>

          {/* Selected Tutorial Preview */}
          {selectedTutorial && !showVideoPlayer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 max-w-4xl mx-auto"
            >
              <div className="bg-black rounded-xl border border-red-600/30 overflow-hidden">
                <div 
                  className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center group relative cursor-pointer"
                  onClick={() => setShowVideoPlayer(true)}
                >
                  <img
                    src={getThumbnailUrl(selectedTutorial)}
                    alt={selectedTutorial.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center"
                    >
                      <PlayCircle className="w-12 h-12 text-white fill-white" />
                    </motion.div>
                  </div>
                  {/* Video Type Badge */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur px-2 py-1 rounded text-xs font-medium">
                    {getVideoType(selectedTutorial.videoUrl).toUpperCase()}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedTutorial.title}</h2>
                  <p className="text-gray-400 mb-4">{selectedTutorial.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className="inline-block px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm">
                      {formatLevel(selectedTutorial.level)}
                    </span>
                    <span className="text-gray-400">{formatDuration(selectedTutorial.duration)}</span>
                    {/* <span className="text-gray-400">{selectedTutorial.views} views</span> */}
                    <button
                      onClick={() => setShowVideoPlayer(true)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative z-10 py-8 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-red-600 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  } backdrop-blur-sm border ${selectedCategory === category.id ? "border-red-600" : "border-white/10"}`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{category.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="relative z-10 py-12 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-red-600" />
              <span className="ml-3 text-gray-400">Loading tutorials...</span>
            </div>
          ) : filteredTutorials.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold mb-2">No tutorials found</h3>
              <p className="text-gray-400">
                {selectedCategory === "all" 
                  ? "No tutorials available yet." 
                  : `No ${selectedCategory} tutorials available.`}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials.map((tutorial, index) => (
                <motion.div
                  key={tutorial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => handleTutorialSelect(tutorial)}
                  className="group cursor-pointer"
                >
                  <div className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300">
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-gray-900">
                      <img
                        src={getThumbnailUrl(tutorial)}
                        alt={tutorial.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center"
                        >
                          <PlayCircle className="w-8 h-8 text-white fill-white" />
                        </motion.div>
                      </div>
                      {/* Duration Badge */}
                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur px-2 py-1 rounded text-xs font-medium">
                        {formatDuration(tutorial.duration)}
                      </div>
                      {/* Video Type Badge */}
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur px-2 py-1 rounded text-xs font-medium">
                        {getVideoType(tutorial.videoUrl).toUpperCase()}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
                        {tutorial.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {tutorial.description || "No description available."}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="inline-block px-2 py-1 bg-red-600/20 text-red-400 rounded text-xs font-medium">
                          {formatLevel(tutorial.level)}
                        </span>
                        <div className="flex items-center gap-2">
                          <motion.div whileHover={{ x: 4 }} className="text-red-400">
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

    
    </div>
  )
}

export default TutorialPage