import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/db/prisma"

// Public: get categories for users
// GET /api/categories
export async function GET(_request: NextRequest) {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return NextResponse.json({ categories }, { status: 200 })
}

