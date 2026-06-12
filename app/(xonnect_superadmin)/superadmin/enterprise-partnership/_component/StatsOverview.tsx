"use client"

import { StatCardProps } from "@/lib/type/enterprise"
import { motion } from "framer-motion"

interface StatsOverviewProps {
  stats: StatCardProps[]
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">{stat.label}</span>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
