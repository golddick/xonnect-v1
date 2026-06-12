"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Volume2, VolumeX, Maximize, Settings, Pause, Minimize } from "lucide-react"

interface VideoPlayerProps {
  src: string
  poster?: string
  title: string
  isPremium?: boolean
  price?: number
  onPurchase?: () => void
}

export default function VideoPlayer({ src, poster, title, isPremium = false, price, onPurchase }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPiP, setIsPiP] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayPause = () => {
    if (isPremium && !isPlaying && onPurchase) {
      onPurchase()
      return
    }
    setIsPlaying(!isPlaying)
  }

  const formatTime = (time: number) => {
    if (!time) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full bg-black rounded-2xl overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Container */}
      <div className="relative aspect-video bg-black flex items-center justify-center">
        <video ref={videoRef} src={src} poster={poster} className="w-full h-full object-cover" />

        {isPremium && !isPlaying && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-full mb-4">
                <Play className="w-10 h-10 text-white fill-white ml-1" />
              </div>
              <p className="text-white text-sm mb-2">Premium Video</p>
              <p className="text-2xl font-bold text-white mb-4">₦{price?.toLocaleString()}</p>
              <button
                onClick={handlePlayPause}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Unlock & Play
              </button>
            </div>
          </div>
        )}

        {/* Play Button Overlay */}
        {!isPlaying && !isPremium && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center group/play hover:bg-black/20 transition-colors"
          >
            <div className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transform group-play/play:scale-110 transition-transform">
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </div>
          </button>
        )}

        {/* Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 space-y-2"
            >
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/20 rounded-full cursor-pointer group/progress hover:h-2 transition-all">
                <div className="h-full bg-red-600 rounded-full" style={{ width: `${(progress / duration) * 100}%` }} />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={handlePlayPause} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <span className="text-xs text-gray-300">
                    {formatTime(progress)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handlePiP}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title={isPiP ? "Exit Picture-in-Picture" : "Picture-in-Picture"}
                  >
                    <Minimize className="w-5 h-5" />
                  </button>

                  <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
