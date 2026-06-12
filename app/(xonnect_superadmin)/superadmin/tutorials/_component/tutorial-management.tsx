"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Video, Plus, Edit, Trash2, Eye, BarChart3, Search } from "lucide-react"

export default function SuperAdminTutorialsPage() {
  const [tutorials, setTutorials] = useState([
    {
      id: 1,
      title: "Getting Started as a Creator",
      category: "creator",
      level: "beginner",
      views: 12450,
      uploadDate: "2024-01-15",
      status: "published",
      duration: "12:45",
    },
    {
      id: 2,
      title: "Monetizing Your Content",
      category: "creator",
      level: "intermediate",
      views: 8920,
      uploadDate: "2024-01-18",
      status: "published",
      duration: "18:30",
    },
  ])

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    category: "creator",
    level: "beginner",
    videoFile: null,
    thumbnailFile: null,
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const handleUploadChange = (field: string, value: any) => {
    setUploadData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePublishTutorial = () => {
    if (!uploadData.title) {
      alert("Please enter a tutorial title")
      return
    }

    const newTutorial = {
      id: tutorials.length + 1,
      title: uploadData.title,
      category: uploadData.category,
      level: uploadData.level,
      views: 0,
      uploadDate: new Date().toISOString().split("T")[0],
      status: "published",
      duration: "0:00",
    }

    setTutorials([...tutorials, newTutorial])
    setUploadData({
      title: "",
      description: "",
      category: "creator",
      level: "beginner",
      videoFile: null,
      thumbnailFile: null,
    })
    setIsUploadModalOpen(false)
    alert("Tutorial published successfully!")
  }

  const handleDeleteTutorial = (id: number) => {
    setTutorials(tutorials.filter((t) => t.id !== id))
  }

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || tutorial.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const stats = [
    { label: "Total Tutorials", value: tutorials.length, icon: Video },
    { label: "Total Views", value: tutorials.reduce((sum, t) => sum + t.views, 0), icon: Eye },
    { label: "Published", value: tutorials.filter((t) => t.status === "published").length, icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-transparent backdrop-blur-sm sticky p-4 top-0 z-10">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div>
              <h1 className="text-2xl font-bold mb-2">Tutorial Management</h1>
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-foreground px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Upload Tutorial
            </button>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full px-6 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-red-600/20 rounded-lg">
                    <IconComponent className="w-6 h-6 text-red-400" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card border border-border hover:bg-card/70 transition-all duration-300  rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-card border border-border hover:bg-card/70 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="all">All Categories</option>
              <option value="creator">Creator</option>
              <option value="viewer">Viewer</option>
              <option value="partnership">Partnership</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>

        {/* Tutorials Table */}
        <div className="bg-card border border-border hover:bg-card/70 backdrop-blur-sm rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-none bg-card">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Level</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Views</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTutorials.map((tutorial) => (
                  <tr key={tutorial.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm">{tutorial.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium capitalize">
                        {tutorial.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm capitalize">{tutorial.level}</td>
                    <td className="px-6 py-4 text-sm flex items-center gap-2">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      {tutorial.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium capitalize">
                        {tutorial.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{tutorial.uploadDate}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => handleDeleteTutorial(tutorial.id)}
                          className="p-2 hover:bg-red-600/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border hover:bg-card/70 transition-all duration-300 text-foreground rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] hidden-scrollbar overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Upload New Tutorial</h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Tutorial Title</label>
                <input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) => handleUploadChange("title", e.target.value)}
                  placeholder="e.g., Getting Started as a Creator"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={uploadData.description}
                  onChange={(e) => handleUploadChange("description", e.target.value)}
                  placeholder="Describe what this tutorial covers..."
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
                />
              </div>

              {/* Category and Level */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={uploadData.category}
                    onChange={(e) => handleUploadChange("category", e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="creator">Creator Guide</option>
                    <option value="viewer">Viewer Guide</option>
                    <option value="partnership">Partnership</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                  <select
                    value={uploadData.level}
                    onChange={(e) => handleUploadChange("level", e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Video File</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-red-600/50 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-foreground font-medium">Click to upload video</p>
                  <p className="text-sm text-muted-foreground mt-1">MP4, WebM up to 500MB</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleUploadChange("videoFile", e.target.files?.[0])}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Thumbnail</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-red-600/50 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-foreground font-medium">Click to upload thumbnail</p>
                  <p className="text-sm text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadChange("thumbnailFile", e.target.files?.[0])}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handlePublishTutorial}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Publish Tutorial
                </button>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-foreground px-6 py-3 rounded-lg font-semibold border border-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

