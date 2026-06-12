import { emailShell } from "./_shared"

export function welcomeTemplate(input: { fullName?: string | null }) {
  const name = input.fullName?.trim() || "there"
  return emailShell({
    preview: "Your Xonnect account is ready.",
    title: "Welcome to Xonnect",
    intro: `Hi ${name}, your account has been created successfully.`,
    body: `
      <p style="margin:0 0 12px;">You are in. Xonnect is ready for event creation, discovery, and creator workflows.</p>
      <p style="margin:0;">Use the email link or OTP flow to continue whenever you return.</p>
    `,
    buttonText: "Open Xonnect",
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/login`,
  })
}
