'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import settings from '@/data/settings.json'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      {/*
        Mobile: flex row — logo left, nav right (justify-between)
        Desktop: 3-col grid — spacer | logo centred | nav right
      */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-16
                      flex items-center justify-between
                      md:grid md:grid-cols-3">

        {/* Desktop left spacer (hidden on mobile) */}
        <div className="hidden md:block" />

        {/* Logo — left on mobile, centred on desktop */}
        <Link
          href="/"
          aria-label="Latebloomers home"
          className="flex md:justify-center"
        >
          <Image
            src="/images/brand/logo-dark.png"
            alt="Latebloomers"
            width={80}
            height={45}
            className="h-5 w-auto object-contain"
            priority
          />
        </Link>

        {/* Navigation — right on both breakpoints */}
        <nav className="flex items-center justify-end gap-4 md:gap-7">
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