"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { TicketRecord, Transaction } from "@/lib/type/superadmin-ticket"
import TicketHeader from "./TicketHeader"
import StatsOverview from "./StatsOverview"
import TabNavigation from "./TabNavigation"
import OverviewTab from "./OverviewTab"
import TicketsTab from "./TicketsTab"
import TransactionsTab from "./TransactionsTab"
import TicketDetailsModal from "./TicketDetailsModal"

export default function SuperAdminTicketManagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTicket, setSelectedTicket] = useState<TicketRecord | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [ticketRecords, setTicketRecords] = useState<TicketRecord[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/superadmin/tickets")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Failed to load tickets")
        }

        setTicketRecords(data.records || [])
        setTransactions((data.records || []).flatMap((record: TicketRecord) =>
          (record.purchases || []).map((purchase) => ({
            id: purchase.id,
            creator: record.creator,
            buyer: purchase.buyer,
            amount: purchase.amount,
            ticketType: record.ticketType,
            date: new Date(purchase.date).toLocaleDateString("en-NG"),
            status: purchase.status as "completed" | "pending" | "failed",
            transactionId: purchase.transactionId,
          }))
        ))
      } catch (error) {
        console.error("Failed to load ticket management data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTickets()
  }, [])

  const filteredRecords = useMemo(() =>
    ticketRecords.filter(
      (r) =>
        r.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    [ticketRecords, searchTerm]
  )

  const totalRevenue = ticketRecords.reduce((sum, r) => sum + r.revenue, 0)
  const totalTicketsSold = ticketRecords.reduce((sum, r) => sum + r.totalSold, 0)
  const avgTicketsPerEvent = ticketRecords.length ? Math.round(totalTicketsSold / ticketRecords.length) : 0
  const activeTickets = ticketRecords.filter((r) => r.status === "active").length

  const openTicketDetails = (ticket: TicketRecord) => {
    setSelectedTicket(ticket)
    setShowDetailsModal(true)
  }

  const stats = [
    {
      label: "Total Revenue",
      value: `₦${(totalRevenue / 1000000).toFixed(2)}M`,
      color: "text-green-400",
    },
    { label: "Tickets Sold", value: totalTicketsSold.toString(), color: "text-blue-400" },
    { label: "Active Tickets", value: activeTickets.toString(), color: "text-red-400" },
    { label: "Streaming Tickets", value: ticketRecords.filter((item) => item.access === "Stream").length.toString(), color: "text-purple-400" },
    { label: "Venue Tickets", value: ticketRecords.filter((item) => item.access === "Venue").length.toString(), color: "text-yellow-400" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">

        <div className={`flex-1 w-full`}>
          <TicketHeader />
          
          <div className="p-8">
            <StatsOverview stats={stats} />
            
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div>
              {activeTab === "overview" && (
                <OverviewTab 
                  ticketRecords={ticketRecords}
                  totalRevenue={totalRevenue}
                  loading={loading}
                />
              )}
              
              {activeTab === "tickets" && (
                <TicketsTab 
                  filteredRecords={filteredRecords}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  openTicketDetails={openTicketDetails}
                  loading={loading}
                />
              )}
              
              {activeTab === "transactions" && (
                <TransactionsTab transactions={transactions} />
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showDetailsModal && selectedTicket && (
          <TicketDetailsModal
            selectedTicket={selectedTicket}
            onClose={() => setShowDetailsModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}









