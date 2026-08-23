import { type ReactNode, useState } from 'react'
import CustomImage from './CustomImage'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

interface TwoPhotoWideProps {
  images: Array<any> // expects array of gatsbyImageData or { childImageSharp: { gatsbyImageData } }
  alts?: [string, string]
  caption?: ReactNode
}

const TwoPhotoWide = ({
  images,
  alts = ['', ''],
  caption,
}: TwoPhotoWideProps) => {
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null)
  const getImg = (img: any) => getImage(img) ?? img?.childImageSharp?.gatsbyImageData ?? img

  return (
    <>
      <figure className="my-10">
      <div className="grid gap-3 sm:grid-cols-2">
        {[0, 1].map(idx => (
          <button type="button" className="cursor-zoom-in overflow-hidden bg-neutral-100 text-left" key={idx} onClick={() => setFullscreenIdx(idx)} aria-label={`View ${alts[idx] || `image ${idx + 1}`} full size`}>
            <CustomImage
              image={getImg(images[idx])}
              alt={alts[idx]}
              className="w-full transition-transform duration-300 hover:scale-[1.01]"
            />
          </button>
        ))}
      </div>
      {caption && <figcaption className="mt-3 font-condensed text-sm leading-relaxed text-muted">{caption}</figcaption>}
      </figure>
      {fullscreenIdx !== null && (
        <div role="dialog" aria-modal="true" aria-label="Full-size image" className="fixed inset-0 z-[1000] grid cursor-zoom-out place-items-center bg-black/90 p-6" onClick={() => setFullscreenIdx(null)}>
          <CustomImage image={getImg(images[fullscreenIdx]) as IGatsbyImageData} alt={alts[fullscreenIdx]} objectFit="contain" variant="fullScreen" />
        </div>
      )}
    </>
  )
}

export default TwoPhotoWide
