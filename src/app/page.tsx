import Image from 'next/image'
import Link from 'next/link'
import events from '@/data/events.json'
import releases from '@/data/releases.json'
import settings from '@/data/settings.json'

type Event = (typeof events)[number]
type Release = (typeof releases)[number]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function Placeholder({
  label,
  className = '',
}: {
  label: string
  className?: string
}) {
  return (
    <div
      className={`border border-stone-200 bg-stone-50 flex items-center justify-center ${className}`}
    >
      <span className="text-xs tracking-widest uppercase text-stone-300 select-none">
        {label}
      </span>
    </div>
  )
}

export default function HomePage() {
  const featuredEvent =
    events.find((e) => e.featured && e.status === 'upcoming') ??
    events[0] ??
    null
  const displayReleases = releases.slice(0, 3)

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12">
      {/* Hero */}
      <section className="py-28 md:py-44 border-b border-stone-200">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-8">
          {settings.siteName}
        </p>
        <h1 className="text-6xl md:text-[8rem] font-bold tracking-tight text-stone-900 leading-none mb-10">
          Electronic
          <br />
          Music
        </h1>
        <p className="text-stone-500 text-sm md:text-base max-w-xs leading-relaxed">
          {settings.tagline}
        </p>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-24 md:py-32 border-b border-stone-200">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-12">
            Next event
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            {featuredEvent.artwork ? (
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={featuredEvent.artwork}
                  alt={featuredEvent.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : (
              <Placeholder label="Event artwork" className="aspect-square" />
            )}
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-5">
                {formatDate(featuredEvent.date)} &mdash;{' '}
                {featuredEvent.locationLabel}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 leading-tight mb-8">
                {featuredEvent.title}
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed mb-10">
                {featuredEvent.description}
              </p>

              <div className="border-t border-stone-100 mb-10">
                {featuredEvent.lineup.map((artist) => (
                  <div
                    key={artist.order}
                    className="flex items-center gap-5 py-3 border-b border-stone-100"
                  >
                    <span className="text-xs text-stone-300 w-5 flex-shrink-0 tabular-nums">
                      {String(artist.order).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-stone-700">{artist.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/events"
                  className="text-xs tracking-widest uppercase border border-stone-900 px-5 py-3 hover:bg-stone-900 hover:text-white transition-colors"
                >
                  View all events
                </Link>
                {featuredEvent.ticketUrl && (
                  <a
                    href={featuredEvent.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-widest uppercase bg-stone-900 text-white px-5 py-3 hover:bg-stone-700 transition-colors"
                  >
                    Tickets
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Releases */}
      {displayReleases.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="flex items-baseline justify-between mb-14">
            <p className="text-xs tracking-widest uppercase text-stone-400">
              Releases
            </p>
            <Link
              href="/releases"
              className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors"
            >
              All releases &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {displayReleases.map((release) => (
              <div key={release.id}>
                <Placeholder
                  label={release.catalogNumber}
                  className="aspect-square mb-5"
                />
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                  {release.catalogNumber}
                </p>
                <h3 className="text-sm font-semibold text-stone-900">
                  {release.title}
                </h3>
                <p className="text-sm text-stone-500">{release.artist}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
