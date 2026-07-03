import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SoundCloudPlayer from '@/components/SoundCloudPlayer'
import events from '@/data/events.json'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events by Latebloomers.',
}

type EventType = (typeof events)[number] & {
  soundcloudEmbed?: string
  soundcloudEmbeds?: string[]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function EventCard({ event }: { event: EventType }) {
  const isUpcoming = event.status === 'upcoming'

  const scUrls: string[] =
    (event.soundcloudEmbeds && event.soundcloudEmbeds.length > 0)
      ? event.soundcloudEmbeds
      : event.soundcloudEmbed
        ? [event.soundcloudEmbed]
        : []

  const flyerImage = event.artwork ? (
    <Image
      src={event.artwork}
      alt={event.title}
      width={800}
      height={800}
      className="w-auto max-w-full h-auto max-h-[80vh] block transition-opacity duration-300 hover:opacity-80"
      sizes="(max-width: 768px) 100vw, 65vw"
    />
  ) : (
    <div className="aspect-square bg-stone-100 flex items-center justify-center">
      <span className="text-xs tracking-widest uppercase text-stone-400">{event.title}</span>
    </div>
  )

  return (
    <article className="grid grid-cols-1 md:grid-cols-[65fr_35fr] gap-10 md:gap-16 items-start py-14 border-b border-stone-200">

      {/* Flyer column */}
      <div>
        {/* Date + location above flyer */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {isUpcoming && (
            <span className="text-xs tracking-widest uppercase bg-brand-blue text-white px-2 py-1">
              Upcoming
            </span>
          )}
          <p className="text-sm tracking-wide uppercase text-stone-600 font-medium">
            {formatDate(event.date)}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{event.locationLabel}
          </p>
        </div>

        {/* Flyer — inline-block so cursor/hover only covers image, not container */}
        {isUpcoming && event.featured ? (
          <Link href="/tickets" className="inline-block max-w-full">
            {flyerImage}
          </Link>
        ) : (
          <div className="inline-block max-w-full">{flyerImage}</div>
        )}
      </div>

      {/* SoundCloud column */}
      {scUrls.length > 0 && (
        <div className="flex flex-col gap-5">
          {scUrls.map((url, i) => (
            <SoundCloudPlayer key={i} url={url} />
          ))}
          {isUpcoming && event.featured && (
            <Link
              href="/tickets"
              className="text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-3.5 hover:opacity-90 transition-opacity"
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
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-navy leading-none mb-16 md:mb-20">
        Events
      </h1>

      {upcoming.length > 0 && (
        <section className="mb-4">
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