import { redirect } from "next/navigation"
import { PostLoginModal } from "@/components/common_component/post-login-modal"
import { auth } from "@/lib/auth/auth"
import { getProfileByEmail } from "@/lib/auth/profiles"
import ProfileClient from "./ProfileClient"
import { ProfileHeader } from "./Header"


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
    <main className="min-h-screen bg-background text-foreground">
      <ProfileHeader />
      <div className="px-6 py-10">
        <PostLoginModal
          open={showWelcome}
          title="Welcome to Xonnect"
          message="Account successfully created. You are ready to start creating events."
        />
        <div className="space-y-6">
          <ProfileClient profile={profile} />
        </div>
      </div>
    </main>
  )
}