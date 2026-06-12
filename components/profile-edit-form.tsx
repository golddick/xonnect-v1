"use client"

import { useEffect, useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { Profile } from "@/lib/generated/prisma"
import ProfileAddressSearchModal from "@/app/(user_profile)/profile/ProfileAddressSearchModal"
import type { LocationData } from "@/lib/type/location"
import AvatarUpload from "@/app/(user_profile)/profile/avatar-upload"


interface ProfileEditFormProps {
  profile: Profile | null
  avatarUrlOverride?: string | null
}

export function ProfileEditForm({ profile, avatarUrlOverride }: ProfileEditFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const [locationModalOpen, setLocationModalOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<LocationData | null>(
    () => {
      if (!profile?.addressFull) return null

      const type = (profile.addressType as LocationData["type"] | null) ?? "city"
      return {
        name: profile.addressName ?? profile.addressFull ?? "",
        country: profile.addressCountry ?? "",
        state: profile.addressState ?? undefined,
        lat: profile.addressLat ?? undefined,
        lon: profile.addressLon ?? undefined,
        type,
        fullAddress: profile.addressFull ?? undefined,
      }
    }
  )

  const [formData, setFormData] = useState({
    fullName: profile?.fullName || "",
    bio: profile?.bio || "",
    avatarUrl: avatarUrlOverride ?? (profile?.avatarUrl || ""),
    age: profile?.age ? String(profile.age) : "",
    sex: profile?.sex || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (avatarUrlOverride !== undefined) {
      setFormData((prev) => ({ ...prev, avatarUrl: avatarUrlOverride ?? "" }))
    }
  }, [avatarUrlOverride])


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          bio: formData.bio,
          age: formData.age ? Number(formData.age) : null,
          sex: formData.sex || null,
          avatarUrl: formData.avatarUrl || null,

          addressFull: selectedAddress?.fullAddress ?? null,
          addressLat: selectedAddress?.lat ?? null,
          addressLon: selectedAddress?.lon ?? null,
          addressType: selectedAddress?.type ?? null,
          addressCountry: selectedAddress?.country ?? null,
          addressState: selectedAddress?.state ?? null,
          addressName: selectedAddress?.name ?? null,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update profile")
      }

      toast.success("Profile updated successfully")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/profile/update-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: formData.newPassword,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update password")
      }

      toast.success("Password updated successfully")
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
      setShowPasswordForm(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update password"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <section className="rounded-3xl border border-border bg-card p-8">
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Avatar URL</label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
              <input
                type="text"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
                className="w-full sm:flex-1 rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                placeholder="https://... (optional)"
              />

              <div className="w-full sm:w-auto">
                <AvatarUpload
                  initialUrl={formData.avatarUrl || null}
                  onUploaded={async (url) => {

                    setFormData((prev) => ({ ...prev, avatarUrl: url }))

                    const res = await fetch("/api/profile/update", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        avatarUrl: url,
                      }),
                    })

                    if (!res.ok) {
                      const error = await res.json().catch(() => null)
                      toast.error(
                        error?.message ?? "Failed to update avatar URL"
                      )
                      return
                    }

                    toast.success("Avatar updated")
                    router.refresh()
                  }}
                />
              </div>
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium">Address</label>
            <div className="mt-2 space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={selectedAddress?.fullAddress ?? ""}
                  readOnly
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  placeholder="Type to search and select address"
                />
                <button
                  type="button"
                  onClick={() => setLocationModalOpen(true)}
                  className="rounded-xl border border-border bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
                >
                  Select
                </button>
              </div>

              {selectedAddress?.name ? (
                <p className="text-xs text-muted-foreground">
                  Selected: {selectedAddress.name}
                  {selectedAddress.state ? `, ${selectedAddress.state}` : ""},{" "}
                  {selectedAddress.country}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="120"
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                placeholder="Age"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Sex</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex rounded-xl border border-border bg-primary px-6 py-2 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>

      {/* Profile Address Search Modal */}
      {locationModalOpen ? (
        <ProfileAddressSearchModal
          isOpen={locationModalOpen}
          onClose={() => setLocationModalOpen(false)}
          onSelectSingleLocation={(location) => {
            setSelectedAddress(location)
            setLocationModalOpen(false)
          }}
        />
      ) : null}

      {/* Password Management */}
      <section className="rounded-3xl border border-border bg-card p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Security</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {profile?.hasPassword
                ? "Update your password"
                : "Add a password to your account"}
            </p>
          </div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="inline-flex rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            {showPasswordForm
              ? "Cancel"
              : profile?.hasPassword
                ? "Change Password"
                : "Add Password"}
          </button>
        </div>

        {showPasswordForm && (
          <form
            onSubmit={handlePasswordChange}
            className="mt-6 space-y-4 border-t border-border pt-6"
          >
            {profile?.hasPassword && (
              <div>
                <label className="block text-sm font-medium">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  placeholder="Current password"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                placeholder="New password (min 8 characters)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                placeholder="Confirm password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 inline-flex rounded-xl border border-border bg-primary px-6 py-2 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </section>
    </div>
  )
}
