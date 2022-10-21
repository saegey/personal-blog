/** @jsxImportSource theme-ui */

import React, { useState } from "react"
import { Text, Flex, Box, Divider, Button, Close } from "theme-ui"

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
        cursor: "pointer",
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
          fontFamily: "body",
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
            <Text as="h2" sx={{ lineHeight: "30px" }}>
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
              <Close ml="auto" mr={-2} sx={{ color: "text" }} />
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
          <Flex
            sx={{
              height: ["35px", "35px", "35px"],
              backgroundColor: item.isMe ? "blockquoteBg" : "",
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
  console.log(highlights)

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

      <Box sx={{ fontFamily: "body" }}>
        <Flex>
          <Box>
            <Text as="h2" sx={{ lineHeight: "30px" }}>
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
        <Divider />
        <ListResults data={highlights} />
        <Divider />
      </Box>
    </>
  )
}

export default RaceResults
