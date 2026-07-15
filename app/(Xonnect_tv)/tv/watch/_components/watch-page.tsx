"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { ArrowLeft, Banknote, Calendar, Clapperboard, ChevronDown, Clock, Eye, Film, Handshake, Heart, Library, Lock, LockOpen, MessageSquare, Play, Radio, Settings, Share2 } from "lucide-react"

import EventStreamPlayer from "@/components/common_component/event-stream-player"
import VideoViewPanel from "@/components/common_component/video-view-panel"
import WatchAccessOverlay from "@/components/tv/watch/watch-access-overlay"
import WatchChatPanel from "@/components/tv/watch/watch-chat-panel"
import WatchPartsPanel from "@/components/tv/watch/watch-parts-panel"
import { FollowButton, LikeButton } from "@/components/tv/follow-like-buttons"
import { ExpandableDescription } from "@/components/tv/expandable-description"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { type WatchFolder, type WatchPart } from "@/lib/tv/watch-folder"
import LoadingSplash from "@/components/splash_screen/loading-splash"

type WatchContentKind = "event" | "folder"
type PurchaseType = "rent24" | "rent48" | "purchase"
type ChatReaction = "\u{1F44D}" | "\u{2764}\u{FE0F}" | "\u{1F525}" | "\u{1F602}" | "\u{1F44F}"

type ChatMessage = {
  id: string
  name: string
  handle: string
  time: string
  text: string
  reactions: Record<ChatReaction, number>
  failed?: boolean
}

type WatchPageProps = {
  kind: WatchContentKind
  watchId: string
}

type WatchComment = {
  id: string
  author: string
  authorEmail: string
  text: string
  createdAt: string
  likes: number
  likedBy?: string[] // Track who liked this comment
  replies: WatchComment[]
}

const GUEST_ACCESS_STORAGE_PREFIX = "xonnect-watch-guest-access"
const ACCESS_GRANT_STORAGE_PREFIX = "xonnect-watch-access-grant"

function readStoredGuestAccess(kind: WatchContentKind, watchId: string) {
  if (typeof window === "undefined") return ""

  try {
    const stored = window.sessionStorage.getItem(`${GUEST_ACCESS_STORAGE_PREFIX}:${kind}:${watchId}`)
    return typeof stored === "string" ? stored.trim() : ""
  } catch {
    return ""
  }
}

function persistGuestAccess(kind: WatchContentKind, watchId: string, accessCode: string) {
  if (typeof window === "undefined") return

  const trimmed = accessCode.trim()
  if (!trimmed) return

  try {
    window.sessionStorage.setItem(`${GUEST_ACCESS_STORAGE_PREFIX}:${kind}:${watchId}`, trimmed)
  } catch {
    // ignore storage errors
  }
}

function clearStoredGuestAccess(kind: WatchContentKind, watchId: string) {
  if (typeof window === "undefined") return

  try {
    window.sessionStorage.removeItem(`${GUEST_ACCESS_STORAGE_PREFIX}:${kind}:${watchId}`)
  } catch {
    // ignore storage errors
  }
}

function readStoredAccessGrant(kind: WatchContentKind, watchId: string, partId?: string | null) {
  if (typeof window === "undefined" || !partId) return false

  try {
    const stored = window.localStorage.getItem(`${ACCESS_GRANT_STORAGE_PREFIX}:${kind}:${watchId}:${partId}`)
    if (!stored) return false
    if (stored === "1") return true

    const parsed = JSON.parse(stored) as { granted?: boolean; expiresAt?: string | null }
    if (parsed?.granted !== true) return false

    if (parsed?.expiresAt && new Date(parsed.expiresAt).getTime() <= Date.now()) {
      clearStoredAccessGrant(kind, watchId, partId)
      return false
    }

    return true
  } catch {
    return false
  }
}

function persistAccessGrant(kind: WatchContentKind, watchId: string, partId?: string | null, expiresAt?: string | null) {
  if (typeof window === "undefined" || !partId) return

  try {
    const payload = { granted: true, expiresAt: expiresAt ?? null }
    window.localStorage.setItem(`${ACCESS_GRANT_STORAGE_PREFIX}:${kind}:${watchId}:${partId}`, JSON.stringify(payload))
  } catch {
    // ignore storage errors
  }
}

function clearStoredAccessGrant(kind: WatchContentKind, watchId: string, partId?: string | null) {
  if (typeof window === "undefined") return

  try {
    const storageKey = partId ? `${ACCESS_GRANT_STORAGE_PREFIX}:${kind}:${watchId}:${partId}` : `${ACCESS_GRANT_STORAGE_PREFIX}:${kind}:${watchId}`
    window.localStorage.removeItem(storageKey)
  } catch {
    // ignore storage errors
  }
}

function clearStoredAccessState(kind: WatchContentKind, watchId: string, partId?: string | null) {
  clearStoredAccessGrant(kind, watchId, partId)
  clearStoredGuestAccess(kind, watchId)
}

const CHAT_REACTIONS: ChatReaction[] = [
  "\u{1F44D}",
  "\u{2764}\u{FE0F}",
  "\u{1F525}",
  "\u{1F602}",
  "\u{1F44F}",
]

// Live chat: fetch recent messages and subscribe over WebSocket.
// Anonymous users will send messages with name "Unknown" and handle "@unknown".

export default function WatchPage({ kind, watchId }: WatchPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const partParam = searchParams.get("part")
  const codeParam = searchParams.get("accessCode") ?? ""
  const trxrefParam = searchParams.get("trxref") ?? ""
  const referenceParam = searchParams.get("reference") ?? ""
  const { data: session } = useSession()

  const [loading, setLoading] = useState(true)
  const [folderData, setFolderData] = useState<WatchFolder | null>(null)
  const [eventData, setEventData] = useState<any>(null)
  const [activePart, setActivePart] = useState(0)
  const [accessCode, setAccessCode] = useState(() => codeParam || readStoredGuestAccess(kind, watchId) || "")
  const [submittedAccessCode, setSubmittedAccessCode] = useState(() => codeParam || readStoredGuestAccess(kind, watchId) || "")
  const [codeNonce, setCodeNonce] = useState(0)
  const [previewExpiredPartId, setPreviewExpiredPartId] = useState<string | null>(null)
  const [paymentAccessCode, setPaymentAccessCode] = useState("")
  const [paymentUrl, setPaymentUrl] = useState("")
  const [accessOverlayDismissed, setAccessOverlayDismissed] = useState(false)
  const [accessGranted, setAccessGranted] = useState(false)
  const [accessGrantExpiryNotified, setAccessGrantExpiryNotified] = useState(false)
  const [buyerName, setBuyerName] = useState("")
  const [buyerEmail, setBuyerEmail] = useState("")
  const [buyerPhone, setBuyerPhone] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [showGuestEmailPrompt, setShowGuestEmailPrompt] = useState(false)
  const [pendingPurchaseAction, setPendingPurchaseAction] = useState<((email: string) => Promise<void> | void) | null>(null)
  const [busy, setBusy] = useState<PurchaseType | "code" | null>(null)
  const [chatVisible, setChatVisible] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatDraft, setChatDraft] = useState("")
  const [eventLikesCount, setEventLikesCount] = useState(0)
  const [eventIsLiked, setEventIsLiked] = useState(false)
  const [videoLikesCount, setVideoLikesCount] = useState(0)
  const [videoIsLiked, setVideoIsLiked] = useState(false)
  const [creatorIsFollowed, setCreatorIsFollowed] = useState(false)
  const [comments, setComments] = useState<WatchComment[]>([])
  const [commentDraft, setCommentDraft] = useState("")
  const [commentEmailInput, setCommentEmailInput] = useState("")
  const [commentEmailError, setCommentEmailError] = useState("")
  const [commentSheetOpen, setCommentSheetOpen] = useState(false)
  const [replyingToId, setReplyingToId] = useState<string | null>(null)
  const [showAllComments, setShowAllComments] = useState(false)
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())
  const eventSourceRef = useRef<EventSource | null>(null)
  const sessionKey = `${session?.user?.email ?? ""}:${session?.user?.id ?? ""}`

  useEffect(() => {
    if (session?.user?.email) {
      setCommentEmailInput(session.user.email)
    }
  }, [session?.user?.email])

  useEffect(() => {
    const nextAccessCode = codeParam || readStoredGuestAccess(kind, watchId) || ""
    setAccessCode(nextAccessCode)
    setSubmittedAccessCode(nextAccessCode)
    setAccessGranted(false)
    if (nextAccessCode) {
      setCodeNonce((value) => value + 1)
    }
  }, [codeParam, kind, watchId])

  useEffect(() => {
    if (!trxrefParam && !referenceParam) return

    const pendingAccessCode = codeParam.trim()
    if (pendingAccessCode) {
      persistGuestAccess(kind, watchId, pendingAccessCode)
      setSubmittedAccessCode(pendingAccessCode)
      setAccessCode(pendingAccessCode)
      setCodeNonce((value) => value + 1)
      setMessage("Your payment is being confirmed. We’ll unlock the video once it settles.")
    }
  }, [kind, watchId, codeParam, trxrefParam, referenceParam])

  useEffect(() => {
    setEventData(null)
    setFolderData(null)
    setLoading(true)
    setActivePart(0)
    setPreviewExpiredPartId(null)
    setMessage(null)
    setAccessOverlayDismissed(false)
    setSubmittedAccessCode(codeParam)
  }, [watchId, kind, codeParam])

  useEffect(() => {
    if (!watchId || !kind) return

    const recheckAccess = () => {
      setAccessGranted(readStoredAccessGrant(kind, watchId, currentPart?.id ?? watchId))
      setCodeNonce((value) => value + 1)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        recheckAccess()
      }
    }

    recheckAccess()

    if (typeof window === "undefined") return

    window.addEventListener("focus", recheckAccess)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("focus", recheckAccess)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [sessionKey, watchId, kind])

  useEffect(() => {
    // show chat by default and clear draft, then fetch recent messages
    setChatVisible(true)
    setChatDraft("")

    let cancelled = false
    async function loadRecent() {
      try {
        const res = await fetch(`/api/tv/watch/chat/${watchId}?kind=${encodeURIComponent(kind)}`)
        if (!res.ok) return
        const data = await res.json()
        if (cancelled) return
        setChatMessages(Array.isArray(data?.messages) ? data.messages : [])
      } catch (err) {
        console.error("Failed to load recent chat messages:", err)
      }
    }

    if (watchId) loadRecent()

    // connect to SSE for live updates
    if (typeof window !== "undefined") {
      const sseUrl = `/api/tv/watch/sse/${watchId}?kind=${encodeURIComponent(kind)}`
      const es = new EventSource(sseUrl)
      eventSourceRef.current = es

      es.addEventListener("message", (ev) => {
        try {
          const payload = JSON.parse(ev.data)
          if (payload?.message) {
            setChatMessages((current) => {
              if (current.some((message) => message.id === payload.message.id)) {
                return current.map((message) => (message.id === payload.message.id ? payload.message : message))
              }
              return [...current, payload.message]
            })
          }
        } catch (e) {
          // ignore
        }
      })

      es.addEventListener("ping", () => {
        // heartbeat
      })

      es.addEventListener("error", (e) => {
        console.error("SSE error", e)
        es.close()
      })
    }

    return () => {
      cancelled = true
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
        eventSourceRef.current = null
      }
    }
  }, [watchId, kind])

  useEffect(() => {
    if (!watchId || !kind || kind !== "event") {
      return
    }

    const normalizedStatus = String(eventData?.status ?? "").toUpperCase()
    const shouldPoll = normalizedStatus !== "ENDED" && normalizedStatus !== "FINISHED" && normalizedStatus !== "COMPLETED"

    if (!shouldPoll) {
      return
    }

    const pollForStatus = async () => {
      try {
        const query = new URLSearchParams()
        if (submittedAccessCode) {
          query.set("accessCode", submittedAccessCode)
        }

        const response = await fetch(`/api/tv/watch/event/${watchId}${query.toString() ? `?${query.toString()}` : ""}`)
        if (!response.ok) return

        const data = await response.json()
        if (data?.kind !== "event" || !data?.event) return

        setEventData(data.event)

        setEventLikesCount(data.event.likesCount ?? 0)
        setEventIsLiked(data.event.isLiked ?? false)
        setCreatorIsFollowed(data.event.creator?.isFollowing ?? false)

        if (submittedAccessCode) {
          setMessage(
            data.event.access?.locked
              ? "Ticket code did not unlock this event."
              : "Ticket code accepted."
          )
        }
      } catch (error) {
        console.error("Failed to refresh event status:", error)
      }
    }

    const intervalId = window.setInterval(() => {
      void pollForStatus()
    }, 10000)

    return () => window.clearInterval(intervalId)
  }, [eventData?.status, submittedAccessCode, watchId, kind])

  useEffect(() => {
    // Only load comments for videos/folders, not events
    if (kind !== "folder" || !watchId) {
      setComments([])
      return
    }

    let cancelled = false

    async function loadComments() {
      try {
        const response = await fetch(`/api/tv/watch/comments/${watchId}`)
        if (!response.ok) {
          // Fall back to demo comments if API fails
          setComments([
            // {
            //   id: "demo-comment-1",
            //   author: "Ada",
            //   authorEmail: "ada@example.com",
            //   text: "The pacing is perfect and the production quality is amazing.",
            //   createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
            //   likes: 12,
            //   replies: [
            //     {
            //       id: "demo-reply-1",
            //       author: "Mina",
            //       authorEmail: "mina@example.com",
            //       text: "Absolutely. This feels like a premium stream.",
            //       createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            //       likes: 5,
            //       replies: [],
            //     },
            //   ],
            // },
          ])
          return
        }

        const data = await response.json()
        if (!cancelled && Array.isArray(data.comments)) {
          setComments(data.comments)
        }
      } catch (error) {
        console.error("Failed to load comments:", error)
        // Fall back to demo comments
        if (!cancelled) {
          setComments([
            {
              id: "demo-comment-1",
              author: "Ada",
              authorEmail: "ada@example.com",
              text: "The pacing is perfect and the production quality is amazing.",
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
              likes: 12,
              replies: [
                {
                  id: "demo-reply-1",
                  author: "Mina",
                  authorEmail: "mina@example.com",
                  text: "Absolutely. This feels like a premium stream.",
                  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                  likes: 5,
                  replies: [],
                },
              ],
            },
          ])
        }
      }
    }

    loadComments()

    return () => {
      cancelled = true
    }
  }, [watchId, kind])

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

    async function loadContent(code?: string | null) {
      try {
        if (!folderData && !eventData) {
          setLoading(true)
        }

        const query = new URLSearchParams()
        if (code) query.set("accessCode", code)

        const basePath = kind === "event" ? "/api/tv/watch/event" : "/api/tv/watch/folder"
        const res = await fetch(`${basePath}/${watchId}${query.toString() ? `?${query.toString()}` : ""}`)
        if (!res.ok) {
          if (!cancelled) {
            setFolderData(null)
            setEventData(null)
          }
          return
        }

        const data = await res.json()

        console.log(data, 'data')

        if (cancelled) return

        if (kind === "event" && data?.kind === "event" && data?.event) {
          setEventData(data.event)
          setEventLikesCount(data.event.likesCount ?? 0)
          setEventIsLiked(data.event.isLiked ?? false)
          setCreatorIsFollowed(data.event.creator?.isFollowing ?? false)
          // Auto-grant access for logged-in users if the server marks the event unlocked
          if (session?.user && !data.event.access?.locked) {
            persistAccessGrant(kind, watchId, watchId, data.event.access?.accessExpiresAt ?? null)
            setAccessGranted(true)
            setAccessOverlayDismissed(false)
          }
          setFolderData(null)
          if (submittedAccessCode) {
            const accessAccepted = !data.event.access?.locked
            if (accessAccepted) {
              persistGuestAccess(kind, watchId, submittedAccessCode)
              persistAccessGrant(kind, watchId, watchId, data.event.access?.accessExpiresAt ?? null)
              setAccessGranted(true)
              setAccessOverlayDismissed(false)
            } else {
              clearStoredGuestAccess(kind, watchId)
              clearStoredAccessGrant(kind, watchId, watchId)
              setAccessGranted(false)
            }
            setMessage(
              data.event.access?.locked
                ? "Ticket code did not unlock this event."
                : "Ticket code accepted."
            )
          }
          return
        }

        if (kind === "folder" && data?.kind === "folder" && data?.folder) {
          const nextFolder = data.folder
          setEventData(null)
          setFolderData(nextFolder)
          setCreatorIsFollowed(nextFolder.creator?.isFollowing ?? false)

          if (nextFolder?.parts?.length) {
            const matchedIndex = partParam
              ? nextFolder.parts.findIndex((part: WatchPart) => part.id === partParam)
              : -1
            const initialIndex = matchedIndex >= 0 ? matchedIndex : 0
            setActivePart(initialIndex)
            const targetPart = nextFolder.parts[initialIndex]
            const serverAccessExpiresAt = targetPart?.accessExpiresAt ?? null
            const accessExpired = Boolean(serverAccessExpiresAt && new Date(serverAccessExpiresAt).getTime() <= Date.now())
            const hasServerAccess = Boolean(targetPart && !targetPart.isLocked && !accessExpired && !targetPart.previewOnly)

            if (accessGranted && targetPart && (accessExpired || targetPart.isLocked || targetPart.previewOnly)) {
              clearStoredAccessGrant(kind, watchId, targetPart.id)
              setAccessGranted(false)
              setMessage("This access has expired. Please purchase or rent again.")
            }

            // If the user is logged in and the server already marks the part as unlocked
            // grant access locally so they don't need to enter an access code.
            if (session?.user) {
              if (hasServerAccess) {
                persistAccessGrant(kind, watchId, targetPart?.id ?? null, serverAccessExpiresAt)
                setAccessGranted(true)
                setAccessOverlayDismissed(false)
              }
            }
            if (submittedAccessCode) {
              const accessAccepted = Boolean(targetPart && !targetPart.isLocked && !accessExpired)
              if (accessAccepted) {
                persistGuestAccess(kind, watchId, submittedAccessCode)
                persistAccessGrant(kind, watchId, targetPart?.id ?? null, serverAccessExpiresAt)
                setAccessGranted(true)
                setAccessOverlayDismissed(false)
              } else {
                clearStoredGuestAccess(kind, watchId)
                clearStoredAccessGrant(kind, watchId, targetPart?.id ?? null)
                setAccessGranted(false)
              }
              setMessage(
                accessExpired
                  ? "This access has expired. Please purchase or rent again."
                  : accessAccepted
                    ? "Access code accepted."
                    : "Access code did not unlock this video."
              )
            }
          } else {
            setActivePart(0)
          }
          return
        }

        setFolderData(null)
        setEventData(null)
      } catch (error) {
        console.error(`Failed to load TV watch ${kind}:`, error)
        if (!cancelled) {
          setFolderData(null)
          setEventData(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
        if (!cancelled) setBusy(null)
      }
    }

    loadContent(submittedAccessCode)

    return () => {
      cancelled = true
    }
  }, [submittedAccessCode, codeNonce, watchId, kind, partParam])

  const currentPart = folderData?.parts?.[activePart] ?? null
  const currentVideoUrl = currentPart?.videoUrl ?? null
  useEffect(() => {
    if (currentPart?.id) {
      setVideoLikesCount(currentPart.likes ?? 0)
      setVideoIsLiked(false)
    }
  }, [currentPart?.id, currentPart?.likes])
  const currentThumbnail = currentPart?.thumbnail || folderData?.thumbnail || null
  const currentType = folderData?.contentType ?? "video"
  const previewExpired = Boolean(currentPart?.id && previewExpiredPartId === currentPart.id)
  const accessGrantExpiresAt = currentPart?.accessExpiresAt ?? null
  const accessGrantExpired = Boolean(accessGrantExpiresAt && new Date(accessGrantExpiresAt).getTime() <= Date.now())
  const isPreviewActive = Boolean(currentPart?.previewOnly && !previewExpired)
  const hasAccessRestriction = Boolean(currentPart?.isLocked || (currentPart?.previewOnly && previewExpired) || previewExpired)
  const hasUnlockedAccess = (accessGranted && !accessGrantExpired) || Boolean(currentPart && !currentPart.isLocked && (!currentPart.previewOnly || isPreviewActive))
  const shouldShowAccessOverlay = !loading && !accessOverlayDismissed && !hasUnlockedAccess && hasAccessRestriction
  const isContentLocked = !loading && !hasUnlockedAccess && hasAccessRestriction

  useEffect(() => {
    if (!accessGranted || !accessGrantExpiresAt) return

    if (new Date(accessGrantExpiresAt).getTime() <= Date.now()) {
      if (!accessGrantExpiryNotified) {
        toast.error("Access expired", {
          description: "Your stored access grant has expired. Please purchase or rent again to continue watching.",
        })
        setAccessGrantExpiryNotified(true)
      }
      setAccessGranted(false)
      clearStoredAccessState(kind, watchId, currentPart?.id ?? null)
      setMessage("This access has expired. Please purchase or rent again.")
    }
  }, [accessGranted, accessGrantExpiresAt, accessGrantExpiryNotified, kind, watchId])

  useEffect(() => {
    if (!accessGrantExpiresAt || !accessGranted) {
      setAccessGrantExpiryNotified(false)
      return
    }

    const expiryTime = new Date(accessGrantExpiresAt).getTime()
    if (expiryTime <= Date.now()) {
      setAccessGrantExpiryNotified(false)
      return
    }

    const timeoutId = window.setTimeout(() => {
      setAccessGranted(false)
      clearStoredAccessState(kind, watchId, currentPart?.id ?? null)
      toast.error("Access expired", {
        description: "Your stored access grant has expired. Please purchase or rent again to continue watching.",
      })
      setMessage("This access has expired. Please purchase or rent again.")
    }, Math.max(0, expiryTime - Date.now()))

    return () => window.clearTimeout(timeoutId)
  }, [accessGranted, accessGrantExpiresAt, kind, watchId])

  const deriveBuyerNameFromEmail = (email: string) => {
    const localPart = email.split("@")[0]?.trim() ?? ""
    if (!localPart) return "Guest"

    return localPart
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase())
      .trim() || "Guest"
  }

  const resolveBuyerEmailForPayment = (fallbackEmail: string) => {
    const trimmed = fallbackEmail.trim()
    if (trimmed) {
      const derivedName = deriveBuyerNameFromEmail(trimmed)
      if (!buyerName.trim()) setBuyerName(derivedName)
      return trimmed
    }

    return null
  }

  const handleFolderPurchase = async (purchaseType: PurchaseType, email: string) => {
    if (!currentPart) return

    const normalizedEmail = email.trim()
    if (!normalizedEmail) {
      setMessage("Email is required to continue payment.")
      return
    }

    const derivedName = deriveBuyerNameFromEmail(normalizedEmail)
    setBuyerName(derivedName)
    setBuyerEmail(normalizedEmail)

    try {
      setBusy(purchaseType)
      setMessage("Redirecting you to secure payment...")
      setShowGuestEmailPrompt(false)
      setPendingPurchaseAction(null)
      const res = await fetch(`/api/tv/watch/${currentPart.id}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purchaseType,
          buyerName: derivedName,
          buyerEmail: normalizedEmail,
          buyerPhone: buyerPhone.trim() || undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setMessage(data?.message ?? "Unable to start payment.")
        return
      }

      setPaymentAccessCode("")
      setPaymentUrl(data.authorizationUrl)

      if (data.authorizationUrl) {
        window.location.assign(data.authorizationUrl)
        return
      }

      setMessage("Payment initialization did not return a checkout link.")
    } catch (error) {
      console.error("Failed to start purchase:", error)
      setMessage("Unable to initialize payment.")
    } finally {
      setBusy(null)
    }
  }

  const handleEventPurchase = async (email: string) => {
    const selectedTicket = (eventData?.tickets ?? []).find((ticket: any) => ticket.access === "STREAM")
    if (!selectedTicket) {
      setMessage("No stream tickets are available for this event.")
      return
    }

    const normalizedEmail = email.trim()
    if (!normalizedEmail) {
      setMessage("Email is required to continue payment.")
      return
    }

    const derivedName = deriveBuyerNameFromEmail(normalizedEmail)
    setBuyerName(derivedName)
    setBuyerEmail(normalizedEmail)

    try {
      setBusy("purchase")
      setMessage("Redirecting you to secure payment...")
      setShowGuestEmailPrompt(false)
      setPendingPurchaseAction(null)
      const res = await fetch(`/api/tickets/${eventData.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: selectedTicket.id,
          buyerName: derivedName,
          buyerEmail: normalizedEmail,
          buyerPhone: buyerPhone.trim() || undefined,
          quantity: 1,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setMessage(data?.message ?? "Unable to start payment.")
        return
      }

      setPaymentAccessCode(data.payment?.access_code ?? "")
      setPaymentUrl(data.payment?.authorization_url ?? "")

      if (data.payment?.authorization_url) {
        window.location.assign(data.payment.authorization_url)
        return
      }

      setMessage("Payment initialization did not return a checkout link.")
    } catch (error) {
      console.error("Failed to start event ticket purchase:", error)
      setMessage("Unable to initialize payment.")
    } finally {
      setBusy(null)
    }
  }

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

  const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value.trim())

  const syncAccessCodeInUrl = (nextCode: string) => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(searchParams.toString())
    params.delete("accessCode")

    const trimmed = nextCode.trim()
    if (trimmed) {
      persistGuestAccess(kind, watchId, trimmed)
    }

    const queryString = params.toString()
    const nextPath = `${window.location.pathname}${queryString ? `?${queryString}` : ""}`
    router.replace(nextPath, { scroll: false })
  }

  const formatTimeAgo = (value: string) => {
    const diffMs = Date.now() - new Date(value).getTime()
    const seconds = Math.floor(diffMs / 1000)
    if (seconds < 60) return "just now"

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`

    const days = Math.floor(hours / 24)
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`

    return new Date(value).toLocaleDateString()
  }

  const appendCommentToTree = (items: WatchComment[], parentId: string | null, newComment: WatchComment): WatchComment[] => {
    if (!parentId) {
      return [newComment, ...items]
    }

    return items.map((item) => {
      if (item.id === parentId) {
        return { ...item, replies: [newComment, ...item.replies] }
      }

      if (item.replies.length > 0) {
        return { ...item, replies: appendCommentToTree(item.replies, parentId, newComment) }
      }

      return item
    })
  }

  const updateCommentLikes = (items: WatchComment[], commentId: string, deltaLikes: number): WatchComment[] => {
    return items.map((item) => {
      if (item.id === commentId) {
        return { ...item, likes: Math.max(0, item.likes + deltaLikes) }
      }
      if (item.replies.length > 0) {
        return { ...item, replies: updateCommentLikes(item.replies, commentId, deltaLikes) }
      }
      return item
    })
  }

  const handleCommentLike = (commentId: string) => {
    const isLiked = likedComments.has(commentId)
    
    // Optimistic update
    if (isLiked) {
      setLikedComments((prev) => {
        const next = new Set(prev)
        next.delete(commentId)
        return next
      })
      setComments((current) => updateCommentLikes(current, commentId, -1))
    } else {
      setLikedComments((prev) => new Set(prev).add(commentId))
      setComments((current) => updateCommentLikes(current, commentId, 1))
    }

    // Send to API
    ;(async () => {
      try {
        await fetch(`/api/tv/watch/comments/${currentPart?.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            commentId,
            like: !isLiked,
          }),
        })
      } catch (error) {
        console.error("Failed to like/unlike comment:", error)
        // Revert optimistic update on error
        if (isLiked) {
          setLikedComments((prev) => new Set(prev).add(commentId))
          setComments((current) => updateCommentLikes(current, commentId, 1))
        } else {
          setLikedComments((prev) => {
            const next = new Set(prev)
            next.delete(commentId)
            return next
          })
          setComments((current) => updateCommentLikes(current, commentId, -1))
        }
      }
    })()
  }

  const handleCommentSubmit = (parentId?: string | null) => {
    const trimmed = commentDraft.trim()
    if (!trimmed) return

    const resolvedEmail = (session?.user?.email ?? commentEmailInput).trim()
    if (!resolvedEmail) {
      setCommentEmailError("Email is required to publish a comment.")
      setCommentSheetOpen(true)
      return
    }

    if (!isValidEmail(resolvedEmail)) {
      setCommentEmailError("Please enter a valid email address.")
      setCommentSheetOpen(true)
      return
    }

    const authorName = session?.user?.name?.trim() || resolvedEmail.split("@")[0] || "Unknown"
    
    // Only submit if we have a video ID (folder view)
    if (!currentPart?.id) return

    ;(async () => {
      try {
        const response = await fetch(`/api/tv/watch/comments/${currentPart.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: trimmed,
            authorEmail: resolvedEmail,
            authorName,
            parentCommentId: parentId || null,
          }),
        })

        if (!response.ok) {
          setCommentEmailError("Failed to post comment. Please try again.")
          return
        }

        const data = await response.json()
        const newComment: WatchComment = {
          id: data.comment.id,
          author: data.comment.author,
          authorEmail: data.comment.authorEmail,
          text: data.comment.text,
          createdAt: data.comment.createdAt,
          likes: 0,
          replies: [],
        }

        setComments((current) => appendCommentToTree(current, parentId ?? null, newComment))
        setCommentDraft("")
        setReplyingToId(null)
        setCommentEmailError("")
        setCommentSheetOpen(false)
      } catch (error) {
        console.error("Failed to post comment:", error)
        setCommentEmailError("Failed to post comment. Please try again.")
      }
    })()
  }

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

    // Optimistic message append
    const tempId = `local-${Date.now()}`
    const userName = session?.user?.name || session?.user?.email || "Unknown"
    const userHandle = userName === "Unknown" ? "@unknown" : `@${String(userName).toLowerCase().replace(/\s+/g, "")}`
    const optimistic: ChatMessage = {
      id: tempId,
      name: userName,
      handle: userHandle,
      time: new Date().toISOString(),
      text: trimmed,
      reactions: {
        "\u{1F44D}": 0,
        "\u{2764}\u{FE0F}": 0,
        "\u{1F525}": 0,
        "\u{1F602}": 0,
        "\u{1F44F}": 0,
      },
    }

    setChatMessages((current) => [...current, optimistic])
    setChatDraft("")

    // send to API (server should broadcast to WS subscribers)
    ;(async () => {
      try {
        const res = await fetch(`/api/tv/watch/chat/${watchId}?kind=${encodeURIComponent(kind)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: trimmed, clientId: tempId }),
        })

        if (!res.ok) {
          console.error("Failed to send chat message")
          // mark optimistic message as failed for UI
          setChatMessages((current) => current.map((m) => (m.id === tempId ? { ...m, failed: true } : m)))
          return
        }

        const data = await res.json()
        // server may return canonical message with id/timestamp
        if (data?.message) {
          setChatMessages((current) =>
            current.map((m) => (m.id === tempId ? data.message : m))
          )
        }
      } catch (err) {
        console.error("Chat send error:", err)
        setChatMessages((current) => current.map((m) => (m.id === tempId ? { ...m, failed: true } : m)))
      }
    })()
  }

  const handleRetry = async (messageId: string) => {
    const message = chatMessages.find((m) => m.id === messageId)
    if (!message) return

    // optimistic: clear failed
    setChatMessages((current) => current.map((m) => (m.id === messageId ? { ...m, failed: false } : m)))

    try {
      const res = await fetch(`/api/tv/watch/chat/${watchId}?kind=${encodeURIComponent(kind)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message.text, clientId: message.id }),
      })
      if (!res.ok) {
        setChatMessages((current) => current.map((m) => (m.id === messageId ? { ...m, failed: true } : m)))
        return
      }
      const data = await res.json()
      if (data?.message) {
        setChatMessages((current) => current.map((m) => (m.id === messageId ? data.message : m)))
      }
    } catch (err) {
      console.error("Retry send error:", err)
      setChatMessages((current) => current.map((m) => (m.id === messageId ? { ...m, failed: true } : m)))
    }
  }

  // SSE connection is handled earlier in the chat setup effect.

  const watchFolder = kind === "folder" ? folderData : null

  const VISIBLE_COMMENT_COUNT = 3
  const VISIBLE_REPLY_COUNT = 5

  const visibleComments = showAllComments ? comments : comments.slice(0, VISIBLE_COMMENT_COUNT)
  const hiddenCommentCount = Math.max(0, comments.length - VISIBLE_COMMENT_COUNT)

  const toggleReplyExpansion = (commentId: string) => {
    setExpandedReplies((current) => {
      const next = new Set(current)
      if (next.has(commentId)) {
        next.delete(commentId)
      } else {
        next.add(commentId)
      }
      return next
    })
  }

  const renderCommentThread = (items: WatchComment[], depth = 0) => (
    <div className="space-y-2">
      {items.map((comment) => {
        const isLiked = likedComments.has(comment.id)
        const hasReplies = comment.replies.length > 0
        const replyCountLabel = `${comment.replies.length} ${comment.replies.length === 1 ? "reply" : "replies"}`
        const isReplyExpanded = expandedReplies.has(comment.id)
        const repliesToRender = isReplyExpanded ? comment.replies : comment.replies.slice(0, VISIBLE_REPLY_COUNT)
        const showReplies = depth === 0 ? isReplyExpanded : true

        return (
          <div key={comment.id} className="rounded-2xl border border-border/50 bg-background/80 p-4 hover:bg-background/90 transition-colors">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-red-600/20 to-red-600/10 text-sm font-semibold text-red-500 flex-shrink-0">
                {comment.author.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className=" w-full flex items-center justify-between gap-2">
                  <div>
                    <span className="font-semibold text-foreground text-sm">{comment.author}</span>
                    <span className="text-xs text-muted-foreground truncate">{formatTimeAgo(comment.createdAt)}</span>
                
                   </div> 
                
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <button
                    type="button"
                    className="font-medium text-foreground/70 hover:text-foreground transition-colors"
                    onClick={() => {
                      setReplyingToId(comment.id)
                      setCommentSheetOpen(false)
                    }}
                  >
                    Reply
                  </button>
                  <button
                    type="button"
                    className={`flex items-center gap-1.5 font-medium transition-colors ${
                      isLiked 
                        ? "text-red-500 hover:text-red-600" 
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                    onClick={() => handleCommentLike(comment.id)}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500" : ""}`} />
                    <span>{comment.likes > 0 ? comment.likes : ""}</span>
                  </button>
                  {hasReplies && depth === 0 ? (
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-foreground/70">
                      <span>{replyCountLabel}</span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => toggleReplyExpansion(comment.id)}
                      >
                        {isReplyExpanded ? "Hide replies" : `Show ${Math.min(VISIBLE_REPLY_COUNT, comment.replies.length)} of ${comment.replies.length}`}
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isReplyExpanded ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  ) : null}
                </div>
                
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground whitespace-pre-wrap break-words">{comment.text}</p>

                {replyingToId === comment.id ? (
                  <div className="mt-3 rounded-xl border border-border/50 bg-muted/20 p-3">
                    <Textarea
                      value={commentDraft}
                      onChange={(event) => setCommentDraft(event.target.value)}
                      placeholder="Write a reply..."
                      rows={2}
                      className="min-h-[10px] resize"
                    />
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setReplyingToId(null)}
                      >
                        Cancel
                      </button>
                      <Button 
                        size="sm" 
                        onClick={() => handleCommentSubmit(comment.id)}
                        disabled={!commentDraft.trim()}
                      >
                         Reply
                      </Button>
                    </div>
                  </div>
                ) : null}
                {hasReplies && showReplies ? (
                  <div className={`mt-4 ${depth === 0 ? "ml-4 border-l border-border/50 pl-4" : "ml-2"}`}>
                    {renderCommentThread(repliesToRender, depth + 1)}
                    {showAllComments && !isReplyExpanded && hasReplies && comment.replies.length > VISIBLE_REPLY_COUNT ? (
                      <div className="mt-2">
                        <button
                          type="button"
                          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => toggleReplyExpansion(comment.id)}
                        >
                          Show {comment.replies.length - VISIBLE_REPLY_COUNT} more replies
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

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
        const nextCode = accessCode.trim()
        if (!nextCode) return
        setBusy("code")
        setMessage(null)
        persistGuestAccess(kind, watchId, nextCode)
        persistAccessGrant(kind, watchId, currentPart?.id ?? null, currentPart?.accessExpiresAt ?? null)
        setAccessGranted(true)
        setAccessOverlayDismissed(false)
        setSubmittedAccessCode(nextCode)
        syncAccessCodeInUrl(nextCode)
        setCodeNonce((value) => value + 1)
      }}
      isUnlocking={busy === "code"}
      message={message}
      primaryActionLabel="Unlock"
      loggedIn={watchFolder.access.loggedIn}
      showAccessCodeInput
      showBuyerFields={false}
      buyerName={buyerName}
      buyerEmail={buyerEmail}
      buyerPhone={buyerPhone}
      onBuyerNameChange={setBuyerName}
      onBuyerEmailChange={setBuyerEmail}
      onBuyerPhoneChange={setBuyerPhone}
      showGuestEmailPrompt={showGuestEmailPrompt && !watchFolder.access.loggedIn}
      guestEmail={buyerEmail}
      onGuestEmailChange={setBuyerEmail}
      onGuestEmailSubmit={() => {
        const submittedEmail = buyerEmail.trim()
        if (!submittedEmail) {
          setMessage("Email is required to continue payment.")
          return
        }

        if (pendingPurchaseAction) {
          void pendingPurchaseAction(submittedEmail)
        }
      }}
      purchaseOptions={(["rent24", "rent48", "purchase"] as PurchaseType[])
        .map((purchaseType) => ({
          type: purchaseType,
          label: purchaseType,
          price:
            purchaseType === "rent24"
              ? currentPart?.rent24Price ?? null
              : purchaseType === "rent48"
                ? currentPart?.rent48Price ?? null
                : currentPart?.purchasePrice ?? null,
        }))
        .filter((option) => typeof option.price === "number" && option.price > 0)}
      onPurchase={(purchaseType) => {
        if (!currentPart) return

        const resolvedBuyerEmail = watchFolder.access.loggedIn && session?.user?.email ? session.user.email : buyerEmail.trim()
        if (!watchFolder.access.loggedIn && !resolvedBuyerEmail) {
          setPendingPurchaseAction(() => (email: string) => handleFolderPurchase(purchaseType, email))
          setShowGuestEmailPrompt(true)
          setMessage("Enter your email to continue checkout.")
          return
        }

        void handleFolderPurchase(purchaseType, resolvedBuyerEmail)
      }}
      isPurchasing={busy === "code" ? "purchase" : busy}
      paymentAccessCode={paymentAccessCode}
      paymentUrl={paymentUrl}
      onDismiss={() => setAccessOverlayDismissed(true)}
      onContinueToPayment={() => {
        if (paymentUrl) window.location.href = paymentUrl
      }}
      onUsePaymentCode={() => {
        const nextAccessCode = paymentAccessCode.trim()
        setAccessCode(nextAccessCode)
        setSubmittedAccessCode(nextAccessCode)
        if (nextAccessCode) {
          persistGuestAccess(kind, watchId, nextAccessCode)
          syncAccessCodeInUrl(nextAccessCode)
        } else {
          clearStoredGuestAccess(kind, watchId)
          syncAccessCodeInUrl("")
        }
        setCodeNonce((value) => value + 1)
        setMessage(nextAccessCode ? "Access code copied into the unlock field and the video is being verified." : "Access code copied into the unlock field.")
      }}
    />
  ) : null

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        
        <LoadingSplash />
      </div>
    )
  }

  if (kind === "event") {
    if (!eventData) {
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
          Content not found
        </div>
      )
    }

    const streamTicket = (eventData.tickets ?? []).find((ticket: any) => ticket.access === "STREAM")
    const eventLockOverlay = eventData.access?.locked ? (
      <WatchAccessOverlay
        title={eventData.status === "LIVE" ? "locked" : "Get access"}
        description={
          eventData.access?.loggedIn
            ? "Enter the ticket code to unlock the stream."
            : "Buy your stream ticket now and unlock access."
        }
        accessCode={accessCode}
        accessCodePlaceholder="Enter ticket code"
        onAccessCodeChange={setAccessCode}
        onUnlock={() => {
          if (!accessCode.trim()) return
          setBusy("code")
          setMessage(null)
          persistGuestAccess(kind, watchId, accessCode.trim())
          persistAccessGrant(kind, watchId, watchId, null)
          setAccessGranted(true)
          setAccessOverlayDismissed(false)
          setSubmittedAccessCode(accessCode.trim())
          setCodeNonce((value) => value + 1)
        }}
        isUnlocking={busy === "code"}
        message={message}
        primaryActionLabel="Unlock"
        loggedIn={eventData.access?.loggedIn ?? false}
        showAccessCodeInput
        showBuyerFields={false}
        purchaseOptions={streamTicket && streamTicket.price > 0 ? [{ type: "purchase", label: "Buy ticket", price: streamTicket.price }] : []}
        onPurchase={() => {
          const resolvedBuyerEmail = eventData.access?.loggedIn && session?.user?.email ? session.user.email : buyerEmail.trim()
          if (!eventData.access?.loggedIn && !resolvedBuyerEmail) {
            setPendingPurchaseAction(() => (email: string) => handleEventPurchase(email))
            setShowGuestEmailPrompt(true)
            setMessage("Enter your email to continue checkout.")
            return
          }

          void handleEventPurchase(resolvedBuyerEmail)
        }}
        isPurchasing={busy === "purchase" ? "purchase" : null}
        paymentAccessCode={paymentAccessCode}
        paymentUrl={paymentUrl}
        showGuestEmailPrompt={showGuestEmailPrompt && !(eventData.access?.loggedIn ?? false)}
        guestEmail={buyerEmail}
        onGuestEmailChange={setBuyerEmail}
        onGuestEmailSubmit={() => {
          const submittedEmail = buyerEmail.trim()
          if (!submittedEmail) {
            setMessage("Email is required to continue payment.")
            return
          }

          if (pendingPurchaseAction) {
            void pendingPurchaseAction(submittedEmail)
          }
        }}
        onDismiss={() => setAccessOverlayDismissed(true)}
        onContinueToPayment={() => {
          if (paymentUrl) window.location.href = paymentUrl
        }}
        onUsePaymentCode={() => {
          const nextAccessCode = paymentAccessCode.trim()
          setAccessCode(nextAccessCode)
          setSubmittedAccessCode(nextAccessCode)
          if (nextAccessCode) {
            persistGuestAccess(kind, watchId, nextAccessCode)
          } else {
            clearStoredGuestAccess(kind, watchId)
          }
          setCodeNonce((value) => value + 1)
          setMessage(nextAccessCode ? "Access code copied into the unlock field and the event is being verified." : "Access code copied into the unlock field.")
        }}
      />
    ) : null

    return (
      <div className="min-h-screen w-full hidden-scrollbar bg-background text-foreground pb-20">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md  px-4  py-4">
          <div className="flex items-center justify-between w-full ">
            <div className="flex items-center gap-4 min-w-0">
              <button onClick={() => router.back()} className="p-2 hover:bg-muted rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-red-500 hidden lg:block" />
                  <h1 className="text-lg font-bold truncate max-w-[200px] capitalize md:max-w-md">{eventData.title}</h1>
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
              {/* <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
              </button> */}
            </div>
          </div>
        </div>

        <main className="w-full px-2 lg:px-8 py-6">
          <div className={`grid grid-cols-1 gap-8 ${chatVisible ? "xl:grid-cols-[minmax(0,1fr)_350px]" : ""}`}>
            <div className="space-y-6">
              <EventStreamPlayer
                eventId={eventData.id}
                title={eventData.title}
                subtitle={eventData.description}
                poster={eventData.thumbnail}
                previewVideoUrl={eventData.thumbnailVideoUrl}
                recordedVideoUrl={eventData.recordedVideoUrl}
                scheduledAt={eventData.scheduledAt}
                status={eventData.status}
                wsUrl={eventData.livekitWsUrl}
                accessCode={submittedAccessCode}
                locked={Boolean(eventData.access?.locked && eventData.status === "LIVE")}
                viewers={eventData.currentViewersCount ?? 0}
                overlay={eventData.access?.locked ? eventLockOverlay : null}
              />

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex w-full justify-between items-center gap-6 text-sm text-muted-foreground">
                   
                    <div className="flex items-center gap-2">

                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {eventData.scheduledAt ? new Date(eventData.scheduledAt).toLocaleDateString() : "N/A"}
                    </span>

                      <p className="mt-1 text-sm font-semibold text-foreground">
                      {eventData.access?.locked ? <Lock /> : null}
                    </p>
                    
                    
                    <span className="flex items-center gap-1.5">
                        {eventData.access?.premium ? <Banknote /> : null}
                    </span>
                     </div> 
                    
                    <div className="flex items-center gap-2">
                    <FollowButton
                      creatorId={eventData.creator?.id}
                      isFollowing={creatorIsFollowed}
                      isSelf={eventData.creator?.isSelf ?? false}
                      onFollowChange={() => setCreatorIsFollowed(!creatorIsFollowed)}
                    />
                    <LikeButton
                      kind="event"
                      itemId={eventData.id}
                      isLiked={eventIsLiked}
                      count={eventLikesCount}
                      onLikeChange={(count) => {
                        setEventIsLiked(!eventIsLiked)
                        setEventLikesCount(count)
                      }}
                    />
                  </div>


                  </div>
                </div>

                {eventData.description  && (
                <div className="  rounded-2xl  space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <ExpandableDescription
                      text={eventData.description}
                      maxLines={12}
                    />
                  </div>
                </div>
                )}
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
                onRetry={handleRetry}
                onQuickReaction={(reaction) => setChatDraft((value) => `${value}${reaction}`)}
              />
            ) : null}
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
    <div className="min-h-screen w-full bg-background text-foreground pb-20">
      
      {/* <Sheet open={commentSheetOpen} onOpenChange={setCommentSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="text-lg">
              {session?.user?.email ? "Verify your email to comment" : "Share your email to comment"}
            </SheetTitle>
            <SheetDescription>
              {session?.user?.email 
                ? "Your email is pre-filled from your account. You can edit it if needed."
                : "To post a comment, please provide your email address. We'll use it to identify your comments."}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <Input
                type="email"
                value={commentEmailInput}
                onChange={(event) => {
                  setCommentEmailInput(event.target.value)
                  if (commentEmailError) setCommentEmailError("")
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && commentEmailInput.trim() && isValidEmail(commentEmailInput.trim())) {
                    setCommentEmailError("")
                    setCommentSheetOpen(false)
                    handleCommentSubmit(replyingToId)
                  }
                }}
                placeholder="name@example.com"
                autoFocus
                className="rounded-lg"
              />
              <p className="text-xs text-muted-foreground">
                {isValidEmail(commentEmailInput.trim()) 
                  ? "✓ Valid email" 
                  : commentEmailInput.trim() 
                    ? "✗ Please enter a valid email"
                    : ""}
              </p>
            </div>
            {commentEmailError ? (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
                <p className="text-sm text-red-600">{commentEmailError}</p>
              </div>
            ) : null}
            <Button
              className="w-full rounded-lg"
              onClick={() => {
                const emailValue = commentEmailInput.trim()
                if (!emailValue) {
                  setCommentEmailError("Email is required to publish a comment.")
                  return
                }

                if (!isValidEmail(emailValue)) {
                  setCommentEmailError("Please enter a valid email address.")
                  return
                }

                setCommentEmailError("")
                setCommentSheetOpen(false)
                handleCommentSubmit(replyingToId)
              }}
              disabled={!commentEmailInput.trim() || !isValidEmail(commentEmailInput.trim())}
            >
              Continue
            </Button>
          </div>
        </SheetContent>
      </Sheet> */}

      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 py-4">
        <div className="flex items-center justify-between w-full">
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
            
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <main className="w-full p-2  md:px-4 md:lg:px-8 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <VideoViewPanel
              key={currentPart?.id ?? "public-player"}
              videoUrl={currentVideoUrl}
              poster={currentThumbnail}
              title={currentPart?.title ?? watchFolder.title}
              subtitle={currentPart?.description ?? watchFolder.description}
              locked={isContentLocked}
              previewSeconds={currentPart?.previewOnly ? 60 : null}
              showOverlay={shouldShowAccessOverlay}
              overlay={shouldShowAccessOverlay ? lockOverlay : null}
              reportAfterSeconds={60}
              showPurchaseButton={Boolean(!loading && !hasUnlockedAccess && hasAccessRestriction && !shouldShowAccessOverlay)}
              onRequestAccess={() => {
                setAccessOverlayDismissed(false)
                setMessage(null)
              }}
              purchaseButtonLabel="Unlock access"
              onReportView={() => {
                if (!currentPart?.id) return
                ;(async () => {
                  try {
                    const res = await fetch(`/api/tv/watch/${currentPart.id}/view`, { method: "POST" })
                    if (!res.ok) return
                    setFolderData((prev) => {
                      if (!prev) return prev
                      return {
                        ...prev,
                        parts: prev.parts.map((p) => (p.id === currentPart.id ? { ...p, views: (p.views ?? 0) + 1 } : p)),
                      }
                    })
                  } catch (err) {
                    // ignore
                  }
                })()
              }}
              onPreviewExpired={() => {
                if (currentPart?.id) {
                  setPreviewExpiredPartId(currentPart.id)
                }
              }}
            />

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex w-full justify-between items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    {currentPart?.views ?? 0} views
                  </span>
                  

                  <div className="flex items-center gap-4">
                        <FollowButton
                    creatorId={watchFolder.creator?.id || ""}
                    isFollowing={creatorIsFollowed}
                    isSelf={watchFolder.creator?.isSelf ?? false}
                    onFollowChange={() => setCreatorIsFollowed(!creatorIsFollowed)}
                  />
                  <LikeButton
                    kind="video"
                    itemId={currentPart?.id ?? watchFolder.id}
                    isLiked={videoIsLiked}
                    count={videoLikesCount}
                    onLikeChange={(count) => {
                      setVideoIsLiked(!videoIsLiked)
                      setVideoLikesCount(count)
                    }}
                  />
                  </div>
                 
                </div>
              </div>

              <div className=" ">
                
                {
                  (currentPart?.description || watchFolder.description) && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Description</h3>
                      <ExpandableDescription
                        text={currentPart?.description || watchFolder.description || "No description available"}
                        maxLines={10}
                      />
                    </div>
                  )
                }
                
                
                {currentPart?.tags && currentPart.tags.length > 0 && (
                  <div className={`flex flex-wrap gap-2 ${(currentPart?.description || watchFolder.description) ? 'mt-4 pt-4 border-t border-border/50' : ''}`}>
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

              {/* <div className="rounded-2xl border border-border/50 bg-muted/20 p-6 gap-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-foreground">Comments</h3>
                  </div>
                </div>

                <div className=" rounded-2xl border border-border/50 bg-background/70 p-4 space-y-3">

                  <Textarea
                    value={commentDraft}
                    onChange={(event) => setCommentDraft(event.target.value)}
                    placeholder={session?.user?.email 
                      ? "Write your comment here..." 
                      : "Write your comment here... (you'll be asked for your email)"}
                    rows={2}
                    className="resize"
                  />
                  <div className="flex items-center justify-between gap-3">
                    <Button 
                      onClick={() => {
                        if (!commentDraft.trim()) return
                        if (!session?.user?.email && !commentEmailInput.trim()) {
                          setCommentSheetOpen(true)
                        } else {
                          handleCommentSubmit(null)
                        }
                      }}
                      disabled={!commentDraft.trim()}
                    >
                      Comment
                    </Button>
                  </div>
                </div>

                            <div className="mt-6 space-y-4">
                  {renderCommentThread(visibleComments)}

                  {!showAllComments && hiddenCommentCount > 0 ? (
                    <div className="text-center">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-2 text-sm font-medium text-foreground/90 hover:bg-background transition-colors"
                        onClick={() => setShowAllComments(true)}
                      >
                        Show {hiddenCommentCount} more comment{hiddenCommentCount === 1 ? "" : "s"}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  ) : null}
                </div>
              </div> */}
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
