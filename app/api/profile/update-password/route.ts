import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { setPasswordForEmail } from "@/lib/auth/password"

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    const email = session?.user?.email

    if (!email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const password = body?.password

    if (typeof password !== "string" || password.length === 0) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 }
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

