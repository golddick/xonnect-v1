"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Download, Loader2, Search, Users, Eye } from "lucide-react"

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

  const stats = useMemo(() => {
    const sold = sales.filter((sale) => sale.status.toLowerCase() === "completed").length
    const revenue = sales
      .filter((sale) => sale.status.toLowerCase() === "completed")
      .reduce((sum, sale) => sum + sale.amount, 0)

    return {
      sold,
      revenue,
      total: sales.length,
      remaining: ticket ? Math.max(ticket.quantity - ticket.soldCount, 0) : 0,
    }
  }, [sales, ticket])

  const exportCsv = () => {
    const headers = ["Buyer Name", "Email", "Purchase Date", "Amount", "Status", "Transaction ID"]
    const rows = sales.map((sale) => [
      sale.buyerName,
      sale.buyerEmail,
      sale.purchaseDate,
      sale.amount,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 text-foreground">
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-red-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 text-foreground md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Ticket Sales</h1>
          <p className="text-sm text-muted-foreground">
            {ticket?.event.title ?? "Ticket"} - {ticket?.ticketType ?? ""}
          </p>
        </div>

        {error && <div className="rounded-2xl border border-red-600/30 bg-red-600/10 px-4 py-3 text-sm text-red-400">{error}</div>}

        {ticket && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">Sold</p>
              <p className="mt-2 text-2xl font-bold">{stats.sold}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="mt-2 text-2xl font-bold text-yellow-500">NGN {stats.revenue.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="mt-2 text-2xl font-bold">{stats.remaining}</p>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Purchase History</h2>
              <p className="text-sm text-muted-foreground">Search, filter, and export ticket purchases.</p>
            </div>
            <button type="button" onClick={exportCsv} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-border bg-transparent pl-9 pr-4 py-3"
                  placeholder="Buyer name, email, or transaction id"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3"
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

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border text-sm text-muted-foreground">
                  <th className="py-3 pr-4">Buyer</th>
                  <th className="py-3 pr-4">Date</th>
                  <th className="py-3 pr-4">Amount</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">Transaction</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="border-b border-border/50">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{sale.buyerName}</p>
                          <p className="text-sm text-muted-foreground">{sale.buyerEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(sale.purchaseDate).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3 pr-4 font-medium text-yellow-500">NGN {sale.amount.toLocaleString()}</td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full border border-border px-3 py-1 text-xs uppercase">
                        {sale.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-mono text-sm">{sale.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sales.length === 0 && (
            <div className="py-14 text-center">
              <Eye className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-3 text-muted-foreground">No purchases matched your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
