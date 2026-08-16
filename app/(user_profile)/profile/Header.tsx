"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Tv, PlusCircle, User, LogOut } from "lucide-react"
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
  onGoLive
}: HeaderProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const user = session?.user

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/tv", label: "TV", icon: Tv },
    { href: "/creator/dashboard", label: "Creator", icon: PlusCircle },
  ]

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
    <header className={`sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden ${className}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
        <Logo />
          <span className="text-xl hidden md:block font-bold text-red-600">Xonnect</span>
        </Link>

        {/* Navigation */}
        {showNavigation && (
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-red-600/10 text-red-600"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
            {onGoLive && (
              <Button
                onClick={onGoLive}
                className="ml-2 bg-red-600 hover:bg-red-700 text-white"
                size="sm"
              >
                Go Live
              </Button>
            )}
          </nav>
        )}

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
    </header>
  )
}