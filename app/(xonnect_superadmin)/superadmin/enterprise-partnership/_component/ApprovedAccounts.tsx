"use client"

import { ApprovedAccountsProps } from "@/lib/type/enterprise"
import { motion } from "framer-motion"

export default function ApprovedAccounts({ requests, onSendEmail }: ApprovedAccountsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-foreground mb-8">Approved Enterprise Accounts</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Company</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Contact</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Email</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Users</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Approved Date</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b border-border/50 hover:bg-card/30 transition-colors">
                <td className="py-4 px-4 font-bold text-foreground">{request.company}</td>
                <td className="py-4 px-4 text-muted-foreground">{request.contactPerson}</td>
                <td className="py-4 px-4 text-red-400">{request.email}</td>
                <td className="py-4 px-4 text-muted-foreground">{request.estimatedUsers.toLocaleString()}</td>
                <td className="py-4 px-4 text-muted-foreground">{request.requestDate}</td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => onSendEmail(request)}
                    className="text-green-400 hover:text-green-300 transition-colors duration-300 text-xs font-medium"
                  >
                    Send Email
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
