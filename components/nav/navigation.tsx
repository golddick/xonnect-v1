"use client"

import { useState, useEffect } from "react"
import { Menu, X, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Logo from "./logo"
import { ThemeToggle } from "../theme-toggle"
import { useSession, signIn } from "next-auth/react"
import { AvatarDropdownMenu } from "../common_component/AvatarDropdown"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session, status } = useSession()
  
  const user = session?.user

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="w-full mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between px-4 md:px-6 py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Logo />
            <span className="text-xl font-bold text-foreground md:hidden lg:block">Xonnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="hover:text-muted-foreground text-foreground transition-colors">
              About
            </Link>
            <Link href="/blog" className="hover:text-muted-foreground text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/tickets" className="hover:text-muted-foreground text-foreground transition-colors">
              Tickets
            </Link>
            <Link href="/faq" className="hover:text-muted-foreground text-foreground transition-colors">
              FAQ
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Show loading placeholder, Get Started, or AvatarDropdownMenu based on auth status */}
            {status === "loading" ? (
              <div className="w-[100px] h-10 bg-muted/30 rounded-lg animate-pulse" />
            ) : status === "authenticated" ? (
              <AvatarDropdownMenu />
            ) : (
              <Link
                href="/auth/signup"
                className="bg-red-600 md:hidden lg:block hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            )}
            
            <Link
              href="/tv"
              className="bg-black hover:bg-red-700 border border-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Tv
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 py-4 md:hidden">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-white bg-red-600 rounded p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden w-full bg-background/95 backdrop-blur-md border-t border-border"
            >
              <div className="px-4 py-6 space-y-4">
                <Link
                  href="/about"
                  className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/tickets"
                  className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Tickets
                </Link>
                <Link
                  href="/faq"
                  className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  FAQ
                </Link>
                <div className="pt-4 border-t border-border gap-3 flex flex-col">
                  {/* Mobile: Show loading placeholder, Get Started, or AvatarDropdownMenu based on auth status */}
                  {status === "loading" ? (
                    <div className="w-full h-12 bg-muted/30 rounded-lg animate-pulse" />
                  ) : status === "authenticated" ? (
                    <div className="flex justify-center">
                      <AvatarDropdownMenu />
                    </div>
                  ) : (
                    <Link
                      href="/auth/signup"
                      className="block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  )}
                  
                  <Link
                    href="/tv"
                    className="bg-black hover:bg-red-700 border border-red-600 text-white px-6 py-2 rounded-lg transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Tv
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navigation