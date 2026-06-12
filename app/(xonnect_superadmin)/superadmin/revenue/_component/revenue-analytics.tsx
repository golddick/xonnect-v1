
"use client"

import { useState, useEffect } from "react"
import OverviewTab from "./OverviewTab"
import RevenueHeader from "./RevenueHeader"
import CategoryTabs from "./CategoryTabs"
import { mockAdRevenue, mockPremiumVideoRevenue, mockRevenueData, mockStreamRevenue } from "@/lib/data/mock-content"
import VideosTab from "./VideosTab"
import EventsTab from "./EventTab"

export default function RevenueAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedCategory, setSelectedCategory] = useState("overview")
  const [revenueData, setRevenueData] = useState(mockRevenueData)
  const [eventRevenue, setEventRevenue] = useState(mockStreamRevenue)
  const [premiumVideoRevenue, setPremiumVideoRevenue] = useState(mockPremiumVideoRevenue)
  const [adRevenue, setAdRevenue] = useState(mockAdRevenue)
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState(false)

  // Simulate API calls with mock data
  const fetchRevenueData = async () => {
    setLoading(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Use mock data based on selected category
      if (selectedCategory === 'overview') {
        setRevenueData(mockRevenueData)
      } else if (selectedCategory === 'events') {
        setEventRevenue(mockStreamRevenue)
      } else if (selectedCategory === 'videos') {
        setPremiumVideoRevenue(mockPremiumVideoRevenue)
      }
    } catch (error) {
      console.error('Error fetching revenue data:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportReport = async () => {
    setExporting(true)
    try {
      // Simulate export delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create CSV content
      let csvContent = "data:text/csv;charset=utf-8,"
      
      if (selectedCategory === 'overview') {
        csvContent += "Metric,Amount,Percentage\n"
        csvContent += `Total Revenue,${mockRevenueData.total},100%\n`
        csvContent += `Stream Revenue,${mockRevenueData.streams},${Math.round((mockRevenueData.streams/mockRevenueData.total)*100)}%\n`
        csvContent += `Premium Videos,${mockRevenueData.premiumVideos},${Math.round((mockRevenueData.premiumVideos/mockRevenueData.total)*100)}%\n`
        csvContent += `Ad Revenue,${mockRevenueData.ads},${Math.round((mockRevenueData.ads/mockRevenueData.total)*100)}%\n`
      }
      
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `revenue-report-${selectedPeriod}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error exporting report:', error)
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
        return (
          <OverviewTab 
            revenueData={revenueData} 
            loading={loading}
          />
        )
      case "events":
        return (
          <EventsTab 
            eventRevenue={eventRevenue} 
            loading={loading}
          />
        )
      case "videos":
        return (
          <VideosTab 
            premiumVideoRevenue={premiumVideoRevenue} 
            loading={loading}
          />
        )
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
            <CategoryTabs
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

