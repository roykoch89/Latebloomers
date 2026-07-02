import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SoundCloudPlayer from '@/components/SoundCloudPlayer'
import events from '@/data/events.json'
import releases from '@/data/releases.json'
import settings from '@/data/settings.json'

export const metadata: Metadata = {
  description: 'Slow growing house music from The Hague and Rotterdam.',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function HomePage() {
  const featuredEvent =
    events.find((e) => e.featured && e.status === 'upcoming') ?? null

  const displayReleases = [...releases]
    .sort((a, b) => b.catalogNumber.localeCompare(a.catalogNumber))
    .slice(0, 6)

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12">

      {/* Hero */}
      <section className="py-28 md:py-44 border-b border-stone-200">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-8">
          {settings.siteName}
        </p>
        <h1 className="text-6xl md:text-[8rem] font-bold tracking-tight text-stone-900 leading-none mb-10">
          Slow Growing<br />House Music
        </h1>
        <p className="text-stone-500 text-sm md:text-base max-w-sm leading-relaxed">
          From The Hague and Rotterdam with love
        </p>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-20 md:py-28 border-b border-stone-200">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-10">
            Next event
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

            {/* Flyer col */}
            <div>
              <Link href="/tickets" className="group block">
                <div className="relative w-full overflow-hidden transition-transform duration-300 group-hover:scale-[1.01] group-hover:shadow-xl">
                  {featuredEvent.artwork ? (
                    <Image
                      src={featuredEvent.artwork}
                      alt={featuredEvent.title}
                      width={800}
                      height={800}
                      className="w-full h-auto object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="aspect-square border border-stone-200 bg-stone-50 flex items-center justify-center">
                      <span className="text-xs tracking-widest uppercase text-stone-300">Artwork</span>
                    </div>
                  )}
                </div>
              </Link>
              <p className="text-xs tracking-widest uppercase text-stone-500 mt-4">
                {formatDate(featuredEvent.date)}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{featuredEvent.locationLabel}
              </p>
            </div>

            {/* Right col: SC + buttons */}
            <div className="flex flex-col gap-6">
              {featuredEvent.soundcloudEmbed && (
                <SoundCloudPlayer url={featuredEvent.soundcloudEmbed} />
              )}
              <div className="flex flex-col gap-3 mt-2">
                <Link
                  href="/tickets"
                  className="text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-3.5 hover:bg-stone-900 transition-colors"
                >
                  Tickets
                </Link>
                <Link
                  href="/events"
                  className="text-xs tracking-widest uppercase text-center border border-stone-300 text-stone-600 px-6 py-3.5 hover:border-stone-900 hover:text-stone-900 transition-colors"
                >
                  View All Events
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Releases grid */}
      {displayReleases.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="flex items-baseline justify-between mb-12">
            <p className="text-xs tracking-widest uppercase text-stone-400">Releases</p>
            <Link
              href="/releases"
              className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors"
            >
              All releases &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
            {displayReleases.map((release) => (
              <div key={release.id} className="group">
                <Link href={`/releases/${release.slug}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-stone-950 mb-3 transition-opacity group-hover:opacity-80">
                    {release.artwork ? (
                      <Image
                        src={release.artwork}
                        alt={release.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs tracking-widest uppercase text-stone-600 select-none">
                          {release.catalogNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
                <Link
                  href={`/releases/${release.slug}`}
                  className="text-xs tracking-widest uppercase text-stone-500 hover:text-brand-blue transition-colors"
                >
                  {release.catalogNumber}
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
