"use client"

import { useState } from "react"
import { Search, Users, MessageSquare, Crown, Lock, TrendingUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import CommunityJoinPopup from "./community-join-popup"

const communities = [
  {
    id: "1",
    name: "Music Producers Hub",
    description: "Connect with fellow music producers, share beats, and collaborate on projects.",
    coverImage: "/music-production-setup.png",
    profileImage: "/music-producer-avatar.png",
    creator: {
      name: "Alex Johnson",
      avatar: "/creator-profile-photo.png",
      verified: true,
    },
    memberCount: 15420,
    postCount: 2341,
    isActive: true,
    isPremium: true,
    isPrivate: false,
    category: "Music",
    rules: [
      "Be respectful to all community members",
      "No spam or self-promotion without permission",
      "Share original content and give credit where due",
      "Keep discussions relevant to music production",
      "No pirated software or illegal content sharing",
      "Use appropriate language and avoid offensive content",
      "Help newcomers and share knowledge freely",
    ],
    welcomeMessage:
      "Welcome to the Music Producers Hub! This is a space for creators to share their passion for music production, collaborate on projects, and learn from each other. Whether you're a beginner or a seasoned producer, you'll find valuable resources and connections here.",
    features: {
      posts: true,
      images: true,
      videos: true,
      events: true,
    },
    moderationLevel: "Medium" as const,
    joinRequirement: "Open" as const,
    recentPosts: [
      {
        id: "1",
        author: { name: "Sarah Chen", avatar: "/user-avatar-1.png" },
        content:
          "Just finished my latest track! Would love some feedback from the community. It's a blend of electronic and orchestral elements.",
        timestamp: "2 hours ago",
        likes: 24,
        comments: 8,
        image: "/music-studio.png",
      },
      {
        id: "2",
        author: { name: "Mike Rodriguez", avatar: "/diverse-user-avatars.png" },
        content:
          "Quick tip: Try using parallel compression on your drum bus for that punchy sound without losing dynamics. Game changer!",
        timestamp: "5 hours ago",
        likes: 67,
        comments: 15,
      },
    ],
  },
  {
    id: "2",
    name: "Gaming Streamers United",
    description: "The ultimate community for gaming streamers to share tips, grow their audience, and network.",
    coverImage: "/gaming-tournament.png",
    profileImage: "/vibrant-gaming-community.png",
    creator: {
      name: "StreamMaster Pro",
      avatar: "/ai-avatar.png",
      verified: true,
    },
    memberCount: 8750,
    postCount: 1876,
    isActive: true,
    isPremium: false,
    isPrivate: false,
    category: "Gaming",
    rules: [
      "No toxic behavior or harassment",
      "Share streaming tips and experiences",
      "Support fellow streamers",
      "No excessive self-promotion",
      "Keep content gaming-related",
      "Respect different gaming platforms and preferences",
    ],
    welcomeMessage:
      "Welcome to Gaming Streamers United! Join thousands of streamers sharing their journey, tips, and experiences. Let's grow together!",
    features: {
      posts: true,
      images: true,
      videos: true,
      events: false,
    },
    moderationLevel: "High" as const,
    joinRequirement: "Open" as const,
    recentPosts: [
      {
        id: "1",
        author: { name: "GamerGirl_XO", avatar: "/diverse-user-avatar-set-2.png" },
        content:
          "Hit 1000 followers today! Thank you to this amazing community for all the support and advice. Here's to the next milestone! 🎮",
        timestamp: "1 hour ago",
        likes: 156,
        comments: 23,
      },
    ],
  },
  {
    id: "3",
    name: "Creative Photographers",
    description: "A premium community for professional photographers to showcase work and share techniques.",
    coverImage: "/photography-studio.png",
    profileImage: "/creative-community.png",
    creator: {
      name: "Elena Vasquez",
      avatar: "/professional-headshot-community-manager.png",
      verified: true,
    },
    memberCount: 3240,
    postCount: 892,
    isActive: true,
    isPremium: true,
    isPrivate: true,
    category: "Photography",
    rules: [
      "Only original photography work allowed",
      "Provide constructive feedback on others' work",
      "No inappropriate or offensive content",
      "Credit collaborators and models",
      "Respect copyright and intellectual property",
      "Share techniques and knowledge generously",
    ],
    welcomeMessage:
      "Welcome to our exclusive photography community! Share your best work, learn from masters, and connect with fellow artists.",
    features: {
      posts: true,
      images: true,
      videos: false,
      events: true,
    },
    moderationLevel: "High" as const,
    joinRequirement: "Approval" as const,
    recentPosts: [
      {
        id: "1",
        author: { name: "David Kim", avatar: "/diverse-user-avatars-3.png" },
        content: "Golden hour portrait session from yesterday. The natural lighting was absolutely perfect!",
        timestamp: "3 hours ago",
        likes: 89,
        comments: 12,
        image: "/creator-profile-photo.png",
      },
    ],
  },
]

export default function EndUserCommunities() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCommunity, setSelectedCommunity] = useState<(typeof communities)[0] | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const categories = ["All", "Music", "Gaming", "Photography", "Tech", "Art", "Fitness"]

  const filteredCommunities = communities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || community.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCommunityClick = (community: (typeof communities)[0]) => {
    setSelectedCommunity(community)
    setIsPopupOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Communities</h1>
          <p className="text-gray-600">
            Join communities that match your interests and connect with like-minded creators.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <Card
              key={community.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleCommunityClick(community)}
            >
              <div className="relative">
                <img
                  src={community.coverImage || "/placeholder.svg"}
                  alt={community.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  {community.isPremium && (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  {community.isPrivate && (
                    <Badge variant="secondary">
                      <Lock className="w-3 h-3 mr-1" />
                      Private
                    </Badge>
                  )}
                </div>
                <div className="absolute -bottom-6 left-4">
                  <img
                    src={community.profileImage || "/placeholder.svg"}
                    alt={community.name}
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  />
                </div>
              </div>

              <CardContent className="pt-8 p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg mb-1">{community.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{community.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {community.memberCount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {community.postCount}
                    </span>
                  </div>
                  {community.isActive && (
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      Active
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline">{community.category}</Badge>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCommunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No communities found matching your criteria.</p>
            <Button
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Community Join Popup */}
      {selectedCommunity && (
        <CommunityJoinPopup
          community={selectedCommunity}
          isOpen={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false)
            setSelectedCommunity(null)
          }}
        />
      )}
    </div>
  )
}
