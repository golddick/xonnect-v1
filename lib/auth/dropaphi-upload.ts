


// lib/auth/dropaphi-upload.ts
const BASE = 'https://dropaphi.xyz/api'
// const BASE = 'http://localhost:3003/api'

function getPublicDropAphiApiKey() {
  const apiKey = process.env.NEXT_PUBLIC_DROPAPHI_API_KEY
  if (!apiKey || apiKey.trim() === '') {
    throw new Error("Missing NEXT_PUBLIC_DROPAPHI_API_KEY")
  }
  return apiKey 
}

export interface UploadResult {
  ok: boolean
  message?: string
  url?: string
  directUrl?: string
  fileId?: string
}

/**
 * Upload a thumbnail image to DropAphi storage
 * Returns the URL of the uploaded image
 */
export async function uploadFileRaw(file: File): Promise<UploadResult> {
  try {
    // Validate image
    if (!file.type.startsWith('image/')) {
      return { ok: false, message: 'File must be an image' }
    }
    
    if (file.size > 5 * 1024 * 1024) {
      return { ok: false, message: 'Image must be less than 5MB' }
    }

    const apiKey = getPublicDropAphiApiKey()

    console.log(apiKey,)
    
    // Build FormData - API expects 'file' field
    const formData = new FormData()
    formData.append('file', file)
    
    // Add metadata
    formData.append('metadata', JSON.stringify({
      visibility: 'PUBLIC',
      folder: 'thumbnails'
    }))

    const res = await fetch(`${BASE}/v1/files/upload`, {
      method: 'POST',
      headers: {
        'drop-api-key': apiKey,
      },
      body: formData,
    })

    const data = await res.json()

    if (!res.ok) {
      return {
        ok: false,
        message: data?.error || data?.message || 'Upload failed',
      }
    }

    return {
      ok: true,
      url: data?.data?.url,
      directUrl: data?.data?.directUrl,
      fileId: data?.data?.id,
    }
  } catch (error) {
    console.error('[Thumbnail Upload Error]', error)
    return { ok: false, message: 'Upload service unavailable' }
  }
}