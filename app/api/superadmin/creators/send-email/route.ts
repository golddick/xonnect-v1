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

  if (!user?.email || !assertAuthorized(user.role)) {
    return null
  }

  return user
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuthorizedUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const subject = typeof body.subject === "string" ? body.subject.trim() : ""
    const message = typeof body.message === "string" ? body.message.trim() : ""

    if (!subject || !message) {
      return NextResponse.json(
        { message: "subject and message are required" },
        { status: 400 }
      )
    }

    let recipients: Array<{ email: string; fullName?: string | null }> = []

    if (body.sendToAll) {
      const creators = await prisma.creator.findMany({
        include: {
          profile: {
            select: {
              email: true,
              fullName: true,
            },
          },
        },
      })

      recipients = creators
        .map((creator) => ({
          email: creator.profile.email,
          fullName: creator.profile.fullName,
        }))
        .filter((recipient) => recipient.email?.trim())
    } else if (typeof body.creatorId === "string") {
      const creator = await prisma.creator.findUnique({
        where: { id: body.creatorId },
        include: {
          profile: {
            select: {
              email: true,
              fullName: true,
            },
          },
        },
      })

      if (!creator || !creator.profile.email) {
        return NextResponse.json({ message: "Creator not found" }, { status: 404 })
      }

      recipients = [{
        email: creator.profile.email,
        fullName: creator.profile.fullName,
      }]
    } else {
      return NextResponse.json(
        { message: "creatorId or sendToAll is required" },
        { status: 400 }
      )
    }

    if (recipients.length === 0) {
      return NextResponse.json({ message: "No creator email addresses found" }, { status: 404 })
    }

    const results = await Promise.allSettled(
      recipients.map((recipient) =>
        sendEmail({
          to: recipient.email,
          subject,
          html: creatorPlatformNotificationTemplate({
            fullName: recipient.fullName,
            message,
          }),
        })
      )
    )

    const failures = results.filter(
      (result) =>
        result.status === "rejected" ||
        (result.status === "fulfilled" && !result.value.ok)
    )

    if (failures.length > 0) {
      console.error("Superadmin creator send-email failures:", failures)
      return NextResponse.json(
        {
          message: `Email sending failed for ${failures.length} recipient(s).`,
          failures: failures.map((failure) => {
            if (failure.status === "fulfilled") {
              return failure.value.message
            }
            return (failure.reason as Error)?.message ?? "Unknown error"
          }),
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: `Email sent to ${recipients.length} creator${recipients.length === 1 ? "" : "s"}.`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Superadmin creator send-email POST error:", error)
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 })
  }
}
