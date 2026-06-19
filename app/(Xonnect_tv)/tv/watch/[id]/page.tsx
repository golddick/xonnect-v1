import { notFound, redirect } from "next/navigation"

import { prisma } from "@/lib/db/prisma"

export const dynamic = "force-dynamic"

export default async function LegacyWatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const { id } = await params
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(resolvedSearchParams)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === "string" && item.trim()) {
          query.append(key, item)
        }
      }
      continue
    }

    if (typeof value === "string" && value.trim()) {
      query.set(key, value)
    }
  }

  const appendQuery = (target: string) => {
    const suffix = query.toString()
    return suffix ? `${target}?${suffix}` : target
  }

  const folder = await prisma.creatorVideoFolder.findFirst({
    where: { id },
    select: { id: true },
  })

  if (folder) {
    redirect(appendQuery(`/tv/watch/folder/${folder.id}`))
  }

  const event = await prisma.creatorEvent.findFirst({
    where: { id },
    select: { id: true },
  })

  if (event) {
    redirect(appendQuery(`/tv/watch/event/${event.id}`))
  }

  notFound()
}
