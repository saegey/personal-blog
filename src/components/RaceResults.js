/** @jsxImportSource theme-ui */

import React, { useState } from "react"
import { Text, Flex, Box, Button, Close } from "theme-ui"

import { formatTime } from "../lib/formatters"

const ResultText = ({ children }) => {
  return (
    <Text sx={{ fontSize: ["1", "2", "2"], lineHeight: "35px" }}>
      {children}
    </Text>
  )
}

const ViewAllResults = ({ data, setShouldShowResults }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        height: "100%",
        width: "100%",
        left: "0",
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 10000,
        display: "flex",
      }}
      onClick={event => {
        setShouldShowResults(false)
      }}
    >
      <Box
        sx={{
          backgroundColor: "background",
          margin: ["0% auto", "5% auto", "5% auto"],
          padding: "0px",
          width: "100%",
          maxWidth: "706px",
          fontFamily: "mono",
          overflowY: "scroll",
        }}
        onClick={event => {
          event.stopPropagation()
        }}
      >
        <Flex
          sx={{ position: "sticky", top: "0px", backgroundColor: "background" }}
        >
          <Box sx={{ p: "20px" }}>
            <Text
              as="h2"
              sx={{
                lineHeight: "30px",
                fontFamily: "serif",
                letterSpacing: ".6px",
                fontWeight: "600",
              }}
            >
              Results
            </Text>
          </Box>
          <Box sx={{ marginLeft: "auto", p: "20px" }}>
            <Button
              onClick={() => {
                setShouldShowResults(false)
              }}
              sx={{ backgroundColor: "transparent", p: 0 }}
            >
              <Close
                ml="auto"
                mr={-2}
                sx={{ color: "text", cursor: "pointer" }}
              />
            </Button>
          </Box>
        </Flex>
        <Box sx={{ paddingX: "20px" }}>
          <ListResults data={data} />
        </Box>
      </Box>
    </Box>
  )
}

const ListResults = ({ data }) => {
  return (
    <>
      {data.map((item, index) => {
        return (
          <>
            <Box
              sx={{
                marginBottom: "10px",
                fontFamily: "mono",
              }}
            >
              <Flex sx={{ display: ["flex", "none", "none"] }}>
                <Box sx={{ width: "10%" }}>{item.place}</Box>
                <Box>
                  <Text
                    sx={{
                      textDecoration: item.isMe ? "underline" : "",
                      textDecorationColor: item.isMe ? "highlightColor" : "",
                      textDecorationThickness: item.isMe ? "10px" : "",
                      textUnderlineOffset: item.isMe ? "-7px" : "",
                      textDecorationSkipInk: item.isMe ? "none" : "",
                    }}
                  >
                    {item.name}
                  </Text>
                </Box>
                <Box sx={{ marginLeft: "auto" }}>{item.time}</Box>
              </Flex>
              <Flex sx={{ display: ["flex", "none", "none"] }}>
                <Box sx={{ width: "10%" }}></Box>
                <Box sx={{ color: "primary" }}>{item.speed}</Box>
                <Box sx={{ marginLeft: "auto", color: "primary" }}>
                  {item.timeBehind}
                </Box>
              </Flex>
            </Box>
            <Flex
              sx={{
                height: ["35px", "35px", "35px"],
                backgroundColor: item.isMe ? "blockquoteBg" : "",
                display: ["none", "flex", "flex"],
                fontFamily: "mono",
                letterSpacing: "-.3px",
              }}
            >
              <Box sx={{ width: "5%" }}>
                <ResultText>
                  <strong>{item.place}</strong>
                </ResultText>
              </Box>
              <Box sx={{ width: "40%" }}>
                <ResultText>{item.name}</ResultText>
              </Box>
              <Box sx={{ width: "20%" }}>
                <ResultText>{item.time}</ResultText>
              </Box>
              <Box sx={{ width: "20%" }}>
                <ResultText>{item.speed}</ResultText>
              </Box>
              <Box sx={{ width: "15%", textAlign: "right" }}>
                <ResultText>{item.timeBehind}</ResultText>
              </Box>
            </Flex>
          </>
        )
      })}
    </>
  )
}

const RaceResults = ({ data, numbersToHighlight, distance }) => {
  const [shouldShowResults, setShouldShowResults] = useState(false)
  const firstPlaceTime = data[0].time
    .split(":")
    .reduce((acc, time) => 60 * acc + +time)

  data.forEach(d => {
    if (d.place === "") return
    const timeSeconds = d.time
      .split(":")
      .reduce((acc, time) => 60 * acc + +time)
    // d.speed = distance / (timeSeconds / 3600)
    if (timeSeconds > 0) {
      d.speed = `${((distance / timeSeconds) * 2236.9362920544).toFixed(2)} mph`
    } else {
      d.speed = null
    }

    if (!isNaN(timeSeconds) && timeSeconds !== 0) {
      d.timeBehind = formatTime((timeSeconds - firstPlaceTime).toFixed(2))
    } else {
      d.timeBehind = null
    }
    if (d.name === "Adam Saegebarth") {
      d.isMe = true
    } else {
      d.isMe = false
    }
  })

  const highlights = []
  numbersToHighlight.forEach(n => highlights.push(data[n]))

  return (
    <>
      {shouldShowResults ? (
        <ViewAllResults
          setShouldShowResults={setShouldShowResults}
          data={data}
        />
      ) : (
        ""
      )}

      <Box>
        <Flex>
          <Box sx={{ marginBottom: ["10px", "0px", "0px"] }}>
            <Text
              as="h2"
              sx={{
                lineHeight: "30px",
                fontFamily: "serif",
                letterSpacing: ".6px",
                fontWeight: "600",
              }}
            >
              Results
            </Text>
          </Box>
          <Box sx={{ marginLeft: "auto" }}>
            <Button
              sx={{
                color: "background",
                marginRight: 0,
                paddingX: "10px",
                paddingY: "5px",
                fontFamily: "body",
                cursor: "pointer",
              }}
              mr={2}
              onClick={() => {
                setShouldShowResults(true)
              }}
            >
              View All
            </Button>
          </Box>
        </Flex>
        <ListResults data={highlights} />
      </Box>
    </>
  )
}

export default RaceResults
