"use client"

import { motion } from "framer-motion"
import { DollarSign, Ticket, TrendingUp, BarChart3 } from "lucide-react"

interface StatItem {
  label: string
  value: string
  color: string
}

interface StatsOverviewProps {
  stats: StatItem[]
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const icons = [DollarSign, Ticket, TrendingUp, BarChart3, BarChart3]
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = icons[index]
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 duration-300 text-foreground transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">{stat.label}</span>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
