/** @jsxImportSource theme-ui */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Box, IconButton, AspectRatio, Flex } from 'theme-ui'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

type Slide =
  | { src?: string; alt?: string; caption?: string; image?: IGatsbyImageData }
  | React.ReactNode // allows custom children if you prefer

type CarouselProps = {
  /** Array of image objects or custom nodes */
  slides: Slide[]
  /** Default: 16/9. You can pass a number (ratio) or 'auto' to let content size itself */
  ratio?: number | 'auto'
  /** Show dots under the carousel */
  showDots?: boolean
  /** Show prev/next arrow buttons */
  showArrows?: boolean
  /** Auto-advance in ms (e.g., 5000). Omit or set 0 to disable */
  autoplayMs?: number
  /** Rounded corners (Theme UI scale key or raw value). Default: 'lg' feel */
  radius?: number | string
  /** Optional sx overrides */
  sx?: any
}

const srOnly = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
} as const

export default function Carousel({
  slides,
  ratio = 16 / 9,
  showDots = true,
  showArrows = true,
  autoplayMs = 0,
  radius = 12,
  sx,
}: CarouselProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const isAuto = autoplayMs && autoplayMs > 0

  const count = slides.length

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(i, count - 1))
      const el = listRef.current
      if (!el) return
      const slide = el.children[clamped] as HTMLElement | undefined
      slide?.scrollIntoView({ inline: 'center', behavior: 'smooth' })
      setIndex(clamped)
    },
    [count],
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  // Update index on scroll (so dots/arrows reflect position)
  useEffect(() => {
    const el = listRef.current
    if (!el) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const children = Array.from(el.children) as HTMLElement[]
        // Find the child closest to the left edge
        const distances = children.map(c =>
          Math.abs(
            c.getBoundingClientRect().left - el.getBoundingClientRect().left,
          ),
        )
        const newIndex = distances.indexOf(Math.min(...distances))
        if (newIndex !== index) setIndex(newIndex)
      })
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [index])

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Autoplay
  useEffect(() => {
    if (!isAuto) return
    const id = setInterval(() => {
      if (index >= count - 1) {
        goTo(0)
      } else {
        next()
      }
    }, autoplayMs)
    return () => clearInterval(id)
  }, [isAuto, autoplayMs, index, count, next, goTo])

  const renderSlide = useCallback(
    (slide: Slide, i: number) => {
      let content: React.ReactNode
      if (
        typeof slide === 'object' &&
        slide !== null &&
        'image' in slide &&
        slide.image
      ) {
        // GatsbyImage
        content = (
          <GatsbyImage
            image={slide.image}
            alt={slide.alt ?? ''}
            style={{ width: '100%', height: '100%', borderRadius: radius }}
            imgStyle={{ objectFit: 'cover', borderRadius: radius }}
          />
        )
      } else if (
        typeof slide === 'object' &&
        slide !== null &&
        'src' in slide &&
        slide.src
      ) {
        // Fallback to <img>
        content = (
          <img
            src={slide.src}
            alt={slide.alt ?? ''}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: radius,
            }}
          />
        )
      } else {
        // Custom node
        content = slide
      }

      return (
        <Box
          key={i}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${i + 1} of ${count}`}
          sx={{
            scrollSnapAlign: 'center',
            flex: '0 0 100%',
            px: 0,
          }}
        >
          {ratio === 'auto' ? (
            <Box sx={{ borderRadius: radius, overflow: 'hidden' }}>
              {content}
            </Box>
          ) : (
            <AspectRatio
              ratio={ratio}
              sx={{ borderRadius: radius, overflow: 'hidden' }}
            >
              {content}
            </AspectRatio>
          )}

          {'caption' in (slide as any) && (slide as any).caption ? (
            <Box
              as="figcaption"
              sx={{
                fontSize: 1,
                color: 'muted',
                mt: 2,
                textAlign: 'center',
              }}
            >
              {(slide as any).caption}
            </Box>
          ) : null}
        </Box>
      )
    },
    [count, ratio, radius],
  )

  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === index ? 'true' : 'false'}
          sx={{
            appearance: 'none',
            border: 0,
            width: 8,
            height: 8,
            borderRadius: 9999,
            mx: 1,
            bg: i === index ? 'primary' : 'muted',
            cursor: 'pointer',
          }}
        />
      )),
    [count, goTo, index],
  )

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      {/* Visually-hidden accessible label for the region */}
      <Box as="h2" sx={srOnly} id="carousel-label">
        Carousel
      </Box>

      {/* Slides */}
      <Box
        ref={listRef}
        role="region"
        aria-labelledby="carousel-label"
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          gap: 3,
          mx: 'auto',
          px: 0,
          // hide scrollbar
          '::-webkit-scrollbar': { display: 'none' } as any,
          scrollbarWidth: 'none',
        }}
      >
        {slides.map(renderSlide)}
      </Box>

      {/* Arrows */}
      {showArrows && count > 1 && (
        <>
          <IconButton
            aria-label="Previous slide"
            onClick={prev}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 2,
              transform: 'translateY(-50%)',
              bg: 'background',
              boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
              borderRadius: 9999,
              '&:hover': { bg: 'elevated' },
            }}
          >
            ‹
          </IconButton>
          <IconButton
            aria-label="Next slide"
            onClick={next}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 2,
              transform: 'translateY(-50%)',
              bg: 'background',
              boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
              borderRadius: 9999,
              '&:hover': { bg: 'elevated' },
            }}
          >
            ›
          </IconButton>
        </>
      )}

      {/* Dots */}
      {showDots && count > 1 && (
        <Flex
          as="nav"
          aria-label="Carousel pagination"
          sx={{ justifyContent: 'center', mt: 3 }}
        >
          {dots}
        </Flex>
      )}
    </Box>
  )
}
