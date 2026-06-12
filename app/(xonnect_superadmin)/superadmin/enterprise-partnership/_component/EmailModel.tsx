"use client"

import { EmailModalProps } from "@/lib/type/enterprise"
import { motion } from "framer-motion"
import { X, Send } from "lucide-react"


const emailTemplates = {
  approval: {
    subject: "Enterprise Account Approved - Xonnect",
    body: (contactPerson?: string, company?: string) => 
      `Dear ${contactPerson},\n\nWe are pleased to inform you that your enterprise request for ${company} has been approved.\n\nOur enterprise team will be in touch shortly to discuss your custom requirements and implementation timeline.\n\nBest regards,\nXonnect Enterprise Team`,
  },
  rejection: {
    subject: "Enterprise Request Status - Xonnect",
    body: (contactPerson?: string) => 
      `Dear ${contactPerson},\n\nThank you for your interest in Xonnect's enterprise solutions. Unfortunately, we are unable to process your request at this time.\n\nIf you have any questions or would like to discuss further, please contact our enterprise team.\n\nBest regards,\nXonnect Enterprise Team`,
  },
  followup: {
    subject: (company?: string) => `Follow-up: Enterprise Request for ${company}`,
    body: (contactPerson?: string, requestDate?: string) => 
      `Dear ${contactPerson},\n\nWe wanted to follow up on your enterprise request submitted on ${requestDate}.\n\nPlease let us know if you have any additional questions or if you'd like to schedule a call with our enterprise specialist.\n\nBest regards,\nXonnect Enterprise Team`,
  },
}

export default function EmailModal({
  request,
  emailContent,
  onEmailContentChange,
  onClose,
  onSend,
}: EmailModalProps) {
  const handleTemplateSelect = (template: keyof typeof emailTemplates) => {
    const tpl = emailTemplates[template]
    onEmailContentChange({
      subject: typeof tpl.subject === 'function' ? tpl.subject(request.company) : tpl.subject,
      body: tpl.body(request.contactPerson, 
        template === 'approval' ? request.company : 
        template === 'followup' ? request.requestDate : undefined)
    })
  }

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
          <h2 className="text-2xl font-bold text-foreground">Send Email</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4 p-3 bg-blue-600/20 border border-blue-600/30 rounded-lg">
          <p className="text-blue-400 text-sm">
            To: <span className="font-bold">{request.email}</span>
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Quick Templates</label>
            <div className="flex gap-2 flex-wrap">
              {Object.keys(emailTemplates).map((template) => (
                <button
                  key={template}
                  onClick={() => handleTemplateSelect(template as keyof typeof emailTemplates)}
                  className="bg-card hover:bg-card/70 text-foreground px-3 py-1 rounded text-xs font-medium border border-border transition-colors duration-300 capitalize"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Subject</label>
            <input
              type="text"
              value={emailContent.subject}
              onChange={(e) => onEmailContentChange({ ...emailContent, subject: e.target.value })}
              className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
              placeholder="Email subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
            <textarea
              value={emailContent.body}
              onChange={(e) => onEmailContentChange({ ...emailContent, body: e.target.value })}
              className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 text-sm resize-none"
              placeholder="Email message"
              rows={8}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSend}
            className="flex-1 bg-red-600 hover:bg-red-700 text-foreground px-4 py-2 rounded-lg transition-colors duration-300 font-medium text-sm flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Email
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-card hover:bg-card/70 text-foreground px-4 py-2 rounded-lg transition-colors duration-300 border border-border font-medium text-sm"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  )
}
