import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navigation } from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Mes del Trabajador 2026 — Working&Co',
  description:
    'Trabajar mejor · Vivir mejor. Un mes dedicado a tu cuerpo, mente y comunidad.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans bg-arena text-black">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
