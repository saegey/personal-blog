/** @jsxImportSource theme-ui */

import React from "react"
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

const StatCard = ({ title, value }) => {
  return (
    <>
      <Text
        sx={{
          fontFamily: "body",
          color: "primary",
          fontWeight: "400",
          letterSpacing: "1px",
          textTransform: "uppercase",
          fontSize: [1],
        }}
      >
        {title}
      </Text>
      <Box
        sx={{
          fontFamily: "body",
          fontSize: ["3", "4", "4"],
          fontWeight: "600",
        }}
      >
        {value}
      </Box>
    </>
  )
}

const fileName = ({
  elevationGain,
  distance,
  stoppedTime,
  elapsedTime,
  heartAnalysis,
  tempAnalysis,
  cadenceAnalysis,
  powerAnalysis,
}) => {
  const powerAnalysisData = powerAnalysis
  const tempAnalysisData = tempAnalysis
  const heartAnalysisData = heartAnalysis
  const cadenceAnalysisData = cadenceAnalysis

  return (
    <>
      <Grid
        gap={2}
        columns={[2, 2, 3]}
        sx={{
          backgroundColor: ["", "blockquoteBg", "blockquoteBg"],
          paddingY: ["0px", "20px", "20px"],
          paddingX: ["0px", "20px", "20px"],
          marginBottom: "20px",
          borderRadius: "4px",
        }}
      >
        <Box>
          <StatCard
            title="Avg Power"
            value={`${powerAnalysisData.entire} watts`}
          />
        </Box>
        <Box>
          <StatCard
            title="Avg Heart Rate"
            value={`${heartAnalysisData.entire} bpm`}
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
            value={tempAnalysisData.entire * (9 / 5) + 32 + "°"}
          />
        </Box>
        <Box sx={{ display: ["none", "none", "inherit"] }}>
          <StatCard
            title="Time Stopped"
            value={new Date(stoppedTime * 1000).toISOString().substr(11, 8)}
          />
        </Box>
        <Box>
          <StatCard
            title="Avg Cadence"
            value={`${cadenceAnalysisData.entire} rpm`}
          />
        </Box>
        <Box>
          <StatCard
            title="Avg Speed"
            value={`${(
              (distance / (elapsedTime.seconds - stoppedTime)) *
              2236.9362920544
            ).toFixed(2)} mph`}
          />
        </Box>
      </Grid>
    </>
  )
}

export default fileName
