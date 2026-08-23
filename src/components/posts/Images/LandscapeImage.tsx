import { memo, useCallback } from 'react'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import ImageWrapper from './imageWrapper'
import FullScreenIcon from '../../icons/FullScreenIcon'
import CustomImage from '../../CustomImage'

interface LandscapeImageProps {
  image: IGatsbyImageData
  caption?: React.ReactNode
  altText?: string
  invert?: boolean
  maximize?: boolean
  showFullScreenButton?: boolean
  onOpenFullScreen?: () => void
  className?: string
}

const LandscapeImage = ({ image, caption, invert = false, altText = '', showFullScreenButton = true, onOpenFullScreen, className }: LandscapeImageProps) => {
  const handleActivate = useCallback(() => onOpenFullScreen?.(), [onOpenFullScreen])
  return (
    <ImageWrapper image={image} caption={caption} altText={altText}>
      <div className={`relative w-full ${className ?? ''}`}>
        <CustomImage image={getImage(image) ?? image} alt={altText} objectFit="cover" className={`w-full ${invert ? 'invert' : ''}`} />
        {showFullScreenButton && <button type="button" aria-label="View full-size image" onClick={handleActivate} className="absolute right-3 top-3 inline-grid h-8 w-8 place-items-center bg-black/50 text-white transition-colors hover:bg-black"><FullScreenIcon /></button>}
      </div>
    </ImageWrapper>
  )
}

export default memo(LandscapeImage)
