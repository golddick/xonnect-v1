import { NextResponse } from "next/server"

import { getProfileByEmail } from "@/lib/auth/profiles"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string }
    const email = body.email?.toLowerCase().trim()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const profile = await getProfileByEmail(email)

    return NextResponse.json({
      exists: Boolean(profile),
      hasPassword: Boolean(profile?.hasPassword),
      emailVerified: Boolean(profile?.emailVerified),
      fullName: profile?.fullName ?? null,
    })
  } catch (error) {
    console.error("Login check error:", error)
    return NextResponse.json(
      { error: "Failed to check login status" },
      { status: 500 }
    )
  }
}
