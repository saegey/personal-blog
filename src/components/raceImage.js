/** @jsxImportSource theme-ui */

import React, { useState } from "react"
import { Text, Image, Box } from "theme-ui"

import FullScreenIcon from "./FullScreenIcon"

const RaceImage = ({
  image: SampleImage,
  url,
  largeUrl,
  caption,
  children,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      {SampleImage ? (
        <Box
          sx={{ width: "100%", position: "relative" }}
          onClick={() => {
            setMenuOpen(true)
          }}
        >
          <SampleImage />
          <Box
            sx={{ position: "absolute", width: "100%", height: "100%", top: 0 }}
          >
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
        </Box>
      ) : (
        <Image
          src={url}
          alt={`Alt text`}
          onClick={() => {
            setMenuOpen(true)
          }}
        />
      )}
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
          <div sx={{ marginX: "auto", marginY: "auto" }}>
            <Box sx={{ p: "0px" }}>
              {SampleImage ? (
                <Box
                  sx={{ width: "100%" }}
                  onClick={() => {
                    setMenuOpen(false)
                  }}
                >
                  <SampleImage />
                </Box>
              ) : (
                <Image
                  src={largeUrl ? largeUrl : url}
                  alt={`Alt text`}
                  onClick={() => {
                    setMenuOpen(false)
                  }}
                />
              )}
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
      ) : null}
    </>
  )
}
export default RaceImage
