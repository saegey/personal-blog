import React, { useEffect, useState } from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

type ImageSlide = { src?: string; alt?: string; caption?: string; image?: IGatsbyImageData }
type Slide = ImageSlide | React.ReactNode

type CarouselProps = {
  slides: Slide[]
  ratio?: number | 'auto'
  showDots?: boolean
  showArrows?: boolean
  autoplayMs?: number
  radius?: number | string
  sx?: unknown
}

const isImageSlide = (slide: Slide): slide is ImageSlide =>
  typeof slide === 'object' && slide !== null && !React.isValidElement(slide)

const twoDigits = (number: number) => String(number).padStart(2, '0')

export default function Carousel({ slides, ratio = 16 / 9, showDots = false, showArrows = true, autoplayMs = 0 }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const count = slides.length

  useEffect(() => {
    if (!autoplayMs || count < 2) return
    const timer = window.setInterval(() => setIndex(current => (current + 1) % count), autoplayMs)
    return () => window.clearInterval(timer)
  }, [autoplayMs, count])

  if (!count) return null
  const slide = slides[index]
  const imageSlide = isImageSlide(slide) ? slide : undefined

  return (
    <figure className="my-10" aria-roledescription="carousel" aria-label="Image sequence">
      <div className="relative overflow-hidden bg-neutral-100" style={ratio === 'auto' ? undefined : { aspectRatio: String(ratio) }}>
        {imageSlide?.image ? <GatsbyImage image={imageSlide.image} alt={imageSlide.alt ?? ''} className="h-full w-full" imgClassName="object-cover" /> : null}
        {imageSlide?.src ? <img src={imageSlide.src} alt={imageSlide.alt ?? ''} className="h-full w-full object-cover" /> : null}
        {!imageSlide ? (slide as React.ReactNode) : null}
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-4 font-condensed text-sm text-muted">
        <span className="max-w-[70%] leading-relaxed">{imageSlide?.caption ?? ''}</span>
        <span className="shrink-0 tabular-nums">{twoDigits(index + 1)} / {twoDigits(count)}</span>
      </figcaption>

      {count > 1 && (
        <nav className="mt-3 flex items-center justify-between border-t border-line pt-3" aria-label="Image sequence controls">
          {showArrows ? (
            <div className="flex gap-2">
              <button type="button" onClick={() => setIndex(current => (current - 1 + count) % count)} className="border border-ink px-3 py-1 font-condensed text-sm uppercase tracking-label transition-colors hover:bg-ink hover:text-white" aria-label="Previous image">←</button>
              <button type="button" onClick={() => setIndex(current => (current + 1) % count)} className="border border-ink px-3 py-1 font-condensed text-sm uppercase tracking-label transition-colors hover:bg-ink hover:text-white" aria-label="Next image">→</button>
            </div>
          ) : <span />}
          {showDots && (
            <div className="flex gap-1" aria-label="Choose image">
              {slides.map((_, slideIndex) => <button key={slideIndex} type="button" onClick={() => setIndex(slideIndex)} aria-label={`View image ${slideIndex + 1}`} aria-current={slideIndex === index ? 'true' : undefined} className={`h-1.5 w-5 transition-colors ${slideIndex === index ? 'bg-ink' : 'bg-line hover:bg-muted'}`} />)}
            </div>
          )}
        </nav>
      )}
    </figure>
  )
}
