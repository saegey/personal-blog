import React from "react"
import { ResponsiveLine } from "@nivo/line"
import { useThemeUI } from "theme-ui"

import {
  formatSeconds,
  generateElevatioinTickValues,
  generateTimeTickValues,
  formatTime,
} from "../lib/formatters"

const ElevationGraph = ({ data }) => {
  const { theme } = useThemeUI()
  const graphColor = theme.colors.text
  const yTickValues = generateElevatioinTickValues(data, 1000)

  return (
    <ResponsiveLine
      yScale={{
        type: "linear",
        min: Math.min(...data.map(o => o.y)) - 500,
        // min: "auto",
        max: Math.floor(Math.max(...data.map(o => o.y)) / 500) * 500 + 500,
        stacked: false,
        reverse: false,
      }}
      xScale={{
        type: "linear",
        min: "auto",
        max: "auto",
      }}
      margin={{ top: 10, right: 0, bottom: 25, left: 40 }}
      curve="natural"
      pointSize={0}
      useMesh={true}
      enableArea={true}
      areaBaselineValue={Math.min(...data.map(o => o.y)) - 500}
      areaOpacity={0.3}
      colors={[theme.colors.text]}
      axisBottom={{
        format: formatSeconds,
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "Time",
        legendOffset: 30,
        legendPosition: "middle",
        // tickCount: 5,
        tickValues: generateTimeTickValues("x", data, 3600),
      }}
      enableSlices="x"
      sliceTooltip={({ slice }) => {
        return (
          <div
            style={{
              background: theme.colors.text,
              padding: "9px 12px",
              fontFamily: theme.fonts.body,
              letterSpacing: ".4px",
              borderRadius: "4px",
            }}
          >
            {slice.points.map(point => {
              return (
                <div
                  key={point.id}
                  style={{
                    color: theme.colors.background,
                    padding: "3px 0",
                  }}
                >
                  <div style={{ fontWeight: 300 }}>
                    {formatTime(point.data.x)}
                  </div>
                  <div style={{ fontWeight: 600 }}>
                    {point.data.y.toLocaleString()} ft
                  </div>
                </div>
              )
            })}
          </div>
        )
      }}
      axisLeft={{
        format: val => `${val / 1000}k`,
        orient: "left",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        tickCount: 2,
        // legend: "Elevation",
        legendOffset: 0,
        legendPosition: "middle",
        // tickValues: [0, 1000, 2000],
        tickValues: yTickValues,
      }}
      theme={{
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
            zIndex: -100000,
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
