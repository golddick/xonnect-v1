// import crypto from "crypto"

// const CHECKIN_SESSION_COOKIE = "xonnect_checkin_session"
// const CHECKIN_SESSION_TTL_SECONDS = 12 * 60 * 60

// type CheckInSessionPayload = {
//   userId: string
//   email: string
//   username: string
//   fullName: string
//   eventId: string
//   gateName: string
//   iat: number
//   exp: number
// }

// function secret() {
//   const value = process.env.AUTH_LOGIN_TOKEN_SECRET || process.env.NEXTAUTH_SECRET
//   if (!value) {
//     throw new Error("Missing AUTH_LOGIN_TOKEN_SECRET or NEXTAUTH_SECRET")
//   }
//   return value
// }

// function base64UrlEncode(input: Buffer | string) {
//   const buffer = typeof input === "string" ? Buffer.from(input, "utf8") : input
//   return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
// }

// function base64UrlDecode(input: string) {
//   const padded = input.replace(/-/g, "+").replace(/_/g, "/")
//   const padding = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4))
//   return Buffer.from(padded + padding, "base64").toString("utf8")
// }

// export function createCheckInSessionToken(payload: Omit<CheckInSessionPayload, "iat" | "exp">) {
//   const now = Math.floor(Date.now() / 1000)
//   const session: CheckInSessionPayload = {
//     ...payload,
//     iat: now,
//     exp: now + CHECKIN_SESSION_TTL_SECONDS,
//   }

//   const payloadPart = base64UrlEncode(JSON.stringify(session))
//   const signature = crypto.createHmac("sha256", secret()).update(payloadPart).digest()

//   return `${payloadPart}.${base64UrlEncode(signature)}`
// }

// export function verifyCheckInSessionToken(token: string) {
//   const [payloadPart, signaturePart] = token.split(".")
//   if (!payloadPart || !signaturePart) return null

//   const expectedSignature = crypto.createHmac("sha256", secret()).update(payloadPart).digest()
//   const receivedSignature = Buffer.from(signaturePart.replace(/-/g, "+").replace(/_/g, "/"), "base64")

//   if (
//     receivedSignature.length !== expectedSignature.length ||
//     !crypto.timingSafeEqual(receivedSignature, expectedSignature)
//   ) {
//     return null
//   }

//   const payload = JSON.parse(base64UrlDecode(payloadPart)) as CheckInSessionPayload
//   if (payload.exp < Math.floor(Date.now() / 1000)) return null

//   return payload
// }

// export function getCheckInSessionCookieName() {
//   return CHECKIN_SESSION_COOKIE
// }



import crypto from "crypto"

const CHECKIN_SESSION_COOKIE = "xonnect_checkin_session"
const CHECKIN_SESSION_TTL_SECONDS = 12 * 60 * 60

type CheckInSessionPayload = {
  userId: string
  email: string
  username: string
  fullName: string
  eventId: string
  gateName: string
  iat: number
  exp: number
}

function secret() {
  const value = process.env.AUTH_LOGIN_TOKEN_SECRET || process.env.NEXTAUTH_SECRET
  if (!value) {
    throw new Error("Missing AUTH_LOGIN_TOKEN_SECRET or NEXTAUTH_SECRET")
  }
  return value
}

function base64UrlEncode(input: Buffer | string) {
  const buffer = typeof input === "string" ? Buffer.from(input, "utf8") : input
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

function base64UrlDecode(input: string) {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/")
  const padding = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4))
  return Buffer.from(padded + padding, "base64").toString("utf8")
}

export function createCheckInSessionToken(payload: Omit<CheckInSessionPayload, "iat" | "exp">) {
  const now = Math.floor(Date.now() / 1000)
  const session: CheckInSessionPayload = {
    ...payload,
    iat: now,
    exp: now + CHECKIN_SESSION_TTL_SECONDS,
  }

  const payloadPart = base64UrlEncode(JSON.stringify(session))
  const signature = crypto.createHmac("sha256", secret()).update(payloadPart).digest()

  return `${payloadPart}.${base64UrlEncode(signature)}`
}

export function verifyCheckInSessionToken(token: string) {
  const [payloadPart, signaturePart] = token.split(".")
  if (!payloadPart || !signaturePart) return null

  const expectedSignature = crypto.createHmac("sha256", secret()).update(payloadPart).digest()
  const receivedSignature = Buffer.from(signaturePart.replace(/-/g, "+").replace(/_/g, "/"), "base64")

  if (
    receivedSignature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(receivedSignature, expectedSignature)
  ) {
    return null
  }

  const payload = JSON.parse(base64UrlDecode(payloadPart)) as CheckInSessionPayload
  if (payload.exp < Math.floor(Date.now() / 1000)) return null

  return payload
}

export function getCheckInSessionCookieName() {
  return CHECKIN_SESSION_COOKIE
}