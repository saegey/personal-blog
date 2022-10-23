/** @jsxImportSource theme-ui */

import React, { useState } from "react"
import { Text, Image, Box } from "theme-ui"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import FullScreenIcon from "./FullScreenIcon"

const RaceImage = ({ image, caption, children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <Box
        onClick={() => {
          setMenuOpen(true)
        }}
      >
        <Box sx={{ cursor: "pointer" }}>{children}</Box>
        <Text
          as="em"
          sx={{
            fontFamily: "body",
            margin: 0,
            fontSize: "1",
            color: "primary",
            fontFamily: "serif",
          }}
        >
          {caption}
        </Text>
      </Box>
      {menuOpen ? (
        <Box
          sx={{
            position: "fixed",
            top: "0",
            left: "0",
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundColor: "rgba(0,0,0,0.8)",
            cursor: "pointer",
            zIndex: 10000,
          }}
        >
          <div
            sx={{
              marginX: "auto",
              marginY: "auto",
            }}
          >
            <Box
              sx={{ p: "0px" }}
              onClick={() => {
                setMenuOpen(false)
              }}
            >
              <Image
                objectFit="contain"
                image={getImage(image)}
                alt={"blah"}
                as={GatsbyImage}
                sx={{
                  // 							max-height: 100%;
                  // width: auto;
                  // margin: 0 auto;
                  // padding: 0;
                  // position: relative;
                  // display: block;
                  position: "relative",
                  // width: "100vh",
                  height: "100vh",
                  maxHeight: "100%",

                  // margin: "0 auto",
                  // width: ["100%", "100%", "100%"],
                  zIndex: "100",
                  borderRadius: [4, 4, 4],
                  // backdropFilter: "blur(10px)",
                }}
              />
            </Box>
            <Text
              as="em"
              sx={{
                fontFamily: "serif",
                margin: 0,
                fontSize: "1",
                color: "primary",
                display: "inline-block",
              }}
            >
              {caption}
            </Text>
          </div>
        </Box>
      ) : // </Box>
      null}
    </>
  )
}
export default RaceImage
