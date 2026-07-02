'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import settings from '@/data/settings.json'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-16 grid grid-cols-3 items-center">
        {/* Left: site name */}
        <Link
          href="/"
          className="text-xs font-semibold tracking-widest uppercase text-stone-900 hover:text-brand-blue transition-colors"
        >
          {settings.siteName}
        </Link>

        {/* Centre: logo */}
        <div className="flex justify-center">
          <Link href="/" aria-label="Latebloomers home">
            <Image
              src="/images/brand/logo-dark.png"
              alt="Latebloomers"
              width={80}
              height={45}
              className="object-contain h-8 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Right: navigation */}
        <nav className="flex items-center justify-end gap-5 md:gap-8">
          {settings.navigation.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs tracking-widest uppercase transition-colors ${
                pathname === item.href
                  ? 'text-brand-blue'
                  : 'text-stone-400 hover:text-stone-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

