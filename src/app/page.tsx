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
    <>
      {/* Hero — outside the max-w container so background reaches full section width */}
      <section
        className="py-10 md:py-16 border-b border-brand-lightBlue/40"
        style={{
          backgroundImage: 'url(/images/brand/Background1.png)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-navy leading-tight mb-4">
            Slow Growing House Music
          </h1>
          <p className="text-lg md:text-xl text-brand-blue font-normal leading-snug max-w-xl">
            rooted in the Hague and Rotterdam.
          </p>
        </div>
      </section>

      {/* All remaining content inside the standard max-w container */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

      {/* Featured Event */}
      {featuredEvent && (() => {
        const scUrls: string[] =
          (featuredEvent.soundcloudEmbeds && featuredEvent.soundcloudEmbeds.length > 0)
            ? featuredEvent.soundcloudEmbeds
            : featuredEvent.soundcloudEmbed
              ? [featuredEvent.soundcloudEmbed]
              : []

        return (
          <section className="py-10 md:py-16 border-b border-brand-lightBlue/40">
            {/* Balanced 12% margins on both sides */}
            <div className="md:pl-[12%] md:pr-[12%]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" aria-hidden="true" />
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold">
                  Next event
                </p>
              </div>
              <p className="text-sm tracking-wide uppercase text-stone-600 font-medium mb-5">
                {formatDate(featuredEvent.date)}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{featuredEvent.locationLabel}
              </p>

              {/*
                Grid items-start: SC top aligns with flyer top (not date text above)
                Left col = flyer   Right col = SC + buttons with 12% right padding
              */}
              <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-6 items-start">

                {/* Flyer */}
                {featuredEvent.artwork ? (
                  <Link href="/tickets" className="inline-block max-w-full overflow-hidden group">
                    <Image
                      src={featuredEvent.artwork}
                      alt={featuredEvent.title}
                      width={800}
                      height={800}
                      className="w-auto max-w-full h-auto max-h-[80vh] block transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority
                    />
                  </Link>
                ) : (
                  <div className="aspect-square border border-brand-lightBlue bg-brand-bg flex items-center justify-center">
                    <span className="text-xs tracking-widest uppercase text-brand-lightBlue">Artwork</span>
                  </div>
                )}

                {/* SC + buttons — outer wrapper provides balanced right margin */}
                <div className="flex flex-col gap-5">
                  {/* Mobile only: Tickets appears AFTER flyer, BEFORE SC */}
                  <Link
                    href="/tickets"
                    className="md:hidden block text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-4 hover:opacity-90 transition-opacity"
                  >
                    Tickets
                  </Link>

                  {scUrls.map((url, i) => (
                    <SoundCloudPlayer key={i} url={url} />
                  ))}

                  <div className="flex flex-col gap-5">
                    <Link
                      href="/tickets"
                      className="hidden md:block text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-4 hover:opacity-90 transition-opacity"
                    >
                      Tickets
                    </Link>
                    <Link
                      href="/events"
                      className="text-xs tracking-widest uppercase text-center border border-brand-blue text-brand-blue px-6 py-4 hover:bg-brand-blue hover:text-white transition-colors"
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

      {/* Latest Release — left edge aligned with Next Event block (same 12% indent) */}
      {displayReleases.length > 0 && (
        <section className="py-10 md:py-16">
          <div className="md:pl-[12%]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" aria-hidden="true" />
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold">
                  Latest Release
                </p>
              </div>
              <Link
                href="/releases"
              className="text-xs tracking-widest uppercase text-stone-400 hover:text-brand-blue transition-colors mr-[2%]"
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