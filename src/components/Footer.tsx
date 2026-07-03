import settings from '@/data/settings.json'

type Settings = typeof settings & {
  email?: string
}
const s = settings as Settings

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-24 bg-white">
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
              className="flex flex-col gap-0.5 group"
            >
              <span className="text-xs tracking-widest uppercase text-brand-blue group-hover:text-brand-yellow transition-colors">
                Mail
              </span>
              <span className="text-xs text-brand-dark group-hover:text-brand-yellow/70 transition-colors">
                {s.email}
              </span>
            </a>
          )}
        </nav>
      </div>
    </footer>
  )
}
