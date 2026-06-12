import type { ReactNode } from "react"
import { redirect } from "next/navigation"

import { Role } from "@/lib/generated/prisma"
import SuperAdminSidebar from "./_component/superadmin-sidebar"
import { auth } from "@/lib/auth/auth"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await auth()

  if (
    !session?.user?.email ||
    (session.user.role !== Role.ADMIN && session.user.role !== Role.SUPERADMIN)
  ) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <SuperAdminSidebar />
      <main className="flex-1 flex-col md:ml-60">
        {children}
      </main>
    </div>
  )
}
