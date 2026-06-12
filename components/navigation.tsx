"use client"

import { useState, useEffect } from "react"
import { Menu, X, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
        scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-700 transition-colors">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Xonnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
              Events
            </Link>
            <Link href="/creators" className="text-gray-300 hover:text-white transition-colors">
              Creators
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/community" className="text-gray-300 hover:text-white transition-colors">
              Community
            </Link>
            <Link href="/guidelines" className="text-gray-300 hover:text-white transition-colors">
              Guidelines
            </Link>
            <Link href="/tutorial" className="text-gray-300 hover:text-white transition-colors">
              Tutorial
            </Link>
            <Link href="/manual" className="text-gray-300 hover:text-white transition-colors">
              Manual
            </Link>
            <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link
              href="/creator/signup"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                <Link
                  href="/features"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/events"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Events
                </Link>
                <Link
                  href="/creators"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Creators
                </Link>
                <Link
                  href="/pricing"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/community"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Community
                </Link>
                <Link
                  href="/guidelines"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Guidelines
                </Link>
                <Link
                  href="/tutorial"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Tutorial
                </Link>
                <Link
                  href="/manual"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Manual
                </Link>
                <Link
                  href="/faq"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  FAQ
                </Link>
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <Link
                    href="/dashboard"
                    className="block text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/login"
                    className="block text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/creator/signup"
                    className="block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
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
