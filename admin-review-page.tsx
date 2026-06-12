"use client"

import { getAllReviewsForAdmin, updateReviewDisplayFlag } from "@/actions/admin"
import { useEffect, useState } from "react"
import { Star, Eye, EyeOff, User, Calendar, MessageSquare, Search } from "lucide-react"

interface Review {
  id: string
  comment: string
  rating: number
  AdminReviewDisplay: boolean
  createdAt: string
  user: {
    name: string
    email?: string
    avatar?: string
  }
  stream?: {
    title: string
    id: string
  }
}

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "visible" | "hidden">("all")

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      setLoading(true)
      const data = await getAllReviewsForAdmin()
      setReviews(data)
    } catch (error) {
      console.error("Failed to load reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleReview = async (id: string, current: boolean) => {
    try {
      await updateReviewDisplayFlag(id, !current)
      await loadReviews()
    } catch (error) {
      console.error("Failed to update review:", error)
    }
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (review.stream?.title || "").toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "visible" && review.AdminReviewDisplay) ||
      (filterStatus === "hidden" && !review.AdminReviewDisplay)

    return matchesSearch && matchesFilter
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-600"}`} />
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-800 rounded w-64"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-800 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Review Management
              </h1>
              <p className="text-gray-400 mt-2">Manage and moderate user reviews from streams</p>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{reviews.length}</div>
                <div className="text-sm text-gray-400">Total Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {reviews.filter((r) => r.AdminReviewDisplay).length}
                </div>
                <div className="text-sm text-gray-400">Visible</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">
                  {reviews.filter((r) => !r.AdminReviewDisplay).length}
                </div>
                <div className="text-sm text-gray-400">Hidden</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reviews, users, or streams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="all">All Reviews</option>
              <option value="visible">Visible Only</option>
              <option value="hidden">Hidden Only</option>
            </select>
          </div>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Reviews Found</h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No reviews have been submitted yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* User Info */}
                  <div className="flex items-center gap-4 lg:min-w-[200px]">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                      {review.user.avatar ? (
                        <img
                          src={review.user.avatar || "/placeholder.svg"}
                          alt={review.user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{review.user.name}</div>
                      <div className="text-sm text-gray-400">{review.user.email}</div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 space-y-4">
                    {/* Stream Info */}
                    {review.stream && (
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-sm text-gray-400 mb-1">Stream:</div>
                        <div className="font-medium text-white">{review.stream.title}</div>
                      </div>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">{renderStars(review.rating)}</div>
                      <span className="text-sm text-gray-400">({review.rating}/5)</span>
                    </div>

                    {/* Comment */}
                    <div className="bg-gray-800/30 rounded-lg p-4">
                      <p className="text-gray-200 leading-relaxed">{review.comment}</p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {formatDate(review.createdAt)}
                      </div>

                      {/* Visibility Toggle */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">Public Display:</span>
                        <button
                          onClick={() => toggleReview(review.id, review.AdminReviewDisplay)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                            review.AdminReviewDisplay
                              ? "bg-green-600/20 text-green-400 border border-green-600/30"
                              : "bg-red-600/20 text-red-400 border border-red-600/30"
                          }`}
                        >
                          {review.AdminReviewDisplay ? (
                            <>
                              <Eye className="w-4 h-4" />
                              <span>Visible</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-4 h-4" />
                              <span>Hidden</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
