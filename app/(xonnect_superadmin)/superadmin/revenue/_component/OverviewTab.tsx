import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RevenueData } from "@/lib/data/mock-content"
import {
  DollarSign,
  TrendingUp,
  Video,
  Megaphone,
  Eye,
  CreditCard,
  Users,
  PieChart,
  BarChart3,
  Activity,
} from "lucide-react"
import BarChartComponent from "./BarChart"
import PieChartComponent from "./PieChart"


interface OverviewTabProps {
  revenueData: RevenueData
  loading: boolean
}

export default function OverviewTab({ revenueData, loading }: OverviewTabProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const calculatePercentage = (part: number, total: number) => {
    if (total === 0) return 0
    return Math.round((part / total) * 100)
  }

  const getRevenueSourceData = () => {
    return [
      { 
        name: 'Streams', 
        value: revenueData.streams, 
        color: '#3b82f6', 
        percentage: calculatePercentage(revenueData.streams, revenueData.total) 
      },
      { 
        name: 'Premium Videos', 
        value: revenueData.premiumVideos, 
        color: '#8b5cf6', 
        percentage: calculatePercentage(revenueData.premiumVideos, revenueData.total) 
      },
      { 
        name: 'Ads', 
        value: revenueData.ads, 
        color: '#ef4444', 
        percentage: calculatePercentage(revenueData.ads, revenueData.total) 
      },
    ]
  }

  const getEarningsDistributionData = () => {
    return [
      { 
        name: 'Platform Earnings', 
        value: revenueData.platformEarnings, 
        color: '#10b981', 
        percentage: calculatePercentage(revenueData.platformEarnings, revenueData.total) 
      },
      { 
        name: 'Creator Payouts', 
        value: revenueData.payoutEarnings, 
        color: '#8b5cf6', 
        percentage: calculatePercentage(revenueData.payoutEarnings, revenueData.total) 
      },
    ]
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p>Loading overview data...</p>
      </div>
    )
  }

  return (
    <>
      {/* Revenue Breakdown Graph */}
      {/* <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className="bg-card border border-border rounded-2xl p-6 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 transition-all duration-300 text-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartComponent
              data={[
                {
                  name: 'Gross Amount',
                  value: revenueData.total,
                  color: '#16a34a',
                  percentage: 100,
                },
                {
                  name: 'Platform Fee',
                  value: revenueData.platformEarnings,
                  color: '#3b82f6',
                  percentage: calculatePercentage(revenueData.platformEarnings, revenueData.total),
                },
                {
                  name: 'Creator Revenue',
                  value: revenueData.payoutEarnings,
                  color: '#8b5cf6',
                  percentage: calculatePercentage(revenueData.payoutEarnings, revenueData.total),
                },
                {
                  name: 'Stream Revenue',
                  value: revenueData.streams,
                  color: '#0ea5e9',
                  percentage: calculatePercentage(revenueData.streams, revenueData.total),
                },
                {
                  name: 'Premium Videos',
                  value: revenueData.premiumVideos,
                  color: '#f97316',
                  percentage: calculatePercentage(revenueData.premiumVideos, revenueData.total),
                },
              ]}
              title="Revenue Categories"
            />
          </CardContent>
        </Card>
      </div> */}


      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-card border border-border rounded-2xl px-4 py-2 hover:bg-card/70 transition-all duration-300 text-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-blue-500" />
              Revenue by Source
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PieChartComponent data={getRevenueSourceData()} />
          </CardContent>
        </Card>

        <Card className="bg-card border border-border rounded-2xl px-4 py-2 hover:bg-card/70 transition-all duration-300 text-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
              Earnings Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartComponent 
              data={getEarningsDistributionData()} 
              title="Platform vs Creator Earnings"
            />
          </CardContent>
        </Card>
      </div>

    </>
  )
}
