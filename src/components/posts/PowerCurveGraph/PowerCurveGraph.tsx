import { Box, Text } from 'theme-ui'
import * as React from 'react'
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
// import { scaleLog } from 'd3-scale'

// import { GraphProps } from '../../../common/types'
// import MaximizedContainer from '../common/MaximizedContainer'
// import ExpandableCard from '../common/ExpandableCard'
// import { formatSeconds, formatTime } from '../../../lib/formatters'

export interface Coordinate {
  x: number
  y: number
}

export const formatSeconds = (value: number) => {
  if (value >= 3600) {
    return `${(value / 60 / 60).toFixed(0)}h`
  } else if (value >= 60) {
    return `${(value / 60).toFixed(0)}m`
  }

  return `${value}s`
}

export const formatTime = (value: number) => {
  if (value < 3600) {
    return new Date(value * 1000).toISOString().substr(14, 5).replace(/^0+/, '')
  }
  return new Date(value * 1000).toISOString().substr(11, 8).replace(/^0+/, '')
}

// const scale = scaleLog().base(Math.E)

interface PowerCurveGraphProps {
  // yScaleMax: number
  data: Array<Coordinate>
  ftp: number
  // isMaximized: boolean
  // title: string
}

const PowerCurveGraph = ({
  data,
  ftp,
}: // isMaximized = false,
PowerCurveGraphProps) => {
  const ticks = [1, 2, 3, 4, 5, 10, 60, 300, 600, 1200, 3600]
  const accentColor = 'black'
  const mutedAccent = 'gray'

  return (
    // <Box
    //   sx={{
    //     height: isMaximized ? '90%' : ['200px', '250px', '300px'],
    //     maxWidth: isMaximized ? '100%' : '690px',
    //     marginRight: 'auto',
    //     marginLeft: 'auto',
    //   }}
    // >
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart data={data}>
        <Line dataKey="y" dot={false} strokeWidth={2} />
        <YAxis
          type="number"
          tick={{
            fill: accentColor,
            fontSize: '14px',
          }}
          tickLine={{
            stroke: accentColor,
          }}
          axisLine={{
            stroke: accentColor,
          }}
        />
        <XAxis
          dataKey="x"
          scale={'log'}
          domain={[1, 'dataMax']}
          ticks={ticks}
          tickFormatter={formatSeconds}
          tick={{ fill: accentColor, fontSize: '14px' }}
          tickLine={{ stroke: accentColor }}
          axisLine={{ stroke: accentColor }}
        >
          <Label value="Time" offset={0} position="insideBottom" />
        </XAxis>
        <Tooltip
          content={({ payload }) => {
            if (!payload || payload.length < 1) return <></>
            return (
              <div
                style={{
                  backgroundColor: mutedAccent,
                  padding: '5px',
                  borderRadius: '5px',
                }}
              >
                <p style={{ fontSize: '13px' }}>
                  {formatTime(payload[0].payload.x)}
                </p>
                <p style={{ fontSize: '13px' }}>
                  {formatTime(payload[0].payload.y)} watts
                </p>
              </div>
            )
          }}
        />
        <ReferenceLine y={ftp} stroke="gray" strokeDasharray="3 3">
          <Label value="FTP" offset={10} position="insideBottomLeft" />
        </ReferenceLine>
      </LineChart>
    </ResponsiveContainer>
    // </Box>/
  )
}

export { PowerCurveGraph }

// const PowerCurveGraphWrapper = (props: PowerCurveGraphProps) => {
//   const [isMax, setMax] = useState()

//   return (
//     <>
//       {isMax && (
//         <MaximizedContainer title={props.title} openModal={setMax}>
//           <PowerCurveGraph isMaximized={true} {...props} />
//         </MaximizedContainer>
//       )}
//       <ExpandableCard
//         title={props.title}
//         openModal={setMax}
//         expandableOnMobile={false}
//       >
//         <PowerCurveGraph {...props} />
//       </ExpandableCard>
//     </>
//   )
// }
// export default PowerCurveGraphWrapper
