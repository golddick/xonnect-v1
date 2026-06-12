import { NextRequest, NextResponse } from "next/server"
import { dropid } from "dropid"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role, SuperAdminSettingSection } from "@/lib/generated/prisma"
import {
  normalizeCompanySettings,
  normalizeRevenueSettings,
  type CompanySettingsData,
  type RevenueSettingsData,
} from "@/lib/superadmin-settings"

type SuperAdminSettingsRequestBody = {
  section?: "revenue" | "company"
  data?: Record<string, unknown>
}

type SuperAdminSettingsResponse = {
  settings: {
    revenue: RevenueSettingsData | null
    company: CompanySettingsData | null
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function toPrismaSection(section?: string): SuperAdminSettingSection | null {
  if (section === "revenue") return SuperAdminSettingSection.REVENUE
  if (section === "company") return SuperAdminSettingSection.COMPANY_INFO
  return null
}

function assertAuthorized(sessionRole: Role | null | undefined) {
  return sessionRole === Role.ADMIN || sessionRole === Role.SUPERADMIN
}

function requireNumberField(data: Record<string, unknown>, field: string) {
  const value = data[field]
  return typeof value === "number" && Number.isFinite(value) ? value : null
}

function requireStringField(data: Record<string, unknown>, field: string) {
  const value = data[field]
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null
}

function buildRevenueData(data: Record<string, unknown>) {
  const platformFeePercentage = requireNumberField(data, "platformFeePercentage")
  const enterpriseFeePercentage = requireNumberField(data, "enterpriseFeePercentage")
  const minimumPayoutAmount = requireNumberField(data, "minimumPayoutAmount")
  const payoutProcessingDays = requireNumberField(data, "payoutProcessingDays")

  if (
    platformFeePercentage === null ||
    enterpriseFeePercentage === null ||
    minimumPayoutAmount === null ||
    payoutProcessingDays === null
  ) {
    return null
  }

  return {
    platformFeePercentage,
    enterpriseFeePercentage,
    minimumPayoutAmount,
    payoutProcessingDays,
    companyName: null,
    companyEmail: null,
    supportEmail: null,
    companyPhone: null,
    companyAddress: null,
    companyWebsite: null,
  }
}

function buildCompanyData(data: Record<string, unknown>) {
  const companyName = requireStringField(data, "companyName")
  const companyEmail = requireStringField(data, "companyEmail")
  const supportEmail = requireStringField(data, "supportEmail")
  const companyPhone = requireStringField(data, "companyPhone")
  const companyAddress = requireStringField(data, "companyAddress")
  const companyWebsite = requireStringField(data, "companyWebsite")

  if (
    companyName === null ||
    companyEmail === null ||
    supportEmail === null ||
    companyPhone === null ||
    companyAddress === null ||
    companyWebsite === null
  ) {
    return null
  }

  return {
    platformFeePercentage: null,
    enterpriseFeePercentage: null,
    minimumPayoutAmount: null,
    payoutProcessingDays: null,
    companyName,
    companyEmail,
    supportEmail,
    companyPhone,
    companyAddress,
    companyWebsite,
  }
}

function formatResponse(
  revenueSettings: {
    platformFeePercentage: number | null
    enterpriseFeePercentage: number | null
    minimumPayoutAmount: number | null
    payoutProcessingDays: number | null
  } | null,
  companySettings: {
    companyName: string | null
    companyEmail: string | null
    supportEmail: string | null
    companyPhone: string | null
    companyAddress: string | null
    companyWebsite: string | null
  } | null
): SuperAdminSettingsResponse {
  return {
    settings: {
      revenue: revenueSettings ? normalizeRevenueSettings(revenueSettings) : null,
      company: companySettings ? normalizeCompanySettings(companySettings) : null,
    },
  }
}

async function requireAuthorizedUser() {
  const session = await auth()
  const user = session?.user

  if (!assertAuthorized(user?.role) || !user?.email) {
    return null
  }

  return user
}

export async function GET() {
  try {
    const user = await requireAuthorizedUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const settings = await prisma.superAdminSetting.findMany({
      orderBy: { updatedAt: "desc" },
    })

    const revenueSettings = settings.find((setting) => setting.section === SuperAdminSettingSection.REVENUE)
    const companySettings = settings.find((setting) => setting.section === SuperAdminSettingSection.COMPANY_INFO)

    return NextResponse.json(
      formatResponse(
        revenueSettings
          ? {
              platformFeePercentage: revenueSettings.platformFeePercentage,
              enterpriseFeePercentage: revenueSettings.enterpriseFeePercentage,
              minimumPayoutAmount: revenueSettings.minimumPayoutAmount,
              payoutProcessingDays: revenueSettings.payoutProcessingDays,
            }
          : null,
        companySettings
          ? {
              companyName: companySettings.companyName,
              companyEmail: companySettings.companyEmail,
              supportEmail: companySettings.supportEmail,
              companyPhone: companySettings.companyPhone,
              companyAddress: companySettings.companyAddress,
              companyWebsite: companySettings.companyWebsite,
            }
          : null
      ),
      { status: 200 }
    )
  } catch (error) {
    console.error("Superadmin settings GET error:", error)
    return NextResponse.json({ message: "Failed to load settings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuthorizedUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = (await request.json()) as SuperAdminSettingsRequestBody
    const section = toPrismaSection(body.section)

    if (!section) {
      return NextResponse.json({ message: "section is required" }, { status: 400 })
    }

    if (!isPlainObject(body.data)) {
      return NextResponse.json({ message: "data is required" }, { status: 400 })
    }

    const existing = await prisma.superAdminSetting.findUnique({
      where: { section },
    })

    if (existing) {
      return NextResponse.json(
        { message: "Settings already exist for this section. Use PUT to update." },
        { status: 409 }
      )
    }

    const sectionData = section === SuperAdminSettingSection.REVENUE ? buildRevenueData(body.data) : buildCompanyData(body.data)

    if (!sectionData) {
      return NextResponse.json({ message: "Invalid settings payload" }, { status: 400 })
    }

    const created = await prisma.superAdminSetting.create({
      data: {
        id: dropid("setting"),
        section,
        ...sectionData,
        createdBy: user.email,
        updatedBy: user.email,
      },
    })

    return NextResponse.json(
      formatResponse(
        created.section === SuperAdminSettingSection.REVENUE
          ? {
              platformFeePercentage: created.platformFeePercentage,
              enterpriseFeePercentage: created.enterpriseFeePercentage,
              minimumPayoutAmount: created.minimumPayoutAmount,
              payoutProcessingDays: created.payoutProcessingDays,
            }
          : null,
        created.section === SuperAdminSettingSection.COMPANY_INFO
          ? {
              companyName: created.companyName,
              companyEmail: created.companyEmail,
              supportEmail: created.supportEmail,
              companyPhone: created.companyPhone,
              companyAddress: created.companyAddress,
              companyWebsite: created.companyWebsite,
            }
          : null
      ),
      { status: 201 }
    )
  } catch (error) {
    console.error("Superadmin settings POST error:", error)
    return NextResponse.json({ message: "Failed to create settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuthorizedUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = (await request.json()) as SuperAdminSettingsRequestBody
    const section = toPrismaSection(body.section)

    if (!section) {
      return NextResponse.json({ message: "section is required" }, { status: 400 })
    }

    if (!isPlainObject(body.data)) {
      return NextResponse.json({ message: "data is required" }, { status: 400 })
    }

    const existing = await prisma.superAdminSetting.findUnique({
      where: { section },
    })

    if (!existing) {
      return NextResponse.json({ message: "Settings not found" }, { status: 404 })
    }

    const sectionData = section === SuperAdminSettingSection.REVENUE ? buildRevenueData(body.data) : buildCompanyData(body.data)

    if (!sectionData) {
      return NextResponse.json({ message: "Invalid settings payload" }, { status: 400 })
    }

    const updated = await prisma.superAdminSetting.update({
      where: { section },
      data: {
        ...sectionData,
        updatedBy: user.email,
      },
    })

    return NextResponse.json(
      formatResponse(
        updated.section === SuperAdminSettingSection.REVENUE
          ? {
              platformFeePercentage: updated.platformFeePercentage,
              enterpriseFeePercentage: updated.enterpriseFeePercentage,
              minimumPayoutAmount: updated.minimumPayoutAmount,
              payoutProcessingDays: updated.payoutProcessingDays,
            }
          : null,
        updated.section === SuperAdminSettingSection.COMPANY_INFO
          ? {
              companyName: updated.companyName,
              companyEmail: updated.companyEmail,
              supportEmail: updated.supportEmail,
              companyPhone: updated.companyPhone,
              companyAddress: updated.companyAddress,
              companyWebsite: updated.companyWebsite,
            }
          : null
      ),
      { status: 200 }
    )
  } catch (error) {
    console.error("Superadmin settings PUT error:", error)
    return NextResponse.json({ message: "Failed to update settings" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuthorizedUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = (await request.json().catch(() => ({}))) as SuperAdminSettingsRequestBody
    const section = toPrismaSection(body.section)

    if (!section) {
      return NextResponse.json({ message: "section is required" }, { status: 400 })
    }

    const existing = await prisma.superAdminSetting.findUnique({
      where: { section },
    })

    if (!existing) {
      return NextResponse.json({ message: "Settings not found" }, { status: 404 })
    }

    await prisma.superAdminSetting.delete({
      where: { section },
    })

    return NextResponse.json({ message: "Settings deleted" }, { status: 200 })
  } catch (error) {
    console.error("Superadmin settings DELETE error:", error)
    return NextResponse.json({ message: "Failed to delete settings" }, { status: 500 })
  }
}
