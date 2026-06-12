"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, Mail, Send, CheckCircle, AlertCircle, XCircle, Eye, Trash2, Plus, Search, X, Clock, User, FileText, Phone } from "lucide-react"
import { EnterpriseRequest } from "@/lib/type/enterprise"
import StatsOverview from "./StatsOverview"
import RequestList from "./RequestList"
import ApprovedAccounts from "./ApprovedAccounts"
import Communications from "./Communications"
import DetailsModal from "./DetailsModal"
import EmailModal from "./EmailModel"


// Mock data
const mockRequests: EnterpriseRequest[] = [
  {
    id: "ENT-001",
    company: "TechCorp Nigeria Ltd",
    contactPerson: "Ade Okafor",
    email: "ade.okafor@techcorp.com",
    phone: "+234 701 234 5678",
    industry: "Technology",
    requestDate: "2024-01-20",
    status: "pending",
    notes: "Interested in white-label solution for internal training",
    estimatedUsers: 500,
  },
  {
    id: "ENT-002",
    company: "Global Media Group",
    contactPerson: "Chioma Adeyemi",
    email: "chioma@globalmedia.com",
    phone: "+234 802 567 8901",
    industry: "Media & Entertainment",
    requestDate: "2024-01-15",
    status: "approved",
    notes: "Approved for enterprise streaming package",
    estimatedUsers: 2000,
  },
  {
    id: "ENT-003",
    company: "Education Excellence Ltd",
    contactPerson: "Dr. Emeka Nwosu",
    email: "emeka@eceducation.com",
    phone: "+234 810 123 4567",
    industry: "Education",
    requestDate: "2024-01-10",
    status: "pending",
    notes: "Looking for LMS integration and custom branding",
    estimatedUsers: 1500,
  },
  {
    id: "ENT-004",
    company: "Creative Studios Africa",
    contactPerson: "Tunde Afolabi",
    email: "tunde@creativestudios.com",
    phone: "+234 703 987 6543",
    industry: "Creative Services",
    requestDate: "2024-01-05",
    status: "rejected",
    notes: "Request rejected due to compliance issues",
    estimatedUsers: 300,
  },
]

export default function SuperAdminEnterpriseManagement() {
  const [activeTab, setActiveTab] = useState("requests")
  const [selectedRequest, setSelectedRequest] = useState<EnterpriseRequest | null>(null)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [emailContent, setEmailContent] = useState({
    subject: "",
    body: "",
  })
  const [requests, setRequests] = useState<EnterpriseRequest[]>(mockRequests)

  const filteredRequests = requests
    .filter(
      (r) =>
        r.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((r) => filterStatus === "all" || r.status === filterStatus)

  const pendingRequests = requests.filter((r) => r.status === "pending").length
  const approvedRequests = requests.filter((r) => r.status === "approved").length
  const totalUsers = requests.filter((r) => r.status === "approved").reduce((sum, r) => sum + r.estimatedUsers, 0)

  const handleApprove = (requestId: string) => {
    setRequests(requests.map(r => 
      r.id === requestId ? { ...r, status: "approved" as const } : r
    ))
    setShowDetailsModal(false)
  }

  const handleReject = (requestId: string) => {
    setRequests(requests.map(r => 
      r.id === requestId ? { ...r, status: "rejected" as const } : r
    ))
    setShowDetailsModal(false)
  }

  const handleSendEmail = () => {
    if (!emailContent.subject || !emailContent.body) {
      alert("Please fill in all email fields")
      return
    }
    alert(`Email sent to ${selectedRequest?.email}!`)
    setShowEmailModal(false)
    setEmailContent({ subject: "", body: "" })
  }

  const tabs = [
    { key: "requests", label: "Enterprise Requests" },
    { key: "approved", label: "Approved Accounts" },
    { key: "communications", label: "Communications" },
  ]

  const stats = [
    {
      label: "Pending Requests",
      value: pendingRequests.toString(),
      icon: Clock,
      color: "text-yellow-400",
    },
    {
      label: "Approved",
      value: approvedRequests.toString(),
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      label: "Total Enterprise Users",
      value: `${(totalUsers / 1000).toFixed(1)}K`,
      icon: User,
      color: "text-blue-400",
    },
    {
      label: "Total Requests",
      value: requests.length.toString(),
      icon: Building2,
      color: "text-purple-400",
    },
  ] 

  return (
    <div className="min-h-screen bg-background text-foreground ">
      {/* Header */}
       <div className="border-b border-border bg-transparent backdrop-blur-sm sticky p-4 top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Enterprise Management</h1>
        </div>

      </div>
    </div>

    <div className=" p-8"> 
        {/* Stats Overview */}
      <StatsOverview stats={stats} />

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 whitespace-nowrap text-sm font-medium transition-all border-b-2 ${
              activeTab === tab.key 
                ? "border-red-600 text-foreground" 
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "requests" && (
          <RequestList
            requests={filteredRequests}
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            onSearchChange={setSearchTerm}
            onFilterChange={setFilterStatus}
            onViewDetails={(request) => {
              setSelectedRequest(request)
              setShowDetailsModal(true)
            }}
            onSendEmail={(request) => {
              setSelectedRequest(request)
              setShowEmailModal(true)
            }}
          />
        )}

        {activeTab === "approved" && (
          <ApprovedAccounts
            requests={requests.filter(r => r.status === "approved")}
            onSendEmail={(request) => {
              setSelectedRequest(request)
              setShowEmailModal(true)
            }}
          />
        )}

        {activeTab === "communications" && (
          <Communications />
        )}
      </div>
    </div>

      {/* Modals */}
      <AnimatePresence>
        {showDetailsModal && selectedRequest && (
          <DetailsModal
            request={selectedRequest}
            onClose={() => setShowDetailsModal(false)}
            onApprove={handleApprove}
            onReject={handleReject}
            onSendEmail={() => {
              setShowDetailsModal(false)
              setShowEmailModal(true)
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEmailModal && selectedRequest && (
          <EmailModal
            request={selectedRequest}
            emailContent={emailContent}
            onEmailContentChange={setEmailContent}
            onClose={() => setShowEmailModal(false)}
            onSend={handleSendEmail}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
