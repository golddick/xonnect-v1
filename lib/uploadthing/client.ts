import { UploadThingError } from "uploadthing/server"
import type { OurFileRouter } from "@/app/api/uploadthing/core"

// UploadThing client helper: uploads a single file to the `video` file route
// Route slug is defined in `app/api/uploadthing/route.ts`
//
// We intentionally don't use `useUploadThing`.

type UploadCreatorVideoResult = {
  videoUrl: string | null
  fileUrl: string | null
  ufsUrl: string
  key: string
  serverData: {
    uploadedBy: string
    videoUrl: string
    fileUrl: string
  }
}

export async function uploadCreatorVideo(
  file: File,
  onProgress?: (pct: number) => void
): Promise<UploadCreatorVideoResult> {
  const { genUploader } = await import("uploadthing/client")
  const uploader = genUploader<OurFileRouter>({
    url: new URL("/api/uploadthing", window.location.origin),
  })

  const result = await uploader.uploadFiles("creatorVideoUploader", {
    files: [file],
    onUploadProgress: (progress) => {
      if (typeof progress?.progress === "number") onProgress?.(progress.progress)
      else if (typeof progress?.totalProgress === "number") onProgress?.(progress.totalProgress)
    },
  })

  const uploaded = result?.[0]
  if (!uploaded) throw new Error("Upload failed")

  return {
    videoUrl: uploaded.serverData.videoUrl ?? null,
    fileUrl: uploaded.serverData.fileUrl ?? null,
    ufsUrl: uploaded.ufsUrl,
    key: uploaded.key,
    serverData: uploaded.serverData,
  }
}

