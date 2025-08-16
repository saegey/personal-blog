import { IGatsbyImageData, getImage } from 'gatsby-plugin-image'
import { Box, Text } from 'theme-ui'
import React from 'react'

import CustomImage from '../../CustomImage'

export interface RaceImageType {
  image: IGatsbyImageData
  caption: string
  children: JSX.Element
  altText: string
}

const ImageWrapper = ({ image, caption, children, altText }: RaceImageType) => {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <>
      <Box sx={{ marginY: 3 }}>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setMenuOpen(true)
          }}
        >
          {children}
        </Box>
        <Text as="em" variant="caption">
          {caption}
        </Text>
      </Box>
      {menuOpen && (
        <Box variant="styles.faded">
          <Box
            sx={{
              marginX: 'auto',
              marginY: 'auto',
            }}
          >
            <Box
              sx={{ p: '0px' }}
              onClick={() => {
                setMenuOpen(false)
              }}
            >
              <CustomImage
                objectFit="contain"
                image={getImage(image)}
                alt={altText || ''}
                variant="fullScreen"
              />
            </Box>
            <Text as="em" variant="caption">
              {caption}
            </Text>
          </Box>
        </Box>
      )}
    </>
  )
}

export default ImageWrapper
