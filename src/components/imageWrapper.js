/** @jsxImportSource theme-ui */

import { GatsbyImage } from "gatsby-plugin-image"
import * as React from "react"
import { Image, Box } from "theme-ui"
import { getImage } from "gatsby-plugin-image"

import RaceImage from "./raceImage"
import FullScreenIcon from "./FullScreenIcon"

const ImageWrapper = ({ image, caption, onClick, children }) => {
  // const imageComp = () => (
  //   <Image
  //     image={getImage(image)}
  //     alt={"blah"}
  //     as={GatsbyImage}
  //     sx={{
  //       width: ["100%", "100%", "100%"],
  //       zIndex: "100",
  //       borderRadius: [4, 4, 4],
  //       backdropFilter: "blur(10px)",
  //     }}
  //   />
  // )
  return (
    <RaceImage caption={caption ? caption : ""} image={image}>
      {children}
    </RaceImage>
  )
}

export default ImageWrapper
