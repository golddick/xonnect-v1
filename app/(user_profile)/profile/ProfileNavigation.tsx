"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { Play, Ticket, User } from "lucide-react"

export const PROFILE_NAVIGATION_ITEMS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "tickets", label: "Events", icon: Ticket },
  { id: "creators", label: "Following", icon: Play },
] as const

export type ProfileTab = (typeof PROFILE_NAVIGATION_ITEMS)[number]["id"]

const ProfileNavigationContext = createContext<{
  activeTab: ProfileTab
  setActiveTab: (tab: ProfileTab) => void
} | null>(null)

export function ProfileNavigationProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("profile")

  return (
    <ProfileNavigationContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ProfileNavigationContext.Provider>
  )
}

export function useProfileNavigation() {
  const context = useContext(ProfileNavigationContext)
  if (!context) {
    throw new Error("useProfileNavigation must be used within ProfileNavigationProvider")
  }
  return context
}
