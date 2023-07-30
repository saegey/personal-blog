import { Box, useThemeUI } from 'theme-ui'
import { useResponsiveValue } from '@theme-ui/match-media'
import { useState } from 'react'

import LineGraph from './LineGraph'
import { GraphProps } from '../common/types'
import MaximizedContainer from './MaximizedContainer'
import ExpandableCard from './ExpandableCard'
import { formatSeconds } from '../lib/formatters'

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
  const customTheme = {
    axis: {
      textColor: '#eee',
      fontSize: '14px',
      tickColor: '#eee',
    },
    grid: {
      line: {
        stroke: 'pink',
        strokeWidth: 2,
        strokeDasharray: '4 4',
      },
    },
  }

  return (
    <Box
      sx={{
        height: isMaximized ? '90%' : ['200px', '250px', '300px'],
        maxWidth: isMaximized ? '100%' : '768px',
        marginRight: 'auto',
        marginLeft: 'auto',
      }}
    >
      <LineGraph
        unit={'watts'}
        data={[
          {
            id: 'power',
            data,
            unit: 'watts',
          },
        ]}
        yScaleMin={0}
        yScaleMax={yScaleMax}
        xScaleType={'log'}
        lineWidth={2}
        enableArea={false}
        areaBaselineValue={0}
        // theme={customTheme}
        axisBottomTickValues={xTicks}
        axisLeftTickValues={yTicks}
        markers={[
          {
            axis: 'y',
            value: ftp,
            lineStyle: {
              stroke: theme.colors?.highlight,
              strokeWidth: 2,
            },
            legend: `FTP - ${ftp}w`,
            textStyle: {
              fontSize: 14,
              fontFamily: theme.fonts?.body,
              fill: theme.colors?.text,
              fontWeight: '400',
            },
            // legendOrientation: 'vertical',
          },
        ]}
        xAxisFormatter={formatSeconds}
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
      <ExpandableCard
        id="power-curve-graph"
        title={props.title}
        openModal={setMax}
      >
        <PowerCurveGraph {...props} />
      </ExpandableCard>
    </>
  )
}
export default PowerCurveGraphWrapper
