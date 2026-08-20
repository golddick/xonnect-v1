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

// Email validation helper
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email.trim().toLowerCase())
}

export async function POST(req: NextRequest) {
  try {
    const body: Body = await req.json()

    // 1. Validate required fields
    if (!body.companyName || !body.contactName || !body.email || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields: companyName, contactName, email, description" },
        { status: 400 }
      )
    }

    // 2. Validate email format FIRST (before any database operations)
    const sanitizedEmail = body.email.trim().toLowerCase()
    if (!isValidEmail(sanitizedEmail)) {
      console.error(`Invalid email format: ${body.email}`)
      return NextResponse.json(
        { error: "Invalid email address format. Please provide a valid email." },
        { status: 400 }
      )
    }

    // 3. Validate other fields
    if (body.expectedUsers && isNaN(Number(body.expectedUsers))) {
      return NextResponse.json(
        { error: "Expected users must be a valid number" },
        { status: 400 }
      )
    }

    // 4. Fetch and validate admin emails BEFORE database persistence
    let adminEmails = [
      defaultSuperAdminSettings.companyEmail,
      defaultSuperAdminSettings.supportEmail
    ]

    try {
      const settings = await prisma.superAdminSetting.findMany({
        orderBy: { createdAt: "desc" }
      })
      const companySettings = settings.find(
        (s) => s.section === SuperAdminSettingSection.COMPANY_INFO
      )
      if (companySettings) {
        const normalized = normalizeCompanySettings(companySettings as any)
        adminEmails = [
          normalized.companyEmail || adminEmails[0],
          normalized.supportEmail || adminEmails[1]
        ]
      }
    } catch (settingsError) {
      console.warn("Failed to load superadmin settings:", settingsError)
    }

    // 5. Filter and validate admin emails
    const validAdminEmails = adminEmails
      .filter(email => email && typeof email === 'string')
      .map(email => email.trim().toLowerCase())
      .filter(email => isValidEmail(email))

    if (validAdminEmails.length === 0) {
      console.error("No valid admin emails found")
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
        { status: 500 }
      )
    }

    // 6. Try to persist to database (only after admin emails are validated)
    let saved: any = null
    try {
      if (prisma?.enterpriseRequest) {
        saved = await prisma.enterpriseRequest.create({
          data: {
            company: body.companyName.trim(),
            contactPerson: body.contactName.trim(),
            email: sanitizedEmail,
            phone: body.phone?.trim() ?? null,
            website: body.website?.trim() ?? null,
            companySize: body.companySize?.trim() ?? null,
            industry: body.industry?.trim() ?? null,
            address: body.address?.trim() ?? null,
            description: body.description.trim(),
            requirements: body.requirements?.trim() ?? null,
            estimatedUsers: body.expectedUsers ? Number(body.expectedUsers) : null,
            budget: body.budget?.trim() ?? null,
            timeline: body.timeline?.trim() ?? null,
            status: "pending",
          },
        })
      }
    } catch (dbError) {
      console.error("Database persistence failed:", dbError)
      return NextResponse.json(
        { error: "Failed to save partnership request. Please try again later." },
        { status: 500 }
      )
    }

    // 7. Prepare email content
    const adminMessageLines = [
      `New enterprise partnership request received from ${body.companyName}.`,
      `Contact: ${body.contactName} <${sanitizedEmail}> ${body.phone ? `| ${body.phone}` : ""}`,
      `Website: ${body.website ?? "N/A"}`,
      `Industry: ${body.industry ?? "N/A"}`,
      `Company size: ${body.companySize ?? "N/A"}`,
      `Estimated users: ${body.expectedUsers ?? "N/A"}`,
      "---",
      `Description:\n${body.description}\n\nRequirements:\n${body.requirements ?? "N/A"}`,
    ]

    const userMessage = `Hi ${body.contactName},\n\nThanks for reaching out to Xonnect. We have received your partnership application and our enterprise team will review it within 2 business days.\n\nSummary:\nCompany: ${body.companyName}\nDescription: ${body.description}\n\nWe will contact you at ${sanitizedEmail} with next steps.`

    // 8. Send emails and validate responses
    try {
      // Send admin notification
      const adminEmailResult = await sendEmail({
        to: validAdminEmails.join(","),
        subject: `New Enterprise Partnership Request - ${body.companyName}`,
        html: creatorPlatformNotificationTemplate({
          fullName: body.contactName,
          message: adminMessageLines.join("\n")
        }),
      })

      // Check admin email result
      if (!adminEmailResult?.ok) {
        throw new Error(`Admin email delivery failed: ${adminEmailResult?.message || 'Unknown error'}`)
      }

      // Send confirmation to submitter
      const userEmailResult = await sendEmail({
        to: sanitizedEmail,
        subject: `We received your Enterprise Partnership request — ${body.companyName}`,
        html: creatorPlatformNotificationTemplate({
          fullName: body.contactName,
          message: userMessage
        }),
      })

      // Check user email result
      if (!userEmailResult?.ok) {
        throw new Error(`User email delivery failed: ${userEmailResult?.message || 'Unknown error'}`)
      }

    } catch (emailError) {
      console.error("Email send failed:", emailError)
      
      // Rollback: Delete the saved record if it was created
      if (saved?.id) {
        try {
          await prisma.enterpriseRequest.delete({
            where: { id: saved.id }
          })
          console.log(`Rolled back record ${saved.id} due to email failure`)
        } catch (deleteError) {
          console.warn("Failed to delete record after email failure:", deleteError)
        }
      }
      
      return NextResponse.json(
        { error: "Failed to send confirmation email. Please try again later." },
        { status: 500 }
      )
    }

    // 9. Success response
    return NextResponse.json({
      ok: true,
      id: saved?.id ?? null,
      message: "Partnership request submitted successfully"
    })

  } catch (err) {
    console.error("Unhandled error:", err)
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    )
  }
}