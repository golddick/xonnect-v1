type EmailShellParams = {
  preview: string
  title: string
  intro?: string
  body: string
  buttonText?: string
  buttonHref?: string
  footerNote?: string
}

export function emailShell({
  preview,
  title,
  intro,
  body,
  buttonText,
  buttonHref,
  footerNote,
}: EmailShellParams) {
  const actionMarkup =
    buttonText && buttonHref
      ? `
        <tr>
          <td style="padding-top: 28px;">
            <a href="${buttonHref}" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;padding:14px 20px;border-radius:12px;font-weight:600;">${buttonText}</a>
          </td>
        </tr>
      `
      : ""

  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${title}</title>
    </head>
    <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preview}</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;">
              <tr>
                <td style="padding:28px 32px 18px;border-bottom:1px solid #e5e7eb;">
                  <div style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#6b7280;font-weight:700;">Xonnect</div>
                  <h1 style="margin:14px 0 0;font-size:28px;line-height:1.2;color:#111827;">${title}</h1>
                  ${intro ? `<p style="margin:12px 0 0;font-size:16px;line-height:1.6;color:#4b5563;">${intro}</p>` : ""}
                </td>
              </tr>
              <tr>
                <td style="padding:28px 32px 8px;font-size:16px;line-height:1.7;color:#1f2937;">
                  ${body}
                </td>
              </tr>
              ${actionMarkup}
              <tr>
                <td style="padding:28px 32px 32px;">
                  <p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280;">${footerNote ?? "If you did not request this email, you can ignore it safely."}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `
}
