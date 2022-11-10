import { ResponsiveLine } from '@nivo/line'
import { useThemeUI } from 'theme-ui'

import { formatSeconds, formatTime } from '../lib/formatters'
import { LineGraphProps } from '../common/types'
import { themeTemplate } from '../lib/graphHelper'

const LineGraph = ({
  data,
  unit,
  yScaleMin,
  yScaleMax,
  areaBaselineValue,
  axisBottomTickValues,
  axisLeftTickValues,
  curve,
  enableArea = true,
}: LineGraphProps) => {
  const { theme } = useThemeUI()
  const themeData = themeTemplate(theme)

  return (
    <ResponsiveLine
      yScale={{
        type: 'linear',
        min: yScaleMin,
        max: yScaleMax,
        stacked: false,
        reverse: false,
      }}
      xScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
      }}
      margin={{
        top: 10,
        right: 0,
        bottom: 25,
        left: 40,
      }}
      curve={curve ? curve : 'natural'}
      pointSize={0}
      useMesh
      enableArea={enableArea}
      lineWidth={1}
      areaBaselineValue={areaBaselineValue}
      areaOpacity={1.0}
      colors={[theme.colors?.graphFill as string]}
      axisBottom={{
        format: formatSeconds,
        // orient: 'bottom',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "Time",
        legendOffset: 30,
        legendPosition: 'middle',
        // tickCount: 5,
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
          {slice.points.map(point => (
            <div
              key={point.id}
              style={{
                color: theme.colors?.background,
                padding: '3px 0',
              }}
            >
              <div style={{ fontWeight: 300 }}>
                {formatTime(Number(point.data.x))}
              </div>
              <div style={{ fontWeight: 600 }}>
                {point.data.y.toLocaleString()} {unit}
              </div>
            </div>
          ))}
        </div>
      )}
      axisLeft={{
        format: val => `${val}`,
        // orient: 'left',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        // tickCount: 2,
        // legend: "Elevation",
        legendOffset: 0,
        legendPosition: 'middle',
        // tickValues: [0, 1000, 2000],
        tickValues: axisLeftTickValues,
      }}
      theme={themeData}
      layers={[
        'grid',
        'markers',
        'axes',
        'areas',
        'crosshair',
        'lines',
        'points',
        'slices',
        'mesh',
        'legends',
      ]}
      data={data}
    />
  )
}

export default LineGraph
