// "use client"

// import { useState } from "react"
// import { Search, Filter, Download, CheckCircle, Clock, XCircle, Mail, Eye } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import SuperAdminSidebar from "../_component/superadmin-sidebar"
// import EmailModel from "@/components/common_component/Email-model"

// const EnterprisePartnershipPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filterStatus, setFilterStatus] = useState("all")
//   const [showEmailModal, setShowEmailModal] = useState(false)
//   const [selectedRequest, setSelectedRequest] = useState<any>(null)
//   const [emailMessage, setEmailMessage] = useState("")

//   const requests = [
//     {
//       id: 1,
//       companyName: "TechCorp Solutions",
//       contactName: "David Chen",
//       email: "david@techcorp.com",
//       phone: "+1 (555) 123-4567",
//       industry: "Technology",
//       requestDate: "2024-02-10",
//       status: "pending",
//       description: "Looking to stream quarterly tech events",
//       companySize: "500-1000 employees",
//       annualRevenue: "$50M-$100M",
//     },
//     {
//       id: 2,
//       companyName: "Sports Entertainment LLC",
//       contactName: "Maria Garcia",
//       email: "maria@sportsent.com",
//       phone: "+1 (555) 234-5678",
//       industry: "Sports",
//       requestDate: "2024-02-08",
//       status: "approved",
//       description: "Broadcasting live sports events and tournaments",
//       companySize: "100-500 employees",
//       annualRevenue: "$20M-$50M",
//     },
//     {
//       id: 3,
//       companyName: "Global Music Group",
//       contactName: "Alex Kumar",
//       email: "alex@musicgroup.com",
//       phone: "+1 (555) 345-6789",
//       industry: "Music",
//       requestDate: "2024-02-12",
//       status: "rejected",
//       description: "Concert streaming and artist collaborations",
//       companySize: "1000+ employees",
//       annualRevenue: "$100M+",
//     },
//     {
//       id: 4,
//       companyName: "EduLearn Platform",
//       contactName: "Sarah Williams",
//       email: "sarah@edulearn.com",
//       phone: "+1 (555) 456-7890",
//       industry: "Education",
//       requestDate: "2024-02-15",
//       status: "pending",
//       description: "Educational courses and certification programs",
//       companySize: "50-100 employees",
//       annualRevenue: "$5M-$20M",
//     },
//   ]

//   const filteredRequests = requests.filter((request) => {
//     const matchesSearch =
//       request.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.email.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesFilter = filterStatus === "all" || request.status === filterStatus
//     return matchesSearch && matchesFilter
//   })

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "approved":
//         return "bg-green-500/20 text-green-400 border-green-500/30"
//       case "pending":
//         return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
//       case "rejected":
//         return "bg-red-500/20 text-red-400 border-red-500/30"
//       default:
//         return "bg-gray-500/20 text-muted-foreground border-gray-500/30"
//     }
//   }

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "approved":
//         return <CheckCircle className="w-4 h-4 text-green-400" />
//       case "pending":
//         return <Clock className="w-4 h-4 text-yellow-400" />
//       case "rejected":
//         return <XCircle className="w-4 h-4 text-red-400" />
//       default:
//         return <Eye className="w-4 h-4 text-muted-foreground" />
//     }
//   }

//   const handleSendEmail = () => {
//     console.log("Sending email to:", selectedRequest?.email)
//     console.log("Message:", emailMessage)
//     alert("Email sent successfully!")
//     setShowEmailModal(false)
//     setEmailMessage("")
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <div className="flex">

//         <div className="flex-1 w-full">
//           <div className="border-b border-border bg-transparent backdrop-blur-sm sticky p-4 top-0 z-10">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold">Enterprise Partnership</h1>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//                   <Input
//                     placeholder="Search partnerships..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 bg-muted border-border text-foreground w-64"
//                   />
//                 </div>
//                 <Button variant="outline" size="sm" className="border-border bg-transparent">
//                   <Filter className="w-4 h-4 mr-2" />
//                   Filter
//                 </Button>
//                 <Button variant="outline" size="sm" className="border-border bg-transparent">
//                   <Download className="w-4 h-4 mr-2" />
//                   Export
//                 </Button>
//               </div>
//             </div>
//           </div>

//           <div className="p-8">
//             <div className="flex gap-4 mb-6">
//               {["all", "pending", "approved", "rejected"].map((status) => (
//                 <button
//                   key={status}
//                   onClick={() => setFilterStatus(status)}
//                   className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                     filterStatus === status ? "bg-red-600 text-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
//                   }`}
//                 >
//                   {status.charAt(0).toUpperCase() + status.slice(1)}
//                 </button>
//               ))}
//             </div>

//             <Card className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 text-foreground">
//               <CardContent className="p-0">
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="border-b border-border">
//                       <tr>
//                         <th className="text-left p-4 font-semibold">Company</th>
//                         <th className="text-left p-4 font-semibold">Contact</th>
//                         <th className="text-left p-4 font-semibold">Industry</th>
//                         <th className="text-left p-4 font-semibold">Status</th>
//                         <th className="text-left p-4 font-semibold">Request Date</th>
//                         <th className="text-left p-4 font-semibold">Company Size</th>
//                         <th className="text-center p-4 font-semibold">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredRequests.map((request) => (
//                         <tr
//                           key={request.id}
//                           className="border-b border-border hover:bg-muted/50 transition-colors"
//                         >
//                           <td className="p-4">
//                             <p className="font-medium">{request.companyName}</p>
//                           </td>
//                           <td className="p-4">
//                             <div>
//                               <p className="font-medium text-sm">{request.contactName}</p>
//                               <p className="text-muted-foreground text-xs">{request.email}</p>
//                             </div>
//                           </td>
//                           <td className="p-4">{request.industry}</td>
//                           <td className="p-4">
//                             <div className="flex items-center space-x-2">
//                               {getStatusIcon(request.status)}
//                               <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
//                             </div>
//                           </td>
//                           <td className="p-4 text-muted-foreground text-sm">{request.requestDate}</td>
//                           <td className="p-4 text-sm">{request.companySize}</td>
//                           <td className="p-4 text-center">
//                            <div className="flex items-center justify-center gap-2">
//                                <button
//                               onClick={() => {
//                                 setSelectedRequest(request)
//                                 setShowEmailModal(true)
//                               }}
//                               className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
//                             >
//                               <Eye className="w-4 h-4 text-red-400" />
//                             </button>
//                              <button
//                               onClick={() => {
//                                 setSelectedRequest(request)
//                                 setShowEmailModal(true)
//                               }}
//                               className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
//                             >
//                               <Mail className="w-4 h-4 text-blue-400" />
//                             </button>
//                            </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {showEmailModal && (
//         <EmailModel
//           companyName={selectedRequest?.companyName}
//           email={selectedRequest?.email}
//           emailMessage={emailMessage}
//           setEmailMessage={setEmailMessage}
//           setShowEmailModal={setShowEmailModal}
//           handleSendEmail={handleSendEmail}
//         />
//       )}
//     </div>
//   )
// }

// export default EnterprisePartnershipPage




import SuperAdminEnterpriseManagement from '@/app/(xonnect_superadmin)/superadmin/enterprise-partnership/_component/superadmin-enterprise-management'
import React from 'react'

const page = () => {
  return (
    <div>
      <SuperAdminEnterpriseManagement/>
    </div>
  )
}

export default page
