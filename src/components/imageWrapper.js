/** @jsxImportSource theme-ui */
import * as React from "react"

import RaceImage from "./raceImage"

const ImageWrapper = ({ image, caption, onClick, children }) => {
  return (
    <RaceImage caption={caption ? caption : ""} image={image}>
      {children}
    </RaceImage>
  )
}

export default ImageWrapper
