"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Download, Loader2, Search, Users, Eye, ChevronDown } from "lucide-react"
import LoadingSplash from "@/components/splash_screen/loading-splash"

type SalesResponse = {
  ticket: {
    id: string
    ticketType: string
    price: number
    quantity: number
    soldCount: number
    revenue: number
    access: string
    description: string | null
    event: {
      id: string
      title: string
      status: string
      scheduledAt: string | null
    }
  }
  sales: Array<{
    id: string
    buyerName: string
    buyerEmail: string
    purchaseDate: string
    amount: number
    quantity: number
    status: string
    transactionId: string
  }>
}

export default function TicketSalesPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const ticketId = params.id

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [ticket, setTicket] = useState<SalesResponse["ticket"] | null>(null)
  const [sales, setSales] = useState<SalesResponse["sales"]>([])
  const [error, setError] = useState("")
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const loadSales = async () => {
      try {
        setLoading(true)
        const query = new URLSearchParams()
        if (searchTerm.trim()) query.set("search", searchTerm.trim())
        if (statusFilter !== "all") query.set("status", statusFilter)

        const response = await fetch(`/api/creator/tickets/${ticketId}/sales?${query.toString()}`, {
          cache: "no-store",
        })
        const data = (await response.json()) as SalesResponse & { message?: string }

        console.log(data, 'sales data')

        if (!response.ok) {
          throw new Error(data.message ?? "Failed to load sales")
        }

        if (!active) return

        setTicket(data.ticket)
        setSales(data.sales ?? [])
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load sales")
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadSales()

    return () => {
      active = false
    }
  }, [ticketId, searchTerm, statusFilter])

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const stats = useMemo(() => {
    const completedSales = sales.filter((sale) => sale.status.toLowerCase() === "completed")
    const totalSoldQuantity = completedSales.reduce((sum, sale) => sum + sale.quantity, 0)
    const revenue = completedSales.reduce((sum, sale) => sum + sale.amount, 0)

    return {
      sold: totalSoldQuantity,
      revenue: revenue,
      totalTransactions: sales.length,
      quantity: ticket?.quantity ?? 0,
      remaining: ticket ? Math.max(ticket.quantity - ticket.soldCount, 0) : 0,
    }
  }, [sales, ticket])

  const exportCsv = () => {
    const headers = ["Buyer Name", "Email", "Purchase Date", "Amount", "Quantity", "Status", "Transaction ID"]
    const rows = sales.map((sale) => [
      sale.buyerName,
      sale.buyerEmail,
      formatDateTime(sale.purchaseDate),
      sale.purchaseDate,
      sale.amount,
      sale.quantity,
      sale.status,
      sale.transactionId,
    ])

    const blob = new Blob([headers.join(",") + "\n" + rows.map((row) => row.join(",")).join("\n")], {
      type: "text/csv",
    })
    const url = window.URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = `ticket-sales-${ticketId}.csv`
    anchor.click()
  }

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower === 'completed') return 'border-green-500 text-green-500 bg-green-500/10'
    if (statusLower === 'pending') return 'border-yellow-500 text-yellow-500 bg-yellow-500/10'
    if (statusLower === 'cancelled' || statusLower === 'failed') return 'border-red-500 text-red-500 bg-red-500/10'
    return 'border-gray-500 text-gray-500 bg-gray-500/10'
  }

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
        <LoadingSplash />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 text-foreground">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Back Button */}
        <button 
          type="button" 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold">Ticket Sales</h1>
          <p className="text-sm text-muted-foreground">
            {ticket?.event.title ?? "Ticket"} - {ticket?.ticketType ?? ""}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-2xl border border-red-600/30 bg-red-600/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        {ticket && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="rounded-2xl border border-border bg-card p-4 md:p-5">
              <p className="text-xs md:text-sm text-muted-foreground">Tickets Sold</p>
              <p className="mt-1 md:mt-2 text-xl md:text-2xl font-bold">{stats.sold}</p>
              <p className="text-xs text-muted-foreground">{stats.totalTransactions} transaction{stats.totalTransactions !== 1 ? 's' : ''}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 md:p-5">
              <p className="text-xs md:text-sm text-muted-foreground">Revenue</p>
              <p className="mt-1 md:mt-2 text-xl md:text-2xl font-bold text-yellow-500 truncate">
                NGN {stats.revenue.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 md:p-5">
              <p className="text-xs md:text-sm text-muted-foreground">Total Tickets</p>
              <p className="mt-1 md:mt-2 text-xl md:text-2xl font-bold">{stats.quantity}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 md:p-5">
              <p className="text-xs md:text-sm text-muted-foreground">Remaining</p>
              <p className="mt-1 md:mt-2 text-xl md:text-2xl font-bold">{stats.remaining}</p>
            </div>
          </div>
        )}

        {/* Sales Table */}
        <div className="rounded-2xl border border-border bg-card p-4 md:p-6">
          {/* Header and Export */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-semibold">Purchase History</h2>
            </div>
            <button 
              type="button" 
              onClick={exportCsv} 
              className="inline-flex items-center gap-2 rounded-xl border border-border px-3 md:px-4 py-2 md:py-3 text-sm hover:bg-muted/50 transition-colors w-full sm:w-auto justify-center"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>

          {/* Filters */}
          <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <div className="sm:col-span-1 lg:col-span-2">
              <label className="mb-1.5 md:mb-2 block text-xs md:text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-border bg-transparent pl-9 pr-4 py-2.5 md:py-3 text-sm"
                  placeholder="Search by name, email, or transaction"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 md:mb-2 block text-xs md:text-sm font-medium">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-border bg-transparent px-3 md:px-4 py-2.5 md:py-3 text-sm"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Table - Desktop View */}
          <div className="hidden md:block mt-6 overflow-x-auto">
            <div className="min-w-full">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="py-3 pr-4 font-medium">Buyer</th>
                    <th className="py-3 pr-4 font-medium">Date</th>
                    <th className="py-3 pr-4 font-medium">Amount</th>
                    <th className="py-3 pr-4 font-medium">Qty</th>
                    <th className="py-3 pr-4 font-medium">Status</th>
                    <th className="py-3 pr-4 font-medium">Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                            <Users className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">{sale.buyerName}</p>
                            <p className="text-xs text-muted-foreground truncate">{sale.buyerEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2 text-sm whitespace-nowrap">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span className="text-xs">{formatDateTime(sale.purchaseDate)}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-medium text-yellow-500 text-sm whitespace-nowrap">
                        NGN {sale.amount.toLocaleString()}
                      </td>
                      <td className="py-3 pr-4 font-medium text-sm">{sale.quantity}</td>
                      <td className="py-3 pr-4">
                        <span className={`rounded-full border px-2.5 py-0.5 text-xs uppercase ${getStatusColor(sale.status)}`}>
                          {sale.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs truncate max-w-[120px]">
                        {sale.transactionId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table - Mobile View (Card Layout) */}
          <div className="md:hidden mt-4 space-y-3">
            {sales.map((sale) => (
              <div 
                key={sale.id} 
                className="border border-border rounded-xl p-4 space-y-3 hover:bg-muted/10 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{sale.buyerName}</p>
                      <p className="text-xs text-muted-foreground truncate">{sale.buyerEmail}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleRow(sale.id)}
                    className="p-1 hover:bg-muted rounded-lg transition-colors shrink-0"
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedRow === sale.id ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium">{formatDateTime(sale.purchaseDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="font-medium text-yellow-500">NGN {sale.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Quantity</p>
                    <p className="font-medium">{sale.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs uppercase ${getStatusColor(sale.status)}`}>
                      {sale.status}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedRow === sale.id && (
                  <div className="pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Transaction ID</p>
                      <p className="font-mono text-xs break-all">{sale.transactionId}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sales.length === 0 && (
            <div className="py-10 md:py-14 text-center">
              <Eye className="mx-auto h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
              <p className="mt-3 text-sm md:text-base text-muted-foreground">No purchases matched your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}