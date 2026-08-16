// Updated client - send JSON with base64
"use client"

import { useState } from "react"
import Image from "next/image"

export default function AvatarUpload({
  initialUrl,
  onUploaded,
}: {
  initialUrl?: string | null
  onUploaded: (url: string) => void
}) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialUrl ?? null)
  const [error, setError] = useState<string | null>(null)

  // Helper to convert file to base64
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const result = reader.result as string
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
    })
  }

  async function onFileChange(file: File | null) {
    if (!file) return 
    
    setIsUploading(true)
    setError(null) 
    
    try {
      // Convert file to base64
      const base64Data = await fileToBase64(file)

      const payload = {
        name: file.name,
        type: file.type,
        data: base64Data,
        metadata: {
          visibility: "PUBLIC"
        }
      }

      const response = await fetch("/api/dropaphi/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Upload failed")
      }

      const data = await response.json()
      
      if (!data.success || !data.data?.url) {
        throw new Error(data.message || "Upload failed")
      }
 
      setPreviewUrl(data.data.url)
      onUploaded(data.data.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        {previewUrl ? (
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border bg-background">
            <Image
              src={previewUrl}
              alt="Avatar preview"
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background text-sm text-muted-foreground">
            No image
          </div>
        )}

        <div className="flex-1">
          <label className="block text-sm font-medium">Avatar Upload</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 w-full text-sm text-muted-foreground"
            disabled={isUploading}
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />
          {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {isUploading ? "Uploading..." : "Choose an image from your device"}
      </p>
    </div>
  )
}