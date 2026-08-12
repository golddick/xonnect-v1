import { NextRequest, NextResponse } from 'next/server'
import { getBlogPostsFromDropaphi } from '@/lib/auth/dropaphi-client'

export async function GET(_request: NextRequest) {
  try {
    const payload = await getBlogPostsFromDropaphi()
    return NextResponse.json(payload)
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message ?? 'Unable to fetch blog posts.',
        data: {
          posts: [],
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            pages: 0,
          },
        },
      },
      { status: 500 }
    )
  }
}
