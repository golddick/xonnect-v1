import { redirect } from "next/navigation"

import { PostLoginModal } from "@/components/post-login-modal"
import Link from "next/link"
import { auth } from "@/lib/auth/auth"
import { getProfileByEmail } from "@/lib/auth/profiles"
import ProfileClient from "./ProfileClient"

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>
}) {
  const session = await auth()
  if (!session?.user) {
    redirect("/auth/login")
  }

  const profile = await getProfileByEmail(session.user.email!)
  const params = await searchParams
  const showWelcome = params?.welcome === "1"


  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <PostLoginModal
        open={showWelcome}
        title="Welcome to Xonnect 🎉"
        message="Account successfully created. You are ready to start creating events."
      />
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-3xl border border-border bg-card p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Profile</p>
          <h1 className="mt-3 text-3xl font-semibold">{session.user.name || "Your account"}</h1>
          <p className="mt-2 text-muted-foreground">{session.user.email}</p>
        </section>

        <ProfileClient profile={profile}/>

        <section className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Current session</h2>
          <p className="mt-2 text-sm text-muted-foreground">NextAuth is managing your session state.</p>
        </section>
      </div>
    </main>
  )
}
