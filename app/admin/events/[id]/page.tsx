import { getEventDetails } from "@/actions/admin"
import AdminEventDetail from "../../../../admin-event-detail"
import { notFound } from "next/navigation"

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
