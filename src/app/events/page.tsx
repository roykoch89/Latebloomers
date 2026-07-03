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

/*
 * Upcoming event card
 * Desktop: 12% left indent, flyer left | SC right (items-start = SC top aligns with flyer top)
 * Mobile order: Event info → Flyer → Tickets → SC  (CSS order)
 */
function UpcomingEventCard({ event }: { event: EventType }) {
  const scUrls: string[] =
    (event.soundcloudEmbeds && event.soundcloudEmbeds.length > 0)
      ? event.soundcloudEmbeds
      : event.soundcloudEmbed
        ? [event.soundcloudEmbed]
        : []

  return (
    <article className="py-10 md:py-14 border-b border-stone-200">
      <div className="md:pl-[12%]">
        {/* Date + badge — above the flyer grid */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="text-xs tracking-widest uppercase bg-brand-blue text-white px-2 py-1">
            Upcoming
          </span>
          <p className="text-sm tracking-wide uppercase text-stone-600 font-medium">
            {formatDate(event.date)}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{event.locationLabel}
          </p>
        </div>

        {/* Grid: items-start — SC TOP aligns with flyer TOP */}
        <div className="grid grid-cols-1 md:grid-cols-[65fr_35fr] gap-8 md:gap-16 items-start">

          {/* Flyer with hover */}
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
            <div className="aspect-square bg-stone-100 flex items-center justify-center">
              <span className="text-xs tracking-widest uppercase text-stone-400">{event.title}</span>
            </div>
          )}

          {/* SC + Tickets — 12% right padding, top aligned with flyer */}
          {scUrls.length > 0 && (
            <div className="md:pr-[12%] flex flex-col gap-5">
              {/*
                Mobile order: Tickets (order-1) BEFORE SC (order-2)
                Desktop order: SC (md:order-1) BEFORE Tickets (md:order-2)
              */}
              <div className="order-2 md:order-1 flex flex-col gap-4">
                {scUrls.map((url, i) => (
                  <SoundCloudPlayer key={i} url={url} />
                ))}
              </div>
              <Link
                href="/tickets"
                className="order-1 md:order-2 block text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-4 hover:opacity-90 transition-opacity mt-0 md:mt-0"
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

/*
 * Archive event card
 * Desktop: 12% left indent, flyer left | SC right (items-start = SC top aligns with flyer top)
 * No hover on flyer
 */
function ArchiveEventCard({ event }: { event: EventType }) {
  const scUrls: string[] =
    (event.soundcloudEmbeds && event.soundcloudEmbeds.length > 0)
      ? event.soundcloudEmbeds
      : event.soundcloudEmbed
        ? [event.soundcloudEmbed]
        : []

  return (
    <article className="py-10 md:py-14 border-b border-stone-200">
      <div className="md:pl-[12%]">
        {/* Date — above the flyer grid */}
        <p className="text-sm tracking-wide uppercase text-stone-600 font-medium mb-5">
          {formatDate(event.date)}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{event.locationLabel}
        </p>

        {/* Grid: items-start — SC TOP aligns with flyer TOP */}
        <div className="grid grid-cols-1 md:grid-cols-[65fr_35fr] gap-8 md:gap-16 items-start">

          {/* Flyer — no hover */}
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

          {/* SC — 12% right padding, top aligned with flyer */}
          {scUrls.length > 0 && (
            <div className="md:pr-[12%] flex flex-col gap-4">
              {scUrls.map((url, i) => (
                <SoundCloudPlayer key={i} url={url} />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default function EventsPage() {
  const typedEvents = events as EventType[]
  const upcoming = typedEvents.filter((e) => e.status === 'upcoming')
  const past = typedEvents.filter((e) => e.status === 'past')

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-10 md:py-14">
      {/* No H1 — per design direction */}

      {upcoming.length > 0 && (
        <section className="mb-0">
          {upcoming.map((e) => <UpcomingEventCard key={e.id} event={e} />)}
        </section>
      )}

      {past.length > 0 && (
        <section>
          {/* Archive label — same 12% indent as event cards, same horizontal axis */}
          <div className="md:pl-[12%]">
            <p className="text-xs tracking-widest uppercase text-stone-400 py-4 border-b border-stone-200 mt-6">
              Archive
            </p>
          </div>
          {past.map((e) => <ArchiveEventCard key={e.id} event={e} />)}
        </section>
      )}

      {events.length === 0 && (
        <p className="text-stone-400 text-sm">No events scheduled.</p>
      )}
    </div>
  )
}