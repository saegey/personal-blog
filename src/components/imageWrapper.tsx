import { IGatsbyImageData } from 'gatsby-plugin-image'

import RaceImage from './raceImage'

export interface RaceImageType {
  image: IGatsbyImageData
  caption: string
  children: JSX.Element
  altText: string
}

const ImageWrapper = ({ image, caption, children, altText }: RaceImageType) => {
  return (
    <RaceImage
      caption={caption ? caption : ''}
      image={image}
      altText={altText ? altText : ''}
    >
      {children}
    </RaceImage>
  )
}

export default ImageWrapper
