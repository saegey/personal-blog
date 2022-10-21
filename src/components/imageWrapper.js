/** @jsxImportSource theme-ui */

import { GatsbyImage } from "gatsby-plugin-image"
import * as React from "react"
import { Image } from "theme-ui"
import { getImage } from "gatsby-plugin-image"

import RaceImage from "./raceImage"

const ImageWrapper = ({ image, caption }) => {
  const imageComp = () => (
    <Image
      image={getImage(image)}
      alt={"blah"}
      as={GatsbyImage}
      sx={{
        width: ["100%", "100%", "100%"],
        zIndex: "100",
        borderRadius: [4, 4, 4],
        backdropFilter: "blur(10px)",
      }}
    />
  )
  return <RaceImage image={imageComp} caption={caption ? caption : ""} />
}

export default ImageWrapper
