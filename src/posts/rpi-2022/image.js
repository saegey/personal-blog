import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const SampleImage1 = () => {
  return (
    <StaticImage
      layout="fullWidth"
      src="./6.jpeg"
      quality={95}
      alt="Profile picture"
      placeholder="blurred"
      // width="100%"
      // height="100%"
      style={{ borderRadius: "4px" }}
    />
  )
}

const SampleImage2 = () => {
  return (
    <StaticImage
      layout="fullWidth"
      src="./4.jpeg"
      quality={95}
      alt="Profile picture"
      placeholder="blurred"
      style={{ borderRadius: "4px" }}
      // onClick={() => {
      //   setMenuOpen(true)
      // }}
    />
  )
}

export { SampleImage1, SampleImage2 }
