import { redirect } from "next/navigation"


import { PostLoginModal } from "@/components/post-login-modal"
import { auth } from "@/lib/auth/auth"

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { welcomeBack?: string }
}) {
  const session = await auth()
  if (!session?.user) {
    redirect("/auth/login")
  }

  const params = searchParams ?? {}
  const shouldShowWelcome = params.welcomeBack === "1"

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-10">
      <PostLoginModal
        open={shouldShowWelcome}
        title="Welcome Back 👋"
        message="You are signed in and ready to continue."
      />
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl border border-border bg-card p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Xonnect Dashboard</p>
          <h1 className="mt-3 text-3xl font-semibold">Welcome, {session.user.name || session.user.email}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Your authentication stack is live. Use this space for events, creator tools, and account actions.
          </p>
        </div>
      </div>
    </main>
  )
}
