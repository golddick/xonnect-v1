
"use client"

import { useEffect, useState } from "react"
import OverviewTab from "./OverviewTab"
import RevenueHeader from "./RevenueHeader"
import CategoryTabs from "./CategoryTabs"
import VideosTab from "./VideosTab"
import EventsTab from "./EventTab"

type RevenueData = {
  total: number
  streams: number
  premiumVideos: number
  ads: number
  platformEarnings: number
  payoutEarnings: number
  growth: number
}

type EventRevenue = {
  id: string
  creatorName: string
  streamTitle: string
  revenue: number
  platformEarnings: number
  payoutEarnings: number
  viewers: number
  duration: string
  date: string
  type: string
}

type VideoRevenue = {
  id: string
  creatorName: string
  videoTitle: string
  revenue: number
  platformEarnings: number
  payoutEarnings: number
  views: number
  price: number
  sales: number
  date: string
}

export default function RevenueAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedCategory, setSelectedCategory] = useState("overview")
  const [revenueData, setRevenueData] = useState<RevenueData>({
    total: 0,
    streams: 0,
    premiumVideos: 0,
    ads: 0,
    platformEarnings: 0,
    payoutEarnings: 0,
    growth: 0,
  })
  const [eventRevenue, setEventRevenue] = useState<EventRevenue[]>([])
  const [premiumVideoRevenue, setPremiumVideoRevenue] = useState<VideoRevenue[]>([])
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState(false)

  const fetchRevenueData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/superadmin/revenue")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || "Failed to load revenue data")
      }

      setRevenueData(data.overview)
      setEventRevenue(data.events ?? [])
      setPremiumVideoRevenue(data.videos ?? [])
    } catch (error) {
      console.error("Error fetching revenue data:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportReport = async () => {
    setExporting(true)
    try {
      const csvContent = [
        "Metric,Amount,Percentage",
        `Total Revenue,${revenueData.total},100%`,
        `Stream Revenue,${revenueData.streams},${Math.round((revenueData.streams / (revenueData.total || 1)) * 100)}%`,
        `Premium Videos,${revenueData.premiumVideos},${Math.round((revenueData.premiumVideos / (revenueData.total || 1)) * 100)}%`,
        `Platform Earnings,${revenueData.platformEarnings},${Math.round((revenueData.platformEarnings / (revenueData.total || 1)) * 100)}%`,
      ].join("\n")

      const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `revenue-report-${selectedPeriod}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error exporting report:", error)
    } finally {
      setExporting(false)
    }
  }

  useEffect(() => {
    fetchRevenueData()
  }, [selectedPeriod, selectedCategory])

  const renderContent = () => {
    switch (selectedCategory) {
      case "overview":
        return <OverviewTab revenueData={revenueData} loading={loading} />
      case "events":
        return <EventsTab eventRevenue={eventRevenue} loading={loading} />
      case "videos":
        return <VideosTab premiumVideoRevenue={premiumVideoRevenue} loading={loading} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <div className="flex-1 w-full">
          <RevenueHeader
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            loading={loading}
            exporting={exporting}
            onRefresh={fetchRevenueData}
            onExport={exportReport}
          />

          <div className="p-8">
            <CategoryTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

