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
import { signIn, signOut, useSession } from "next-auth/react"
import UserAvatar from "./userAvatar"

export function AvatarDropdownMenu() {
  const { data: session, status } = useSession()

  const name = session?.user?.name || session?.user?.email || "Guest"
  const creator = session?.user?.role === "CREATOR"
  const isLoggedIn = status === "authenticated" && !!session?.user

  const handleLogout = () => {
    signOut({ callbackUrl: "/tv" })
  }

  const handleLogin = () => {
    signIn()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <UserAvatar name={name} image={session?.user?.image || ""} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        {isLoggedIn ? (
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
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
