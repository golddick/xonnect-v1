import QRCode from "qrcode"

export async function createTicketQrDataUrl(payload: string) {
  try {
    return await QRCode.toDataURL(payload, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 420,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    })
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to generate QR code"
    )
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
