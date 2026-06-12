import Link from "next/link"

import AuthLayout from "@/components/auth-layout"

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Password is optional" subtitle="Xonnect does not require a password to sign up">
      <div className="space-y-5">
        <p className="text-sm leading-6 text-muted-foreground">
          New users sign in with magic links. Returning users can use OTP, and password login becomes available
          only after a password is added later.
        </p>

        <div className="rounded-2xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          If you already have an account, use the login page to continue.
        </div>

        <Link
          href="/auth/login"
          className="block rounded-xl bg-foreground px-4 py-3 text-center font-semibold text-background transition hover:opacity-90"
        >
          Back to login
        </Link>
      </div>
    </AuthLayout>
  )
}
