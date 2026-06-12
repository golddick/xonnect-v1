"use client"

import { useRouter, usePathname } from "next/navigation"
import React, { useState } from "react"
import {
  BarChart3,
  Calendar,
  DollarSign,
  Play,
  Settings,
  Ticket,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react"

interface MobileNavProps {
  SidebarOpen:boolean
  // setSidebarOpen: (open: boolean) => void
}

const MobileNav = ({  SidebarOpen }: MobileNavProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(SidebarOpen)

  const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", route: "/creator/dashboard" },
    { icon: Video, label: "Live Streams", route: "/creator/live-streams" },
    { icon: Ticket, label: "Tickets", route: "/creator/tickets" },
    { icon: Play, label: "Videos", route: "/creator/videos" },
    { icon: Users, label: "Community", route: "/creator/community" },
    { icon: BarChart3, label: "Analytics", route: "/creator/analytics" },
    { icon: DollarSign, label: "Monetization", route: "/creator/monetization" },
    { icon: Calendar, label: "Schedule", route: "/creator/schedule" },
    { icon: Settings, label: "Settings", route: "/creator/settings" },
  ]

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(true)}
          />

          <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Xonnect</span>
              </div>

              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              {sidebarItems.map((item) => {
                const active = pathname === item.route

                return (
                  <button
                    key={item.route}
                    onClick={() => {
                      router.push(item.route)
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                      active
                        ? "bg-red-600/20 text-red-400 border border-red-600/30"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileNav
