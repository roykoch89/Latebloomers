import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SoundCloudPlayer from '@/components/SoundCloudPlayer'
import events from '@/data/events.json'
import releases from '@/data/releases.json'

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

      {/* ── Hero ── */}
      <section className="relative py-12 md:py-20 border-b border-brand-lightBlue/40 overflow-hidden">
        {/* Flower watermark */}
        <div
          className="absolute inset-y-0 right-0 md:-right-12 flex items-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src="/images/brand/avatar1.png"
            alt=""
            width={420}
            height={420}
            className="w-[50vw] max-w-[380px] opacity-[0.07]"
          />
        </div>

        <div className="relative z-10">
          <p className="text-xs tracking-widest uppercase text-brand-blue font-semibold mb-5">
            Latebloomers
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-dark leading-tight mb-4">
            Slow growing house music
          </h1>
          <p className="text-2xl md:text-3xl text-stone-500 font-normal leading-snug">
            from The Hague and Rotterdam.
          </p>
        </div>
      </section>

      {/* ── Featured Event ── */}
      {featuredEvent && (() => {
        const scUrls: string[] =
          (featuredEvent.soundcloudEmbeds && featuredEvent.soundcloudEmbeds.length > 0)
            ? featuredEvent.soundcloudEmbeds
            : featuredEvent.soundcloudEmbed
              ? [featuredEvent.soundcloudEmbed]
              : []

        return (
          <section className="py-12 md:py-20 border-b border-brand-lightBlue/40">
            <p className="text-xs tracking-widest uppercase text-brand-blue mb-6">
              Next event
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-10 items-start">

              {/* Left: date + flyer */}
              <div>
                <p className="text-sm tracking-wide uppercase text-brand-blue/80 font-medium mb-4">
                  {formatDate(featuredEvent.date)}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{featuredEvent.locationLabel}
                </p>

                {/* Mobile-only Tickets button */}
                <Link
                  href="/tickets"
                  className="md:hidden block text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-3 hover:opacity-90 transition-opacity mb-4"
                >
                  Tickets
                </Link>

                {/* Flyer — image-only hover */}
                <Link href="/tickets" className="block overflow-hidden">
                  {featuredEvent.artwork ? (
                    <Image
                      src={featuredEvent.artwork}
                      alt={featuredEvent.title}
                      width={800}
                      height={800}
                      className="transition-opacity duration-300 hover:opacity-85 cursor-pointer"
                      style={{ width: '100%', height: 'auto', maxHeight: '90vh', objectFit: 'contain' }}
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority
                    />
                  ) : (
                    <div className="aspect-square border border-brand-lightBlue bg-brand-bg flex items-center justify-center">
                      <span className="text-xs tracking-widest uppercase text-brand-lightBlue">Artwork</span>
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
                    className="hidden md:block text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-3.5 hover:opacity-90 transition-opacity"
                  >
                    Tickets
                  </Link>
                  <Link
                    href="/events"
                    className="text-xs tracking-widest uppercase text-center border border-brand-blue text-brand-blue px-6 py-3.5 hover:bg-brand-blue hover:text-white transition-colors"
                  >
                    View All Events
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )
      })()}

      {/* ── Releases grid ── */}
      {displayReleases.length > 0 && (
        <section className="py-12 md:py-20">
          <div className="flex items-baseline justify-between mb-8">
            <p className="text-xs tracking-widest uppercase text-brand-blue">Releases</p>
            <Link href="/releases" className="text-xs tracking-widest uppercase text-stone-400 hover:text-brand-blue transition-colors">
              All releases &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
            {displayReleases.map((release) => (
              <div key={release.id}>
                <Link href={`/releases/${release.slug}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-stone-950 mb-3 transition-opacity duration-300 hover:opacity-80 cursor-pointer">
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