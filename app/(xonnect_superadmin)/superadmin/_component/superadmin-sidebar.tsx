"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Megaphone,
  Settings,
  BarChart3,
  Shield,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  Video,
  Ticket,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SuperAdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/superadmin/dashboard",
    },
     {
      title: "Content",
      icon: Shield,
      href: "/superadmin/content",
    },
    {
      title: "ticket Management",
      icon: Ticket,
      href: "/superadmin/tickets",
    },
    {
      title: "Creator Management",
      icon: Users,
      href: "/superadmin/creators",
    },
    {
      title: "Users",
      icon: Users,
      href: "/superadmin/users",
    },
    {
      title: "Payout Management",
      icon: DollarSign,
      href: "/superadmin/payouts",
    },
    {
      title: "Enterprise Partnership",
      icon: Zap,
      href: "/superadmin/enterprise-partnership",
    },
    {
      title: "Revenue Analytics",
      icon: BarChart3,
      href: "/superadmin/revenue",
    },
       {
      title: "Ads Management",
      icon: Megaphone,
      href: "/superadmin/ads",
    },
    {
      title: "Tutorials",
      icon: Video,
      href: "/superadmin/tutorials",
    },
    {
      title: "System Settings",
      icon: Settings,
      href: "/superadmin/settings",
    },
  ]

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-all overflow-y-auto hidden-scrollbar duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`} 
    >

      {/* Admin Info */}
      {!collapsed && (
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-foreground font-semibold">SA</span>
            </div>
            <div>
              <p className="font-semibold">Super Admin</p>
              <p className="text-muted-foreground text-sm">admin@xonnect.com</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive ? "bg-red-600 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span className="font-medium">{item.title}</span>}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 w-full">
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </motion.div>
  )
}

export default SuperAdminSidebar

