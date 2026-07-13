import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db"
import { dropid } from "dropid"


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get("videoId")

    if (!videoId) {
      return NextResponse.json(
        { message: "videoId is required" },
        { status: 400 }
      )
    }

    const comments = await prisma.creatorVideoComment.findMany({
      where: {
        creatorVideoId: videoId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        commenterProfileId: true,
      },
    })

    return NextResponse.json({ comments })
  } catch (error) {
    console.error("Failed to fetch comments:", error)
    return NextResponse.json(
      { message: "Failed to fetch comments" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    const body = await request.json()
    const { videoId, content } = body

    if (!videoId || !content) {
      return NextResponse.json(
        { message: "videoId and content are required" },
        { status: 400 }
      )
    }

    const contentTrimmed = String(content).trim()
    if (!contentTrimmed) {
      return NextResponse.json(
        { message: "Comment cannot be empty" },
        { status: 400 }
      )
    }

    // Get commenter profile ID (optional if not logged in)
    let commenterProfileId: string | null = null
    if (session?.user?.id) {
      commenterProfileId = session.user.id
    }

    const comment = await prisma.creatorVideoComment.create({
      data: {
        id: dropid("vdoComment"),
        creatorVideoId: videoId,
        content: contentTrimmed,
        commenterProfileId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        commenterProfileId: true,
      },
    })

    return NextResponse.json({ comment })
  } catch (error) {
    console.error("Failed to create comment:", error)
    return NextResponse.json(
      { message: "Failed to create comment" },
      { status: 500 }
    )
  }
}
