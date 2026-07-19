// HOME PAGE
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
    <>
      {/* ── Hero ── full-width section, background flower right-cropped */}
      <section
        className="py-5 md:py-8 flex items-center min-h-[30vh] md:min-h-[38vh]"
        style={{
          backgroundColor: '#E8ECF2',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 w-full">
          <div className="md:pl-[12%]">
            <h1 className="text-[3.3rem] md:text-[4.125rem] lg:text-[4.95rem] font-bold tracking-tight text-brand-navy leading-[0.9] mb-3 max-w-[820px]">
              Slow Growing<br /> House Music
            </h1>
            <p className="text-lg md:text-xl text-brand-blue font-normal leading-snug max-w-[600px]">
              rooted in the Hague and Rotterdam.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main content ── constrained container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">

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
              <div className="md:pl-[12%] md:pr-[12%]">

                {/* Editorial event header — date + location removed, visible on flyer */}
                <div className="mb-4 md:mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" aria-hidden="true" />
                    <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold">
                      Next event
                    </p>
                  </div>
                </div>

                {/* Grid 50/50: Flyer | Featured Artists */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-6 items-start">

                  {/* Left: Flyer */}
                  {featuredEvent.artwork ? (
                    <Link href="/tickets" className="inline-block max-w-full overflow-hidden group">
                      <Image
                        src={featuredEvent.artwork}
                        alt={featuredEvent.title}
                        width={800}
                        height={800}
                        className="w-auto max-w-full h-auto max-h-[80vh] block transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </Link>
                  ) : (
                    <div className="aspect-square border border-brand-lightBlue bg-brand-bg flex items-center justify-center">
                      <span className="text-xs tracking-widest uppercase text-brand-lightBlue">Artwork</span>
                    </div>
                  )}

                  {/* Right: Featured Artists + SC players */}
                  <div className="flex flex-col gap-5">
                    {/* "FEATURED ARTISTS" label — order-2 on mobile (below Tickets), first on desktop */}
                    <p className="order-2 md:order-none mt-4 md:mt-0 text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold">
                      Featured Artists
                    </p>

                    {/* Mobile: Tickets first (order-1 on mobile), SC second */}
                    <Link
                      href="/tickets"
                      className="md:hidden order-1 block text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-4 hover:opacity-90 transition-opacity"
                    >
                      Tickets
                    </Link>

                    <div className="order-3 md:order-none flex flex-col gap-4">
                      {scUrls.map((url, i) => (
                        <SoundCloudPlayer key={i} url={url} />
                      ))}
                    </div>

                    {/* Desktop buttons */}
                    <div className="hidden md:flex flex-col gap-3 mt-1">
                      <Link
                        href="/tickets"
                        className="block text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-4 hover:opacity-90 transition-opacity"
                      >
                        Tickets
                      </Link>
                      <Link
                        href="/events"
                        className="block text-xs tracking-widest uppercase text-center border border-brand-blue text-brand-blue px-6 py-4 hover:bg-brand-blue hover:text-white transition-colors"
                      >
                        View All Events
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })()}

        {/* ── Latest Release ── */}
        {displayReleases.length > 0 && (
          <section className="py-10 md:py-16">
            <div className="md:pl-[12%] md:pr-[12%]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" aria-hidden="true" />
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold">
                    Latest Release
                  </p>
                </div>
                <Link
                  href="/releases"
                  className="text-xs tracking-widest uppercase text-stone-400 hover:text-brand-blue transition-colors"
                >
                  All releases &rarr;
                </Link>
              </div>

              {latestRelease && (
                <div className="flex gap-6 md:gap-8 items-start mb-12 md:mb-14">
                  <Link href={`/releases/${latestRelease.slug}`} className="flex-shrink-0 group">
                    <div className="relative w-36 h-36 md:w-40 md:h-40 overflow-hidden bg-stone-950 cursor-pointer">
                      {latestRelease.artwork ? (
                        <Image
                          src={latestRelease.artwork}
                          alt={latestRelease.title}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="200px"
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

                  <div className="flex flex-col gap-2 min-w-0">
                    <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold">
                      {latestRelease.catalogNumber}
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold text-brand-navy leading-tight">
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
                      className="text-xs tracking-widest uppercase border border-brand-blue text-brand-blue px-4 py-2 w-fit hover:bg-brand-blue hover:text-white transition-colors mt-1"
                    >
                      View Release
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {otherReleases.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6 mt-6">
                {otherReleases.map((release) => (
                  <div key={release.id}>
                    <Link href={`/releases/${release.slug}`} className="block">
                      <div className="relative aspect-square overflow-hidden bg-stone-950 mb-3 cursor-pointer group">
                        {release.artwork ? (
                          <Image
                            src={release.artwork}
                            alt={release.title}
                            fill
                            className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
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
    </>
  )
}