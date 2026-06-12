import { notFound } from "next/navigation"
import AdminEventDetail from "../../dashboard/_component/admin-event-detail"
import { getEventDetails } from "@/actions/admin"

interface EventPageProps {
  params: {
    id: string
  }
}

export default async function EventDetailPage({ params }: EventPageProps) {
  try {
    const event = await getEventDetails(params.id)

    if (!event) {
      return notFound()
    }

    return <AdminEventDetail event={event as typeof event & { status: "UPCOMING" | "LIVE" | "COMPLETED" | "CANCELLED" }} />
  } catch (error) {
    console.error("Error loading event:", error)
    return notFound()
  }
}
