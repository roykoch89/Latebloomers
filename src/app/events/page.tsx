import type { Metadata } from 'next'
import Image from 'next/image'
import SectionTitle from '@/components/SectionTitle'
import events from '@/data/events.json'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events by Latebloomers.',
}

type Event = (typeof events)[number]
type Artist = Event['lineup'][number]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function EventRow({ event }: { event: Event }) {
  return (
    <article className="border-b border-stone-200 py-10 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-12 items-start">
      {/* Artwork */}
      <div className="w-20 h-20 flex-shrink-0 relative overflow-hidden border border-stone-200 bg-stone-50">
        {event.artwork ? (
          <Image
            src={event.artwork}
            alt={event.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-xs text-stone-300 select-none">
            Art
          </span>
        )}
      </div>

      {/* Info */}
      <div>
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">
          {formatDate(event.date)}&nbsp;&nbsp;·&nbsp;&nbsp;
          {event.startTime}–{event.endTime}&nbsp;&nbsp;·&nbsp;&nbsp;
          {event.venue}, {event.locationLabel}
        </p>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900 mb-4">
          {event.title}
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed mb-5">
          {event.description}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {event.lineup.map((artist: Artist) => (
            <span key={artist.order} className="text-sm text-stone-600">
              {artist.name}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 md:flex-col md:items-end">
        {event.ticketUrl && (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase border border-stone-900 px-4 py-2.5 hover:bg-stone-900 hover:text-white transition-colors"
          >
            Tickets
          </a>
        )}
        {event.instagramUrl && (
          <a
            href={event.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors"
          >
            Instagram
          </a>
        )}
      </div>
    </article>
  )
}

export default function EventsPage() {
  const upcoming = events.filter((e) => e.status === 'upcoming')
  const past = events.filter((e) => e.status === 'past')

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-28">
      <SectionTitle label="Calendar" title="Events" />

      {upcoming.length > 0 && (
        <section className="mb-24">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-0 pb-4 border-b border-stone-200">
            Upcoming
          </p>
          {upcoming.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </section>
      )}

      {past.length > 0 && (
        <section>
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-0 pb-4 border-b border-stone-200">
            Archive
          </p>
          {past.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </section>
      )}

      {events.length === 0 && (
        <p className="text-stone-400 text-sm">No events scheduled.</p>
      )}
    </div>
  )
}
