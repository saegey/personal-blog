import React, { useState } from 'react'
import { Box, Flex, Text } from 'theme-ui'
import CustomImage from './CustomImage'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

interface TwoPhotoWideProps {
  images: Array<any> // expects array of gatsbyImageData or { childImageSharp: { gatsbyImageData } }
  alts?: [string, string]
  caption?: React.ReactNode
}

const FullscreenModal: React.FC<{
  image: IGatsbyImageData
  alt?: string
  onClose: () => void
}> = ({ image, alt, onClose }) => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      bg: 'rgba(0,0,0,0.85)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'zoom-out',
    }}
    onClick={onClose}
  >
    <CustomImage
      image={getImage(image)}
      alt={alt || ''}
      objectFit="contain"
      sx={{
        maxHeight: '90vh',
        maxWidth: '90vw',
        borderRadius: 4,
        boxShadow: '0 0 32px #0008',
      }}
    />
  </Box>
)

const TwoPhotoWide: React.FC<TwoPhotoWideProps> = ({
  images,
  alts = ['', ''],
  caption,
}) => {
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null)
  const getImg = (img: any) => img?.childImageSharp?.gatsbyImageData || img

  return (
    <>
      <Flex sx={{ gap: 3, mb: 2 }}>
        {[0, 1].map(idx => (
          <Box
            sx={{ flex: 1, cursor: 'pointer' }}
            key={idx}
            onClick={() => setFullscreenIdx(idx)}
          >
            <CustomImage
              image={getImg(images[idx])}
              alt={alts[idx]}
              theme={{
                width: ['100%', '100%', '100%'],
                borderRadius: [4, 4, 4],
                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
              }}
            />
          </Box>
        ))}
      </Flex>
      {caption && (
        <Text as="em" variant="caption">
          {caption}
        </Text>
      )}
      {fullscreenIdx !== null && (
        <FullscreenModal
          image={getImg(images[fullscreenIdx])}
          alt={alts[fullscreenIdx]}
          onClose={() => setFullscreenIdx(null)}
        />
      )}
    </>
  )
}

export default TwoPhotoWide
