import { useEffect, useState } from 'react'

type PhotoExif = {
  camera?: string
  lens?: string
  focalLength?: string
  aperture?: number | string
  exposureTime?: string
  iso?: number | string
}

export type GalleryPhoto = {
  id: string
  full: string
  thumbnail: string
  width: number
  height: number
  alt: string
  exif?: PhotoExif
}

const GalleryViewer = ({ photos }: { photos: GalleryPhoto[] }) => {
  const [active, setActive] = useState<number | null>(null)
  const current = active === null ? null : photos[active]
  const exposure = current?.exif
    ? [current.exif.camera, current.exif.lens, current.exif.focalLength, current.exif.aperture ? `f/${current.exif.aperture}` : undefined, current.exif.exposureTime, current.exif.iso ? `ISO ${current.exif.iso}` : undefined].filter(Boolean).join(' · ')
    : ''

  useEffect(() => {
    if (active === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
      if (event.key === 'ArrowLeft') setActive(index => index === null ? null : (index - 1 + photos.length) % photos.length)
      if (event.key === 'ArrowRight') setActive(index => index === null ? null : (index + 1) % photos.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, photos.length])

  return <>
    <section className="mx-auto flex max-w-5xl flex-col gap-20 sm:gap-32">
      {photos.map((photo, index) => {
        const ratio = photo.width / photo.height
        const measure = ratio < 0.85 ? 'max-w-2xl' : ratio < 1.2 ? 'max-w-3xl' : 'max-w-5xl'
        return <button key={photo.id} type="button" onClick={() => setActive(index)} className={`group block w-full self-center overflow-hidden bg-neutral-100 text-left ${measure}`}>
          <img src={photo.full} alt={photo.alt} width={photo.width} height={photo.height} loading={index > 0 ? 'lazy' : 'eager'} className="h-auto w-full transition duration-500 group-hover:scale-[1.01]" />
        </button>
      })}
    </section>
    {current && <div role="dialog" aria-modal="true" aria-label={current.alt} className="fixed inset-0 z-[1000] grid place-items-center bg-black/95 p-5 sm:p-10" onClick={() => setActive(null)}>
      <img src={current.full} alt={current.alt} className="max-h-[88vh] max-w-full object-contain" onClick={event => event.stopPropagation()} />
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5 font-condensed text-sm uppercase tracking-label text-white sm:inset-x-10 sm:bottom-8">
        <div><span>{String((active ?? 0) + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>{exposure && <span className="mt-1 block max-w-[min(70vw,42rem)] text-xs leading-relaxed text-white/70 sm:text-sm">{exposure}</span>}</div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Previous photo" onClick={event => { event.stopPropagation(); setActive(index => index === null ? null : (index - 1 + photos.length) % photos.length) }} className="grid h-9 w-9 place-items-center border border-white/70 text-xl transition hover:bg-white hover:text-black">←</button>
          <button type="button" aria-label="Next photo" onClick={event => { event.stopPropagation(); setActive(index => index === null ? null : (index + 1) % photos.length) }} className="grid h-9 w-9 place-items-center border border-white/70 text-xl transition hover:bg-white hover:text-black">→</button>
          <button type="button" onClick={event => { event.stopPropagation(); setActive(null) }} className="border border-white/70 px-3 py-2 hover:bg-white hover:text-black">Close</button>
        </div>
      </div>
    </div>}
  </>
}

export default GalleryViewer
