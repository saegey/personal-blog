import { ResponsiveLine } from '@nivo/line'
import { useThemeUI, Text } from 'theme-ui'

import { formatSeconds, formatTime } from '../lib/formatters'
import { LineGraphProps } from '../common/types'
import { themeTemplate } from '../lib/graphHelper'

const LineGraph = ({
  data,
  // unit,
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
  legends,
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
        type: xScaleType ? xScaleType : 'linear',
        min: 'auto',
        max: 'auto',
      }}
      margin={{
        top: 20,
        right: 10,
        bottom: 50,
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
      colors={colors ? colors : [theme.colors?.text as string]}
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
            backgroundColor: theme.colors?.primary,
            padding: '9px 12px',
            fontFamily: theme.fonts?.body,
            letterSpacing: '.4px',
            borderRadius: '4px',
          }}
        >
          <div
            key={slice.points[0].id}
            style={{
              color: theme.colors?.muted,
              padding: '3px 0',
            }}
          >
            <div style={{ fontWeight: 300, fontSize: '14px' }}>
              {formatTime(Number(slice.points[0].data.x))}
            </div>
            <div style={{ fontWeight: 600 }}>
              {slice.points.map((p, i) => (
                <Text as="p" key={`tooltip-${i}`} sx={{ fontSize: '12px' }}>
                  {p.data.y} {data.filter(d => d.id === p.serieId)[0].unit}
                </Text>
              ))}
            </div>
          </div>
        </div>
      )}
      legends={legends}
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

export default LineGraph
