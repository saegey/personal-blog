import { memo, useMemo } from 'react'

import { DataPoint } from './ElevationGraph'
import { useUnits } from '../../context/UnitProvider'
import { gradeToColor, formatTime } from '../../lib/formatters'

type Props = { marker: DataPoint | undefined }

const ElevationSlice = ({ marker }: Props): JSX.Element => {
  const { distanceUnit, elevationUnit } = useUnits()

  const items = useMemo(() => {
    const gradePct = marker?.grade != null ? marker.grade * 100 : undefined
    const distance = marker?.distance
    const elevation = marker?.y
    const time = marker?.x

    return [
      {
        key: 'grade',
        label: 'Grade',
        value: gradePct != null ? `${gradePct.toFixed(1)}%` : '-',
        color: gradePct != null ? gradeToColor(gradePct) : 'black',
      },
      {
        key: 'distance',
        label: 'Distance',
        value:
          distance != null ? `${distance.toFixed(2)} ${distanceUnit}` : '-',
      },
      {
        key: 'elevation',
        label: 'Elevation',
        value:
          elevation != null ? `${elevation.toFixed(0)} ${elevationUnit}` : '-',
      },
      {
        key: 'time',
        label: 'Time',
        value: time != null ? formatTime(time) : '-',
      },
    ]
  }, [
    marker?.grade,
    marker?.distance,
    marker?.y,
    marker?.x,
    distanceUnit,
    elevationUnit,
  ])

  return (
    <div className="grid grid-cols-2 border-x border-line sm:grid-cols-4">
      {items.map(({ key, label, value, color }) => (
        <div key={key} className="border-b border-r border-line px-4 py-3 last:border-r-0 sm:border-b-0">
          <p className="font-condensed text-xs font-semibold uppercase tracking-label text-muted">{label}</p>
          <p className="mt-1 font-serif text-xl" style={color ? { color } : undefined}>{value}</p>
        </div>
      ))}
    </div>
  )
}

export default memo(ElevationSlice)
