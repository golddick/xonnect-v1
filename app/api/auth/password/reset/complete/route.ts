import crypto from "node:crypto"
import { NextRequest, NextResponse } from "next/server"

import { setPasswordForEmail } from "@/lib/auth/password"
import { prisma } from "@/lib/db/prisma"

const RESET_COOKIE = "xonnect-password-reset"

function clearResetCookie(response: NextResponse) {
  response.cookies.set(RESET_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/password/reset",
    maxAge: 0,
  })
  return response
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { password?: unknown }
    const password = typeof body.password === "string" ? body.password : ""
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    const cookieValue = request.cookies.get(RESET_COOKIE)?.value ?? ""
    const separator = cookieValue.indexOf(".")
    if (separator < 1) {
      return clearResetCookie(
        NextResponse.json({ error: "Your reset session has expired. Request a new code." }, { status: 401 })
      )
    }

    const encodedEmail = cookieValue.slice(0, separator)
    const secret = cookieValue.slice(separator + 1)
    let email: string
    try {
      email = Buffer.from(encodedEmail, "base64url").toString("utf8").toLowerCase()
    } catch {
      return clearResetCookie(
        NextResponse.json({ error: "Your reset session is invalid. Request a new code." }, { status: 401 })
      )
    }

    if (!email || !secret) {
      return clearResetCookie(
        NextResponse.json({ error: "Your reset session is invalid. Request a new code." }, { status: 401 })
      )
    }

    const tokenHash = crypto.createHash("sha256").update(secret).digest("hex")
    const consumed = await prisma.verificationToken.deleteMany({
      where: {
        identifier: `password-reset:${email}`,
        token: tokenHash,
        expires: { gt: new Date() },
      },
    })
    if (consumed.count !== 1) {
      return clearResetCookie(
        NextResponse.json({ error: "Your reset session has expired. Request a new code." }, { status: 401 })
      )
    }

    await setPasswordForEmail(email, password)
    return clearResetCookie(NextResponse.json({ ok: true }))
  } catch (error) {
    console.error("Password reset completion error:", error)
    return NextResponse.json(
      { error: "Unable to reset password. Please request a new verification code." },
      { status: 500 }
    )
  }
}
