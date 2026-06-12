"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Settings, Shield, ImageIcon, UserCheck, Save, X, Upload, Palette, Globe, Lock } from "lucide-react"

interface CommunitySetupProps {
  onClose?: () => void
  onSave?: (communityData: any) => void
  existingCommunity?: any
}

export default function CommunitySetup({ onClose, onSave, existingCommunity }: CommunitySetupProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("general")
  const [communityData, setCommunityData] = useState({
    name: existingCommunity?.name || "",
    description: existingCommunity?.description || "",
    category: existingCommunity?.category || "music",
    isPrivate: existingCommunity?.isPrivate || false,
    requireApproval: existingCommunity?.requireApproval || false,
    allowUserPosts: existingCommunity?.allowUserPosts || true,
    allowImages: existingCommunity?.allowImages || true,
    allowVideos: existingCommunity?.allowVideos || true,
    allowEvents: existingCommunity?.allowEvents || false,
    moderationLevel: existingCommunity?.moderationLevel || "medium",
    welcomeMessage: existingCommunity?.welcomeMessage || "",
    rules: existingCommunity?.rules || ["Be respectful to all members", "No spam or self-promotion", "Stay on topic"],
    coverImage: null as File | null,
    profileImage: null as File | null,
    primaryColor: existingCommunity?.primaryColor || "#dc2626",
    secondaryColor: existingCommunity?.secondaryColor || "#fbbf24",
  })

  const [newRule, setNewRule] = useState("")
  const [coverPreview, setCoverPreview] = useState<string | null>(existingCommunity?.coverImage || null)
  const [profilePreview, setProfilePreview] = useState<string | null>(existingCommunity?.profileImage || null)

  const categories = [
    "music",
    "gaming",
    "education",
    "entertainment",
    "technology",
    "lifestyle",
    "sports",
    "art",
    "cooking",
    "fitness",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setCommunityData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "cover" | "profile") => {
    const file = e.target.files?.[0]
    if (file) {
      setCommunityData((prev) => ({
        ...prev,
        [type === "cover" ? "coverImage" : "profileImage"]: file,
      }))

      const reader = new FileReader()
      reader.onload = (e) => {
        if (type === "cover") {
          setCoverPreview(e.target?.result as string)
        } else {
          setProfilePreview(e.target?.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const addRule = () => {
    if (newRule.trim() && !communityData.rules.includes(newRule.trim())) {
      setCommunityData((prev) => ({
        ...prev,
        rules: [...prev.rules, newRule.trim()],
      }))
      setNewRule("")
    }
  }

  const removeRule = (ruleToRemove: string) => {
    setCommunityData((prev) => ({
      ...prev,
      rules: prev.rules.filter((rule) => rule !== ruleToRemove),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave?.(communityData)
    onClose?.()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
              {existingCommunity ? "Edit Community" : "Create Community"}
            </h2>
            <p className="text-gray-400 text-sm">Build and manage your community space</p>
          </div>
          <button onClick={onClose} className="bg-gray-800 hover:bg-gray-700 rounded-lg p-2 transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: "general", label: "General", icon: Settings },
              { id: "permissions", label: "Permissions", icon: Shield },
              { id: "moderation", label: "Moderation", icon: UserCheck },
              { id: "appearance", label: "Appearance", icon: Palette },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Community Name *</label>
                <input
                  type="text"
                  name="name"
                  value={communityData.name}
                  onChange={handleInputChange}
                  placeholder="Enter community name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={communityData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your community..."
                  rows={4}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                <select
                  name="category"
                  value={communityData.category}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-gray-800">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Welcome Message</label>
                <textarea
                  name="welcomeMessage"
                  value={communityData.welcomeMessage}
                  onChange={handleInputChange}
                  placeholder="Welcome new members with a message..."
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Privacy Settings</h3>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    name="isPrivate"
                    checked={communityData.isPrivate}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-600"
                  />
                  <label htmlFor="isPrivate" className="text-gray-300 flex items-center gap-2">
                    {communityData.isPrivate ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                    Private Community
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="requireApproval"
                    name="requireApproval"
                    checked={communityData.requireApproval}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-600"
                  />
                  <label htmlFor="requireApproval" className="text-gray-300">
                    Require approval to join
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Permissions Tab */}
          {activeTab === "permissions" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                Member Permissions
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Allow User Posts</h4>
                      <p className="text-gray-400 text-sm">Let members create their own posts</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCommunityData((prev) => ({ ...prev, allowUserPosts: !prev.allowUserPosts }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        communityData.allowUserPosts ? "bg-red-600" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          communityData.allowUserPosts ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Allow Images</h4>
                      <p className="text-gray-400 text-sm">Members can upload and share images</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCommunityData((prev) => ({ ...prev, allowImages: !prev.allowImages }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        communityData.allowImages ? "bg-red-600" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          communityData.allowImages ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Allow Videos</h4>
                      <p className="text-gray-400 text-sm">Members can upload and share videos</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCommunityData((prev) => ({ ...prev, allowVideos: !prev.allowVideos }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        communityData.allowVideos ? "bg-red-600" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          communityData.allowVideos ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Allow Events</h4>
                      <p className="text-gray-400 text-sm">Members can create and share events</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCommunityData((prev) => ({ ...prev, allowEvents: !prev.allowEvents }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        communityData.allowEvents ? "bg-red-600" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          communityData.allowEvents ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Moderation Tab */}
          {activeTab === "moderation" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-red-400" />
                Moderation Settings
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Moderation Level</label>
                <select
                  name="moderationLevel"
                  value={communityData.moderationLevel}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option value="low" className="bg-gray-800">
                    Low - Minimal moderation
                  </option>
                  <option value="medium" className="bg-gray-800">
                    Medium - Balanced moderation
                  </option>
                  <option value="high" className="bg-gray-800">
                    High - Strict moderation
                  </option>
                </select>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Community Rules</h4>

                <div className="space-y-3 mb-4">
                  {communityData.rules.map((rule, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-gray-800/50 border border-gray-700 rounded-xl p-3"
                    >
                      <span className="text-gray-300 flex-1">
                        {index + 1}. {rule}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeRule(rule)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newRule}
                    onChange={(e) => setNewRule(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRule())}
                    placeholder="Add a new rule"
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addRule}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-red-400" />
                Community Appearance
              </h3>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image</label>
                <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-gray-600 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "cover")}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label htmlFor="cover-upload" className="cursor-pointer">
                    {coverPreview ? (
                      <img
                        src={coverPreview || "/placeholder.svg"}
                        alt="Cover preview"
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    )}
                    <p className="text-gray-400 text-sm">Upload cover image</p>
                    <p className="text-gray-500 text-xs mt-1">PNG, JPG up to 5MB (1200x300 recommended)</p>
                  </label>
                </div>
              </div>

              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 border-2 border-dashed border-gray-700 rounded-full flex items-center justify-center hover:border-gray-600 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "profile")}
                      className="hidden"
                      id="profile-upload"
                    />
                    <label htmlFor="profile-upload" className="cursor-pointer">
                      {profilePreview ? (
                        <img
                          src={profilePreview || "/placeholder.svg"}
                          alt="Profile preview"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <Upload className="w-6 h-6 text-gray-400" />
                      )}
                    </label>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Upload profile image</p>
                    <p className="text-gray-500 text-xs">PNG, JPG up to 2MB (400x400 recommended)</p>
                  </div>
                </div>
              </div>

              {/* Color Scheme */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="primaryColor"
                      value={communityData.primaryColor}
                      onChange={handleInputChange}
                      className="w-12 h-12 rounded-lg border border-gray-700 bg-gray-800"
                    />
                    <input
                      type="text"
                      name="primaryColor"
                      value={communityData.primaryColor}
                      onChange={handleInputChange}
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="secondaryColor"
                      value={communityData.secondaryColor}
                      onChange={handleInputChange}
                      className="w-12 h-12 rounded-lg border border-gray-700 bg-gray-800"
                    />
                    <input
                      type="text"
                      name="secondaryColor"
                      value={communityData.secondaryColor}
                      onChange={handleInputChange}
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {existingCommunity ? "Update Community" : "Create Community"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
