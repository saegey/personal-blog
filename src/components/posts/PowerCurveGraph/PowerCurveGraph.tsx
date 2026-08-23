import { useState } from 'react'
import { Label, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { GraphProps } from '../../../common/types'
import { formatSeconds, formatTime } from '../../../lib/formatters'
import { useViewport } from '../ViewportProvider'
import { buildChartTheme } from '../common/chartTheme'

interface PowerCurveGraphProps extends GraphProps {
  yAxes?: Array<Array<Number>>
  xAxes?: Array<Array<Number>>
  yScaleMax?: number
  ftp: number
  title: string
  xTicks?: number[]
  xScale?: 'log' | 'linear'
}

const PowerCurveGraph = ({ data, ftp, xTicks, xScale = 'log', yScaleMax }: PowerCurveGraphProps) => {
  const ticks = xTicks ?? [1, 2, 3, 4, 5, 10, 60, 300, 600, 1200, 3600]
  const { width } = useViewport()
  const chartTheme = buildChartTheme()

  return (
    <div className="h-64 w-full sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data as unknown as Array<{ x: number; y: number }>}
          margin={{ top: 10, right: 0, left: width > 640 ? 5 : -25, bottom: width > 640 ? 5 : -5 }}
        >
          <Line dataKey="y" dot={false} strokeWidth={2} stroke={chartTheme.series.line} />
          <YAxis type="number" domain={[0, yScaleMax ?? 'auto']} tick={chartTheme.tick} tickLine={chartTheme.axisLine} axisLine={chartTheme.axisLine}>
            {width > 640 && <Label value="Power" position="insideLeft" angle={-90} {...chartTheme.axisLabel} />}
          </YAxis>
          <XAxis dataKey="x" scale={xScale} ticks={ticks} tickFormatter={formatSeconds} tick={chartTheme.tick} tickLine={chartTheme.axisLine} axisLine={chartTheme.axisLine}>
            {width > 640 && <Label value="Time" offset={0} position="insideBottom" {...chartTheme.axisLabel} />}
          </XAxis>
          <Tooltip
            content={({ payload }) => {
              if (!payload?.length) return null
              return (
                <div className="border border-line bg-paper px-3 py-2 font-condensed text-sm shadow-sm">
                  <p>{formatTime(payload[0].payload.x)}</p>
                  <p className="mt-1 font-medium">{payload[0].payload.y} watts</p>
                </div>
              )
            }}
          />
          <ReferenceLine y={ftp} stroke={chartTheme.reference.line} strokeDasharray="3 3">
            <Label value="FTP" offset={10} position="insideBottomLeft" fill={chartTheme.labelFill} />
          </ReferenceLine>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const PowerCurveGraphWrapper = (props: PowerCurveGraphProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const title = props.title || 'Power curve'

  return (
    <details className="my-10 border-y border-line" data-race-notebook open={isOpen} onToggle={event => setIsOpen(event.currentTarget.open)}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-condensed text-sm font-medium uppercase tracking-label text-ink [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <span className="text-muted"><span className="data-race-closed">View chart</span><span className="data-race-open">Close</span> <span aria-hidden="true">↓</span></span>
      </summary>
      {isOpen && <div className="pb-6"><PowerCurveGraph {...props} /></div>}
    </details>
  )
}

export default PowerCurveGraphWrapper
