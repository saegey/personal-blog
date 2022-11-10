import { Box } from 'theme-ui'

import {
  generateElevatioinTickValues,
  generateTimeTickValues,
} from '../lib/formatters'
import { Coordinate, GraphProps } from '../common/types'
import ThemeContext from '../context/ThemeContext'
import LineGraph from '../components/LineGraph'

const ElevationGraph = ({ data, downsampleRate = 1 }: GraphProps) => {
  const downSampledData: Coordinate[] = data.filter(
    n => Number(n.y) % downsampleRate == 0
  )

  return (
    <ThemeContext.Consumer>
      {context => (
        <Box
          sx={{
            height: ['150px', '100px', '150px'],
            fontFamily: 'body',
            marginY: '20px',
          }}
        >
          <LineGraph
            unit={context.unitOfMeasure === 'metric' ? 'meters' : 'feet'}
            data={[
              {
                id: 'elevation',
                data:
                  context.unitOfMeasure === 'metric'
                    ? downSampledData
                    : downSampledData.map(d => ({
                        x: d.x,
                        y: (Number(d.y) * 3.280839895).toFixed(0),
                      })),
              },
            ]}
            yScaleMin={
              context.unitOfMeasure === 'metric'
                ? Math.min(...data.map(o => o.y)) - 152.4
                : Math.min(...data.map(o => o.y)) * 3.280839895 - 50
            }
            yScaleMax={
              context.unitOfMeasure === 'metric'
                ? Math.floor(Math.max(...data.map(o => o.y)) / 500) * 500 + 500
                : (Math.floor(
                    Math.max(...downSampledData.map(o => o.y)) / 500
                  ) *
                    500 +
                    500) *
                  3.280839895
            }
            areaBaselineValue={
              context.unitOfMeasure === 'metric'
                ? Math.min(...data.map(o => o.y)) - 152.4
                : Math.min(...data.map(o => o.y)) * 3.280839895 - 50
            }
            axisBottomTickValues={generateTimeTickValues({
              data: downSampledData,
              intervalSecs: 3600,
            })}
            axisLeftTickValues={generateElevatioinTickValues({
              data: downSampledData,
              intervalSecs: context.unitOfMeasure === 'metric' ? 500 : 1000,
              unit: context.unitOfMeasure,
            })}
          />
        </Box>
      )}
    </ThemeContext.Consumer>
  )
}

export default ElevationGraph
