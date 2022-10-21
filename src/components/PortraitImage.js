/** @jsxImportSource theme-ui */
import * as React from "react"
import { Box } from "theme-ui"
import { getImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from "gatsby-background-image"
import ImageWrapper from "./imageWrapper.js"

const PortraitImage = ({ image, widthPercentage }) => {
  const width = widthPercentage ? widthPercentage : "65%"
  const placeholderImage = getImage(image)
  const bgImage = convertToBgImage(placeholderImage)

  return (
    <Box sx={{ marginTop: "20px", borderRadius: "4px", overflow: "hidden" }}>
      <BackgroundImage
        Tag="section"
        // Spread bgImage into BackgroundImage:
        {...bgImage}
        preserveStackingContext
      >
        <Box sx={{ backdropFilter: "blur(10px)" }}>
          <Box
            sx={{
              width: width,
              margin: "auto",
              display: "block",
            }}
          >
            <ImageWrapper image={image} />
          </Box>
        </Box>
      </BackgroundImage>
    </Box>
  )
}

export default PortraitImage
