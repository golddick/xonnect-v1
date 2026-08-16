// import { NextRequest, NextResponse } from "next/server"

// import { auth } from "@/lib/auth/auth"
// import { setPasswordForEmail, verifyPasswordForEmail } from "@/lib/auth/password"

// export async function PUT(request: NextRequest) {
//   try {
//     const session = await auth()
//     const email = session?.user?.email

//     if (!email) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//     }

//     const body = await request.json()
//     const currentPassword = body?.currentPassword
//     const password = body?.password

//     if (typeof currentPassword !== "string" || currentPassword.length === 0) {
//       return NextResponse.json(
//         { message: "Current password is required" },
//         { status: 400 }
//       )
//     }

//     if (typeof password !== "string" || password.length < 8) {
//       return NextResponse.json(
//         { message: "New password must be at least 8 characters long" },
//         { status: 400 }
//       )
//     }

//     const passwordIsValid = await verifyPasswordForEmail(email, currentPassword)
//     if (!passwordIsValid) {
//       return NextResponse.json(
//         { message: "Current password is incorrect" },
//         { status: 401 }
//       )
//     }

//     await setPasswordForEmail(email, password)

//     return NextResponse.json(
//       { message: "Password updated successfully" },
//       { status: 200 }
//     )
//   } catch (error) {
//     console.error("Update password error:", error)
//     return NextResponse.json(
//       { message: "Failed to update password" },
//       { status: 500 }
//     )
//   }
// }
















import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { setPasswordForEmail, verifyPasswordForEmail } from "@/lib/auth/password"
import { prisma } from "@/lib/db"


export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    const email = session?.user?.email

    if (!email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const currentPassword = body?.currentPassword
    const newPassword = body?.password

    // Validate new password
    if (typeof newPassword !== "string" || newPassword.length < 8) {
      return NextResponse.json(
        { message: "New password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    // Get user profile to check if they have a password
    const profile = await prisma.profile.findUnique({
      where: { email },
      select: { hasPassword: true }
    })

    if (!profile) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    // If user has a password, validate current password
    if (profile.hasPassword) {
      // Current password is required
      if (typeof currentPassword !== "string" || currentPassword.length === 0) {
        return NextResponse.json(
          { message: "Current password is required" },
          { status: 400 }
        )
      }

      // Verify current password
      const passwordIsValid = await verifyPasswordForEmail(email, currentPassword)
      if (!passwordIsValid) {
        return NextResponse.json(
          { message: "Current password is incorrect" },
          { status: 401 }
        )
      }
    } else {
      // User doesn't have a password, skip current password validation
      // If currentPassword is provided but user doesn't have one, we'll ignore it
      // or you could optionally throw a specific error
      console.log(`User ${email} doesn't have a password set, skipping current password validation`)
    }

    // Set the new password (this should also update hasPassword to true)
    await setPasswordForEmail(email, newPassword)

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Update password error:", error)
    return NextResponse.json(
      { message: "Failed to update password" },
      { status: 500 }
    )
  }
}