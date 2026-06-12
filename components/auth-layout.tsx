'use client'

import { ReactNode } from 'react'

export default function AuthLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle: string }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background">
      {/* Left Side - Animated Welcome */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background p-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center">
          {/* Animated Logo/Title */}
          <div className="mb-8 inline-block">
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-4 animate-fade-in">
              <span className="text-foreground">
                XONNECT
              </span>
            </h1>
          </div>

          {/* Welcome Messages */}
          <div className="space-y-6 mt-12">
            <p className="text-xl text-muted-foreground animate-fade-in-delay">
              Bringing the world experience to you
            </p>
            <div className="space-y-4 flex flex-col items-start">
              <div className="flex items-center justify-center gap-3 text-muted-foreground/80 animate-fade-in-delay-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Stream. Create. Connect.</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-muted-foreground/80 animate-fade-in-delay-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Premium content at your fingertips</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-muted-foreground/80 animate-fade-in-delay-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Where creators become superstars</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6 md:p-8 bg-gradient-to-b from-muted/30 to-background">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 backdrop-blur-xl">
            {children}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

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

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
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
