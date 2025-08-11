import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { Box, useThemeUI } from 'theme-ui'
import React from 'react'

import { useViewport } from './ViewportProvider'
import GradeGradient from './GradeGradient'
import { useUnits } from './UnitProvider'

export interface DataPoint {
  x: number
  y: number
  distance: number
  color: string
  grade: number
}

interface NewLineGraphProps {
  xMax: number
  downSampledData: Array<DataPoint>
  // setMarker: (arg: { x: string }) => {};
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

  const yTicks =
    units.unitOfMeasure === 'imperial'
      ? axisLeftTickValues.imperial[0]
      : axisLeftTickValues.metric[0]

  const xTicks =
    units.unitOfMeasure === 'imperial'
      ? axisXTickValues.imperial[0]
      : axisXTickValues.metric[0]

  const { width } = useViewport()
  const hideAxes = width > 640

  return (
    <Box
      sx={{
        width: '100%',
        height: ['100px', '200px', '250px'],
        borderColor: 'mutedAccent',
        borderStyle: 'solid',
        borderWidth: '1px',
        paddingY: [0, '20px', '20px'],
        paddingRight: [0, '20px', '20px'],
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={downSampledData}
          onMouseMove={e => {
            console.log(e)
            if (!e || !e.activeTooltipIndex) {
              setMarker(undefined)
              return
            }

            setMarker(downSampledData[Number(e.activeTooltipIndex)])
          }}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          {!hideAxes && (
            <CartesianGrid stroke={String(themeContext.theme.colors?.muted)} />
          )}

          <Tooltip content={<></>} />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="1" y2="0">
              <GradeGradient data={downSampledData} xMax={xMax} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="distance"
            type="number"
            ticks={xTicks}
            domain={[0, xMax]}
            hide={hideAxes}
          />
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
          />
          <Area
            type="basisOpen"
            dataKey="y"
            stroke="url(#splitColor)"
            strokeWidth={3}
            fill="gray"
            fillOpacity={0.1}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default ElevationGraph
