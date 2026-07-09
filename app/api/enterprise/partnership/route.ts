import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { SuperAdminSettingSection } from "@/lib/generated/prisma"
import { sendEmail } from "@/lib/auth/dropaphi-client"
import { creatorPlatformNotificationTemplate } from "@/emails/templates/creator-platform-notification"
import { normalizeCompanySettings, defaultSuperAdminSettings } from "@/lib/superadmin-settings"

type Body = {
  companyName: string
  contactName: string
  email: string
  phone?: string
  website?: string
  companySize?: string
  industry?: string
  address?: string
  description?: string
  expectedUsers?: string
  budget?: string
  timeline?: string
  requirements?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: Body = await req.json()

    if (!body.companyName || !body.contactName || !body.email || !body.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Try to persist if Prisma model exists
    let saved: any = null
    try {
      // prisma.enterpriseRequest may not exist in schema; guard access
      // @ts-ignore
      if (prisma?.enterpriseRequest) {
        // @ts-ignore
        saved = await prisma.enterpriseRequest.create({
          data: {
            company: body.companyName,
            contactPerson: body.contactName,
            email: body.email,
            phone: body.phone ?? null,
            industry: body.industry ?? null,
            requestDate: new Date(),
            status: "pending",
            notes: body.requirements ?? "",
            estimatedUsers: body.expectedUsers ? Number(body.expectedUsers) : 0,
          },
        })
      }
    } catch (e) {
      // ignore persistence errors and continue to send emails
      console.warn("EnterpriseRequest persistence failed", e)
    }

    // Fetch company/support emails from superadmin settings
    let adminEmails = [defaultSuperAdminSettings.companyEmail, defaultSuperAdminSettings.supportEmail]
    try {
      const settings = await prisma.superAdminSetting.findMany({ orderBy: { createdAt: "desc" } })
      const companySettings = settings.find((s) => s.section === SuperAdminSettingSection.COMPANY_INFO)
      if (companySettings) {
        const normalized = normalizeCompanySettings(companySettings as any)
        adminEmails = [normalized.companyEmail || adminEmails[0], normalized.supportEmail || adminEmails[1]]
      }
    } catch (e) {
      console.warn("Failed to load superadmin settings", e)
    }

    const adminMessageLines = [
      `New enterprise partnership request received from ${body.companyName}.`,
      `Contact: ${body.contactName} <${body.email}> ${body.phone ? `| ${body.phone}` : ""}`,
      `Website: ${body.website ?? "N/A"}`,
      `Industry: ${body.industry ?? "N/A"}`,
      `Company size: ${body.companySize ?? "N/A"}`,
      `Estimated users: ${body.expectedUsers ?? "N/A"}`,
      "---",
      `Message:\n${body.description}\n\nRequirements:\n${body.requirements ?? "N/A"}`,
    ]

    // Send admin notification
    try {
      await sendEmail({
        to: adminEmails.join(","),
        subject: `New Enterprise Partnership Request - ${body.companyName}`,
        html: creatorPlatformNotificationTemplate({ fullName: body.contactName, message: adminMessageLines.join("\n") }),
      })
    } catch (e) {
      console.error("Failed to send admin email", e)
    }

    // Send confirmation to submitter
    try {
      const userMessage = `Hi ${body.contactName},\n\nThanks for reaching out to Xonnect. We have received your partnership application and our enterprise team will review it within 2 business days.\n\nSummary:\nCompany: ${body.companyName}\nDescription: ${body.description}\n\nWe will contact you at ${body.email} with next steps.`

      await sendEmail({
        to: body.email,
        subject: `We received your Enterprise Partnership request — ${body.companyName}`,
        html: creatorPlatformNotificationTemplate({ fullName: body.contactName, message: userMessage }),
      })
    } catch (e) {
      console.error("Failed to send confirmation email", e)
    }

    return NextResponse.json({ ok: true, id: saved?.id ?? null })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
