import settings from '@/data/settings.json'

type Settings = typeof settings & {
  email?: string
}
const s = settings as Settings

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-12 md:mt-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-10
                      flex flex-col md:flex-row items-start justify-end gap-8">

        {/* Socials + mail */}
        <nav className="flex flex-wrap items-center gap-6 md:gap-10">
          {settings.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase text-brand-blue hover:text-brand-yellow transition-colors"
            >
              {social.label}
            </a>
          ))}
          {s.email && (
            <a
              href={`mailto:${s.email}`}
              className="text-xs tracking-widest uppercase text-brand-blue hover:text-brand-yellow transition-colors"
            >
              Mail
            </a>
          )}
        </nav>
      </div>
    </footer>
  )
}
