import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { CookieBanner } from "@/components/cookie-banner"
import { MobileActionButtons } from "@/components/mobile-action-buttons"
import { ScrollToTop } from "@/components/scroll-to-top"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://autopeloc.ro"),
  title: {
    default: "Mașină la schimb RCA | Fără costuri pentru păgubit",
    template: "%s | Mașină la schimb RCA",
  },
  description:
    "Servicii complete de mașini de înlocuire pentru daune auto în România. Flotă diversificată, disponibilitate imediată, asistență 24/7. Mobilitate #peloc - soluția ta rapidă după accident.",
  keywords: [
    "mașini de înlocuire",
    "daune auto",
    "asigurări RCA",
    "mașini substitute",
    "accident auto",
    "flotă auto",
    "închirieri auto",
    "mobilitate",
    "peloc",
    "România",
  ],
  authors: [{ name: "autopeloc.ro" }],
  creator: "autopeloc.ro",
  publisher: "autopeloc.ro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://autopeloc.ro",
    title: "Mașină la schimb RCA | Fără costuri pentru păgubit",
    description:
      "Servicii complete de mașini de înlocuire pentru daune auto în România. Flotă diversificată, disponibilitate imediată, asistență 24/7.",
    siteName: "Mașină la schimb RCA | Fără costuri pentru păgubit",
    images: [
      {
        url: "/images/dashboard.jpg",
        width: 1200,
        height: 630,
        alt: "Mașină la schimb RCA | Fără costuri pentru păgubit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mașină la schimb RCA | Fără costuri pentru păgubit",
    description:
      "Servicii complete de mașini de înlocuire pentru daune auto în România. Flotă diversificată, disponibilitate imediată.",
    images: ["/images/dashboard.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        <link rel="preload" as="image" href="/accident-hero.svg" type="image/svg+xml" />
        <link rel="preload" as="image" href="/accident-hero-dark.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)" />

        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9F3Q6RZGPY" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9F3Q6RZGPY');
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoRental",
              name: "autopeloc.ro",
              description: "Servicii complete de mașini de înlocuire pentru daune auto în România",
              url: "https://autopeloc.ro",
              logo: "https://autopeloc.ro/favicon.ico",
              telephone: "+40-770-600-600",
              address: {
                "@type": "PostalAddress",
                addressCountry: "RO",
                addressLocality: "România",
              },
              priceRange: "$$",
              areaServed: [
                { "@type": "City", name: "București" },
                { "@type": "City", name: "Craiova" },
                { "@type": "City", name: "Sibiu" },
                { "@type": "City", name: "Brașov" },
                { "@type": "City", name: "Timișoara" },
                { "@type": "City", name: "Oradea" },
                { "@type": "City", name: "Cluj-Napoca" },
                { "@type": "City", name: "Iași" },
                { "@type": "City", name: "Suceava" },
                { "@type": "City", name: "Bacău" },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Mașini de Înlocuire",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Car",
                      name: "Mini & City",
                      description: "Mașini compacte pentru oraș",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Car",
                      name: "Compact & Economy",
                      description: "Mașini economice și practice",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Car",
                      name: "SUV",
                      description: "SUV-uri spațioase și confortabile",
                    },
                  },
                ],
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "150",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans bg-background transition-colors duration-300 antialiased">
        <Suspense fallback={null}>
          <ThemeProvider defaultTheme="light" storageKey="rca-theme">
            <ScrollToTop />
            {children}
            <CookieBanner />
            <MobileActionButtons />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
