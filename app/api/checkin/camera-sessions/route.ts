import { NextRequest, NextResponse } from "next/server"

import { getAuthenticatedCheckInUser } from "@/lib/checkin-service"
import { createCameraSession } from "@/lib/checkin-camera-service"

export async function POST(request: NextRequest) {
  try {
    const operator = await getAuthenticatedCheckInUser(request)

    if (!operator) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const session = await createCameraSession({
      eventId: operator.event.id,
      operatorUserId: operator.id,
      actor: "operator",
      clientLabel: request.headers.get("user-agent"),
    })

    return NextResponse.json(session, { status: 201 })
  } catch (error) {
    console.error("Camera session create error:", error)
    return NextResponse.json({ message: "Failed to create camera session" }, { status: 500 })
  }
}

