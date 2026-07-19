import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ImageCarousel from '@/components/ImageCarousel'
import SoundCloudPlayer from '@/components/SoundCloudPlayer'
import releases from '@/data/releases.json'

type Release = (typeof releases)[number]
type ReleaseWithImages = Release & {
  images?: { src: string; alt: string; label?: string }[]
  buyLabel?: string
  buyUrl?: string | null
  soundcloudEmbed?: string
  soundcloudVisible?: boolean
  credits?: string | string[]
}

export async function generateStaticParams() {
  return releases.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const release = releases.find((r) => r.slug === slug) as ReleaseWithImages | undefined
  if (!release) return {}
  return {
    title: release.seo?.title ?? release.title,
    description: release.seo?.description ?? release.description ?? '',
  }
}

export default async function ReleaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const release = releases.find((r) => r.slug === slug) as ReleaseWithImages | undefined
  if (!release) notFound()

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
    <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-12 md:py-20">

      <p className="text-xs tracking-widest uppercase text-stone-400 mb-10">
        <a href="/releases" className="hover:text-brand-blue transition-colors">Releases</a>
        <span className="mx-2 text-stone-300">/</span>
        {release.catalogNumber}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start">

        {/* Left: sticky carousel — artwork links to buyUrl when set */}
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

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-navy leading-tight mb-2">
            {release.title}
          </h1>
          <p className="text-base text-stone-500 mb-1">{release.artist}</p>

          {release.releaseDate && (
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-8">
              {new Date(release.releaseDate).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </p>
          )}

          {release.description && (
            <div className="text-sm text-stone-600 leading-relaxed border-t border-brand-lightBlue/30 pt-6 mb-6 space-y-4">
              {(Array.isArray(release.description) ? release.description : [release.description]).map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>
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
    </div>
  )
}