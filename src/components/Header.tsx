'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import settings from '@/data/settings.json'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-brand-bg">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-[70px] flex items-center justify-between gap-4">

        {/* Logo — left, responsive sizing */}
        <Link href="/" aria-label="Latebloomers home" className="flex-shrink-0 transition-opacity duration-300 hover:opacity-70">
          <Image
            src="/images/brand/Latebloomers_logo.png"
            alt="Latebloomers"
            width={250}
            height={44}
            className="h-[26px] sm:h-[40px] md:h-[48px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-[6px] sm:gap-4 md:gap-8">
          {settings.navigation.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[11px] sm:text-[13px] tracking-widest uppercase transition-colors ${
                pathname === item.href
                  ? 'text-brand-blue underline decoration-brand-yellow decoration-2 underline-offset-4'
                  : 'text-stone-400 hover:text-brand-yellow'
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