import { Box } from 'theme-ui'
import React from 'react'

import Map from './CustomMap'
import ElevationGraph, { DataPoint } from './ElevationGraph'
import ElevationSlice from './ElevationSlice'
import { gradeToColor } from '../../lib/formatters'
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

  const convertedData = React.useMemo(
    () =>
      elevationData.data.map(d => {
        return {
          ...d,
          distance:
            units.unitOfMeasure === 'imperial'
              ? d.distance * 0.00062137121212121
              : d.distance / 1000,
          y: units.unitOfMeasure === 'imperial' ? d.y * 3.28084 : Number(d.y),
          color: gradeToColor(d.grade * 100),
        }
      }),
    [elevationData.data, units.unitOfMeasure],
  )

  const xMax = Number(convertedData[convertedData.length - 1].distance)
  // Adapt simple tick arrays to ElevationGraph's expected { imperial, metric } shape
  // const axisLeftTickValuesObj = React.useMemo(
  //   () => ({
  //     imperial: [elevationData.axisLeftTickValues],
  //     metric: [elevationData.axisLeftTickValues],
  //   }),
  //   [elevationData.axisLeftTickValues],
  // )
  // const axisXTickValuesObj = React.useMemo(
  //   () => ({
  //     imperial: [elevationData.axisXTickValues],
  //     metric: [elevationData.axisXTickValues],
  //   }),
  //   [elevationData.axisXTickValues],
  // )
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
        downSampledData={convertedData}
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
