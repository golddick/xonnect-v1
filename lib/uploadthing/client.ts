import { UploadThingError } from "uploadthing/server"

// UploadThing client helper: uploads a single file to the `video` file route
// Route slug is defined in `app/api/uploadthing/route.ts`
//
// We intentionally don't use `useUploadThing`.

export async function uploadCreatorVideo(file: File, onProgress?: (pct: number) => void) {
  // uploadthing provides a default browser-side upload implementation via `fetch`
  // but since this project uses the server route handler already, we use the uploadthing
  // client SDK `uploadFiles`.
  const { uploadFiles } = await import("uploadthing/client")

  // uploadthing's client entrypoint exposes `uploadFiles` in this project.
  const result = await (uploadFiles as any)({
    // The route slug is `creatorVideoUploader` in `app/api/uploadthing/route.ts`
    // uploadthing uses the object key as route name.
    creatorVideoUploader: [file],
    onUploadProgress: (progress: any) => {
      if (typeof progress?.progress === "number") onProgress?.(progress.progress)
      else if (typeof progress?.percentage === "number") onProgress?.(progress.percentage)
    },
  })

  if (!result?.[0]) throw new Error("Upload failed")

  return result[0]
}

