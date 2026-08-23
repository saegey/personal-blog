import { IGatsbyImageData, getImage } from 'gatsby-plugin-image'
import { type ReactNode, useState } from 'react'

import CustomImage from '../../CustomImage'

export interface RaceImageType {
  image: IGatsbyImageData
  caption?: ReactNode
  children: ReactNode
  altText?: string
}

const ImageWrapper = ({ image, caption, children, altText = '' }: RaceImageType) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <figure className="my-10">
      <div className="cursor-zoom-in" onClick={() => setIsOpen(true)}>{children}</div>
      {caption && <figcaption className="mt-3 font-condensed text-sm leading-relaxed text-muted">{caption}</figcaption>}
      {isOpen && (
        <div role="dialog" aria-modal="true" aria-label="Full-size image" className="fixed inset-0 z-[1000] grid cursor-zoom-out place-items-center bg-black/90 p-6" onClick={() => setIsOpen(false)}>
          <CustomImage objectFit="contain" image={getImage(image) ?? image} alt={altText} variant="fullScreen" />
        </div>
      )}
    </figure>
  )
}

export default ImageWrapper
