'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import settings from '@/data/settings.json'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-4">

        {/* Logo — left, links to home */}
        <Link
          href="/"
          aria-label="Latebloomers home"
          className="flex-shrink-0"
        >
          <Image
            src="/images/brand/logo-dark.png"
            alt="Latebloomers"
            width={120}
            height={68}
            className="h-7 w-auto object-contain"
            priority
          />
        </Link>

        {/* Navigation — right */}
        <nav className="flex items-center gap-4 sm:gap-5 md:gap-8">
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
