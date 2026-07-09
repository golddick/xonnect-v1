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

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuthorizedUser()
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const body = await request.json().catch(() => ({}))
    const requestId = typeof body.requestId === "string" ? body.requestId : null
    const email = typeof body.email === "string" ? body.email : null
    const subject = typeof body.subject === "string" ? body.subject : ""
    const message = typeof body.message === "string" ? body.message : ""

    if (!subject || !message) return NextResponse.json({ message: "subject and message required" }, { status: 400 })

    let recipientEmail = email
    if (!recipientEmail && requestId) {
      const req = await prisma.enterpriseRequest.findUnique({ where: { id: requestId } })
      if (!req) return NextResponse.json({ message: "Request not found" }, { status: 404 })
      recipientEmail = req.email
    }

    if (!recipientEmail) return NextResponse.json({ message: "No recipient specified" }, { status: 400 })

    await sendEmail({ to: recipientEmail, subject, html: creatorPlatformNotificationTemplate({ fullName: body.fullName ?? undefined, message }) })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Failed to send enterprise email", error)
    return NextResponse.json({ message: "Failed" }, { status: 500 })
  }
}
