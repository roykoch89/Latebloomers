import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionTitle from '@/components/SectionTitle'
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
  soundcloudEmbed?: string
  credits?: string | string[]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function ReleasesPage() {
  const sorted = [...(releases as ReleaseExt[])].sort((a, b) => {
    if (!a.releaseDate) return 1
    if (!b.releaseDate) return -1
    return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  })

  const [latest, ...rest] = sorted

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-28">
      <SectionTitle label="Discography" title="Releases" />

      {/* ── Latest release: fully expanded ── */}
      {latest && <LatestRelease release={latest} />}

      {/* ── Older releases grid ── */}
      {rest.length > 0 && (
        <section className="mt-24 pt-16 border-t border-stone-200">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-10">
            Archive
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
            {rest.map((release) => (
              <div key={release.id} className="group">
                <Link href={`/releases/${release.slug}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-stone-950 mb-3 transition-opacity group-hover:opacity-80">
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

      {/* Left: sticky carousel */}
      <div className="md:sticky md:top-20 overflow-visible">
        {images.length > 0 ? (
          <ImageCarousel images={images} priority />
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
          <span className="text-stone-300">|</span>
          <span className="text-xs tracking-widest uppercase text-stone-400">
            {release.format} &middot; {release.type}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 leading-tight mb-2">
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
          <p className="text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-6 mb-6">
            {release.description}
          </p>
        )}

        {tracklist.length > 0 && (
          <div className="border-t border-stone-100 pt-6 mb-8">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">Tracklist</p>
            {tracklist.map((track, i) => (
              <div key={i} className="flex items-baseline gap-4 py-2.5 border-b border-stone-100 last:border-0">
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

        {release.soundcloudEmbed && (
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Listen</p>
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
              className="text-xs tracking-widest uppercase border border-stone-300 text-stone-700 px-5 py-2.5 hover:border-stone-900 hover:text-stone-900 transition-colors"
            >
              {key === 'discogs' ? 'Discogs \u2197' : key}
            </a>
          ))}
          <button
            disabled
            className="text-xs tracking-widest uppercase border border-stone-200 text-stone-400 px-5 py-2.5 cursor-not-allowed"
          >
            {release.buyLabel ?? 'Buy'}
          </button>
        </div>

        {creditsArr.length > 0 && (
          <div className="mt-10 pt-6 border-t border-stone-100 flex flex-col gap-1">
            {creditsArr.map((line) => (
              <span key={line} className="text-xs text-stone-400">{line}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}