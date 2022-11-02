import { useState } from 'react'
import { Text, Image, Box } from 'theme-ui'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'

import { NestedRaceImageType, MyImageProps } from "../common/types"

const MyImage = Image as any as (props: MyImageProps) => JSX.Element

const RaceImage = ({ image, caption, children, altText }: NestedRaceImageType) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Box>
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
              <MyImage
                objectFit="contain"
                image={getImage(image)}
                alt={altText || ''}
                as={GatsbyImage}
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
