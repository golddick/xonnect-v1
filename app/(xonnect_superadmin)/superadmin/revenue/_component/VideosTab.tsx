import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"
import { VideoRevenue } from "@/lib/data/mock-content"

interface VideosTabProps {
  premiumVideoRevenue: VideoRevenue[]
  loading: boolean
}

export default function VideosTab({ premiumVideoRevenue, loading }: VideosTabProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (premiumVideoRevenue.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No premium video revenue data found for the selected period.
      </div>
    )
  }

  return (
    <Card className="bg-white/5 border-white/10 text-foreground">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Eye className="w-5 h-5 mr-2 text-purple-500" />
          Top Earning Premium Videos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left p-4 font-semibold">Creator</th>
                <th className="text-left p-4 font-semibold">Video Title</th>
                <th className="text-left p-4 font-semibold">Revenue</th>
                <th className="text-left p-4 font-semibold">Platform</th>
                <th className="text-left p-4 font-semibold">Payout</th>
                <th className="text-left p-4 font-semibold">Price</th>
                <th className="text-left p-4 font-semibold">Sales</th>
                <th className="text-left p-4 font-semibold">Views</th>
                <th className="text-left p-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {premiumVideoRevenue.map((video, index) => (
                <motion.tr
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-border hover:bg-muted/50"
                >
                  <td className="p-4 font-semibold text-foreground">{video.creatorName}</td>
                  <td className="p-4 text-muted-foreground">{video.videoTitle}</td>
                  <td className="p-4 font-bold text-green-400">{formatCurrency(video.revenue)}</td>
                  <td className="p-4 text-blue-400">{formatCurrency(video.platformEarnings)}</td>
                  <td className="p-4 text-purple-400">{formatCurrency(video.payoutEarnings)}</td>
                  <td className="p-4 text-muted-foreground">{formatCurrency(video.price)}</td>
                  <td className="p-4 text-muted-foreground">{formatNumber(video.sales)}</td>
                  <td className="p-4 text-muted-foreground">{formatNumber(video.views)}</td>
                  <td className="p-4 text-muted-foreground">{video.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
