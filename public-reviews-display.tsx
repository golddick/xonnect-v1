"use client"

import { useEffect, useState } from "react"
import { Star, User, MessageSquare } from "lucide-react"

interface PublicReview {
  id: string
  comment: string
  rating: number
  createdAt: string
  user: {
    name: string
    avatar?: string
  }
  stream?: {
    title: string
  }
}

// This would be a separate action to get only public reviews
const getPublicReviews = async (): Promise<PublicReview[]> => {
  // Implementation would filter for AdminReviewDisplay: true
  return []
}

export default function PublicReviewsDisplay() {
  const [reviews, setReviews] = useState<PublicReview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPublicReviews()
      .then(setReviews)
      .finally(() => setLoading(false))
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-600"}`} />
    ))
  }

  if (loading) {
    return (
      <div className="bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-400">Real feedback from real streamers and viewers</p>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Reviews Yet</h3>
            <p className="text-gray-500">Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                    {review.user.avatar ? (
                      <img
                        src={review.user.avatar || "/placeholder.svg"}
                        alt={review.user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{review.user.name}</div>
                    {review.stream && <div className="text-sm text-gray-400">{review.stream.title}</div>}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">{renderStars(review.rating)}</div>
                  <span className="text-sm text-gray-400">({review.rating}/5)</span>
                </div>

                {/* Comment */}
                <p className="text-gray-200 leading-relaxed mb-4">{review.comment}</p>

                {/* Date */}
                <div className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
