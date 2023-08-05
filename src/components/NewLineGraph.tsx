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

import { useViewport } from '../context/ViewportProvider'
import GradeGradient from './GradeGradient'
import { useUnits } from '../context/UnitProvider'

interface NewLineGraphProps {
  xMax: number
  downSampledData: Array<{
    x: number
    y: number
    distance: number
    color: string
  }>
  setMarker: (arg: any) => { }
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

const NewLineGraph = ({
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
  const hideAxes = width > 640 ? false : true

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
      <ResponsiveContainer width={'100%'} height={"100%"}>
        <AreaChart
          data={downSampledData}
          onMouseMove={e => {
            if (!e || !e.activePayload) {
              setMarker(null)
              return
            }

            setMarker(e.activePayload[0].payload)
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
            type={'number'}
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

export default NewLineGraph
