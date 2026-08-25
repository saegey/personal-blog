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
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-12 sm:gap-5">
      {photos.map((photo, index) => {
        const shape = index % 7 === 0 ? 'sm:col-span-8' : index % 5 === 0 ? 'sm:col-span-5 sm:mt-16' : index % 3 === 0 ? 'sm:col-span-7' : 'sm:col-span-5'
        return <button key={photo.id} type="button" onClick={() => setActive(index)} className={`group block overflow-hidden bg-neutral-100 text-left ${shape}`}>
          <img src={photo.thumbnail} alt={photo.alt} width={photo.width} height={photo.height} loading={index > 2 ? 'lazy' : 'eager'} className="h-auto w-full transition duration-500 group-hover:scale-[1.015]" />
        </button>
      })}
    </section>
    {current && <div role="dialog" aria-modal="true" aria-label={current.alt} className="fixed inset-0 z-[1000] grid place-items-center bg-black/95 p-5 sm:p-10" onClick={() => setActive(null)}>
      <img src={current.full} alt={current.alt} className="max-h-[88vh] max-w-full object-contain" onClick={event => event.stopPropagation()} />
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5 font-condensed text-sm uppercase tracking-label text-white sm:inset-x-10 sm:bottom-8">
        <div><span>{String((active ?? 0) + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>{exposure && <span className="mt-1 block max-w-[min(70vw,42rem)] text-xs leading-relaxed text-white/70 sm:text-sm">{exposure}</span>}</div>
        <button type="button" onClick={() => setActive(null)} className="border border-white/70 px-3 py-1 hover:bg-white hover:text-black">Close</button>
      </div>
    </div>}
  </>
}

export default GalleryViewer
