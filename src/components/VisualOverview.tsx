import { Grid, Box, Text } from 'theme-ui'
import { useState } from 'react'

import ThemeContext from '../context/ThemeContext'
import { GraphProps } from '../common/types'
import Map from './Map'
import NewLineGraph from './NewLineGraph'
import { formatTime } from '../lib/formatters'

interface ElevationProps extends GraphProps {
  axisLeftTickValues: { imperial: number[]; metric: number[] }
  axisXTickValues: { imperial: number[]; metric: number[] }
  areaBaselineValue: { imperial: number; metric: number }
  yScaleMin: { imperial: number; metric: number }
  yScaleMax: { imperial: number; metric: number }
}

interface Vizprops {
  elevationData: ElevationProps
  coordinates: any
  context: {
    unitOfMeasure: string
    toggleUnit: () => {}
  }
}

const calcColor = (grade: number) => {
  if (grade * 100 > 8) {
    return 'red'
  }
  if (grade * 100 > 5) {
    return 'orange'
  }
  if (grade * 100 > 0) {
    return 'green'
  }
  return 'gray'
}

const VisualOverview = ({ coordinates, elevationData, context, elevationToAdd, yMin=0 }: Vizprops) => {
  const [marker, setMarker] = useState({})

  return (
    <>
      <Map
        coordinates={coordinates}
        markerCoordinates={marker ? coordinates[marker.x] : null}
      />
      <Grid
        gap={2}
        columns={[2, 4, 4]}
        sx={{
          // marginY: '10px',
          padding: '10px',
          borderLeftColor: 'mutedAccent',
          borderLeftStyle: 'solid',
          borderLeftWidth: '1px',
          borderRightColor: 'mutedAccent',
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
        }}
      >
        <Box>
          <Text as="p">Grade</Text>
          <Text
            sx={{
              fontSize: '20px',
              color: marker ? calcColor(marker.grade) : 'black',
            }}
          >
            {marker && marker.grade
              ? `${(marker.grade * 100).toFixed(1)}%`
              : '-'}
          </Text>
        </Box>
        <Box>
          <Text as="p">Distance</Text>
          <Text sx={{ fontSize: '20px' }}>
            {marker && marker.distance
              ? `${marker.distance} ${context.distanceUnit}`
              : '-'}
          </Text>
        </Box>
        <Box>
          <Text as="p">Elevation</Text>
          <Text sx={{ fontSize: '20px' }}>
            {marker && marker.y
              ? `${marker.y.toFixed(0)} ${context.elevationUnit}`
              : '-'}
          </Text>
        </Box>
        <Box>
          <Text as="p">Time</Text>
          <Text sx={{ fontSize: '20px' }}>
            {marker && marker.x ? `${formatTime(marker.x)}` : '-'}
          </Text>
        </Box>
      </Grid>
      <NewLineGraph
        data={elevationData.data}
        downsampleRate={elevationData.downsampleRate}
        setMarker={setMarker}
        coordinates={coordinates}
        elevationToAdd={elevationToAdd}
        axisLeftTickValues={elevationData.axisLeftTickValues}
        axisXTickValues={elevationData.axisXTickValues}
        yMin={yMin}
      />
    </>
  )
}

const VisualOverviewWrapper = props => {
  return (
    <ThemeContext.Consumer>
      {context => <VisualOverview context={context} {...props} />}
    </ThemeContext.Consumer>
  )
}

export default VisualOverviewWrapper
