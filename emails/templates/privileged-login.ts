import { emailShell } from "./_shared"

type PrivilegedLoginTemplateInput = {
  fullName?: string | null
  roleLabel: string
  audience: "admin" | "system"
  deviceInfo?: string | null
  location?: string | null
}

export function privilegedLoginTemplate(input: PrivilegedLoginTemplateInput) {
  const name = input.fullName?.trim() || "there"
  const isSystemAudience = input.audience === "system"
  const loginTime = new Date().toLocaleString()

  return emailShell({
    preview: `${input.roleLabel} login alert for Xonnect.`,
    title: `${input.roleLabel} login alert`,
    intro: isSystemAudience
      ? `A ${input.roleLabel.toLowerCase()} account just signed in to the superadmin dashboard.`
      : `Hi ${name}, your ${input.roleLabel.toLowerCase()} account just signed in to the superadmin dashboard.`,
    body: `
      <p style="margin:0 0 12px;">This sign-in was recorded for audit and security monitoring.</p>
      <ul style="margin:0;padding-left:18px;color:#1f2937;">
        <li style="margin-bottom:8px;"><strong>Time:</strong> ${loginTime}</li>
        <li style="margin-bottom:8px;"><strong>Device:</strong> ${input.deviceInfo || "Not available"}</li>
        <li style="margin-bottom:8px;"><strong>Location:</strong> ${input.location || "Optional / unavailable"}</li>
      </ul>
      <p style="margin:16px 0 0;">If this login was not expected, review access immediately.</p>
    `,
    buttonText: "Open Superadmin Dashboard",
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/superadmin/dashboard`,
    footerNote: isSystemAudience
      ? "This is an internal audit notification generated after a privileged login."
      : "If you did not sign in, change your password and review access immediately.",
  })
}
