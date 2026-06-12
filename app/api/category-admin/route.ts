import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"

// Admin/Superadmin: create + update categories
// PUT /api/category-admin (create when id not provided, update when id provided)
export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    const role = session?.user?.role

    if (role !== "ADMIN" && role !== "SUPERADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { id, name, slug, description, isActive } = body as {
      id?: string
      name?: string
      slug?: string
      description?: string | null
      isActive?: boolean
    }

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ message: "Category name is required" }, { status: 400 })
    }

    const normalizedSlug =
      typeof slug === "string" && slug.trim().length > 0
        ? slug.trim()
        : name
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-")
            .trim()

    if (id) {
      const updated = await prisma.category.update({
        where: { id },
        data: {
          name: name.trim(),
          slug: normalizedSlug,
          description: description ?? null,
          isActive: typeof isActive === "boolean" ? isActive : true,
        },
      })

      return NextResponse.json({ category: updated }, { status: 200 })
    }

    const created = await prisma.category.create({
      data: {
        name: name.trim(),
        slug: normalizedSlug,
        description: description ?? null,
        isActive: typeof isActive === "boolean" ? isActive : true,
      },
    })

    return NextResponse.json({ category: created }, { status: 201 })
  } catch (error) {
    console.error("Category admin error:", error)
    return NextResponse.json({ message: "Failed to upsert category" }, { status: 500 })
  }
}

// Admin/Superadmin: get all categories (optional helper for modal)
// GET /api/category-admin
export async function GET(_request: NextRequest) {
  try {
    const session = await auth()
    const role = session?.user?.role

    if (role !== "ADMIN" && role !== "SUPERADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const categories = await prisma.category.findMany({
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
  } catch (error) {
    console.error("Category admin GET error:", error)
    return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 })
  }
}

