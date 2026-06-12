"use client"

import { Transaction } from "@/lib/type/superadmin-ticket"
import { motion } from "framer-motion"
import { CheckCircle, AlertCircle } from "lucide-react"

interface TransactionsTabProps {
  transactions: Transaction[]
}

export default function TransactionsTab({ transactions }: TransactionsTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold mb-8">Transaction History</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Transaction ID</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Creator</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Buyer</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Amount</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Date</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trx) => (
              <tr key={trx.id} className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
                <td className="py-4 px-4 font-mono text-xs">{trx.transactionId}</td>
                <td className="py-4 px-4">{trx.creator}</td>
                <td className="py-4 px-4">{trx.buyer}</td>
                <td className="py-4 px-4 font-bold">₦{trx.amount.toLocaleString()}</td>
                <td className="py-4 px-4">{trx.date}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                      trx.status === "completed"
                        ? "bg-green-600/20 text-green-400"
                        : trx.status === "pending"
                          ? "bg-yellow-600/20 text-yellow-400"
                          : "bg-red-600/20 text-red-400"
                    }`}
                  >
                    {trx.status === "completed" && <CheckCircle className="w-3 h-3" />}
                    {trx.status === "pending" && <AlertCircle className="w-3 h-3" />}
                    {trx.status.charAt(0).toUpperCase() + trx.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
