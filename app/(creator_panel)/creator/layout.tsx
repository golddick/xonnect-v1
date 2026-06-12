import type { ReactNode } from "react"
import Sidebar from "./_component/sidebar/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 flex-col lg:ml-64">
        {children}
      </main>
    </div>
  )
}
