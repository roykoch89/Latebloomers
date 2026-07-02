'use client'

import Image from 'next/image'
import { useState } from 'react'

interface CarouselImage {
  src: string
  alt: string
  label?: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  priority?: boolean
}

export default function ImageCarousel({ images, priority = false }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)

  if (images.length === 0) return null

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden bg-stone-950">
        <Image
          src={images[current].src}
          alt={images[current].alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority && current === 0}
        />
      </div>

      {/* Slide selector */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`text-xs tracking-widest uppercase px-3 py-1.5 border transition-colors ${
                i === current
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-300 text-stone-400 hover:border-stone-600 hover:text-stone-700'
              }`}
            >
              {img.label ?? `Side ${i + 1}`}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
