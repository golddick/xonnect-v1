export interface TicketRecord {
  id: string
  creator: string
  creatorEmail: string
  eventName: string
  ticketType: string
  totalIssued: number
  totalSold: number
  revenue: number
  creatorRevenue: number
  platformRevenue: number
  access: string
  createdDate: string
  status: "active" | "inactive" | "archived"
  platform: "streaming" | "physical" | "hybrid"
  purchases?: Array<{
    id: string
    buyer: string
    amount: number
    creatorRevenue: number
    platformRevenue: number
    status: string
    transactionId: string
    date: string
  }>
}

export interface Transaction {
  id: string
  creator: string
  buyer: string
  amount: number
  ticketType: string
  date: string
  status: "completed" | "pending" | "failed"
  transactionId: string
}