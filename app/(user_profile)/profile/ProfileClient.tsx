"use client"

import { useState, useEffect } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Profile } from "@/lib/generated/prisma"
import { ProfileEditForm } from "@/components/profile-edit-form"
import { User, Ticket, Users, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

interface Ticket {
  id: string
  createdAt: string
  status: string
  quantity: number
  totalPrice: number
  ticketCode: string
  ticket: {
    id: string
    name: string
    description: string | null
    price: number
    quantity: number
    quantitySold: number
  }
  event: {
    id: string
    title: string
    description: string | null
    thumbnailUrl: string | null
    scheduledAt: string | null
    creatorId: string
    creator: {
      profile: {
        fullName: string | null
        avatarUrl: string | null
      }
    }
  }
}

interface Video {
  id: string
  createdAt: string
  status: string
  totalPrice: number
  video: {
    id: string
    title: string
    description: string | null
    thumbnailUrl: string | null
    createdAt: string
    creatorId: string
    creator: {
      profile: {
        fullName: string | null
        avatarUrl: string | null
      }
    }
  }
}

interface Creator {
  id: string
  name: string
  avatarUrl: string | null
  email: string
  followersCount: number
  followingCount: number
}

export default function ProfileClient({
  profile,
}: {
  profile: Profile | null
}) {
  const uploadedAvatarUrl = profile?.avatarUrl ?? null
  const [activeTab, setActiveTab] = useState("profile")
  const [subTab, setSubTab] = useState<"tickets" | "videos">("tickets")
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (activeTab === "tickets") {
      fetchTickets()
    } else if (activeTab === "creators") {
      fetchCreators()
    }
  }, [activeTab])

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/profile/tickets")
      if (!res.ok) throw new Error("Failed to fetch tickets")
      const data = await res.json()
      setTickets(data.tickets || [])
      setVideos(data.videos || [])
    } catch (error) {
      toast.error("Failed to load tickets")
    } finally {
      setLoading(false)
    }
  }

  const fetchCreators = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/profile/following")
      if (!res.ok) throw new Error("Failed to fetch creators")
      const data = await res.json()
      setCreators(data.creators || [])
    } catch (error) {
      toast.error("Failed to load followed creators")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-border bg-card p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                  activeTab === "profile"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("tickets")}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                  activeTab === "tickets"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Ticket className="h-5 w-5" />
                <span className="font-medium">Tickets & Videos</span>
              </button>
              <button
                onClick={() => setActiveTab("community")}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                  activeTab === "community"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Users className="h-5 w-5" />
                <span className="font-medium">Community</span>
              </button>
              <button
                onClick={() => setActiveTab("creators")}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                  activeTab === "creators"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Play className="h-5 w-5" />
                <span className="font-medium">Following</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border border-border bg-card p-8">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Edit Profile</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Update your profile information
                  </p>
                </div>
                <ProfileEditForm
                  profile={profile}
                  avatarUrlOverride={uploadedAvatarUrl}
                />
              </div>
            )}

            {activeTab === "tickets" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">My Tickets & Videos</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    View your purchased event tickets and videos separately
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSubTab("tickets")}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      subTab === "tickets"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    Tickets
                  </button>
                  <button
                    onClick={() => setSubTab("videos")}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      subTab === "videos"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    Videos
                  </button>
                </div>

                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                ) : (
                  <div className="space-y-8">
                    {subTab === "tickets" && (
                      <div>
                        {tickets.length > 0 ? (
                          <div className="grid gap-4 md:grid-cols-2">
                            {tickets.map((ticket) => (
                              <Link
                                key={ticket.id}
                                href={`/tickets/document/${ticket.ticketCode}`}
                                className="overflow-hidden rounded-lg border border-border bg-muted/50 transition-colors hover:border-primary"
                              >
                                <div className="relative h-32 w-full overflow-hidden bg-muted">
                                  {ticket.event?.thumbnailUrl && (
                                    <Image
                                      src={ticket.event.thumbnailUrl}
                                      alt={ticket.event.title ?? 'Event thumbnail'}
                                      fill
                                      className="object-cover"
                                    />
                                  )}
                                </div>
                                <div className="p-4">
                                  <h4 className="font-semibold line-clamp-2">
                                    {ticket.event?.title ?? 'Untitled event'}
                                  </h4>
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    {ticket.ticket.name}
                                  </p>
                                  <div className="mt-3 flex items-center justify-between">
                                    <span className="text-xs font-medium text-primary">
                                      Qty: {ticket.quantity}
                                    </span>
                                    <span className="text-sm font-semibold">
                                      ${ticket.totalPrice.toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 py-12 text-center">
                            <p className="text-muted-foreground">No tickets purchased yet</p>
                          </div>
                        )}
                      </div>
                    )}

                    {subTab === "videos" && (
                      <div>
                        {videos.length > 0 ? (
                          <div className="grid gap-4 md:grid-cols-2">
                            {videos.map((video) => (
                              <div
                                key={video.id}
                                className="overflow-hidden rounded-lg border border-border bg-muted/50"
                              >
                                <div className="relative h-32 w-full overflow-hidden bg-muted">
                                  {video.video.thumbnailUrl && (
                                    <Image
                                      src={video.video.thumbnailUrl}
                                      alt={video.video.title}
                                      fill
                                      className="object-cover"
                                    />
                                  )}
                                </div>
                                <div className="p-4">
                                  <h4 className="font-semibold line-clamp-2">
                                    {video.video.title}
                                  </h4>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    {new Date(video.video.createdAt).toLocaleDateString()}
                                  </p>
                                  <div className="mt-3 text-sm font-semibold">
                                    ${video.totalPrice.toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 py-12 text-center">
                            <p className="text-muted-foreground">No videos purchased yet</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "community" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Community</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your community contributions coming soon
                  </p>
                </div>
                <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 py-12 text-center">
                  <p className="text-muted-foreground">
                    Community features coming soon
                  </p>
                </div>
              </div>
            )}

            {activeTab === "creators" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Creators I Follow</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Manage the creators you follow
                  </p>
                </div>

                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                ) : creators.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {creators.map((creator) => (
                      <div
                        key={creator.id}
                        className="overflow-hidden rounded-lg border border-border bg-card p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative h-12 w-12 flex-shrink-0 rounded-full bg-muted overflow-hidden">
                            {creator.avatarUrl && (
                              <Image
                                src={creator.avatarUrl}
                                alt={creator.name}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold line-clamp-1">{creator.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {creator.email}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                          <div className="rounded bg-muted/50 p-2">
                            <p className="text-xs text-muted-foreground">Followers</p>
                            <p className="font-semibold">{creator.followersCount}</p>
                          </div>
                          <div className="rounded bg-muted/50 p-2">
                            <p className="text-xs text-muted-foreground">Following</p>
                            <p className="font-semibold">{creator.followingCount}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 py-12 text-center">
                    <p className="text-muted-foreground">
                      You haven't followed any creators yet
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

