import { emailShell } from "./_shared"

type EventLiveNotificationTemplateInput = {
  fullName?: string | null
  eventTitle: string
  eventDate?: string | null
  location?: string | null
  watchUrl: string
  ticketCode?: string
  isTicketHolder: boolean
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

export function eventLiveNotificationTemplate(input: EventLiveNotificationTemplateInput) {
  const name = input.fullName?.trim() || "there"
  const title = input.isTicketHolder
    ? `Your event ${input.eventTitle} is live now`
    : `${input.eventTitle} is live now`

  const intro = `Hi ${name}, ${input.eventTitle} has just gone live. Join now to watch the experience live.`

  const details = `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      ${input.ticketCode ? `<tr><td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Ticket code:</strong> ${input.ticketCode}</td></tr>` : ""}
      ${formatDate(input.eventDate) ? `<tr><td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Starts:</strong> ${formatDate(input.eventDate)}</td></tr>` : ""}
      ${input.location ? `<tr><td style="padding:10px 0;border-top:1px solid #e5e7eb;"><strong>Location:</strong> ${input.location}</td></tr>` : ""}
    </table>
  `

  return emailShell({
    preview: `${title} — join the live stream now.`,
    title,
    intro,
    body: `
      ${details}
      <div style="margin-top:24px;padding:18px;border:1px solid #e5e7eb;border-radius:18px;background:#fafafa;text-align:center;">
        <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#111827;">Watch the event live now</p>
        <a href="${input.watchUrl}" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;padding:14px 20px;border-radius:12px;font-weight:600;">Join live stream</a>
      </div>
    `,
    footerNote: "Open the link above to join the event while the live stream is in progress.",
  })
}
