import { useState } from 'react'
import { Text, Box } from 'theme-ui'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import CustomImage from './CustomImage'

const RaceImage: React.FC<Props> = ({ image, caption, children, altText }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Box sx={{ marginY: ['20px', '80px', '100px'] }}>
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
          <div
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
          </div>
        </Box>
      )}
    </>
  )
}
export default RaceImage

export interface Props {
  image: IGatsbyImageData
  caption: string
  altText: string
  children: JSX.Element
}
