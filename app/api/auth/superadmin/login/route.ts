import { NextResponse } from "next/server"

import { Role } from "@/lib/generated/prisma"
import { createLoginToken } from "@/lib/auth/login-token"
import { getProfileByEmail, markProfileLastLogin } from "@/lib/auth/profiles"
import { verifyPasswordForEmail } from "@/lib/auth/password"
import {
  sendSecurityAlertEmail,
  sendSystemLoginAuditEmail,
} from "@/lib/auth/notifications"

function getRoleLabel(role: Role) {
  return role === Role.SUPERADMIN ? "Superadmin" : "Admin"
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string }
    const email = body.email?.toLowerCase().trim()
    const password = body.password?.trim()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const profile = await getProfileByEmail(email)
    if (!profile) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    if (profile.role !== Role.ADMIN && profile.role !== Role.SUPERADMIN) {
      return NextResponse.json({ error: "You do not have privileged dashboard access" }, { status: 403 })
    }

    const passwordIsValid = await verifyPasswordForEmail(email, password)
    if (!passwordIsValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    await markProfileLastLogin(email)

    const roleLabel = getRoleLabel(profile.role)
    const deviceInfo = request.headers.get("user-agent")
 
    await Promise.all([
      sendSecurityAlertEmail({
        email,
        fullName: profile.fullName,
        deviceInfo,
      }),
      sendSystemLoginAuditEmail({
        email,
        fullName: profile.fullName,
        deviceInfo,
        roleLabel,
      }),
    ])

    return NextResponse.json({
      ok: true,
      role: profile.role,
      loginToken: createLoginToken(email, "password"),
    })
  } catch (error) {
    console.error("Privileged login failed:", error)
    return NextResponse.json({ error: "Unable to sign in" }, { status: 500 })
  }
}
