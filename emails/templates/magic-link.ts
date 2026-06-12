import { emailShell } from "./_shared"

export function magicLinkTemplate(input: { fullName?: string | null; url: string }) {
  const name = input.fullName?.trim() || "there"
  return emailShell({
    preview: "Click the link to sign in to Xonnect.",
    title: "Your Xonnect sign-in link",
    intro: `Hi ${name}, use the button below to finish signing in.`,
    body: `
      <p style="margin:0 0 12px;">This link expires soon and can only be used once.</p>
      <p style="margin:0;">If the button does not work, copy and paste the fallback link into your browser.</p>
      <p style="margin:16px 0 0;word-break:break-all;font-size:13px;color:#6b7280;">${input.url}</p>
    `,
    buttonText: "Continue to Xonnect",
    buttonHref: input.url,
  })
}
