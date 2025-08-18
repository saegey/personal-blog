import PowerCurveGraph from './PowerCurveGraph'

type StatsWrapperProps = {
  data: any
  ftp: number
  title?: string
  xTicks?: number[]
  xScale?: 'log' | 'linear'
  yDomain?: [number, number]
}

// Accept raw stats JSON and shape PowerAnalysis into the array expected by PowerCurveGraph
const PowerCurveGraphStatsWrapper = ({
  data,
  ftp,
  title = 'Power Curve',
  xTicks,
  xScale,
}: StatsWrapperProps) => {
  const analysis = data?.PowerAnalysis ?? {}
  const shaped = Object.entries(analysis)
    .map(([k, v]) => ({ x: Number(k), y: Number(v as any) }))
    .filter(p => Number.isFinite(p.x) && p.x > 0 && Number.isFinite(p.y))
    .sort((a, b) => a.x - b.x)

  return (
    <PowerCurveGraph
      data={shaped}
      ftp={ftp}
      title={title}
      isMaximized={false}
      xTicks={xTicks ? xTicks : [1, 2, 3, 4, 5, 10, 60, 300, 600, 1200, 3600]}
      xScale={xScale ? xScale : 'log'}
      yAxes={[[200, 400, 600, 800]] as any}
      xAxes={[[1, 5, 10, 60, 300, 600, 1200, 3600]] as any}
      yScaleMax={shaped.reduce((m, p) => (p.y > m ? p.y : m), 0)}
    />
  )
}

export default PowerCurveGraphStatsWrapper
