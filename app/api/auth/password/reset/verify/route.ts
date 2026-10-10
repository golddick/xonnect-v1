import crypto from "node:crypto"
import { NextRequest, NextResponse } from "next/server"

import { verifyOtp } from "@/lib/auth/dropaphi-client"
import { getProfileByEmail } from "@/lib/auth/profiles"
import { prisma } from "@/lib/db/prisma"

const RESET_COOKIE = "xonnect-password-reset"
const RESET_TTL_MS = 10 * 60 * 1000

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: unknown; code?: unknown }
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    const code = typeof body.code === "string" ? body.code.trim() : ""
    if (!email || !code) {
      return NextResponse.json({ error: "Email and verification code are required" }, { status: 400 })
    }

    const profile = await getProfileByEmail(email)
    if (!profile?.hasPassword) {
      return NextResponse.json({ error: "Invalid or expired verification code" }, { status: 400 })
    }

    const result = await verifyOtp(email, code)
    if (!result.ok || !result.valid) {
      return NextResponse.json(
        { error: result.message ?? "Invalid or expired verification code" },
        { status: 400 }
      )
    }

    const secret = crypto.randomBytes(32).toString("base64url")
    const tokenHash = crypto.createHash("sha256").update(secret).digest("hex")
    const identifier = `password-reset:${email}`
    await prisma.verificationToken.deleteMany({ where: { identifier } })
    await prisma.verificationToken.create({
      data: {
        identifier,
        token: tokenHash,
        expires: new Date(Date.now() + RESET_TTL_MS),
      },
    })

    const resetCookieValue = `${Buffer.from(email).toString("base64url")}.${secret}`
    const response = NextResponse.json({ ok: true })
    response.cookies.set(RESET_COOKIE, resetCookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth/password/reset",
      maxAge: RESET_TTL_MS / 1000,
    })
    return response
  } catch (error) {
    console.error("Password reset verification error:", error)
    return NextResponse.json(
      { error: "Unable to verify the code. Please try again." },
      { status: 500 }
    )
  }
}
