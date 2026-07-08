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

          {/* Grid: Flyer (left) | Widget + Info (right)
              Mobile order: widget → info → flyer
              Desktop order: flyer left, widget+info right */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 md:gap-10 items-start">

            {/* Left col / mobile last: Flyer */}
            <div className="order-3 md:order-none">
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

            {/* Right col / mobile first: Widget then Info */}
            <div className="order-1 md:order-none flex flex-col">

              {/* Weeztix ticket widget */}
              <WeeztixWidget />

              {/* ── Event information ── */}
              <div className="mt-8 md:mt-10 flex flex-col divide-y divide-brand-lightBlue/30">

                {/* Intro — slightly elevated weight, reads as event intro not a heading */}
                <p className="text-[0.875rem] text-stone-700 leading-relaxed pb-6">
                  With the beach as our backdrop, Giammarco Orsini and DJ Tjizza, with support
                  from Roy Koch and DJ Z, will take us from golden hour into the night with a
                  selection of underground house music at Boomerang Beach Club. Expect quality
                  music, a relaxed atmosphere, and a dancefloor of like-minded music lovers.
                  This gathering celebrates the first-ever Latebloomers release.
                </p>

                {/* Tickets */}
                <div className="py-6">
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold mb-3">
                    Tickets
                  </p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Tickets are available via the ticket shop on this website or directly via
                    the{' '}
                    <a
                      href="https://shop.weeztix.com/aaa79a59-79eb-11f1-8e27-d65b0659bc31"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:underline transition-colors"
                    >
                      ticket page
                    </a>.
                  </p>
                </div>

                {/* How to get there */}
                <div className="py-6">
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold mb-3">
                    How to get there
                  </p>
                  <div className="text-sm text-stone-600 leading-relaxed space-y-3">
                    <div>
                      <p className="font-medium text-stone-700">Boomerang Beach Club</p>
                      <p>Gevers Deynootweg 63</p>
                      <p>2586 ZZ Den Haag</p>
                    </div>
                    <p>
                      The easiest way to reach the venue is by public transport. Take tram 1,
                      tram 9, or bus 22 and get off at the Zwarte Pad stop.
                    </p>
                    <p>
                      If you are arriving by car, parking is available near Zwarte Pad
                      (approximately a 2-minute walk). You can pre-book a parking space
                      for &euro;12.50 via the{' '}
                      <a
                        href="https://parkeren.pleqq.nl/parkngo/?p=png&affarr=49312"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-blue hover:underline transition-colors"
                      >
                        parking reservation page
                      </a>.
                    </p>
                  </div>
                </div>

                {/* Information */}
                <div className="py-6">
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold mb-3">
                    Information
                  </p>
                  <ul className="text-sm text-stone-600 space-y-1.5">
                    <li>Doors open: 18:00</li>
                    <li>Doors close: 22:00</li>
                    <li>Food and drinks will be available at the venue</li>
                    <li>Please bring a valid ID</li>
                    <li>Most importantly: enjoy the music and have a good time</li>
                  </ul>
                </div>

                {/* Questions */}
                <div className="pt-6">
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold mb-3">
                    Questions
                  </p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    For additional questions, please contact{' '}
                    <a
                      href="mailto:latebloomers.rec@gmail.com"
                      className="text-brand-blue hover:underline transition-colors"
                    >
                      latebloomers.rec@gmail.com
                    </a>
                    {' '}or via{' '}
                    <a
                      href="https://www.instagram.com/latebloomers.rec/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:underline transition-colors"
                    >
                      Instagram
                    </a>.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}