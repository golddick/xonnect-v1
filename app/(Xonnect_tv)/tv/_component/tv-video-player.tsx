"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, Minimize } from "lucide-react"
import { motion } from "framer-motion"

interface VideoPlayerProps {
  videoUrl?: string
  isLive: boolean
  title: string
  viewers: number
}

const TvVideoPlayer = ({ isLive, title, viewers }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(80)
  const [showControls, setShowControls] = useState(true)
  const [quality, setQuality] = useState("720p")
  const [isPiP, setIsPiP] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePiPEnter = () => setIsPiP(true)
    const handlePiPExit = () => setIsPiP(false)

    video.addEventListener("enterpictureinpicture", handlePiPEnter)
    video.addEventListener("leavepictureinpicture", handlePiPExit)

    return () => {
      video.removeEventListener("enterpictureinpicture", handlePiPEnter)
      video.removeEventListener("leavepictureinpicture", handlePiPExit)
    }
  }, [])

  useEffect(() => {
    if (showControls) {
      controlTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
    return () => clearTimeout(controlTimeoutRef.current)
  }, [showControls])

  const handleMouseMove = () => {
    setShowControls(true)
  }

  const handleFullscreen = () => {
    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen()
    }
  }

  const handlePiP = async () => {
    if (!videoRef.current) return

    try {
      if (!isPiP && document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture()
        setIsPiP(true)
      } else if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
        setIsPiP(false)
      }
    } catch (error) {
      console.error("PiP error:", error)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-background aspect-video overflow-hidden rounded-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Area */}
      <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <video ref={videoRef} className="w-full h-full object-cover" />
      </div>

      {/* Live Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-red-600 text-foreground px-3 py-1 rounded-full flex items-center space-x-2 font-bold text-sm">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Viewer Count */}
      <div className="absolute top-4 right-4 z-10 bg-background/60 text-foreground px-3 py-1 rounded-lg text-sm">
        {viewers.toLocaleString()} watching
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-between pointer-events-none hover:pointer-events-auto"
      >
        {/* Top Controls */}
        <div className="flex items-center justify-between p-4">
          <h3 className="text-foreground font-bold text-lg">{title}</h3>
          <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="space-y-3 p-4">
          {/* Progress Bar */}
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-red-600" />
            </div>
            <span className="text-foreground text-xs">45:23 / 60:00</span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5 text-foreground" /> : <Play className="w-5 h-5 text-foreground" />}
              </button>

              <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-1">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-foreground" /> : <Volume2 className="w-4 h-4 text-foreground" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-red-600"
                />
              </div>

              {/* Quality Selector */}
              <div className="relative group">
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-foreground text-sm font-semibold">
                  {quality}
                </button>
                <div className="absolute bottom-full mb-2 left-0 bg-background/90 border border-white/20 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                  {["1080p", "720p", "480p", "360p"].map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuality(q)}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-red-600 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Picture-in-Picture Button */}
              <button
                onClick={handlePiP}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                title={isPiP ? "Exit Picture-in-Picture" : "Picture-in-Picture"}
              >
                <Minimize className="w-5 h-5 text-foreground" />
              </button>

              <button
                onClick={handleFullscreen}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <Maximize className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default TvVideoPlayer

