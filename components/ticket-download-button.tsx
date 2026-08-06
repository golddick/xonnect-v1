"use client"

import { Download } from "lucide-react"
import { useState } from "react"

interface TicketDownloadButtonProps {
  ticketCode: string
  eventTitle: string
  location: string
  date: string
  quantity: number
  total: string
  ticketType: string
  ticketCodes?: string[]
  qrImageDataUrls?: Array<string | null> | null
}

export function TicketDownloadButton({
  ticketCode,
  eventTitle,
  location,
  date,
  quantity,
  total,
  ticketType,
  ticketCodes,
  qrImageDataUrls,
}: TicketDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)

    const codes = ticketCodes && ticketCodes.length > 0 ? ticketCodes : [ticketCode]
    const qrImages = qrImageDataUrls?.filter(Boolean) as string[] | undefined
    const logoUrl = `${window.location.origin}/xonnect-logo.png`

    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${eventTitle} Ticket${codes.length > 1 ? "s" : ""}</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 24px; color: #111827; background: #f9fafb; }
      .card { background: #ffffff; border: 1px solid #d1d5db; border-radius: 16px; padding: 24px; max-width: 860px; margin: 0 auto; }
      .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
      .brand img { width: 120px; max-width: 100%; height: auto; }
      .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em; color: #6b7280; margin-bottom: 8px; }
      h1 { margin: 0 0 8px; font-size: 28px; }
      .meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-top: 20px; }
      .box { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; background: #f8fafc; }
      .code { font-size: 18px; letter-spacing: 0.12em; font-weight: 700; word-break: break-all; margin-top: 8px; }
      .ticket-section { margin-top: 24px; }
      .ticket-item { border: 1px solid #e5e7eb; border-radius: 14px; padding: 18px; margin-bottom: 18px; }
      .ticket-item-title { font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 12px; }
      .qr-wrap { margin-top: 18px; text-align: center; }
      .qr-wrap img { width: 240px; max-width: 100%; border-radius: 14px; border: 1px solid #e5e7eb; }
      .qr-text { margin-top: 12px; color: #6b7280; font-size: 13px; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="brand">
        <img src="${logoUrl}" alt="Xonnect logo" />
      </div>
      <div class="label">Xonnect Ticket Pass</div>
      <h1>${eventTitle}</h1>
      <p>${ticketType}</p>
      <div class="meta">
        <div class="box"><div class="label">Date</div><div>${date}</div></div>
        <div class="box"><div class="label">Location</div><div>${location}</div></div>
        <div class="box"><div class="label">Quantity</div><div>${quantity}</div></div>
        <div class="box"><div class="label">Total</div><div>${total}</div></div>
      </div>
      ${codes
        .map(
          (code, index) => `
            <div class="ticket-section">
              <div class="ticket-item">
                <div class="ticket-item-title">Ticket ${index + 1}</div>
                <div class="code">${code}</div>
                ${qrImages && qrImages[index]
                  ? `
                    <div class="qr-wrap">
                      <img src="${qrImages[index]}" alt="Ticket QR code ${index + 1}" />
                      <div class="qr-text">Scan this QR code at the event entrance.</div>
                    </div>
                  `
                  : ""}
              </div>
            </div>
          `
        )
        .join("")}
    </div>
  </body>
</html>`

    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${ticketCode}-${codes.length > 1 ? "tickets" : "ticket"}.html`
    link.click()
    URL.revokeObjectURL(url)
    setIsDownloading(false)
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
    >
      <Download className="h-4 w-4" />
      {isDownloading ? "Preparing..." : "Download ticket"}
    </button>
  )
}
