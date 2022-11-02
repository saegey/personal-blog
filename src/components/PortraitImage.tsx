import { Box, Image } from "theme-ui"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from "gatsby-background-image"

import ImageWrapper from "./imageWrapper"
import FullScreenIcon from "./FullScreenIcon"

const PortraitImage = ({ image, widthPercentage, caption }) => {
  const width = widthPercentage ? widthPercentage : "65%"
  const placeholderImage = getImage(image)
  const bgImage = convertToBgImage(placeholderImage)

  return (
    <ImageWrapper image={image} caption={caption}>
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
              <Image
                image={getImage(image)}
                alt={"blah"}
                as={GatsbyImage}
                sx={{
                  width: ["100%", "100%", "100%"],
                  zIndex: "100",
                  borderRadius: [0, 0, 0],
                  backdropFilter: "blur(10px)",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "40px",
              position: "absolute",
              right: "0",
              top: "0",
              zIndex: 100,
            }}
          >
            <FullScreenIcon />
          </Box>
        </BackgroundImage>
      </Box>
    </ImageWrapper>
  )
}

export default PortraitImage
