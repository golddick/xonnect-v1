import { emailShell } from "./_shared"

export function securityAlertTemplate(input: {
  fullName?: string | null
  deviceInfo?: string | null
  location?: string | null
  suspicious?: boolean
}) {
  const name = input.fullName?.trim() || "there"
  const suspiciousNote = input.suspicious
    ? "This login looks unusual compared with your normal activity."
    : "This login completed successfully."

  return emailShell({
    preview: "A login just happened on your Xonnect account.",
    title: "Security alert",
    intro: `Hi ${name}, we detected a sign-in on your Xonnect account.`,
    body: `
      <p style="margin:0 0 12px;">${suspiciousNote}</p>
      <ul style="margin:0;padding-left:18px;color:#1f2937;">
        <li style="margin-bottom:8px;"><strong>Time:</strong> ${new Date().toLocaleString()}</li>
        <li style="margin-bottom:8px;"><strong>Device:</strong> ${input.deviceInfo || "Not available"}</li>
        <li style="margin-bottom:8px;"><strong>Location:</strong> ${input.location || "Optional / unavailable"}</li>
      </ul>
    `,
    footerNote: "If you do not recognize this activity, change your password and review active sessions immediately.",
  })
}
