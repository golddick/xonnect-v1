"use client"


import type { Profile } from "@/lib/generated/prisma"
import { ProfileEditForm } from "@/components/profile-edit-form"


export default function ProfileClient({
  profile,
}: {
  profile: Profile | null
}) {
  const uploadedAvatarUrl = profile?.avatarUrl ?? null

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <ProfileEditForm profile={profile} avatarUrlOverride={uploadedAvatarUrl} />
    </div>
  )
}

