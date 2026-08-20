// "use client"

// import { useEffect, useMemo, useState, type FormEvent } from "react"
// import { Search, Grid3x3, List } from "lucide-react"
// import { motion } from "framer-motion"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useSession } from "next-auth/react"
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// import StreamCard from "@/app/(Xonnect_tv)/tv/_component/stream-card"
// import TvLoadingState from "@/app/(Xonnect_tv)/tv/_component/tv-loading-state"
// import WelcomeBackBanner from "@/app/(Xonnect_tv)/tv/_component/welcome-back-banner"
// import { AvatarDropdownMenu } from "@/components/common_component/AvatarDropdown"
// import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { buildWatchHref } from "@/lib/tv/watch-href"

// type TvCard = {
//   id: string
//   title: string
//   thumbnail: string
//   channelName: string
//   channelAvatar: string
//   viewers: number
//   isLive: boolean
//   category: string
//   type: string
//   duration?: string | null
//   itemsCount?: number
//   pricing?: string
//   watchId?: string
// }

// export default function TvPage() {
//   const router = useRouter()
//   const { data: session } = useSession()
//   const searchParams = useSearchParams()
//   const [searchQuery, setSearchQuery] = useState("")
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
//   const [carouselIndex, setCarouselIndex] = useState(0)
//   const [loading, setLoading] = useState(true)
//   const [payload, setPayload] = useState<any>(null)
//   const [goLiveOpen, setGoLiveOpen] = useState(false)
//   const [goLiveTitle, setGoLiveTitle] = useState("")
//   const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([])
//   const [selectedCategory, setSelectedCategory] = useState<string>("")
//   const [goLiveLoading, setGoLiveLoading] = useState(false)
//   const [goLiveError, setGoLiveError] = useState("")
//   const [goLiveSuccess, setGoLiveSuccess] = useState<null | { eventId: string; roomName: string }>(null)
//   const [goLiveTab, setGoLiveTab] = useState<"new" | "existing">("new")
//   const [existingEvents, setExistingEvents] = useState<Array<{ id: string; title: string; status?: string; category?: string }>>([])
//   const [existingEventsLoading, setExistingEventsLoading] = useState(false)
//   const [selectedExistingEventId, setSelectedExistingEventId] = useState<string>("")

//   const showWelcomeBack = searchParams.get("welcomeBack") === "1"
//   const userName = session?.user?.name || session?.user?.email || ""
//   const canGoLive = session?.user?.role === "CREATOR"

//   useEffect(() => {
//     let cancelled = false

//     async function loadTv() {
//       try {
//         setLoading(true)
//         const res = await fetch("/api/tv")
//         if (!res.ok) return
//         const data = await res.json()
//         if (!cancelled) setPayload(data)
//       } catch (error) {
//         console.error("Failed to load TV landing payload:", error)
//         if (!cancelled) setPayload(null)
//       } finally {
//         if (!cancelled) setLoading(false)
//       }
//     }

//     loadTv()

//     return () => {
//       cancelled = true
//     }
//   }, [])

//   const openGoLiveDialog = () => {
//     setGoLiveError("")
//     setGoLiveSuccess(null)
//     setGoLiveTitle("")
//     setSelectedCategory("")
//     setGoLiveTab("new")
//     setExistingEvents([])
//     setSelectedExistingEventId("")
//     setExistingEventsLoading(false)
//     setGoLiveOpen(true)
//     void fetchExistingEvents()
//   }

//   const fetchExistingEvents = async () => {
//     try {
//       setExistingEventsLoading(true)
//       const res = await fetch("/api/creator/events?status=all")
//       if (!res.ok) {
//         setExistingEvents([])
//         return
//       }
//       const data = await res.json()
//       setExistingEvents(Array.isArray(data.events) ? data.events : data.events ?? [])
//       if (Array.isArray(data.events) && data.events.length > 0) setSelectedExistingEventId(data.events[0].id)
//     } catch (err) {
//       console.error("Failed to load existing events:", err)
//       setExistingEvents([])
//     } finally {
//       setExistingEventsLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (canGoLive) {
//       void fetchExistingEvents()
//     }
//   }, [canGoLive])

//   const handleStartExistingEvent = async (eventId?: string) => {
//     const id = eventId ?? selectedExistingEventId
//     if (!id) {
//       setGoLiveError("Select an event to start")
//       return
//     }
//     setGoLiveLoading(true)
//     setGoLiveError("")
//     try {
//       // Ensure LiveKit ingress exists for this event (creates if missing)
//       const res = await fetch(`/api/creator/events/${id}/livekit`, { method: "POST" })
//       const data = await res.json()
//       if (!res.ok) throw new Error(data.message || "Failed to prepare event for live")
//       setGoLiveOpen(false)
//       router.push(`/creator/live/event/${id}`)
//     } catch (err) {
//       setGoLiveError(err instanceof Error ? err.message : String(err))
//     } finally {
//       setGoLiveLoading(false)
//     }
//   }

//   const handleGoLiveSubmit = async (event: FormEvent) => {
//     event.preventDefault()
//     setGoLiveError("")

//     if (!goLiveTitle.trim()) {
//       setGoLiveError("Enter a title for your live event.")
//       return
//     }

//     setGoLiveLoading(true)

//     try {
//       // Call go-live endpoint that creates event + provisions LiveKit and returns token
//       const payload = {
//         title: goLiveTitle.trim(),
//         category: selectedCategory || "music",
//       }

//       const createResponse = await fetch("/api/creator/events/go-live", {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(payload),
//       })

//       const createData = await createResponse.json()
//       if (!createResponse.ok || !createData.event?.id) {
//         throw new Error(createData.message || "Unable to create live event.")
//       }

//       const eventId = createData.event.id
//       setGoLiveSuccess({ eventId, roomName: createData.livekit?.roomName ?? createData.event?.livekitRoomName ?? "" })
//       setGoLiveOpen(false)
//       // navigate to creator live page; token is returned in response if needed by page
//       router.push(`/creator/live/event/${eventId}`)
//     } catch (error) {
//       setGoLiveError(error instanceof Error ? error.message : "Failed to go live.")
//     } finally {
//       setGoLiveLoading(false)
//     }
//   }

//   // load categories for creator selection
//   useEffect(() => {
//     let cancelled = false
//     ;(async () => {
//       try {
//         const res = await fetch("/api/categories")
//         if (!res.ok) return
//         const data = await res.json()
//         if (cancelled) return
//         setCategories(data.categories ?? [])
//         if ((data.categories ?? []).length > 0) setSelectedCategory((data.categories ?? [])[0].slug ?? (data.categories ?? [])[0].name)
//       } catch (err) {
//         // ignore
//       }
//     })()
//     return () => {
//       cancelled = true
//     }
//   }, [])

//   const featuredStreams: TvCard[] = payload?.featuredCarousel ?? []
//   const liveStreams: TvCard[] = payload?.contentColumns?.live ?? []
//   const videoStreams: TvCard[] = payload?.contentColumns?.video ?? []

//   useEffect(() => {
//     if (carouselIndex >= featuredStreams.length) {
//       setCarouselIndex(0)
//     }
//   }, [carouselIndex, featuredStreams.length])

//   useEffect(() => {
//     if (featuredStreams.length <= 1) return

//     const interval = window.setInterval(() => {
//       setCarouselIndex((current) => (current + 1) % featuredStreams.length)
//     }, 6000)

//     return () => window.clearInterval(interval)
//   }, [featuredStreams.length])

//   const filteredLive = useMemo(
//     () =>
//       liveStreams.filter((stream) => {
//         const query = searchQuery.trim().toLowerCase()
//         if (!query) return true
//         return [stream.title, stream.channelName, stream.category].some((value) =>
//           value.toLowerCase().includes(query)
//         )
//       }),
//     [liveStreams, searchQuery]
//   )

//   const filteredVideo = useMemo(
//     () =>
//       videoStreams.filter((stream) => {
//         const query = searchQuery.trim().toLowerCase()
//         if (!query) return true
//         return [stream.title, stream.channelName, stream.category].some((value) =>
//           value.toLowerCase().includes(query)
//         )
//       }),
//     [videoStreams, searchQuery]
//   )

//   const currentFeature = featuredStreams[carouselIndex] ?? featuredStreams[0] ?? null

//   if (loading) {
//     return <TvLoadingState variant="landing" />
//   }

//   const hasAnyContent = Boolean(currentFeature || filteredLive.length > 0 || filteredVideo.length > 0)

//   if (!hasAnyContent) {
//     return (
//       <div className="flex h-full min-h-[calc(100vh-4rem)] items-center justify-center p-6 text-muted-foreground">
//         No content available
//       </div>
//     )
//   }

//   return (
//     <div className="flex h-screen bg-background overflow-hidden hidden-scrollbar flex-col lg:flex-row">
//       <div className="flex-1 overflow-y-auto hidden-scrollbar flex flex-col p-2">
//         <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
//           <div className="hidden lg:flex items-center justify-between gap-4 px-4 md:px-6 py-3">
//             <div>

//                <div className="relative hidden md:block">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <input
//                   type="text"
//                   placeholder="Search streams..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="bg-transparent border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm w-64"
//                 />
//               </div>

//               {/* <h1 className="text-xl md:text-2xl font-bold text-foreground">Discover</h1>
//               {showWelcomeBack && userName ? (
//                 <p className="text-sm text-muted-foreground mt-1">Welcome back, {userName}</p>
//               ) : null} */}
//             </div>

//             <div className="flex items-center gap-2 md:gap-4">
             

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`p-2 rounded-lg transition-colors border ${
//                     viewMode === "grid"
//                       ? "bg-red-600 border-red-600"
//                       : "bg-transparent border-border hover:border-red-600/60"
//                   }`}
//                 >
//                   <Grid3x3 className="w-4 h-4 text-foreground" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-2 rounded-lg transition-colors border ${
//                     viewMode === "list"
//                       ? "bg-red-600 border-red-600"
//                       : "bg-transparent border-border hover:border-red-600/60"
//                   }`}
//                 >
//                   <List className="w-4 h-4 text-foreground" />
//                 </button>
//               </div>

//               <ThemeToggle />
//               <AvatarDropdownMenu />
//             </div>
//           </div>
//         </div>

//         <div className="md:p-6 space-y-8">
//           <WelcomeBackBanner userName={userName} visible={showWelcomeBack} />

//           {currentFeature ? (
//             <motion.div
//               key={currentFeature.id}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="relative rounded-2xl overflow-hidden bg-muted aspect-video"
//             >
//               <img
//                 src={currentFeature.thumbnail || "/placeholder.svg"}
//                 alt={currentFeature.title}
//                 className="w-full h-full object-cover" 
//               />
//               <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">
//                 {(currentFeature.isLive || currentFeature.type !== "video") && (
//                   <div className="flex items-center space-x-3 mb-4">
//                     {currentFeature.isLive && <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />}
//                     <span className="text-red-500 text-sm font-bold">
//                       {currentFeature.isLive ? "LIVE" : "COMING UP"}
//                     </span>
//                     {currentFeature.isLive && (
//                       <span className="text-foreground text-sm">
//                         {currentFeature.viewers.toLocaleString()} watching
//                       </span>
//                     )}
//                   </div>
//                 )}
//                 <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{currentFeature.title}</h3>
//                 <p className="text-muted-foreground mb-4">{currentFeature.channelName}</p>
//                 <button
//                   onClick={() => router.push(buildWatchHref(currentFeature))}
//                   className="w-fit bg-red-600 hover:bg-red-700 text-foreground px-8 py-3 rounded-lg font-bold transition-colors"
//                 >
//                   Watch Now
//                 </button>
//               </div>
//             </motion.div>
//           ) : null}

//           {featuredStreams.length > 1 && (
//             <div className="flex gap-2 justify-center">
//               {featuredStreams.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCarouselIndex(index)}
//                   className={`h-1 rounded-full transition-all ${index === carouselIndex ? "bg-red-600 w-8" : "bg-white/20 w-2 hover:bg-white/40"}`}
//                 />
//               ))}
//             </div>
//           )}

//           <div className="space-y-4">
//             <h2 className="text-xl md:text-2xl font-bold text-foreground">Events</h2>
//             {filteredLive.length > 0 ? (
//               <div
//                 className={`grid gap-4 ${
//                   viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "grid-cols-1"
//                 }`}
//               >
//                 {filteredLive.map((stream) => (
//                   <StreamCard
//                     key={stream.id}
//                     id={stream.id}
//                     thumbnail={stream.thumbnail}
//                     title={stream.title}
//                     channelName={stream.channelName}
//                     channelAvatar={stream.channelAvatar}
//                     viewers={stream.viewers}
//                     isLive={stream.isLive}
//                     type={stream.type}
//                     category={stream.category}
//                     duration={stream.duration ?? undefined}
//                     onWatch={() => router.push(buildWatchHref(stream))}
//                   />
//                 ))}
//               </div>
//             ) : null }
//           </div>

//           <div className="space-y-4">
//             <h2 className="text-xl md:text-2xl font-bold text-foreground">Video</h2>
//             {filteredVideo.length > 0 ? (
//               <div
//                 className={`grid gap-4 ${
//                   viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "grid-cols-1"
//                 }`}
//               >
//                 {filteredVideo.map((video) => (
//                   <StreamCard
//                     key={video.id}
//                     id={video.id}
//                     thumbnail={video.thumbnail}
//                     title={video.title}
//                     channelName={video.channelName}
//                     channelAvatar={video.channelAvatar}
//                     viewers={video.viewers}
//                     isLive={video.isLive}
//                     category={video.category}
//                     duration={video.duration ?? undefined}
//                     pricing={video.pricing}
//                     onWatch={() => router.push(buildWatchHref(video))}
//                   />
//                 ))}
//               </div>
//             ) : null }
//           </div>
//         </div>
//       </div>

//       {canGoLive && (
//         <div className="fixed bottom-6 right-6 z-50">
//           <Button
//             variant="secondary"
//             className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-red-600/20 hover:bg-red-700"
//             onClick={openGoLiveDialog}
//           >
//             Go Live
//           </Button>
//         </div>
//       )}

//       <Dialog open={goLiveOpen} onOpenChange={setGoLiveOpen}>
//         <DialogContent className="max-w-md rounded-3xl">
//           <DialogHeader>
//             <DialogTitle>Go Live </DialogTitle>
//           </DialogHeader>

//           <form
//             onSubmit={goLiveTab === "new" ? handleGoLiveSubmit : (e) => e.preventDefault()}
//             className="space-y-4 pt-2"
//           >
//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 onClick={() => setGoLiveTab("new")}
//                 className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
//                   goLiveTab === "new" ? "bg-red-600 text-white" : "bg-transparent text-foreground border border-border"
//                 }`}
//               >
//                 New event
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setGoLiveTab("existing")
//                   void fetchExistingEvents()
//                 }}
//                 className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
//                   goLiveTab === "existing" ? "bg-red-600 text-white" : "bg-transparent text-foreground border border-border"
//                 }`}
//               >
//                 Existing event
//               </button>
//             </div>

//             {goLiveTab === "new" ? (
//               <>
//                 <div>
//                   <label className="block text-sm font-medium text-muted-foreground">Event title</label>
//                   <input
//                     type="text"
//                     value={goLiveTitle}
//                     onChange={(e) => setGoLiveTitle(e.target.value)}
//                     placeholder="What are you streaming now?"
//                     className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-muted-foreground">Category</label>
//                   <select
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
//                   >
//                     {categories.map((category) => (
//                       <option key={category.id} value={category.slug || category.name}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </>
//             ) : (
//               <div className="space-y-3">
//                 {existingEventsLoading ? (
//                   <p className="text-sm text-muted-foreground">Loading events...</p>
//                 ) : existingEvents.length === 0 ? (
//                   <p className="text-sm text-muted-foreground">No existing events found.</p>
//                 ) : (
//                   existingEvents.map((ev) => (
//                     <div
//                       key={ev.id}
//                       className={`rounded-2xl border p-3 flex items-center justify-between gap-4 ${
//                         selectedExistingEventId === ev.id ? "border-red-600 " : "border-border"
//                       }`}
//                     >
//                       <div>
//                         <div className="font-semibold text-foreground">{ev.title}</div>
//                         <div className="text-sm text-muted-foreground">{ev.category ?? ev.status ?? ""}</div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         {/* <Button
//                           type="button"
//                           variant="ghost"
//                           onClick={() => setSelectedExistingEventId(ev.id)}
//                         >
//                           Select
//                         </Button> */}
//                         <Button
//                           type="button"
//                           onClick={() => handleStartExistingEvent(ev.id)}
//                           disabled={goLiveLoading}
//                           className="bg-red-600 text-white"
//                         >
//                           Go Live
//                         </Button>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}

//             {goLiveError ? (
//               <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
//                 {goLiveError}
//               </div>
//             ) : null}

//             <DialogFooter className="gap-2 pt-4">
//               <Button type="button" variant="outline" onClick={() => setGoLiveOpen(false)}>
//                 Cancel
//               </Button>
//               {goLiveTab === "new" ? (
//                 <Button type="submit" disabled={goLiveLoading}>
//                   {goLiveLoading ? "Starting..." : "Go Live"}
//                 </Button>
//               ) : (
//                 <Button
//                   type="button"
//                   disabled={!selectedExistingEventId || goLiveLoading}
//                   onClick={() => handleStartExistingEvent()}
//                 >
//                   Continue with selected
//                 </Button>
//               )}
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }









"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Search, Grid3x3, List } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import StreamCard from "@/app/(Xonnect_tv)/tv/_component/stream-card"
import TvLoadingState from "@/app/(Xonnect_tv)/tv/_component/tv-loading-state"
import WelcomeBackBanner from "@/app/(Xonnect_tv)/tv/_component/welcome-back-banner"
import { AvatarDropdownMenu } from "@/components/common_component/AvatarDropdown"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { buildWatchHref } from "@/lib/tv/watch-href"

type TvCard = {
  id: string
  title: string
  thumbnail: string
  channelName: string
  channelAvatar: string
  viewers: number
  isLive: boolean
  category: string
  type: string
  duration?: string | null
  itemsCount?: number
  pricing?: string
  watchId?: string
}

// Navigation Component
function TvNavigation({ 
  searchQuery, 
  setSearchQuery, 
  viewMode, 
  setViewMode 
}: { 
  searchQuery: string
  setSearchQuery: (value: string) => void
  viewMode: "grid" | "list"
  setViewMode: (value: "grid" | "list") => void
}) {
  return (
    <div className="sticky hidden lg:block top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search streams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm w-64"
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors border ${
                viewMode === "grid"
                  ? "bg-red-600 border-red-600"
                  : "bg-transparent border-border hover:border-red-600/60"
              }`}
            >
              <Grid3x3 className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors border ${
                viewMode === "list"
                  ? "bg-red-600 border-red-600"
                  : "bg-transparent border-border hover:border-red-600/60"
              }`}
            >
              <List className="w-4 h-4 text-foreground" />
            </button>
          </div> */}

          <ThemeToggle />
          <AvatarDropdownMenu />
        </div>
      </div>
    </div>
  )
}

export default function TvPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [payload, setPayload] = useState<any>(null)
  const [goLiveOpen, setGoLiveOpen] = useState(false)
  const [goLiveTitle, setGoLiveTitle] = useState("")
  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [goLiveLoading, setGoLiveLoading] = useState(false)
  const [goLiveError, setGoLiveError] = useState("")
  const [goLiveSuccess, setGoLiveSuccess] = useState<null | { eventId: string; roomName: string }>(null)
  const [goLiveTab, setGoLiveTab] = useState<"new" | "existing">("new")
  const [existingEvents, setExistingEvents] = useState<Array<{ id: string; title: string; status?: string; category?: string }>>([])
  const [existingEventsLoading, setExistingEventsLoading] = useState(false)
  const [selectedExistingEventId, setSelectedExistingEventId] = useState<string>("")

  const showWelcomeBack = searchParams.get("welcomeBack") === "1"
  const userName = session?.user?.name || session?.user?.email || ""
  const canGoLive = session?.user?.role === "CREATOR"

  useEffect(() => {
    let cancelled = false

    async function loadTv() {
      try {
        setLoading(true)
        const res = await fetch("/api/tv")
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled) setPayload(data)
      } catch (error) {
        console.error("Failed to load TV landing payload:", error)
        if (!cancelled) setPayload(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadTv()

    return () => {
      cancelled = true
    }
  }, [])

  const openGoLiveDialog = () => {
    setGoLiveError("")
    setGoLiveSuccess(null)
    setGoLiveTitle("")
    setSelectedCategory("")
    setGoLiveTab("new")
    setExistingEvents([])
    setSelectedExistingEventId("")
    setExistingEventsLoading(false)
    setGoLiveOpen(true)
    void fetchExistingEvents()
  }

  const fetchExistingEvents = async () => {
    try {
      setExistingEventsLoading(true)
      const res = await fetch("/api/creator/events?status=all")
      if (!res.ok) {
        setExistingEvents([])
        return
      }
      const data = await res.json()
      setExistingEvents(Array.isArray(data.events) ? data.events : data.events ?? [])
      if (Array.isArray(data.events) && data.events.length > 0) setSelectedExistingEventId(data.events[0].id)
    } catch (err) {
      console.error("Failed to load existing events:", err)
      setExistingEvents([])
    } finally {
      setExistingEventsLoading(false)
    }
  }

  useEffect(() => {
    if (canGoLive) {
      void fetchExistingEvents()
    }
  }, [canGoLive])

  const handleStartExistingEvent = async (eventId?: string) => {
    const id = eventId ?? selectedExistingEventId
    if (!id) {
      setGoLiveError("Select an event to start")
      return
    }
    setGoLiveLoading(true)
    setGoLiveError("")
    try {
      // Ensure LiveKit ingress exists for this event (creates if missing)
      const res = await fetch(`/api/creator/events/${id}/livekit`, { method: "POST" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to prepare event for live")
      setGoLiveOpen(false)
      router.push(`/creator/live/event/${id}`)
    } catch (err) {
      setGoLiveError(err instanceof Error ? err.message : String(err))
    } finally {
      setGoLiveLoading(false)
    }
  }

  const handleGoLiveSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setGoLiveError("")

    if (!goLiveTitle.trim()) {
      setGoLiveError("Enter a title for your live event.")
      return
    }

    setGoLiveLoading(true)

    try {
      // Call go-live endpoint that creates event + provisions LiveKit and returns token
      const payload = {
        title: goLiveTitle.trim(),
        category: selectedCategory || "music",
      }

      const createResponse = await fetch("/api/creator/events/go-live", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })

      const createData = await createResponse.json()
      if (!createResponse.ok || !createData.event?.id) {
        throw new Error(createData.message || "Unable to create live event.")
      }

      const eventId = createData.event.id
      setGoLiveSuccess({ eventId, roomName: createData.livekit?.roomName ?? createData.event?.livekitRoomName ?? "" })
      setGoLiveOpen(false)
      // navigate to creator live page; token is returned in response if needed by page
      router.push(`/creator/live/event/${eventId}`)
    } catch (error) {
      setGoLiveError(error instanceof Error ? error.message : "Failed to go live.")
    } finally {
      setGoLiveLoading(false)
    }
  }

  // load categories for creator selection
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch("/api/categories")
        if (!res.ok) return
        const data = await res.json()
        if (cancelled) return
        setCategories(data.categories ?? [])
        if ((data.categories ?? []).length > 0) setSelectedCategory((data.categories ?? [])[0].slug ?? (data.categories ?? [])[0].name)
      } catch (err) {
        // ignore
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const featuredStreams: TvCard[] = payload?.featuredCarousel ?? []
  const liveStreams: TvCard[] = payload?.contentColumns?.live ?? []
  const videoStreams: TvCard[] = payload?.contentColumns?.video ?? []

  useEffect(() => {
    if (carouselIndex >= featuredStreams.length) {
      setCarouselIndex(0)
    }
  }, [carouselIndex, featuredStreams.length])

  useEffect(() => {
    if (featuredStreams.length <= 1) return

    const interval = window.setInterval(() => {
      setCarouselIndex((current) => (current + 1) % featuredStreams.length)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [featuredStreams.length])

  const filteredLive = useMemo(
    () =>
      liveStreams.filter((stream) => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return true
        return [stream.title, stream.channelName, stream.category].some((value) =>
          value.toLowerCase().includes(query)
        )
      }),
    [liveStreams, searchQuery]
  )

  const filteredVideo = useMemo(
    () =>
      videoStreams.filter((stream) => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return true
        return [stream.title, stream.channelName, stream.category].some((value) =>
          value.toLowerCase().includes(query)
        )
      }),
    [videoStreams, searchQuery]
  )

  const currentFeature = featuredStreams[carouselIndex] ?? featuredStreams[0] ?? null

  if (loading) {
    return <TvLoadingState variant="landing" />
  }

  const hasAnyContent = Boolean(currentFeature || filteredLive.length > 0 || filteredVideo.length > 0)

  return (
    <div className="flex h-screen bg-background overflow-hidden hidden-scrollbar flex-col ">
      <TvNavigation 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

      <div className="flex-1 overflow-y-auto hidden-scrollbar flex flex-col p-2">
       
        {!hasAnyContent ? (
          <div className="flex flex-1 items-center justify-center p-6 text-muted-foreground">
            No content available
          </div>
        ) : (
          <div className="md:p-6 space-y-8">
            <WelcomeBackBanner userName={userName} visible={showWelcomeBack} />

            {currentFeature ? (
              <motion.div
                key={currentFeature.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative rounded-2xl overflow-hidden bg-muted aspect-video"
              >
                <img
                  src={currentFeature.thumbnail || "/placeholder.svg"}
                  alt={currentFeature.title}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">
                  {(currentFeature.isLive || currentFeature.type !== "video") && (
                    <div className="flex items-center space-x-3 mb-4">
                      {currentFeature.isLive && <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />}
                      <span className="text-red-500 text-sm font-bold">
                        {currentFeature.isLive ? "LIVE" : "COMING UP"}
                      </span>
                      {currentFeature.isLive && (
                        <span className="text-foreground text-sm">
                          {currentFeature.viewers.toLocaleString()} watching
                        </span>
                      )}
                    </div>
                  )}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentFeature.title}</h3>
                  {/* <p className="text-muted-foreground mb-4">{currentFeature.channelName}</p> */}
                  <button
                    onClick={() => router.push(buildWatchHref(currentFeature))}
                    className="w-fit bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                  >
                    Watch Now
                  </button>
                </div>
              </motion.div>
            ) : null}

            {featuredStreams.length > 1 && (
              <div className="flex gap-2 justify-center">
                {featuredStreams.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCarouselIndex(index)}
                    className={`h-1 rounded-full transition-all ${index === carouselIndex ? "bg-red-600 w-8" : "bg-white/20 w-2 hover:bg-white/40"}`}
                  />
                ))}
              </div>
            )}

            <div className="space-y-4">
              {filteredLive.length > 0 && (
                <div><h2 className="text-xl md:text-2xl font-bold text-foreground">Events</h2></div>
              )}
              {filteredLive.length > 0 ? (
                <div
                  className={`grid gap-4 ${
                    viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "grid-cols-1"
                  }`}
                >
                  {filteredLive.map((stream) => (
                    <StreamCard
                      key={stream.id}
                      id={stream.id}
                      thumbnail={stream.thumbnail}
                      title={stream.title}
                      channelName={stream.channelName}
                      channelAvatar={stream.channelAvatar}
                      viewers={stream.viewers}
                      isLive={stream.isLive}
                      type={stream.type}
                      category={stream.category}
                      duration={stream.duration ?? undefined}
                      onWatch={() => router.push(buildWatchHref(stream))}
                    />
                  ))}
                </div>
              ) : null }
            </div>

            <div className="space-y-4">
               {filteredVideo.length > 0 && (
                <div><h2 className="text-xl md:text-2xl font-bold text-foreground">Video</h2></div>
              )}
            
              {filteredVideo.length > 0 ? (
                <div
                  className={`grid gap-4 ${
                    viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "grid-cols-1"
                  }`}
                >
                  {filteredVideo.map((video) => (
                    <StreamCard
                      key={video.id}
                      id={video.id}
                      thumbnail={video.thumbnail}
                      title={video.title}
                      channelName={video.channelName}
                      channelAvatar={video.channelAvatar}
                      viewers={video.viewers}
                      isLive={video.isLive}
                      category={video.category}
                      duration={video.duration ?? undefined}
                      pricing={video.pricing}
                      onWatch={() => router.push(buildWatchHref(video))}
                    />
                  ))}
                </div>
              ) : null }
            </div>
          </div>
        )}
      </div>

      {canGoLive && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            variant="secondary"
            className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-red-600/20 hover:bg-red-700"
            onClick={openGoLiveDialog}
          >
            Go Live
          </Button>
        </div>
      )}

      <Dialog open={goLiveOpen} onOpenChange={setGoLiveOpen}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>Go Live </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={goLiveTab === "new" ? handleGoLiveSubmit : (e) => e.preventDefault()}
            className="space-y-4 pt-2"
          >
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setGoLiveTab("new")}
                className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                  goLiveTab === "new" ? "bg-red-600 text-white" : "bg-transparent text-foreground border border-border"
                }`}
              >
                New event
              </button>
              <button
                type="button"
                onClick={() => {
                  setGoLiveTab("existing")
                  void fetchExistingEvents()
                }}
                className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                  goLiveTab === "existing" ? "bg-red-600 text-white" : "bg-transparent text-foreground border border-border"
                }`}
              >
                Existing event
              </button>
            </div>

            {goLiveTab === "new" ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Event title</label>
                  <input
                    type="text"
                    value={goLiveTitle}
                    onChange={(e) => setGoLiveTitle(e.target.value)}
                    placeholder="What are you streaming now?"
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.slug || category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                {existingEventsLoading ? (
                  <p className="text-sm text-muted-foreground">Loading events...</p>
                ) : existingEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No existing events found.</p>
                ) : (
                  existingEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className={`rounded-2xl border p-3 flex items-center justify-between gap-4 ${
                        selectedExistingEventId === ev.id ? "border-red-600 " : "border-border"
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-foreground">{ev.title}</div>
                        <div className="text-sm text-muted-foreground">{ev.category ?? ev.status ?? ""}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          onClick={() => handleStartExistingEvent(ev.id)}
                          disabled={goLiveLoading}
                          className="bg-red-600 text-white"
                        >
                          Go Live
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {goLiveError ? (
              <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {goLiveError}
              </div>
            ) : null}

            <DialogFooter className="gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setGoLiveOpen(false)}>
                Cancel
              </Button>
              {goLiveTab === "new" ? (
                <Button type="submit" disabled={goLiveLoading}>
                  {goLiveLoading ? "Starting..." : "Go Live"}
                </Button>
              ) : (
                <Button
                  type="button"
                  disabled={!selectedExistingEventId || goLiveLoading}
                  onClick={() => handleStartExistingEvent()}
                >
                  Continue with selected
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}