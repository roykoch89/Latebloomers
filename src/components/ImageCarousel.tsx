'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface CarouselImage {
  src: string
  alt: string
  label?: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  priority?: boolean
  linkUrl?: string
}

export default function ImageCarousel({ images, priority = false, linkUrl }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)

  if (images.length === 0) return null

  const mainImage = (
    <div
      className={`relative aspect-square overflow-hidden bg-stone-950 ${
        linkUrl ? 'transition-opacity duration-300 group-hover:opacity-85' : ''
      }`}
    >
      <Image
        src={images[current].src}
        alt={images[current].alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority && current === 0}
      />
    </div>
  )

  return (
    <div>
      {linkUrl ? (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block group cursor-pointer"
        >
          {mainImage}
        </a>
      ) : (
        mainImage
      )}

      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`text-xs tracking-widest uppercase px-3 py-1.5 border transition-colors ${
                i === current
                  ? 'border-brand-blue bg-brand-blue text-white'
                  : 'border-stone-300 text-stone-400 hover:border-brand-blue hover:text-brand-blue'
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