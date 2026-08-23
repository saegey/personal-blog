import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import ImageWrapper from './imageWrapper'
import CustomImage from '../../CustomImage'

interface PortraitImageProps {
  image: IGatsbyImageData
  widthPercentage?: string
  caption?: string
  altText?: string
}

const PortraitImage = ({
  image,
  widthPercentage = '65%',
  caption,
  altText = '',
}: PortraitImageProps) => (
  <ImageWrapper image={image} caption={caption} altText={altText}>
    <div className="mt-5 bg-neutral-100 py-3 sm:py-5">
      <div className="mx-auto w-full px-3 sm:px-5" style={{ maxWidth: widthPercentage }}>
        <CustomImage image={getImage(image) ?? image} alt={altText} className="w-full" />
      </div>
    </div>
  </ImageWrapper>
)

export default PortraitImage
