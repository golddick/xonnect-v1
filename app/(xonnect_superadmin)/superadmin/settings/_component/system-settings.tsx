"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

import CompanyTab from "./CompanyTab"
import NotificationsTab from "./NotificationsTab"
import RevenueTab from "./RevenueTab"
import SecurityTab from "./SecurityTab"
import SettingsHeader from "./SettingsHeader"
import SettingsSidebar from "./SettingsSidebar"
import SystemTab from "./SystemTab"
import {
  companySettingKeys,
  defaultSuperAdminSettings,
  pickSectionSettings,
  revenueSettingKeys,
  type SuperAdminSettingsSection,
  type SuperAdminSettingsState,
} from "@/lib/superadmin-settings"

type PersistedSectionState = Record<SuperAdminSettingsSection, boolean>

type SettingsResponse = {
  settings?: {
    revenue?: Record<string, unknown> | null
    company?: Record<string, unknown> | null
  }
  records?: Array<{
    section: SuperAdminSettingsSection
  }>
  message?: string
}

const defaultPersistedSectionState: PersistedSectionState = {
  revenue: false,
  company: false,
}

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

const mergeSettings = (
  revenueSettings: Record<string, unknown> | null,
  companySettings: Record<string, unknown> | null
): SuperAdminSettingsState => {
  return {
    ...defaultSuperAdminSettings,
    ...(isPlainObject(revenueSettings) ? revenueSettings : {}),
    ...(isPlainObject(companySettings) ? companySettings : {}),
  } as SuperAdminSettingsState
}

export default function SystemSettings() {
  const [settings, setSettings] = useState<SuperAdminSettingsState>(defaultSuperAdminSettings)
  const [persistedSections, setPersistedSections] = useState<PersistedSectionState>(defaultPersistedSectionState)
  const [activeTab, setActiveTab] = useState("revenue")
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/superadmin/settings", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        const payload = (await response.json().catch(() => ({}))) as SettingsResponse

        if (!response.ok) {
          throw new Error(payload.message ?? "Failed to load settings")
        }

        setSettings(mergeSettings(payload.settings?.revenue ?? null, payload.settings?.company ?? null))
        setPersistedSections({
          revenue: Boolean(payload.settings?.revenue),
          company: Boolean(payload.settings?.company),
        })
      } catch (error) {
        console.error("Failed to load superadmin settings:", error)
        toast.error("Failed to load saved settings. Using defaults instead.")
        setSettings(defaultSuperAdminSettings)
        setPersistedSections(defaultPersistedSectionState)
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [])

  const handleReset = () => {
    setSettings(defaultSuperAdminSettings)
  }

  const updateSetting = (key: string, value: unknown) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const saveSection = async (section: SuperAdminSettingsSection) => {
    const isExistingRecord = persistedSections[section]
    const sectionData =
      section === "revenue"
        ? pickSectionSettings(settings, revenueSettingKeys)
        : pickSectionSettings(settings, companySettingKeys)

    setIsSaving(true)

    try {
      const response = await fetch("/api/superadmin/settings", {
        method: isExistingRecord ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section,
          data: sectionData,
        }),
      })

      const payload = (await response.json().catch(() => ({}))) as SettingsResponse

      if (!response.ok) {
        throw new Error(payload.message ?? "Failed to save settings")
      }

      setPersistedSections((prev) => ({
        ...prev,
        [section]: true,
      }))

      toast.success(
        isExistingRecord
          ? `${section === "revenue" ? "Revenue" : "Company"} settings updated`
          : `${section === "revenue" ? "Revenue" : "Company"} settings created`
      )
    } catch (error) {
      console.error("Failed to save settings:", error)
      toast.error(error instanceof Error ? error.message : "Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  const deleteSection = async (section: SuperAdminSettingsSection) => {
    if (!persistedSections[section]) {
      toast.info("Nothing saved for this section yet.")
      return
    }

    if (!window.confirm(`Delete the saved ${section} settings? This cannot be undone.`)) {
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch("/api/superadmin/settings", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ section }),
      })

      const payload = (await response.json().catch(() => ({}))) as SettingsResponse

      if (!response.ok) {
        throw new Error(payload.message ?? "Failed to delete settings")
      }

      const resetValues =
        section === "revenue"
          ? pickSectionSettings(defaultSuperAdminSettings, revenueSettingKeys)
          : pickSectionSettings(defaultSuperAdminSettings, companySettingKeys)

      setSettings((prev) => ({
        ...prev,
        ...resetValues,
      }))

      setPersistedSections((prev) => ({
        ...prev,
        [section]: false,
      }))

      toast.success(`${section === "revenue" ? "Revenue" : "Company"} settings deleted`)
    } catch (error) {
      console.error("Failed to delete settings:", error)
      toast.error(error instanceof Error ? error.message : "Failed to delete settings")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSave = async () => {
    if (activeTab === "revenue" || activeTab === "company") {
      await saveSection(activeTab)
      return
    }

    toast.info("Only revenue and company info are wired to the database right now.")
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "revenue":
        return (
          <RevenueTab
            settings={settings}
            updateSetting={updateSetting}
            onSave={saveSection}
            onDelete={deleteSection}
            hasRecord={persistedSections.revenue}
            isSaving={isSaving}
            isDeleting={isDeleting}
            isLoading={isLoading}
          />
        )
      case "company":
        return (
          <CompanyTab
            settings={settings}
            updateSetting={updateSetting}
            onSave={saveSection}
            onDelete={deleteSection}
            hasRecord={persistedSections.company}
            isSaving={isSaving}
            isDeleting={isDeleting}
            isLoading={isLoading}
          />
        )
      case "system":
        return <SystemTab settings={settings} updateSetting={updateSetting} onSave={handleSave} />
      case "notifications":
        return <NotificationsTab settings={settings} updateSetting={updateSetting} onSave={handleSave} />
      case "security":
        return <SecurityTab settings={settings} updateSetting={updateSetting} onSave={handleSave} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <div className="flex-1 w-full">
          <SettingsHeader onSave={handleSave} onReset={handleReset} isSaving={isSaving || isLoading} />

          <div className="flex">
            <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 p-8">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
