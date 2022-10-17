// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import * as React from "react"
import { ResponsiveLine } from "@nivo/line"
import { useThemeUI } from "theme-ui"

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = () => {
  const { theme } = useThemeUI()

  const data = [
    {
      id: "france",
      color: "hsl(260, 70%, 50%)",
      data: [
        {
          x: "10",
          y: 750,
        },
        {
          x: "20",
          y: 600,
        },
        {
          x: "30",
          y: 580,
        },
        {
          x: "60",
          y: 500,
        },
        {
          x: "120",
          y: 400,
        },
        {
          x: "300",
          y: 370,
        },
        {
          x: "600",
          y: 330,
        },
        {
          x: "900",
          y: 300,
        },
        {
          x: "1200",
          y: 280,
        },
      ],
    },
  ]

  const graphColor = theme.colors.primary

  return (
    // <div style={{ fontFamily: "Inconsolata" }}>
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "0",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="basis"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "time",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "watts",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      colors={[theme.colors.text, theme.colors.headerForeground]}
      pointSize={1}
      pointColor={{ theme: "background" }}
      // pointBorderWidth={2}
      // pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
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
              fontSize: 15,
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
