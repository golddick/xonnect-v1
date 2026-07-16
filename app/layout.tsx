import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "sonner";
import XonnectSplash from "@/components/splash_screen/xonnect-splash";


export const metadata: Metadata = {
  title: "XONNECT ",
  description:
    " A pay on demand Premium Streaming platfrom for Organizations & Fans.",
  generator: "Next.js",
  keywords: [
    "Xonnect",
    "streaming",
    "creators",
    "fans",
    "organization",
    "org streaming",
    "live streaming",
    "Premium Streaming",
    "events",
    "collaboration",
    "fullstack developer",
  ],
  authors: [{ name: "Gold Dick" }],
  creator: "Gold Dick",
  publisher: "Xonnect",
  openGraph: {
    title: "Xonnect",
    description: "A pay on demand Premium Streaming platfrom",
    url: "https://xonnect.net",
    siteName: "Xonnect",
    images: [
      {
        url: "https://xonnect.net/xonnect-logo.png",
        width: 1200,
        height: 630,
        alt: "Xonnect Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A pay on demand Streaming platfrom for Organizations & Fans",
    description: "Xonnect · Watch. Belong",
    images: ["https://xonnect.net/xonnect-logo.png"],
    creator: "@xonnecthq",
  },
  icons: {
    icon: "/xonnect-logo.png",
  },
  metadataBase: new URL("https://xonnect.net"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Fonts */}
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>

        {/* Structured Data */}
        <Script
          id="xonnect-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Xonnect",
              url: "https://xonnect.net",
              logo: "https://xonnect.net/xonnect-logo.png",
              founder: {
                "@type": "Person",
                name: "Gold Dick",
                jobTitle: "Founder & Fullstack Developer",
              },
              sameAs: ["https://github.com/golddick"],
            }),
          }}
        />
        <link rel="canonical" href="https://www.xonnect.net" />
        <meta name="robots" content="index, follow" />
      </head>

      <body className="" suppressHydrationWarning>
        <main>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProvider>

              {children}
            </SessionProvider>
          </ThemeProvider>
        </main>
        <SpeedInsights />
        <Toaster theme="light" position="bottom-center" />
      </body>
    </html>
  );
}







// import type React from "react"
// import type { Metadata } from "next"
// import { GeistSans } from "geist/font/sans"
// import { GeistMono } from "geist/font/mono"
// import "./globals.css"
// import XonnectSplash from "@/components/xonnect-splash"

// export const metadata: Metadata = {
//   title: "v0 App",
//   description: "Created with v0",
//   generator: "v0.app",
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         <style>{`
// html {
//   font-family: ${GeistSans.style.fontFamily};
//   --font-sans: ${GeistSans.variable};
//   --font-mono: ${GeistMono.variable};
// }
//         `}</style>
//       </head>
//       <body>
//         <XonnectSplash />
//         {children}
//       </body>
//     </html>
//   )
// }
