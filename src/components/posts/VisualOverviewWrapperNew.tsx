import VisualOverview from './VisualOverview'

const MAPBOX_TOKEN = `${process.env.GATSBY_MAPBOX_TOKEN}`

type AxisTickValues = {
  imperial: number[][]
  metric: number[][]
}

type VisualOverviewWrapperProps = {
  // Raw stats JSON (from File.fields.data)
  data: Record<string, any>
  elevationToAdd: number
  yMin?: number
  downsampleRate?: number
  axisLeftTickValues?: AxisTickValues
  axisXTickValues?: AxisTickValues
}

const defaultAxisLeft: AxisTickValues = {
  imperial: [
    [1000, 2000, 3000],
    [500, 1000, 1500, 2000, 2500],
    [500, 1000, 1500, 2000, 2500],
  ],
  metric: [
    [250, 500, 750, 1000],
    [250, 500, 750, 1000],
    [250, 500, 750, 1000],
  ],
}

const defaultAxisX: AxisTickValues = {
  imperial: [
    [20, 40, 60, 80],
    [500, 1000, 1500, 2000, 2500],
    [500, 1000, 1500, 2000, 2500],
  ],
  metric: [
    [20, 40, 60, 80, 100, 120],
    [250, 500, 750, 1000],
    [250, 500, 750, 1000],
  ],
}

const VisualOverviewWrapper = ({
  data,
  elevationToAdd,
  yMin = 0,
  downsampleRate = 1,
  axisLeftTickValues = defaultAxisLeft,
  axisXTickValues = defaultAxisX,
}: VisualOverviewWrapperProps) => {
  const coords =
    data?.SimplifiedCoordinates || data?.simplifiedCoordinates || []
  const elevations: number[] =
    data?.SimplifiedElevations || data?.simplifiedElevations || []
  const distances: number[] =
    data?.SimplifiedDistances || data?.simplifiedDistances || []

  const shaped = elevations.map((elevationFt: number, idx: number) => {
    const y = elevationFt / 3.28084 // meters
    const dist = Number(distances[idx] ?? 0) // meters
    const prevDist = idx > 0 ? Number(distances[idx - 1] ?? dist) : dist
    const prevY = idx > 0 ? Number(elevations[idx - 1]) / 3.28084 : y
    const dx = Math.max(1, dist - prevDist)
    const dy = y - prevY
    const grade = dx > 0 ? dy / dx : 0
    return { distance: dist, y, grade, x: data?.MergedData[idx].t, i: idx }
  })

  const elevationData = {
    downsampleRate,
    data: shaped,
    yScaleMin: { imperial: 0, metric: 0 },
    axisLeftTickValues,
    axisXTickValues,
  }

  return (
    <VisualOverview
      yMin={yMin}
      token={MAPBOX_TOKEN}
      elevationToAdd={elevationToAdd}
      coordinates={coords}
      elevationData={elevationData}
    />
  )
}

export default VisualOverviewWrapper
