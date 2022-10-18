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
  const parsedData = JSON.parse(data.data)
  const { powers } = parsedData.properties.coordinateProperties
  const { theme } = useThemeUI()
  const powerAnalysis = calcBestPowers(
    [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      20,
      25,
      30,
      35,
      40,
      45,
      50,
      55,
      60,
      70,
      80,
      90,
      100,
      110,
      120,
      180,
      240,
      300,
      360,
      420,
      480,
      540,
      600,
      660,
      720,
      780,
      840,
      900,
      960,
      1020,
      1080,
      1140,
      1200,
      1500,
      1800,
      2100,
      2400,
      2700,
      3000,
      3300,
      3600,
      4200,
      4800,
      5400,
      6000,
      6600,
      7200,
      7800,
      8400,
      9000,
      9600,
      10200,
      10800,
      12000,
      13200,
      14400,
      15600,
      16800,
      18000,
      19200,
      20400,
      21600,
      powers.length,
    ],
    powers
  )
  const points = []
  Object.keys(powerAnalysis).forEach(key => {
    if (key === "entire") return
    points.push({ x: key, y: powerAnalysis[key] })
  })
  console.log("pointst", points)

  const formattedData = [
    {
      id: "france",
      color: "hsl(260, 70%, 50%)",
      data: points,
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
