import { emailShell } from "./_shared"

export function welcomeBackTemplate(input: { fullName?: string | null }) {
  const name = input.fullName?.trim() || "there"
  return emailShell({
    preview: "You just signed in to Xonnect.",
    title: "Welcome back to Xonnect",
    intro: `Hi ${name}, your password login was successful.`,
    body: `
      <p style="margin:0 0 12px;">Your account is active and ready to use.</p>
      <p style="margin:0;">If you did not sign in, review your account security right away.</p>
    `,
    buttonText: "Open Dashboard",
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
  })
}
