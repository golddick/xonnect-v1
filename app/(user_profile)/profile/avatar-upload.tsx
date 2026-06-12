"use client"

import { useState } from "react"
import Image from "next/image"
import { uploadFile } from "@/lib/auth/dropaphi-upload"

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

  async function onFileChange(file: File | null) {
    if (!file) return
    setIsUploading(true)
    setError(null)
    try {
      const result = await uploadFile( file, file.name  )
      
      if (!result.ok || !result.url) {
        throw new Error(result.message ?? "Upload failed")
      }

      setPreviewUrl(result.url)
      onUploaded(result.url)
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