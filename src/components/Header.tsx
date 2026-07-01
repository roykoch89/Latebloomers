'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import settings from '@/data/settings.json'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-widest uppercase text-stone-900 hover:text-stone-400 transition-colors"
        >
          {settings.siteName}
        </Link>

        <nav className="flex items-center gap-6 md:gap-10">
          {settings.navigation.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs tracking-widest uppercase transition-colors ${
                pathname === item.href
                  ? 'text-stone-900'
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
