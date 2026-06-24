import { NextResponse } from "next/server"

import { getAuthenticatedCheckInUser, loadCheckInDashboard } from "@/lib/checkin-service"

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedCheckInUser(request)

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const dashboard = await loadCheckInDashboard(user.id)
 
    if (!dashboard) {
      return NextResponse.json({ message: "Check-in session not found" }, { status: 404 })
    }

    return NextResponse.json(dashboard, { status: 200 })
  } catch (error) {
    console.error("Check-in session error:", error)
    return NextResponse.json({ message: "Failed to load check-in session" }, { status: 500 })
  }
}

