import { NextRequest, NextResponse } from "next/server"
import { subscribeNewsletter } from "@/lib/auth/dropaphi-client"

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      email?: string
      name?: string
      source?: string
      templateId?: string
    }

    const email = body.email?.toLowerCase().trim()
    const name = body.name?.trim() ?? undefined
    const source = body.source ?? "landing_page"
    const templateId = body.templateId

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    const result = await subscribeNewsletter({
      email,
      name,
      source,
      templateId,
    })

    if (!result.ok) {
      return NextResponse.json({ success: false, message: result.message ?? 'Failed to subscribe' }, { status: 500 })
    }

    return NextResponse.json({ success: true, subscriber: result.subscriber ?? null })
  } catch (error: any) {
    console.error('Newsletter subscribe route error:', error)
    return NextResponse.json({ success: false, message: error?.message ?? 'Subscription failed' }, { status: 500 })
  }
}
