/** @jsxImportSource theme-ui */

import React from "react"
import calcBestPowers from "../lib/gpxDemo"
import { Text, Box, Grid } from "theme-ui"
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
  return elevation
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

const StatCard = ({ title, value }) => {
  return (
    <>
      <Text sx={{ fontFamily: "body" }}>{title}</Text>
      <Box
        sx={{
          fontFamily: "body",
          fontSize: ["3", "4", "4"],
          fontWeight: "700",
        }}
      >
        {value}
      </Box>
    </>
  )
}

const fileName = data => {
  const parsedData = JSON.parse(data.data)
  const { powers, heart, times, atemps, cads } =
    parsedData.properties.coordinateProperties

  const { coordinates } = parsedData.geometry
  const elevationGain = calcElevationGain(coordinates)
  const defaultTimeWindows = [5, 10, 15, 30, 60, 120, 300, 600]

  const powerAnalysis = calcBestPowers(defaultTimeWindows, powers)
  const tempAnalysis = calcBestPowers(defaultTimeWindows, atemps)
  const heartAnalysis = calcBestPowers(defaultTimeWindows, heart)
  const cadenceAnalysis = calcBestPowers(defaultTimeWindows, cads)

  const stoppageTime = calcStoppage(coordinates, times)
  const distance = length(parsedData)

  const elapsedTime = dateDiff(new Date(times[0]), new Date(times.at(-1)))

  // {"5":543,"10":446,"15":402,"30":375,"60":309,"120":298,"300":288,"600":282,"entire":171}
  return (
    <>
      <Grid
        gap={2}
        columns={[2, 2, 3]}
        sx={{
          backgroundColor: "blockquoteBg",
          paddingY: "20px",
          paddingX: "20px",
          marginBottom: "20px",
          borderRadius: "4px",
        }}
      >
        <Box>
          <StatCard title="Avg Power" value={`${powerAnalysis.entire} watts`} />
        </Box>
        <Box>
          <StatCard
            title="Avg Heart Rate"
            value={`${heartAnalysis.entire} bpm`}
          />
        </Box>
        <Box>
          <StatCard
            title="Distance"
            value={`${(distance * 0.621371).toFixed()} miles`}
          />
        </Box>
        <Box>
          <StatCard
            title="Elapsed Time"
            value={`${new Date(elapsedTime.seconds * 1000)
              .toISOString()
              .substr(11, 8)}`}
          />
        </Box>
        <Box>
          <StatCard
            title="Elevation Gain"
            value={`${(elevationGain * 3.280839895).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })} ft`}
          />
        </Box>
        <Box>
          <StatCard
            title="Average Temp"
            value={tempAnalysis.entire * (9 / 5) + 32 + "°"}
          />
        </Box>
        <Box>
          <StatCard
            title="Time Stopped"
            value={new Date(stoppageTime * 1000).toISOString().substr(11, 8)}
          />
        </Box>
        <Box>
          <StatCard
            title="Avg Cadence"
            value={`${cadenceAnalysis.entire} rpm`}
          />
        </Box>
        <Box>
          <StatCard
            title="Avg Speed"
            value={`${(
              (distance / (elapsedTime.seconds - stoppageTime)) *
              2236.9362920544
            ).toFixed(2)} mph`}
          />
        </Box>
      </Grid>
    </>
  )
}

export default fileName
