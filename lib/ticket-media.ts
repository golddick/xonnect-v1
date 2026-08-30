import QRCode from "qrcode"

import { getBrandLogoBuffer, getBrandLogoDataUri } from "./brand-logo"

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

/**
 * SVG QR (data URI) used for in-browser rendering (the ticket document page and
 * the PDF/image download). The logo is inlined as a base64 data URI so it still
 * renders when the SVG is loaded through `<img src="data:image/svg+xml,...">`,
 * which runs in a restricted mode that blocks external `<image href>` fetches.
 *
 * Do NOT use this for email — email clients don't render SVG. Use the hosted
 * PNG endpoint (`/tickets/document/<code>/qr`, backed by `createTicketQrPng`).
 */
export async function createTicketQrDataUrl(payload: string) {
  const svg = await QRCode.toString(payload, {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 1,
    width: 320,
    color: {
      dark: "#111111",
      light: "#ffffff",
    },
  })

  const logoDataUri = await getBrandLogoDataUri()

  const logoMarkup = logoDataUri
    ? `
      <rect x="37%" y="37%" width="26%" height="26%" rx="8%" fill="#ffffff" />
      <image
        href="${escapeXml(logoDataUri)}"
        x="41%" y="41%" width="18%" height="18%"
        preserveAspectRatio="xMidYMid meet"
      />
    `
    : `
      <rect x="39%" y="39%" width="22%" height="22%" rx="8%" fill="#ffffff" />
    `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace("</svg>", `${logoMarkup}</svg>`))}`
}

const QR_PNG_SIZE = 640

/**
 * Raster PNG QR with the brand logo composited in the centre. This is what gets
 * served over HTTPS and referenced from confirmation emails, because email
 * clients render neither SVG nor `data:` URI images — only a hosted raster URL.
 *
 * The QR uses error-correction level H (tolerates ~30% occlusion), so the
 * centred logo never breaks scannability. If logo compositing fails for any
 * reason we fall back to the plain (still fully scannable) QR.
 */
export async function createTicketQrPng(payload: string): Promise<Buffer> {
  const dataUrl = await QRCode.toDataURL(payload, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: QR_PNG_SIZE,
    color: {
      dark: "#111111",
      light: "#ffffff",
    },
  })

  const qrBuffer = Buffer.from(dataUrl.split(",")[1] ?? "", "base64")

  try {
    const logoBuffer = await getBrandLogoBuffer()
    if (!logoBuffer) return qrBuffer

    const { default: sharp } = await import("sharp")

    const badgeSize = Math.round(QR_PNG_SIZE * 0.24)
    const logoSize = Math.round(QR_PNG_SIZE * 0.17)
    const radius = Math.round(badgeSize * 0.24)

    const badge = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${badgeSize}" height="${badgeSize}">` +
        `<rect x="0" y="0" width="${badgeSize}" height="${badgeSize}" rx="${radius}" ry="${radius}" fill="#ffffff"/>` +
        `</svg>`
    )

    const resizedLogo = await sharp(logoBuffer)
      .resize(logoSize, logoSize, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png()
      .toBuffer()

    return await sharp(qrBuffer)
      .composite([
        { input: badge, gravity: "center" },
        { input: resizedLogo, gravity: "center" },
      ])
      .png()
      .toBuffer()
  } catch (error) {
    console.error("Failed to composite logo onto ticket QR:", error)
    return qrBuffer
  }
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
