"use client"

import { TicketRecord } from "@/lib/type/superadmin-ticket"
import { motion } from "framer-motion"
import { Users } from "lucide-react"

interface OverviewTabProps {
  ticketRecords: TicketRecord[]
  totalRevenue: number
}

export default function OverviewTab({ ticketRecords, totalRevenue }: OverviewTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Top Creators by Revenue */}
      <div className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
        <h3 className="font-bold mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-red-500" />
          Top Creators by Revenue
        </h3>
        <div className="space-y-4">
          {ticketRecords
            .sort((a, b) => b.revenue - a.revenue)
            .map((record, index) => (
              <div key={record.id}>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">
                    {index + 1}. {record.creator}
                  </span>
                  <span className="font-bold">₦{(record.revenue / 1000000).toFixed(2)}M</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full"
                    style={{ width: `${(record.revenue / (totalRevenue / 1.2)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Platform Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
          <h3 className="font-bold mb-6">Platform Distribution</h3>
          <div className="space-y-4">
            {[
              { label: "Streaming", count: 450, percentage: 55 },
              { label: "Physical", count: 287, percentage: 35 },
              { label: "Hybrid", count: 156, percentage: 10 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-bold">{item.count} tickets</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-blue-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
          <h3 className="font-bold mb-6">Ticket Status Distribution</h3>
          <div className="space-y-4">
            {[
              { label: "Active", count: 2, percentage: 67, color: "from-green-600" },
              { label: "Inactive", count: 1, percentage: 33, color: "from-yellow-600" },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-bold">{item.count} events</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${item.color} to-orange-500 h-2 rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
