export function formatVideoDuration(totalSeconds: number): string {
  const safeSeconds = Number.isFinite(totalSeconds) ? Math.max(0, Math.floor(totalSeconds)) : 0
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  const parts = [hours, minutes, seconds].map((part) => String(part).padStart(2, "0"))
  return parts.join(":")
}

export async function getVideoDuration(file: File): Promise<string | null> {
  if (typeof window === "undefined") return null

  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file)
    const video = document.createElement("video")

    const cleanUp = () => {
      URL.revokeObjectURL(objectUrl)
      video.removeAttribute("src")
      video.load()
    }

    video.preload = "metadata"
    video.onloadedmetadata = () => {
      const duration = video.duration
      cleanUp()

      if (!Number.isFinite(duration) || duration <= 0) {
        resolve(null)
        return
      }

      resolve(formatVideoDuration(duration))
    }

    video.onerror = () => {
      cleanUp()
      resolve(null)
    }

    video.src = objectUrl
  })
}
