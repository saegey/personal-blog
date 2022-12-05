import { Box, useThemeUI } from 'theme-ui'
import { useResponsiveValue } from '@theme-ui/match-media'
import { useState } from 'react'

import LineGraph from './LineGraph'
import { GraphProps } from '../common/types'
import MaximizedContainer from './MaximizedContainer'
import ExpandableCard from './ExpandableCard'

interface PowerCurveGraphProps extends GraphProps {
  yAxes: Array<Array<Number>>
  xAxes: Array<Array<Number>>
  yScaleMax: number
  ftp: number
  title?: string | undefined
}

const PowerCurveGraph = ({
  data,
  yAxes,
  xAxes,
  yScaleMax = 1000,
  ftp,
  isMaximized = false,
}: PowerCurveGraphProps) => {
  const yTicks = useResponsiveValue(yAxes)
  const xTicks = useResponsiveValue(xAxes)
  const { theme } = useThemeUI()

  return (
    <Box
      sx={{
        height: isMaximized ? '90%' : ['200px', '250px', '300px'],
      }}
    >
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
      <ExpandableCard title={props.title} openModal={setMax}>
        <PowerCurveGraph {...props} />
      </ExpandableCard>
    </>
  )
}
export default PowerCurveGraphWrapper
