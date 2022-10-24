import React from "react"
import { ResponsiveLine } from "@nivo/line"
import { useThemeUI } from "theme-ui"

import {
  formatSeconds,
  generateElevatioinTickValues,
  generateTimeTickValues,
} from "../lib/formatters"

const ElevationGraph = ({ data }) => {
  const { theme } = useThemeUI()
  const graphColor = theme.colors.text
  const yTickValues = generateElevatioinTickValues("y", data, 1000)

  return (
    <ResponsiveLine
      yScale={{
        type: "linear",
        min: Math.min(...data.map(o => o.y)) - 500,
        // min: "auto",
        max: Math.max(...data.map(o => o.y)),
        stacked: false,
        reverse: false,
      }}
      xScale={{
        type: "linear",
        min: "auto",
        max: "auto",
      }}
      margin={{ top: 50, right: 20, bottom: 50, left: 45 }}
      curve="natural"
      pointSize={0}
      useMesh={true}
      enableArea={true}
      areaBaselineValue={Math.min(...data.map(o => o.y)) - 500}
      // enableSlices="x"
      colors={[theme.colors.text]}
      axisBottom={{
        format: formatSeconds,
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Time",
        legendOffset: 30,
        legendPosition: "middle",
        // tickCount: 5,
        tickValues: generateTimeTickValues("x", data, 3600),
      }}
      axisLeft={{
        orient: "left",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        // tickCount: 3,
        // legend: "Elevation",
        legendOffset: -50,
        legendPosition: "middle",
        // tickValues: [0, 1000, 2000],
        tickValues: yTickValues,
      }}
      theme={{
        // background: "white",
        fontFamily: theme.fonts.body,
        fontSize: 15,
        tooltip: {
          container: {
            background: theme.colors.background,
            color: theme.colors.text,
            fontSize: 12,
          },
          basic: {},
          chip: {},
          table: {},
          tableCell: {},
          tableCellValue: {},
        },
        grid: {
          line: {
            stroke: graphColor,
            strokeWidth: 1,
          },
        },
        axis: {
          domain: {
            line: {
              stroke: graphColor,
              strokeWidth: 1,
            },
          },
          legend: {
            text: {
              fontSize: 15,
              fill: graphColor,
            },
          },
          ticks: {
            line: {
              stroke: graphColor,
              strokeWidth: 1,
            },
            text: {
              fontSize: 14,
              fill: graphColor,
            },
          },
        },
        legends: {
          title: {
            text: {
              fontSize: 18,
              fill: graphColor,
              fontFamily: theme.fonts.body,
            },
          },
          text: {
            fontSize: 18,
            fill: graphColor,
            fontFamily: theme.fonts.body,
          },
          ticks: {
            line: {},
            text: {
              fontSize: 18,
              fill: graphColor,
              fontFamily: theme.fonts.body,
            },
          },
        },
        ticks: {
          text: { fontSize: 18, fontFamily: theme.fonts.body },
        },
      }}
      // layers={['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends']}
      layers={[
        null,
        "markers",
        "axes",
        "areas",
        "crosshair",
        "lines",
        null,
        "slices",
        "mesh",
        "legends",
      ]}
      data={[
        {
          id: "elevation",
          data: data,
        },
      ]}
    />
  )
}

export default ElevationGraph
