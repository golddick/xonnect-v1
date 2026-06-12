"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PlayCircle, BookOpen, Users, Zap, ArrowRight } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

interface Tutorial {
  id: string
  title: string
  description: string
  duration: string
  videoUrl: string
  category: "creator" | "viewer" | "partnership" | "general"
  thumbnail: string
  level: "beginner" | "intermediate" | "advanced"
}

const TutorialPage = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const tutorials: Tutorial[] = [
    {
      id: "1",
      title: "Getting Started as a Creator",
      description: "Learn how to set up your creator account and start streaming",
      duration: "12:45",
      videoUrl: "/creator-setup-tutorial.jpg",
      category: "creator",
      thumbnail: "/creator-setup.jpg",
      level: "beginner",
    },
    {
      id: "2",
      title: "Monetizing Your Content",
      description: "Explore different ways to earn money on Xonnect",
      duration: "18:30",
      videoUrl: "/monetization-tutorial.jpg",
      category: "creator",
      thumbnail: "/monetization-concept.png",
      level: "intermediate",
    },
    {
      id: "3",
      title: "Building Your Community",
      description: "Strategies for growing and engaging your audience",
      duration: "16:20",
      videoUrl: "/community-building.jpg",
      category: "creator",
      thumbnail: "/diverse-community-gathering.png",
      level: "intermediate",
    },
    {
      id: "4",
      title: "Understanding Tickets & Events",
      description: "How to create and manage events with ticket sales",
      duration: "14:15",
      videoUrl: "/tickets-events.jpg",
      category: "creator",
      thumbnail: "/event-tickets.png",
      level: "beginner",
    },
    {
      id: "5",
      title: "Watching & Exploring Content",
      description: "Find and enjoy content on the Xonnect platform",
      duration: "9:50",
      videoUrl: "/viewer-guide.jpg",
      category: "viewer",
      thumbnail: "/viewer-guide.jpg",
      level: "beginner",
    },
    {
      id: "6",
      title: "Purchasing Tickets & Memberships",
      description: "Complete guide to buying and using tickets",
      duration: "11:40",
      videoUrl: "/ticket-purchase.jpg",
      category: "viewer",
      thumbnail: "/ticket-purchase.jpg",
      level: "beginner",
    },
    {
      id: "7",
      title: "Enterprise Partnership Program",
      description: "Overview of partnership opportunities with Xonnect",
      duration: "20:10",
      videoUrl: "/enterprise-partners.jpg",
      category: "partnership",
      thumbnail: "/abstract-enterprise.png",
      level: "intermediate",
    },
    {
      id: "8",
      title: "Advanced Analytics & Insights",
      description: "Deep dive into creator analytics and performance metrics",
      duration: "22:35",
      videoUrl: "/analytics-advanced.jpg",
      category: "creator",
      thumbnail: "/data-analytics-dashboard.png",
      level: "advanced",
    },
  ]

  const filteredTutorials =
    selectedCategory === "all" ? tutorials : tutorials.filter((t) => t.category === selectedCategory)

  const categories = [
    { id: "all", label: "All Tutorials", icon: PlayCircle },
    { id: "creator", label: "Creator Guide", icon: Zap },
    { id: "viewer", label: "Viewer Guide", icon: Users },
    { id: "partnership", label: "Partnerships", icon: BookOpen },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-12 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                Learn Xonnect
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch our comprehensive video tutorials to master the Xonnect platform, from creators to viewers to
              partners.
            </p>
          </motion.div>

          {/* Video Player */}
          {selectedTutorial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 max-w-4xl mx-auto"
            >
              <div className="bg-black rounded-xl border border-red-600/30 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center group relative">
                  <img
                    src={selectedTutorial.videoUrl || "/placeholder.svg"}
                    alt={selectedTutorial.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <PlayCircle className="w-12 h-12 text-white fill-white" />
                    </motion.div>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedTutorial.title}</h2>
                  <p className="text-gray-400 mb-4">{selectedTutorial.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className="inline-block px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm">
                      {selectedTutorial.level.charAt(0).toUpperCase() + selectedTutorial.level.slice(1)}
                    </span>
                    <span className="text-gray-400">{selectedTutorial.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative z-10 py-8 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-red-600 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  } backdrop-blur-sm border ${selectedCategory === category.id ? "border-red-600" : "border-white/10"}`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{category.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="relative z-10 py-12 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedTutorial(tutorial)}
                className="group cursor-pointer"
              >
                <div className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-gray-900">
                    <img
                      src={tutorial.thumbnail || "/placeholder.svg"}
                      alt={tutorial.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center"
                      >
                        <PlayCircle className="w-8 h-8 text-white fill-white" />
                      </motion.div>
                    </div>
                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur px-2 py-1 rounded text-xs font-medium">
                      {tutorial.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
                      {tutorial.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{tutorial.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-2 py-1 bg-red-600/20 text-red-400 rounded text-xs font-medium">
                        {tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}
                      </span>
                      <motion.div whileHover={{ x: 4 }} className="text-red-400">
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manual Link Section */}
      <section className="relative z-10 py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-red-600" />
            <h2 className="text-4xl font-bold mb-6">Need More Detailed Information?</h2>
            <p className="text-xl text-gray-300 mb-12">
              Check out our comprehensive manual for in-depth guides on all aspects of Xonnect, from creator tools to
              viewer features and partnership programs.
            </p>
            <Link
              href="/manual"
              className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              <span>Read Full Manual</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default TutorialPage
