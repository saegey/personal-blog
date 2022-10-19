import React from "react"
import { render } from "react-dom"
import { ResponsiveLine } from "@nivo/line"
import { useThemeUI } from "theme-ui"
import {
  formatSeconds,
  generateElevatioinTickValues,
  generateTimeTickValues,
} from "../lib/formatters"

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
}

const ElevationGraph = ({ data }) => {
  //console.log(data)
  const { theme } = useThemeUI()
  const graphColor = theme.colors.text
  const yTickValues = generateElevatioinTickValues("y", data, 1000)
  return (
    <ResponsiveLine
      yScale={{
        type: "linear",
        min: Math.min(...data.map(o => o.y)) - 500,
        max: Math.max(...data.map(o => o.y)),
        stacked: true,
        reverse: false,
      }}
      xScale={{
        type: "linear",
        min: "auto",
        max: "auto",
      }}
      margin={{ top: 50, right: 20, bottom: 50, left: 70 }}
      curve="natural"
      pointSize={0}
      useMesh={true}
      enableSlices="x"
      colors={[theme.colors.text]}
      axisBottom={{
        format: formatSeconds,
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: "time",
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
        legend: "elevation",
        legendOffset: -50,
        legendPosition: "middle",
        // tickValues: [0, 1000, 2000],
        tickValues: yTickValues,
      }}
      theme={{
        // background: "white",
        fontFamily: "Inconsolata",
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
              fontFamily: "Inconsolata",
            },
          },
          text: {
            fontSize: 18,
            fill: graphColor,
            fontFamily: "Inconsolata",
          },
          ticks: {
            line: {},
            text: {
              fontSize: 18,
              fill: graphColor,
              fontFamily: "Inconsolata",
            },
          },
        },
        ticks: {
          text: { fontSize: 18, fontFamily: "Inconsolata" },
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
