import { Image, Box } from 'theme-ui'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'

import ImageWrapper from './imageWrapper'
import FullScreenIcon from './FullScreenIcon'
import { RaceImageType, MyImageProps } from '../common/types'
const MyImage = Image as any as (props: MyImageProps) => JSX.Element

const LandscapeImage = ({ image, caption }: RaceImageType) => {
  return (
    <ImageWrapper image={image} caption={caption} altText="">
      <Box sx={{ width: '100%', position: 'relative' }}>
        <MyImage
          image={getImage(image)}
          alt={'blah'}
          as={GatsbyImage}
          sx={{
            width: ['100%', '100%', '100%'],
            zIndex: '100',
            borderRadius: [4, 4, 4],
          }}
        />
        <Box
          sx={{
            width: '40px',
            position: 'absolute',
            right: '0',
            top: '0',
            zIndex: 1000,
          }}
        >
          <FullScreenIcon />
        </Box>
      </Box>
    </ImageWrapper>
  )
}

export default LandscapeImage
