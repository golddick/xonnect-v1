import sharp from "sharp"

function getLogoUrl() {
  return process.env.LOGO?.trim() || null
}

function createCenterLogoOverlay(width: number, height: number) {
  const size = Math.round(Math.min(width, height) * 0.28)
  const left = Math.round((width - size) / 2)
  const top = Math.round((height - size) / 2)

  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${left - 10}" y="${top - 10}" width="${size + 20}" height="${size + 20}" rx="18" fill="#ffffff"/>
    </svg>
  `)
}

export async function createTicketQrDataUrl(payload: string) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=420x420&ecc=H&data=${encodeURIComponent(payload)}`
  const qrResponse = await fetch(qrUrl)

  if (!qrResponse.ok) {
    throw new Error("Failed to generate QR code")
  }

  const qrBuffer = Buffer.from(await qrResponse.arrayBuffer())
  const qrImage = sharp(qrBuffer)
  const metadata = await qrImage.metadata()
  const width = metadata.width ?? 420
  const height = metadata.height ?? 420

  const overlays: Array<{ input: Buffer; top: number; left: number }> = [
    {
      input: createCenterLogoOverlay(width, height),
      top: 0,
      left: 0,
    },
  ]

  const logoUrl = getLogoUrl()
  if (logoUrl) {
    try {
      const logoResponse = await fetch(logoUrl)
      if (logoResponse.ok) {
        const logoBuffer = Buffer.from(await logoResponse.arrayBuffer())
        const logoSize = Math.round(Math.min(width, height) * 0.18)
        const logo = await sharp(logoBuffer)
          .resize(logoSize, logoSize, { fit: "contain" })
          .png()
          .toBuffer()

        overlays.push({
          input: logo,
          top: Math.round((height - logoSize) / 2),
          left: Math.round((width - logoSize) / 2),
        })
      }
    } catch {
      // Best effort. The QR code remains valid without the logo overlay.
    }
  }

  const composed = await qrImage
    .composite(
      overlays.map((overlay) => ({
        input: overlay.input,
        top: overlay.top,
        left: overlay.left,
      }))
    )
    .png()
    .toBuffer()

  return `data:image/png;base64,${composed.toString("base64")}`
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
