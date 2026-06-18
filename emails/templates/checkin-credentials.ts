import { emailShell } from "./_shared"

type CheckInCredentialsTemplateInput = {
  fullName?: string | null
  eventTitle: string
  gateName: string
  username: string
  password: string
  loginUrl?: string
}

export function checkinCredentialsTemplate(input: CheckInCredentialsTemplateInput) {
  const name = input.fullName?.trim() || "there"
  const loginUrl = input.loginUrl || `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkin`

  return emailShell({
    preview: "Your check-in account login details.",
    title: "Check-in account created",
    intro: `Hi ${name}, your check-in account for ${input.eventTitle} is ready.`,
    body: `
      <p style="margin:0 0 12px;">Use the credentials below to sign in at your assigned gate.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Event:</strong> ${input.eventTitle}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Gate:</strong> ${input.gateName}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Username:</strong> ${input.username}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Password:</strong> ${input.password}</td>
        </tr>
      </table>
      <p style="margin:16px 0 0;">Change the password after the first login if your workflow allows it.</p>
    `,
    buttonText: "Open Check-in",
    buttonHref: loginUrl,
    footerNote: "Keep these credentials private. They were generated for event check-in access.",
  })
}
