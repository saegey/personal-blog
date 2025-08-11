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
import { scaleLog } from 'd3-scale'

import { GraphProps } from '../../../common/types'
import MaximizedContainer from '../common/MaximizedContainer'
import ExpandableCard from '../common/ExpandableCard'
import { formatSeconds, formatTime } from '../../../lib/formatters'


interface PowerCurveGraphProps extends GraphProps {
  yAxes: Array<Array<Number>>
  xAxes: Array<Array<Number>>
  yScaleMax: number
  ftp: number
  title: string
}

const PowerCurveGraph = ({
  data,
  ftp,
  isMaximized = false,
}: PowerCurveGraphProps) => {
  const ticks = [1, 2, 3, 4, 5, 10, 60, 300, 600, 1200, 3600]
  const { theme } = useThemeUI()

  return (
    <Box
      sx={{
        height: isMaximized ? '90%' : ['200px', '250px', '300px'],
        maxWidth: isMaximized ? '100%' : '690px',
        marginRight: 'auto',
        marginLeft: 'auto',
      }}
    >
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <LineChart data={data}>
          <Line dataKey="y" dot={false} strokeWidth={2} />
          <YAxis
            type="number"
            tick={{ fill: String(theme.colors?.accent), fontSize: '14px' }}
            tickLine={{ stroke: String(theme.colors?.accent) }}
            axisLine={{ stroke: String(theme.colors?.accent) }}
          >
            <Label value="Time" offset={0} position="insideBottom" />
          </YAxis>
          <XAxis
            dataKey="x"
            scale={"log"}
            ticks={ticks}
            tickFormatter={formatSeconds}
            tick={{ fill: String(theme.colors?.accent), fontSize: '14px' }}
            tickLine={{ stroke: String(theme.colors?.accent) }}
            axisLine={{ stroke: String(theme.colors?.accent) }}
          >
            <Label value="Time" offset={0} position="insideBottom" />
          </XAxis>
          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length < 1) return
              // console.log(payload[0])
              return (
                <Box
                  sx={{
                    backgroundColor: theme.colors?.mutedAccent,
                    padding: '5px',
                    borderRadius: '5px',
                  }}
                >
                  <Text as="p" sx={{ fontSize: '13px' }}>
                    {formatTime(payload[0].payload.x)}
                  </Text>
                  <Text as="p" sx={{ fontSize: '13px' }}>
                    {payload[0].payload.y} watts
                  </Text>
                </Box>
              )
            }}
          />
          <ReferenceLine
            y={ftp}
            stroke="gray"
            // label="FTP"
            strokeDasharray="3 3"
          >
            <Label value="FTP" offset={10} position="insideBottomLeft" />
          </ReferenceLine>
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}

const PowerCurveGraphWrapper = (props: PowerCurveGraphProps) => {
  const [isMax, setMax] = useState()

  return (
    <>
      {isMax && (
        <MaximizedContainer title={props.title} openModal={setMax}>
          <PowerCurveGraph isMaximized={true} {...props} />
        </MaximizedContainer>
      )}
      <ExpandableCard
        title={props.title}
        openModal={setMax}
        expandableOnMobile={false}
      >
        <PowerCurveGraph {...props} />
      </ExpandableCard>
    </>
  )
}
export default PowerCurveGraphWrapper
