/**
 * DropAphi API Client
 * Centralized client for all DropAphi API interactions
 * Docs: https://dropaphi.xyz/docs
 */

const BASE = 'https://dropaphi.xyz/api'
// const BASE = 'http://localhost:3001/api'

function headers() {
  const apiKey = process.env.DROPAPHI_API_KEY
  if (!apiKey) {
    throw new Error('Missing DROPAPHI_API_KEY environment variable')
  }
  return {
    'Content-Type': 'application/json',
    'drop-api-key': apiKey,
  }
}

// ─── OTP ────────────────────────────────────────────────────────────────────

export interface OtpResult {
  ok: boolean
  message?: string
  cooldown?: number
}

export interface OtpVerifyResult {
  ok: boolean
  valid: boolean
  message?: string
}

export async function sendOtp(
  email: string,
  options?: {
    brandName?: string
    fromName?: string
    fromEmail?: string
    length?: number
    expiry?: number
  }
): Promise<OtpResult> {
  try {
    const res = await fetch(`${BASE}/v1/otp/send`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        email,
        brandName: options?.brandName ?? process.env.DROPAPHI_FROM_NAME ?? 'Xonnect',
        fromName: options?.fromName ?? process.env.DROPAPHI_FROM_NAME ?? 'Xonnect',
        fromEmail: options?.fromEmail ?? process.env.DROPAPHI_FROM_EMAIL ?? 'auth@xonnect.net',
        length: options?.length ?? 6,
        expiry: options?.expiry ?? 10,
      }),
    })

    const data = await res.json()

    if (res.status === 429) {
      return {
        ok: false,
        message: 'Please wait before requesting another code.',
        cooldown: data?.details?.nextAttemptIn ?? 60,
      }
    }

    if (!res.ok) {
      console.error('[DropAphi OTP Send Error]', data)
      return { ok: false, message: data?.message ?? 'Failed to send code.' }
    }

    return { ok: true }
  } catch (error) {
    console.error('[DropAphi OTP Send Exception]', error)
    return { ok: false, message: 'Email service unavailable.' }
  }
}

export async function resendOtp(
  email: string,
  reason: 'expired' | 'not_received' | 'new_request' = 'new_request'
): Promise<OtpResult> {
  try {
    const res = await fetch(`${BASE}/v1/otp/resend`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ email, reason }),
    })

    const data = await res.json()

    if (res.status === 429) {
      return {
        ok: false,
        message: 'Please wait.',
        cooldown: data?.details?.nextAttemptIn ?? 60,
      }
    }

    if (!res.ok) {
      console.error('[DropAphi OTP Resend Error]', data)
      return { ok: false, message: data?.message ?? 'Failed to resend code.' }
    }

    return { ok: true }
  } catch (error) {
    console.error('[DropAphi OTP Resend Exception]', error)
    return { ok: false, message: 'Email service unavailable.' }
  }
}

export async function verifyOtp(email: string, code: string): Promise<OtpVerifyResult> {
  try {
    const res = await fetch(`${BASE}/v1/otp/verify`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ email, code }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('[DropAphi OTP Verify Error]', data)
      return {
        ok: false,
        valid: false,
        message: data?.message ?? 'Invalid or expired code.',
      }
    }

    return { ok: true, valid: true }
  } catch (error) {
    console.error('[DropAphi OTP Verify Exception]', error)
    return {
      ok: false,
      valid: false,
      message: 'Verification service unavailable.',
    }
  }
}

// ─── Email ──────────────────────────────────────────────────────────────────

export interface EmailResult {
  ok: boolean
  message?: string
  emailId?: string
}

export interface EmailOptions {
  to: string
  subject: string
  html: string
  fromName?: string
  fromEmail?: string
  cc?: string[]
  bcc?: string[]
}

export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  try {
    const res = await fetch(`${BASE}/v1/email/send`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        to: options.to,
        subject: options.subject,
        html: options.html,
        fromName: options.fromName ?? process.env.DROPAPHI_FROM_NAME ?? 'Xonnect',
        fromEmail:
          options.fromEmail ?? process.env.DROPAPHI_FROM_EMAIL ?? 'auth@xonnect.net',
        cc: options.cc ?? [],
        bcc: options.bcc ?? [],
      }),
    })

    const data = await res.json()

    if (res.status === 429) {
      return {
        ok: false,
        message: 'Rate limited. Please wait before sending another email.',
      }
    }

    if (!res.ok) {
      console.error('[DropAphi Email Send Error]', data)
      return {
        ok: false,
        message: data?.message ?? 'Failed to send email.',
      }
    }

    return { ok: true, emailId: data?.id }
  } catch (error) {
    console.error('[DropAphi Email Send Exception]', error)
    return { ok: false, message: 'Email service unavailable.' }
  }
}

export interface EmailStatusResult {
  ok: boolean
  message?: string
  emailId?: string
  status?: string
}

export async function getEmailStatus(emailId: string): Promise<EmailStatusResult> {
  try {
    const res = await fetch(`${BASE}/v1/email/${emailId}`, {
      method: 'GET',
      headers: headers(),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('[DropAphi Email Status Error]', data)
      return {
        ok: false,
        message: data?.message ?? 'Failed to fetch email status.',
      }
    }

    return { ok: true, emailId: data?.id, status: data?.status }
  } catch (error) {
    console.error('[DropAphi Email Status Exception]', error)
    return { ok: false, message: 'Email service unavailable.' }
  }
}

// ─── Files ──────────────────────────────────────────────────────────────────

export interface UploadResult {
  ok: boolean
  message?: string
  fileId?: string
  url?: string
}


export async function uploadFile(
  file: File | Blob,
  filename: string
): Promise<UploadResult> {
  try {
    const formData = new FormData()
    formData.append('file', file, filename)

    const apiKey = process.env.DROPAPHI_API_KEY!
    
    // ✅ IMPORTANT: Don't set any headers manually for FormData
    // The browser will set Content-Type automatically with boundary
    const res = await fetch(`${BASE}/v1/files/upload`, {
      method: 'POST',
      headers: {
        'drop-api-key': apiKey,  // Only this custom header
        // ❌ DON'T set 'Content-Type' - let browser handle it
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

    // Handle your server's response structure
    return { 
      ok: true, 
      fileId: data?.data?.id, 
      url: data?.data?.url || data?.data?.directUrl
    }
  } catch (error) {
    console.error('[DropAphi File Upload Exception]', error)
    return { ok: false, message: 'File upload service unavailable.' }
  }
}


export interface FileListResult {
  ok: boolean
  message?: string
  files?: Array<{
    id: string
    filename: string
    url: string
    size: number
    uploadedAt: string
  }>
}

export async function listFiles(): Promise<FileListResult> {
  try {
    const res = await fetch(`${BASE}/v1/files`, {
      method: 'GET',
      headers: headers(),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('[DropAphi List Files Error]', data)
      return { ok: false, message: data?.message ?? 'Failed to list files.' }
    }

    return { ok: true, files: data?.files ?? data }
  } catch (error) {
    console.error('[DropAphi List Files Exception]', error)
    return { ok: false, message: 'File service unavailable.' }
  }
}

export interface FileInfoResult {
  ok: boolean
  message?: string
  file?: {
    id: string
    filename: string
    url: string
    size: number
    uploadedAt: string
  }
}

export async function getFile(fileId: string): Promise<FileInfoResult> {
  try {
    const res = await fetch(`${BASE}/v1/files/${fileId}`, {
      method: 'GET',
      headers: headers(),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('[DropAphi Get File Error]', data)
      return {
        ok: false,
        message: data?.message ?? 'Failed to fetch file info.',
      }
    }

    return { ok: true, file: data }
  } catch (error) {
    console.error('[DropAphi Get File Exception]', error)
    return { ok: false, message: 'File service unavailable.' }
  }
}
