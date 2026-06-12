"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ThumbsUp, Search, Send, X } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

interface Review {
  id: number
  reviewer: string
  avatar: string
  rating: number
  title: string
  content: string
  subject: string
  subjectType: "creator" | "video" | "event"
  date: string
  helpful: number
  verified: boolean
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      reviewer: "Alex Johnson",
      avatar: "/user-avatar-1.png",
      rating: 5,
      title: "Amazing content!",
      content: "The tutorials are incredibly detailed and easy to follow. Highly recommend for anyone starting out.",
      subject: "ProGamer Mike",
      subjectType: "creator",
      date: "2024-01-20",
      helpful: 24,
      verified: true,
    },
    {
      id: 2,
      reviewer: "Sarah Chen",
      avatar: "/user-avatar-2.png",
      rating: 4,
      title: "Very helpful",
      content: "Great content overall. Some parts could be clearer but overall excellent work.",
      subject: "Music Production Masterclass",
      subjectType: "video",
      date: "2024-01-18",
      helpful: 18,
      verified: true,
    },
    {
      id: 3,
      reviewer: "Marcus Williams",
      avatar: "/user-avatar-3.png",
      rating: 5,
      title: "Best event I've attended",
      content:
        "Fantastic experience from start to finish. The organizers were professional and the content was top-notch.",
      subject: "Gaming Tournament Finals",
      subjectType: "event",
      date: "2024-01-15",
      helpful: 42,
      verified: true,
    },
  ])

  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    content: "",
    subject: "",
    subjectType: "creator" as const,
  })

  const [filterRating, setFilterRating] = useState(0)
  const [sortBy, setSortBy] = useState("recent")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmitReview = () => {
    if (!newReview.title || !newReview.content || !newReview.subject) {
      alert("Please fill in all fields")
      return
    }

    const review: Review = {
      id: reviews.length + 1,
      reviewer: "You",
      avatar: "/user-avatar-1.png",
      rating: newReview.rating,
      title: newReview.title,
      content: newReview.content,
      subject: newReview.subject,
      subjectType: newReview.subjectType,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
      verified: true,
    }

    setReviews([review, ...reviews])
    setNewReview({
      rating: 5,
      title: "",
      content: "",
      subject: "",
      subjectType: "creator",
    })
    setIsWriteReviewOpen(false)
    alert("Review posted successfully!")
  }

  let filteredReviews = reviews.filter((review) => {
    const matchesRating = filterRating === 0 || review.rating === filterRating
    const matchesSearch =
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesRating && matchesSearch
  })

  if (sortBy === "helpful") {
    filteredReviews = [...filteredReviews].sort((a, b) => b.helpful - a.helpful)
  } else if (sortBy === "highest") {
    filteredReviews = [...filteredReviews].sort((a, b) => b.rating - a.rating)
  } else if (sortBy === "lowest") {
    filteredReviews = [...filteredReviews].sort((a, b) => a.rating - b.rating)
  }

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0
  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent">
                Community Reviews
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Share your experience and see what other users think about creators, videos, and events on Xonnect.
            </p>
          </motion.div>

          {/* Write Review Button */}
          <div className="flex justify-center mb-12">
            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Write a Review
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Average Rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
            >
              <p className="text-gray-400 mb-4">Average Rating</p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-5xl font-bold">{averageRating}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i <= Math.floor(Number(averageRating)) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-400">Based on {reviews.length} reviews</p>
            </motion.div>

            {/* Rating Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            >
              <p className="text-gray-400 mb-6">Rating Distribution</p>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 w-20">
                    {rating} <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-red-600 h-full transition-all"
                      style={{
                        width: `${(ratingDistribution[rating as keyof typeof ratingDistribution] / reviews.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="w-12 text-right text-sm text-gray-400">
                    {ratingDistribution[rating as keyof typeof ratingDistribution]}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(Number(e.target.value))}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value={0}>All Ratings</option>
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="recent">Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.reviewer}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{review.reviewer}</h3>
                        {review.verified && (
                          <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        Reviewed {review.subject} • {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
                      />
                    ))}
                  </div>
                </div>

                <h2 className="text-lg font-bold mb-2">{review.title}</h2>
                <p className="text-gray-300 mb-4">{review.content}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium capitalize">
                      {review.subjectType}
                    </span>
                  </div>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm">
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({review.helpful})
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Write Review Modal */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Write a Review</h2>
              <button
                onClick={() => setIsWriteReviewOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Subject */}
              <div>
                <label className="block text-sm font-medium mb-2">What are you reviewing?</label>
                <input
                  type="text"
                  value={newReview.subject}
                  onChange={(e) => setNewReview({ ...newReview, subject: e.target.value })}
                  placeholder="Creator name, video title, or event name"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              {/* Subject Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Review Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {(["creator", "video", "event"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewReview({ ...newReview, subjectType: type })}
                      className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                        newReview.subjectType === type
                          ? "bg-red-600 text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-4">Rating</label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setNewReview({ ...newReview, rating })}
                      className="transition-all"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          rating <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                        } hover:text-yellow-400 cursor-pointer`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-2">{newReview.rating} out of 5 stars</p>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Review Title</label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  placeholder="Summarize your experience"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <textarea
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  placeholder="Share details about your experience..."
                  rows={6}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmitReview}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Post Review
                </button>
                <button
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold border border-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  )
}
