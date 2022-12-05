import { Box, useThemeUI } from 'theme-ui'
import { useState } from 'react'

import { Coordinate, GraphProps } from '../common/types'
import ThemeContext from '../context/ThemeContext'
import LineGraph from './LineGraph'
import MaximizedContainer from './MaximizedContainer'
import ExpandableCard from './ExpandableCard'

const PowerGraph = ({
  data,
  startTime = 0,
  endTime,
  areaBaselineValue,
  axisLeftTickValues,
  yScaleMax,
  unit,
  downsampleRate,
  axisBottomTickValues,
  curve,
  lineWidth,
  colors,
  segments,
  isMaximized = false,
}: GraphProps) => {
  const { theme } = useThemeUI()
  let lapTime = 0
  const markers =
    segments &&
    segments.map((seg, index) => {
      if (index !== 0) lapTime += seg.segmentDuration
      return {
        axis: 'x',
        // value: seg.beginningTime,
        value: lapTime,
        lineStyle: {
          stroke: theme.colors?.marker,
          strokeWidth: index === 0 ? 0 : 1,
        },
        legend: `Lap ${index + 1}`,
        // legendOrientation: "vertical",
        textStyle: {
          fontSize: 14,
          fontFamily: theme.fonts?.body,
          fill: theme.colors?.marker,
          fontWeight: '400',
          transform: 'translate(-10px, -10px)',
        },
      }
    })

  const downSampledData: Coordinate[] = data
    .map((n, i) => {
      return { x: i, y: n ? n : null }
    })
    .slice(startTime, endTime === undefined ? data.length : endTime)

  return (
    <ThemeContext.Consumer>
      {context => (
        <Box
          sx={{
            height: isMaximized ? '85%' : ['200px', '250px', '300px'],
            fontFamily: 'body',
            marginY: '20px',
          }}
        >
          <LineGraph
            unit={unit ? unit : 'watts'}
            data={[
              {
                id: 'power',
                data: downsampleRate
                  ? downSampledData.filter(
                      n => Number(n.x) % downsampleRate == 0
                    )
                  : downSampledData,
              },
            ]}
            yScaleMin={areaBaselineValue ? areaBaselineValue : 0}
            yScaleMax={
              yScaleMax
                ? yScaleMax
                : Math.floor(Math.max(...downSampledData.map(o => o.y))) + 50
            }
            areaBaselineValue={areaBaselineValue ? areaBaselineValue : 0}
            axisBottomTickValues={
              axisBottomTickValues
                ? axisBottomTickValues
                : [60, 120, 180, 240, 300, 360, 420, 480, 540]
            }
            axisLeftTickValues={
              axisLeftTickValues
                ? axisLeftTickValues
                : [0, 100, 200, 300, 400, 500, 600, 700, 800]
            }
            colors={colors}
            curve={curve ? curve : 'linear'}
            enableArea={false}
            lineWidth={lineWidth}
            markers={markers}
          />
        </Box>
      )}
    </ThemeContext.Consumer>
  )
}

const PowerGraphWrapper = (props: GraphProps) => {
  const [isMax, setMax] = useState(false)

  return (
    <>
      {isMax && (
        <MaximizedContainer title={props.title} openModal={setMax}>
          <PowerGraph isMaximized={true} {...props} />
        </MaximizedContainer>
      )}
      <ExpandableCard title={props.title} openModal={setMax}>
        <PowerGraph {...props} />
      </ExpandableCard>
    </>
  )
}

export default PowerGraphWrapper
