import { Box } from 'theme-ui'
import { useResponsiveValue } from '@theme-ui/match-media'

import { generateTimeTickValues } from '../lib/formatters'
import { Coordinate, GraphProps } from '../common/types'
import ThemeContext from '../context/ThemeContext'
import LineGraph from '../components/LineGraph'
import { useState } from 'react'
import MaximizedContainer from './MaximizedContainer'
import ExpandableCard from './ExpandableCard'

interface ElevationGraphProps extends GraphProps {
  axisLeftTickValues: { imperial: number[]; metric: number[] }
  areaBaselineValue: { imperial: number; metric: number }
  yScaleMin: { imperial: number; metric: number }
  yScaleMax: { imperial: number; metric: number }
}

const ElevationGraph = ({
  data,
  downsampleRate = 1,
  axisLeftTickValues,
  areaBaselineValue,
  yScaleMin,
  yScaleMax,
  context,
  isMaximized = false,
}: ElevationGraphProps) => {
  const downSampledData: Coordinate[] = data.filter(
    n => Number(n.y) % downsampleRate == 0
  )

  const yTicks =
    context.unitOfMeasure === 'metric'
      ? useResponsiveValue(axisLeftTickValues.metric)
      : useResponsiveValue(axisLeftTickValues.imperial)

  const yMax =
    context.unitOfMeasure === 'metric' ? yScaleMax.metric : yScaleMax.imperial

  return (
    <Box
      sx={{
        height: isMaximized ? '90%' : ['200px', '250px', '300px'],
        fontFamily: 'body',
        marginY: '20px',
      }}
    >
      <LineGraph
        data={[
          {
            id: 'elevation',
            unit: context.unitOfMeasure === 'metric' ? 'meters' : 'feet',
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
            ? yScaleMin.metric
            : yScaleMin.imperial
        }
        yScaleMax={yMax}
        curve={'linear'}
        areaBaselineValue={
          context.unitOfMeasure === 'metric'
            ? areaBaselineValue.metric
            : areaBaselineValue.imperial
        }
        axisBottomTickValues={generateTimeTickValues({
          data: downSampledData,
          intervalSecs: 3600,
        })}
        axisLeftTickValues={yTicks}
      />
    </Box>
  )
}

const ElevationGraphWrapper = ({
  data,
  downsampleRate = 1,
  axisLeftTickValues,
  areaBaselineValue,
  yScaleMin,
  yScaleMax,
}: ElevationGraphProps) => {
  const [isMax, setMax] = useState()

  return (
    <ThemeContext.Consumer>
      {context => (
        <>
          {isMax && (
            <MaximizedContainer title="Elevation Profile" openModal={setMax}>
              <ElevationGraph
                data={data}
                downsampleRate={downsampleRate}
                axisLeftTickValues={axisLeftTickValues}
                areaBaselineValue={areaBaselineValue}
                yScaleMin={yScaleMin}
                yScaleMax={yScaleMax}
                context={context}
                isMaximized={true}
              />
            </MaximizedContainer>
          )}
          <ExpandableCard title="Elevation Profile" openModal={setMax}>
            <ElevationGraph
              data={data}
              downsampleRate={downsampleRate}
              axisLeftTickValues={axisLeftTickValues}
              areaBaselineValue={areaBaselineValue}
              yScaleMin={yScaleMin}
              yScaleMax={yScaleMax}
              context={context}
            />
          </ExpandableCard>
        </>
      )}
    </ThemeContext.Consumer>
  )
}

export default ElevationGraphWrapper
