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
  qrImageUrls?: string[]
  documentUrl?: string | null
}

function formatMoney(amount: number) {
  if (!amount || amount <= 0) return "Free"
  return `NGN ${amount.toLocaleString()}`
}

function formatDateParts(dateString?: string | null) {
  if (!dateString) return null

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return null

  const day = new Intl.DateTimeFormat("en-NG", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)

  const time = new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date)

  return { day, time }
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

const COLORS = {
  page: "#e9edf2",
  card: "#ffffff",
  ink: "#0b1526",
  body: "#1f2937",
  muted: "#6b7280",
  faint: "#9ca3af",
  border: "#e5e7eb",
  hairline: "#eef1f5",
  accent: "#2563eb",
}

function detailCell(label: string, value: string, opts?: { full?: boolean }) {
  const full = opts?.full
  return `
    <td valign="top" ${full ? 'colspan="2" width="100%"' : 'width="50%"'} style="padding:0 10px 0 0;">
      <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${COLORS.faint};font-weight:700;">${escapeHtml(label)}</div>
      <div style="margin-top:6px;font-size:15px;line-height:1.4;color:${COLORS.body};font-weight:600;">${escapeHtml(value)}</div>
    </td>
  `
}

function detailRow(cells: string[]) {
  return `
    <tr>
      ${cells.join("")}
    </tr>
  `
}

/** A single ticket "stub": QR (venue) or code (stream) with a perforated edge. */
function buildTicketStub(args: {
  index: number
  count: number
  code: string
  qrUrl?: string
  isVenue: boolean
}) {
  const { index, count, code, qrUrl, isVenue } = args
  const stubLabel = count > 1 ? `Ticket ${index + 1} of ${count}` : "Admit one"

  const media = isVenue && qrUrl
    ? `
        <img
          src="${escapeHtml(qrUrl)}"
          width="212"
          alt="Scan this QR code at the gate"
          style="display:block;width:212px;max-width:74%;height:auto;margin:0 auto;border:0;outline:none;text-decoration:none;"
        />
        <div style="margin-top:12px;font-size:12px;line-height:1.5;color:${COLORS.muted};">Scan at the venue gate</div>
      `
    : isVenue
      ? `
        <div style="padding:26px 10px;font-size:13px;line-height:1.6;color:${COLORS.muted};">
          Your QR ticket is available in your ticket document.
        </div>
      `
      : `
        <div style="padding:8px 10px;font-size:12px;line-height:1.6;color:${COLORS.muted};">
          Use this code to unlock your livestream.
        </div>
      `

  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;margin:0 0 16px;">
      <tr>
        <td style="background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:18px;overflow:hidden;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding:18px 22px 4px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${COLORS.accent};font-weight:800;">
                      ${escapeHtml(stubLabel)}
                    </td>
                    <td align="right" style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${COLORS.faint};font-weight:700;">
                      ${isVenue ? "Venue entry" : "Livestream"}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:14px 22px 6px;">
                ${media}
              </td>
            </tr>
            <tr>
              <td style="padding:6px 18px 0;">
                <div style="border-top:2px dashed ${COLORS.border};font-size:0;line-height:0;">&nbsp;</div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:14px 22px 20px;">
                <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${COLORS.faint};font-weight:700;">Ticket code</div>
                <div style="margin-top:8px;font-family:'Courier New',Courier,monospace;font-size:18px;letter-spacing:0.16em;font-weight:700;color:${COLORS.ink};word-break:break-all;">
                  ${escapeHtml(code)}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
}

export function ticketConfirmationTemplate(input: TicketConfirmationTemplateInput) {
  const name = input.fullName?.trim() || "there"
  const isVenue = input.access === "VENUE"
  const title = isVenue ? "Your ticket is confirmed" : "Your streaming pass is confirmed"
  const accessLabel = isVenue ? "Venue entry" : "Livestream access"
  const preview = `${input.eventTitle} — ${accessLabel}. Your ${isVenue ? "QR ticket" : "access code"} is inside.`

  const dateParts = formatDateParts(input.eventDate)
  const codes = input.ticketCodes?.length ? input.ticketCodes : [input.ticketCode]
  const qrUrls = input.qrImageUrls ?? []

  const stubs = codes
    .map((code, index) =>
      buildTicketStub({
        index,
        count: codes.length,
        code,
        qrUrl: isVenue ? qrUrls[index] : undefined,
        isVenue,
      })
    )
    .join("")

  const detailRows = [
    detailRow([
      detailCell("Ticket", input.ticketType),
      detailCell("Quantity", String(input.quantity)),
    ]),
    dateParts
      ? detailRow([detailCell("Date", dateParts.day), detailCell("Time", dateParts.time)])
      : "",
    detailRow([
      detailCell("Access", isVenue ? "Venue" : "Streaming"),
      detailCell("Total paid", formatMoney(input.amount)),
    ]),
    input.location ? detailRow([detailCell("Location", input.location, { full: true })]) : "",
  ]
    .filter(Boolean)
    .join(`<tr><td colspan="2" style="padding:10px 0;"><div style="border-top:1px solid ${COLORS.hairline};font-size:0;line-height:0;">&nbsp;</div></td></tr>`)

  const cta = input.documentUrl
    ? `
      <tr>
        <td align="center" style="padding:6px 28px 30px;">
          <a href="${escapeHtml(input.documentUrl)}"
            style="display:inline-block;background:${COLORS.accent};color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 30px;border-radius:12px;">
            View &amp; download ticket
          </a>
        </td>
      </tr>
    `
    : ""

  const footerNote = isVenue
    ? "Keep this email safe and don't share your QR code — anyone who scans it can use your entry. Each code admits one and can only be checked in once."
    : "Keep this ticket code safe. It is required to unlock your streaming access."

  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="x-apple-disable-message-reformatting" />
      <title>${escapeHtml(title)}</title>
    </head>
    <body style="margin:0;padding:0;background:${COLORS.page};font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;color:${COLORS.body};-webkit-font-smoothing:antialiased;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${COLORS.page};padding:28px 14px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:${COLORS.card};border-radius:22px;overflow:hidden;border:1px solid ${COLORS.border};">

              <!-- Hero -->
              <tr>
                <td style="background:${COLORS.ink};padding:26px 28px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td valign="middle">
                        <img src="${getEmailLogoUrl()}" alt="Xonnect" width="118" style="display:block;width:118px;max-width:118px;height:auto;border:0;" />
                      </td>
                      <td valign="middle" align="right">
                        <span style="display:inline-block;background:rgba(255,255,255,0.12);color:#ffffff;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;padding:7px 12px;border-radius:999px;">
                          E-Ticket
                        </span>
                      </td>
                    </tr>
                  </table>
                  <div style="margin-top:22px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#93a4bf;font-weight:700;">${escapeHtml(accessLabel)}</div>
                  <h1 style="margin:8px 0 0;font-size:26px;line-height:1.25;color:#ffffff;font-weight:800;">${escapeHtml(input.eventTitle)}</h1>
                </td>
              </tr>

              <!-- Greeting -->
              <tr>
                <td style="padding:24px 28px 4px;">
                  <p style="margin:0;font-size:16px;line-height:1.6;color:${COLORS.body};">
                    Hi ${escapeHtml(name)}, your ${isVenue ? "ticket" : "streaming pass"} is confirmed. ${isVenue ? "Present the QR code below at the gate." : "Your access code is below."}
                  </p>
                </td>
              </tr>

              <!-- Details -->
              <tr>
                <td style="padding:18px 28px 6px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${COLORS.hairline};border-radius:16px;">
                    <tr>
                      <td style="padding:18px 20px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                          ${detailRows}
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Ticket stubs -->
              <tr>
                <td style="padding:18px 28px 2px;">
                  <div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:${COLORS.faint};font-weight:700;margin-bottom:12px;">
                    ${codes.length > 1 ? `Your ${codes.length} tickets` : "Your ticket"}
                  </div>
                  ${stubs}
                </td>
              </tr>

              ${cta}

              <!-- Footer -->
              <tr>
                <td style="padding:22px 28px 30px;border-top:1px solid ${COLORS.border};">
                  <p style="margin:0;font-size:13px;line-height:1.7;color:${COLORS.muted};">${escapeHtml(footerNote)}</p>
                  <p style="margin:14px 0 0;font-size:12px;line-height:1.6;color:${COLORS.faint};">Sent by Xonnect. If you didn't make this purchase, please contact support.</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `
}
