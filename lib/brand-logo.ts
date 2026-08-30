import { readFile } from "node:fs/promises"
import path from "node:path"

// The brand logo is inlined (base64) into every SVG QR data URL and composited
// onto the hosted PNG QR. Inlining as a data URI is the only way the logo
// survives inside an SVG rendered through `<img src="data:image/svg+xml,...">`,
// which runs in a restricted mode that blocks external `<image href>` fetches.

const LOGO_PATH = path.join(process.cwd(), "public", "xonnect-logo.png")

// The inlined logo is embedded into every SVG QR data URL, so bound its
// dimensions to keep those data URLs small regardless of the source asset.
const INLINE_LOGO_WIDTH = 200

let cachedBuffer: Buffer | null | undefined
let cachedDataUri: string | null | undefined

async function loadLogoBuffer(): Promise<Buffer | null> {
  // 1. Local public asset — fast, and works on a self-hosted `next start`.
  try {
    return await readFile(LOGO_PATH)
  } catch {
    // Fall through: the public/ dir may not be on a serverless filesystem.
  }

  // 2. Fetch the same public asset the emails reference. Works on serverless
  //    where public/ isn't bundled into the function.
  const candidates: string[] = []
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "")
  if (appUrl) candidates.push(`${appUrl}/xonnect-logo.png`)
  const envLogo = process.env.LOGO?.replace(/['"\s]+/g, "")
  if (envLogo) candidates.push(envLogo)

  for (const url of candidates) {
    try {
      const res = await fetch(url)
      if (res.ok) {
        return Buffer.from(await res.arrayBuffer())
      }
    } catch {
      // Try the next candidate.
    }
  }

  return null
}

export async function getBrandLogoBuffer(): Promise<Buffer | null> {
  if (cachedBuffer !== undefined) return cachedBuffer

  cachedBuffer = await loadLogoBuffer()
  if (!cachedBuffer) {
    console.error("Failed to load brand logo asset from disk or network")
  }

  return cachedBuffer
}

/**
 * Base64 `data:` URI of the logo, downscaled to a bounded width. Safe to inline
 * into an SVG `<image href>` — data URIs render even in the restricted mode used
 * for `<img src="data:image/svg+xml,...">`, whereas external URLs are dropped.
 */
export async function getBrandLogoDataUri(): Promise<string | null> {
  if (cachedDataUri !== undefined) return cachedDataUri

  const buffer = await getBrandLogoBuffer()
  if (!buffer) {
    cachedDataUri = null
    return cachedDataUri
  }

  try {
    const { default: sharp } = await import("sharp")
    const resized = await sharp(buffer)
      .resize(INLINE_LOGO_WIDTH, INLINE_LOGO_WIDTH, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .png()
      .toBuffer()
    cachedDataUri = `data:image/png;base64,${resized.toString("base64")}`
  } catch (error) {
    // Fall back to the full-resolution logo rather than dropping it entirely.
    console.error("Failed to downscale brand logo, using full-size:", error)
    cachedDataUri = `data:image/png;base64,${buffer.toString("base64")}`
  }

  return cachedDataUri
}
