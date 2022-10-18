/** @jsxImportSource theme-ui */

import React from "react"
import calcBestPowers from "../lib/gpxDemo"
import { Text, Box } from "theme-ui"
import length from "@turf/length"

function dateDiff(dateFrom, dateTo) {
  var seconds = -1
  if (dateFrom != undefined && dateTo != undefined) {
    var dif = dateFrom.getTime() - dateTo.getTime()
    seconds = Math.abs(dif / 1000)
  }

  return {
    seconds: seconds,
    minutes: seconds / 60,
    hours: seconds / 3600,
    days: seconds / (3600 * 24),
    // formatted: new Date(seconds * 1000).toISOString().substr(11, 8),
  }
}

const calcElevationGain = coordinates => {
  let elevation = 0
  coordinates.forEach((coord, index) => {
    if (index === coordinates.length - 1) return // stop 1 point early since comparison requires 2 points
    const elevationDifference =
      coordinates[index + 1][2] - coordinates[index][2]
    if (elevationDifference > 0) elevation += elevationDifference
  })
  return elevation * 3.280839895
  // const elevationDifferences = []
  // for (var i = 0; i < coordinates.length - 1; i++) {
  //   const diff = coordinates[i + 1][2] - coordinates[i][2]
  //   if (diff > 0) {
  //     elevationDifferences.push(diff)
  //   }
  // }

  // return elevationDifferences.reduce((pv, cv) => pv + cv, 0)
}

const calcStoppage = (coordinates, times) => {
  let seconds = 0
  // coordinates.forEach((coord, index) => {
  //   if (index === coordinates.length - 1 || index === 0) return // stop 1 point early since comparison requires 2 points

  //   if (
  //     coord[0] === coordinates[index - 1][0] &&
  //     coord[1] === coordinates[index - 1][1]
  //   ) {
  //     // console.log(coord[0], coordinates[index - 1][0])
  //     // console.log(coord[1], coordinates[index - 1][1])
  //     // console.log(times[index], times[index - 1])
  //     seconds += 1
  //   }
  // })

  times.forEach((time, index) => {
    if (index === coordinates.length - 1 || index === 0) return
    const output = dateDiff(new Date(time), new Date(times[index + 1]))
    if (output.seconds > 1) {
      seconds += output.seconds
      // console.log(new Date(time), new Date(times[index + 1]), output.seconds)
    }
  })

  return seconds
}

const fileName = data => {
  const parsedData = JSON.parse(data.data)
  const { powers, heart, times, atemps, cads } =
    parsedData.properties.coordinateProperties

  const { coordinates } = parsedData.geometry
  const elevationGain = calcElevationGain(coordinates)

  const powerAnalysis = calcBestPowers(
    [5, 10, 15, 30, 60, 120, 300, 600],
    powers
  )
  const tempAnalysis = calcBestPowers(
    [5, 10, 15, 30, 60, 120, 300, 600],
    atemps
  )

  const heartAnalysis = calcBestPowers(
    [5, 10, 15, 30, 60, 120, 300, 600],
    heart
  )

  const cadenceAnalysis = calcBestPowers(
    [5, 10, 15, 30, 60, 120, 300, 600],
    cads
  )

  const stoppageTime = calcStoppage(coordinates, times)
  console.log(stoppageTime)

  const distance = length(parsedData)

  const elapsedTime = dateDiff(new Date(times[0]), new Date(times.at(-1)))

  // {"5":543,"10":446,"15":402,"30":375,"60":309,"120":298,"300":288,"600":282,"entire":171}
  return (
    <>
      <div
        sx={{
          marginY: "20px",
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: `repeat(auto-fit, minmax(128px, 1fr))`,
        }}
      >
        <div>
          <Text sx={{ fontFamily: "body" }}>Avg Power</Text>
          <Box sx={{ fontFamily: "body", fontSize: "5", fontWeight: "700" }}>
            {powerAnalysis.entire} watts
          </Box>
        </div>
        <div>
          <Text sx={{ fontFamily: "body" }}>Avg Heart Rate</Text>
          <Box sx={{ fontFamily: "body", fontSize: "5", fontWeight: "700" }}>
            {heartAnalysis.entire} bpm
          </Box>
        </div>
        <div>
          <Text sx={{ fontFamily: "body" }}>Distance</Text>
          <Box sx={{ fontFamily: "body", fontSize: "5", fontWeight: "700" }}>
            {(distance * 0.621371).toFixed()} miles
          </Box>
        </div>
      </div>
      <div
        sx={{
          marginY: "20px",
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: `repeat(auto-fit, minmax(128px, 1fr))`,
        }}
      >
        <div>
          <Text sx={{ fontFamily: "body" }}>Elapsed Time</Text>
          <Box sx={{ fontFamily: "body", fontSize: "4", fontWeight: "700" }}>
            {new Date(elapsedTime.seconds * 1000).toISOString().substr(11, 8)}
          </Box>
        </div>
        <div>
          <Text sx={{ fontFamily: "body" }}>Elevation Gain</Text>
          <Box sx={{ fontFamily: "body", fontSize: "4", fontWeight: "700" }}>
            {elevationGain.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}{" "}
            ft
          </Box>
        </div>
        <div>
          <Text sx={{ fontFamily: "body" }}>Average Temp</Text>
          <Box sx={{ fontFamily: "body", fontSize: "4", fontWeight: "700" }}>
            {tempAnalysis.entire * (9 / 5) + 32}&#176;
          </Box>
        </div>
      </div>
      <div
        sx={{
          marginY: "20px",
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: `repeat(auto-fit, minmax(128px, 1fr))`,
        }}
      >
        <div>
          <Text sx={{ fontFamily: "body" }}>Stoppage Time</Text>
          <Box sx={{ fontFamily: "body", fontSize: "4", fontWeight: "700" }}>
            {new Date(stoppageTime * 1000).toISOString().substr(11, 8)}
          </Box>
        </div>
        <div>
          <Text sx={{ fontFamily: "body" }}>Avg Cadence</Text>
          <Box sx={{ fontFamily: "body", fontSize: "4", fontWeight: "700" }}>
            {cadenceAnalysis.entire} rpm
          </Box>
        </div>
        <div>
          <Text sx={{ fontFamily: "body" }}>Avg Speed</Text>
          <Box sx={{ fontFamily: "body", fontSize: "4", fontWeight: "700" }}>
            {(
              (distance / (elapsedTime.seconds - stoppageTime)) *
              2236.9362920544
            ).toFixed(2)}{" "}
            mph
          </Box>
        </div>
      </div>
    </>
  )
}

export default fileName
