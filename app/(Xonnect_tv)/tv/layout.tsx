import TvSidebar from '@/app/(Xonnect_tv)/tv/_component/tv-sidebar'
import type { Metadata } from 'next'
import Header from './_component/Header'

export const metadata: Metadata = {
  title: 'xonnect',
  description: 'Pay on demand platform',
  generator: ' Next.js',
}

export default function TvLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <div className="hidden lg:block">
        <TvSidebar />
      </div>
      <main className="flex-1 flex-col  ">
        <Header/>
        {children}
      </main>
    </div>
  )
}
 