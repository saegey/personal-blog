// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import * as React from "react"
import { ResponsiveLine } from "@nivo/line"
import { useThemeUI } from "theme-ui"
import calcBestPowers from "../lib/gpxDemo"
import { colors } from "../theme"

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const formatSeconds = value => {
  if (value >= 3600) {
    return `${value / 60 / 60}h`
  } else if (value >= 60) {
    return `${value / 60}m`
  }

  return `${value}s`
}

const formatTime = value => {
  if (value < 3600) {
    return new Date(value * 1000).toISOString().substr(14, 5)
  }
  return new Date(value * 1000).toISOString().substr(11, 8)
}

const MyResponsiveLine = data => {
  const { theme } = useThemeUI()
  const powerCurve = JSON.parse(data.data)

  const formattedData = [
    {
      id: "power",
      color: "hsl(260, 70%, 50%)",
      data: powerCurve,
    },
  ]

  const graphColor = theme.colors.text

  return (
    // <div style={{ fontFamily: "Inconsolata" }}>
    <ResponsiveLine
      data={formattedData}
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
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
              borderColor: "red",
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
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: formatSeconds,
        orient: "bottom",
        tickSize: 2,
        tickPadding: 5,
        tickRotation: 0,
        legend: "time",
        legendOffset: 20,
        legendPosition: "middle",
        tickCount: 100,
        tickValues: [15, 60, 600, 3600, 10800, 21600],
      }}
      // gridXValues={[15, 100, 1000, 1000]}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickCount: 3,
        legend: "watts",
        legendOffset: -40,
        legendPosition: "middle",
        tickValues: [100, 200, 300, 400, 500, 600, 700],
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
        // background: "red",
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
        annotations: {
          text: {
            fontSize: 13,
            fill: "blue",
            outlineWidth: 2,
            outlineColor: "red",
            outlineOpacity: 1,
          },
          link: {
            stroke: "#000000",
            strokeWidth: 1,
            outlineWidth: 2,
            outlineColor: "red",
            outlineOpacity: 1,
          },
          outline: {
            stroke: "#000000",
            strokeWidth: 2,
            outlineWidth: 2,
            outlineColor: "red",
            outlineOpacity: 1,
          },
          symbol: {
            fill: "#000000",
            outlineWidth: 2,
            outlineColor: "red",
            outlineOpacity: 1,
          },
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
      legends={[]}
    />
    // </div>
  )
}
export default MyResponsiveLine
