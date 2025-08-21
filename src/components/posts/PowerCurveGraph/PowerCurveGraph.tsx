import { Box, Text, useThemeUI } from 'theme-ui'
import { useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
  ReferenceLine,
  Label,
} from 'recharts'
import { buildChartTheme } from '../common/chartTheme'

import { GraphProps } from '../../../common/types'
import MaximizedContainer from '../common/MaximizedContainer'
import ExpandableCard from '../common/ExpandableCard'
import { formatSeconds, formatTime } from '../../../lib/formatters'
import { useViewport } from '../ViewportProvider'

interface PowerCurveGraphProps extends GraphProps {
  yAxes?: Array<Array<Number>>
  xAxes?: Array<Array<Number>>
  yScaleMax?: number
  ftp: number
  title: string
  xTicks?: number[]
  xScale?: 'log' | 'linear'
}

const PowerCurveGraph = ({
  data,
  ftp,
  isMaximized = false,
  xTicks,
  xScale = 'log',
  yScaleMax,
}: PowerCurveGraphProps) => {
  const ticks = xTicks ?? [1, 2, 3, 4, 5, 10, 60, 300, 600, 1200, 3600]
  const { theme } = useThemeUI()
  const { width } = useViewport()

  const chartTheme = buildChartTheme(theme)

  return (
    <Box
      sx={{
        height: isMaximized ? '90%' : ['200px', '250px', '300px'],
        maxWidth: isMaximized ? '100%' : '690px',
        mr: 'auto',
        ml: 'auto',
      }}
    >
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <LineChart
          data={data as unknown as Array<{ x: number; y: number }>}
          margin={{
            top: 10,
            right: 0,
            left: width > 640 ? 5 : -25,
            bottom: width > 640 ? 5 : -5,
          }}
        >
          <Line
            dataKey="y"
            dot={false}
            strokeWidth={2}
            stroke={chartTheme.series.line}
          />
          <YAxis
            type="number"
            domain={[0, yScaleMax ?? 'auto']}
            tick={chartTheme.tick}
            tickLine={chartTheme.axisLine}
            axisLine={chartTheme.axisLine}
          >
            {width > 640 && (
              <Label
                value="Power"
                position="insideLeft"
                angle={-90}
                {...chartTheme.axisLabel}
              />
            )}
          </YAxis>
          <XAxis
            dataKey="x"
            scale={xScale}
            ticks={ticks}
            tickFormatter={formatSeconds}
            tick={chartTheme.tick}
            tickLine={chartTheme.axisLine}
            axisLine={chartTheme.axisLine}
          >
            {width > 640 && (
              <Label
                value="Time"
                offset={0}
                position="insideBottom"
                {...chartTheme.axisLabel}
              />
            )}
          </XAxis>
          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length < 1) return
              // console.log(payload[0])
              return (
                <Box sx={chartTheme.tooltip.box}>
                  <Text as="p" sx={chartTheme.tooltip.text}>
                    {formatTime(payload[0].payload.x)}
                  </Text>
                  <Text as="p" sx={chartTheme.tooltip.valueText}>
                    {payload[0].payload.y} watts
                  </Text>
                </Box>
              )
            }}
          />
          <ReferenceLine
            y={ftp}
            stroke={chartTheme.reference.line}
            // label="FTP"
            strokeDasharray="3 3"
          >
            <Label
              value="FTP"
              offset={10}
              position="insideBottomLeft"
              fill={chartTheme.labelFill}
            />
          </ReferenceLine>
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}

const PowerCurveGraphWrapper = (props: PowerCurveGraphProps) => {
  const [isMax, setMax] = useState<boolean>(false)

  return (
    <>
      {isMax && (
        <MaximizedContainer title={'Power Curve'} openModal={setMax}>
          <Box sx={{ height: ['250px', '500px'], width: ['100%', '100%'] }}>
            <PowerCurveGraph {...props} isMaximized={isMax} />
          </Box>
        </MaximizedContainer>
      )}
      <ExpandableCard title={props.title} openModal={setMax}>
        <PowerCurveGraph {...props} />
      </ExpandableCard>
    </>
  )
}
export default PowerCurveGraphWrapper
