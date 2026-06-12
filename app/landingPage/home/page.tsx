"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Edit,
  Save,
  Ticket,
  Users,
  Settings,
  LogOut,
  Calendar,
  Eye,
  Bell,
  UserPlus,
  Play,
  ChevronDown,
  QrCode,
  Download,
  X,
  Lock,
} from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("events")
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // User data (mock)
  const [userData, setUserData] = useState({
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+234 801 234 5678",
    location: "Lagos, Nigeria",
    bio: "Tech enthusiast and content lover",
    avatar: "/diverse-user-avatars.png",
  })

  const [formData, setFormData] = useState(userData)

  // Mock purchased events
  const purchasedEvents = [
    {
      id: 1,
      title: "Gaming Tournament Finals - FIFA 24",
      creator: "ProGamer Mike",
      price: 500,
      purchaseDate: "2024-01-20",
      eventDate: "2024-01-22T14:00:00Z",
      thumbnail: "/gaming-tournament.png",
      status: "upcoming",
      type: "streaming",
    },
    {
      id: 2,
      title: "Cooking Masterclass - Nigerian Cuisine",
      creator: "Chef Amara",
      price: 1200,
      purchaseDate: "2024-01-18",
      eventDate: "2024-01-26T18:00:00Z",
      thumbnail: "/placeholder-6if9t.png",
      status: "upcoming",
      type: "streaming",
    },
    {
      id: 3,
      title: "Music Production Masterclass",
      creator: "Beat Maker Pro",
      price: 1500,
      purchaseDate: "2024-01-10",
      eventDate: "2024-01-15T10:00:00Z",
      thumbnail: "/music-production-setup.png",
      status: "completed",
      type: "video",
    },
  ]

  // Mock tickets
  const tickets = [
    {
      id: "TKT-001",
      eventTitle: "Gaming Tournament Finals - FIFA 24",
      eventDate: "2024-01-22",
      type: "streaming",
      ticketType: "VIP Access",
      price: 500,
      purchaseDate: "2024-01-20",
      status: "active",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=TKT-001-XONNECT",
    },
    {
      id: "TKT-002",
      eventTitle: "Afrobeats Concert - Live Music Night",
      eventDate: "2024-02-05",
      type: "physical",
      ticketType: "General Admission",
      price: 2000,
      purchaseDate: "2024-01-19",
      status: "active",
      location: "Lekki Event Center, Lagos",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=TKT-002-XONNECT",
    },
    {
      id: "TKT-003",
      eventTitle: "Tech Talk: AI in Creative Industries",
      eventDate: "2024-01-25",
      type: "streaming",
      ticketType: "Standard",
      price: 0,
      purchaseDate: "2024-01-23",
      status: "used",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=TKT-003-XONNECT",
    },
  ]

  // Mock communities
  const communities = [
    {
      id: 1,
      name: "Gaming Enthusiasts",
      creator: "ProGamer Mike",
      members: 12500,
      description: "Community for hardcore gamers and esports fans",
      avatar: "/diverse-user-avatar-set-2.png",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Music Producers Hub",
      creator: "Beat Maker Pro",
      members: 8300,
      description: "Share beats, learn production, and collaborate with producers",
      avatar: "/music-producer-avatar.png",
      joinDate: "2024-01-10",
    },
    {
      id: 3,
      name: "Tech & Innovation",
      creator: "Tech Innovator",
      members: 15600,
      description: "Latest tech trends, innovations, and digital transformation",
      avatar: "/diverse-user-avatars.png",
      joinDate: "2024-01-05",
    },
  ]

  // Mock premium video purchases
  const premiumVideos = [
    {
      id: 1,
      title: "Advanced Music Production Techniques",
      creator: "Beat Maker Pro",
      price: 2500,
      purchaseDate: "2024-01-19",
      thumbnail: "/music-production-setup.png",
      duration: "2h 45m",
      category: "Music",
    },
    {
      id: 2,
      title: "Professional Photography Masterclass",
      creator: "Photo Master",
      price: 1800,
      purchaseDate: "2024-01-15",
      thumbnail: "/photography-studio.png",
      duration: "1h 30m",
      category: "Art",
    },
  ]

  // Mock followed creators
  const followedCreators = [
    {
      id: 1,
      name: "ProGamer Mike",
      avatar: "/diverse-user-avatar-set-2.png",
      category: "Gaming",
      followers: 45000,
      isFollowing: true,
      bio: "Professional esports player and tournament host",
    },
    {
      id: 2,
      name: "Beat Maker Pro",
      avatar: "/music-producer-avatar.png",
      category: "Music",
      followers: 32000,
      isFollowing: true,
      bio: "Music producer specializing in beats and sound design",
    },
    {
      id: 3,
      name: "Chef Amara",
      avatar: "/diverse-user-avatar-set-2.png",
      category: "Lifestyle",
      followers: 28000,
      isFollowing: true,
      bio: "Chef teaching authentic African cuisine",
    },
  ]

  // Mock event reminders
  const eventReminders = [
    {
      id: 1,
      title: "AI Workshop - Advanced Machine Learning",
      creator: "Tech Innovator",
      eventDate: "2024-02-05T10:00:00Z",
      type: "free",
      price: 0,
      thumbnail: "/tech-presentation.png",
      reminderSet: true,
      category: "Technology",
    },
    {
      id: 2,
      title: "Live Concert - Afrobeats Night Vol 2",
      creator: "Afro King",
      eventDate: "2024-02-10T18:00:00Z",
      type: "paid",
      price: 1500,
      thumbnail: "/afrobeats-concert.png",
      reminderSet: true,
      category: "Music",
    },
    {
      id: 3,
      title: "Sports Talk - Football Championship Analysis",
      creator: "Sports Analyst Pro",
      eventDate: "2024-02-12T20:00:00Z",
      type: "free",
      price: 0,
      thumbnail: "/placeholder.svg",
      reminderSet: false,
      category: "Sports",
    },
  ]

  const handleProfileChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    setUserData(formData)
    setIsEditingProfile(false)
  }

  const handleCancel = () => {
    setFormData(userData)
    setIsEditingProfile(false)
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    alert("Password updated successfully!")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setIsPasswordModalOpen(false)
  }

  const downloadTicket = (ticket: any) => {
    const element = document.createElement("a")
    element.href = ticket.qrCode
    element.download = `ticket-${ticket.id}.png`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const tabs = [
    { key: "events", label: "Events", icon: Eye },
    { key: "videos", label: "Videos", icon: Play },
    { key: "reminders", label: "Reminders", icon: Bell },
    { key: "creators", label: "Following", icon: UserPlus },
    { key: "tickets", label: "Tickets", icon: Ticket },
    { key: "communities", label: "Communities", icon: Users },
    { key: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <section className="relative pt-10 pb-8 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-black to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={userData.avatar || "/placeholder.svg"}
                alt={userData.name}
                className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-red-600 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 truncate">{userData.name}</h1>
                <p className="text-gray-400 text-sm sm:text-base truncate">{userData.email}</p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">Member since January 2024</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm sm:text-base flex-shrink-0"
            >
              <Edit className="w-4 h-4" />
              <span className="hidden sm:inline">{isEditingProfile ? "Cancel" : "Edit Profile"}</span>
              <span className="sm:hidden">{isEditingProfile ? "Cancel" : "Edit"}</span>
            </button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* Profile Edit Modal */}
        {isEditingProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 md:mb-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6">Edit Profile</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleProfileChange("location", e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 resize-none text-sm sm:text-base"
                  rows={4}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSaveProfile}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors backdrop-blur-sm border border-white/20 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="md:hidden mb-8">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 flex items-center justify-between text-white hover:bg-white/10 transition-colors"
          >
            <span className="font-medium text-sm">{tabs.find((t) => t.key === activeTab)?.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isMobileMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-4 right-4 mt-2 bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm z-50"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full px-4 py-3 flex items-center gap-3 text-left text-sm border-b border-white/10 last:border-b-0 transition-colors ${
                      activeTab === tab.key ? "bg-red-600/20 text-red-400" : "text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {tab.label}
                  </button>
                )
              })}
            </motion.div>
          )}
        </div>

        <div className="hidden md:flex gap-2 mb-12 border-b border-white/10 overflow-x-auto pb-4 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 transition-all duration-300 flex items-center gap-2 border-b-2 whitespace-nowrap text-sm lg:text-base ${
                  activeTab === tab.key
                    ? "border-red-600 text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden lg:inline">{tab.label}</span>
                <span className="lg:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Purchased Events Tab */}
          {activeTab === "events" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold">Purchased Events</h2>
                <span className="bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm whitespace-nowrap">
                  {purchasedEvents.length} Events
                </span>
              </div>

              {purchasedEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6">
                    <img
                      src={event.thumbnail || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full md:w-48 h-40 md:h-32 object-cover rounded-lg flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-3 mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg md:text-xl font-bold mb-1 break-words">{event.title}</h3>
                          <p className="text-gray-400 text-sm">by {event.creator}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                            event.status === "upcoming"
                              ? "bg-blue-600/20 text-blue-400"
                              : "bg-green-600/20 text-green-400"
                          }`}
                        >
                          {event.status === "upcoming" ? "Upcoming" : "Completed"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 text-xs md:text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm font-semibold">₦{event.price}</div>
                        <div className="text-gray-400 truncate">Purchased: {event.purchaseDate}</div>
                        <div className="text-gray-400 capitalize truncate">{event.type} Access</div>
                      </div>

                      <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors text-sm">
                        {event.status === "upcoming" ? "Get Ready" : "Rewatch"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Premium Videos Tab */}
          {activeTab === "videos" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold">Premium Videos</h2>
                <span className="bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm whitespace-nowrap">
                  {premiumVideos.length} Videos
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {premiumVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                  >
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-40 object-cover"
                    />

                    <div className="p-4 md:p-6 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base md:text-lg font-bold mb-1 break-words">{video.title}</h3>
                          <p className="text-gray-400 text-xs md:text-sm">by {video.creator}</p>
                        </div>
                        <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0">
                          {video.category}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs md:text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Purchased: {video.purchaseDate}</span>
                        </div>
                        <div className="text-sm font-semibold text-white">₦{video.price}</div>
                      </div>

                      <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                        Watch Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Event Reminders Tab */}
          {activeTab === "reminders" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold">Event Reminders</h2>
                <span className="bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm whitespace-nowrap">
                  {eventReminders.filter((e) => e.reminderSet).length} Active
                </span>
              </div>

              <div className="space-y-4">
                {eventReminders.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6">
                      <img
                        src={event.thumbnail || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full md:w-40 h-40 md:h-32 object-cover rounded-lg flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-3 mb-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold mb-1 break-words">{event.title}</h3>
                            <p className="text-gray-400 text-sm">by {event.creator}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                              event.type === "free"
                                ? "bg-green-600/20 text-green-400"
                                : "bg-yellow-600/20 text-yellow-400"
                            }`}
                          >
                            {event.type === "free" ? "Free" : `₦${event.price}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 mb-4">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span>
                            {new Date(event.eventDate).toLocaleDateString()} at{" "}
                            {new Date(event.eventDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                          <button
                            className={`px-4 py-2 rounded-lg transition-colors text-xs md:text-sm font-medium flex items-center justify-center gap-2 flex-1 sm:flex-initial ${
                              event.reminderSet
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-white/10 hover:bg-white/20 text-gray-300 border border-white/20"
                            }`}
                          >
                            <Bell className="w-4 h-4" />
                            {event.reminderSet ? "Reminder Active" : "Set Reminder"}
                          </button>
                          {event.type === "paid" && (
                            <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xs md:text-sm font-medium flex-1 sm:flex-initial">
                              Buy Ticket
                            </button>
                          )}
                          {event.type === "free" && (
                            <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors text-xs md:text-sm font-medium flex-1 sm:flex-initial">
                              Register Free
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Following Creators Tab */}
          {activeTab === "creators" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold">Following</h2>
                <span className="bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm whitespace-nowrap">
                  Following {followedCreators.length} Creators
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {followedCreators.map((creator, index) => (
                  <motion.div
                    key={creator.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <img
                        src={creator.avatar || "/placeholder.svg"}
                        alt={creator.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-red-600"
                      />

                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{creator.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">{creator.category}</p>
                        <p className="text-xs md:text-sm text-gray-300">{creator.bio}</p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{creator.followers.toLocaleString()} followers</span>
                      </div>

                      <div className="flex gap-2 w-full">
                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-xs md:text-sm font-medium">
                          Visit Profile
                        </button>
                        <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-xs md:text-sm border border-white/20">
                          Unfollow
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400 mb-4">Discover more creators</p>
                <a
                  href="/creators"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors font-medium text-sm"
                >
                  Browse All Creators
                </a>
              </div>
            </motion.div>
          )}

          {/* Tickets Tab */}
          {activeTab === "tickets" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold">My Tickets</h2>
                <span className="bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm whitespace-nowrap">
                  {tickets.length} Tickets
                </span>
              </div>

              {tickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {ticket.id}
                        </span>
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${
                            ticket.status === "active"
                              ? "bg-green-600/20 text-green-400"
                              : "bg-gray-600/20 text-gray-400"
                          }`}
                        >
                          {ticket.status === "active" ? "Active" : "Used"}
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-bold mb-3 break-words">{ticket.eventTitle}</h3>

                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs md:text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span>{ticket.eventDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="w-4 h-4 flex-shrink-0" />
                          <span>{ticket.ticketType}</span>
                        </div>
                        <div>₦{ticket.price}</div>
                        {ticket.type === "physical" && (
                          <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{ticket.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap text-sm flex items-center justify-center gap-2"
                    >
                      <QrCode className="w-4 h-4" />
                      View Ticket
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Communities Tab */}
          {activeTab === "communities" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold">My Communities</h2>
                <span className="bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm whitespace-nowrap">
                  Member of {communities.length} Communities
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {communities.map((community, index) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={community.avatar || "/placeholder.svg"}
                        alt={community.name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate">{community.name}</h3>
                        <p className="text-sm text-gray-400 truncate">by {community.creator}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{community.description}</p>

                    <div className="flex items-center justify-between mb-4 text-xs md:text-sm">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{community.members.toLocaleString()} members</span>
                      </div>
                      <div className="text-xs text-gray-500 text-right">Joined {community.joinDate}</div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-xs md:text-sm">
                        Visit
                      </button>
                      <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-xs md:text-sm border border-white/20">
                        Leave
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 max-w-2xl"
            >
              <h2 className="text-2xl font-bold mb-8">Settings</h2>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-red-500" />
                    Security
                  </h3>
                  <button
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors border border-white/20 text-sm font-medium"
                  >
                    Change Password
                  </button>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="font-bold mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-gray-300 text-sm">Event reminders</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-gray-300 text-sm">Community updates</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-gray-300 text-sm">Promotional emails</span>
                    </label>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="font-bold mb-4">Privacy</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-gray-300 text-sm">Make profile public</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-gray-300 text-sm">Show my communities</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold mb-4">Account</h3>
                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors border border-white/20 flex items-center gap-2 text-sm">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>

              <div className="bg-red-600/10 border border-red-600/30 rounded-2xl p-6">
                <h3 className="font-bold mb-4 text-red-400">Danger Zone</h3>
                <button className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-6 py-2 rounded-lg transition-colors border border-red-600/30 text-sm">
                  Delete Account
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Ticket</h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Ticket Details */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-3">
                  <div>
                    <p className="text-gray-400 text-xs md:text-sm mb-1">Ticket ID</p>
                    <p className="font-bold text-red-400 text-lg">{selectedTicket.id}</p>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-gray-400 text-xs md:text-sm mb-1">Event</p>
                    <p className="font-bold text-sm">{selectedTicket.eventTitle}</p>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-gray-400 text-xs md:text-sm mb-1">Date</p>
                    <p className="font-bold text-sm">{selectedTicket.eventDate}</p>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-gray-400 text-xs md:text-sm mb-1">Ticket Type</p>
                    <p className="font-bold text-sm">{selectedTicket.ticketType}</p>
                  </div>
                  {selectedTicket.type === "physical" && (
                    <div className="border-t border-white/10 pt-3">
                      <p className="text-gray-400 text-xs md:text-sm mb-1">Location</p>
                      <p className="font-bold text-sm">{selectedTicket.location}</p>
                    </div>
                  )}
                </div>

                {/* QR Code */}
                <div className="flex justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <img
                    src={selectedTicket.qrCode || "/placeholder.svg"}
                    alt="QR Code"
                    className="w-64 h-64 object-cover rounded-lg"
                  />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => downloadTicket(selectedTicket)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors border border-white/20 text-sm font-medium"
                  >
                    Close
                  </button>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  Show this QR code at the event entrance for verification
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Change Password</h2>
                <button
                  onClick={() => {
                    setIsPasswordModalOpen(false)
                    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSavePassword}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                  >
                    Update Password
                  </button>
                  <button
                    onClick={() => {
                      setIsPasswordModalOpen(false)
                      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
                    }}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors border border-white/20 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
