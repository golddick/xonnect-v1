
"use client"

import { useState, useEffect } from "react"
import { 
  X, 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  Save,
  Loader2,
  Grid, 
  List,
  Eye,
  EyeOff,
  Folder,
  ChevronLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { motion } from "framer-motion"

interface Category {
  id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  description?: string
}

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onCategoryCreated?: (category: Category) => void
}

const CategoryModal = ({ isOpen, onClose, onCategoryCreated }: CategoryModalProps) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterActive, setFilterActive] = useState<"all" | "active" | "inactive">("all")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    isActive: true
  })
  const [isMobile, setIsMobile] = useState(false)


  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      resetForm()
    }
  }, [isOpen])

  // Generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim()
  }

  // Handle form input change
  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    const newFormData = {
      ...formData,
      [field]: value
    }
    
    // Auto-generate slug when name changes
    if (field === 'name' && typeof value === 'string') {
      newFormData.slug = generateSlug(value)
    }
    
    setFormData(newFormData)
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      isActive: true
    })
    setShowForm(false)
    setEditingId(null)
  }

  // Start creating new category
  const startCreate = () => {
    console.log("Starting create...")
    resetForm()
    setShowForm(true)
    setEditingId(null)
  }

  const refetchCategories = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/category-admin", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      setCategories((data?.categories as Category[]) ?? [])
    } catch (e) {
      toast.error("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      refetchCategories()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error("Category name is required")
      return
    }

    if (formData.name.length < 2) {
      toast.error("Category name must be at least 2 characters")
      return
    }

    setLoading(true)
    try {
      const payload = {
        name: formData.name.trim(),
        slug: formData.slug || generateSlug(formData.name),
        description: formData.description || null,
        isActive: formData.isActive,
      }

      const res = await fetch("/api/category-admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.message || "Failed")
      }

      const data = await res.json()
      const created: Category = data?.category

      toast.success("Category created successfully!")
      if (onCategoryCreated && created) onCategoryCreated(created)

      resetForm()
      await refetchCategories()
    } catch (e) {
      toast.error("Failed to create category")
    } finally {
      setLoading(false)
    }
  }


  // Handle edit category
  const handleEdit = (category: Category) => {
    console.log("Editing category...")
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      isActive: category.isActive
    })
    setEditingId(category.id)
    setShowForm(true)
  }

  // Handle update category
  const handleUpdate = async () => {
    if (!editingId) return

    if (!formData.name.trim()) {
      toast.error("Category name is required")
      return
    }

    setLoading(true)
    try {
      const payload = {
        id: editingId,
        name: formData.name.trim(),
        slug: formData.slug || generateSlug(formData.name),
        description: formData.description || null,
        isActive: formData.isActive,
      }

      const res = await fetch("/api/category-admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.message || "Failed")
      }

      toast.success("Category updated successfully!")
      resetForm()
      await refetchCategories()
    } catch {
      toast.error("Failed to update category")
    } finally {
      setLoading(false)
    }
  }


  // Handle delete category (soft disable)
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to disable this category?")) return

    setLoading(true)
    try {
      const payload = {
        id,
        isActive: false,
      }

      // API expects name/slug for upsert, so we fetch the current category first.
      const current = categories.find((c) => c.id === id)
      if (!current) throw new Error("Category not found")

      const res = await fetch("/api/category-admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: current.id,
          name: current.name,
          slug: current.slug,
          description: current.description ?? null,
          isActive: false,
        }),
      })

      if (!res.ok) throw new Error("Failed")

      toast.success("Category disabled successfully!")
      await refetchCategories()
      resetForm()
    } catch {
      toast.error("Failed to disable category")
    } finally {
      setLoading(false)
    }
  }

  // Handle toggle category status
  const handleToggleStatus = async (id: string) => {
    const current = categories.find((c) => c.id === id)
    if (!current) return

    setLoading(true)
    try {
      const res = await fetch("/api/category-admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: current.id,
          name: current.name,
          slug: current.slug,
          description: current.description ?? null,
          isActive: !current.isActive,
        }),
      })

      if (!res.ok) throw new Error("Failed")

      toast.success("Category status updated!")
      await refetchCategories()
    } catch {
      toast.error("Failed to update category status")
    } finally {
      setLoading(false)
    }
  }


  // Filter categories
  const filteredCategories = categories.filter(category => {
    const matchesSearch = searchTerm === "" ||
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterActive === "all" ||
      (filterActive === "active" && category.isActive) ||
      (filterActive === "inactive" && !category.isActive)
    
    return matchesSearch && matchesStatus
  })

  if (!isOpen) return null

  // Mobile view
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="bg-card border border-border p-6 hover:bg-card/70 transition-all duration-300 text-foreground rounded-2xl w-full max-w-md max-h-[90vh] hidden-scrollbar overflow-hidden m-4">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {showForm && (
                  <button
                    onClick={resetForm}
                    className="mr-3 p-1 hover:bg-muted rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                  </button>
                )}
                <div>
                  <h3 className="text-xl font-bold text-foreground">Categories</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {showForm 
                      ? (editingId ? "Edit Category" : "Create New Category")
                      : "Manage your categories"
                    }
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {showForm ? (
              // Mobile Form View
              <div className="p-4">
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Category Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="e.g., Gaming, Music, Education"
                      className="bg-muted border-border text-foreground"
                    />
                    {formData.slug && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Slug: <span className="font-mono">/{formData.slug}</span>
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Brief description of this category..."
                      className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-foreground min-h-[80px] resize-none"
                      maxLength={200}
                    />
                    <div className="flex justify-end text-sm text-muted-foreground mt-1">
                      <span>{formData.description.length}/200</span>
                    </div>
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center justify-between py-3 border-t border-border">
                    <div>
                      <p className="font-medium text-foreground">Active Status</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.isActive 
                          ? "Category will be available for selection" 
                          : "Category will be hidden"
                        }
                      </p>
                    </div>
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 pt-4">
                    <Button
                      onClick={editingId ? handleUpdate : handleCreate}
                      disabled={loading || !formData.name.trim()}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : editingId ? (
                        <Save className="w-4 h-4 mr-2" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      {loading ? "Saving..." : editingId ? "Update" : "Create"}
                    </Button>
                    
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      className="border-border"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // Mobile List View
              <div className="p-4">
                {/* Search and Create Button */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-muted border-border text-foreground"
                    />
                  </div>
                  <Button
                    onClick={startCreate}
                    className="bg-red-600 hover:bg-red-700 whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create
                  </Button>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center space-x-2 mb-4 overflow-x-auto pb-2">
                  <Button
                    variant={filterActive === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterActive("all")}
                    className={filterActive === "all" ? "bg-red-600" : "border-border"}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterActive === "active" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterActive("active")}
                    className={filterActive === "active" ? "bg-green-600" : "border-border"}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Active
                  </Button>
                  <Button
                    variant={filterActive === "inactive" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterActive("inactive")}
                    className={filterActive === "inactive" ? "bg-gray-600" : "border-border"}
                  >
                    <EyeOff className="w-4 h-4 mr-2" />
                    Inactive
                  </Button>
                </div>

                {/* Category List */}
                <div className="space-y-3">
                  {filteredCategories.length === 0 ? (
                    <div className="text-center py-8">
                      <Folder className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No categories found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm ? "Try a different search term" : "Create your first category"}
                      </p>
                      <Button onClick={startCreate}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Category
                      </Button>
                    </div>
                  ) : (
                    filteredCategories.map((category) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{category.name}</h4>
                            <p className="text-sm text-muted-foreground">/{category.slug}</p>
                          </div>
                          <Badge 
                            variant={category.isActive ? "default" : "secondary"}
                            className={category.isActive 
                              ? "bg-green-500/20 text-green-400 border-green-500/30" 
                              : "bg-gray-500/20 text-muted-foreground border-gray-500/30"
                            }
                          >
                            {category.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        
                        {category.description && (
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {category.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between text-sm">
                          {/* <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <span className="text-muted-foreground">Events:</span>
                              <span className="font-semibold">{category.eventCount}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-muted-foreground">Videos:</span>
                              <span className="font-semibold">{category.videoCount}</span>
                            </div>
                          </div> */}
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(category)}
                              className="hover:bg-gray-700 p-1"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(category.id)}
                              className="hover:bg-red-500/20 text-red-400 hover:text-red-300 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Desktop view - FIXED VERSION
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border p-6 hover:bg-card/70 transition-all duration-300 text-foreground rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden m-4">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-foreground">Category Management</h3>
              <p className="text-muted-foreground mt-1">
                Create and manage categories for events and videos
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={startCreate}
                className="bg-red-600 hover:bg-red-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Category
              </Button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Left Panel - Category List */}
          <div className="w-1/2 lg:w-2/3 border-r border-border flex flex-col hidden-scrollbar overflow-hidden">
            {/* Search and Filters */}
            <div className="p-4 border-b border-border">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-muted border-border text-foreground"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={filterActive === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterActive("all")}
                      className={filterActive === "all" ? "bg-red-600" : "text-black border-border"}
                    >
                      All
                    </Button>
                    <Button
                      variant={filterActive === "active" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterActive("active")}
                      className={filterActive === "active" ? "bg-green-600" :  "text-black border-border"}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Active
                    </Button>
                    <Button
                      variant={filterActive === "inactive" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterActive("inactive")}
                      className={filterActive === "inactive" ? "bg-gray-600" : "text-black border-border"}
                    >
                      <EyeOff className="w-4 h-4 mr-2" />
                      Inactive
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-gray-700" : "text-black border-border"}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-gray-700" : "text-black border-border"}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Category List with proper scrolling */}
            <div className="flex-1 overflow-y-auto p-4">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-12">
                  <Folder className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No categories found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Try a different search term" : "No categories available"}
                  </p>
                  <Button onClick={startCreate}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Category
                  </Button>
                </div>
              ) : viewMode === "grid" ? (
                // Grid View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCategories.map((category) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{category.name}</h4>
                          <p className="text-sm text-muted-foreground">/{category.slug}</p>
                        </div>
                        <Badge 
                          variant={category.isActive ? "default" : "secondary"}
                          className={category.isActive 
                            ? "bg-green-500/20 text-green-400 border-green-500/30" 
                            : "bg-gray-500/20 text-muted-foreground border-gray-500/30"
                          }
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      
                      {category.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {category.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between text-sm">
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(category)}
                            className="hover:bg-gray-700"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(category.id)}
                            className="hover:bg-red-500/20 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // List View
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50 border-b border-border">
                      <tr>
                        <th className="text-left p-3 font-semibold text-muted-foreground">Category</th>
                        <th className="text-left p-3 font-semibold text-muted-foreground">Status</th>
                        <th className="text-left p-3 font-semibold text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCategories.map((category) => (
                        <tr key={category.id} className="border-b border-border hover:bg-muted/30">
                          <td className="p-3">
                            <div>
                              <p className="font-semibold">{category.name}</p>
                              <p className="text-sm text-muted-foreground">/{category.slug}</p>
                              {category.description && (
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                  {category.description}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={category.isActive}
                                onCheckedChange={() => handleToggleStatus(category.id)}
                                className="data-[state=checked]:bg-green-500"
                              />
                              <span className={category.isActive ? "text-green-400" : "text-muted-foreground"}>
                                {category.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(category)}
                                className="border-border hover:border-gray-600"
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(category.id)}
                                className="border-red-700 text-red-400 hover:border-red-600 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Form with proper scrolling */}
          <div className="w-1/2 lg:w-1/3 flex flex-col border-l border-border hidden-scrollbar overflow-hidden">
            <div className="p-6 border-b border-border">
              <h4 className="text-lg font-semibold">
                {showForm 
                  ? (editingId ? "Edit Category" : "Create New Category") 
                  : "Create a Category"
                }
              </h4>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {showForm ? (
                // Form with scrolling
                <div className="space-y-4 pb-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Category Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="e.g., Gaming, Music, Education"
                      className="bg-muted border-border text-foreground"
                    />
                    {formData.slug && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Slug: <span className="font-mono">/{formData.slug}</span>
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Brief description of this category..."
                      className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-foreground min-h-[80px] resize-none"
                      maxLength={200}
                    />
                    <div className="flex justify-end text-sm text-muted-foreground mt-1">
                      <span>{formData.description.length}/200</span>
                    </div>
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center justify-between py-4 border-y border-border">
                    <div>
                      <p className="font-medium text-foreground">Active Status</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.isActive 
                          ? "This category will be available for selection" 
                          : "This category will be hidden from creators"
                        }
                      </p>
                    </div>
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 pt-4">
                    <Button
                      onClick={editingId ? handleUpdate : handleCreate}
                      disabled={loading || !formData.name.trim()}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : editingId ? (
                        <Save className="w-4 h-4 mr-2" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      {loading ? "Saving..." : editingId ? "Update Category" : "Create Category"}
                    </Button>
                    
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      className="border-border text-black"
                    >
                      Cancel
                    </Button>
                  </div>

             
                </div>
              ) : (
                // Empty state - Prompt to create
                <div className="text-center py-12">
                  <Folder className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Create a Category</h3>
                  <p className="text-muted-foreground mb-6">
                    Categories help organize your events and videos. Creators can select categories when creating content.
                  </p>
                  <Button onClick={startCreate} className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Category
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryModal
