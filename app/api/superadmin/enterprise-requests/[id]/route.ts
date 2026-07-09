import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { sendEmail } from "@/lib/auth/dropaphi-client"
import { creatorPlatformNotificationTemplate } from "@/emails/templates/creator-platform-notification"

function assertAuthorized(role?: Role | null) {
  return role === Role.ADMIN || role === Role.SUPERADMIN
}

async function requireAuthorizedUser() {
  const session = await auth()
  const user = session?.user

  if (!user?.email || !assertAuthorized(user.role)) return null
  return user
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuthorizedUser()
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const { id } = params
    const body = await request.json().catch(() => ({}))
    const action = body.action === "approve" ? "approved" : body.action === "reject" ? "rejected" : null

    if (!action) return NextResponse.json({ message: "Invalid action" }, { status: 400 })

    const existing = await prisma.enterpriseRequest.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ message: "Request not found" }, { status: 404 })

    const updated = await prisma.enterpriseRequest.update({ where: { id }, data: { status: action } })

    // Optionally send an automatic email if subject/message provided or action
    const shouldEmail = !!body.sendEmail
    if (shouldEmail) {
      const subject = typeof body.subject === "string" ? body.subject : action === "approved" ? `Your enterprise request has been approved` : `Your enterprise request status`
      const message = typeof body.message === "string" ? body.message : action === "approved" ? `Hi ${existing.contactPerson},\n\nYour enterprise request for ${existing.company} has been approved. Our enterprise team will contact you shortly.` : `Hi ${existing.contactPerson},\n\nWe reviewed your enterprise request and it has been marked as ${action}. Please contact support for more details.`

      try {
        await sendEmail({ to: existing.email, subject, html: creatorPlatformNotificationTemplate({ fullName: existing.contactPerson, message }) })
      } catch (e) {
        console.error("Failed to send status email", e)
      }
    }

    return NextResponse.json({ ok: true, request: updated })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Failed to update" }, { status: 500 })
  }
}
