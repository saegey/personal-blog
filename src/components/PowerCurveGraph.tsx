import { Box, useThemeUI } from 'theme-ui'
import { useResponsiveValue } from '@theme-ui/match-media'

import LineGraph from './LineGraph'
import { GraphProps } from '../common/types'

interface PowerCurveGraphProps extends GraphProps {
  yAxes: Array<Array<Number>>
  xAxes: Array<Array<Number>>
  yScaleMax: number
	ftp: number
}

const PowerCurveGraph = ({
  data,
  yAxes,
  xAxes,
  yScaleMax = 1000,
	ftp
}: PowerCurveGraphProps) => {
  const yTicks = useResponsiveValue(yAxes)
  const xTicks = useResponsiveValue(xAxes)
  const { theme } = useThemeUI()

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
      yScaleMax={yScaleMax}
      xScaleType={'log'}
      lineWidth={2}
      enableArea={false}
      areaBaselineValue={0}
      axisBottomTickValues={xTicks}
      axisLeftTickValues={yTicks}
      markers={[
        {
          axis: 'y',
          value: ftp,
          lineStyle: {
						stroke: theme.colors?.marker,
						strokeWidth: 1,
					},
          legend: `FTP - ${ftp}w`,
          textStyle: {
            fontSize: 14,
            fontFamily: theme.fonts?.body,
            fill: theme.colors?.marker,
            fontWeight: '400',
          },
          // legendOrientation: 'vertical',
        },
      ]}
    />
  )
}

const PowerCurveGraphWrapper = ({
  data,
  yAxes,
  xAxes,
  yScaleMax,
	ftp
}: PowerCurveGraphProps) => {
  return (
    <Box sx={{ height: ['200px', '300px', '300px'] }}>
      <PowerCurveGraph
        data={data}
        yAxes={yAxes}
        xAxes={xAxes}
        yScaleMax={yScaleMax}
				ftp={ftp}
      />
    </Box>
  )
}
export default PowerCurveGraphWrapper
