import { emailShell } from "./_shared"

export function creatorPlatformNotificationTemplate(input: {
  fullName?: string | null
  message: string
}) {
  const name = input.fullName?.trim() || "Creator"
  const formattedMessage = input.message
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p style="margin:0 0 16px;">${line}</p>`)
    .join("")

  return emailShell({
    preview: "Important update from Xonnect",
    title: `Hello ${name}, important update from Xonnect`,
    intro: `We are reaching out with an update to your creator account.`,
    body: formattedMessage,
    buttonText: "Open Xonnect",
    buttonHref: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://xonnect.net"}`,
    footerNote: "If you have questions, please contact Xonnect support.",
  })
}
