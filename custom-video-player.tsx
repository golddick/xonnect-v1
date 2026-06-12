"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  SkipBack,
  SkipForward,
  Radio,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  DollarSign,
  Crown,
} from "lucide-react"

interface VideoPlayerProps {
  src: string
  title: string
  creator: string
  creatorAvatar: string
  isLive?: boolean
  isPremium?: boolean
  price?: number
  viewers?: number
  likes?: number
  duration?: string
  currentTime?: string
  onLike?: () => void
  onShare?: () => void
  onComment?: () => void
  className?: string
}

export default function CustomVideoPlayer({
  src,
  title,
  creator,
  creatorAvatar,
  isLive = false,
  isPremium = false,
  price = 0,
  viewers = 0,
  likes = 0,
  duration = "00:00",
  currentTime = "00:00",
  onLike,
  onShare,
  onComment,
  className = "",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [progress, setProgress] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [quality, setQuality] = useState("1080p")
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  const [hasAccess, setHasAccess] = useState(!isPremium)

  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    const updateBuffered = () => {
      if (video.buffered.length > 0 && video.duration) {
        setBuffered((video.buffered.end(video.buffered.length - 1) / video.duration) * 100)
      }
    }

    video.addEventListener("timeupdate", updateProgress)
    video.addEventListener("progress", updateBuffered)
    video.addEventListener("loadedmetadata", updateProgress)

    return () => {
      video.removeEventListener("timeupdate", updateProgress)
      video.removeEventListener("progress", updateBuffered)
      video.removeEventListener("loadedmetadata", updateProgress)
    }
  }, [])

  const togglePlay = () => {
    if (!hasAccess) return
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLive || !hasAccess) return
    const progressBar = progressRef.current
    const video = videoRef.current
    if (!progressBar || !video) return

    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newProgress = (clickX / rect.width) * 100
    const newTime = (newProgress / 100) * video.duration

    video.currentTime = newTime
    setProgress(newProgress)
  }

  const skip = (seconds: number) => {
    if (isLive || !hasAccess) return
    const video = videoRef.current
    if (!video) return

    video.currentTime += seconds
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const showControlsTemporarily = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handlePurchase = () => {
    // Handle premium content purchase
    setHasAccess(true)
  }

  return (
    <div className={`relative bg-black rounded-2xl overflow-hidden ${className}`}>
      {/* Video Element */}
      <div
        className="relative aspect-video bg-gray-900"
        onMouseMove={showControlsTemporarily}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={hasAccess ? src : ""}
          className="w-full h-full object-cover"
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Premium Content Overlay */}
        {!hasAccess && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium Content</h3>
              <p className="text-gray-300 mb-6">Unlock this video to watch</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-3xl font-bold text-yellow-500">₦{price}</span>
                <button
                  onClick={handlePurchase}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
                >
                  <DollarSign className="w-5 h-5" />
                  Purchase
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Stream Indicator */}
        {isLive && hasAccess && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE
          </div>
        )}

        {/* Viewer Count */}
        {isLive && hasAccess && (
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-white text-sm flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {viewers.toLocaleString()}
            </span>
          </div>
        )}

        {/* Video Controls */}
        {hasAccess && (
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Progress Bar */}
            <div className="absolute bottom-20 left-4 right-4">
              <div
                ref={progressRef}
                className={`w-full h-1 bg-gray-600 rounded-full ${!isLive ? "cursor-pointer" : ""}`}
                onClick={handleProgressClick}
              >
                {/* Buffered Progress */}
                <div
                  className="absolute top-0 left-0 h-full bg-gray-400 rounded-full"
                  style={{ width: `${buffered}%` }}
                />
                {/* Current Progress */}
                <div
                  className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
                  style={{ width: `${progress}%` }}
                />
                {/* Progress Handle */}
                {!isLive && (
                  <div
                    className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full"
                    style={{ left: `${progress}%`, marginLeft: "-6px" }}
                  />
                )}
              </div>
            </div>

            {/* Control Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between">
                {/* Left Controls */}
                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="bg-red-600 hover:bg-red-700 rounded-full p-3 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
                  </button>

                  {/* Skip Controls (only for regular videos) */}
                  {!isLive && (
                    <>
                      <button onClick={() => skip(-10)} className="text-white hover:text-red-400 transition-colors">
                        <SkipBack className="w-5 h-5" />
                      </button>
                      <button onClick={() => skip(10)} className="text-white hover:text-red-400 transition-colors">
                        <SkipForward className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Volume */}
                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="text-white hover:text-red-400 transition-colors">
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-gray-600 rounded-lg appearance-none slider"
                    />
                  </div>

                  {/* Time Display */}
                  <div className="text-white text-sm">
                    {isLive ? (
                      <span className="flex items-center gap-1">
                        <Radio className="w-4 h-4 text-red-400" />
                        LIVE
                      </span>
                    ) : (
                      <span>
                        {currentTime} / {duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-4">
                  {/* Settings */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="text-white hover:text-red-400 transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                    </button>

                    {showSettings && (
                      <div className="absolute bottom-8 right-0 bg-gray-900 border border-gray-700 rounded-xl p-4 min-w-48">
                        <div className="space-y-3">
                          <div>
                            <label className="block text-white text-sm mb-2">Quality</label>
                            <select
                              value={quality}
                              onChange={(e) => setQuality(e.target.value)}
                              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm"
                            >
                              <option value="1080p">1080p HD</option>
                              <option value="720p">720p</option>
                              <option value="480p">480p</option>
                              <option value="360p">360p</option>
                            </select>
                          </div>

                          {!isLive && (
                            <div>
                              <label className="block text-white text-sm mb-2">Speed</label>
                              <select
                                value={playbackSpeed}
                                onChange={(e) => setPlaybackSpeed(Number.parseFloat(e.target.value))}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm"
                              >
                                <option value={0.5}>0.5x</option>
                                <option value={0.75}>0.75x</option>
                                <option value={1}>1x</option>
                                <option value={1.25}>1.25x</option>
                                <option value={1.5}>1.5x</option>
                                <option value={2}>2x</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fullscreen */}
                  <button onClick={toggleFullscreen} className="text-white hover:text-red-400 transition-colors">
                    {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="p-6 bg-gray-900/50 border-t border-gray-800">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <img
              src={creatorAvatar || "/placeholder.svg"}
              alt={creator}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
              <p className="text-gray-400 mb-3">{creator}</p>
              <div className="flex items-center gap-6">
                <button
                  onClick={onLike}
                  className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span>{likes.toLocaleString()}</span>
                </button>
                <button
                  onClick={onComment}
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Comment</span>
                </button>
                <button
                  onClick={onShare}
                  className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {isPremium && (
            <div className="flex items-center gap-2 bg-yellow-600/20 border border-yellow-600/30 rounded-lg px-3 py-2">
              <Crown className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-500 text-sm font-medium">Premium</span>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}
