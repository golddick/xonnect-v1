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
  qrImageDataUrl?: string | null
}

export function TicketDownloadButton({
  ticketCode,
  eventTitle,
  location,
  date,
  quantity,
  total,
  ticketType,
  qrImageDataUrl,
}: TicketDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)

    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${eventTitle} Ticket</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 24px; color: #111827; }
      .card { border: 1px solid #d1d5db; border-radius: 12px; padding: 24px; max-width: 720px; margin: 0 auto; }
      .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em; color: #6b7280; }
      h1 { margin: 8px 0 4px; font-size: 24px; }
      .meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-top: 20px; }
      .box { border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; }
      .code { font-size: 20px; letter-spacing: 0.2em; font-weight: 700; word-break: break-all; margin-top: 8px; }
      .qr-wrap { margin-top: 24px; text-align: center; }
      .qr-wrap img { width: 240px; max-width: 100%; border-radius: 14px; border: 1px solid #e5e7eb; }
      .qr-text { margin-top: 12px; color: #6b7280; font-size: 13px; }
    </style>
  </head>
  <body>
    <div class="card">
      <p class="label">Xonnect Ticket Pass</p>
      <h1>${eventTitle}</h1>
      <p>${ticketType}</p>
      <div class="meta">
        <div class="box"><div class="label">Date</div><div>${date}</div></div>
        <div class="box"><div class="label">Location</div><div>${location}</div></div>
        <div class="box"><div class="label">Quantity</div><div>${quantity}</div></div>
        <div class="box"><div class="label">Total</div><div>${total}</div></div>
      </div>
      <div class="box" style="margin-top: 16px;">
        <div class="label">Ticket code</div>
        <div class="code">${ticketCode}</div>
      </div>
      ${qrImageDataUrl ? `
      <div class="qr-wrap">
        <img src="${qrImageDataUrl}" alt="Ticket QR code" />
        <div class="qr-text">Scan this QR code at the event entrance.</div>
      </div>
      ` : ""}
    </div>
  </body>
</html>`

    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${ticketCode}.html`
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
