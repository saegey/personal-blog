import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const SampleImage1 = () => {
  return (
    <StaticImage
      src="./1.jpeg"
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
      src="./2.jpg"
      quality={95}
      alt="Profile picture"
      placeholder="blurred"

      // onClick={() => {
      //   setMenuOpen(true)
      // }}
    />
  )
}

const SampleImage3 = () => {
  return (
    <StaticImage
      src="./3.jpg"
      quality={95}
      alt="Profile picture"
      placeholder="blurred"

      // onClick={() => {
      //   setMenuOpen(true)
      // }}
    />
  )
}
const SampleImage4 = () => {
  return (
    <StaticImage
      src="./4.jpg"
      quality={95}
      alt="Profile picture"
      placeholder="blurred"

      // onClick={() => {
      //   setMenuOpen(true)
      // }}
    />
  )
}

export { SampleImage1, SampleImage2, SampleImage3, SampleImage4 }
