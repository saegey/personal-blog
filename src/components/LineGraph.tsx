import { Line } from '@nivo/line'
import { ResponsiveWrapper } from '@nivo/core'
import { useThemeUI } from 'theme-ui'

import { formatSeconds, formatTime } from '../lib/formatters'
import { LineGraphProps } from '../common/types'
import { themeTemplate } from '../lib/graphHelper'

export const LineGraph = ({
  data,
  unit,
  yScaleMin,
  yScaleMax,
  areaBaselineValue,
  axisBottomTickValues,
  axisLeftTickValues,
  curve,
  enableArea = true,
  lineWidth = 1,
  colors,
  markers,
  xScaleType,
}: LineGraphProps) => {
  const { theme } = useThemeUI()
  const themeData = themeTemplate(theme)

  return (
    <Line
      yScale={{
        type: 'linear',
        min: yScaleMin,
        max: yScaleMax,
        stacked: false,
        reverse: false,
      }}
      xScale={{
        type: xScaleType ? xScaleType : 'linear',
        min: 'auto',
        max: 'auto',
      }}
      margin={{
        top: 20,
        right: 10,
        bottom: 25,
        left: 40,
      }}
      curve={curve ? curve : 'natural'}
      pointSize={0}
      useMesh
      enableArea={enableArea}
      enableGridX={false}
      lineWidth={lineWidth}
      areaBaselineValue={areaBaselineValue}
      areaOpacity={1.0}
      colors={colors ? colors : [theme.colors?.graphFill as string]}
      axisBottom={{
        format: formatSeconds,
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "Time",
        legendOffset: 30,
        legendPosition: 'middle',
        tickValues: axisBottomTickValues,
      }}
      enableSlices="x"
      sliceTooltip={({ slice }) => (
        <div
          style={{
            backgroundColor: theme.colors?.text,
            padding: '9px 12px',
            fontFamily: theme.fonts?.body,
            letterSpacing: '.4px',
            borderRadius: '4px',
          }}
        >
          <div
            key={slice.points[0].id}
            style={{
              color: theme.colors?.background,
              padding: '3px 0',
            }}
          >
            <div style={{ fontWeight: 300 }}>
              {formatTime(Number(slice.points[0].data.x))}
            </div>
            <div style={{ fontWeight: 600 }}>
              {slice.points[0].data.y.toLocaleString()} {unit}
            </div>
          </div>
        </div>
      )}
      axisLeft={{
        format: val => `${val}`,
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "Elevation",
        legendOffset: 0,
        legendPosition: 'middle',
        tickValues: axisLeftTickValues,
      }}
      markers={markers}
      theme={themeData}
      layers={[
        'grid',
        'markers',
        'axes',
        'areas',
        'crosshair',
        'lines',
        'slices',
        'mesh',
        'legends',
      ]}
      data={data}
    />
  )
}

const LineGraphResponsive = (props: LineGraphProps) => (
  <ResponsiveWrapper>
    {({ width, height }) => <Line width={width} height={height} {...props} />}
  </ResponsiveWrapper>
)

export default LineGraphResponsive
