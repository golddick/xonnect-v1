import { NextResponse } from "next/server"
import { validateCheckInCredentials } from "@/lib/checkin-service" // Correct import
import { 
  createCheckInSessionToken, 
  getCheckInSessionCookieName 
} from "@/lib/checkin-auth"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string }
    const username = body.username?.trim()
    const password = body.password?.trim()

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      )
    }

    const user = await validateCheckInCredentials(username, password)

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      )
    }

    const response = NextResponse.json(
      {
        message: "Signed in",
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          gateName: user.gateName,
          event: {
            id: user.event.id,
            title: user.event.title,
          },
        },
      },
      { status: 200 }
    )

    const sessionToken = createCheckInSessionToken({
      userId: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      eventId: user.event.id,
      gateName: user.gateName,
    })

    response.cookies.set(
      getCheckInSessionCookieName(),
      sessionToken,
      {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 12 * 60 * 60,
      }
    )

    return response
  } catch (error) {
    console.error("Check-in login failed:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    
    return NextResponse.json(
      { message: "Unable to sign in" },
      { status: 500 }
    )
  }
}


// import { NextResponse } from "next/server"

// import { createCheckInSessionToken, getCheckInSessionCookieName } from "@/lib/checkin-auth"
// import { validateCheckInCredentials } from "@/lib/checkin-service"

// export async function POST(request: Request) {
//   try {
//     const body = (await request.json()) as { username?: string; password?: string }
//     const username = body.username?.trim()
//     const password = body.password?.trim()

//     if (!username || !password) {
//       return NextResponse.json({ message: "Username and password are required" }, { status: 400 })
//     }

//     const user = await validateCheckInCredentials(username, password)

//     if (!user) {
//       return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
//     }

//     const response = NextResponse.json(
//       {
//         message: "Signed in",
//         user: {
//           id: user.id,
//           email: user.email,
//           username: user.username,
//           fullName: user.fullName,
//           gateName: user.gateName,
//           event: {
//             id: user.event.id,
//             title: user.event.title,
//           },
//         },
//       },
//       { status: 200 }
//     )

//     response.cookies.set(getCheckInSessionCookieName(), createCheckInSessionToken({
//       userId: user.id,
//       email: user.email,
//       username: user.username,
//       fullName: user.fullName,
//       eventId: user.event.id,
//       gateName: user.gateName,
//     }), {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//       maxAge: 12 * 60 * 60,
//     })

//     return response
//   } catch (error) {
//     console.error("Check-in login failed:", error)
//     return NextResponse.json({ message: "Unable to sign in" }, { status: 500 })
//   }
// }

