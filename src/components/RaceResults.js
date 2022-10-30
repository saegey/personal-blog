/** @jsxImportSource theme-ui */

import React, { useState } from "react"
import { Text, Flex, Box, Button, Close } from "theme-ui"

import { formatTime } from "../lib/formatters"
import ThemeContext from "../context/ThemeContext"
import RaceResultsList from "./RaceResultsList"

const ViewAllResults = ({ data, setShouldShowResults }) => {
  return (
    <Box
      variant="box.faded"
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
          overflowY: "scroll",
        }}
        onClick={event => {
          event.stopPropagation()
        }}
      >
        <Flex
          sx={{
            position: "sticky",
            top: "0px",
            backgroundColor: "background",
          }}
        >
          <Box sx={{ p: "20px" }}>
            <Text
              as="h2"
              sx={{
                lineHeight: "30px",
                fontFamily: "serif",
                letterSpacing: ".6px",
                fontWeight: "700",
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
          <RaceResultsList data={data} />
        </Box>
      </Box>
    </Box>
  )
}

const RaceResults = ({ data, numbersToHighlight, distance, racerName }) => {
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
      d.speedMetric = `${(((distance * 1000) / timeSeconds) * 3.6).toFixed(
        2
      )} km/h`
      d.speed = `${((distance / timeSeconds) * 2236.9362920544).toFixed(2)} mph`
    } else {
      d.speed = null
    }

    if (!isNaN(timeSeconds) && timeSeconds !== 0) {
      d.timeBehind = formatTime((timeSeconds - firstPlaceTime).toFixed(2))
    } else {
      d.timeBehind = null
    }
    if (d.name === racerName) {
      d.isMe = true
    } else {
      d.isMe = false
    }
  })

  const highlights = []
  numbersToHighlight.forEach(n => highlights.push(data[n]))

  return (
    <>
      {shouldShowResults && (
        <ViewAllResults
          setShouldShowResults={setShouldShowResults}
          data={data}
        />
      )}

      <Box>
        <Flex>
          <Box sx={{ marginBottom: ["10px", "0px", "0px"] }}>
            <Text as="h2" variant="resultsHeading">
              Results
            </Text>
          </Box>
          <Box sx={{ marginLeft: "auto" }}>
            <Button
              onClick={() => {
                setShouldShowResults(true)
              }}
            >
              View All
            </Button>
          </Box>
        </Flex>
        <RaceResultsList data={highlights} />
      </Box>
    </>
  )
}

export default RaceResults
