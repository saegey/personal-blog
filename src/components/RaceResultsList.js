/** @jsxImportSource theme-ui */
import React from "react"
import { Text, Flex, Box } from "theme-ui"

import ThemeContext from "../context/ThemeContext"

const RaceResultsList = ({ data }) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        return (
          <>
            {data.map((item, index) => {
              if (item === undefined) return ""

              return (
                <>
                  <Box
                    sx={{
                      marginBottom: "10px",
                      fontFamily: "body",
                    }}
                  >
                    <Flex sx={{ display: ["flex", "none", "none"] }}>
                      <Box sx={{ width: "10%" }}>{item && item.place}</Box>
                      <Box>
                        <Text
                          sx={{
                            textDecoration: item.isMe ? "underline" : "",
                            textDecorationColor: item.isMe
                              ? "highlightColor"
                              : "",
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
                      <Box sx={{ color: "primary" }}>
                        {theme.unitOfMeasure === "metric"
                          ? item.speedMetric
                          : item.speed}
                      </Box>
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
                      fontFamily: "body",
                      letterSpacing: ".3px",
                    }}
                  >
                    <Box sx={{ width: "5%" }}>
                      <Text variant="resultsItem">
                        <strong>{item.place}</strong>
                      </Text>
                    </Box>
                    <Box sx={{ width: "40%" }}>
                      <Text variant="resultsItem">{item.name}</Text>
                    </Box>
                    <Box sx={{ width: "20%" }}>
                      <Text variant="resultsItem">{item.time}</Text>
                    </Box>
                    <Box sx={{ width: "20%" }}>
                      <Text variant="resultsItem">
                        {theme.unitOfMeasure === "metric"
                          ? item.speedMetric
                          : item.speed}
                      </Text>
                    </Box>
                    <Box sx={{ width: "15%", textAlign: "right" }}>
                      <Text variant="resultsItem">{item.timeBehind}</Text>
                    </Box>
                  </Flex>
                </>
              )
            })}
          </>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default RaceResultsList
