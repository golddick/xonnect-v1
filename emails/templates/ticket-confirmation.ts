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
  qrImageDataUrl?: string | null
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

function buildDetailsRows(input: TicketConfirmationTemplateInput) {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Event:</strong> ${input.eventTitle}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Ticket:</strong> ${input.ticketType}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Access:</strong> ${input.access === "VENUE" ? "Venue" : "Streaming"}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Quantity:</strong> ${input.quantity}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Total paid:</strong> ${formatMoney(input.amount)}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Ticket code:</strong> ${input.ticketCode}</td>
      </tr>
      ${
        formatDate(input.eventDate)
          ? `<tr><td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Date:</strong> ${formatDate(input.eventDate)}</td></tr>`
          : ""
      }
      ${
        input.location
          ? `<tr><td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Location:</strong> ${input.location}</td></tr>`
          : ""
      }
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
    input.access === "VENUE" && input.qrImageDataUrl
      ? `
        <div style="margin:24px 0 8px;padding:18px;border:1px solid #e5e7eb;border-radius:18px;background:#fafafa;text-align:center;">
          <img src="${input.qrImageDataUrl}" alt="Venue ticket QR code" style="display:block;margin:0 auto;width:240px;max-width:100%;height:auto;" />
          <p style="margin:14px 0 0;font-size:13px;line-height:1.6;color:#6b7280;">Present this QR code at the venue gate. It includes the platform logo for quick identification.</p>
        </div>
      `
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
      ${buildDetailsRows(input)}
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
