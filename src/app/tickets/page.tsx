'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import events from '@/data/events.json'

const featuredEvent = events.find((e) => e.featured && e.status === 'upcoming')

const TICKET_TYPES = [
  { id: 'tier1', label: 'First Tier',  price: 15 },
  { id: 'tier2', label: 'Second Tier', price: 20 },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function TicketsPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    tier1: 0, tier2: 0,
  })
  const [added, setAdded] = useState(false)

  function change(id: string, delta: number) {
    setQuantities((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + delta) }))
    setAdded(false)
  }

  const total = TICKET_TYPES.reduce(
    (sum, t) => sum + (quantities[t.id] ?? 0) * t.price, 0
  )
  const hasTickets = Object.values(quantities).some((v) => v > 0)

  if (!featuredEvent) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-10">
        <p className="text-stone-400 text-sm">No upcoming events.</p>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12">
      <section className="py-10 md:py-16 border-b border-brand-lightBlue/40">
        <div className="md:pl-[12%] md:pr-[12%]">

          {/* Editorial event header — same pattern as home/events pages */}
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

          {/* Grid 50/50: Flyer | Ticket Selector */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-6 items-start">

            {/* Left: Flyer — order-2 on mobile (tickets first on mobile) */}
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

            {/* Right: Ticket selector — order-1 on mobile */}
            <div className="order-1 md:order-none flex flex-col gap-0">
              <p className="hidden md:block text-[0.65rem] tracking-[0.2em] uppercase text-brand-blue font-semibold mb-5">
                {featuredEvent.title}
              </p>

              <div className="border-t border-stone-200">
                {TICKET_TYPES.map((tier) => (
                  <div
                    key={tier.id}
                    className="flex items-center justify-between py-5 border-b border-stone-200"
                  >
                    <div>
                      <p className="text-sm font-medium text-stone-900">{tier.label}</p>
                      <p className="text-xs text-stone-400 mt-0.5">&euro;{tier.price}</p>
                    </div>
                    <div className="flex items-center border border-stone-300">
                      <button
                        onClick={() => change(tier.id, -1)}
                        className="w-9 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors"
                        aria-label="Decrease"
                      >
                        &minus;
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums text-stone-900">
                        {quantities[tier.id] ?? 0}
                      </span>
                      <button
                        onClick={() => change(tier.id, 1)}
                        className="w-9 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between py-5 border-b border-stone-200 mb-6">
                <p className="text-sm font-medium text-stone-900">Total</p>
                <p className="text-sm font-semibold text-stone-900">&euro;{total}</p>
              </div>

              <button
                onClick={() => hasTickets && setAdded(true)}
                disabled={!hasTickets}
                className={`w-full text-xs tracking-widest uppercase py-4 transition-colors ${
                  hasTickets
                    ? 'bg-brand-blue text-white hover:opacity-90 cursor-pointer'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                {added ? 'Added to cart' : 'Add to cart'}
              </button>

              <p className="text-xs text-stone-400 text-center mt-4">
                This is a visual demo. No payment is processed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}