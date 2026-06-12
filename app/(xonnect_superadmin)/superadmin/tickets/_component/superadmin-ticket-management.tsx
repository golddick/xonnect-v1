"use client"

import { useState } from "react"
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Mock ticket records
  const [ticketRecords] = useState<TicketRecord[]>([
    {
      id: "TKT-ADMIN-001",
      creator: "ProGamer Mike",
      access: "Stream Access",
      creatorEmail: "mike@xonnect.com",
      eventName: "Gaming Tournament Finals",
      ticketType: "VIP Access",
      totalIssued: 500,
      totalSold: 450,
      revenue: 2250000,
      createdDate: "2024-01-10",
      status: "active",
      platform: "streaming",
    },
    {
      id: "TKT-ADMIN-002",
      creator: "Beat Maker Pro",
      access: "Venue Access",
      creatorEmail: "beat@xonnect.com",
      eventName: "Music Production Workshop",
      ticketType: "General Admission",
      totalIssued: 300,
      totalSold: 287,
      revenue: 430500,
      createdDate: "2024-01-15",
      status: "active",
      platform: "physical",
    },
    {
      id: "TKT-ADMIN-003",
      creator: "Chef Amara",
      access: "Venue Access",
      creatorEmail: "chef@xonnect.com",
      eventName: "Culinary Masterclass",
      ticketType: "Standard",
      totalIssued: 200,
      totalSold: 156,
      revenue: 234000,
      createdDate: "2024-01-05",
      status: "inactive",
      platform: "hybrid",
    },
  ])

  // Mock transaction data
  const [transactions] = useState<Transaction[]>([
    {
      id: "TRX-001",
      creator: "ProGamer Mike",
      buyer: "Chukwu Adams",
      amount: 5000,
      ticketType: "VIP Access",
      date: "2024-01-20",
      status: "completed",
      transactionId: "TXN-2024-001",
    },
    {
      id: "TRX-002",
      creator: "Beat Maker Pro",
      buyer: "Ngozi Okafor",
      amount: 1500,
      ticketType: "Standard",
      date: "2024-01-21",
      status: "completed",
      transactionId: "TXN-2024-002",
    },
    {
      id: "TRX-003",
      creator: "Chef Amara",
      buyer: "Tunde Johnson",
      amount: 1500,
      ticketType: "General Admission",
      date: "2024-01-22",
      status: "pending",
      transactionId: "TXN-2024-003",
    },
  ])

  const filteredRecords = ticketRecords.filter(
    (r) =>
      r.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalRevenue = ticketRecords.reduce((sum, r) => sum + r.revenue, 0)
  const totalTicketsSold = ticketRecords.reduce((sum, r) => sum + r.totalSold, 0)
  const avgTicketsPerEvent = Math.round(totalTicketsSold / ticketRecords.length)
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
    { label: "Streaming Tickets", value: avgTicketsPerEvent.toString(), color: "text-purple-400" },
    { label: "Venue Tickets", value: avgTicketsPerEvent.toString(), color: "text-yellow-400" },
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
                />
              )}
              
              {activeTab === "tickets" && (
                <TicketsTab 
                  filteredRecords={filteredRecords}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  openTicketDetails={openTicketDetails}
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









