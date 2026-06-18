// import type { Metadata } from 'next'
// import Footer from '@/components/footer'
// import XonnectSplash from '@/components/splash_screen/xonnect-splash'
// import Navigation from '@/components/nav/navigation'

// export const metadata: Metadata = {
//   title: 'Xonnect',
//   description: 'Pay on demand platform',
//   generator: 'Next.js',
// }

// export default function LandingPageLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <>
//       <XonnectSplash />

//       <div className="min-h-screen flex flex-col bg-background text-foreground">
//         <Navigation />

//         <main className="flex-1">
//           {children}
//         </main>

//         <Footer />
//       </div>
//     </>
//   )
// }


"use client"

import { useState } from 'react'
import Footer from '@/components/footer'
import XonnectSplash from '@/components/splash_screen/xonnect-splash'
import Navigation from '@/components/nav/navigation'

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [showContent, setShowContent] = useState(false)

  return (
    <>
      <XonnectSplash onComplete={() => setShowContent(true)} />
      
      {showContent && (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Navigation />
          <main className="flex-1 mt-14">
            {children}
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}