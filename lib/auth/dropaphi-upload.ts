
const dropaphiApiKey = process.env.DROPAPHI_API_KEY
const BASE = 'https://dropaphi.xyz/api'
// const BASE = 'http://localhost:3001/api'

if (!dropaphiApiKey) {
        throw new Error("Missing NEXT_PUBLIC_DROPAPHI_API_KEY")
      }

// ─── Files ──────────────────────────────────────────────────────────────────

export interface UploadResult {
  ok: boolean
  message?: string
  fileId?: string
  url?: string
  directUrl?: string
  size?: number
  mimeType?: string
  billing?: {
    method: string
    unitsUsed: number
    fileSizeMB: number
    cost: number
    message: string
    remainingBalance?: number
    remainingCredits?: number
  }
}

export interface UploadOptions {
  folder?: string
  visibility?: 'PUBLIC' | 'PRIVATE'
  tags?: string[]
  description?: string
  filename?: string
  onProgress?: (percentage: number) => void
}

export async function uploadFile(
  file: File | Blob,
  filename?: string,
  options?: UploadOptions
): Promise<UploadResult> {
  try {
    const formData = new FormData()
    
    // Handle file append (support both File and Blob)
    if (file instanceof File) {
      formData.append('file', file)
    } else {
      // If it's a Blob, create a File with the provided filename
      const actualFilename = filename || 'file'
      formData.append('file', new File([file], actualFilename, { type: file.type }))
    }

    // Add metadata if provided
    if (options) {
      const metadata: any = {}
      if (options.folder) metadata.folder = options.folder
      if (options.visibility) metadata.visibility = options.visibility
      if (options.tags) metadata.tags = options.tags
      if (options.description) metadata.description = options.description
      if (options.filename) metadata.filename = options.filename
      
      if (Object.keys(metadata).length > 0) {
        formData.append('metadata', JSON.stringify(metadata))
      }
    }

    
     console.log(dropaphiApiKey, 'dropaphi api')

    if (!dropaphiApiKey || typeof dropaphiApiKey !== 'string' || dropaphiApiKey.trim() === '') {
      console.error('[DropAphi] Missing API key. Check your environment variables.')
      return { 
        ok: false, 
        message: 'API key is missing. Please configure DROPAPHI_API_KEY in your environment variables.' 
      }
    }

    
    // Use XMLHttpRequest for progress tracking if needed
    if (options?.onProgress) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable && options.onProgress) {
            const percentage = (event.loaded / event.total) * 100
            options.onProgress(percentage)
          }
        })
        
        xhr.addEventListener('load', () => {
          try {
            const data = JSON.parse(xhr.responseText)
            if (xhr.status === 201 || xhr.status === 200) {
              resolve({
                ok: true,
                fileId: data?.data?.id,
                url: data?.data?.url,
                directUrl: data?.data?.directUrl,
                size: data?.data?.size,
                mimeType: data?.data?.mimeType,
                billing: data?.data?.billing
              })
            } else {
              resolve({
                ok: false,
                message: data?.error || data?.message || 'Failed to upload file.'
              })
            }
          } catch (error) {
            reject({
              ok: false,
              message: 'Failed to parse response'
            })
          }
        })
        
        xhr.addEventListener('error', () => {
          reject({
            ok: false,
            message: 'Network error occurred'
          })
        })
        
        xhr.open('POST', `${BASE}/v1/files/upload`)
        xhr.setRequestHeader('drop-api-key', dropaphiApiKey)
        xhr.send(formData)
      })
    }
    
    // Simple fetch approach without progress tracking
    const res = await fetch(`${BASE}/v1/files/upload`, {
      method: 'POST',
      headers: {
        'drop-api-key': dropaphiApiKey,
      },
      body: formData,
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('[DropAphi File Upload Error]', data)
      return {
        ok: false,
        message: data?.error || data?.message || 'Failed to upload file.',
      }
    }

    return { 
      ok: true, 
      fileId: data?.data?.id, 
      url: data?.data?.url,
      directUrl: data?.data?.directUrl,
      size: data?.data?.size,
      mimeType: data?.data?.mimeType,
      billing: data?.data?.billing
    }
  } catch (error) {
    console.error('[DropAphi File Upload Exception]', error)
    return { ok: false, message: 'File upload service unavailable.' }
  }
}


export async function uploadFileRaw(
  rawBody: ArrayBuffer,
  contentType: string
): Promise<UploadResult> {
  const dropaphiApiKey = process.env.DROPAPHI_API_KEY
  
  if (!dropaphiApiKey || typeof dropaphiApiKey !== 'string' || dropaphiApiKey.trim() === '') {
    console.error('[DropAphi] Missing API key. Check your environment variables.')
    return { 
      ok: false, 
      message: 'API key is missing. Please configure DROPAPHI_API_KEY in your environment variables.' 
    }
  }
  
  try {
    const res = await fetch(`${BASE}/v1/files/upload`, {
      method: 'POST',
      headers: {
        'drop-api-key': dropaphiApiKey,
        'Content-Type': contentType,
      } as HeadersInit,
      body: rawBody,
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('[DropAphi File Upload Error]', data)
      return {
        ok: false,
        message: data?.error || data?.message || 'Failed to upload file.',
        billing: data?.billing
      }
    }

    return { 
      ok: true, 
      fileId: data?.data?.id, 
      url: data?.data?.url,
      directUrl: data?.data?.directUrl,
      size: data?.data?.size,
      mimeType: data?.data?.mimeType,
      billing: data?.data?.billing
    }
  } catch (error) {
    console.error('[DropAphi File Upload Exception]', error)
    return { ok: false, message: 'File upload service unavailable.' }
  }
}