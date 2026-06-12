"use client"

import { RequestListProps } from "@/lib/type/enterprise"
import { motion } from "framer-motion"
import { Search, Building2, User, Mail, Phone, Clock, AlertCircle, CheckCircle, XCircle, Eye, Trash2 } from "lucide-react"

export default function RequestList({
  requests,
  searchTerm,
  filterStatus,
  onSearchChange,
  onFilterChange,
  onViewDetails,
  onSendEmail,
}: RequestListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by company or contact..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-card border border-border rounded-lg px-10 py-2 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
            />
          </div>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value)}
          className="bg-card border border-border rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="space-y-4">
        {requests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{request.company}</h3>
                    <p className="text-sm text-muted-foreground">{request.industry}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4 flex-shrink-0" />
                    <span>{request.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{request.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{request.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{request.requestDate}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{request.notes}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                    {request.estimatedUsers.toLocaleString()} users
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === "pending"
                        ? "bg-yellow-600/20 text-yellow-400"
                        : request.status === "approved"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-red-600/20 text-red-400"
                    }`}
                  >
                    {request.status === "pending" && <AlertCircle className="w-3 h-3 inline mr-1" />}
                    {request.status === "approved" && <CheckCircle className="w-3 h-3 inline mr-1" />}
                    {request.status === "rejected" && <XCircle className="w-3 h-3 inline mr-1" />}
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={() => onViewDetails(request)}
                  className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 font-medium text-sm border border-blue-600/30"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">View</span>
                </button>
                <button
                  onClick={() => onSendEmail(request)}
                  className="bg-green-600/20 hover:bg-green-600/30 text-green-400 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 font-medium text-sm border border-green-600/30"
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Email</span>
                </button>
                {request.status === "pending" && (
                  <button className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 font-medium text-sm border border-red-600/30">
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
