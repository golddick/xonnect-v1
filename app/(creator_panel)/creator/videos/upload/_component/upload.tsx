// app/(creator_panel)/creator/videos/upload/UploadVideoContent.tsx
"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import UploadVideoComponent from "../../../_component/upload-video-component"


export default function UploadVideoContent() {
  const searchParams = useSearchParams()
  const [showUploader, setShowUploader] = useState(true)
  const initialFolderId = searchParams.get("folder")

  const handleUpload = (videoData: any) => {
    console.log("Video uploaded:", videoData)
    // Handle the uploaded video data
  }

  const handleClose = () => {
    setShowUploader(false)
    // Redirect back to videos page 
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-background">
      {showUploader && (
        <UploadVideoComponent
          onClose={handleClose}
          onUpload={handleUpload}
          initialFolderId={initialFolderId}
        />
      )}
    </div>
  )
}