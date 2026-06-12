import { dropid } from "dropid"

import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

export type ProfileRecord = {
  id: string
  email: string
  role: Role
  fullName: string | null
  avatarUrl: string | null
  emailVerified: boolean | null
  hasPassword: boolean | null
  lastLogin: Date | null
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfileByEmail(email: string) {
  return prisma.profile.findUnique({
    where: { email: email.toLowerCase() },
  })
}

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("Email already exists")
    this.name = "EmailAlreadyExistsError"
  }
}

export class ProfileAlreadyExistsError extends Error {
  constructor() {
    super("Profile already exists")
    this.name = "ProfileAlreadyExistsError"
  }
}


export async function upsertProfile(input: {
  email: string
  fullName?: string | null
  avatarUrl?: string | null
  role?: Role
}) {
  const normalizedEmail = input.email.toLowerCase()

  const existing = await getProfileByEmail(normalizedEmail)

  // Login flow: if profile already exists, update details (do NOT throw).
  if (existing) {
    return prisma.profile.update({
      where: { email: normalizedEmail },
      data: {
        fullName: input.fullName ?? existing.fullName ?? null,
        avatarUrl: input.avatarUrl ?? existing.avatarUrl ?? null,
        role: input.role ?? existing.role,
      },
    })
  }

  // Create flow
  return prisma.profile.create({
    data: {
      id: dropid("profile"),
      email: normalizedEmail,
      role: input.role ?? Role.USER,
      fullName: input.fullName ?? null,
      avatarUrl: input.avatarUrl ?? null,
      emailVerified: false,
      hasPassword: false,
    },
  })
}

export async function createProfile(input: {
  email: string
  fullName?: string | null
  avatarUrl?: string | null
  role?: Role
}) {
  const normalizedEmail = input.email.toLowerCase()

  const existing = await getProfileByEmail(normalizedEmail)
  if (existing) throw new EmailAlreadyExistsError()

  return prisma.profile.create({
    data: {
      id: dropid("profile"),
      email: normalizedEmail,
      role: input.role ?? Role.USER,
      fullName: input.fullName ?? null,
      avatarUrl: input.avatarUrl ?? null,
      emailVerified: false,
      hasPassword: false,
    },
  })
}

export async function markProfileEmailVerified(email: string, verified = true) {
  return prisma.profile.update({
    where: { email: email.toLowerCase() },
    data: {
      emailVerified: verified,
    },
  })
}

export async function markProfileLastLogin(email: string) {
  return prisma.profile.update({
    where: { email: email.toLowerCase() },
    data: {
      lastLogin: new Date(),
      emailVerified: true,
    },
  })
}

export async function markProfilePasswordState(email: string, hasPassword: boolean) {
  return prisma.profile.update({
    where: { email: email.toLowerCase() },
    data: {
      hasPassword,
    },
  })
}
