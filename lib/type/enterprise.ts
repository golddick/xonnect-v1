export interface EnterpriseRequest {
  id: string
  company: string
  contactPerson: string
  email: string
  phone: string
  industry: string
  requestDate: string
  status: "pending" | "approved" | "rejected"
  notes: string
  estimatedUsers: number
}

export interface EmailTemplate {
  subject: string
  body: string
}

export interface StatCardProps {
  label: string
  value: string
  icon: any
  color: string
}

export interface RequestListProps {
  requests: EnterpriseRequest[]
  searchTerm: string
  filterStatus: string
  onSearchChange: (value: string) => void
  onFilterChange: (value: string) => void
  onViewDetails: (request: EnterpriseRequest) => void
  onSendEmail: (request: EnterpriseRequest) => void
}

export interface ApprovedAccountsProps {
  requests: EnterpriseRequest[]
  onSendEmail: (request: EnterpriseRequest) => void
}

export interface DetailsModalProps {
  request: EnterpriseRequest
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onSendEmail: () => void
}

export interface EmailModalProps {
  request: EnterpriseRequest
  emailContent: { subject: string; body: string }
  onEmailContentChange: (content: { subject: string; body: string }) => void
  onClose: () => void
  onSend: () => void
}