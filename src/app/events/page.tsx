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

// Upcoming event — 15% right shift, hover effect, SC centred with flyer
function UpcomingEventCard({ event }: { event: EventType }) {
  const scUrls: string[] =
    (event.soundcloudEmbeds && event.soundcloudEmbeds.length > 0)
      ? event.soundcloudEmbeds
      : event.soundcloudEmbed
        ? [event.soundcloudEmbed]
        : []

  return (
    <article className="py-14 border-b border-stone-200">
      <div className="md:pl-[15%]">
        {/* Date + badge — above flyer (aligned with flyer left edge) */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="text-xs tracking-widest uppercase bg-brand-blue text-white px-2 py-1">
            Upcoming
          </span>
          <p className="text-sm tracking-wide uppercase text-stone-600 font-medium">
            {formatDate(event.date)}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{event.locationLabel}
          </p>
        </div>

        {/*
          Grid: [flyer] | [SC + buttons]
          items-center vertically centres SC with the flyer image
        */}
        <div className="grid grid-cols-1 md:grid-cols-[65fr_35fr] gap-10 md:gap-16 items-center">

          {/* Flyer — group hover: scale applies ONLY to the image */}
          {event.artwork ? (
            <Link href="/tickets" className="inline-block max-w-full overflow-hidden group">
              <Image
                src={event.artwork}
                alt={event.title}
                width={800}
                height={800}
                className="w-auto max-w-full h-auto max-h-[80vh] block transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 65vw"
              />
            </Link>
          ) : (
            <div className="aspect-square bg-stone-100 flex items-center justify-center inline-block max-w-full">
              <span className="text-xs tracking-widest uppercase text-stone-400">{event.title}</span>
            </div>
          )}

          {/* SC + Tickets (centred with flyer via items-center on parent) */}
          {scUrls.length > 0 && (
            <div className="flex flex-col gap-5">
              {scUrls.map((url, i) => (
                <SoundCloudPlayer key={i} url={url} />
              ))}
              <Link
                href="/tickets"
                className="text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-3.5 hover:opacity-90 transition-opacity"
              >
                Tickets
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

// Archive event — NO hover on flyer, SC centred with flyer
function ArchiveEventCard({ event }: { event: EventType }) {
  const scUrls: string[] =
    (event.soundcloudEmbeds && event.soundcloudEmbeds.length > 0)
      ? event.soundcloudEmbeds
      : event.soundcloudEmbed
        ? [event.soundcloudEmbed]
        : []

  return (
    <article className="py-14 border-b border-stone-200">
      {/*
        items-center vertically centres SC column with flyer column
        Date lives above the grid inside the left column
      */}
      <div className="grid grid-cols-1 md:grid-cols-[65fr_35fr] gap-10 md:gap-16 items-center">

        {/* Left: date above flyer, no hover */}
        <div>
          <p className="text-sm tracking-wide uppercase text-stone-600 font-medium mb-5">
            {formatDate(event.date)}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{event.locationLabel}
          </p>
          <div className="inline-block max-w-full">
            {event.artwork ? (
              <Image
                src={event.artwork}
                alt={event.title}
                width={800}
                height={800}
                className="w-auto max-w-full h-auto max-h-[80vh] block"
                sizes="(max-width: 768px) 100vw, 65vw"
              />
            ) : (
              <div className="aspect-square bg-stone-100 flex items-center justify-center">
                <span className="text-xs tracking-widest uppercase text-stone-400">{event.title}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: SC players (centred via items-center) */}
        {scUrls.length > 0 && (
          <div className="flex flex-col gap-5">
            {scUrls.map((url, i) => (
              <SoundCloudPlayer key={i} url={url} />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function EventsPage() {
  const typedEvents = events as EventType[]
  const upcoming = typedEvents.filter((e) => e.status === 'upcoming')
  const past = typedEvents.filter((e) => e.status === 'past')

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12 md:py-16">
      {/* Reduced mb so "Events" and "Upcoming" are closer together (~30% less) */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-navy leading-none mb-8 md:mb-12">
        Events
      </h1>

      {upcoming.length > 0 && (
        <section className="mb-4">
          {upcoming.map((e) => <UpcomingEventCard key={e.id} event={e} />)}
        </section>
      )}

      {past.length > 0 && (
        <section>
          <p className="text-xs tracking-widest uppercase text-stone-400 pb-4 border-b border-stone-200 mt-8">
            Archive
          </p>
          {past.map((e) => <ArchiveEventCard key={e.id} event={e} />)}
        </section>
      )}

      {events.length === 0 && (
        <p className="text-stone-400 text-sm">No events scheduled.</p>
      )}
    </div>
  )
}