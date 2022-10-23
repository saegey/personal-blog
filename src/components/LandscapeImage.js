/** @jsxImportSource theme-ui */
import * as React from "react"
import { Image, Box } from "theme-ui"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"

import ImageWrapper from "./imageWrapper.js"
import FullScreenIcon from "./FullScreenIcon"

const LandscapeImage = ({ image, caption }) => {
  return (
    <ImageWrapper image={image} caption={caption}>
      <Box sx={{ width: "100%", position: "relative" }}>
        <Image
          image={getImage(image)}
          alt={"blah"}
          as={GatsbyImage}
          sx={{
            width: ["100%", "100%", "100%"],
            zIndex: "100",
            borderRadius: [4, 4, 4],
            // backdropFilter: "blur(10px)",
          }}
        ></Image>
        <Box
          sx={{
            width: "40px",
            position: "absolute",
            right: "0",
            top: "0",
            zIndex: 10000,
          }}
        >
          <FullScreenIcon />
        </Box>
      </Box>
    </ImageWrapper>
  )
}

export default LandscapeImage
