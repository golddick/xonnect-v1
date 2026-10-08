'use client'

import Link from 'next/link';
import { ReactNode } from 'react'

export default function AuthLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle: string }) {
  return (
    <div className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-background">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/xonnect-hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Left Side - Animated Welcome */}
      <div className="relative z-10 hidden md:flex items-center justify-center p-8 overflow-hidden">
        <div className="relative z-10 text-center text-white">
          {/* Animated Logo/Title */}
          <div className="mb-8 inline-block">
            <Link href="/" className="flex items-center justify-center">
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-4 animate-fade-in">
              <span className="text-white">
                XONNECT
              </span>
            </h1>
            </Link>
          </div>

          {/* Welcome Messages */}
          <div className="space-y-6 mt-12">
            <p className="text-xl text-white/80 animate-fade-in-delay">
              Bringing the world experience to you
            </p>
            <div className="space-y-4 flex flex-col items-start">
              <div className="flex items-center justify-center gap-3 text-white/80 animate-fade-in-delay-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Stream. Create. Connect.</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/80 animate-fade-in-delay-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Premium content at your fingertips</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/80 animate-fade-in-delay-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Where creators become superstars</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="relative z-10 flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
            {children}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out 0.2s backwards;
        }

        .animate-fade-in-delay {
          animation: fadeIn 0.8s ease-out 0.6s backwards;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 0.8s ease-out 0.8s backwards;
        }

        .animate-fade-in-delay-3 {
          animation: fadeIn 0.8s ease-out 1s backwards;
        }

        .animate-fade-in-delay-4 {
          animation: fadeIn 0.8s ease-out 1.2s backwards;
        }
      `}</style>
    </div>
  )
}
