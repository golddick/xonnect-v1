'use client'

import {
  BarChart3,
  Bell,
  Calendar,
  DollarSign,
  Menu,
  Play,
  Search,
  Settings,
  Ticket,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react"

import React, { useState } from 'react'
import { usePathname, useRouter } from "next/navigation"
import { sidebarItems } from "@/lib/constant"


const TopBar = () => {
const router = useRouter()
  const pathname = usePathname()

    const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className=' w-full bg-background'>

     {/* Mobile Sidebar */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-foreground">Xonnect</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="w-6 h-6 text-muted-foreground" />
                  </button>
                </div>
                <nav className="p-4 space-y-2">
                  {sidebarItems.map((item, index) => (
                    
                    
                    <button
                      key={index}
                      onClick={() => router.push(item.route)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                        pathname === item.route
                          ? "bg-red-600/20 text-red-500 border border-red-600/30 dark:text-red-400"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

         <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors"
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>

              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Creator Panel
                </h1>
                <p className="text-muted-foreground text-sm">Welcome back, John!</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-muted border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
              <button className="relative bg-muted hover:bg-muted/80 rounded-lg p-2 transition-colors">
                <Bell className="w-5 h-5 text-foreground" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
              </button>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TopBar