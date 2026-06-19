import WatchPage from "@/app/(Xonnect_tv)/tv/watch/_components/watch-page"

export default async function EventWatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <WatchPage kind="event" watchId={id} />
}
