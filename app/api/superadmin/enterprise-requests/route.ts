import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"

async function requireAuthorizedUser() {
  const session = await auth()
  const user = session?.user

  if (!user) return null
  if (user.role !== Role.ADMIN && user.role !== Role.SUPERADMIN) return null
  return user
}

export async function GET() {
  try {
    const user = await requireAuthorizedUser()
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const requests = await prisma.enterpriseRequest.findMany({ orderBy: { createdAt: "desc" } })

    return NextResponse.json({ requests }, { status: 200 })
  } catch (error) {
    console.error("Failed to load enterprise requests", error)
    return NextResponse.json({ message: "Failed to load" }, { status: 500 })
  }
}
