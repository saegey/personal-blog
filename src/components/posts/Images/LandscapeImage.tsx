import { memo, useCallback } from 'react'
import { Box, type ThemeUIStyleObject, useColorMode } from 'theme-ui'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import ImageWrapper from './imageWrapper'
import FullScreenIcon from '../../icons/FullScreenIcon'
import CustomImage from '../../CustomImage'

interface RaceImageType {
  image: IGatsbyImageData
  caption: string
  altText: string
  invert?: boolean
  maximize?: boolean
  roundedEdges?: boolean
  showFullScreenButton?: boolean
  onOpenFullScreen?: () => void
  sx?: ThemeUIStyleObject
  className?: string
}

const LandscapeImage = ({
  image,
  caption,
  invert = false,
  altText = '',
  showFullScreenButton = true,
  onOpenFullScreen,
  sx,
  className,
}: RaceImageType) => {
  const [colorMode] = useColorMode()

  const handleActivate = useCallback(() => {
    onOpenFullScreen?.()
  }, [onOpenFullScreen])

  return (
    <ImageWrapper image={image} caption={caption} altText={altText}>
      <Box
        sx={{ width: '100%', position: 'relative', ...sx }}
        className={className}
      >
        <CustomImage
          image={getImage(image) ?? image}
          alt={altText}
          theme={{
            filter: invert && colorMode === 'dark' ? `invert(1)` : `none`,
            width: ['100%', '100%', '100%'],
            borderRadius: [4, 4, 4],
            WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          }}
        />
        {showFullScreenButton && (
          <Box
            as="button"
            aria-label="View full-size image"
            onClick={handleActivate}
            sx={{
              height: '32px',
              width: '32px',
              padding: '2px',
              position: 'absolute',
              right: '10px',
              top: '10px',
              zIndex: 1,
              border: 'none',
              bg: 'transparent',
              color: 'background',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary',
                outlineOffset: '2px',
              },
            }}
          >
            <FullScreenIcon />
          </Box>
        )}
      </Box>
    </ImageWrapper>
  )
}

export default memo(LandscapeImage)
