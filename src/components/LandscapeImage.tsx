import { Image, Box, useColorMode } from 'theme-ui'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'

import ImageWrapper from './imageWrapper'
import FullScreenIcon from './FullScreenIcon'
import { RaceImageType, MyImageProps } from '../common/types'
const MyImage = Image as any as (props: MyImageProps) => JSX.Element

const LandscapeImage = ({
  image,
  caption,
  invert = false,
  maximize = true,
}: RaceImageType) => {
  const [colorMode] = useColorMode()

  if (!maximize) {
    return (
      <Box sx={{ width: '100%', position: 'relative' }}>
        <MyImage
          image={getImage(image)}
          alt={'blah'}
          as={GatsbyImage}
          sx={{
            filter: invert && colorMode === 'dark' ? `invert(1)` : `none`,
            width: ['100%', '100%', '100%'],
            borderRadius: [4, 4, 4],
            '-webkit-mask-image': '-webkit-radial-gradient(white, black)',
          }}
        />
      </Box>
    )
  }

  return (
    <ImageWrapper image={image} caption={caption} altText="">
      <Box sx={{ width: '100%', position: 'relative' }}>
        <MyImage
          image={getImage(image)}
          alt={'blah'}
          as={GatsbyImage}
          sx={{
            filter: invert && colorMode === 'dark' ? `invert(1)` : `none`,
            width: ['100%', '100%', '100%'],
            borderRadius: [4, 4, 4],
            // '-webkit-mask-image': '-webkit-radial-gradient(white, black)',
          }}
        />
        <Box
          sx={{
            width: '40px',
            position: 'absolute',
            right: '0',
            top: '0',
            zIndex: 0,
          }}
        >
          <FullScreenIcon />
        </Box>
      </Box>
    </ImageWrapper>
  )
}

export default LandscapeImage
