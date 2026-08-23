import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from 'recharts'
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
  const units = useUnits()
  const chartTheme = buildChartTheme()
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
    <div className="h-48 w-full border-x border-b border-line px-0 pt-4 sm:h-72 sm:px-4 sm:pt-5">
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
            fill="#141414"
            fillOpacity={0.08}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ElevationGraph
