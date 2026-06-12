"use client"

import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { TicketRecord } from "@/lib/type/superadmin-ticket"

interface TicketsTabProps {
  filteredRecords: TicketRecord[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  openTicketDetails: (ticket: TicketRecord) => void
}

export default function TicketsTab({ 
  filteredRecords, 
  searchTerm, 
  setSearchTerm, 
  openTicketDetails 
}: TicketsTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by creator, event, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
            />
          </div>
        </div>
        <button className="w-full sm:w-auto bg-card border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground flex items-center justify-center gap-2 font-medium text-sm border border-white/20">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Ticket ID</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Access</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Creator</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Event</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Sold/Total</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Revenue</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Status</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id} className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
                <td className="py-4 px-4">
                  <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium">
                    {record.id}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <Badge variant="secondary" className="bg-red-600/20 text-red-400">
                      {record.access}
                    </Badge>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium">{record.creator}</p>
                    <p className="text-xs text-gray-500">{record.creatorEmail}</p>
                  </div>
                </td>
                <td className="py-4 px-4">{record.eventName}</td>
                <td className="py-4 px-4 font-bold">
                  {record.totalSold}/{record.totalIssued}
                </td>
                <td className="py-4 px-4 font-bold">₦{(record.revenue / 1000).toFixed(0)}K</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      record.status === "active"
                        ? "bg-green-600/20 text-green-400"
                        : record.status === "inactive"
                          ? "bg-yellow-600/20 text-yellow-400"
                          : "bg-gray-600/20 text-muted-foreground"
                    }`}
                  >
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => openTicketDetails(record)}
                    className="text-red-400 hover:text-red-300 transition-colors text-xs font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
