import { NextRequest, NextResponse } from "next/server"

import { getAuthenticatedCheckInUser } from "@/lib/checkin-service"
import {
  appendCameraSignal,
  completeCameraSession,
  listCameraSessionSignals,
  loadCameraSessionByToken,
  openCameraSession,
  revokeCameraSession,
  connectCameraSession,
} from "@/lib/checkin-camera-service"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const after = request.nextUrl.searchParams.get("after")
    const state = await listCameraSessionSignals(token, after)

    if (!state) {
      return NextResponse.json({ message: "Camera session not found" }, { status: 404 })
    }

    return NextResponse.json(state, { status: 200 })
  } catch (error) {
    console.error("Camera session GET error:", error)
    return NextResponse.json({ message: "Failed to load camera session" }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const body = (await request.json().catch(() => ({}))) as {
      action?: string
      sender?: string
      type?: string
      payload?: Record<string, unknown>
      clientLabel?: string
      message?: string
    }

    const action = (body.action ?? "").toLowerCase()

    if (action === "signal") {
      if (!body.type) {
        return NextResponse.json({ message: "Signal type is required" }, { status: 400 })
      }

      const signal = await appendCameraSignal({
        token,
        sender: body.sender ?? "phone",
        type: body.type,
        payload: body.payload ?? {},
      })

      if (!signal) {
        return NextResponse.json({ message: "Camera session not found" }, { status: 404 })
      }

      return NextResponse.json({ signal }, { status: 201 })
    }

    if (action === "open") {
      const session = await openCameraSession(token, body.clientLabel ?? request.headers.get("user-agent"))
      if (!session) {
        return NextResponse.json({ message: "Camera session not found" }, { status: 404 })
      }

      return NextResponse.json(session, { status: 200 })
    }

    if (action === "connect") {
      const session = await connectCameraSession(token, body.clientLabel ?? request.headers.get("user-agent"))
      if (!session) {
        return NextResponse.json({ message: "Camera session not found" }, { status: 404 })
      }

      return NextResponse.json(session, { status: 200 })
    }

    if (action === "complete" || action === "revoke") {
      const activeOperator = await getAuthenticatedCheckInUser(request)
      const cameraSession = await loadCameraSessionByToken(token)

      if (!cameraSession) {
        return NextResponse.json({ message: "Camera session not found" }, { status: 404 })
      }

      if (!activeOperator || activeOperator.id !== cameraSession.operatorUserId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      }

      const session =
        action === "complete"
          ? await completeCameraSession(token, "operator", body.message ?? "Camera session completed")
          : await revokeCameraSession(token, "operator", body.message ?? "Camera session revoked")

      if (!session) {
        return NextResponse.json({ message: "Camera session not found" }, { status: 404 })
      }

      return NextResponse.json(session, { status: 200 })
    }

    return NextResponse.json({ message: "Unsupported action" }, { status: 400 })
  } catch (error) {
    console.error("Camera session POST error:", error)
    return NextResponse.json({ message: "Failed to update camera session" }, { status: 500 })
  }
}
