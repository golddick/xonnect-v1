"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Settings,
  User,
  Shield,
  CreditCard,
  Eye,
  EyeOff,
  Upload,
  Save,
  Trash2,
  Zap,
  Menu,
  X,
  BarChart3,
  Video,
  Play,
  Users,
  DollarSign,
  Calendar,
  Banknote,
  Mail,
  Loader2,
  AlertCircle,
  Key,
  Bell,
} from "lucide-react"
import LoadingSplash from "@/components/splash_screen/loading-splash"
import { ThemeToggle } from "@/components/theme-toggle"
import { sidebarItems } from "@/lib/constant"
import { dropid } from "dropid"

export default function CreatorSettings() {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const [showAddAccount, setShowAddAccount] = useState(false)
  const [showOtpVerification, setShowOtpVerification] = useState(false)
  const [verifyingAccount, setVerifyingAccount] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)
  const [otpError, setOtpError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const avatarInputRef = useRef<HTMLInputElement | null>(null)
  const [userEmail, setUserEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPrivacy, setSavingPrivacy] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null)
  const [pendingAccountId, setPendingAccountId] = useState<string | null>(null)

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    creatorName: "",
    bio: "",
    website: "",
    location: "",
    avatarUrl: "",
    socialHandles: [] as Array<{ network: string; handle: string }>,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showLocation: true,
    allowMessages: true,
    showOnlineStatus: true,
  })

  // Payout Accounts State
  const [payoutAccounts, setPayoutAccounts] = useState<Array<{
    id: string
    bankName: string
    accountNumber: string
    accountName: string
    accountType: string
    isPrimary: boolean
    verified?: boolean
  }>>([])

  const [newAccount, setNewAccount] = useState({
    bankName: '',
    accountNumber: '',
    accountName: '',
    accountType: '',
    isPrimary: false
  })

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpTimer, setOtpTimer] = useState(300)
  const [resendCooldown, setResendCooldown] = useState(0)

  // Password reset state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleAvatarSelect = async (file: File | null) => {
    if (!file) return
    setIsUploadingAvatar(true)
    setNotificationMessage(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/creator/settings/avatar", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json().catch(() => null)
        throw new Error(error?.message || "Failed to upload avatar")
      }

      const payload = await response.json()
      const url = payload?.url ?? payload?.fileUrl
      if (!url) {
        throw new Error("Avatar upload did not return a URL")
      }

      setProfileData((prev) => ({ ...prev, avatarUrl: url }))
      setNotificationMessage("Avatar uploaded successfully")
    } catch (error) {
      setNotificationMessage(error instanceof Error ? error.message : "Failed to upload avatar")
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  const triggerAvatarUpload = () => {
    avatarInputRef.current?.click()
  }

  const loadSettings = async () => {
    setLoading(true)
    setNotificationMessage(null)

    try {
      const [profileRes, privacyRes, payoutRes] = await Promise.all([
        fetch("/api/creator/settings/profile", { cache: "no-store" }),
        fetch("/api/creator/settings/privacy", { cache: "no-store" }),
        fetch("/api/creator/settings/payout-accounts", { cache: "no-store" }),
      ])

      if (!profileRes.ok || !privacyRes.ok || !payoutRes.ok) {
        throw new Error("Failed to load settings")
      }

      const profilePayload = await profileRes.json()
      const privacyPayload = await privacyRes.json()
      const payoutPayload = await payoutRes.json()

      setProfileData((prev) => ({
        ...prev,
        firstName: profilePayload.profile?.firstName ?? prev.firstName,
        lastName: profilePayload.profile?.lastName ?? prev.lastName,
        email: profilePayload.profile?.email ?? prev.email,
        creatorName: profilePayload.profile?.creatorName ?? prev.creatorName,
        bio: profilePayload.profile?.bio ?? prev.bio,
        website: profilePayload.profile?.website ?? prev.website,
        location: profilePayload.profile?.location ?? prev.location,
        avatarUrl: profilePayload.profile?.avatarUrl ?? prev.avatarUrl,
        socialHandles: Array.isArray(profilePayload.profile?.socialHandles)
          ? profilePayload.profile.socialHandles
          : [],
      }))
      setUserEmail(profilePayload.profile?.email ?? "")

      setPrivacySettings({
        profileVisibility: privacyPayload.privacy?.profileVisibility ?? "public",
        showEmail: privacyPayload.privacy?.showEmail ?? false,
        showLocation: privacyPayload.privacy?.showLocation ?? true,
        allowMessages: privacyPayload.privacy?.allowMessages ?? true,
        showOnlineStatus: privacyPayload.privacy?.showOnlineStatus ?? true,
      })

      setPayoutAccounts(payoutPayload.payoutAccounts ?? [])
    } catch (error) {
      console.error("Load creator settings error:", error)
      setNotificationMessage("Unable to load creator settings. Please refresh.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  const addSocialHandle = () => {
    setProfileData((prev) => ({
      ...prev,
      socialHandles: [...prev.socialHandles, { network: "", handle: "" }],
    }))
  }

  const updateSocialHandle = (
    index: number,
    key: "network" | "handle",
    value: string
  ) => {
    setProfileData((prev) => {
      const nextHandles = [...prev.socialHandles]
      nextHandles[index] = { ...nextHandles[index], [key]: value }
      return { ...prev, socialHandles: nextHandles }
    })
  }

  const removeSocialHandle = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      socialHandles: prev.socialHandles.filter((_, i) => i !== index),
    }))
  }

  const handleSaveProfile = async () => {
    setSavingProfile(true)
    setNotificationMessage(null)

    try {
      const response = await fetch("/api/creator/settings/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          creatorName: profileData.creatorName,
          bio: profileData.bio,
          website: profileData.website,
          location: profileData.location,
          avatarUrl: profileData.avatarUrl,
          socialHandles: profileData.socialHandles,
        }),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => null)
        throw new Error(error?.message || "Failed to save profile")
      }

      setNotificationMessage("Profile updated successfully")
    } catch (error) {
      setNotificationMessage(error instanceof Error ? error.message : "Failed to save profile")
    } finally {
      setSavingProfile(false)
    }
  }

  const handleSavePrivacy = async () => {
    setSavingPrivacy(true)
    setNotificationMessage(null)

    try {
      const response = await fetch("/api/creator/settings/privacy", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileVisibility: privacySettings.profileVisibility,
          showEmail: privacySettings.showEmail,
          showLocation: privacySettings.showLocation,
          allowMessages: privacySettings.allowMessages,
          showOnlineStatus: privacySettings.showOnlineStatus,
        }),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => null)
        throw new Error(error?.message || "Failed to save privacy settings")
      }

      setNotificationMessage("Privacy settings saved")
    } catch (error) {
      setNotificationMessage(error instanceof Error ? error.message : "Failed to save privacy settings")
    } finally {
      setSavingPrivacy(false)
    }
  }

  const resolveAccountName = async (bankName: string, accountNumber: string) => {
    setVerifyingAccount(true)
    setOtpError("")

    try {
      const response = await fetch("/api/creator/settings/payout-accounts/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bankName, accountNumber }),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => null)
        throw new Error(error?.message || "Unable to resolve account name")
      }

      const payload = await response.json()
      setNewAccount((prev) => ({ ...prev, accountName: payload.accountName ?? "" }))
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : "Unable to resolve account name")
      setNewAccount((prev) => ({ ...prev, accountName: "" }))
    } finally {
      setVerifyingAccount(false)
    }
  }

  const handleVerifyAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setVerifyingAccount(true)
    setOtpError("")
    setNotificationMessage(null)

    if (!newAccount.bankName || !newAccount.accountNumber || !newAccount.accountType) {
      setOtpError("Bank name, account number, and account type are required.")
      setVerifyingAccount(false)
      return
    }

    try {
      const createResponse = await fetch("/api/creator/settings/payout-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bankName: newAccount.bankName,
          accountNumber: newAccount.accountNumber,
          accountName: newAccount.accountName,
          accountType: newAccount.accountType,
          isPrimary: newAccount.isPrimary,
        }),
      })

      if (!createResponse.ok) {
        const error = await createResponse.json().catch(() => null)
        throw new Error(error?.message || "Unable to create payout account")
      }

      const created = await createResponse.json()
      const accountId = created.payoutAccount?.id ?? null
      setPendingAccountId(accountId)
      if (created.payoutAccount) {
        setPayoutAccounts((prev) => {
          const updated = created.payoutAccount.isPrimary
            ? prev.map((acc) => ({ ...acc, isPrimary: false }))
            : prev
          return [...updated, created.payoutAccount]
        })
      }
      setShowOtpVerification(true)

      const otpResponse = await fetch("/api/creator/settings/payout-accounts/send-otp", {
        method: "POST",
      })

      if (!otpResponse.ok) {
        const error = await otpResponse.json().catch(() => null)
        throw new Error(error?.message || "Unable to send OTP")
      }

      setOtpTimer(300)
      setResendCooldown(60)
      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      const cooldownTimer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(cooldownTimer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : "Failed to start account verification")
    } finally {
      setVerifyingAccount(false)
    }
  }


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePrivacyChange = (setting: string, value: any) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  const resetForm = () => {
    setNewAccount({
      bankName: '',
      accountNumber: '',
      accountName: '',
      accountType: '',
      isPrimary: false
    })
    setOtp(['', '', '', '', '', ''])
    setOtpTimer(300)
    setResendCooldown(0)
    setOtpError('')
    setVerifyingAccount(false)
    setVerifyingOtp(false)
    setPendingAccountId(null)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const verifyOtpAndAddAccount = async () => {
    setVerifyingOtp(true)
    setOtpError('')

    try {
      if (!pendingAccountId) {
        throw new Error('No pending payout account to verify.')
      }

      const code = otp.join('')
      if (code.length !== 6) {
        throw new Error('Enter the 6-digit OTP code.')
      }

      const response = await fetch('/api/creator/settings/payout-accounts/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId: pendingAccountId, code }),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => null)
        throw new Error(error?.message || 'Invalid OTP. Please try again.')
      }

      setPayoutAccounts((prev) =>
        prev.map((acc) =>
          acc.id === pendingAccountId ? { ...acc, verified: true } : acc
        )
      )

      setNotificationMessage('Payout account verified and ready for payout')
      setShowAddAccount(false)
      setShowOtpVerification(false)
      resetForm()
      setPendingAccountId(null)
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : 'Error verifying OTP. Please try again.')
    } finally {
      setVerifyingOtp(false)
    }
  }

  const resendOtp = async () => {
    if (resendCooldown > 0) return

    try {
      const response = await fetch('/api/creator/settings/payout-accounts/send-otp', {
        method: 'POST',
      })

      if (!response.ok) {
        const error = await response.json().catch(() => null)
        throw new Error(error?.message || 'Unable to resend OTP')
      }

      setOtp(['', '', '', '', '', ''])
      setOtpTimer(300)
      setResendCooldown(60)
      setOtpError('')

      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      const resendTimer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(resendTimer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : 'Error resending OTP. Please try again.')
    }
  }

  const handleSetPrimary = (accountId: string) => {
    setPayoutAccounts(prev => 
      prev.map(account => ({
        ...account,
        isPrimary: account.id === accountId
      }))
    )
  }

  const handleRemoveAccount = async (accountId: string) => {
    setNotificationMessage(null)
    try {
      const response = await fetch(`/api/creator/settings/payout-accounts/${accountId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json().catch(() => null)
        throw new Error(error?.message || 'Failed to remove payout account')
      }

      // Remove locally to keep UI responsive. Backend will handle primary reassignment.
      setPayoutAccounts((prev) => prev.filter((acc) => acc.id !== accountId))
      setNotificationMessage('Payout account removed')
    } catch (error) {
      setNotificationMessage(error instanceof Error ? error.message : 'Failed to remove payout account')
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long')
      return
    }

    try {
      const response = await fetch('/api/profile/update-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          password: passwordData.newPassword,
        }),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => null)
        throw new Error(error?.message || 'Failed to update password')
      }

      setPasswordSuccess('Password updated successfully!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setTimeout(() => {
        setShowPasswordReset(false)
        setPasswordSuccess('')
      }, 3000)
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : 'Failed to update password. Please try again.')
    }
  }

  // OTP timer effect
  useEffect(() => {
    if (otpTimer <= 0) {
      setOtpError('OTP has expired. Please request a new one.')
    }
  }, [otpTimer])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">Xonnect</span>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => router.push(item.route)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    pathname === item.route
                      ? "bg-red-600/20 text-red-400 border border-red-600/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full">
        {/* Header */}
        <div className="border-b border-border bg-transparent backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Settings
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors">
                <Bell className="w-5 h-5 text-foreground" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Settings Navigation */}
            <div className="bg-card border-none rounded-2xl p-6 mb-8">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "profile", label: "Profile", icon: User },
                  { id: "privacy", label: "Privacy", icon: Shield },
                  { id: "billing", label: "Billing", icon: CreditCard },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-red-600 text-white"
                        : "bg-black text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-red-400" />
                  <h2 className="text-xl font-bold text-foreground">Profile Settings</h2>
                </div>

                {/* Profile Picture */}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-red-600 flex items-center justify-center">
                    {profileData.avatarUrl ? (
                      <img src={profileData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-bold text-2xl">J</span>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={triggerAvatarUpload}
                      className="bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors flex items-center gap-2 mb-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload New Photo
                    </button>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0] ?? null
                        void handleAvatarSelect(file)
                      }}
                    />
                    <p className="text-muted-foreground text-sm">JPG, PNG up to 10MB</p>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Creator Name</label>
                  <input
                    type="text"
                    name="creatorName"
                    value={profileData.creatorName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={profileData.website}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Social Handles</label>
                      <p className="text-muted-foreground text-sm">Add your social network handles or profile URLs.</p>
                    </div>
                    <button
                      type="button"
                      onClick={addSocialHandle}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      + Add Handle
                    </button>
                  </div>

                  {profileData.socialHandles.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Network</label>
                        <input
                          type="text"
                          value={item.network}
                          onChange={(e) => updateSocialHandle(index, "network", e.target.value)}
                          className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                          placeholder="Instagram, Twitter, TikTok"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Handle / URL</label>
                        <input
                          type="text"
                          value={item.handle}
                          onChange={(e) => updateSocialHandle(index, "handle", e.target.value)}
                          className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                          placeholder="@yourhandle or https://..."
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSocialHandle(index)}
                        className="text-red-500 hover:text-red-400 text-sm self-start"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Password Change Button */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Password</h3>
                    <button
                      onClick={() => setShowPasswordReset(!showPasswordReset)}
                      className="bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors flex items-center gap-2 border border-border"
                    >
                      <Key className="w-4 h-4" />
                      {showPasswordReset ? 'Cancel Password Reset' : 'Change Password'}
                    </button>
                  </div>

                  {/* Password Reset Form */}
                  {showPasswordReset && (
                    <div className="bg-transparent hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-xl p-6 border border-border mt-4">
                      <h4 className="text-lg font-semibold text-foreground mb-4">Change Password</h4>
                      
                      {passwordSuccess && (
                        <div className="bg-green-600/10 border border-green-600/30 rounded-xl p-4 mb-4">
                          <p className="text-green-400 text-sm">{passwordSuccess}</p>
                        </div>
                      )}

                      {passwordError && (
                        <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4 mb-4">
                          <p className="text-red-400 text-sm">{passwordError}</p>
                        </div>
                      )}

                      <form onSubmit={handlePasswordReset} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground mb-2">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className="w-full bg-transparent border border-border rounded-xl px-4 py-3 pr-12 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-muted-foreground mb-2">New Password</label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full bg-transparent border border-border rounded-xl px-4 py-3 pr-12 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-muted-foreground mb-2">Confirm New Password</label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              className="w-full bg-transparent border border-border rounded-xl px-4 py-3 pr-12 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            type="submit"
                            disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                            className="bg-red-600 hover:bg-red-700 disabled:bg-muted disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors flex-1"
                          >
                            Update Password
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={loadSettings}
                    className="bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-lg transition-colors border border-border"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={savingProfile}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-muted disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                  >
                    {savingProfile ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-5 h-5 text-red-400" />
                  <h2 className="text-xl font-bold text-foreground">Privacy Settings</h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-card rounded-xl p-4">
                    <h4 className="font-medium text-foreground mb-2">Profile Visibility</h4>
                    <p className="text-muted-foreground text-sm mb-4">Control who can see your profile</p>
                    <div className="space-y-2">
                      {[
                        { value: "public", label: "Public - Anyone can see your profile" },
                        { value: "followers", label: "Followers Only - Only your followers can see your profile" },
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="profileVisibility"
                            value={option.value}
                            checked={privacySettings.profileVisibility === option.value}
                            onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                            className="w-4 h-4 text-red-600 bg-muted border-border focus:ring-red-500"
                          />
                          <span className="text-muted-foreground">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        key: "allowMessages",
                        label: "Allow Direct Messages",
                        desc: "Let followers send you direct messages",
                      },
                    ].map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between bg-card rounded-xl p-4"
                      >
                        <div>
                          <h4 className="font-medium text-foreground">{setting.label}</h4>
                          <p className="text-muted-foreground text-sm">{setting.desc}</p>
                        </div>
                        <button
                          onClick={() =>
                            handlePrivacyChange(
                              setting.key,
                              !privacySettings[setting.key as keyof typeof privacySettings],
                            )
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacySettings[setting.key as keyof typeof privacySettings] ? "bg-red-600" : "bg-gray-600"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              privacySettings[setting.key as keyof typeof privacySettings]
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={handleSavePrivacy}
                    disabled={savingPrivacy}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-muted disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                  >
                    {savingPrivacy ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Privacy Settings
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Billing Settings */}
            {activeTab === "billing" && (
              <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-red-400" />
                  <h2 className="text-xl font-bold text-foreground"> Accounts</h2>
                </div>

                <div className="space-y-6">

                  {/* Payout Accounts Management */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Payout Accounts</h3>
                      <button 
                        onClick={() => setShowAddAccount(true)}
                        className="text-sm bg-red-600 hover:bg-red-700 text-foreground px-4 py-2 rounded-lg transition-colors"
                      >
                        + Add Account
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Primary Payout Account */}
                      {payoutAccounts.find(acc => acc.isPrimary) && (
                        <div className="bg-card border border-ed-600/30 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-sm text-muted-foreground">Primary Payout Account</span>
                            </div>
                            <span className="text-xs text-red-400 px-2 py-1 bg-red-600/20 rounded">ACTIVE</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center border border-green-600/30">
                                <Banknote className="w-6 h-6 text-green-400" />
                              </div>
                              <div>
                                <p className="text-foreground font-medium">{payoutAccounts.find(acc => acc.isPrimary)?.bankName}</p>
                                <p className="text-muted-foreground">••••••••{payoutAccounts.find(acc => acc.isPrimary)?.accountNumber.slice(-4)}</p>
                                <p className="text-muted-foreground text-sm">{payoutAccounts.find(acc => acc.isPrimary)?.accountName}</p>
                                <p className="text-muted-foreground text-xs mt-1">
                                  {payoutAccounts.find(acc => acc.isPrimary)?.verified ? "Verified Account" : "Pending Verification"}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  const primaryId = payoutAccounts.find(acc => acc.isPrimary)?.id
                                  if (primaryId) handleRemoveAccount(primaryId)
                                }}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Other Accounts */}
                      {payoutAccounts.filter(acc => !acc.isPrimary).map((account) => (
                        <div key={account.id} className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center border border-border">
                              <Banknote className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-foreground font-medium">{account.bankName}</p>
                              <p className="text-muted-foreground">••••••••{account.accountNumber.slice(-4)}</p>
                              <p className="text-muted-foreground text-sm">{account.accountName}</p>
                              <p className="text-muted-foreground text-xs mt-1">
                                {account.verified ? "Verified Account" : "Pending Verification"}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleSetPrimary(account.id)}
                              className="text-sm text-muted-foreground hover:text-foreground border border-gray-600 hover:border-gray-500 px-3 py-1 rounded-lg transition-colors"
                            >
                              Set Primary
                            </button>
                            <button 
                              onClick={() => handleRemoveAccount(account.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* No Accounts Message */}
                      {payoutAccounts.length === 0 && (
                        <div className="bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-xl p-8 text-center">
                          <Banknote className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                          <p className="text-muted-foreground mb-4">No payout accounts added yet</p>
                          <p className="text-gray-500 text-sm mb-6">Add a bank account to receive payments from your earnings</p>
                          <button 
                            onClick={() => setShowAddAccount(true)}
                            className="bg-red-600 hover:bg-red-700 text-foreground px-6 py-2 rounded-lg transition-colors"
                          >
                            Add Your First Account
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add Account Form */}
                  {showAddAccount && (
                    <div className="bg-card rounded-xl p-6 border border-border">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-semibold text-foreground">
                          {showOtpVerification ? "Verify OTP" : "Add Payout Account"}
                        </h4>
                        <button 
                          onClick={() => {
                            setShowAddAccount(false)
                            setShowOtpVerification(false)
                            resetForm()
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {!showOtpVerification ? (
                        <form onSubmit={handleVerifyAccount} className="space-y-4">
                          <div>
                            <label className="block text-muted-foreground text-sm mb-2">Bank Name</label>
                            <select 
                              value={newAccount.bankName}
                              onChange={(e) => {
                                const value = e.target.value
                                const currentAccountNumber = newAccount.accountNumber
                                setNewAccount((prev) => ({ ...prev, bankName: value }))
                                if (value && currentAccountNumber && currentAccountNumber.length === 10) {
                                  void resolveAccountName(value, currentAccountNumber)
                                }
                              }}
                              className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-red-500"
                              required
                            >
                              <option className=" bg-background  px-4 py-3 text-foreground " value="">Select Bank</option>
                              <option className=" bg-background  px-4 py-3 text-foreground "  value="Access Bank">Access Bank</option>
                              <option className=" bg-background  px-4 py-3 text-foreground "  value="UBA">United Bank for Africa (UBA)</option>
                              <option className=" bg-background  px-4 py-3 text-foreground "  value="Zenith Bank">Zenith Bank</option>
                              <option className=" bg-background  px-4 py-3 text-foreground "  value="First Bank">First Bank</option>
                              <option className=" bg-background  px-4 py-3 text-foreground "  value="OPAY">OPay</option>
                              <option className=" bg-background  px-4 py-3 text-foreground "  value="GTBank">GTBank</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-muted-foreground text-sm mb-2">Account Number</label>
                            <input 
                              type="text"
                              maxLength={10}
                              value={newAccount.accountNumber}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '')
                                const bankName = newAccount.bankName
                                setNewAccount((prev) => ({ ...prev, accountNumber: value }))
                                if (value.length === 10 && bankName) {
                                  void resolveAccountName(bankName, value)
                                }
                              }}
                              placeholder="0000000000"
                              className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-red-500"
                              required
                            />
                            <p className="text-muted-foreground text-xs mt-2">10-digit account number</p>
                          </div>

                          <div>
                            <label className="block text-muted-foreground text-sm mb-2">Account Name</label>
                            <input 
                              type="text"
                              value={newAccount.accountName}
                              readOnly
                              className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-muted-foreground"
                              placeholder="Will be auto-filled after resolving account number"
                              required
                            />
                            <p className="text-muted-foreground text-xs mt-2">
                              Account holder name will be filled automatically.
                            </p>
                            <label className="block text-muted-foreground text-sm mb-2">Account Type</label>
                            <select 
                              value={newAccount.accountType}
                              onChange={(e) => setNewAccount({...newAccount, accountType: e.target.value})}
                              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-red-500"
                              required
                            >
                              <option value="">Select Type</option>
                              <option value="Savings">Savings Account</option>
                              <option value="Current">Current Account</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-3 pt-4 border-t border-border">
                            <input 
                              type="checkbox"
                              id="setAsPrimary"
                              checked={newAccount.isPrimary}
                              onChange={(e) => setNewAccount({...newAccount, isPrimary: e.target.checked})}
                              className="rounded border-border bg-muted text-red-500 focus:ring-red-500"
                            />
                            <label htmlFor="setAsPrimary" className="text-muted-foreground text-sm">
                              Set as primary payout account
                            </label>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <button
                              type="submit"
                              disabled={!newAccount.bankName || !newAccount.accountNumber || !newAccount.accountType || !newAccount.accountName || verifyingAccount}
                              className="bg-red-600 hover:bg-red-700 disabled:bg-muted disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors flex-1"
                            >
                              {verifyingAccount ? (
                                <span className="flex items-center justify-center gap-2">
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Verifying...
                                </span>
                              ) : (
                                'Verify & Add Account'
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowAddAccount(false)
                                resetForm()
                              }}
                              className="bg-muted border border-border hover:bg-muted/80 text-foreground px-6 py-3 rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        /* OTP Verification Form */
                        <div className="space-y-6">
                          <div className="bg-card border border-border rounded-xl p-4">
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-red-400" />
                              <div>
                                <h4 className="text-foreground font-medium">OTP Sent to Your Email</h4>
                                <p className="text-muted-foreground text-sm">
                                  Enter the 6-digit code sent to {userEmail}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-muted-foreground text-sm mb-4 text-center">
                              Enter OTP Code
                            </label>
                            <div className="flex gap-3 justify-center mb-6">
                              {[0, 1, 2, 3, 4, 5].map((index) => (
                                <input
                                  key={index}
                                  id={`otp-input-${index}`}
                                  type="text"
                                  maxLength={1}
                                  value={otp[index] || ''}
                                  onChange={(e) => handleOtpChange(index, e.target.value)}
                                  className="w-12 h-12 bg-transparent border border-border rounded-lg text-center text-foreground text-xl focus:outline-none focus:border-red-500"
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === 'Backspace' &&
                                      !(e.target as HTMLInputElement).value &&
                                      index > 0
                                    ) {
                                      const prevInput = document.getElementById(`otp-input-${index - 1}`)
                                      if (prevInput) prevInput.focus()
                                    }
                                  }}
                                />
                              ))}
                            </div>

                            <div className="flex items-center justify-between mb-6">
                              <p className="text-muted-foreground text-sm">
                                OTP expires in <span className="text-yellow-500 font-medium">{otpTimer}s</span>
                              </p>
                              <button
                                type="button"
                                onClick={resendOtp}
                                disabled={resendCooldown > 0}
                                className="text-red-400 hover:text-red-300 text-sm disabled:text-muted-foreground"
                              >
                                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                              </button>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-border">
                              <button
                                onClick={verifyOtpAndAddAccount}
                                disabled={otp.join('').length !== 6 || verifyingOtp}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-muted disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors flex-1"
                              >
                                {verifyingOtp ? (
                                  <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Verifying...
                                  </span>
                                ) : (
                                  'Verify & Add Account'
                                )}
                              </button>
                              <button
                                onClick={() => setShowOtpVerification(false)}
                                className="bg-muted border border-border hover:bg-muted/80 text-foreground px-6 py-3 rounded-lg transition-colors"
                              >
                                Back
                              </button>
                            </div>
                          </div>

                          {otpError && (
                            <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4">
                              <p className="text-red-400 text-sm flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {otpError}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}






