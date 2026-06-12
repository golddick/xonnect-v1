"use client"

import { motion } from "framer-motion"
import { Plus, FileText } from "lucide-react"

export default function Communications() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">Email Templates</h2>
        <button className="bg-red-600 hover:bg-red-700 text-foreground px-6 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 font-medium text-sm">
          <Plus className="w-5 h-5" />
          New Template
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries({
          Approval: "Send approval email to enterprise clients",
          Rejection: "Send rejection email with explanation",
          "Follow-up": "Send follow-up on pending requests",
        }).map(([name, description]) => (
          <div
            key={name}
            className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300"
          >
            <h3 className="font-bold text-lg text-foreground mb-2">{name}</h3>
            <p className="text-muted-foreground text-sm mb-4">{description}</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-foreground px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium">
              Edit Template
            </button>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mt-8">
        <h3 className="font-bold text-lg text-foreground mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          Communication History
        </h3>

        <div className="space-y-4">
          {[
            {
              company: "Global Media Group",
              type: "Approval Email",
              date: "2024-01-15",
              recipient: "chioma@globalmedia.com",
            },
            {
              company: "TechCorp Nigeria Ltd",
              type: "Follow-up Email",
              date: "2024-01-18",
              recipient: "ade.okafor@techcorp.com",
            },
            {
              company: "Education Excellence Ltd",
              type: "Follow-up Email",
              date: "2024-01-22",
              recipient: "emeka@eceducation.com",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-card/30 rounded-lg border border-border hover:bg-card transition-all duration-300"
            >
              <div>
                <p className="font-bold text-sm text-foreground">{item.company}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.type} sent to {item.recipient}
                </p>
              </div>
              <span className="text-xs text-gray-500">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
