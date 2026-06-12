





"use client"

import { motion } from "framer-motion"
import {
  Search,
  Filter,
  Eye,
  DollarSign,
  Users,
  Video,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Play,
  Calendar,
  BarChart3,
  Crown,
  Loader2,
  RefreshCw,
  TrendingUp,
  FolderPlus, Bell,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useContentManagement } from "@/lib/hooks/use-content-management"
import React, { useState } from "react"
import EventTable from "./content-management/event-table"
import VideoTable from "./content-management/video-table"
import DetailModal from "./content-management/detail-modal"
import CategoryModal from "./content-management/category-modal"
import {ThemeToggle} from "@/components/theme-toggle"; // Don't forget to import this

const ContentManagement = () => {
  // Move useState INSIDE the component
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

//   const currentUser = {
//     role: "primus",
//     name: "Admin User",
//   }

  const {
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    selectedItem,
    setSelectedItem,
    activeTab,
    events,
    videos,
    loading,
    refreshing,
    handleRefresh,
    handleTabChange,
  } = useContentManagement()

  // Calculate stats
  const liveEvents = events.filter((s) => s.status === "live").length
  const scheduledEvents = events.filter((s) => s.status === "scheduled").length
  const totalRevenue = events.reduce((sum, stream) => {
    return sum + parseFloat(stream.revenue.replace("$", "").replace(",", ""))
  }, 0)

  const totalEvents = events.length
  const totalVideos = videos.length
  const totalVideoViews = videos.reduce((sum, video) => sum + video.views, 0)
  const totalVideoRevenue = videos.reduce((sum, video) => {
    return sum + parseFloat(video.revenue.replace("$", "").replace(",", ""))
  }, 0)

  // Handle category creation
  const handleCategoryCreated = (category: any) => {
    toast.success(`Category "${category.name}" created successfully!`)
    // You can refresh your categories list here if needed
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex">
        <div className="flex-1 w-full flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto mb-4" />
            <p className="text-muted-foreground">Loading {activeTab}...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <div className="flex-1 w-full">
          {/* Header */}
          <div className="border-b border-border bg-transparent backdrop-blur-sm sticky p-4 top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Content Management</h1>
              </div>

              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  className="border-border bg-transparent"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  {refreshing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  Refresh
                </Button>
                <Button 
                  variant="outline" 
                  className="border-border bg-transparent"
                  onClick={() => setIsCategoryModalOpen(true)}
                >
                  <FolderPlus className="w-4 h-4 mr-2" />
                  Categories
                </Button>

                <div className="flex items-center space-x-4">
                  <button className="relative bg-background hover:bg-muted rounded-lg p-2 transition-colors">
                    <Bell className="w-5 h-5" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
                  </button>
                  <ThemeToggle />
                </div>

              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="p-8 border-none">
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === "events" ? "bg-red-600" : "border-border bg-transparent hover:border-border"
                }`}
                onClick={() => handleTabChange("events")}
              >
                Events
              </button>

              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === "videos" ? "bg-red-600" : "border-border border bg-transparent hover:border-border"
                }`}
                onClick={() => handleTabChange("videos")}
              >
                Videos
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="p-8 border-none">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-card border border-border rounded-2xl p-4 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
                <CardContent className=" ">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        {activeTab === "events" ? "Total Events" : "Total Videos"}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {activeTab === "events" ? totalEvents : totalVideos}
                      </p>
                    </div>
                    <Video className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border rounded-2xl p-4 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
                <CardContent className=" ">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        {activeTab === "events" ? "Live Now" : "Total Views"}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {activeTab === "events" ? liveEvents : totalVideoViews.toLocaleString()}
                      </p>
                    </div>
                    {activeTab === "events" ? (
                      <Play className="w-8 h-8 text-red-500" />
                    ) : (
                      <Eye className="w-8 h-8 text-blue-500" />
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border rounded-2xl p-4 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
                <CardContent className=" ">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        {activeTab === "events" ? "Scheduled" : "Uploads This Month"}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {activeTab === "events" ? scheduledEvents : "12"}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-border rounded-2xl p-4 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
                <CardContent className=" ">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Revenue</p>
                      <p className="text-2xl font-bold text-foreground">
                        ${activeTab === "events" ? totalRevenue.toLocaleString() : totalVideoRevenue.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Filters and Search */}
          <div className=" p-8 border-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-card border-border text-foreground w-64"
                  />
                </div>

                {activeTab === "events" && (
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-card border-border border text-foreground px-4 py-2 rounded-lg"
                  >
                    <option value="all">All Status</option>
                    <option value="live">Live</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                  </select>
                )}
              </div>

              <Button variant="outline" size="sm" className="border-border bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Content Table */}
          <div className="p-8">
            <div className="bg-card border border-border rounded-2xl p-6 hover:bg-muted transition-all duration-300 text-foreground overflow-hidden">
              {activeTab === "events" ? (
                <EventTable
                  events={events} 
                  onSelect={setSelectedItem}
                />
              ) : (
                <VideoTable
                  videos={videos}
                  onSelect={setSelectedItem}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal 
        selectedItem={selectedItem}
        activeTab={activeTab}
        onClose={() => setSelectedItem(null)}
      />

      {/* Category Modal  */}
      <CategoryModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryCreated={handleCategoryCreated}
      />
    </div>
  )
}

export default ContentManagement
