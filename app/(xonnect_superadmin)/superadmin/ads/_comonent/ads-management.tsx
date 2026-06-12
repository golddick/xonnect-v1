"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Target,
  BarChart3,
  ImageIcon,
  Video,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import CreateAdModal from "./create-ad-modal"

const AdsManagement = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const ads = [
    {
      id: 1,
      title: "Summer Creator Boost",
      type: "banner",
      status: "active",
      impressions: 125000,
      clicks: 3200,
      ctr: "2.56%",
      budget: "$5,000",
      spent: "$3,240",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      image: "/placeholder-91lfe.png",
      position: "hero",
    },
    {
      id: 2,
      title: "Premium Features Promo",
      type: "video",
      status: "active",
      impressions: 89000,
      clicks: 2100,
      ctr: "2.36%",
      budget: "$3,000",
      spent: "$1,890",
      startDate: "2024-01-20",
      endDate: "2024-02-20",
      image: "/placeholder-2213v.png",
      position: "sidebar",
    },
    {
      id: 3,
      title: "New Year Special",
      type: "banner",
      status: "paused",
      impressions: 45000,
      clicks: 890,
      ctr: "1.98%",
      budget: "$2,000",
      spent: "$1,200",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      image: "/placeholder-6if9t.png",
      position: "footer",
    },
    {
      id: 4,
      title: "Creator Tools Update",
      type: "banner",
      status: "ended",
      impressions: 67000,
      clicks: 1450,
      ctr: "2.16%",
      budget: "$1,500",
      spent: "$1,500",
      startDate: "2023-12-01",
      endDate: "2023-12-31",
      image: "/placeholder-7l8ku.png",
      position: "hero",
    },
  ]

  const filteredAds = ads.filter((ad) => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || ad.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "paused":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "ended":
        return "bg-gray-500/20 text-muted-foreground border-gray-500/30"
      default:
        return "bg-gray-500/20 text-muted-foreground border-gray-500/30"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "banner":
        return ImageIcon
      default:
        return ImageIcon
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">

        <div className="flex-1 w-full">
          {/* Header */}
          <div className="border-b border-border bg-transparent backdrop-blur-sm sticky p-4 top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Ads Management</h1>
              </div>

              <Button onClick={() => setShowCreateModal(true)} className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Ad
              </Button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="p-8 border-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search ads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-muted border-border text-foreground w-64"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-muted border border-border text-foreground px-4 py-2 rounded-lg"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="ended">Ended</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="border-border bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
                <Button variant="outline" size="sm" className="border-border bg-transparent">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>
          </div>

          {/* Ads Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAds.map((ad, index) => {
                const TypeIcon = getTypeIcon(ad.type)
                return (
                  <motion.div
                    key={ad.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 text-foreground hover:border-red-600/50 transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <TypeIcon className="w-5 h-5 text-red-400" />
                            <CardTitle className="text-lg">{ad.title}</CardTitle>
                          </div>
                          <Badge className={getStatusColor(ad.status)}>{ad.status}</Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Ad Preview */}
                        <div className="relative">
                          <img
                            src={ad.image || "/placeholder.svg"}
                            alt={ad.title}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="text-xs">
                              {ad.position}
                            </Badge>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Impressions</p>
                            <p className="font-semibold">{ad.impressions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Clicks</p>
                            <p className="font-semibold">{ad.clicks.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">CTR</p>
                            <p className="font-semibold text-green-400">{ad.ctr}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Spent</p>
                            <p className="font-semibold">{ad.spent}</p>
                          </div>
                        </div>

                        {/* Budget Progress */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Budget</span>
                            <span>
                              {ad.spent} / {ad.budget}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-red-600 h-2 rounded-full"
                              style={{
                                width: `${(Number.parseInt(ad.spent.replace("$", "").replace(",", "")) / Number.parseInt(ad.budget.replace("$", "").replace(",", ""))) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {ad.startDate}
                          </div>
                          <span>to {ad.endDate}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" className="border-border bg-transparent">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-border bg-transparent">
                              {ad.status === "active" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-border text-red-400 hover:text-red-300 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button size="sm" variant="outline" className="border-border bg-transparent">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {filteredAds.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No ads found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filters"
                    : "Create your first ad campaign to get started"}
                </p>
                <Button onClick={() => setShowCreateModal(true)} className="bg-red-600 hover:bg-red-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Ad
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Ad Modal */}
      {showCreateModal && <CreateAdModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />}
    </div>
  )
}

export default AdsManagement

