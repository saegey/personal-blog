import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from 'recharts'
import { Box, useThemeUI } from 'theme-ui'
import React from 'react'

import { useViewport } from './ViewportProvider'
// import GradeGradient from './GradeGradient'
import { useUnits } from '../../context/UnitProvider'
import { buildChartTheme } from './common/chartTheme'

export interface DataPoint {
  x: number
  y: number
  distance: number
  color: string
  grade: number
  i: number
}

interface NewLineGraphProps {
  xMax: number
  downSampledData: Array<DataPoint>
  setMarker: React.Dispatch<React.SetStateAction<DataPoint | undefined>>
  elevationToAdd: number
  axisLeftTickValues: {
    imperial: Array<Array<number>>
    metric: Array<Array<number>>
  }
  axisXTickValues: {
    imperial: Array<Array<number>>
    metric: Array<Array<number>>
  }
  yMin: number
}

const ElevationGraph = ({
  xMax,
  downSampledData,
  setMarker,
  elevationToAdd = 0,
  axisLeftTickValues,
  axisXTickValues,
  yMin,
}: NewLineGraphProps) => {
  const themeContext = useThemeUI()
  const units = useUnits()
  const chartTheme = buildChartTheme(themeContext.theme)
  const yTicks =
    units.unitOfMeasure === 'imperial'
      ? axisLeftTickValues.imperial[0]
      : axisLeftTickValues.metric[0]

  const xTicks =
    units.unitOfMeasure === 'imperial'
      ? axisXTickValues.imperial[0]
      : axisXTickValues.metric[0]

  const { width } = useViewport()
  const hideAxes = width <= 640

  return (
    <Box
      sx={{
        width: '100%',
        height: ['100px', '200px', '250px'],
        borderColor: 'primaryMuted',
        borderStyle: 'solid',
        borderWidth: '1px',
        paddingY: [0, '20px', '20px'],
        paddingRight: [0, '20px', '20px'],
        borderBottomRightRadius: 'lg',
        borderBottomLeftRadius: 'lg',
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={downSampledData}
          onMouseMove={e => {
            if (!e || !e.activeTooltipIndex) {
              setMarker(undefined)
              return
            }

            setMarker(downSampledData[Number(e.activeTooltipIndex)])
          }}
          margin={{ top: 0, right: 0, left: hideAxes ? 0 : 10, bottom: 0 }}
        >

          <Tooltip content={<></>} />
          {/* <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="1" y2="0">
              <GradeGradient data={downSampledData} xMax={xMax} />
            </linearGradient>
          </defs> */}
          <XAxis
            dataKey="distance"
            type="number"
            ticks={xTicks}
            domain={[0, xMax]}
            hide={hideAxes}
            tick={chartTheme.tick}
            axisLine={{ stroke: chartTheme.axisLine.stroke }}
          >
            {width > 640 && (
              <Label
                value={
                  units.distanceUnit.charAt(0).toUpperCase() +
                  units.distanceUnit.slice(1)
                }
                offset={0}
                position="insideBottom"
                {...chartTheme.axisLabel}
              />
            )}
          </XAxis>
          <YAxis
            type="number"
            domain={[
              units.unitOfMeasure === 'imperial' ? yMin : yMin * 0.3048,
              `dataMax + ${
                units.unitOfMeasure === 'imperial'
                  ? elevationToAdd
                  : elevationToAdd * 0.3048
              }`,
            ]}
            ticks={yTicks}
            hide={hideAxes}
            tick={chartTheme.tick}
            axisLine={{ stroke: chartTheme.axisLine.stroke }}
          >
            {width > 640 && (
              <Label
                value={'Elevation'}
                angle={-90}
                position={'insideLeft'}
                {...chartTheme.axisLabel}
              />
            )}
          </YAxis>
          <Area
            type="linear"
            dataKey="y"
            stroke={chartTheme.series.line}
            strokeWidth={hideAxes ? 2 : 2}
            fill={themeContext.theme.colors?.primaryMuted as string}
            fillOpacity={0.1}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default ElevationGraph
