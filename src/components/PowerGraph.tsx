import { Box } from 'theme-ui'

import { generateTimeTickValues } from '../lib/formatters'
import { Coordinate, GraphProps } from '../common/types'
import ThemeContext from '../context/ThemeContext'
import LineGraph from '../components/LineGraph'

const PowerGraph = ({ data, startTime = 0, endTime = 100 }: GraphProps) => {
  const downSampledData: Coordinate[] = data
    .map((n, i) => {
      // if (n === undefined || n === ) return
      return { x: i, y: n ? n : 0 }
    })
    .slice(startTime, endTime)

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
            unit={'watts'}
            data={[
              {
                id: 'power',
                data: downSampledData,
              },
            ]}
            yScaleMin={0}
            yScaleMax={
              Math.floor(Math.max(...downSampledData.map(o => o.y))) + 50
            }
            areaBaselineValue={0}
            axisBottomTickValues={[60, 120, 180, 240, 300, 360, 420, 480, 540]}
            axisLeftTickValues={[0, 100, 200, 300, 400, 500, 600, 700, 800]}
            curve={'linear'}
            enableArea={false}
          />
        </Box>
      )}
    </ThemeContext.Consumer>
  )
}

export default PowerGraph
