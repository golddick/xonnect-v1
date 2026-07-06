"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Users, Sparkles } from "lucide-react"
import Footer from "@/components/footer"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Navigation from "@/components/nav/navigation"

interface Creator {
  id: string
  name: string
  avatarUrl: string | null
  email: string
  followersCount: number
  followingCount: number
}

export default function CreatorsPage() {
  const { data: session } = useSession()
  console.log("Session data:", session) // Log the session data for debugging
  const router = useRouter()
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/auth/login")
  //     return
  //   }
  //   fetchFollowedCreators()
  // }, [session, router])

  const fetchFollowedCreators = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/profile/following")
      if (!res.ok) throw new Error("Failed to fetch creators")
      const data = await res.json()
      setCreators(data.creators || [])
    } catch (error) {
      toast.error("Failed to load creators")
      setCreators([])
    } finally {
      setLoading(false)
    }
  }

  const filteredCreators = creators.filter((creator) =>
    creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation /> 

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/20 border border-primary/30 text-primary px-6 py-3 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Creators You Follow</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                My Creators
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stay updated with your favorite creators' latest streams, events, and exclusive content.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-12 space-y-12">
        {/* Search Section */}
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Creators Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : filteredCreators.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-8">
              {searchTerm ? "Search Results" : `Following (${creators.length})`}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCreators.map((creator, index) => (
                <motion.div
                  key={creator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group rounded-lg border border-border bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden hover:border-primary/50"
                >
                  <div className="relative h-32 w-full bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                    {creator.avatarUrl && (
                      <Image
                        src={creator.avatarUrl}
                        alt={creator.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-lg line-clamp-1">{creator.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">{creator.email}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded bg-muted/50 p-2 text-center">
                        <p className="text-xs text-muted-foreground">Followers</p>
                        <p className="font-semibold text-sm">{creator.followersCount.toLocaleString()}</p>
                      </div>
                      <div className="rounded bg-muted/50 p-2 text-center">
                        <p className="text-xs text-muted-foreground">Following</p>
                        <p className="font-semibold text-sm">{creator.followingCount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 py-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              {searchTerm ? "No creators found" : "You haven't followed any creators yet"}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
