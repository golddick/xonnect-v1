import { NextRequest, NextResponse } from 'next/server'
import { getBlogPostBySlugFromDropaphi } from '@/lib/auth/dropaphi-client'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const payload = await getBlogPostBySlugFromDropaphi(slug)
    return NextResponse.json(payload)
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message ?? 'Unable to fetch blog post.',
        data: null,
      },
      { status: 500 }
    )
  }
}
