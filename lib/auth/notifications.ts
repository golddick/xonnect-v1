import { sendEmail } from "@/lib/auth/dropaphi-client"
import { checkinCredentialsTemplate } from "@/emails/templates/checkin-credentials"
import { securityAlertTemplate } from "@/emails/templates/security-alert"
import { privilegedLoginTemplate } from "@/emails/templates/privileged-login"
import { otpSuccessTemplate } from "@/emails/templates/otp"
import { ticketConfirmationTemplate } from "@/emails/templates/ticket-confirmation"
import { welcomeBackTemplate } from "@/emails/templates/welcome-back"
import { welcomeTemplate } from "@/emails/templates/welcome"
import { buildTicketPayload, createTicketQrDataUrl } from "@/lib/ticket-media"

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
  purchaseId: string
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

export async function sendTicketConfirmationEmail(context: TicketConfirmationContext) {
  const documentUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/tickets/document/${context.ticketCode}`
  let qrImageDataUrl: string | null = null

  if (context.access === "VENUE") {
    try {
      qrImageDataUrl = await createTicketQrDataUrl(
        buildTicketPayload({
          eventId: context.eventId,
          ticketId: context.ticketId,
          purchaseId: context.purchaseId,
          ticketCode: context.ticketCode,
          quantity: context.quantity,
        })
      )
    } catch (error) {
      console.error("Failed to build venue QR ticket image:", error)
    }
  }

  await sendEmail({
    to: context.email,
    subject:
      context.access === "VENUE"
        ? `Your venue ticket for ${context.eventTitle}`
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
      qrImageDataUrl,
      documentUrl,
    }),
    fromName: DEFAULT_FROM_NAME,
    fromEmail: DEFAULT_FROM_EMAIL,
  })
}
