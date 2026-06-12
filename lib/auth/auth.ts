import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { headers } from "next/headers"

import { PrismaAdapterWithDropid } from "@/lib/auth/prisma-adapter-dropid"

import { Role } from "@/lib/generated/prisma"
import {
  sendSecurityAlertEmail,
  sendWelcomeBackEmail,
} from "@/lib/auth/notifications"
import {
  getProfileByEmail,
  markProfileEmailVerified,
  markProfileLastLogin,
  upsertProfile,
} from "@/lib/auth/profiles"
import { verifyPasswordForEmail } from "@/lib/auth/password"
import { verifyLoginToken } from "@/lib/auth/login-token"
import { prisma } from "@/lib/db/prisma"

type TokenClaims = {
  profileId?: string
  email?: string | null
  fullName?: string | null
  avatarUrl?: string | null
  role?: Role | null
}

async function getUserAgent() {
  try {
    const requestHeaders = await headers()
    return requestHeaders.get("user-agent") ?? null
  } catch {
    return null
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  adapter: PrismaAdapterWithDropid(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        loginToken: { label: "Login Token", type: "text" },
      },
      authorize: async (credentials) => {
        const email = typeof credentials?.email === "string" ? credentials.email.toLowerCase().trim() : ""
        if (!email) return null

        const profile = await getProfileByEmail(email)
        if (!profile) return null

        const loginToken = typeof credentials?.loginToken === "string" ? credentials.loginToken : null
        if (loginToken) {
          const token = verifyLoginToken(loginToken)
          if (!token || token.email !== email) return null

          await markProfileEmailVerified(email, true)
          await markProfileLastLogin(email)
          
          const userAgent = await getUserAgent()
          sendSecurityAlertEmail({
            email,
            fullName: profile.fullName,
            deviceInfo: userAgent,
          }).catch((error) => {
            console.error("Failed to send security alert email:", error)
          })

          return {
            id: profile.id,
            email,
            name: profile.fullName ?? undefined,
            image: profile.avatarUrl ?? undefined,
            role: profile.role,
          }
        }

        const password = typeof credentials?.password === "string" ? credentials.password : null
        if (!password) return null

        const passwordIsValid = await verifyPasswordForEmail(email, password)
        if (!passwordIsValid) return null

        await markProfileLastLogin(email)
        const userAgent = await getUserAgent()
        await sendWelcomeBackEmail({
          email,
          fullName: profile.fullName,
          deviceInfo: userAgent,
        })
        sendSecurityAlertEmail({
          email,
          fullName: profile.fullName,
          deviceInfo: userAgent,
        }).catch((error) => {
          console.error("Failed to send security alert email:", error)
        })

        return {
          id: profile.id,
          email,
          name: profile.fullName ?? undefined,
          image: profile.avatarUrl ?? undefined,
          role: profile.role,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false
      
      await upsertProfile({
        email: user.email,
        fullName: user.name ?? null,
        avatarUrl: user.image ?? null,
      })

      return true
    },
    async jwt({ token, user, trigger }) {
      const claims = token as TokenClaims

      if (user) {
        claims.profileId = user.id
        claims.email = user.email
        claims.fullName = user.name ?? null
        claims.avatarUrl = user.image ?? null
        claims.role = user.role ?? null
      }

      if (trigger === "update" && claims.email) {
        const profile = await getProfileByEmail(claims.email)
        if (profile) {
          claims.profileId = profile.id
          claims.fullName = profile.fullName
          claims.avatarUrl = profile.avatarUrl
          claims.role = profile.role
        }
      }

      return token
    },
    async session({ session, token }) {
      const claims = token as TokenClaims

      if (session.user) {
        session.user.id = claims.profileId ?? ""
        session.user.email = claims.email ?? session.user.email
        session.user.name = claims.fullName ?? session.user.name
        session.user.image = claims.avatarUrl ?? session.user.image
        session.user.profileId = claims.profileId ?? ""
        session.user.role = claims.role ?? session.user.role
      }

      return session
    },
  },
})

export const GET = handlers.GET
export const POST = handlers.POST

declare module "next-auth" {
  interface User {
    role?: Role | null
  }

  interface Session {
    user: {
      id: string
      profileId: string
      role: Role | null
      email?: string | null
      name?: string | null
      image?: string | null
    }
  }
}
