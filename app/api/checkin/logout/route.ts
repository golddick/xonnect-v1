import { NextResponse } from "next/server"

import { getCheckInSessionCookieName } from "@/lib/checkin-auth"

export async function POST() {
  const response = NextResponse.json({ message: "Signed out" }, { status: 200 })
  response.cookies.set(getCheckInSessionCookieName(), "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
  return response
}

