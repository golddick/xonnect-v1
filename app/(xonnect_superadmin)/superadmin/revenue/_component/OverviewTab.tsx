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
      {/* Main Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
        <Card className="bg-card border border-border rounded-2xl px-2 py-2 hover:bg-card/70 transition-all duration-300 text-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(revenueData.total)}</p>
                <p className={`text-sm ${revenueData.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {revenueData.growth >= 0 ? '+' : ''}{revenueData.growth}%
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border rounded-2xl px-2 py-2 hover:bg-card/70 transition-all duration-300 text-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Platform Earnings</p>
                <p className="text-2xl font-bold">{formatCurrency(revenueData.platformEarnings)}</p>
                <p className="text-blue-500 text-sm">
                  {calculatePercentage(revenueData.platformEarnings, revenueData.total)}% of total
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border rounded-2xl px-2 py-2 hover:bg-card/70 transition-all duration-300 text-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Creator Payouts</p>
                <p className="text-2xl font-bold">{formatCurrency(revenueData.payoutEarnings)}</p>
                <p className="text-purple-500 text-sm">
                  {calculatePercentage(revenueData.payoutEarnings, revenueData.total)}% of total
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border rounded-2xl px-2 py-2 hover:bg-card/70 transition-all duration-300 text-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Stream Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(revenueData.streams)}</p>
                <p className="text-blue-500 text-sm">
                  {calculatePercentage(revenueData.streams, revenueData.total)}% of total
                </p>
              </div>
              <Video className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border rounded-2xl px-2 py-2 hover:bg-card/70 transition-all duration-300 text-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Premium Videos</p>
                <p className="text-2xl font-bold">{formatCurrency(revenueData.premiumVideos)}</p>
                <p className="text-purple-500 text-sm">
                  {calculatePercentage(revenueData.premiumVideos, revenueData.total)}% of total
                </p>
              </div>
              <Eye className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

      </div>


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
