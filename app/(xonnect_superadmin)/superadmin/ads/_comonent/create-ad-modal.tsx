"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, ImageIcon, Video, LinkIcon, DollarSign, Target, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CreateAdModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreateAdModal = ({ isOpen, onClose }: CreateAdModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "banner",
    position: "hero",
    targetUrl: "",
    budget: "",
    startDate: "",
    endDate: "",
    image: null as File | null,
  })

  const [preview, setPreview] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Creating ad:", formData)
    onClose()
  }

  const positions = [
    { value: "hero", label: "Hero Section", description: "Main banner on homepage" },
    { value: "sidebar", label: "Sidebar", description: "Right sidebar across pages" },
    { value: "footer", label: "Footer", description: "Bottom of pages" },
    { value: "between-content", label: "Between Content", description: "Within content areas" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-card border border-border rounded-2xl p-6 hover:bg-card/70 text-foreground hover:border-red-600/50 transition-all duration-300rounded-2xl w-full max-w-4xl hidden-scrollbar max-h-[90vh] overflow-y-auto m-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">Create New Ad Campaign</h2>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Form */}
                <div className="space-y-6">
                  {/* Basic Info */}
                  <Card className="bg-muted border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-foreground">
                          Ad Title
                        </Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Enter ad title"
                          className="bg-gray-700 border-gray-600 text-foreground mt-1"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-foreground">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Enter ad description"
                          className="bg-gray-700 border-gray-600 text-foreground mt-1"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="type" className="text-foreground">
                          Ad Type
                        </Label>
                        <select
                          id="type"
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-full bg-gray-700 border border-gray-600 text-foreground px-3 py-2 rounded-lg mt-1"
                        >
                          <option value="banner">Banner Ad</option>
                          <option value="video">Video Ad</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="targetUrl" className="text-foreground">
                          Target URL
                        </Label>
                        <div className="relative mt-1">
                          <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="targetUrl"
                            value={formData.targetUrl}
                            onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                            placeholder="https://example.com"
                            className="pl-10 bg-gray-700 border-gray-600 text-foreground"
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Placement */}
                  <Card className="bg-muted border-border">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Target className="w-5 h-5 mr-2 text-red-400" />
                        Ad Placement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-3">
                        {positions.map((position) => (
                          <label
                            key={position.value}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                              formData.position === position.value
                                ? "border-red-600 bg-red-600/10"
                                : "border-gray-600 hover:border-gray-500"
                            }`}
                          >
                            <input
                              type="radio"
                              name="position"
                              value={position.value}
                              checked={formData.position === position.value}
                              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                              className="sr-only"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-foreground">{position.label}</div>
                              <div className="text-sm text-muted-foreground">{position.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Budget & Schedule */}
                  <Card className="bg-muted border-border">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                        Budget & Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="budget" className="text-foreground">
                          Total Budget ($)
                        </Label>
                        <Input
                          id="budget"
                          type="number"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          placeholder="1000"
                          className="bg-gray-700 border-gray-600 text-foreground mt-1"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startDate" className="text-foreground">
                            Start Date
                          </Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            className="bg-gray-700 border-gray-600 text-foreground mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="endDate" className="text-foreground">
                            End Date
                          </Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            className="bg-gray-700 border-gray-600 text-foreground mt-1"
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Media Upload & Preview */}
                <div className="space-y-6">
                  {/* Media Upload */}
                  <Card className="bg-muted border-border">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        {formData.type === "video" ? (
                          <Video className="w-5 h-5 mr-2 text-blue-400" />
                        ) : (
                          <ImageIcon className="w-5 h-5 mr-2 text-purple-400" />
                        )}
                        Upload {formData.type === "video" ? "Video" : "Image"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
                        <input
                          type="file"
                          accept={formData.type === "video" ? "video/*" : "image/*"}
                          onChange={handleImageUpload}
                          className="hidden"
                          id="media-upload"
                        />
                        <label htmlFor="media-upload" className="cursor-pointer">
                          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-foreground font-medium mb-2">
                            Click to upload {formData.type === "video" ? "video" : "image"}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {formData.type === "video" ? "MP4, WebM up to 50MB" : "PNG, JPG, GIF up to 10MB"}
                          </p>
                        </label>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Preview */}
                  {preview && (
                    <Card className="bg-muted border-border">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Eye className="w-5 h-5 mr-2 text-green-400" />
                          Preview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <img
                            src={preview || "/placeholder.svg"}
                            alt="Ad preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2">
                            <span className="bg-background/70 text-foreground px-2 py-1 rounded text-xs">
                              {formData.position}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Ad Guidelines */}
                  <Card className="bg-muted border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Ad Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Images should be high quality (min 1200x600px)</li>
                        <li>• Keep text minimal and readable</li>
                        <li>• Ensure content follows community guidelines</li>
                        <li>• Videos should be under 30 seconds</li>
                        <li>• Include clear call-to-action</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-border">
                <Button type="button" variant="outline" onClick={onClose} className="border-border bg-transparent">
                  Cancel
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Create Ad Campaign
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CreateAdModal

