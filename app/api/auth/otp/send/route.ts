import { NextResponse } from "next/server"

import { getProfileByEmail } from "@/lib/auth/profiles"
import { sendOtp } from "@/lib/auth/dropaphi-client"

const DEFAULT_FROM_EMAIL = process.env.DROPAPHI_FROM_EMAIL || ''
const DEFAULT_FROM_NAME = process.env.DROPAPHI_FROM_NAME || 'Xonnect'



export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string }
    const email = body.email?.toLowerCase().trim()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const profile = await getProfileByEmail(email)
    if (!profile) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 })
    }

    const result = await sendOtp(email, {
      brandName: DEFAULT_FROM_NAME,
      fromName: DEFAULT_FROM_NAME,
      fromEmail: DEFAULT_FROM_EMAIL,
      length: 6,
      expiry: 10,
    })

    if (!result.ok) {
      return NextResponse.json(
        { error: result.message ?? "Failed to send OTP" },
        { status: result.cooldown ? 429 : 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("OTP send error:", error)
    return NextResponse.json(
      { error: "Failed to send OTP. Please try again." },
      { status: 500 }
    )
  }
}
