"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Eye, Heart, DollarSign } from "lucide-react"

export default function StreamStatsPage() {
  const router = useRouter()
  const params = useParams()

  const stats = {
    totalViews: 2100,
    totalLikes: 156,
    totalComments: 45,
    totalRevenue: 850,
    duration: "3h 45m",
    peakViewers: 450,
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-8 text-foreground">
          Stream Statistics
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Views</p>
                <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-red-400" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Likes</p>
                <p className="text-2xl font-bold">{stats.totalLikes}</p>
              </div>
              <Heart className="w-8 h-8 text-red-400" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Revenue</p>
                <p className="text-2xl font-bold text-yellow-500">₦{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
