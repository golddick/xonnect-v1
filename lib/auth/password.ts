import crypto from "crypto"

import { prisma } from "@/lib/db/prisma"
import { markProfilePasswordState } from "./profiles"

const SCRYPT_PARAMS = {
  N: 16384,
  r: 8,
  p: 1,
  keylen: 64,
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16) 
  const derived = crypto.scryptSync(password, salt, SCRYPT_PARAMS.keylen, SCRYPT_PARAMS)
  return `scrypt$${salt.toString("hex")}$${derived.toString("hex")}`
}

export function verifyPassword(password: string, storedHash: string) {
  const [algorithm, saltHex, hashHex] = storedHash.split("$")
  if (algorithm !== "scrypt" || !saltHex || !hashHex) return false

  const salt = Buffer.from(saltHex, "hex")
  const expected = Buffer.from(hashHex, "hex")
  const actual = crypto.scryptSync(password, salt, expected.length, SCRYPT_PARAMS)

  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual)
}

export async function setPasswordForEmail(email: string, password: string) {
  const normalizedEmail = email.toLowerCase()
  const passwordHash = hashPassword(password)

  await prisma.authCredential.upsert({
    where: { email: normalizedEmail },
    update: {
      passwordHash,
    },
    create: {
      email: normalizedEmail,
      passwordHash,
    },
  })

  await markProfilePasswordState(normalizedEmail, true)
}

export async function verifyPasswordForEmail(email: string, password: string) {
  const credential = await prisma.authCredential.findUnique({
    where: { email: email.toLowerCase() },
  })

  if (!credential) return false

  return verifyPassword(password, credential.passwordHash)
}
