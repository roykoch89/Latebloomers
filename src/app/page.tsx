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

type EventWithSC = (typeof events)[number] & {
  soundcloudEmbed?: string
  soundcloudEmbeds?: string[]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function HomePage() {
  const featuredEvent =
    (events as EventWithSC[]).find((e) => e.featured && e.status === 'upcoming') ?? null

  const displayReleases = [...releases]
    .sort((a, b) => b.catalogNumber.localeCompare(a.catalogNumber))
    .slice(0, 6)

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12">

      {/* Hero */}
      <section className="py-16 md:py-28 border-b border-stone-200">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-tight mb-6">
          Slow Growing House Music
        </h1>
        <p className="text-xl md:text-2xl text-stone-500 max-w-sm leading-relaxed">
          From The Hague and Rotterdam with love
        </p>
      </section>

      {/* Featured Event */}
      {featuredEvent && (() => {
        const scUrls: string[] =
          (featuredEvent.soundcloudEmbeds && featuredEvent.soundcloudEmbeds.length > 0)
            ? featuredEvent.soundcloudEmbeds
            : featuredEvent.soundcloudEmbed
              ? [featuredEvent.soundcloudEmbed]
              : []

        return (
          <section className="py-16 md:py-24 border-b border-stone-200">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-8">
              Next event
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-12 items-start">

              {/* Left: date + flyer */}
              <div>
                <p className="text-sm tracking-wide uppercase text-stone-600 font-medium mb-4">
                  {formatDate(featuredEvent.date)}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{featuredEvent.locationLabel}
                </p>

                {/* Mobile-only Tickets button */}
                <Link
                  href="/tickets"
                  className="md:hidden block text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-3 hover:bg-stone-900 transition-colors mb-4"
                >
                  Tickets
                </Link>

                {/* Flyer — hover on image only */}
                <Link href="/tickets" className="block overflow-hidden">
                  {featuredEvent.artwork ? (
                    <Image
                      src={featuredEvent.artwork}
                      alt={featuredEvent.title}
                      width={800}
                      height={800}
                      className="transition-opacity duration-300 hover:opacity-85"
                      style={{ width: '100%', height: 'auto', maxHeight: '90vh', objectFit: 'contain' }}
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority
                    />
                  ) : (
                    <div className="aspect-square border border-stone-200 bg-stone-50 flex items-center justify-center">
                      <span className="text-xs tracking-widest uppercase text-stone-300">Artwork</span>
                    </div>
                  )}
                </Link>
              </div>

              {/* Right: SC players + buttons */}
              <div className="flex flex-col gap-4">
                {scUrls.map((url, i) => (
                  <SoundCloudPlayer key={i} url={url} />
                ))}
                <div className="flex flex-col gap-3 mt-1">
                  <Link
                    href="/tickets"
                    className="hidden md:block text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-3.5 hover:bg-stone-900 transition-colors"
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
        )
      })()}

      {/* Releases grid */}
      {displayReleases.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-10">
            <p className="text-xs tracking-widest uppercase text-stone-400">Releases</p>
            <Link href="/releases" className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors">
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