import { NextResponse } from "next/server"

import { sendOtp } from "@/lib/auth/dropaphi-client"
import { getProfileByEmail } from "@/lib/auth/profiles"

const FROM_EMAIL = process.env.DROPAPHI_FROM_EMAIL || ""
const FROM_NAME = process.env.DROPAPHI_FROM_NAME || "Xonnect"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown }
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const profile = await getProfileByEmail(email)
    if (profile?.hasPassword) {
      const result = await sendOtp(email, {
        brandName: FROM_NAME,
        fromName: FROM_NAME,
        fromEmail: FROM_EMAIL,
        length: 6,
        expiry: 10,
      })

      if (!result.ok) {
        return NextResponse.json(
          { error: result.message ?? "Unable to send a verification code" },
          { status: result.cooldown ? 429 : 502 }
        )
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Password reset request error:", error)
    return NextResponse.json(
      { error: "Unable to send a verification code. Please try again." },
      { status: 500 }
    )
  }
}
