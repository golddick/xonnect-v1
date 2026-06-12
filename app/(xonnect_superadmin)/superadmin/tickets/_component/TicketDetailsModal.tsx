"use client"

import { TicketRecord } from "@/lib/type/superadmin-ticket"
import { motion } from "framer-motion"
import { X, Eye, Download } from "lucide-react"

interface TicketDetailsModalProps {
  selectedTicket: TicketRecord
  onClose: () => void
}

export default function TicketDetailsModal({ selectedTicket, onClose }: TicketDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground hidden-scrollbar max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Ticket Details</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Ticket Info */}
          <div className="bg-card backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-lg">Ticket Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Ticket ID</p>
                <p className="font-bold text-lg">{selectedTicket.id}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Platform</p>
                <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {selectedTicket.platform}
                </span>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Event Name</p>
                <p className="font-bold">{selectedTicket.eventName}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Ticket Type</p>
                <p className="font-bold">{selectedTicket.ticketType}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Created Date</p>
                <p className="font-bold">{selectedTicket.createdDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Status</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    selectedTicket.status === "active"
                      ? "bg-green-600/20 text-green-400"
                      : "bg-yellow-600/20 text-yellow-400"
                  }`}
                >
                  {selectedTicket.status}
                </span>
              </div>
            </div>
          </div>

          {/* Creator Info */}
          <div className="bg-card backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-lg">Creator Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Creator Name</p>
                <p className="font-bold">{selectedTicket.creator}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Email</p>
                <p className="font-bold text-blue-400">{selectedTicket.creatorEmail}</p>
              </div>
            </div>
          </div>

          {/* Sales Stats */}
          <div className="bg-card backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-lg">Sales Statistics</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Total Issued</p>
                <p className="font-bold text-2xl">{selectedTicket.totalIssued}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Sold</p>
                <p className="font-bold text-2xl text-green-400">{selectedTicket.totalSold}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Revenue</p>
                <p className="font-bold text-2xl">₦{(selectedTicket.revenue / 1000000).toFixed(2)}M</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground text-sm mb-2">Sales Progress</p>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-red-600 to-red-500 h-3 rounded-full"
                  style={{ width: `${(selectedTicket.totalSold / selectedTicket.totalIssued) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round((selectedTicket.totalSold / selectedTicket.totalIssued) * 100)}% sold
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-red-600 hover:bg-red-700 text-foreground px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              Review
            </button>
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-foreground px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              className="flex-1 bg-white/10 hover:bg-white/20 text-foreground px-4 py-2 rounded-lg transition-colors border border-white/20 font-medium text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
