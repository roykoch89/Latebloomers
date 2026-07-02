'use client'

import type { Metadata } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import events from '@/data/events.json'

const featuredEvent = events.find((e) => e.featured && e.status === 'upcoming')

const TICKET_TYPES = [
  { id: 'tier1', label: 'First Tier', price: 15 },
  { id: 'tier2', label: 'Second Tier', price: 20 },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function TicketsPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    tier1: 0,
    tier2: 0,
  })
  const [added, setAdded] = useState(false)

  function change(id: string, delta: number) {
    setQuantities((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + delta) }))
    setAdded(false)
  }

  const total = TICKET_TYPES.reduce(
    (sum, t) => sum + (quantities[t.id] ?? 0) * t.price,
    0
  )
  const hasTickets = Object.values(quantities).some((v) => v > 0)

  if (!featuredEvent) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <p className="text-stone-400 text-sm">No upcoming events.</p>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-28">
      <p className="text-xs tracking-widest uppercase text-stone-400 mb-12">Tickets</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

        {/* Flyer */}
        <div>
          {featuredEvent.artwork && (
            <Image
              src={featuredEvent.artwork}
              alt={featuredEvent.title}
              width={800}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          )}
          <div className="mt-4 space-y-1">
            <p className="text-xs tracking-widest uppercase text-stone-400">
              {formatDate(featuredEvent.date)}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{featuredEvent.locationLabel}
            </p>
            <p className="text-sm text-stone-700">{featuredEvent.venue}</p>
          </div>
        </div>

        {/* Ticket selector */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 mb-2">
            {featuredEvent.title}
          </h1>
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-10">
            Select tickets
          </p>

          <div className="space-y-0 border-t border-stone-200">
            {TICKET_TYPES.map((tier) => (
              <div
                key={tier.id}
                className="flex items-center justify-between py-5 border-b border-stone-200"
              >
                <div>
                  <p className="text-sm font-medium text-stone-900">{tier.label}</p>
                  <p className="text-xs text-stone-400 mt-0.5">&euro;{tier.price}</p>
                </div>

                {/* Quantity control */}
                <div className="flex items-center gap-0 border border-stone-300">
                  <button
                    onClick={() => change(tier.id, -1)}
                    className="w-9 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors text-lg leading-none"
                    aria-label="Decrease"
                  >
                    &minus;
                  </button>
                  <span className="w-8 text-center text-sm tabular-nums text-stone-900">
                    {quantities[tier.id] ?? 0}
                  </span>
                  <button
                    onClick={() => change(tier.id, 1)}
                    className="w-9 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors text-lg leading-none"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between py-5 border-b border-stone-200 mb-6">
            <p className="text-sm font-medium text-stone-900">Total</p>
            <p className="text-sm font-semibold text-stone-900">&euro;{total}</p>
          </div>

          {/* CTA */}
          <button
            onClick={() => hasTickets && setAdded(true)}
            disabled={!hasTickets}
            className={`w-full text-xs tracking-widest uppercase py-4 transition-colors ${
              hasTickets
                ? 'bg-brand-blue text-white hover:bg-stone-900 cursor-pointer'
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
  )
}
