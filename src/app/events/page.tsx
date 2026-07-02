import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionTitle from '@/components/SectionTitle'
import SoundCloudPlayer from '@/components/SoundCloudPlayer'
import events from '@/data/events.json'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events by Latebloomers.',
}

type EventType = (typeof events)[number] & { soundcloudEmbed?: string }

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function EventCard({ event }: { event: EventType }) {
  const isUpcoming = event.status === 'upcoming'
  const flyerContent = event.artwork ? (
    <Image
      src={event.artwork}
      alt={event.title}
      width={800}
      height={800}
      className="w-full h-auto object-contain"
      sizes="(max-width: 768px) 100vw, 55vw"
    />
  ) : (
    <div className="aspect-square bg-stone-100 flex items-center justify-center">
      <span className="text-xs tracking-widest uppercase text-stone-400">{event.title}</span>
    </div>
  )

  return (
    <article className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-10 md:gap-16 items-start py-16 border-b border-stone-200">

      {/* Flyer — clickable only for featured upcoming events */}
      <div>
        {isUpcoming && event.featured ? (
          <Link href="/tickets" className="group block">
            <div className="overflow-hidden transition-transform duration-300 group-hover:scale-[1.01] group-hover:shadow-xl">
              {flyerContent}
            </div>
          </Link>
        ) : (
          <div>{flyerContent}</div>
        )}

        {/* Date + location */}
        <div className="flex items-center gap-3 mt-4">
          {isUpcoming && (
            <span className="text-xs tracking-widest uppercase bg-brand-blue text-white px-2 py-1">
              Upcoming
            </span>
          )}
          <p className="text-xs tracking-widest uppercase text-stone-500">
            {formatDate(event.date)}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{event.locationLabel}
          </p>
        </div>
      </div>

      {/* Right: SoundCloud */}
      {event.soundcloudEmbed && (
        <div className="flex flex-col gap-6">
          <SoundCloudPlayer url={event.soundcloudEmbed} />
          {isUpcoming && event.featured && (
            <Link
              href="/tickets"
              className="text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-3.5 hover:bg-stone-900 transition-colors"
            >
              Tickets
            </Link>
          )}
        </div>
      )}
    </article>
  )
}

export default function EventsPage() {
  const typedEvents = events as EventType[]
  const upcoming = typedEvents.filter((e) => e.status === 'upcoming')
  const past = typedEvents.filter((e) => e.status === 'past')

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-28">
      <SectionTitle label="Calendar" title="Events" />

      {upcoming.length > 0 && (
        <section className="mb-4">
          <p className="text-xs tracking-widest uppercase text-stone-400 pb-4 border-b border-stone-200">
            Upcoming
          </p>
          {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
        </section>
      )}

      {past.length > 0 && (
        <section>
          <p className="text-xs tracking-widest uppercase text-stone-400 pb-4 border-b border-stone-200 mt-8">
            Archive
          </p>
          {past.map((e) => <EventCard key={e.id} event={e} />)}
        </section>
      )}

      {events.length === 0 && (
        <p className="text-stone-400 text-sm">No events scheduled.</p>
      )}
    </div>
  )
}
