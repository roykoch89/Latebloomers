// HOME PAGE — rebuilt
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

function formatReleaseDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    month: 'long', year: 'numeric',
  })
}

export default function HomePage() {
  const featuredEvent =
    (events as EventWithSC[]).find((e) => e.featured && e.status === 'upcoming') ?? null

  const displayReleases = [...releases]
    .sort((a, b) => b.catalogNumber.localeCompare(a.catalogNumber))
    .slice(0, 7)

  const [latestRelease, ...otherReleases] = displayReleases

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12">

      {/* ── Hero ── */}
      <section className="relative py-10 md:py-16 border-b border-brand-lightBlue/40 overflow-hidden">
        {/* Flower watermark — top-right corner, partially cropped */}
        <div
          className="absolute -top-6 -right-10 md:-right-20 pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src="/images/brand/avatar1.png"
            alt=""
            width={440}
            height={440}
            className="w-[52vw] max-w-[440px] opacity-[0.12]"
          />
        </div>

        <div className="relative z-10">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold mb-4">
            Latebloomers
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-navy leading-tight mb-4">
            Slow growing house music
          </h1>
          <p className="text-xl md:text-2xl text-stone-500 font-normal leading-snug max-w-md">
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
          <section className="py-10 md:py-16 border-b border-brand-lightBlue/40">
            {/* Section label with yellow dot */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" aria-hidden="true" />
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold">
                Next event
              </p>
            </div>

            {/* Date + location ABOVE grid so SC player aligns with flyer */}
            <p className="text-sm tracking-wide uppercase text-stone-600 font-medium mb-5">
              {formatDate(featuredEvent.date)}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{featuredEvent.locationLabel}
            </p>

            {/* Mobile-only Tickets button */}
            <Link
              href="/tickets"
              className="md:hidden block text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-3 hover:opacity-90 transition-opacity mb-5"
            >
              Tickets
            </Link>

            {/* Grid: [flyer] | [SC + buttons] — both start at same vertical level */}
            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 md:gap-10 items-start">

              {/* Left: flyer only */}
              <Link href="/tickets" className="block overflow-hidden">
                {featuredEvent.artwork ? (
                  <Image
                    src={featuredEvent.artwork}
                    alt={featuredEvent.title}
                    width={800}
                    height={800}
                    className="w-full h-auto block transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                    style={{ maxHeight: '90vh', objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                ) : (
                  <div className="aspect-square border border-brand-lightBlue bg-brand-bg flex items-center justify-center">
                    <span className="text-xs tracking-widest uppercase text-brand-lightBlue">Artwork</span>
                  </div>
                )}
              </Link>

              {/* Right: SC players + buttons (vertically aligned with flyer top) */}
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

      {/* ── Releases ── */}
      {displayReleases.length > 0 && (
        <section className="py-10 md:py-16">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" aria-hidden="true" />
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold">
                Releases
              </p>
            </div>
            <Link
              href="/releases"
              className="text-xs tracking-widest uppercase text-stone-400 hover:text-brand-blue transition-colors"
            >
              All releases &rarr;
            </Link>
          </div>

          {/* Latest release — label-style 2-column feature */}
          {latestRelease && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 mb-14 items-start">
              <Link href={`/releases/${latestRelease.slug}`} className="block group">
                <div className="relative aspect-square overflow-hidden bg-stone-950 cursor-pointer">
                  {latestRelease.artwork ? (
                    <Image
                      src={latestRelease.artwork}
                      alt={latestRelease.title}
                      fill
                      className="object-contain transition-opacity duration-300 group-hover:opacity-80"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs tracking-widest uppercase text-stone-600 select-none">
                        {latestRelease.catalogNumber}
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              <div className="flex flex-col gap-3 justify-center">
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold">
                  {latestRelease.catalogNumber}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-navy leading-tight">
                  {latestRelease.title}
                </h2>
                <p className="text-xs text-stone-400 tracking-wide">{latestRelease.artist}</p>
                {latestRelease.releaseDate && (
                  <p className="text-xs text-stone-400 tracking-wide">
                    {formatReleaseDate(latestRelease.releaseDate)}&nbsp;&middot;&nbsp;{latestRelease.format}
                  </p>
                )}
                <Link
                  href={`/releases/${latestRelease.slug}`}
                  className="text-xs tracking-widest uppercase border border-brand-blue text-brand-blue px-5 py-2.5 w-fit hover:bg-brand-blue hover:text-white transition-colors mt-2"
                >
                  View Release
                </Link>
              </div>
            </div>
          )}

          {/* Other releases — compact grid */}
          {otherReleases.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
              {otherReleases.map((release) => (
                <div key={release.id}>
                  <Link href={`/releases/${release.slug}`} className="block">
                    <div className="relative aspect-square overflow-hidden bg-stone-950 mb-3 cursor-pointer group">
                      {release.artwork ? (
                        <Image
                          src={release.artwork}
                          alt={release.title}
                          fill
                          className="object-contain transition-opacity duration-300 group-hover:opacity-80"
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
          )}
        </section>
      )}
    </div>
  )
}    
