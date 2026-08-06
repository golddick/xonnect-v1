import { emailShell } from "./_shared"

type TicketConfirmationTemplateInput = {
  fullName?: string | null
  eventTitle: string
  eventDate?: string | null
  location?: string | null
  ticketType: string
  access: "STREAM" | "VENUE"
  quantity: number
  amount: number
  ticketCode: string
  ticketCodes?: string[]
  qrImageDataUrls?: string[]
  documentUrl?: string | null
}

function formatMoney(amount: number) {
  return `NGN ${amount.toLocaleString()}`
}

function formatDate(dateString?: string | null) {
  if (!dateString) return null

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat("en-NG", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

const fallbackLogoUrl =
  process.env.LOGO?.replace(/['"\s]+/g, "") ||
  "https://7slbx1f2rk.ufs.sh/f/u52F0NVYM8eNo1AzAe0qpkWeDK13duNrlR0SM8Lx7AJBQfGU"

function getEmailLogoUrl() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "")
  if (appUrl) {
    return `${appUrl}/xonnect-logo.png`
  }
  return fallbackLogoUrl
}

function buildDetailsRows(input: TicketConfirmationTemplateInput) {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;width:30%;font-weight:700;color:#111827;">Event</td>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;color:#4b5563;">${input.eventTitle}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;font-weight:700;color:#111827;">Ticket</td>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;color:#4b5563;">${input.ticketType}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;font-weight:700;color:#111827;">Access</td>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;color:#4b5563;">${input.access === "VENUE" ? "Venue" : "Streaming"}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;font-weight:700;color:#111827;">Quantity</td>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;color:#4b5563;">${input.quantity}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;font-weight:700;color:#111827;">Total paid</td>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;color:#4b5563;">${formatMoney(input.amount)}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;font-weight:700;color:#111827;">Ticket code</td>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;color:#4b5563;">${input.ticketCode}</td>
      </tr>
      ${
        formatDate(input.eventDate)
          ? `<tr><td style="padding:10px 0;border-top:1px solid #e5e7eb;font-weight:700;color:#111827;">Date</td><td style="padding:10px 0;border-top:1px solid #e5e7eb;color:#4b5563;">${formatDate(input.eventDate)}</td></tr>`
          : ""
      }
      ${
        input.location
          ? `<tr><td style="padding:10px 0;border-top:1px solid #e5e7eb;font-weight:700;color:#111827;">Location</td><td style="padding:10px 0;border-top:1px solid #e5e7eb;color:#4b5563;">${input.location}</td></tr>`
          : ""
      }
    </table>
  `
}

function buildTicketCodesSection(input: TicketConfirmationTemplateInput) {
  if (!input.ticketCodes || input.ticketCodes.length === 0) {
    return ""
  }

  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-top:24px;">
      <tr>
        <td colspan="2" style="padding:12px 0 8px;font-weight:700;color:#111827;">Ticket codes</td>
      </tr>
      ${input.ticketCodes
        .map(
          (code, index) => `
            <tr>
              <td style="padding:8px 0;width:28%;font-weight:700;color:#111827;">Code ${index + 1}</td>
              <td style="padding:8px 0;color:#4b5563;">${code}</td>
            </tr>
          `
        )
        .join("")}
    </table>
  `
}

export function ticketConfirmationTemplate(input: TicketConfirmationTemplateInput) {
  const name = input.fullName?.trim() || "there"
  const title = input.access === "VENUE" ? "Your venue ticket is ready" : "Your streaming ticket is ready"
  const intro =
    input.access === "VENUE"
      ? `Hi ${name}, your venue ticket for ${input.eventTitle} has been confirmed.`
      : `Hi ${name}, your streaming ticket for ${input.eventTitle} has been confirmed.`

  const qrBlock =
    input.access === "VENUE" && input.qrImageDataUrls && input.qrImageDataUrls.length > 0
      ? input.qrImageDataUrls
          .map(
            (qrImageDataUrl, index) => `
        <div style="margin:24px 0 8px;padding:18px;border:1px solid #e5e7eb;border-radius:18px;background:#fafafa;text-align:center;">
          <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#6b7280;font-weight:700;">Ticket QR code ${index + 1}</div>
          <img src="${qrImageDataUrl}" alt="Venue ticket QR code" style="display:block;margin:14px auto 0;width:240px;max-width:100%;height:auto;" />
          <p style="margin:14px 0 0;font-size:13px;line-height:1.6;color:#6b7280;">Present this QR code at the venue gate. It includes the platform logo for quick identification.</p>
        </div>
      `
          )
          .join("")
      : `
        <div style="margin:24px 0 8px;padding:18px;border:1px solid #e5e7eb;border-radius:18px;background:#fafafa;text-align:center;">
          <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#6b7280;font-weight:700;">Ticket code</div>
          <div style="margin-top:12px;font-size:28px;line-height:1.2;font-weight:800;letter-spacing:0.08em;color:#111827;">${input.ticketCode}</div>
          <p style="margin:14px 0 0;font-size:13px;line-height:1.6;color:#6b7280;">Use this ticket code for streaming access.</p>
        </div>
      `

  return emailShell({
    preview: `${title} for ${input.eventTitle}.`,
    title,
    intro,
    body: `
      <div style="text-align:center;margin-bottom:24px;">
        <img src="${getEmailLogoUrl()}" alt="Xonnect logo" style="display:block;margin:0 auto;max-width:160px;height:auto;" />
      </div>
      ${buildDetailsRows(input)}
      ${buildTicketCodesSection(input)}
      ${qrBlock}
    `,
    buttonText: input.documentUrl ? "Open ticket document" : undefined,
    buttonHref: input.documentUrl ?? undefined,
    footerNote:
      input.access === "VENUE"
        ? "Keep this email handy. Your QR ticket and details are attached inline in the message."
        : "Keep this ticket code safe. It is required for your streaming access.",
  })
}
