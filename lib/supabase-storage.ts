import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Recorded live-event MP4s are written by LiveKit Egress into a PRIVATE Supabase
// Storage bucket. We never expose the object directly — a short-lived signed URL is
// minted at watch time (see lib/tv/event-watch.ts) so the paywall/expiry gating still
// applies. This module centralises the admin client + the sign/delete helpers.

let cachedClient: SupabaseClient | null = null

export function getRecordingsBucket(): string {
  const bucket = process.env.SUPABASE_RECORDINGS_BUCKET
  if (!bucket) {
    throw new Error("Missing SUPABASE_RECORDINGS_BUCKET env var")
  }
  return bucket
}

export function getSupabaseAdmin(): SupabaseClient {
  if (cachedClient) return cachedClient

  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env var")
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cachedClient
}

// A stored `recordedVideoUrl` is either a legacy absolute URL (older uploadthing
// recordings) or a Supabase storage object key written by egress. Only the latter is
// signed; absolute URLs are passed through untouched for backward compatibility.
export function isStorageKey(value: string | null | undefined): value is string {
  if (!value) return false
  return !/^https?:\/\//i.test(value)
}

const DEFAULT_SIGNED_URL_TTL_SECONDS = 60 * 60 * 6 // 6 hours

export async function createRecordingSignedUrl(
  key: string,
  expiresInSeconds: number = DEFAULT_SIGNED_URL_TTL_SECONDS
): Promise<string | null> {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.storage
      .from(getRecordingsBucket())
      .createSignedUrl(key, expiresInSeconds)

    if (error || !data?.signedUrl) {
      console.error("Failed to create signed URL for recording:", error)
      return null
    }
    return data.signedUrl
  } catch (err) {
    console.error("createRecordingSignedUrl error:", err)
    return null
  }
}

export async function deleteRecordingObject(key: string): Promise<boolean> {
  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.storage.from(getRecordingsBucket()).remove([key])
    if (error) {
      console.error("Failed to delete recording object:", error)
      return false
    }
    return true
  } catch (err) {
    console.error("deleteRecordingObject error:", err)
    return false
  }
}
