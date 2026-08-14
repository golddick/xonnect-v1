import QRCode from "qrcode"

// export async function createTicketQrDataUrl(payload: string) {
//   try {
//     return await QRCode.toDataURL(payload, {
//       errorCorrectionLevel: "H",
//       margin: 2,
//       width: 420,
//       color: {
//         dark: "#000000",
//         light: "#FFFFFF", 
//       },
//     })
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to generate QR code"
//     )
//   }
// }


const CAMERA_LOGO_URL = "https://utfs.io/f/Sgkj9xKh6THfmetGRdWbY8exhNzLoErGW0lkfQ3VPOyXdZDB"

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function createTicketQrDataUrl(payload: string) {
  const svg = await QRCode.toString((payload), {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 1,
    width: 320,
    color: {
      dark: "#111111",
     light: "#ffffff",
    },
  })

  const logoMarkup = CAMERA_LOGO_URL
    ? `
      <rect x="37%" y="37%" width="26%" height="26%" rx="8%" fill="#ffffff" />
      <image
        href="${escapeXml(CAMERA_LOGO_URL)}"
        x="41%" y="41%" width="18%" height="18%"
        preserveAspectRatio="xMidYMid meet"
      />
    `
    : `
      <rect x="39%" y="39%" width="22%" height="22%" rx="8%" fill="#ffffff" />
    `
 
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace("</svg>", `${logoMarkup}</svg>`))}`
}



export function buildTicketPayload(args: {
  eventId: string
  ticketId: string
  purchaseId: string
  ticketCode: string
  quantity: number
}) {
  return [
    "XONNECT",
    `event:${args.eventId}`,
    `ticket:${args.ticketId}`,
    `purchase:${args.purchaseId}`,
    `code:${args.ticketCode}`,
    `quantity:${args.quantity}`,
  ].join("|")
}
