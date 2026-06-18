export type PlayableMediaSource =
  | {
      kind: "video"
      src: string
    }
  | {
      kind: "youtube"
      src: string
      embedUrl: string
      videoId: string
    }

function buildYouTubeEmbedUrl(videoId: string) {
  const params = new URLSearchParams({
    controls: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
  })

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
}

function extractYouTubeVideoId(url: URL) {
  const hostname = url.hostname.toLowerCase().replace(/^www\./, "")

  if (hostname === "youtu.be") {
    return url.pathname.split("/").filter(Boolean)[0] ?? null
  }

  if (hostname.endsWith("youtube.com") || hostname.endsWith("youtube-nocookie.com")) {
    const fromQuery = url.searchParams.get("v")
    if (fromQuery) return fromQuery

    const parts = url.pathname.split("/").filter(Boolean)
    const embedIndex = parts.findIndex((part) => ["embed", "shorts", "live"].includes(part))
    if (embedIndex >= 0 && parts[embedIndex + 1]) {
      return parts[embedIndex + 1]
    }

    if (parts.length === 1) {
      return parts[0]
    }
  }

  return null
}

export function resolvePlayableMediaSource(value?: string | null): PlayableMediaSource | null {
  const src = value?.trim()
  if (!src) return null

  try {
    const normalizedSrc = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(src) ? src : `https://${src}`
    const url = new URL(normalizedSrc)
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "")
    const isYouTubeHost =
      hostname === "youtu.be" ||
      hostname.endsWith("youtube.com") ||
      hostname.endsWith("youtube-nocookie.com")

    if (isYouTubeHost) {
      const videoId = extractYouTubeVideoId(url)
      if (videoId) {
        return {
          kind: "youtube",
          src,
          videoId,
          embedUrl: buildYouTubeEmbedUrl(videoId),
        }
      }

      return null
    }

    return {
      kind: "video",
      src,
    }
  } catch {
    return {
      kind: "video",
      src,
    }
  }
}
