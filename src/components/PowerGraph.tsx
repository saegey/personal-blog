import { Box } from 'theme-ui'

import { Coordinate, GraphProps } from '../common/types'
import ThemeContext from '../context/ThemeContext'
import LineGraph from '../components/LineGraph'

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
}: GraphProps) => {
  const downSampledData: Coordinate[] = data
    .map((n, i) => {
      return { x: i, y: n ? n : 0 }
    })
    .slice(startTime, endTime === undefined ? data.length : endTime)

  return (
    <ThemeContext.Consumer>
      {context => (
        <Box
          sx={{
            height: ['200px', '200px', '200px'],
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
          />
        </Box>
      )}
    </ThemeContext.Consumer>
  )
}

export default PowerGraph
