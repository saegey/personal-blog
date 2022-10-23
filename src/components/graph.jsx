// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import * as React from "react"
import { ResponsiveLine } from "@nivo/line"
import { useThemeUI } from "theme-ui"
import { useResponsiveValue } from "@theme-ui/match-media"

import { formatSeconds, formatTime } from "../lib/formatters"

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveLine = data => {
  const { theme } = useThemeUI()
  const powerCurve = data.data

  const graphColor = theme.colors.text
  const yAxes = useResponsiveValue([
    [100, 300, 500, 700],
    [100, 200, 300, 400, 500, 600, 700],
    [100, 200, 300, 400, 500, 600, 700],
  ])

  return (
    // <div style={{ fontFamily: "Inconsolata" }}>
    <ResponsiveLine
      data={[
        {
          id: "power",
          color: "hsl(260, 70%, 50%)",
          data: powerCurve,
        },
      ]}
      margin={{ top: 50, right: 0, bottom: 50, left: 45 }}
      xScale={{
        type: "log",
        base: 2,
        max: 20000,
      }}
      yScale={{
        type: "linear",
        min: "0",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      sliceTooltip={({ slice }) => {
        return (
          <div
            style={{
              background: theme.colors.headerColor,
              padding: "9px 12px",
            }}
          >
            {slice.points.map(point => {
              return (
                <div
                  key={point.id}
                  style={{
                    color: theme.colors.text,
                    padding: "3px 0",
                  }}
                >
                  <div>{formatTime(point.data.x)}</div>
                  {point.data.yFormatted} watts
                </div>
              )
            })}
          </div>
        )
      }}
      // yFormat=" >-.2f"
      curve="basis"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: formatSeconds,
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: "TIME",
        legendOffset: 35,
        legendPosition: "middle",
        tickCount: 100,
        tickValues: [15, 60, 300, 1200, 3600, 10800, 21600],
      }}
      axisLeft={{
        orient: "left",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        tickCount: 3,
        legend: "WATTS",
        legendOffset: -40,
        legendPosition: "middle",
        tickValues: yAxes,
      }}
      colors={[theme.colors.text, theme.colors.headerForeground]}
      pointSize={0}
      pointColor={{ theme: "background" }}
      enableGridX={false}
      enableGridY={false}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      enableSlices="x"
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
      legends={[]}
    />
  )
}
export default MyResponsiveLine
