import { Box } from 'theme-ui'
import { useState } from 'react'

import Map from './Map'
import NewLineGraph from './NewLineGraph'
import ElevationSlice from './ElevationSlice'

interface Vizprops {
  elevationData: any
  coordinates: any
  context: {
    unitOfMeasure: string
    toggleUnit: () => {}
  }
  elevationToAdd: number
  yMin: number
}

const VisualOverview = ({
  coordinates,
  elevationData,
  elevationToAdd,
  yMin = 0,
}: Vizprops) => {
  const [marker, setMarker] = useState({})

  return (
    <Box sx={{ marginY: ['20px', '40px', '100px'] }}>
      <Map
        coordinates={coordinates}
        markerCoordinates={marker ? coordinates[marker.x] : null}
      />
      <ElevationSlice marker={marker} />
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
    </Box>
  )
}

export default VisualOverview
