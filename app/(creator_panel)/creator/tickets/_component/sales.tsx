"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Search, Download, Filter, User, Calendar, DollarSign, Ticket, BarChart3, TrendingUp, Users } from "lucide-react"

export default function TicketSalesPage() {
  const router = useRouter()
  const params = useParams()
  const ticketId = params.id

  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // Mock ticket data
  const mockTicket = {
    id: ticketId,
    streamTitle: "Music Production Masterclass",
    ticketType: "VIP Pass",
    price: 5000,
    totalSold: 45,
    totalRevenue: 225000,
    availableSlots: 55,
  }

  // Mock sales data
  const mockSales = [
    {
      id: 1,
      buyerName: "John Doe",
      email: "john@example.com",
      purchaseDate: "2024-01-15",
      amount: 5000,
      status: "completed",
      transactionId: "TXN-001",
    },
    {
      id: 2,
      buyerName: "Jane Smith",
      email: "jane@example.com",
      purchaseDate: "2024-01-14",
      amount: 5000,
      status: "completed",
      transactionId: "TXN-002",
    },
    {
      id: 3,
      buyerName: "Bob Johnson",
      email: "bob@example.com",
      purchaseDate: "2024-01-13",
      amount: 5000,
      status: "refunded",
      transactionId: "TXN-003",
    },
    {
      id: 4,
      buyerName: "Alice Williams",
      email: "alice@example.com",
      purchaseDate: "2024-01-12",
      amount: 5000,
      status: "completed",
      transactionId: "TXN-004",
    },
    {
      id: 5,
      buyerName: "Charlie Brown",
      email: "charlie@example.com",
      purchaseDate: "2024-01-11",
      amount: 5000,
      status: "completed",
      transactionId: "TXN-005",
    },
  ]

  const [ticket, setTicket] = useState(mockTicket)
  const [sales, setSales] = useState(mockSales)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        // In real app: fetch ticket and sales data
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [ticketId])

  const filteredSales = sales.filter(sale => {
    const matchesSearch = 
      sale.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDate = dateFilter === "all" || true // Add date filtering logic
    
    return matchesSearch && matchesDate
  })

  const exportToCSV = () => {
    const headers = ["Buyer Name", "Email", "Purchase Date", "Amount", "Status", "Transaction ID"]
    const csvContent = [
      headers.join(","),
      ...filteredSales.map(sale => [
        sale.buyerName,
        sale.email,
        sale.purchaseDate,
        sale.amount,
        sale.status,
        sale.transactionId
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ticket-sales-${ticketId}.csv`
    a.click()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-2 border-red-600 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading sales data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="bg-red-600 hover:bg-black text-white rounded-lg p-2 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Ticket Sales
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {ticket.streamTitle} • {ticket.ticketType}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className=" bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-600/20 rounded-xl">
                <Ticket className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-green-400 text-sm font-medium">Active</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{ticket.totalSold} Sold</h3>
            <p className="text-gray-400 text-sm">Total tickets purchased</p>
          </div>

          <div className=" bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-600/20 rounded-xl">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-green-400 text-sm font-medium">+15%</span>
            </div>
            <h3 className="text-2xl text-foreground font-bold mb-2">₦{ticket.totalRevenue.toLocaleString()}</h3>
            <p className="text-gray-400 text-sm">Total revenue generated</p>
          </div>

          <div className=" bg-card border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-600/20 rounded-xl">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-red-400 text-sm font-medium">{ticket.availableSlots} left</span>
            </div>
            <h3 className="text-2xl text-foreground font-bold mb-2">{((ticket.totalSold / (ticket.totalSold + ticket.availableSlots)) * 100).toFixed(1)}%</h3>
            <p className="text-gray-400 text-sm">Sales conversion rate</p>
          </div>
        </div>

        {/* Sales Table */}
        <div className=" border border-border bg-card hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Purchase History</h2>
                <p className="text-gray-400 text-sm mt-1">List of all ticket purchases for this event</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search buyers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 bg-transparent  border border-border rounded-xl pl-10 pr-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className=" border bg-transparent border-border rounded-xl px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-transparent">
                  <th className="text-left p-4 font-medium text-gray-400">Buyer</th>
                  <th className="text-left p-4 font-medium text-gray-400">Purchase Date</th>
                  <th className="text-left p-4 font-medium text-gray-400">Amount</th>
                  <th className="text-left p-4 font-medium text-gray-400">Status</th>
                  <th className="text-left p-4 font-medium text-gray-400">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="border-b border-gray-800/50 hover:bg-muted transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-300" />
                        </div>
                        <div>
                          <p className="font-medium">{sale.buyerName}</p>
                          <p className="text-gray-400 text-sm">{sale.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{sale.purchaseDate}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500 font-bold">₦{sale.amount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        sale.status === 'completed' 
                          ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                          : sale.status === 'refunded'
                          ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                          : 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
                      }`}>
                        {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <code className="bg-muted-foreground px-3 py-1 rounded-lg text-sm font-mono">
                        {sale.transactionId}
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className=" p-2 ">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                Showing {filteredSales.length} of {sales.length} purchases
              </p>
              <div className="flex gap-2">
                <button className=" hover:bg-muted text-foreground px-4 py-2 rounded-lg transition-colors">
                  Previous
                </button>
                <button className="bg-muted-foreground hover:bg-muted text-white px-4 py-2 rounded-lg transition-colors">
                  1
                </button>
                <button className="bg-muted-foreground hover:bg-muted text-white px-4 py-2 rounded-lg transition-colors">
                  2
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredSales.length === 0 && (
          <div className="text-center py-16">
            <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No sales found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? "No purchases match your search criteria" : "No purchases have been made yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}