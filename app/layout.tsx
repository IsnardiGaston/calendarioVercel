import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { fetchConfig } from '@/lib/strapi'
import './globals.css'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-serif',
})

const SITE_URL = 'https://workingandco.isndesign.com'

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchConfig().catch(() => null)

  const titulo = config?.titulo ?? 'Mes del'
  const tituloDestacado = config?.tituloDestacado ?? 'Trabajador'
  const year = config?.year ?? new Date().getFullYear()
  const sub1 = config?.subtituloLinea1 ?? 'Trabajar mejor · Vivir mejor'
  const sub2 = config?.subtituloLinea2 ?? 'Un mes dedicado a tu cuerpo, mente y comunidad.'

  const pageTitle = `${titulo} ${tituloDestacado} ${year} — Working&Co`
  const description = `${sub1}. ${sub2}`
  const ogAlt = `${titulo} ${tituloDestacado} ${year}`

  return {
    metadataBase: new URL(SITE_URL),
    title: pageTitle,
    description,
    keywords: ['Working&Co', `${titulo} ${tituloDestacado}`, 'wellness', 'masterclass', 'comunidad', 'calendario'],
    authors: [{ name: 'Working&Co' }],
    alternates: { canonical: '/' },
    openGraph: {
      title: pageTitle,
      description,
      url: '/',
      siteName: 'Working&Co',
      locale: 'es_AR',
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: sub1,
      images: ['/og-image.jpg'],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
    manifest: '/manifest.json',
  }
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
