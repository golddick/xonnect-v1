import { emailShell } from "./_shared"

export function otpSuccessTemplate(input: { fullName?: string | null }) {
  const name = input.fullName?.trim() || "there"
  return emailShell({
    preview: "Your OTP login succeeded.",
    title: "Welcome back to Xonnect",
    intro: `Hi ${name}, your one-time code has been verified.`,
    body: `
      <p style="margin:0 0 12px;">You can continue using Xonnect normally now. If this wasn't you, secure your account immediately.</p>
      <p style="margin:0;">We also sent a security alert for this login.</p>
    `,
    buttonText: "Go to Dashboard",
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
  })
}
