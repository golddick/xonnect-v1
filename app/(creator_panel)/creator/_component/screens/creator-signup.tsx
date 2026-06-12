"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Upload, Check, Star, Zap, Users, DollarSign } from "lucide-react"

export default function CreatorSignup() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Step 2: Creator Profile
    creatorName: "",
    category: "",
    bio: "",
    profileImage: null as File | null,
    // Step 3: Verification
    phoneNumber: "",
    country: "",
    agreeToTerms: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        profileImage: e.target.files![0],
      }))
    }
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    router.push("/creator/dashboard")
  }

  const categories = [
    "Music",
    "Gaming",
    "Education",
    "Entertainment",
    "Sports",
    "Technology",
    "Lifestyle",
    "Business",
    "Art & Design",
    "Comedy",
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-muted/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Xonnect</span>
            </div>
            <div className="text-sm text-muted-foreground">Step {step} of 3</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center ${step >= 1 ? "text-red-500" : "text-muted-foreground"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step >= 1 ? "bg-red-600" : "bg-muted"}`}
              >
                {step > 1 ? <Check className="w-5 h-5" /> : "1"}
              </div>
              <span className="ml-2 text-sm font-medium">Basic Info</span>
            </div>
            <div className={`flex items-center ${step >= 2 ? "text-red-500" : "text-muted-foreground"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step >= 2 ? "bg-red-600" : "bg-muted"}`}
              >
                {step > 2 ? <Check className="w-5 h-5" /> : "2"}
              </div>
              <span className="ml-2 text-sm font-medium">Creator Profile</span>
            </div>
            <div className={`flex items-center ${step >= 3 ? "text-red-500" : "text-muted-foreground"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step >= 3 ? "bg-red-600" : "bg-muted"}`}
              >
                {step > 3 ? <Check className="w-5 h-5" /> : "3"}
              </div>
              <span className="ml-2 text-sm font-medium">Verification</span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Welcome to Xonnect
                </h2>
                <p className="text-muted-foreground">Let's start with your basic information</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Enter your first name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-muted border border-border rounded-xl px-4 py-3 pr-12 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="Create a password"
                      required
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
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full bg-muted border border-border rounded-xl px-4 py-3 pr-12 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="Confirm your password"
                      required
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
              </div>
            </div>
          )}

          {/* Step 2: Creator Profile */}
          {step === 2 && (
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Create Your Creator Profile
                </h2>
                <p className="text-muted-foreground">Tell us about your content and brand</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Creator Name</label>
                  <input
                    type="text"
                    name="creatorName"
                    value={formData.creatorName}
                    onChange={handleInputChange}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Your brand or creator name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                  >
                    <option value="">Select your primary category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                    placeholder="Tell your audience about yourself and your content..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Profile Image</label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-red-600 transition-colors bg-muted/30">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="profile-image"
                    />
                    <label htmlFor="profile-image" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Click to upload your profile image</p>
                      <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                      {formData.profileImage && <p className="text-green-500 mt-2">✓ {formData.profileImage.name}</p>}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Verification */}
          {step === 3 && (
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Final Step
                </h2>
                <p className="text-muted-foreground">Complete your verification to start creating</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                  >
                    <option value="">Select your country</option>
                    <option value="US">United States</option>
                    <option value="NG">Nigeria</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>

                <div className="bg-muted/50 rounded-xl p-6 border border-border">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-red-600 bg-muted border-border rounded focus:ring-red-500"
                      required
                    />
                    <div className="text-sm text-muted-foreground">
                      <p>
                        I agree to the{" "}
                        <a href="#" className="text-red-500 hover:text-red-400">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-red-500 hover:text-red-400">
                          Privacy Policy
                        </a>
                        . I understand that I can monetize my content through live streams, video uploads, and music
                        distribution on the Xonnect platform.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefits Preview */}
                <div className="bg-muted border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    What you'll get as a Xonnect Creator
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-600/10 rounded-lg flex items-center justify-center border border-red-600/30">
                        <Zap className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Live Streaming Tools</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-600/10 rounded-lg flex items-center justify-center border border-red-600/30">
                        <Users className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Community Building</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-600/10 rounded-lg flex items-center justify-center border border-red-600/30">
                        <DollarSign className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Multiple Revenue Streams</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className={`px-6 py-3 rounded-xl transition-colors border border-border ${
                step === 1 ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
              disabled={step === 1}
            >
              Previous
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-medium"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-semibold shadow-lg shadow-red-600/20"
              >
                Create Account
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
