import { Box, Image } from 'theme-ui'
import { getImage, GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

import ImageWrapper from '../imageWrapper'
import FullScreenIcon from '../icons/FullScreenIcon'

interface PortraitImageProps {
  image: IGatsbyImageData
  widthPercentage: string
  caption: string
}

const PortraitImage = ({
  image,
  widthPercentage,
  caption,
}: PortraitImageProps) => {
  const width = widthPercentage ? widthPercentage : '65%'

  return (
    <ImageWrapper image={image} caption={caption}>
      <Box sx={{ marginTop: '20px', borderRadius: '4px', overflow: 'hidden' }}>
        <Box
          sx={{
            backgroundColor: 'backgroundAccent',
          }}
        >
          <Box
            sx={{
              width: ['100%', width, width],
              margin: 'auto',
              display: 'block',
            }}
          >
            <Image
              image={getImage(image)}
              alt={'blah'}
              as={GatsbyImage}
              sx={{
                width: ['100%', '100%', '100%'],
                borderRadius: [0, 0, 0],
                backdropFilter: 'blur(10px)',
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: '40px',
            position: 'absolute',
            right: '0',
            top: '0',
          }}
        >
          <FullScreenIcon />
        </Box>
      </Box>
    </ImageWrapper>
  )
}

export default PortraitImage
