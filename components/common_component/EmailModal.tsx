"use client"

import { X, Send } from "lucide-react"

export interface EmailModalTemplate {
  label: string
  subject: string
  body: string
}

interface EmailModalProps {
  recipientLabel: string
  subject: string
  body: string
  onSubjectChange: (subject: string) => void
  onBodyChange: (body: string) => void
  onClose: () => void
  onSend: () => void
  isBulk?: boolean
  templateOptions?: EmailModalTemplate[]
}

export default function EmailModal({
  recipientLabel,
  subject,
  body,
  onSubjectChange,
  onBodyChange,
  onClose,
  onSend,
  isBulk = false,
  templateOptions,
}: EmailModalProps) {
  const handleTemplateSelect = (template: EmailModalTemplate) => {
    onSubjectChange(template.subject)
    onBodyChange(template.body)
  }

  return (
    <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-3xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Send Email</h2>
            <p className="text-sm text-muted-foreground">
              {isBulk ? "This message will be sent to all creators." : `To: ${recipientLabel}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {templateOptions && templateOptions.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-foreground">Quick Templates</label>
            <div className="flex flex-wrap gap-2">
              {templateOptions.map((template) => (
                <button
                  type="button"
                  key={template.label}
                  onClick={() => handleTemplateSelect(template)}
                  className="px-3 py-2 rounded-full border border-border text-sm text-foreground bg-muted hover:bg-muted/80 transition"
                >
                  {template.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(event) => onSubjectChange(event.target.value)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter email subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Message</label>
            <textarea
              value={body}
              onChange={(event) => onBodyChange(event.target.value)}
              rows={8}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
              placeholder="Write your message here"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onSend}
            disabled={!subject.trim() || !body.trim()}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Send Email
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-border px-4 py-3 text-foreground transition hover:bg-muted"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
