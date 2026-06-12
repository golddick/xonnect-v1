"use client"

import { DetailsModalProps } from "@/lib/type/enterprise"
import { motion } from "framer-motion"
import { X, Building2, User, Mail, Phone, CheckCircle, XCircle } from "lucide-react"


export default function DetailsModal({
  request,
  onClose,
  onApprove,
  onReject,
  onSendEmail,
}: DetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Request Details</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Company Info */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
              <Building2 className="w-5 h-5 text-red-500" />
              Company Information
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Company Name</p>
                <p className="font-bold text-foreground">{request.company}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Industry</p>
                <p className="font-bold text-foreground">{request.industry}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Estimated Users</p>
                <p className="font-bold text-blue-400">{request.estimatedUsers.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Request Date</p>
                <p className="font-bold text-foreground">{request.requestDate}</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Contact Person</p>
                <p className="font-bold text-foreground">{request.contactPerson}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Email</p>
                <p className="font-bold text-blue-400">{request.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Phone</p>
                <p className="font-bold text-foreground">{request.phone}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold mb-3 text-foreground">Notes</h3>
            <p className="text-muted-foreground text-sm">{request.notes}</p>
          </div>

          {/* Action Buttons */}
          {request.status === "pending" && (
            <div className="flex gap-3">
              <button
                onClick={() => onApprove(request.id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-foreground px-4 py-2 rounded-lg transition-colors duration-300 font-medium text-sm flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={() => onReject(request.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-foreground px-4 py-2 rounded-lg transition-colors duration-300 font-medium text-sm flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </div>
          )}

          <button
            onClick={onSendEmail}
            className="w-full bg-blue-600 hover:bg-blue-700 text-foreground px-4 py-2 rounded-lg transition-colors duration-300 font-medium text-sm flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </button>

          <button
            onClick={onClose}
            className="w-full bg-card hover:bg-card/70 text-foreground px-4 py-2 rounded-lg transition-colors duration-300 border border-border font-medium"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  )
}
