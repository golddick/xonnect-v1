"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Calendar, Clapperboard, Clock, Eye, Film, Library, MessageSquare, Play, Radio, Settings, Share2 } from "lucide-react"

import EventStreamPlayer from "@/components/common_component/event-stream-player"
import VideoViewPanel from "@/components/common_component/video-view-panel"
import WatchAccessOverlay from "@/components/tv/watch/watch-access-overlay"
import WatchChatPanel from "@/components/tv/watch/watch-chat-panel"
import WatchPartsPanel from "@/components/tv/watch/watch-parts-panel"

type WatchPart = {
  id: string
  title: string
  description: string | null
  duration: string | null
  views: number
  likes: number
  comments: number
  revenue: number
  thumbnail: string | null
  videoUrl: string | null
  episodeIndex: number | null
  status: string
  category: string | null
  uploadDate: string
  monetizationType: string | null
  isPrivate: boolean
  isPremium: boolean
  allowComments: boolean
  rent24Price: number | null
  rent48Price: number | null
  purchasePrice: number | null
  tags: string[]
  packageName: string | null
  isLocked: boolean
  previewOnly: boolean
  accessExpiresAt: string | null
}

type WatchFolder = {
  id: string
  title: string
  contentType: string
  status: string
  thumbnail: string | null
  uploadDate: string
  description: string | null
  creator: {
    name: string
    avatarUrl: string | null
    avatarInitials: string
  }
  parts: WatchPart[]
  access: {
    locked: boolean
    accessCodeProvided: boolean
    canUseAccessCode: boolean
    requiresSignIn: boolean
    loggedIn: boolean
    canBypassAccess: boolean
    unlockedParts: number
  }
}

type PurchaseType = "rent24" | "rent48" | "purchase"

type ChatReaction = "\u{1F44D}" | "\u{2764}\u{FE0F}" | "\u{1F525}" | "\u{1F602}" | "\u{1F44F}"

type ChatMessage = {
  id: string
  name: string
  handle: string
  time: string
  text: string
  reactions: Record<ChatReaction, number>
}

const CHAT_REACTIONS: ChatReaction[] = [
  "\u{1F44D}",
  "\u{2764}\u{FE0F}",
  "\u{1F525}",
  "\u{1F602}",
  "\u{1F44F}",
]

const DEMO_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    name: "Tunde",
    handle: "@tunde_live",
    time: "2m ago",
    text: "The teaser already looks polished. Waiting for the live drop.",
    reactions: { "👍": 4, "❤️": 2, "🔥": 6, "😂": 0, "👏": 3 },
  },
  {
    id: "msg-2",
    name: "Amina",
    handle: "@amina_oke",
    time: "1m ago",
    text: "Audio check looks good. The preview video is a nice touch.",
    reactions: { "👍": 3, "❤️": 1, "🔥": 2, "😂": 1, "👏": 2 },
  },
  {
    id: "msg-3",
    name: "Xonnect Crew",
    handle: "@host",
    time: "Now",
    text: "Stream opens when the event goes live. Preview is available for now.",
    reactions: { "👍": 6, "❤️": 4, "🔥": 8, "😂": 0, "👏": 5 },
  },
]

function cloneDemoChatMessages() {
  return DEMO_CHAT_MESSAGES.map((message) => ({
    ...message,
    reactions: { ...message.reactions },
  }))
}

export default function WatchPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const partParam = searchParams.get("part")
  const codeParam = searchParams.get("accessCode") ?? ""

  const [loading, setLoading] = useState(true)
  const [folderData, setFolderData] = useState<WatchFolder | null>(null)
  const [eventData, setEventData] = useState<any>(null)
  const [activePart, setActivePart] = useState(0)
  const [accessCode, setAccessCode] = useState("")
  const [submittedAccessCode, setSubmittedAccessCode] = useState(codeParam)
  const [codeNonce, setCodeNonce] = useState(0)
  const [previewExpiredPartId, setPreviewExpiredPartId] = useState<string | null>(null)
  const [paymentAccessCode, setPaymentAccessCode] = useState("")
  const [paymentUrl, setPaymentUrl] = useState("")
  const [buyerName, setBuyerName] = useState("")
  const [buyerEmail, setBuyerEmail] = useState("")
  const [buyerPhone, setBuyerPhone] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState<PurchaseType | "code" | null>(null)
  const [chatVisible, setChatVisible] = useState(true)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(cloneDemoChatMessages)
  const [chatDraft, setChatDraft] = useState("")

  useEffect(() => {
    setAccessCode(codeParam)
    setSubmittedAccessCode(codeParam)
    if (codeParam) {
      setCodeNonce((value) => value + 1)
    }
  }, [codeParam])

  useEffect(() => {
    setEventData(null)
    setFolderData(null)
    setLoading(true)
    setActivePart(0)
    setPreviewExpiredPartId(null)
    setMessage(null)
  }, [params.id])

  useEffect(() => {
    setChatVisible(true)
    setChatMessages(cloneDemoChatMessages())
    setChatDraft("")
  }, [params.id])

  useEffect(() => {
    if (!eventData || eventData.status === "LIVE") return

    const interval = window.setInterval(() => {
      setCodeNonce((value) => value + 1)
    }, 15000)

    return () => {
      window.clearInterval(interval)
    }
  }, [eventData?.status])

  useEffect(() => {
    let cancelled = false

    async function loadFolder(code?: string | null) {
      try {
        if (!folderData && !eventData) {
          setLoading(true)
        }
        const query = new URLSearchParams()
        if (code) query.set("accessCode", code)

        const res = await fetch(`/api/tv/watch/${params.id}${query.toString() ? `?${query.toString()}` : ""}`)
        if (!res.ok) {
          setFolderData(null)
          return
        }

        const data = await res.json()
        if (cancelled) return

        if (data?.kind === "event" && data?.event) {
          setEventData(data.event)
          setFolderData(null)
          if (submittedAccessCode) {
            setMessage(
              data.event.access?.locked
                ? "Ticket code did not unlock this event."
                : "Ticket code accepted."
            )
          }
          return
        }

        const nextFolder = data?.folder ?? null
        setEventData(null)
        setFolderData(nextFolder)

        if (nextFolder?.parts?.length) {
          const initialIndex =
            partParam && nextFolder.parts.findIndex((part: WatchPart) => part.id === partParam) >= 0
              ? nextFolder.parts.findIndex((part: WatchPart) => part.id === partParam)
              : 0
          setActivePart(initialIndex)
          if (submittedAccessCode) {
            const targetPart = nextFolder.parts[initialIndex]
            setMessage(
              targetPart && !targetPart.isLocked
                ? "Access code accepted."
                : "Access code did not unlock this video."
            )
          }
        } else {
          setActivePart(0)
        }
      } catch (error) {
        console.error("Failed to load TV watch folder:", error)
        if (!cancelled) setFolderData(null)
      } finally {
        if (!cancelled) setLoading(false)
        if (!cancelled) setBusy(null)
      }
    }

    loadFolder(submittedAccessCode)

    return () => {
      cancelled = true
    }
  }, [submittedAccessCode, codeNonce, params.id, partParam])

  const currentPart = folderData?.parts?.[activePart] ?? null
  const currentVideoUrl = currentPart?.videoUrl ?? null
  const currentThumbnail = currentPart?.thumbnail || folderData?.thumbnail || null
  const currentType = folderData?.contentType ?? "video"
  const previewExpired = Boolean(currentPart?.id && previewExpiredPartId === currentPart.id)
  const shouldShowAccessOverlay = Boolean(currentPart?.isLocked || previewExpired)
  useEffect(() => {
    if (!currentPart?.previewOnly) {
      setPreviewExpiredPartId(null)
    }
  }, [currentPart?.id, currentPart?.previewOnly])

  const contentIcon = useMemo(() => {
    switch (currentType) {
      case "series":
        return <Library className="w-5 h-5 text-red-500" />
      case "movie":
        return <Film className="w-5 h-5 text-red-500" />
      case "documentary":
        return <Clapperboard className="w-5 h-5 text-red-500" />
      default:
        return <Play className="w-5 h-5 text-red-500" />
    }
  }, [currentType])

  const handleChatReaction = (messageId: string, reaction: ChatReaction) => {
    setChatMessages((current) =>
      current.map((message) =>
        message.id === messageId
          ? {
              ...message,
              reactions: {
                ...message.reactions,
                [reaction]: (message.reactions[reaction] ?? 0) + 1,
              },
            }
          : message
      )
    )
  }

  const handleChatSend = () => {
    const trimmed = chatDraft.trim()
    if (!trimmed) return

    setChatMessages((current) => [
      ...current,
      {
        id: `demo-${Date.now()}`,
        name: "You",
        handle: "@you",
        time: "Just now",
        text: trimmed,
        reactions: { "👍": 0, "❤️": 0, "🔥": 0, "😂": 0, "👏": 0 },
      },
    ])
    setChatDraft("")
  }


  const watchFolder = folderData

  const lockOverlay = shouldShowAccessOverlay && watchFolder ? (
    <WatchAccessOverlay
      title={previewExpired ? "Preview ended" : "Premium video locked"}
      description={
        previewExpired
          ? "Purchase, rent, or enter an access code to keep watching."
          : "Purchase, rent, or enter an access code to watch this title."
      }
      accessCode={accessCode}
      accessCodePlaceholder="Enter access code"
      onAccessCodeChange={setAccessCode}
      onUnlock={() => {
        if (!accessCode.trim()) return
        setBusy("code")
        setMessage(null)
        setSubmittedAccessCode(accessCode.trim())
        setCodeNonce((value) => value + 1)
      }}
      isUnlocking={busy === "code"}
      message={message}
      primaryActionLabel="Unlock"
      loggedIn={watchFolder.access.loggedIn}
      showBuyerFields
      buyerName={buyerName}
      buyerEmail={buyerEmail}
      buyerPhone={buyerPhone}
      onBuyerNameChange={setBuyerName}
      onBuyerEmailChange={setBuyerEmail}
      onBuyerPhoneChange={setBuyerPhone}
      purchaseOptions={(["rent24", "rent48", "purchase"] as PurchaseType[]).map((purchaseType) => ({
        type: purchaseType,
        label: purchaseType,
        price:
          purchaseType === "rent24"
            ? currentPart?.rent24Price ?? null
            : purchaseType === "rent48"
              ? currentPart?.rent48Price ?? null
              : currentPart?.purchasePrice ?? null,
      }))}
      onPurchase={async (purchaseType) => {
        if (!currentPart) return

        if (!watchFolder.access.loggedIn && !buyerEmail.trim()) {
          setMessage("Add an email address before starting payment.")
          return
        }

        try {
          setBusy(purchaseType)
          setMessage(null)
          const res = await fetch(`/api/tv/watch/${currentPart.id}/purchase`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              purchaseType,
              buyerName: buyerName.trim() || undefined,
              buyerEmail: buyerEmail.trim() || undefined,
              buyerPhone: buyerPhone.trim() || undefined,
            }),
          })

          const data = await res.json()
          if (!res.ok) {
            setMessage(data?.message ?? "Unable to start payment.")
            return
          }

          setPaymentAccessCode(data.accessCode)
          setPaymentUrl(data.authorizationUrl)
          setMessage(`Access code generated: ${data.accessCode}. Complete payment to activate it.`)
        } catch (error) {
          console.error("Failed to start purchase:", error)
          setMessage("Unable to initialize payment.")
        } finally {
          setBusy(null)
        }
      }}
      isPurchasing={busy === "code" ? "purchase" : busy}
      paymentAccessCode={paymentAccessCode}
      paymentUrl={paymentUrl}
      onContinueToPayment={() => {
        if (paymentUrl) window.location.href = paymentUrl
      }}
      onUsePaymentCode={() => {
        setAccessCode(paymentAccessCode)
        setMessage("Access code copied into the unlock field.")
      }}
    />
  ) : null


  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (eventData) {
    const eventLockOverlay = eventData.access?.locked ? (
      <WatchAccessOverlay
        title={eventData.status === "LIVE" ? "Premium event locked" : "Ticket code required"}
        description={
          eventData.access?.loggedIn
            ? "Enter the ticket code from your purchase to unlock the stream."
            : "Sign in or enter your ticket code to unlock the stream."
        }
        accessCode={accessCode}
        accessCodePlaceholder="Enter ticket code"
        onAccessCodeChange={setAccessCode}
        onUnlock={() => {
          if (!accessCode.trim()) return
          setBusy("code")
          setMessage(null)
          setSubmittedAccessCode(accessCode.trim())
          setCodeNonce((value) => value + 1)
        }}
        isUnlocking={busy === "code"}
        message={message}
        primaryActionLabel="Unlock"
        loggedIn={eventData.access?.loggedIn ?? false}
      />
    ) : null

    return (
      <div className="min-h-screen bg-background text-foreground pb-20">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4 min-w-0">
              <button onClick={() => router.back()} className="p-2 hover:bg-muted rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-red-500" />
                  <h1 className="text-lg font-bold truncate max-w-[200px] md:max-w-md">{eventData.title}</h1>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>{eventData.category}</span>
                  <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <span>{eventData.status}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setChatVisible((value) => !value)}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/20 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/40"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{chatVisible ? "Hide chat" : "Show chat"}</span>
              </button>
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className={`grid grid-cols-1 gap-8 ${chatVisible ? "xl:grid-cols-[minmax(0,1fr)_380px]" : ""}`}>
            <div className="space-y-6">
              <EventStreamPlayer
                eventId={eventData.id}
                title={eventData.title}
                subtitle={eventData.description}
                poster={eventData.thumbnail}
                previewVideoUrl={eventData.thumbnailVideoUrl}
                scheduledAt={eventData.scheduledAt}
                status={eventData.status}
                wsUrl={eventData.livekitWsUrl}
                accessCode={submittedAccessCode}
                locked={Boolean(eventData.access?.locked && eventData.status === "LIVE")}
                viewers={eventData.currentViewersCount ?? 0}
                overlay={eventData.status === "LIVE" && eventData.access?.locked ? eventLockOverlay : null}
              />

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4" />
                      {eventData.currentViewersCount ?? 0} viewers
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {eventData.scheduledAt ? new Date(eventData.scheduledAt).toLocaleDateString() : "N/A"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {eventData.durationMinutes ?? 0} mins
                    </span>
                  </div>
                </div>

                <div className="p-6 bg-muted/20 rounded-2xl border border-border/50 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {eventData.description || "No description available"}
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-border bg-background/50 p-4">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Status</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{eventData.status}</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background/50 p-4">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Access</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {eventData.access?.premium ? "Premium" : "Open"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background/50 p-4">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Room</p>
                      <p className="mt-1 text-sm font-semibold text-foreground truncate">
                        {eventData.livekitRoomName || "Pending"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {chatVisible ? (
              <WatchChatPanel
                messages={chatMessages}
                reactions={CHAT_REACTIONS}
                draft={chatDraft}
                onReaction={handleChatReaction}
                onDraftChange={setChatDraft}
                onSend={handleChatSend}
                onQuickReaction={(reaction) => setChatDraft((value) => `${value}${reaction}`)}
              />
            ) : null}
          </div>

          <div className="mt-8 space-y-4">
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-muted/20 p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/15 text-red-500">
                    <Radio className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Hosted by</p>
                    <p className="font-semibold truncate">{eventData.creator?.name || "Xonnect Creator"}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl border border-border bg-background/60 p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Access</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {eventData.access?.locked ? "Locked" : "Unlocked"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background/60 p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Schedule</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {eventData.scheduledAt ? new Date(eventData.scheduledAt).toLocaleString() : "Not scheduled"}
                    </p>
                  </div>
                </div>
              </div>

              {eventData.tickets?.length > 0 ? (
                <div className="rounded-2xl border border-border bg-muted/20 p-5 space-y-3">
                  <h3 className="font-bold text-lg">Tickets</h3>
                  <div className="space-y-3">
                    {eventData.tickets.map((ticket: any) => (
                      <div key={ticket.id} className="rounded-xl border border-border bg-background/60 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <p className="font-semibold truncate">{ticket.ticketType}</p>
                            <p className="text-xs text-muted-foreground">
                              {ticket.remaining} remaining
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-foreground">
                            NGN {Number(ticket.price || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!watchFolder) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        Content not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4 min-w-0">
            <button onClick={() => router.back()} className="p-2 hover:bg-muted rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {contentIcon}
                <h1 className="text-lg font-bold truncate max-w-[200px] md:max-w-md">{watchFolder.title}</h1>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <span>{watchFolder.contentType}</span>
                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span>{watchFolder.parts?.length ?? 0} Parts</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push(`/tv/${watchFolder.contentType}`)}
              className="hidden md:flex items-center gap-2 bg-muted hover:bg-muted/80 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              <Settings className="w-4 h-4" />
              More {watchFolder.contentType}
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <VideoViewPanel
              key={currentPart?.id ?? "public-player"}
              videoUrl={currentVideoUrl}
              poster={currentThumbnail}
              title={currentPart?.title ?? watchFolder.title}
              subtitle={currentPart?.description ?? watchFolder.description}
              locked={Boolean(currentPart?.isLocked)}
              previewSeconds={currentPart?.previewOnly ? 30 : null}
              showOverlay={shouldShowAccessOverlay}
              overlay={lockOverlay}
              emptyLabel="Premium video locked"
              onPreviewExpired={() => {
                if (currentPart?.id) {
                  setPreviewExpiredPartId(currentPart.id)
                }
              }}
            />

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    {currentPart?.views ?? 0} views
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {currentPart?.uploadDate ? new Date(currentPart.uploadDate).toLocaleDateString() : "N/A"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {currentPart?.duration ?? "N/A"}
                  </span>
                </div>
              </div>

              <div className="p-6 bg-muted/20 rounded-2xl border border-border/50">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {currentPart?.description || watchFolder.description || "No description available"}
                </p>
                {currentPart?.tags && currentPart.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {currentPart.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <WatchPartsPanel
              parts={watchFolder.parts ?? []}
              activePart={activePart}
              onSelectPart={(index) => {
                setActivePart(index)
                setPreviewExpiredPartId(null)
              }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
