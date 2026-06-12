import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/lib/generated/prisma"

const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.DIRECT_URL ?? process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("Missing DATABASE_URL or DIRECT_URL for Prisma")
}

const adapter = new PrismaPg({ connectionString })

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

export const prisma =
  global.__prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma
}
