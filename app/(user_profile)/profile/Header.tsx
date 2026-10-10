"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOut, Menu, PlusCircle, User, X } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import Logo from "@/components/nav/logo"
import { PROFILE_NAVIGATION_ITEMS, useProfileNavigation } from "./ProfileNavigation"

interface HeaderProps {
  showNavigation?: boolean
  showUserMenu?: boolean
  showThemeToggle?: boolean
  className?: string
  onGoLive?: () => void
}

export function ProfileHeader({ 
  showNavigation = true,
  showUserMenu = true,
  showThemeToggle = true,
  className = "",
}: HeaderProps) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  const { activeTab, setActiveTab } = useProfileNavigation()
  const { data: session } = useSession()
  const user = session?.user

  const getUserInitials = () => {
    if (!user?.name && !user?.email) return "?"
    if (user?.name) {
      const names = user.name.split(" ")
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase()
      }
      return user.name.substring(0, 2).toUpperCase()
    }
    return user?.email?.substring(0, 2).toUpperCase() || "?"
  }

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          {showNavigation && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={isNavigationOpen ? "Close profile navigation" : "Open profile navigation"}
              aria-expanded={isNavigationOpen}
              aria-controls="mobile-profile-navigation"
              onClick={() => setIsNavigationOpen((open) => !open)}
            >
              {isNavigationOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Logo />
            <span className="text-xl font-bold text-red-600">Xonnect</span>
          </Link>
        </div>

        {/* Right side - Theme toggle and User menu */}
        <div className="flex items-center gap-2">
          {showThemeToggle && <ThemeToggle />}
          
          {showUserMenu && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-red-600 text-white text-xs">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email || ""}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                {user?.role === "CREATOR" && (
                  <DropdownMenuItem asChild>
                    <Link href="/creator/dashboard" className="cursor-pointer">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>Creator Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      {showNavigation && isNavigationOpen && (
        <nav id="mobile-profile-navigation" className="space-y-2 border-t border-border p-3 lg:hidden">
          {PROFILE_NAVIGATION_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setActiveTab(id)
                setIsNavigationOpen(false)
              }}
              aria-current={activeTab === id ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                activeTab === id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}