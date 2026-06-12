import { NextResponse } from "next/server"

import {  upsertProfile } from "@/lib/auth/profiles"
import { Role } from "@/lib/generated/prisma"
import { sendWelcomeEmail } from "@/lib/auth/notifications"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      fullName?: string
      email?: string
    }

    const email = body.email?.toLowerCase().trim()
    const fullName = body.fullName?.trim() || null

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    const profile = await upsertProfile({
      email,
      fullName,
      role: Role.USER,
    })

    try {
      await sendWelcomeEmail({
        email,
        fullName,
      }) 
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
    }

    return NextResponse.json({
      ok: true,
      profile,
      isNewUser: true,
    })
  } catch (error) {
    console.error("Signup error:", error)

    if (
      error instanceof Error &&
      error.message === "Email already exists"
    ) {
      return NextResponse.json(
        {
          error: "An account with this email already exists. Please sign in instead.",
          code: "EMAIL_EXISTS",
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        error: "Failed to create account. Please try again later.",
      },
      { status: 500 }
    )
  }
}
