import { Box, useColorMode } from 'theme-ui'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import ImageWrapper from '../imageWrapper'
import FullScreenIcon from '../icons/FullScreenIcon'
import CustomImage from '../CustomImage'

interface RaceImageType {
  image: IGatsbyImageData
  caption: string
  altText: string
  invert?: boolean
  maximize?: boolean
  roundedEdges?: boolean
}

const LandscapeImage = ({
  image,
  caption,
  invert = false,
  maximize = true,
  roundedEdges = true,
}: RaceImageType) => {
  const [colorMode] = useColorMode()

  if (!maximize) {
    return (
      <Box sx={{ width: '100%', position: 'relative' }}>
        <CustomImage
          image={getImage(image)}
          alt={'blah'}
          theme={{
            filter: invert && colorMode === 'dark' ? `invert(1)` : `none`,
            width: ['100%', '100%', '100%'],
            borderRadius: roundedEdges ? [5, 5, 5] : [0, 0, 0],
            '-webkit-mask-image': '-webkit-radial-gradient(white, black)',
          }}
        />
      </Box>
    )
  }

  return (
    <ImageWrapper image={image} caption={caption} altText="">
      <Box sx={{ width: '100%', position: 'relative' }}>
        <CustomImage
          image={getImage(image)}
          alt={'blah'}
          theme={{
            filter: invert && colorMode === 'dark' ? `invert(1)` : `none`,
            width: ['100%', '100%', '100%'],
            borderRadius: [4, 4, 4],
            // '-webkit-mask-image': '-webkit-radial-gradient(white, black)',
          }}
        />
        <Box
          sx={{
            height: '32px',
            width: '32px',
            padding: '2px',
            position: 'absolute',
            right: '10px',
            top: '10px',
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
