import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import settings from '@/data/settings.json'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: settings.siteName,
    template: `%s \u2014 ${settings.siteName}`,
  },
  description: settings.tagline,
  metadataBase: new URL(settings.domain),
  openGraph: {
    images: [{ url: '/images/brand/og-image.png', width: 1200, height: 1200, alt: 'Latebloomers' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}