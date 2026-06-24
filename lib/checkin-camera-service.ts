import { prisma } from "@/lib/db/prisma"
import {
  buildCheckInCameraUrl,
  createCheckInCameraQrDataUrl,
  createCheckInCameraToken,
  getCameraSessionExpiry,
  hashCheckInCameraToken,
  normalizeCameraStatus,
} from "@/lib/checkin-camera"
import { dropid } from "dropid"

const db = prisma as any

function toIso(value: Date | null | undefined) {
  return value ? value.toISOString() : null
}

function serializeSignal(signal: any) {
  return {
    id: signal.id,
    sender: signal.sender,
    type: signal.type,
    payload: signal.payload,
    createdAt: signal.createdAt.toISOString(),
  }
}

function serializeSession(session: any) {
  return {
    id: session.id,
    tokenPrefix: session.tokenPrefix,
    status: normalizeCameraStatus(session.status),
    expiresAt: toIso(session.expiresAt),
    openedAt: toIso(session.openedAt),
    connectedAt: toIso(session.connectedAt),
    completedAt: toIso(session.completedAt),
    revokedAt: toIso(session.revokedAt),
    lastSeenAt: toIso(session.lastSeenAt),
    clientLabel: session.clientLabel ?? null,
    event: {
      id: session.event.id,
      title: session.event.title,
      status: session.event.status,
    },
    operator: {
      id: session.operatorUser.id,
      fullName: session.operatorUser.fullName,
      username: session.operatorUser.username,
      gateName: session.operatorUser.gateName,
    },
  }
}

async function auditCameraSession(args: {
  sessionId?: string | null
  actor: string
  action: string
  message?: string | null
  metadata?: Record<string, unknown> | null
}) {
  await db.creatorEventCheckInCameraAudit.create({
    data: {
      id: dropid("cameraAudit"),
      sessionId: args.sessionId ?? null,
      actor: args.actor,
      action: args.action,
      message: args.message ?? null,
      metadata: args.metadata ? JSON.stringify(args.metadata) : null,
    },
  })
}

export async function createCameraSession(args: {
  eventId: string
  operatorUserId: string
  actor: string
  clientLabel?: string | null
}) {
  const token = createCheckInCameraToken()

  await db.creatorEventCheckInCameraSession.updateMany({
    where: {
      eventId: args.eventId,
      operatorUserId: args.operatorUserId,
      status: {
        in: ["ACTIVE", "OPENED", "CONNECTED"],
      },
    },
    data: {
      status: "REVOKED",
      revokedAt: new Date(),
    },
  })

  const session = await db.creatorEventCheckInCameraSession.create({
    data: {
      id: dropid("cameraSession"),
      eventId: args.eventId,
      operatorUserId: args.operatorUserId,
      tokenHash: token.tokenHash,
      tokenPrefix: token.tokenPrefix,
      status: "ACTIVE",
      expiresAt: getCameraSessionExpiry(),
      clientLabel: args.clientLabel ?? null,
    },
    include: {
      event: true,
      operatorUser: true,
    },
  })

  await auditCameraSession({
    sessionId: session.id,
    actor: args.actor,
    action: "created",
    message: "Camera session created",
    metadata: {
      tokenPrefix: session.tokenPrefix,
      cameraUrl: buildCheckInCameraUrl(token.token),
    },
  })

  return {
    session: { ...session, },
    token: token.token,
    tokenPrefix: token.tokenPrefix,
    cameraUrl: buildCheckInCameraUrl(token.token),
    qrDataUrl: await createCheckInCameraQrDataUrl(token.token),
    expiresAt: session.expiresAt.toISOString(),
  }
}

async function findSessionByToken(token: string) {
  const tokenHash = hashCheckInCameraToken(token)
  const session = await db.creatorEventCheckInCameraSession.findUnique({
    where: { tokenHash },
    include: {
      event: true,
      operatorUser: true,
      signals: {
        orderBy: { createdAt: "asc" },
      },
    },
  })

  if (!session) {
    return null
  }

  if (session.expiresAt.getTime() <= Date.now() && normalizeCameraStatus(session.status) !== "EXPIRED" && normalizeCameraStatus(session.status) !== "COMPLETED") {
    const expired = await db.creatorEventCheckInCameraSession.update({
      where: { id: session.id },
      data: {
        status: "EXPIRED",
        revokedAt: new Date(),
      },
      include: {
        event: true,
        operatorUser: true,
        signals: {
          orderBy: { createdAt: "asc" },
        },
      },
    })

    await auditCameraSession({
      sessionId: expired.id,
      actor: "server",
      action: "expired",
      message: "Camera session expired",
    })

    return expired
  }

  return session
}

export async function loadCameraSessionState(token: string, after?: string | null) {
  const session = await findSessionByToken(token)
  if (!session) return null

  const signals = session.signals.filter((signal: any) => {
    if (!after) return true
    return signal.createdAt.getTime() > new Date(after).getTime()
  })

  return {
    session: serializeSession(session),
    signals: signals.map(serializeSignal),
  }
}

export async function openCameraSession(token: string, clientLabel?: string | null) {
  const session = await findSessionByToken(token)
  if (!session) return null

  const status = normalizeCameraStatus(session.status)
  if (status === "COMPLETED" || status === "REVOKED" || status === "EXPIRED") {
    return { session: serializeSession(session), state: status }
  }

  if (session.openedAt) {
    return { session: serializeSession(session), state: "OPENED_ALREADY" as const }
  }

  const updated = await db.creatorEventCheckInCameraSession.update({
    where: { id: session.id },
    data: {
      status: "OPENED",
      openedAt: new Date(),
      clientLabel: clientLabel ?? session.clientLabel ?? null,
      lastSeenAt: new Date(),
    },
    include: {
      event: true,
      operatorUser: true,
      signals: {
        orderBy: { createdAt: "asc" },
      },
    },
  })

  await auditCameraSession({
    sessionId: updated.id,
    actor: "phone",
    action: "opened",
    message: "Phone opened camera session",
    metadata: {
      clientLabel: clientLabel ?? null,
    },
  })

  return { session: serializeSession(updated), state: "OPENED" as const }
}

export async function connectCameraSession(token: string, clientLabel?: string | null) {
  const session = await findSessionByToken(token)
  if (!session) return null

  const updated = await db.creatorEventCheckInCameraSession.update({
    where: { id: session.id },
    data: {
      status: "CONNECTED",
      connectedAt: session.connectedAt ?? new Date(),
      lastSeenAt: new Date(),
      clientLabel: clientLabel ?? session.clientLabel ?? null,
    },
    include: {
      event: true,
      operatorUser: true,
      signals: {
        orderBy: { createdAt: "asc" },
      },
    },
  })

  await auditCameraSession({
    sessionId: updated.id,
    actor: "server",
    action: "connected",
    message: "Camera stream connected",
    metadata: {
      clientLabel: clientLabel ?? null,
    },
  })

  return serializeSession(updated)
}

export async function completeCameraSession(token: string, actor: string, message?: string | null) {
  const session = await findSessionByToken(token)
  if (!session) return null

  const updated = await db.creatorEventCheckInCameraSession.update({
    where: { id: session.id },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
      lastSeenAt: new Date(),
    },
    include: {
      event: true,
      operatorUser: true,
      signals: {
        orderBy: { createdAt: "asc" },
      },
    },
  })

  await auditCameraSession({
    sessionId: updated.id,
    actor,
    action: "completed",
    message: message ?? "Camera session completed",
  })

  return serializeSession(updated)
}

export async function revokeCameraSession(token: string, actor: string, message?: string | null) {
  const session = await findSessionByToken(token)
  if (!session) return null

  const updated = await db.creatorEventCheckInCameraSession.update({
    where: { id: session.id },
    data: {
      status: "REVOKED",
      revokedAt: new Date(),
      lastSeenAt: new Date(),
    },
    include: {
      event: true,
      operatorUser: true,
      signals: {
        orderBy: { createdAt: "asc" },
      },
    },
  })

  await auditCameraSession({
    sessionId: updated.id,
    actor,
    action: "revoked",
    message: message ?? "Camera session revoked",
  })

  return serializeSession(updated)
}

export async function appendCameraSignal(args: {
  token: string
  sender: string
  type: string
  payload: Record<string, unknown>
}) {
  const session = await findSessionByToken(args.token)
  if (!session) return null

   // ✅ Debug: Log the ID generation
  const signalId = dropid("cameraSignal")
  console.log('Generated signal ID:', signalId)

  if (!signalId) {
    throw new Error('dropid failed to generate a valid ID')
  }

  const created = await db.creatorEventCheckInCameraSignal.create({
    data: {
      id: signalId,
      sessionId: session.id,
      sender: args.sender,
      type: args.type,
      payload: JSON.stringify(args.payload),
    },
  })

  await db.creatorEventCheckInCameraSession.update({
    where: { id: session.id },
    data: {
      lastSeenAt: new Date(),
    },
  })

  return serializeSignal({
    ...created,
    payload: JSON.stringify(args.payload),
  })
}

export async function loadCameraSessionByToken(token: string) {
  return findSessionByToken(token)
}

export async function listCameraSessionSignals(token: string, after?: string | null) {
  const session = await findSessionByToken(token)
  if (!session) return null

  const signals = session.signals.filter((signal: any) => {
    if (!after) return true
    return signal.createdAt.getTime() > new Date(after).getTime()
  })

  return {
    session: serializeSession(session),
    signals: signals.map(serializeSignal),
  }
}
