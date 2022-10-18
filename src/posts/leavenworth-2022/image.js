import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const SampleImage1 = () => {
  return (
    <StaticImage
      src="./l1.jpeg"
      quality={95}
      alt="Profile picture"
      placeholder="blurred"
      // width="100%"
      // height="100%"
    />
  )
}

const SampleImage2 = () => {
  return (
    <StaticImage
      src="./2.jpeg"
      quality={95}
      alt="Profile picture"
      placeholder="blurred"

      // onClick={() => {
      //   setMenuOpen(true)
      // }}
    />
  )
}

export { SampleImage1, SampleImage2 }
