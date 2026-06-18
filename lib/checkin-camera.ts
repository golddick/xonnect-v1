import crypto from "crypto"

import QRCode from "qrcode"

const CAMERA_SESSION_TTL_MINUTES = 2
const CAMERA_LOGO_URL = process.env.LOGO?.trim() || ""

export type CheckInCameraStatus =
  | "ACTIVE"
  | "OPENED"
  | "CONNECTED"
  | "COMPLETED"
  | "REVOKED"
  | "EXPIRED"

export type CameraSignalSender = "phone" | "operator" | "server"

export type CameraSignalType =
  | "offer"
  | "answer"
  | "candidate"
  | "ready"
  | "opened"
  | "connected"
  | "completed"
  | "revoked"
  | "expired"
  | "heartbeat"
  | "error"

export type CameraSignalPayload = Record<string, unknown>

export type CheckInCameraSessionPayload = {
  token: string
  tokenHash: string
  tokenPrefix: string
}

export function createCheckInCameraToken(): CheckInCameraSessionPayload {
  const token = crypto.randomBytes(24).toString("base64url")
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex")

  return {
    token,
    tokenHash,
    tokenPrefix: token.slice(0, 8),
  }
}

export function hashCheckInCameraToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex")
}

export function buildCheckInCameraUrl(token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  return `${baseUrl}/checkin/camera/${token}`
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function createCheckInCameraQrDataUrl(token: string) {
  const svg = await QRCode.toString(buildCheckInCameraUrl(token), {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 1,
    width: 320,
    color: {
      dark: "#111111",
      light: "#ffffff",
    },
  })

  const logoMarkup = CAMERA_LOGO_URL
    ? `
      <rect x="37%" y="37%" width="26%" height="26%" rx="8%" fill="#ffffff" />
      <image
        href="${escapeXml(CAMERA_LOGO_URL)}"
        x="41%" y="41%" width="18%" height="18%"
        preserveAspectRatio="xMidYMid meet"
      />
    `
    : `
      <rect x="39%" y="39%" width="22%" height="22%" rx="8%" fill="#ffffff" />
    `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace("</svg>", `${logoMarkup}</svg>`))}`
}

export function getCameraSessionExpiry() {
  return new Date(Date.now() + CAMERA_SESSION_TTL_MINUTES * 60 * 1000)
}

export function isCameraStatusActive(status: string) {
  return status === "ACTIVE" || status === "OPENED" || status === "CONNECTED"
}

export function normalizeCameraStatus(status: string | null | undefined): CheckInCameraStatus {
  switch ((status ?? "").toUpperCase()) {
    case "OPENED":
      return "OPENED"
    case "CONNECTED":
      return "CONNECTED"
    case "COMPLETED":
      return "COMPLETED"
    case "REVOKED":
      return "REVOKED"
    case "EXPIRED":
      return "EXPIRED"
    case "ACTIVE":
    default:
      return "ACTIVE"
  }
}
