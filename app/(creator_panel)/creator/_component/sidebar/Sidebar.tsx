"use client"

import React, { useEffect, useState } from "react"
import {
  BarChart3,
  Calendar,
  DollarSign,
  Play,
  Settings,
  Ticket,
  Users,
  Video,
  Zap,
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { sidebarItems } from "@/lib/constant"

const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null



  return (
    <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 bg-background lg:border-r lg:border-border lg:block">
      <div className="flex items-center space-x-2 p-4 border-b border-border">
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-foreground">Xonnect</span>
      </div>

      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const active = pathname.startsWith(item.route)

          return (
            <button
              key={item.route}
              onClick={() => router.push(item.route)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                active
                  ? "bg-red-600/20 text-red-500 border border-red-600/30 dark:text-red-400"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
