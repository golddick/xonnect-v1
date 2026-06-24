export type CheckInCameraSessionState = {
  session: {
    id: string
    tokenPrefix: string
    status: string
    expiresAt: string | null
    openedAt: string | null
    connectedAt: string | null
    completedAt: string | null
    revokedAt: string | null
    lastSeenAt: string | null
    clientLabel: string | null
    event: {
      id: string
      title: string
      status: string
    }
    operator: {
      id: string
      fullName: string
      username: string
      gateName: string
    }
  }
  signals: Array<{
    id: string
    sender: string
    type: string
    payload: string
    createdAt: string
  }>
}

async function handleJsonResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & { message?: string }
  if (!response.ok) {
    throw new Error(data.message ?? "Request failed")
  }
  return data
}

export async function createCameraSession() {
  const response = await fetch("/api/checkin/camera-sessions", {
    method: "POST",
    cache: "no-store",
  })

  return handleJsonResponse<{
    token: string
    tokenPrefix: string
    cameraUrl: string
    qrDataUrl: string
    expiresAt: string
    session: CheckInCameraSessionState["session"]
  }>(response)
}

export async function loadCameraSession(token: string, after?: string | null) {
  const params = new URLSearchParams()
  if (after) params.set("after", after)

  const query = params.toString()
  const response = await fetch(
    `/api/checkin/camera-sessions/${encodeURIComponent(token)}${query ? `?${query}` : ""}`,
    {
      cache: "no-store",
    }
  )

  return handleJsonResponse<CheckInCameraSessionState>(response)
}

export async function sendCameraSessionAction(
  token: string,
  action: "open" | "connect" | "complete" | "revoke" | "signal",
  body: Record<string, unknown> = {}
) {
  const response = await fetch(`/api/checkin/camera-sessions/${encodeURIComponent(token)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }, 
    body: JSON.stringify({
      action,
      ...body,
    }),
  })

  return handleJsonResponse(response)
}
