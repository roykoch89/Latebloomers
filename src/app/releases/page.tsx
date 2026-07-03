import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ImageCarousel from '@/components/ImageCarousel'
import SoundCloudPlayer from '@/components/SoundCloudPlayer'
import releases from '@/data/releases.json'

export const metadata: Metadata = {
  title: 'Releases',
  description: 'Music released on Latebloomers.',
}

type Release = (typeof releases)[number]
type ReleaseExt = Release & {
  images?: { src: string; alt: string; label?: string }[]
  buyLabel?: string
  buyUrl?: string | null
  soundcloudEmbed?: string
  soundcloudVisible?: boolean
  credits?: string | string[]
}

export default function ReleasesPage() {
  const sorted = [...(releases as ReleaseExt[])].sort((a, b) => {
    if (!a.releaseDate) return 1
    if (!b.releaseDate) return -1
    return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  })

  const [latest, ...rest] = sorted

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12 md:py-20">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-dark leading-none mb-12 md:mb-16">
        Releases
      </h1>

      {latest && <LatestRelease release={latest} />}

      {rest.length > 0 && (
        <section className="mt-20 pt-14 border-t border-brand-lightBlue/40">
          <p className="text-xs tracking-widest uppercase text-brand-blue mb-8">Archive</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
            {rest.map((release) => (
              <div key={release.id}>
                <Link href={`/releases/${release.slug}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-stone-950 mb-3 transition-opacity duration-300 hover:opacity-80 cursor-pointer">
                    {release.artwork ? (
                      <Image
                        src={release.artwork}
                        alt={release.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 50vw, 25vw"
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

function LatestRelease({ release }: { release: ReleaseExt }) {
  const images = release.images && release.images.length > 0
    ? release.images
    : release.artwork
      ? [{ src: release.artwork, alt: release.title }]
      : []

  const activeLinks = (
    Object.entries(release.links) as [string, string | null][]
  ).filter((e): e is [string, string] => e[1] !== null)

  const tracklist = release.tracklist as { position?: string; title: string; duration?: string }[]

  const creditsArr: string[] = Array.isArray(release.credits)
    ? release.credits
    : release.credits
      ? [release.credits]
      : []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start">

      {/* Left: sticky carousel — linkUrl enables artwork click-to-buy */}
      <div className="md:sticky md:top-20 overflow-visible">
        {images.length > 0 ? (
          <ImageCarousel images={images} priority linkUrl={release.buyUrl ?? undefined} />
        ) : (
          <div className="aspect-square bg-stone-950 flex items-center justify-center">
            <span className="text-xs tracking-widest uppercase text-stone-600">
              {release.catalogNumber}
            </span>
          </div>
        )}
      </div>

      {/* Right: release info */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs tracking-widest uppercase text-brand-blue font-semibold">
            {release.catalogNumber}
          </span>
          <span className="text-brand-lightBlue">|</span>
          <span className="text-xs tracking-widest uppercase text-stone-400">
            {release.format} &middot; {release.type}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-dark leading-tight mb-2">
          {release.title}
        </h2>
        <p className="text-base text-stone-500 mb-1">{release.artist}</p>

        {release.releaseDate && (
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-8">
            {new Date(release.releaseDate).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </p>
        )}

        {release.description && (
          <p className="text-sm text-stone-600 leading-relaxed border-t border-brand-lightBlue/30 pt-6 mb-6">
            {release.description}
          </p>
        )}

        {tracklist.length > 0 && (
          <div className="border-t border-brand-lightBlue/30 pt-6 mb-8">
            <p className="text-xs tracking-widest uppercase text-brand-blue mb-4">Tracklist</p>
            {tracklist.map((track, i) => (
              <div key={i} className="flex items-baseline gap-4 py-2.5 border-b border-brand-lightBlue/20 last:border-0">
                <span className="text-xs text-stone-400 w-6 flex-shrink-0 tabular-nums font-mono">
                  {track.position ?? String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-sm text-stone-700">{track.title}</span>
                {track.duration && (
                  <span className="text-xs text-stone-400 tabular-nums font-mono flex-shrink-0">
                    {track.duration}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {release.soundcloudEmbed && release.soundcloudVisible !== false && (
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase text-brand-blue mb-3">Listen</p>
            <SoundCloudPlayer url={release.soundcloudEmbed} />
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          {activeLinks.map(([key, href]) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase border border-brand-lightBlue text-stone-700 px-5 py-2.5 hover:border-brand-blue hover:text-brand-blue transition-colors"
            >
              {key === 'discogs' ? 'Discogs \u2197' : key}
            </a>
          ))}
          {release.buyUrl ? (
            <a
              href={release.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase bg-brand-blue text-white px-5 py-2.5 hover:opacity-90 transition-opacity"
            >
              {release.buyLabel ?? 'Buy'}
            </a>
          ) : (
            <button
              disabled
              className="text-xs tracking-widest uppercase border border-stone-200 text-stone-400 px-5 py-2.5 cursor-not-allowed"
            >
              {release.buyLabel ?? 'Buy'}
            </button>
          )}
        </div>

        {creditsArr.length > 0 && (
          <p className="mt-8 pt-5 border-t border-brand-lightBlue/30 text-xs text-stone-400 leading-relaxed">
            {creditsArr.join('. ')}
          </p>
        )}
      </div>
    </div>
  )
}