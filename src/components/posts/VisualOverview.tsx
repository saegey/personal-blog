import { Box } from 'theme-ui'
import React from 'react'

import Map from './CustomMap'
import ElevationGraph, { DataPoint } from './ElevationGraph'
import ElevationSlice, { gradeToColor } from './ElevationSlice'
import { useUnits } from '../../context/UnitProvider'

interface Vizprops {
  elevationData: {
    data: Array<{
      distance: number
      y: number
      grade: number
      x: number
      i: number
    }>
    axisLeftTickValues: Array<number>
    axisXTickValues: Array<number>
    downsampleRate: number
  }
  coordinates: Array<[number, number]>
  elevationToAdd: number
  yMin: number
  token: string
}

const VisualOverview = ({
  coordinates,
  elevationData,
  elevationToAdd,
  yMin = 0,
  token,
}: Vizprops) => {
  const [marker, setMarker] = React.useState<DataPoint | undefined>(undefined)
  const units = useUnits()

  const downSampledData = React.useMemo(
    () =>
      elevationData.data.map(d => {
        return {
          ...d,
          distance:
            units.unitOfMeasure === 'imperial'
              ? (d.distance * 0.00062137121212121)
              : (d.distance / 1000),
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
        markerCoordinates={
          marker ? coordinates[marker.i ? marker.i : marker.x] : null
        }
        token={token}
      />
      <ElevationSlice marker={marker} />
      <ElevationGraph
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
