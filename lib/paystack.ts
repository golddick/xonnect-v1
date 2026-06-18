import crypto from "crypto"

const PAYSTACK_BASE_URL = "https://api.paystack.co"

export function getPaystackSecretKey() {
  const secretKey = process.env.PAYSTACK_SECRET_KEY?.trim()

  if (!secretKey) {
    throw new Error("Missing PAYSTACK_SECRET_KEY")
  }

  return secretKey
}

export function getPaystackPublicKey() {
  const publicKey = process.env.PAYSTACK_PUBLIC_KEY?.trim()

  if (!publicKey) {
    throw new Error("Missing PAYSTACK_PUBLIC_KEY")
  }

  return publicKey
}

export type PaystackInitializeInput = {
  email: string
  amount: number
  reference: string
  callback_url: string
  metadata: Record<string, unknown>
}

export type PaystackInitializeResponse = {
  status: boolean
  message: string
  data?: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

export async function initializePaystackTransaction(payload: PaystackInitializeInput) {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getPaystackSecretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as PaystackInitializeResponse

  if (!response.ok || !data.status || !data.data) {
    throw new Error(data.message || "Failed to initialize Paystack transaction")
  }

  return data.data
}

export async function verifyPaystackTransaction(reference: string) {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: {
      Authorization: `Bearer ${getPaystackSecretKey()}`,
    },
  })

  const data = (await response.json()) as {
    status: boolean
    message: string
    data?: {
      reference: string
      amount: number
      currency: string
      status: string
      metadata?: Record<string, unknown> | null
      customer?: {
        email?: string | null
      } | null
    }
  }

  if (!response.ok || !data.status || !data.data) {
    throw new Error(data.message || "Failed to verify Paystack transaction")
  }

  return data.data
}

export function createPaystackSignature(rawBody: string) {
  return crypto.createHmac("sha512", getPaystackSecretKey()).update(rawBody).digest("hex")
}

export function isValidPaystackSignature(rawBody: string, signature: string | null) {
  if (!signature) return false

  const expected = createPaystackSignature(rawBody)
  const expectedBuffer = Buffer.from(expected, "hex")
  const actualBuffer = Buffer.from(signature, "hex")

  if (expectedBuffer.length !== actualBuffer.length) return false

  return crypto.timingSafeEqual(expectedBuffer, actualBuffer)
}

export function createPurchaseTicketCode(ticketId: string, reference: string) {
  const suffix = reference.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase()
  return `TCK-${ticketId.slice(0, 4).toUpperCase()}-${suffix}`
}

