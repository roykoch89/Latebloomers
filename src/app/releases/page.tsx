import type { Metadata } from 'next'
import SectionTitle from '@/components/SectionTitle'
import releases from '@/data/releases.json'

export const metadata: Metadata = {
  title: 'Releases',
  description: 'Music released on Latebloomers.',
}

type Release = (typeof releases)[number]
type LinkKey = keyof Release['links']

const LINK_LABELS: Record<LinkKey, string> = {
  discogs: 'Discogs',
  soundcloud: 'SoundCloud',
  bandcamp: 'Bandcamp',
  spotify: 'Spotify',
  appleMusic: 'Apple Music',
  beatport: 'Beatport',
}

type TrackItem = { position?: string; title: string; duration?: string }

function ReleaseCard({ release }: { release: Release }) {
  const activeLinks = (
    Object.entries(release.links) as [LinkKey, string | null][]
  ).filter((entry): entry is [LinkKey, string] => entry[1] !== null)

  const tracklist = release.tracklist as TrackItem[]

  return (
    <article>
      {/* Artwork */}
      <div className="aspect-square border border-stone-200 bg-stone-50 flex items-center justify-center mb-6">
        <span className="text-xs tracking-widest uppercase text-stone-300 select-none">
          {release.catalogNumber}
        </span>
      </div>

      {/* Meta */}
      <div className="space-y-1 mb-5">
        <p className="text-xs tracking-widest uppercase text-stone-400">
          {release.catalogNumber}&nbsp;&middot;&nbsp;{release.type}
          {release.format ? `\u00a0\u00b7\u00a0${release.format}` : ''}
        </p>
        <h2 className="text-base font-semibold text-stone-900">{release.title}</h2>
        <p className="text-sm text-stone-500">{release.artist}</p>
        {release.releaseDate && (
          <p className="text-xs text-stone-400">
            {new Date(release.releaseDate).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
            })}
          </p>
        )}
      </div>

      {/* Description */}
      {release.description && (
        <p className="text-sm text-stone-500 leading-relaxed mb-5">
          {release.description}
        </p>
      )}

      {/* Tracklist */}
      {tracklist.length > 0 && (
        <div className="border-t border-stone-100 pt-4 mb-5 space-y-2">
          {tracklist.map((track, i) => (
            <div key={i} className="flex gap-4 text-xs text-stone-500">
              <span className="text-stone-300 w-6 flex-shrink-0 tabular-nums">
                {track.position ?? String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1">{track.title}</span>
              {track.duration && (
                <span className="text-stone-300 tabular-nums">
                  {track.duration}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Links */}
      {activeLinks.length > 0 && (
        <div className="flex flex-wrap gap-4 border-t border-stone-100 pt-4">
          {activeLinks.map(([key, href]) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors"
            >
              {LINK_LABELS[key]}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

export default function ReleasesPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-28">
      <SectionTitle label="Discography" title="Releases" />

      {releases.length === 0 ? (
        <p className="text-stone-400 text-sm">No releases yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      )}
    </div>
  )
}
