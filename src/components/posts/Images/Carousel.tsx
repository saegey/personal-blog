import { getImage } from 'gatsby-plugin-image'
import type { ReactNode } from 'react'

import Carousel from '../../Carousel'

const CustomCarousel = ({ images = [] }: { images?: Array<any>; children?: ReactNode }) => (
  <Carousel
    slides={images.map((image, index) => ({
      image: getImage(image) ?? image?.childImageSharp?.gatsbyImageData ?? image,
      alt: `Race photograph ${index + 1}`,
    }))}
    ratio="auto"
    showArrows
  />
)

export default CustomCarousel
