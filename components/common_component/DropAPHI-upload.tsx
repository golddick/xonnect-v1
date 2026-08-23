"use client"

import { useState } from "react"
import Image from "next/image"

interface UploadAvatarProps {
  initialUrl?: string | null
  onUploaded: (url: string) => void
  size?: number
  className?: string
  label?: string
  uploadText?: string
  uploadingText?: string
  noImageText?: string
  errorClassName?: string
  containerClassName?: string
  previewClassName?: string
  labelClassName?: string
  inputClassName?: string
  hintClassName?: string
  accept?: string
  disabled?: boolean
  showHint?: boolean
  rounded?: "full" | "lg" | "md" | "none"
  showPreview?: boolean // New prop
}

export default function UploadFile({
  initialUrl,
  onUploaded,
  size = 64,
  className = "",
  label = "Upload",
  uploadText = "Choose an image from your device",
  uploadingText = "Uploading...",
  noImageText = "No image",
  errorClassName = "mt-1 text-xs text-red-500",
  containerClassName = "space-y-3",
  previewClassName = "relative overflow-hidden border border-border bg-background",
  labelClassName = "block text-sm font-medium",
  inputClassName = "mt-1 w-full text-sm text-muted-foreground",
  hintClassName = "text-xs text-muted-foreground",
  accept = "image/*",
  disabled = false,
  showHint = true,
  rounded = "full",
  showPreview = false
}: UploadAvatarProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialUrl ?? null)
  const [error, setError] = useState<string | null>(null)

  const getRoundedClass = () => {
    switch (rounded) {
      case "full": return "rounded-full"
      case "lg": return "rounded-lg"
      case "md": return "rounded-md"
      case "none": return "rounded-none"
      default: return "rounded-full"
    }
  }

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
    <div className={`${containerClassName} ${className}`}>
      <div className="flex items-center gap-4">
        {/* Avatar Preview - Conditional */}
        {showPreview && (
          <>
            {previewUrl ? (
              <div 
                className={`${previewClassName} ${getRoundedClass()}`}
                style={{ 
                  width: size, 
                  height: size,
                  minWidth: size,
                  minHeight: size,
                }}
              >
                <Image
                  src={previewUrl}
                  alt="Avatar preview"
                  fill
                  className="object-cover"
                  sizes={`${size}px`}
                />
              </div>
            ) : (
              <div 
                className={`flex items-center justify-center border border-border bg-background text-sm text-muted-foreground ${getRoundedClass()}`}
                style={{ 
                  width: size, 
                  height: size,
                  minWidth: size,
                  minHeight: size,
                }}
              >
                {noImageText}
              </div>
            )}
          </>
        )}

        {/* Upload Controls */}
        <div className={showPreview ? "flex-1" : "w-full"}>
          {label && (
            <label className={labelClassName}>{label}</label>
          )}
          <input
            type="file"
            accept={accept}
            className={inputClassName}
            disabled={isUploading || disabled}
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />
          {error && <p className={errorClassName}>{error}</p>}
        </div>
      </div>

      {/* Hint Text */}
      {showHint && (
        <p className={hintClassName}>
          {isUploading ? uploadingText : uploadText}
        </p>
      )}
    </div>
  )
}
