// import { NextRequest, NextResponse } from "next/server"
// import { getTvMoviePayload } from "@/lib/tv/public-content"

// export const dynamic = "force-dynamic"

// // Public TV movie endpoint.
// // GET /api/tv/movie
// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const pricing = searchParams.get("pricing")
//     const search = searchParams.get("search")
//     const limit = Number(searchParams.get("limit") ?? 50)

//     const payload = await getTvMoviePayload({
//       pricing,
//       search,
//       limit: Number.isFinite(limit) ? limit : 50,
//     })

//     return NextResponse.json(payload, { status: 200 })
//   } catch (error) {
//     console.error("TV movie GET error:", error)
//     return NextResponse.json(
//       { 
//         message: "Failed to load movie content",
//         items: [],
//         total: 0,
//         filters: {
//           pricing: "all",
//           search: "",
//         },
//         source: "error",
//       }, 
//       { status: 500 }
//     )
//   }
// }




import { NextRequest, NextResponse } from "next/server"
import { getTvMoviePayload } from "@/lib/tv/public-content"

export const dynamic = "force-dynamic"

// Public TV movie endpoint.
// GET /api/tv/movie
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pricing = searchParams.get("pricing")
    const search = searchParams.get("search")
    const limit = Number(searchParams.get("limit") ?? 50)

    console.log("🎬 [API] /api/tv/movie called with:", { pricing, search, limit })

    const payload = await getTvMoviePayload({
      pricing,
      search,
      limit: Number.isFinite(limit) ? limit : 50,
    })

    console.log("📤 [API] Returning payload with", payload.items.length, "items, source:", payload.source)

    return NextResponse.json(payload, { status: 200 })
  } catch (error) {
    console.error("❌ [API] TV movie GET error:", error)
    return NextResponse.json(
      { 
        message: "Failed to load movie content",
        items: [],
        total: 0,
        filters: {
          pricing: "all",
          search: "",
        },
        source: "error",
      }, 
      { status: 500 }
    )
  }
}