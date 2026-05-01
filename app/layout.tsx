import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://calendar-working-co.vercel.app'),
  title: 'Mes del Trabajador 2026 — Working&Co',
  description: 'Trabajar mejor · Vivir mejor. Un mes dedicado a tu cuerpo, mente y comunidad.',
  keywords: ['Working&Co', 'Mes del Trabajador', 'wellness', 'masterclass', 'comunidad'],
  authors: [{ name: 'Working&Co' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Mes del Trabajador 2026 — Working&Co',
    description: 'Trabajar mejor · Vivir mejor. Un mes dedicado a tu cuerpo, mente y comunidad.',
    url: '/',
    siteName: 'Working&Co',
    locale: 'es_AR',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Mes del Trabajador 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mes del Trabajador 2026 — Working&Co',
    description: 'Trabajar mejor · Vivir mejor.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#1f9ba0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={dmSerif.variable}>
      <body className="font-sans bg-arena text-black">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
