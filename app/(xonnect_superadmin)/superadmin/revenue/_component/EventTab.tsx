import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video } from "lucide-react"
import { EventRevenue } from "@/lib/data/mock-content"

interface EventsTabProps {
  eventRevenue: EventRevenue[]
  loading: boolean
}

export default function EventsTab({ eventRevenue, loading }: EventsTabProps) {
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

  if (eventRevenue.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No event revenue data found for the selected period.
      </div>
    )
  }

  return (
    <Card className="bg-white/5 border-white/10 text-foreground">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Video className="w-5 h-5 mr-2 text-red-500" />
          Top Earning Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left p-4 font-semibold">Creator</th>
                <th className="text-left p-4 font-semibold">Stream Title</th>
                <th className="text-left p-4 font-semibold">Revenue</th>
                <th className="text-left p-4 font-semibold">Platform</th>
                <th className="text-left p-4 font-semibold">Payout</th>
                <th className="text-left p-4 font-semibold">Viewers</th>
                <th className="text-left p-4 font-semibold">Duration</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {eventRevenue.map((event, index) => (
                <motion.tr
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-border hover:bg-muted/50"
                >
                  <td className="p-4 font-semibold text-foreground">{event.creatorName}</td>
                  <td className="p-4 text-muted-foreground">{event.streamTitle}</td>
                  <td className="p-4 font-bold text-green-400">{formatCurrency(event.revenue)}</td>
                  <td className="p-4 text-blue-400">{formatCurrency(event.platformEarnings)}</td>
                  <td className="p-4 text-purple-400">{formatCurrency(event.payoutEarnings)}</td>
                  <td className="p-4 text-muted-foreground">{formatNumber(event.viewers)}</td>
                  <td className="p-4 text-muted-foreground">{event.duration}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        event.type === "Premium"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {event.type}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{event.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
