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

import ThemeContext from '../context/ThemeContext'
import ViewportProvider, { useViewport } from '../context/ViewportProvider'
import GradeGradient from './GradeGradient'

const gradeToColor = (grade: number) => {
  if (grade > 0 && grade < 4) return 'green'
  if (grade >= 4 && grade < 7) return 'orange'
  if (grade <= 0) return '#D3D3D3'
  if (grade >= 7) return 'red'
}

const NewLineGraph = ({
  data,
  downsampleRate,
  context,
  setMarker,
  elevationToAdd = 0,
  axisLeftTickValues,
  axisXTickValues,
  yMin,
}) => {
  const themeContext = useThemeUI()
  const downSampledData = data
    .filter((d, i: number) => i % downsampleRate === 0)
    .map(d => {
      return {
        ...d,
        distance:
          context.unitOfMeasure === 'imperial'
            ? (d.distance * 0.00062137121212121).toFixed(1)
            : (d.distance / 1000).toFixed(1),
        y: context.unitOfMeasure === 'imperial' ? d.y * 3.28084 : Number(d.y),
        color: gradeToColor(d.grade * 100),
      }
    })

  const xMax = Number(downSampledData[downSampledData.length - 1].distance)
  const yTicks =
    context.unitOfMeasure === 'imperial'
      ? axisLeftTickValues.imperial[0]
      : axisLeftTickValues.metric[0]

  const xTicks =
    context.unitOfMeasure === 'imperial'
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
      <ResponsiveContainer width={'100%'} height="100%">
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
            <CartesianGrid stroke={themeContext.theme.colors?.muted} />
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
              context.unitOfMeasure === 'imperial' ? yMin : yMin * 0.3048,
              `dataMax + ${
                context.unitOfMeasure === 'imperial'
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

const NewLineGraphWrapper = props => {
  return (
    <ThemeContext.Consumer>
      {context => (
        <ViewportProvider>
          <NewLineGraph context={context} {...props} />
        </ViewportProvider>
      )}
    </ThemeContext.Consumer>
  )
}

export default NewLineGraphWrapper
