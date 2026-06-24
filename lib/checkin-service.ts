// import { prisma } from "@/lib/db/prisma"
// import { verifyPassword } from "@/lib/auth/password"
// import { verifyCheckInSessionToken } from "@/lib/checkin-auth"
// import { dropid } from "dropid"

// const db = prisma as any

// export type CheckInSessionUser = {
//   id: string
//   email: string
//   username: string
//   fullName: string
//   gateName: string
//   status: string
//   event: {
//     id: string
//     title: string
//     status: string
//     scheduledAt: string | null 
//     accessType: string
//     isHybrid: boolean
//   }
//   scansToday: number
//   totalScans: number
//   lastLoginAt: string | null
// }

// export function parseCheckInPayload(code: string) {
//   const trimmed = code.trim()
//   if (!trimmed) return { ticketCode: "", purchaseId: null, eventId: null }

//   const segments = trimmed.split("|")
//   const parsed: Record<string, string> = {}

//   for (const segment of segments) {
//     const [key, ...rest] = segment.split(":")
//     if (!key || rest.length === 0) continue
//     parsed[key.trim().toLowerCase()] = rest.join(":").trim()
//   }

//   return {
//     ticketCode: parsed.code ?? parsed.ticket ?? trimmed,
//     purchaseId: parsed.purchase ?? null,
//     eventId: parsed.event ?? null,
//   }
// }

// export function getCheckInCookieToken(request: Request) {
//   const cookieHeader = request.headers.get("cookie") ?? ""
//   const cookieName = `${"xonnect_checkin_session"}=`
//   const match = cookieHeader
//     .split(";")
//     .map((item) => item.trim())
//     .find((item) => item.startsWith(cookieName))

//   return match ? decodeURIComponent(match.slice(cookieName.length)) : null
// }

// export async function getAuthenticatedCheckInUser(request: Request) {
//   const token = getCheckInCookieToken(request)
//   if (!token) return null

//   const payload = verifyCheckInSessionToken(token)
//   if (!payload) return null

//   const user = await db.creatorEventCheckInUser.findUnique({
//     where: { id: payload.userId },
//     include: {
//       event: {
//         include: {
//           tickets: true,
//         },
//       },
//     },
//   })

//   if (!user || user.status !== "ACTIVE") {
//     return null
//   }

//   return {
//     id: user.id,
//     email: user.email,
//     username: user.username,
//     fullName: user.fullName,
//     gateName: user.gateName,
//     status: user.status,
//     event: {
//       id: user.event.id,
//       title: user.event.title,
//       status: user.event.status,
//       scheduledAt: user.event.scheduledAt ? user.event.scheduledAt.toISOString() : null,
//       accessType: user.event.requireTicket ? "ticketed" : "open",
//       isHybrid:
//         user.event.tickets.some((ticket: any) => ticket.access === "VENUE") &&
//         user.event.tickets.some((ticket: any) => ticket.access === "STREAM"),
//     },
//     scansToday: user.scansToday,
//     totalScans: user.totalScans,
//     lastLoginAt: user.lastLoginAt ? user.lastLoginAt.toISOString() : null,
//   } satisfies CheckInSessionUser
// }

// export async function loadCheckInDashboard(userId: string) {
//   const user = await db.creatorEventCheckInUser.findUnique({
//     where: { id: userId },
//     include: {
//       event: {
//         include: {
//           tickets: true,
//           checkInScans: {
//             orderBy: { scannedAt: "desc" },
//             take: 12,
//             include: {
//               ticketPurchase: {
//                 include: {
//                   ticket: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   })

//   if (!user) return null

//   const scans = user.event.checkInScans.map((scan: any) => ({
//     id:  dropid("checkInScan"),
//     attendeeName: scan.attendeeName ?? scan.ticketPurchase?.buyerName ?? null,
//     attendeeEmail: scan.attendeeEmail ?? scan.ticketPurchase?.buyerEmail ?? null,
//     gateName: scan.gateName ?? user.gateName,
//     status: scan.status,
//     scannedAt: scan.scannedAt.toISOString(),
//     code: scan.scannedCode ?? scan.ticketPurchase?.ticketCode ?? "",
//     ticketType: scan.ticketPurchase?.ticket?.ticketType ?? null,
//   }))

//   const venueTickets = user.event.tickets.filter((ticket: any) => ticket.access === "VENUE")
//   const streamingTickets = user.event.tickets.filter((ticket: any) => ticket.access === "STREAM")

//   return {
//     user: {
//       id: user.id,
//       email: user.email,
//       username: user.username,
//       fullName: user.fullName,
//       gateName: user.gateName,
//       status: user.status,
//       scansToday: user.scansToday,
//       totalScans: user.totalScans,
//       lastLoginAt: user.lastLoginAt ? user.lastLoginAt.toISOString() : null,
//       event: {
//         id: user.event.id,
//         title: user.event.title,
//         status: user.event.status,
//         scheduledAt: user.event.scheduledAt ? user.event.scheduledAt.toISOString() : null,
//         venueTicketCount: venueTickets.length,
//         streamingTicketCount: streamingTickets.length,
//         isHybrid: venueTickets.length > 0 && streamingTickets.length > 0,
//       },
//     },
//     stats: {
//       totalScans: user.totalScans,
//       scansToday: user.scansToday,
//       venueTickets: venueTickets.length,
//       checkedInPurchases: user.event.checkInScans.filter((scan: any) => scan.status === "SUCCESS").length,
//     },
//     recentScans: scans,
//   }
// }

// export async function validateCheckInCredentials(username: string, password: string) {
//   const normalized = username.trim().toLowerCase()
//   const user = await db.creatorEventCheckInUser.findFirst({
//     where: {
//       OR: [
//         { username: normalized },
//         { email: normalized },
//       ],
//     },
//     include: {
//       event: {
//         include: {
//           tickets: true,
//         },
//       },
//     },
//   })

//   if (!user || user.status !== "ACTIVE") {
//     return null
//   }

//   const passwordIsValid = verifyPassword(password, user.passwordHash)
//   if (!passwordIsValid) {
//     return null
//   }

//   await db.creatorEventCheckInUser.update({
//     where: { id: user.id },
//     data: {
//       lastLoginAt: new Date(),
//     },
//   })

//   return user
// }

// export async function markCheckInStats(userId: string, now = new Date()) {
//   const existing = await db.creatorEventCheckInUser.findUnique({
//     where: { id: userId },
//     select: {
//       lastScanAt: true,
//       scansToday: true,
//       totalScans: true,
//     },
//   })

//   if (!existing) return

//   const sameDay =
//     existing.lastScanAt &&
//     existing.lastScanAt.toDateString() === now.toDateString()

//   await db.creatorEventCheckInUser.update({
//     where: { id: userId },
//     data: {
//       scansToday: sameDay ? { increment: 1 } : 1,
//       totalScans: { increment: 1 },
//       lastScanAt: now,
//     },
//   })
// }







import { prisma } from "@/lib/db/prisma"
import { verifyPassword } from "@/lib/auth/password"
import { verifyCheckInSessionToken } from "@/lib/checkin-auth"
import { dropid } from "dropid"

const db = prisma as any

export type CheckInSessionUser = {
  id: string
  email: string
  username: string
  fullName: string
  gateName: string
  status: string
  event: {
    id: string
    title: string
    status: string
    scheduledAt: string | null 
    accessType: string
    isHybrid: boolean
  }
  scansToday: number
  totalScans: number
  lastLoginAt: string | null
}

export function getCheckInCookieToken(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? ""
  const cookieName = `${"xonnect_checkin_session"}=`
  const match = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(cookieName))

  return match ? decodeURIComponent(match.slice(cookieName.length)) : null
}

export async function validateCheckInCredentials(username: string, password: string) {
  const normalized = username.trim().toLowerCase()
  
  const user = await db.creatorEventCheckInUser.findFirst({
    where: {
      OR: [
        { username: normalized },
        { email: normalized },
      ],
    },
    include: {
      event: {
        include: {
          tickets: true,
        },
      },
    },
  })

  if (!user || user.status !== "ACTIVE") {
    return null
  }

  const passwordIsValid = verifyPassword(password, user.passwordHash)
  if (!passwordIsValid) {
    return null
  }

  await db.creatorEventCheckInUser.update({
    where: { id: user.id },
    data: {
      lastLoginAt: new Date(),
    },
  })

  return user
}

export async function getAuthenticatedCheckInUser(request: Request) {
  const token = getCheckInCookieToken(request)
  if (!token) return null

  const payload = verifyCheckInSessionToken(token)
  if (!payload) return null

  const user = await db.creatorEventCheckInUser.findUnique({
    where: { id: payload.userId },
    include: {
      event: {
        include: {
          tickets: true,
        },
      },
    },
  })

  if (!user || user.status !== "ACTIVE") {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    fullName: user.fullName,
    gateName: user.gateName,
    status: user.status,
    event: {
      id: user.event.id,
      title: user.event.title,
      status: user.event.status,
      scheduledAt: user.event.scheduledAt ? user.event.scheduledAt.toISOString() : null,
      accessType: user.event.requireTicket ? "ticketed" : "open",
      isHybrid:
        user.event.tickets.some((ticket: any) => ticket.access === "VENUE") &&
        user.event.tickets.some((ticket: any) => ticket.access === "STREAM"),
    },
    scansToday: user.scansToday,
    totalScans: user.totalScans,
    lastLoginAt: user.lastLoginAt ? user.lastLoginAt.toISOString() : null,
  } satisfies CheckInSessionUser
}

export async function loadCheckInDashboard(userId: string) {
  const user = await db.creatorEventCheckInUser.findUnique({
    where: { id: userId },
    include: {
      event: {
        include: {
          tickets: true,
          checkInScans: {
            orderBy: { scannedAt: "desc" },
            take: 12,
            include: {
              ticketPurchase: {
                include: {
                  ticket: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!user) return null

  const scans = user.event.checkInScans.map((scan: any) => ({
    id: dropid("checkInScan"),
    attendeeName: scan.attendeeName ?? scan.ticketPurchase?.buyerName ?? null,
    attendeeEmail: scan.attendeeEmail ?? scan.ticketPurchase?.buyerEmail ?? null,
    gateName: scan.gateName ?? user.gateName,
    status: scan.status,
    scannedAt: scan.scannedAt.toISOString(),
    code: scan.scannedCode ?? scan.ticketPurchase?.ticketCode ?? "",
    ticketType: scan.ticketPurchase?.ticket?.ticketType ?? null,
  }))

  const venueTickets = user.event.tickets.filter((ticket: any) => ticket.access === "VENUE")
  const streamingTickets = user.event.tickets.filter((ticket: any) => ticket.access === "STREAM")

  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      gateName: user.gateName,
      status: user.status,
      scansToday: user.scansToday,
      totalScans: user.totalScans,
      lastLoginAt: user.lastLoginAt ? user.lastLoginAt.toISOString() : null,
      event: {
        id: user.event.id,
        title: user.event.title,
        status: user.event.status,
        scheduledAt: user.event.scheduledAt ? user.event.scheduledAt.toISOString() : null,
        venueTicketCount: venueTickets.length,
        streamingTicketCount: streamingTickets.length,
        isHybrid: venueTickets.length > 0 && streamingTickets.length > 0,
      },
    },
    stats: {
      totalScans: user.totalScans,
      scansToday: user.scansToday,
      venueTickets: venueTickets.length,
      checkedInPurchases: user.event.checkInScans.filter((scan: any) => scan.status === "SUCCESS").length,
    },
    recentScans: scans,
  }
}

export async function markCheckInStats(userId: string, now = new Date()) {
  const existing = await db.creatorEventCheckInUser.findUnique({
    where: { id: userId },
    select: {
      lastScanAt: true,
      scansToday: true,
      totalScans: true,
    },
  })

  if (!existing) return

  const sameDay =
    existing.lastScanAt &&
    existing.lastScanAt.toDateString() === now.toDateString()

  await db.creatorEventCheckInUser.update({
    where: { id: userId },
    data: {
      scansToday: sameDay ? { increment: 1 } : 1,
      totalScans: { increment: 1 },
      lastScanAt: now,
    },
  })
}

export function parseCheckInPayload(code: string) {
  const trimmed = code.trim()
  if (!trimmed) return { ticketCode: "", purchaseId: null, eventId: null }

  const segments = trimmed.split("|")
  const parsed: Record<string, string> = {}

  for (const segment of segments) {
    const [key, ...rest] = segment.split(":")
    if (!key || rest.length === 0) continue
    parsed[key.trim().toLowerCase()] = rest.join(":").trim()
  }

  return {
    ticketCode: parsed.code ?? parsed.ticket ?? trimmed,
    purchaseId: parsed.purchase ?? null,
    eventId: parsed.event ?? null,
  }
}