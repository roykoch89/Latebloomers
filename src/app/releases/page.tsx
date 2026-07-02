import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionTitle from '@/components/SectionTitle'
import releases from '@/data/releases.json'

export const metadata: Metadata = {
  title: 'Releases',
  description: 'Music released on Latebloomers.',
}

export default function ReleasesPage() {
  const sorted = [...releases].sort((a, b) =>
    b.catalogNumber.localeCompare(a.catalogNumber)
  )

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-28">
      <SectionTitle label="Discography" title="Releases" />

      {sorted.length === 0 ? (
        <p className="text-stone-400 text-sm">No releases yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
          {sorted.map((release) => (
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
      )}
    </div>
  )
}
