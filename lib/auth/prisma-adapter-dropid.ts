import { dropid } from "dropid"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { Adapter } from "next-auth/adapters"
import { PrismaClient } from "@/lib/generated/prisma"



export function PrismaAdapterWithDropid(prisma: PrismaClient): Adapter {
  const baseAdapter = PrismaAdapter(prisma)
 
  return {
    ...baseAdapter,
    async createUser(data) {
      return baseAdapter.createUser?.({
        ...data,
        id: dropid('user'),
      }) as any
    },
    async createSession(data) {
      // Create session manually with custom ID
      const session = await prisma.session.create({
        data: {
          id: dropid('session'),
          sessionToken: data.sessionToken,
          userId: data.userId,
          expires: data.expires,
        },
      })
      return {
        ...session,
        userId: session.userId,
      }
    },
  }
}