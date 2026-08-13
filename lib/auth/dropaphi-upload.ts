


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

function getDropAphiApiKey() {
  const apiKey = process.env.DROPAPHI_API_KEY
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('Missing DROPAPHI_API_KEY')
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

interface UploadFileOptions {
  metadata?: Record<string, unknown>
  visibility?: string
  name?: string
  type?: string
  apiKey?: string
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

    if (typeof window !== 'undefined') {
      // Client-side: if an API key is provided via `options.apiKey`, perform
      // the JSON/base64 upload directly to DropAphi as documented.
      // NOTE: providing the API key client-side exposes it to end users.
      if (options.apiKey) {
        const base64Data = await fileToBase64(file)

        const payload = {
          name: options.name ?? file.name,
          type: options.type ?? file.type ?? 'application/octet-stream',
          data: base64Data,
          metadata,
        }

        const res = await fetch(`${BASE}/v1/files/upload`, {
          method: 'POST',
          headers: {
            'DROP-API-Key': options.apiKey,
            'Content-Type': 'application/json',
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

      // Fallback/proxy behavior previously used in the browser branch.
      // Left commented here intentionally — if you prefer using a server
      // proxy to keep your DropAphi API key secret, re-enable this block
      // and point the client to your server endpoint (e.g. `/api/dropaphi/upload`).
      /*
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', options.name ?? file.name)
      formData.append('type', options.type ?? file.type ?? 'application/octet-stream')
      formData.append('metadata', JSON.stringify(metadata))
      if (options.visibility) {
        formData.append('visibility', options.visibility)
      }

      const res = await fetch('/api/dropaphi/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        return {
          ok: false,
          message: data?.message || 'Upload failed',
        }
      }

      return {
        ok: true,
        url: data?.url ?? data?.directUrl,
        directUrl: data?.directUrl ?? data?.url,
        fileId: data?.fileId,
      }
      */

      return { ok: false, message: 'Client-side uploads require `options.apiKey`. Use server proxy otherwise.' }
    }

    const apiKey = getDropAphiApiKey()
    const base64Data = await fileToBase64(file)

    const payload = {
      name: options.name ?? file.name,
      type: options.type ?? file.type ?? 'application/octet-stream',
      data: base64Data,
      metadata,
    }

    const res = await fetch(`${BASE}/v1/files/upload`, {
      method: 'POST',
      headers: {
        'DROP-API-Key': apiKey,
        'Content-Type': 'application/json',
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
  } catch (error) {
    console.error('[DropAphi Upload Error]', error)
    return { ok: false, message: 'Upload service unavailable' }
  }
}