import VideoStreamViewer from "../../../video-stream-viewer"
import StreamPlayer from "../../../components/stream-player"

interface PageProps {
  params: {
    id: string
  }
  searchParams: {
    live?: string
    user?: string
  }
}

export default function WatchPage({ params, searchParams }: PageProps) {
  const isLive = searchParams.live === "true"
  const userRole = (searchParams.user as "viewer" | "creator" | "moderator") || "viewer"

  const mockTickets = [
    {
      id: "vip-physical",
      name: "VIP Physical Ticket",
      price: 50000,
      type: "physical" as const,
      benefits: [
        "Front row access",
        "Exclusive VIP lounge",
        "Meet & greet opportunity",
        "Premium merchandise pack",
        "Digital download of event",
      ],
      quantity: 24,
      description: "Premium physical ticket with exclusive VIP experiences",
    },
    {
      id: "standard-physical",
      name: "Standard Physical Ticket",
      price: 25000,
      type: "physical" as const,
      benefits: ["General admission", "Venue access", "Event program", "Digital access 30 days"],
      quantity: 156,
      description: "General admission physical ticket",
    },
    {
      id: "vip-streaming",
      name: "VIP Streaming Pass",
      price: 15000,
      type: "streaming" as const,
      benefits: ["4K HD streaming", "Behind-the-scenes content", "Exclusive Q&A access", "Lifetime replay access"],
      quantity: 500,
      description: "Premium streaming experience with exclusive content",
    },
    {
      id: "standard-streaming",
      name: "Standard Streaming Pass",
      price: 8000,
      type: "streaming" as const,
      benefits: ["1080p HD streaming", "7-day replay access", "Chat access"],
      quantity: 1000,
      description: "Standard streaming access to the event",
    },
  ]

  if (isLive) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <StreamPlayer
                isLive={true}
                title="Live Music Festival 2024"
                viewers={2847}
                hasTickets={true}
                tickets={mockTickets}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <VideoStreamViewer videoId={params.id} isLive={false} userRole={userRole} />
}
