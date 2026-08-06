import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { setPasswordForEmail, verifyPasswordForEmail } from "@/lib/auth/password"

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    const email = session?.user?.email

    if (!email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const currentPassword = body?.currentPassword
    const password = body?.password

    if (typeof currentPassword !== "string" || currentPassword.length === 0) {
      return NextResponse.json(
        { message: "Current password is required" },
        { status: 400 }
      )
    }

    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { message: "New password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    const passwordIsValid = await verifyPasswordForEmail(email, currentPassword)
    if (!passwordIsValid) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 401 }
      )
    }

    await setPasswordForEmail(email, password)

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Update password error:", error)
    return NextResponse.json(
      { message: "Failed to update password" },
      { status: 500 }
    )
  }
}

