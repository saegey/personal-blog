import { ResponsiveLine } from '@nivo/line'
import { useThemeUI, Box } from 'theme-ui'
import { useResponsiveValue } from '@theme-ui/match-media'

import { formatSeconds, formatTime } from '../lib/formatters'
import { GraphProps } from '../common/types'

const PowerCurveGraph = ({ data, unit }: GraphProps) => {
  const { theme } = useThemeUI()
  const powerCurve = data

  const graphColor = theme.colors.text

  const yAxes = useResponsiveValue([
    [100, 300, 500, 700],
    [100, 200, 300, 400, 500, 600, 700],
    [100, 200, 300, 400, 500, 600, 700],
  ])

  return (
    <ResponsiveLine
      data={[
        {
          id: 'power',
          color: 'hsl(260, 70%, 50%)',
          data: powerCurve,
        },
      ]}
      enableArea={true}
      margin={{ top: 0, right: 0, bottom: 25, left: 25 }}
      xScale={{
        type: 'log',
        base: 2,
        // max: 16384,
        // max: Math.max(...powerCurve.map(o => o.x)),
      }}
      yScale={{
        type: 'linear',
        min: '0',
        max: Math.max(...powerCurve.map(o => o.y)) + 50,
        stacked: true,
        reverse: false,
      }}
      sliceTooltip={({ slice }) => {
        return (
          <div
            style={{
              background: theme.colors.text,
              padding: '9px 12px',
              fontFamily: theme.fonts.body,
              letterSpacing: '.4px',
              borderRadius: '4px',
            }}
          >
            {slice.points.map(point => {
              return (
                <div
                  key={point.id}
                  style={{
                    color: theme.colors.background,
                    padding: '3px 0',
                  }}
                >
                  <div style={{ fontWeight: 300 }}>
                    {formatTime(point.data.x)}
                  </div>
                  <div style={{ fontWeight: 600 }}>
                    {point.data.yFormatted} watts
                  </div>
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
        orient: 'bottom',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "TIME",
        legendOffset: 35,
        legendPosition: 'middle',
        // tickCount: 100,
        tickValues: [5, 15, 60, 300, 1200, 3600, 10800],
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        tickCount: 3,
        // legend: "WATTS",
        legendOffset: -40,
        legendPosition: 'middle',
        tickValues: yAxes,
      }}
      colors={[theme.colors.text, theme.colors.headerForeground]}
      pointSize={0}
      pointColor={{ theme: 'background' }}
      enableGridX={false}
      enableGridY={false}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
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
              letterSpacing: '.1px',
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

const PowerCurveGraphWrapper = ({ data, unit }: GraphProps) => {
  return (
    <Box sx={{ height: ['200px', '400px', '400px'] }}>
      <PowerCurveGraph data={data} unit={unit} />
    </Box>
  )
}
export default PowerCurveGraphWrapper
