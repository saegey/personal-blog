import { Box } from 'theme-ui'
import { useState, useMemo } from 'react'

import Map from './Map'
import NewLineGraph from './NewLineGraph'
import ElevationSlice from './ElevationSlice'
import { gradeToColor } from '../lib/formatters'
import { useUnits } from '../context/UnitProvider'

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
  const [marker, setMarker] = useState({x: ''})
  const units = useUnits()

  const downSampledData = useMemo(
    () =>
      elevationData.data
        .filter((_d: any, i: number) => i % elevationData.downsampleRate === 0)
        .map((d: { distance: number; y: number; grade: number }) => {
          return {
            ...d,
            distance:
              units.unitOfMeasure === 'imperial'
                ? (d.distance * 0.00062137121212121).toFixed(1)
                : (d.distance / 1000).toFixed(1),
            y: units.unitOfMeasure === 'imperial' ? d.y * 3.28084 : Number(d.y),
            color: gradeToColor(d.grade * 100),
          }
        }),
    [elevationData.data, units.unitOfMeasure],
  )

  const xMax = Number(downSampledData[downSampledData.length - 1].distance)

  return (
    <Box sx={{ marginY: ['20px', '40px', '100px'] }}>
      <Map
        coordinates={coordinates}
        markerCoordinates={marker ? coordinates[marker.x] : null}
      />
      <ElevationSlice marker={marker} />
      <NewLineGraph
        downSampledData={downSampledData}
        xMax={xMax}
        setMarker={setMarker}
        elevationToAdd={elevationToAdd}
        axisLeftTickValues={elevationData.axisLeftTickValues}
        axisXTickValues={elevationData.axisXTickValues}
        yMin={yMin}
      />
    </Box>
  )
}

export default VisualOverview
