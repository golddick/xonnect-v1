'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useState } from "react"
import UserAvatar from "./userAvatar"

export function AvatarDropdownMenu() {
  // Mock user
  const [user, setUser] = useState({
    userName: "Gold Dick",
    fullName: "Gold Dick",
    email: "gold@example.com",
    role: "CREATOR",
    profileImage: "",
  })

  const name = user?.userName || user?.fullName || "Guest"
  const creator = true

  const isLoggedIn = true

  const handleLogout = () => {
    // setUser(null) // just clear mock user
  }

  const handleLogin = () => {
    setUser({
      userName: "Gold Dick",
      fullName: "Gold Dick",
      email: "gold@example.com",
      role: "CREATOR",
      profileImage: "",
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <UserAvatar name={name} image={user?.profileImage || ""} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        {isLoggedIn ? (
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="w-full cursor-pointer">
                  Profile
                </Link>
              </DropdownMenuItem>

              {creator && (
                <DropdownMenuItem asChild>
                  <Link
                    href="/creator/dashboard"
                    className="w-full cursor-pointer"
                  >
                    Creator Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600"
            >
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>Guest User</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogin} className="cursor-pointer">
              Login
              <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/sign-up" className="w-full cursor-pointer">
                Sign Up
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
