import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { sendOtp } from "@/lib/auth/dropaphi-client"
import { Role } from "@/lib/generated/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email || session.user.role !== Role.CREATOR) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const result = await sendOtp(session.user.email, {
      brandName: process.env.DROPAPHI_FROM_NAME,
      fromEmail: process.env.DROPAPHI_FROM_EMAIL,
      expiry: 10,
      length: 6,
    })

    if (!result.ok) {
      return NextResponse.json(
        { message: result.message ?? "Failed to send OTP", cooldown: result.cooldown },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: "OTP sent" }, { status: 200 })
  } catch (error) {
    console.error("Creator payout OTP send error:", error)
    return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 })
  }
}
