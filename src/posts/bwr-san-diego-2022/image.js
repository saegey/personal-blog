import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const SampleImage1 = () => {
  return (
    <StaticImage
      layout="fullWidth"
      src="./1.jpeg"
      quality={95}
      alt="Profile picture"
      placeholder="blurred"
    />
  )
}

const SampleImage2 = () => {
  return (
    <StaticImage
      layout="fullWidth"
      src="./2.jpeg"
      quality={95}
      alt="Profile picture"
      placeholder="blurred"
    />
  )
}

const SampleImage3 = () => {
  return (
    <StaticImage
      layout="fullWidth"
      src="./3.jpeg"
      quality={95}
      alt="Profile picture"
      placeholder="blurred"
    />
  )
}

export { SampleImage1, SampleImage2, SampleImage3 }
