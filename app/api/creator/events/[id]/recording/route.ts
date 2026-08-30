import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db/prisma"
import { Role } from "@/lib/generated/prisma"
import { deleteRecordingObject, isStorageKey } from "@/lib/supabase-storage"

const db = prisma as any

async function getCreatorIdOrResponse() {
  const session = await auth()
  const role = session?.user?.role

  if (!session?.user?.email || role !== Role.CREATOR) {
    return { response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) }
  }

  const email = session.user.email.toLowerCase()
  const creator = await db.creator.findFirst({
    where: { profile: { email } },
    select: { id: true },
  })

  if (!creator) {
    return { response: NextResponse.json({ message: "Creator profile not found" }, { status: 404 }) }
  }

  return { creatorId: creator.id }
}

// Deletes the saved replay for an event: removes the MP4 from the private Supabase
// bucket (only when the stored value is a storage key — legacy uploadthing URLs are
// left alone) and clears the recording fields so the replay is no longer served.
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const creatorResult = await getCreatorIdOrResponse()
    if ("response" in creatorResult) return creatorResult.response

    const { id } = await params
    const event = await db.creatorEvent.findFirst({
      where: { id, creatorId: creatorResult.creatorId },
      select: { id: true, recordedVideoUrl: true },
    })

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    // Best-effort object removal. A storage failure shouldn't block clearing the
    // fields — otherwise a half-deleted object would keep the replay "stuck".
    if (isStorageKey(event.recordedVideoUrl)) {
      await deleteRecordingObject(event.recordedVideoUrl)
    }

    const updated = await db.creatorEvent.update({
      where: { id: event.id },
      data: {
        recordedVideoUrl: null,
        recordedVideoFileId: null,
        recordingAssetId: null,
        hasRecordedVideo: false,
        recordingStatus: "DISABLED",
      },
    })

    return NextResponse.json({ event: updated }, { status: 200 })
  } catch (error) {
    console.error("Delete recording error:", error)
    const message = error instanceof Error ? error.message : "Failed to delete recording"
    return NextResponse.json({ message }, { status: 500 })
  }
}
