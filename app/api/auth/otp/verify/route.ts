import { NextResponse } from "next/server"

import { verifyOtp } from "@/lib/auth/dropaphi-client"
import { createLoginToken } from "@/lib/auth/login-token"
import { markProfileLastLogin, getProfileByEmail } from "@/lib/auth/profiles"
import { sendOtpSuccessEmail, sendSecurityAlertEmail } from "@/lib/auth/notifications"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; code?: string }
    const email = body.email?.toLowerCase().trim()
    const code = body.code?.trim()

    if (!email || !code) {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 })
    }

    const profile = await getProfileByEmail(email)
    if (!profile) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 })
    }

    const result = await verifyOtp(email, code)

    if (!result.valid || !result.ok) {
      return NextResponse.json({ error: result.message ?? "Invalid OTP" }, { status: 401 })
    }

    await markProfileLastLogin(email)
    
    // Send success emails asynchronously (non-blocking)
    sendOtpSuccessEmail({
      email,
      fullName: profile.fullName,
    }).catch((error) => {
      console.error("Failed to send OTP success email:", error)
    })

    sendSecurityAlertEmail({
      email,
      fullName: profile.fullName,
    }).catch((error) => {
      console.error("Failed to send security alert email:", error)
    })

    return NextResponse.json({
      ok: true,
      loginToken: createLoginToken(email, "otp"),
      email,
      fullName: profile.fullName,
    })
  } catch (error) {
    console.error("OTP verify error:", error)
    return NextResponse.json(
      { error: "Failed to verify OTP. Please try again." },
      { status: 500 }
    )
  }
}
