import { emailShell } from "./_shared"

export function creatorPlatformNotificationTemplate(input: {
  fullName?: string | null
  message: string
  downloadReceiptUrl?: string | null
}) {
  const name = input.fullName?.trim() || "Creator"
  const formattedMessage = input.message
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p style="margin:0 0 16px;">${line}</p>`)
    .join("")

  const buttonHref = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://xonnect.net"}`

  // If a receipt URL is provided, add a download button that points to it
  const buttonText = input.downloadReceiptUrl ? "Download Receipt" : "Open Xonnect"
  const finalHref = input.downloadReceiptUrl ?? buttonHref

  return emailShell({
    preview: "Important update from Xonnect",
    title: `Hello ${name}, important update from Xonnect`,
    intro: `We are reaching out with an update to your creator account.`,
    body: formattedMessage,
    buttonText,
    buttonHref: finalHref,
    footerNote: "If you have questions, please contact Xonnect support.",
  })
}
