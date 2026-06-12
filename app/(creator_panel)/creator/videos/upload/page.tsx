// app/(creator_panel)/creator/videos/upload/page.tsx
import { Suspense } from "react"
import UploadVideoContent from "./_component/upload"
import LoadingSplash from "@/components/splash_screen/loading-splash"


export default function UploadVideoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><LoadingSplash/></div>}>
      <UploadVideoContent />
    </Suspense>
  )
}