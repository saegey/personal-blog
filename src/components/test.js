/** @jsxImportSource theme-ui */

import React from "react"
import calcBestPowers from "../lib/gpxDemo"
import { Text, Box } from "theme-ui"

const fileName = data => {
  const { powers, heart } = JSON.parse(data.data).properties
    .coordinateProperties

  const powerAnalysis = calcBestPowers(
    [5, 10, 15, 30, 60, 120, 300, 600],
    powers
  )
  const heartAnalysis = calcBestPowers(
    [5, 10, 15, 30, 60, 120, 300, 600],
    heart
  )

  // {"5":543,"10":446,"15":402,"30":375,"60":309,"120":298,"300":288,"600":282,"entire":171}
  return (
    <div
      sx={{
        display: "grid",
        gridGap: 3,
        gridTemplateColumns: `repeat(auto-fit, minmax(128px, 1fr))`,
      }}
    >
      <div>
        <Text sx={{ fontFamily: "body" }}>Avg Power</Text>
        <Box sx={{ fontFamily: "body", fontSize: "5" }}>
          {powerAnalysis.entire}
        </Box>
      </div>
      <div>
        <Text sx={{ fontFamily: "body" }}>Avg Heart Rate</Text>
        <Box sx={{ fontFamily: "body", fontSize: "5" }}>
          {heartAnalysis.entire}
        </Box>
      </div>
    </div>
  )
}

export default fileName
