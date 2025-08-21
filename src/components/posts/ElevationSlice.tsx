import { memo, useMemo } from 'react'
import { Box, Grid, Text, type ThemeUIStyleObject } from 'theme-ui'

import { DataPoint } from './ElevationGraph'
import { useUnits } from '../../context/UnitProvider'
import { gradeToColor, formatTime } from '../../lib/formatters'

const gridSx: ThemeUIStyleObject = {
  padding: '10px',
  borderLeftColor: 'primaryMuted',
  borderLeftStyle: 'solid',
  borderLeftWidth: '1px',
  borderRightColor: 'primaryMuted',
  borderRightStyle: 'solid',
  borderRightWidth: '1px',
}

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
    <Grid gap={2} columns={[2, 4, 4]} sx={gridSx}>
      {items.map(({ key, label, value, color }) => (
        <Box key={key}>
          <Text as="p" variant="text.statsLabel">
            {label}
          </Text>
          <Text variant="text.statsValue" sx={{ ...(color ? { color } : {}) }}>
            {value}
          </Text>
        </Box>
      ))}
    </Grid>
  )
}

export default memo(ElevationSlice)
