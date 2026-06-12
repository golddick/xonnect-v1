import React from 'react'

interface EmailModelProps {
    companyName?: string;
    email?: string;
    emailMessage?: string;
    setEmailMessage?: (message: string) => void;
    setShowEmailModal?: (show: boolean) => void;
    handleSendEmail?: () => void;
}

const EmailModel = (props: EmailModelProps) => {
  return (
     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl w-full max-w-md p-6 space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
              Send Email to {props.companyName}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Recipient Email</label>
              <input
                type="email"
                value={props.email || ""}
                disabled
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-400 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                value={props.emailMessage || ""}
                onChange={(e) => props.setEmailMessage && props.setEmailMessage(e.target.value)}
                placeholder="Write your message..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 h-32 resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => props.setShowEmailModal && props.setShowEmailModal(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => props.handleSendEmail && props.handleSendEmail()}
                disabled={!props.emailMessage?.trim()}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
  )
}

export default EmailModel