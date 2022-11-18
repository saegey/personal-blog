import { useThemeUI, Box } from 'theme-ui'
import { useResponsiveValue } from '@theme-ui/match-media'

import LineGraph from './LineGraph'
import { GraphProps } from '../common/types'

const PowerCurveGraph = ({ data }: GraphProps) => {
  const { theme } = useThemeUI()

  const yAxes = useResponsiveValue([
    [100, 300, 500, 700],
    [100, 200, 300, 400, 500, 600, 700],
    [100, 200, 300, 400, 500, 600, 700],
  ])

  return (
    <LineGraph
      unit={'watts'}
      data={[
        {
          id: 'power',
          data,
        },
      ]}
      yScaleMin={0}
      yScaleMax={1000}
      xScaleType={'log'}
      lineWidth={2}
      enableArea={false}
      areaBaselineValue={0}
      axisBottomTickValues={[
        1, 5, 10, 30, 60, 300, 600, 1200, 3600, 7200, 14400, 21600,
      ]}
      axisLeftTickValues={[0, 200, 400, 600, 800, 1000]}
    />
  )
}

const PowerCurveGraphWrapper = ({ data }: GraphProps) => {
  return (
    <Box sx={{ height: ['200px', '300px', '300px'] }}>
      <PowerCurveGraph data={data} />
    </Box>
  )
}
export default PowerCurveGraphWrapper
