// lib/auth/dropaphi-upload.ts
const BASE = 'https://dropaphi.xyz/api'
// const BASE = 'http://localhost:3002/api'

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]

const apiKey = process.env.DROPAPHI_API_KEY!


export interface UploadResult {
  ok: boolean
  message?: string
  url?: string
  directUrl?: string
  fileId?: string
}

interface UploadFileOptions {
  metadata?: Record<string, unknown>
  visibility?: string
  name?: string
  type?: string
}

function normalizeMetadata(metadata?: Record<string, unknown>) {
  if (!metadata || Object.keys(metadata).length === 0) {
    return { visibility: 'PUBLIC' }
  }

  return metadata
}

async function fileToBase64(file: File): Promise<string> {
  const fileBuffer = await file.arrayBuffer()

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(fileBuffer).toString('base64')
  }

  const bytes = new Uint8Array(fileBuffer)
  let binary = ''

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary)
}

/**
 * Upload a file to DropAphi storage using the JSON/base64 API contract.
 *
 * POST /api/v1/files/upload with application/json payload containing
 * name, type, data and optionally metadata.
 */
export async function uploadFileRaw(
  file: File,
  options: UploadFileOptions = {}
): Promise<UploadResult> {
  try {
    if (!file || !(file instanceof File)) {
      return { ok: false, message: 'A valid file object is required' }
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return { ok: false, message: `File must be smaller than ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB` }
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        ok: false,
        message: 'Unsupported file type. Allowed types are JPEG, PNG, WEBP, GIF, and SVG.',
      }
    }

    const metadata = normalizeMetadata({
      ...(options.metadata ?? {}),
      ...(options.visibility ? { visibility: options.visibility } : {}),
    })

    
  
      
      const base64Data = await fileToBase64(file)

      const payload = {
        name: file.name,
        type: file.type,
        data: base64Data,
        metadata: metadata,
      }

      const res = await fetch(`https://dropaphi.xyz/api/v1/files/upload`, {
        method: 'POST',
        headers: {
        "DROP-API-Key": apiKey,
        "Content-Type": "application/json",
          },
        body: JSON.stringify(payload),
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
    }


   catch (error) {
    console.error('[DropAphi Upload Error]', error)
    return { ok: false, message: 'Upload service unavailable' }
  }
}
