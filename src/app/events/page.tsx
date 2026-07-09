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
  description?: string | string[] | null
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function EventSection({ event, showTickets }: { event: EventType; showTickets: boolean }) {
  const isUpcoming = event.status === 'upcoming'
  const scUrls: string[] =
    (event.soundcloudEmbeds && event.soundcloudEmbeds.length > 0)
      ? event.soundcloudEmbeds
      : event.soundcloudEmbed
        ? [event.soundcloudEmbed]
        : []

  return (
    <section className="py-10 md:py-16 border-b border-brand-lightBlue/40">
      <div className="md:pl-[12%] md:pr-[12%]">

        {/* Date + location removed — visible on the flyer */}
        <div className="mb-4 md:mb-5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" aria-hidden="true" />
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold">
              {isUpcoming ? 'Upcoming' : 'Archive'}
            </p>
          </div>
        </div>

        {/* Grid 50/50: Flyer | Featured Artists — same as home page */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-6 items-start">

          {/* Left: Flyer */}
          {isUpcoming && event.artwork ? (
            <Link href="/tickets" className="inline-block max-w-full overflow-hidden group">
              <Image
                src={event.artwork}
                alt={event.title}
                width={800}
                height={800}
                className="w-auto max-w-full h-auto max-h-[80vh] block transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>
          ) : event.artwork ? (
            <div className="inline-block max-w-full">
              <Image
                src={event.artwork}
                alt={event.title}
                width={800}
                height={800}
                className="w-auto max-w-full h-auto max-h-[80vh] block"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="aspect-square bg-stone-100 flex items-center justify-center">
              <span className="text-xs tracking-widest uppercase text-stone-400">{event.title}</span>
            </div>
          )}

          {/* Right: Featured Artists + SC players */}
          {scUrls.length > 0 && (
            <div className="flex flex-col gap-5">
              {event.description && (
                <div>
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold mb-3">
                    Description
                  </p>
                  <div className="text-[0.875rem] text-stone-700 leading-relaxed space-y-3">
                    {(Array.isArray(event.description) ? event.description : [event.description]).map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
              <p className="order-2 md:order-none mt-4 md:mt-0 text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold">
                Featured Artists
              </p>

              {/* Mobile: Tickets first */}
              {showTickets && isUpcoming && (
                <Link
                  href="/tickets"
                  className="md:hidden order-1 block text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-4 hover:opacity-90 transition-opacity"
                >
                  Tickets
                </Link>
              )}

              <div className="order-3 md:order-none flex flex-col gap-4">
                {scUrls.map((url, i) => (
                  <SoundCloudPlayer key={i} url={url} />
                ))}
              </div>

              {showTickets && isUpcoming && (
                <div className="hidden md:block mt-1">
                  <Link
                    href="/tickets"
                    className="block text-xs tracking-widest uppercase text-center bg-brand-blue text-white px-6 py-4 hover:opacity-90 transition-opacity"
                  >
                    Tickets
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default function EventsPage() {
  const typedEvents = events as EventType[]
  const upcoming = typedEvents.filter((e) => e.status === 'upcoming')
  const past = typedEvents.filter((e) => e.status === 'past')

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-8">
      {upcoming.map((e) => (
        <EventSection key={e.id} event={e} showTickets />
      ))}

      {past.length > 0 && (
        <>
          <div className="md:pl-[12%] md:pr-[12%] pt-8">
            <p className="text-xs tracking-widest uppercase text-stone-400 pb-4 border-b border-stone-200">
              Archive
            </p>
          </div>
          {past.map((e) => (
            <EventSection key={e.id} event={e} showTickets={false} />
          ))}
        </>
      )}
    </div>
  )
}