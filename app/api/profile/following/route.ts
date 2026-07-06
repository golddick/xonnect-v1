import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/db/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const profile = await prisma.profile.findFirst({
      where: { email: session.user.email.toLowerCase() },
      select: { id: true },
    })

    if (!profile?.id) {
      return NextResponse.json({ creators: [] })
    }

    const profileId = profile.id

    // Get creators that the current user follows
    const followedCreators = await prisma.creator.findMany({
      where: {
        follows: {
          some: {
            followerProfileId: profileId,
            status: 'active',
          },
        },
      },
      select: {
        id: true,
        profile: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            email: true,
          },
        },
        followersCount: true,
        followingCount: true,
      },
    })

    return NextResponse.json({
      creators: followedCreators.map((creator) => ({
        id: creator.id,
        name: creator.profile.fullName || 'Xonnect Creator',
        avatarUrl: creator.profile.avatarUrl,
        email: creator.profile.email,
        followersCount: creator.followersCount,
        followingCount: creator.followingCount,
      })),
    })
  } catch (error) {
    console.error('Error fetching followed creators:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
