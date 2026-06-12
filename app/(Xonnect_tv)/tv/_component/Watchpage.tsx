    "use client"
    
    import { useState } from "react"
    import { Heart, Share2, Eye, Users, ChevronDown } from "lucide-react"
    import TvSidebar from "@/app/(Xonnect_tv)/tv/_component/tv-sidebar"
    import TvVideoPlayer from "@/app/(Xonnect_tv)/tv/_component/tv-video-player"
    import TvLiveChat from "@/app/(Xonnect_tv)/tv/_component/tv-live-chat"
    import PaymentOverlay from "@/components/payment-overlay"
    import { motion } from "framer-motion"
import TvClipsSection from "./tv-clips-section"
import TvGallerySection from "./tv-gallery-section"
import { AvatarDropdownMenu } from "@/components/common_component/AvatarDropdown"
    
    const WatchPage = ({ params }: { params : string}) => {
      const [liked, setLiked] = useState(false)
      const [chatVisible, setChatVisible] = useState(true)
      const [activeTab, setActiveTab] = useState<"about" | "clips" | "gallery">("about")
      const [isPaidContent, setIsPaidContent] = useState(false)
      const [showPayment, setShowPayment] = useState(false)

    
      const stream = {
        id: params,
        title: "Championship Finals - Live Coverage",
        channel: "Sports Channel",
        avatar: "⚽",
        viewers: 125000,
        isLive: true,
        category: "Sports",
        verified: true,
        subscribers: 542000,
        description:
          "The ultimate championship final is happening right now! Watch as top teams compete for glory. Join us for live commentary, instant replays, and exclusive behind-the-scenes content.",
        tags: ["#sports", "#live", "#championship", "#finals"],
        isPaid: isPaidContent,
        price: 9.99,
      }
    

    
      return (
        <div className="flex h-screen bg-background overflow-hidden flex-col lg:flex-row">
    
          {/* Main Content - Responsive layout */}
          <div className="flex-1 overflow-y-auto  hidden-scrollbar flex flex-col lg:flex-row">
            
            {/* Video Section */}
            <div className={`transition-all duration-300 ${chatVisible ? "lg:flex-1" : "flex-1"} hidden-scrollbar overflow-y-auto bg-background`}>
              {/* Video Player */}
              <div className="p-2 sm:p-3 md:p-4 lg:p-6">
                {isPaidContent && <PaymentOverlay isPaid={isPaidContent} price={stream.price} title={stream.title} />}
    
                <div className="relative bg-background rounded-lg overflow-hidden">
                  <TvVideoPlayer isLive={stream.isLive} title={stream.title} viewers={stream.viewers} />
                </div>
              </div>
    
              {/* Stream Info Section */}
              <div className="px-2 sm:px-3 md:px-4 lg:px-6 pb-4 space-y-4 md:space-y-6">
                {/* Title and Actions */}
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{stream.title}</h1>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`flex-1 sm:flex-none p-3 rounded-lg transition-colors ${
                        liked ? "bg-red-600" : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      <Heart className={`w-5 h-5 mx-auto ${liked ? "text-foreground fill-white" : "text-foreground"}`} />
                    </button>
                    <button className="flex-1 sm:flex-none p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                      <Share2 className="w-5 h-5 mx-auto text-foreground" />
                    </button>
                  </div>
                </div>
    
                {/* Channel Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <span className="text-3xl sm:text-4xl">{stream.avatar}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base sm:text-lg font-bold text-foreground">{stream.channel}</h3>
                        {stream.verified && <span className="text-blue-400">✓</span>}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{stream.subscribers.toLocaleString()} subscribers</p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-red-600 hover:bg-red-700 text-foreground rounded-lg font-semibold transition-colors text-sm">
                      Subscribe
                    </button>
                    <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-white/10 hover:bg-white/20 text-foreground rounded-lg transition-colors text-sm">
                      Follow
                    </button>
                  </div>
                </div>
    
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4 text-red-500" />
                      <span className="text-xs text-muted-foreground">Viewers</span>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-foreground">{(stream.viewers / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-muted-foreground">Category</span>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-foreground">{stream.category}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs text-muted-foreground">Status</span>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-red-500">LIVE</p>
                  </div>
                </div>
    
                {/* Description */}
                <div className="space-y-3 pb-4">
                  {/*<p className="text-sm sm:text-base text-muted-foreground">{stream.description}</p>*/}
                  <div className="flex flex-wrap gap-2">
                    {stream.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/10 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-blue-400 hover:bg-white/20 cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
    

                <div className="flex gap-4 md:gap-6 overflow-x-auto sticky top-0 bg-background/50 backdrop-blur-md -mx-2 sm:-mx-3 md:-mx-4 lg:-mx-6 px-2 sm:px-3 md:px-4 lg:px-6">
                  {["about", "clips", "gallery"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as typeof activeTab)}
                      className={`px-2 md:px-4 py-2 border-b-2 transition-colors whitespace-nowrap text-sm md:text-base font-semibold ${
                        activeTab === tab
                          ? "border-red-600 text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
    
                {/* Tab Content */}
                <div className="py-4">
                  {activeTab === "about" && <p className="text-muted-foreground">{stream.description}</p>}
                  {activeTab === "clips" && <TvClipsSection />}
                  {activeTab === "gallery" && <TvGallerySection />}
                </div>
              </div>
            </div>
    
            {/* Mobile: Bottom tab layout */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-white/10 max-h-80 z-30">
              <div className="flex items-center justify-between p-3 border-b border-white/10">
                <span className="text-foreground font-semibold">Live Chat</span>
                <button
                  onClick={() => setChatVisible(!chatVisible)}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                >
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${chatVisible ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              {chatVisible && (
                <div className="max-h-64 overflow-hidden">
                  <TvLiveChat />
                </div>
              )}
            </div>
    
            {/* Desktop: Right sidebar chat */}
            {chatVisible && (
              <div className="hidden lg:flex lg:w-80 bg-background/40 border-l border-white/10 flex-col">
                {/* Toggle Button */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <span className="font-semibold text-foreground">Live Chat</span>
                  <button
                    onClick={() => setChatVisible(false)}
                    className="p-2 hover:bg-white/10 rounded transition-colors text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <TvLiveChat />
                </div>
              </div>
            )}
    
            {/* Toggle Chat Button on Desktop */}
            {!chatVisible && (
              <button
                onClick={() => setChatVisible(true)}
                className="hidden lg:flex items-center justify-center w-16 bg-background/40 border-l border-white/10 hover:bg-white/10 transition-colors group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
              </button>
            )}
          </div>
        </div>
      )
    }
    
    export default WatchPage
    
