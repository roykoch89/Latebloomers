import type { Metadata } from 'next'
import Image from 'next/image'
import events from '@/data/events.json'
import WeeztixWidget from '@/components/WeeztixWidget'

export const metadata: Metadata = {
  title: 'Tickets',
}

const featuredEvent = events.find((e) => e.featured && e.status === 'upcoming')

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function TicketsPage() {
  if (!featuredEvent) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-10">
        <p className="text-stone-400 text-sm">No upcoming events.</p>
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-8">
      <section className="py-10 md:py-16 border-b border-brand-lightBlue/40">
        <div className="md:pl-[12%] md:pr-[12%]">

          {/* Editorial event header */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" aria-hidden="true" />
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold">
                Tickets
              </p>
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-brand-navy leading-none">
              {formatDate(featuredEvent.date)}
            </p>
            <p className="text-base md:text-lg tracking-widest uppercase text-stone-600 font-medium mt-2">
              {featuredEvent.locationLabel}
            </p>
          </div>

          {/* Grid: Flyer | Ticket widget */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-10 items-start">

            {/* Left: Flyer — order-2 on mobile (widget first) */}
            <div className="order-2 md:order-none">
              {featuredEvent.artwork && (
                <Image
                  src={featuredEvent.artwork}
                  alt={featuredEvent.title}
                  width={800}
                  height={800}
                  className="w-auto max-w-full h-auto max-h-[80vh] block"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              )}
            </div>

            {/* Right: Weeztix widget — order-1 on mobile */}
            <div className="order-1 md:order-none">
              <WeeztixWidget />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}