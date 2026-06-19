import WatchPage from "@/app/(Xonnect_tv)/tv/watch/_components/watch-page"

export default async function FolderWatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <WatchPage kind="folder" watchId={id} />
}
