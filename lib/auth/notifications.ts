import { sendEmail } from "@/lib/auth/dropaphi-client"
import { securityAlertTemplate } from "@/emails/templates/security-alert"
import { privilegedLoginTemplate } from "@/emails/templates/privileged-login"
import { otpSuccessTemplate } from "@/emails/templates/otp"
import { welcomeBackTemplate } from "@/emails/templates/welcome-back"
import { welcomeTemplate } from "@/emails/templates/welcome"

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

