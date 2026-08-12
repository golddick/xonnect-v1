import { redirect } from "next/navigation"

import { PostLoginModal } from "@/components/common_component/post-login-modal"
import Link from "next/link"
import { auth } from "@/lib/auth/auth"
import { getProfileByEmail } from "@/lib/auth/profiles"
import ProfileClient from "./ProfileClient"
import Header from "@/app/(Xonnect_tv)/tv/_component/Header"

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
        title="Welcome to Xonnect "
        message="Account successfully created. You are ready to start creating events."
      />
      <div className=" space-y-6">
       <Header/>
        <ProfileClient profile={profile}/>

      </div>
    </main>
  )
}
