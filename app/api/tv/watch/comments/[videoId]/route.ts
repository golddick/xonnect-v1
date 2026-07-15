import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db"
import { dropid } from "dropid"


interface RouteParams {
  params: Promise<{
    videoId: string
  }>
}

// GET comments for a specific video
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params
    const { videoId } = resolvedParams

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

    const formattedComments = comments.map((comment) => ({
      id: comment.id,
      author: comment.commenterProfileId || "Anonymous",
      authorEmail: null,
      text: comment.content,
      createdAt: comment.createdAt.toISOString(),
      likes: 0,
      replies: [],
    }))

    return NextResponse.json({ comments: formattedComments })
  } catch (error) {
    console.error("Failed to fetch comments:", error)
    return NextResponse.json(
      { message: "Failed to fetch comments" },
      { status: 500 }
    )
  }
}

// POST a new comment
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params
    const { videoId } = resolvedParams
    const session = await auth()
    const body = await request.json()
    const { text, authorEmail, authorName, parentCommentId } = body

    if (!videoId || !text) {
      return NextResponse.json(
        { message: "videoId and text are required" },
        { status: 400 }
      )
    }

    if (!authorEmail) {
      return NextResponse.json(
        { message: "Email is required to post a comment" },
        { status: 400 }
      )
    }

    const textTrimmed = String(text).trim()
    if (!textTrimmed) {
      return NextResponse.json(
        { message: "Comment cannot be empty" },
        { status: 400 }
      )
    }

    // Validate video exists
    const video = await prisma.creatorVideo.findFirst({
      where: { id: videoId },
      select: { id: true },
    })

    if (!video) {
      return NextResponse.json(
        { message: "Video not found" },
        { status: 404 }
      )
    }

    // Create comment
    const comment = await prisma.creatorVideoComment.create({
      data: {
        id: dropid("vdoComment"),
        creatorVideoId: videoId,
        content: textTrimmed,
        commenterProfileId: session?.user?.profileId || null,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    })

    const formattedComment = {
      id: comment.id,
      author: authorName || "Anonymous",
      authorEmail,
      text: comment.content,
      createdAt: comment.createdAt.toISOString(),
      likes: 0,
      replies: [],
    }

    return NextResponse.json({ comment: formattedComment })
  } catch (error) {
    console.error("Failed to create comment:", error)
    return NextResponse.json(
      { message: "Failed to create comment" },
      { status: 500 }
    )
  }
}

// PATCH to like/unlike a comment
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params
    const { videoId } = resolvedParams
    const body = await request.json()
    const { commentId, like } = body

    if (!videoId || !commentId || like === undefined) {
      return NextResponse.json(
        { message: "videoId, commentId and like are required" },
        { status: 400 }
      )
    }

    const existingComment = await prisma.creatorVideoComment.findUnique({
      where: { id: commentId },
      select: { id: true },
    })

    if (!existingComment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "Comment likes are not supported",
      comment: {
        id: existingComment.id,
        likes: 0,
      },
    })
  } catch (error) {
    console.error("Failed to update comment:", error)
    return NextResponse.json(
      { message: "Failed to update comment" },
      { status: 500 }
    )
  }
}
