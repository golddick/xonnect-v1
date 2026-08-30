import { sendEmail } from "./dropaphi-client"
import { checkinCredentialsTemplate } from "../../emails/templates/checkin-credentials"
import { eventLiveNotificationTemplate } from "../../emails/templates/event-live-notification"
import { securityAlertTemplate } from "../../emails/templates/security-alert"
import { privilegedLoginTemplate } from "../../emails/templates/privileged-login"
import { otpSuccessTemplate } from "../../emails/templates/otp"
import { ticketConfirmationTemplate } from "../../emails/templates/ticket-confirmation"
import { welcomeBackTemplate } from "../../emails/templates/welcome-back"
import { welcomeTemplate } from "../../emails/templates/welcome"
import { creatorPlatformNotificationTemplate } from "../../emails/templates/creator-platform-notification"

const DEFAULT_FROM_EMAIL = process.env.DROPAPHI_FROM_EMAIL || ''
const DEFAULT_FROM_NAME = process.env.DROPAPHI_FROM_NAME || 'Xonnect'
const SYSTEM_EMAIL = process.env.SYSTEM_EMAIL || ''


type LoginContext = {
  email: string
  fullName?: string | null
  deviceInfo?: string | null
  location?: string | null
  suspicious?: boolean
}

type CheckInCredentialsContext = {
  email: string
  fullName?: string | null
  eventTitle: string
  gateName: string
  username: string
  password: string
}

type TicketConfirmationContext = {
  email: string
  fullName?: string | null
  eventId: string
  eventTitle: string
  eventScheduledAt?: string | null
  location?: string | null
  ticketId: string
  ticketType: string
  access: "STREAM" | "VENUE"
  quantity: number
  amount: number
  ticketCode: string
  ticketItemCodes?: string[]
  purchaseId: string
  documentUrl?: string | null
}

export async function sendWelcomeEmail(context: LoginContext) {
  await sendEmail({
    to: context.email,
    subject: "Welcome to Xonnect",
    html: welcomeTemplate({
      fullName: context.fullName,
    }),
    fromName: DEFAULT_FROM_NAME,
    fromEmail: DEFAULT_FROM_EMAIL,
  })
}

export async function sendWelcomeBackEmail(context: LoginContext) {
  await sendEmail({
    to: context.email,
    subject: "Welcome Back to Xonnect",
    html: welcomeBackTemplate({
      fullName: context.fullName,
    }),
    fromName: DEFAULT_FROM_NAME,
    fromEmail: DEFAULT_FROM_EMAIL,
  })
}

export async function sendCheckInCredentialsEmail(context: CheckInCredentialsContext) {
  await sendEmail({
    to: context.email,
    subject: `Check-in credentials for ${context.eventTitle}`,
    html: checkinCredentialsTemplate({
      fullName: context.fullName,
      eventTitle: context.eventTitle,
      gateName: context.gateName,
      username: context.username,
      password: context.password,
    }),
    fromName: DEFAULT_FROM_NAME,
    fromEmail: DEFAULT_FROM_EMAIL,
  })
}

export async function sendOtpSuccessEmail(context: LoginContext) {
  await sendEmail({
    to: context.email,
    subject: "Welcome Back to Xonnect",
    html: otpSuccessTemplate({
      fullName: context.fullName,
    }),
    fromName: DEFAULT_FROM_NAME,
    fromEmail: DEFAULT_FROM_EMAIL,
  })
}

export async function sendSecurityAlertEmail(context: LoginContext) {
  await sendEmail({
    to: context.email,
    subject: "Security alert for your Xonnect account",
    html: securityAlertTemplate({
      fullName: context.fullName,
      deviceInfo: context.deviceInfo ?? null,
      location: context.location ?? null,
      suspicious: context.suspicious ?? false,
    }),
    fromName: DEFAULT_FROM_NAME,
    fromEmail: DEFAULT_FROM_EMAIL,
  })
}

export async function sendSystemLoginAuditEmail(
  context: LoginContext & { roleLabel: string }
) {
  if (!SYSTEM_EMAIL) {
    throw new Error("Missing SYSTEM_EMAIL")
  }

  await sendEmail({
    to: SYSTEM_EMAIL,
    subject: `${context.roleLabel} login audit for Xonnect`,
    html: privilegedLoginTemplate({
      fullName: context.fullName ?? null,
      roleLabel: context.roleLabel,
      audience: "system",
      deviceInfo: context.deviceInfo ?? null,
      location: context.location ?? null,
    }),
    fromName: DEFAULT_FROM_NAME,
    fromEmail: DEFAULT_FROM_EMAIL,
  })
}

export type CreatorPayoutStatusEmailContext = {
  email: string
  fullName?: string | null
  amount: number
  status: "approved" | "completed" | "rejected"
  note?: string | null
  receiptUrl?: string | null
}

export async function sendCreatorPayoutStatusEmail(context: CreatorPayoutStatusEmailContext) {
  const subject =
    context.status === "completed"
      ? "Your payout has been completed"
      : context.status === "rejected"
        ? "Your payout request was not approved"
        : "Your payout request has been approved"

  const messageLines = [
    `Your payout request for ₦${context.amount.toLocaleString()} has been ${context.status}.`,
  ]

  if (context.note) {
    messageLines.push(`Note: ${context.note}`)
  }

  if (context.receiptUrl) {
    messageLines.push(`Receipt: ${context.receiptUrl}`)
  }

  await sendEmail({
    to: context.email,
    subject,
    html: creatorPlatformNotificationTemplate({
      fullName: context.fullName,
      message: messageLines.join("\n"),
      downloadReceiptUrl: context.receiptUrl ?? null,
    }),
    fromName: DEFAULT_FROM_NAME,
    fromEmail: DEFAULT_FROM_EMAIL,
  })
}

export async function sendTicketConfirmationEmail(context: TicketConfirmationContext) {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/+$/, "")
  const documentUrl = context.documentUrl ?? `${appUrl}/tickets/document/${context.ticketCode}`
  const ticketCodes = context.ticketItemCodes?.length ? context.ticketItemCodes : [context.ticketCode]

  // Venue QR codes are served as hosted PNGs (email clients render neither SVG
  // nor data: URIs). One scannable QR per ticket code.
  const qrImageUrls =
    context.access === "VENUE"
      ? ticketCodes.map((code) => `${appUrl}/tickets/document/${encodeURIComponent(code)}/qr`)
      : []

  await sendEmail({
    to: context.email,
    subject:
      context.access === "VENUE"
        ? `Your ticket for ${context.eventTitle}`
        : `Your streaming ticket for ${context.eventTitle}`,
    html: ticketConfirmationTemplate({
      fullName: context.fullName,
      eventTitle: context.eventTitle,
      eventDate: context.eventScheduledAt ?? null,
      location: context.location ?? null,
      ticketType: context.ticketType,
      access: context.access,
      quantity: context.quantity,
      amount: context.amount,
      ticketCode: context.ticketCode,
      ticketCodes,
      qrImageUrls: qrImageUrls.length ? qrImageUrls : undefined,
      documentUrl,
    }),
    fromName: DEFAULT_FROM_NAME,
    fromEmail: DEFAULT_FROM_EMAIL,
  })
}

export type EventLiveNotificationContext = {
  email: string
  fullName?: string | null
  eventId: string
  eventTitle: string
  eventScheduledAt?: string | null
  location?: string | null
  watchUrl: string
  ticketCode?: string
  isTicketHolder?: boolean
}

export async function sendEventLiveNotificationEmail(context: EventLiveNotificationContext) {
  const subject = context.isTicketHolder
    ? `Your ticketed event ${context.eventTitle} is live now`
    : `${context.eventTitle} is live now`

  await sendEmail({
    to: context.email,
    subject,
    html: eventLiveNotificationTemplate({
      fullName: context.fullName,
      eventTitle: context.eventTitle,
      eventDate: context.eventScheduledAt ?? null,
      location: context.location ?? null,
      watchUrl: context.watchUrl,
      ticketCode: context.ticketCode,
      isTicketHolder: context.isTicketHolder ?? false,
    }),
    fromName: DEFAULT_FROM_NAME,
    fromEmail: DEFAULT_FROM_EMAIL,
  })
}
