import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'
import settings from '@/data/settings.json'

export const metadata: Metadata = {
  title: 'About',
  description: `About ${settings.siteName}.`,
}

export default function AboutPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-28">
      <SectionTitle label="Latebloomers" title="About" />

      <div className="max-w-2xl space-y-8">
        <p className="text-stone-600 text-base md:text-lg leading-relaxed">
          Latebloomers is a collective and independent music label based in
          The Hague, Netherlands. We are dedicated to sharing thoughtful,
          forward-thinking electronic music — through events, releases, and
          mixes.
        </p>
        <p className="text-stone-600 text-base md:text-lg leading-relaxed">
          Our label releases original music from our own roster and collaborating
          artists. Our events are intimate, carefully curated, and take place in
          unique spaces across the city.
        </p>
      </div>

      {/* Contact / Socials */}
      <div className="mt-24 pt-16 border-t border-stone-200">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-10">
          Follow &amp; connect
        </p>
        <div className="flex flex-wrap gap-10">
          {settings.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-stone-900 hover:text-stone-400 transition-colors"
            >
              {social.label}
              <span className="text-stone-300 group-hover:text-stone-400 transition-colors">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
