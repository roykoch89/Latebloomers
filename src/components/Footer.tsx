import settings from '@/data/settings.json'

// settings.json may include an optional email field
const s = settings as typeof settings & { email?: string }

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-200 mt-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <span className="text-xs tracking-widest uppercase text-stone-400">
          &copy; {year} {settings.siteName}
        </span>

        <nav className="flex flex-wrap items-center gap-6 md:gap-10">
          {settings.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors"
            >
              {social.label}
            </a>
          ))}
          {s.email && (
            <a
              href={`mailto:${s.email}`}
              className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors"
            >
              {s.email}
            </a>
          )}
        </nav>
      </div>
    </footer>
  )
}
