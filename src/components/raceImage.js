/** @jsxImportSource theme-ui */

import React, { useState } from "react"
import { Text, Image, Box } from "theme-ui"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

const RaceImage = ({ image, caption, children, altText }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Box>
        <Box
          sx={{ cursor: "pointer" }}
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
        <Box variant="box.faded">
          <div
            sx={{
              marginX: "auto",
              marginY: "auto",
            }}
          >
            <Box
              sx={{ p: "0px" }}
              onClick={() => {
                setMenuOpen(false)
              }}
            >
              <Image
                objectFit="contain"
                image={getImage(image)}
                alt={altText ? altText : ""}
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
