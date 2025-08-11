import { Box, Grid, Text } from 'theme-ui'
import { useUnits } from './UnitProvider'
import { DataPoint } from './ElevationGraph'

export const gradeToColor = (grade: number): string => {
  if (grade > 0 && grade < 4) return 'green'
  if (grade >= 4 && grade < 7) return 'orange'
  if (grade <= 0) return '#D3D3D3'
  if (grade >= 7) return 'red'
  return 'gray'
}

export const formatTime = (value: number) => {
  if (value < 3600) {
    return new Date(value * 1000).toISOString().substr(14, 5).replace(/^0+/, '')
  }
  return new Date(value * 1000).toISOString().substr(11, 8).replace(/^0+/, '')
}

const ElevationSlice = ({
  marker,
}: {
  marker: DataPoint | undefined
}): JSX.Element => {
  const units = useUnits()

  return (
    <Grid
      gap={2}
      columns={[2, 4, 4]}
      sx={{
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
            color: marker ? gradeToColor(marker.grade * 100) : 'black',
          }}
        >
          {marker && marker.grade ? `${(marker.grade * 100).toFixed(1)}%` : '-'}
        </Text>
      </Box>
      <Box>
        <Text as="p">Distance</Text>
        <Text sx={{ fontSize: '20px' }}>
          {marker && marker.distance
            ? `${marker.distance} ${units.distanceUnit}`
            : '-'}
        </Text>
      </Box>
      <Box>
        <Text as="p">Elevation</Text>
        <Text sx={{ fontSize: '20px' }}>
          {marker && marker.y
            ? `${marker.y.toFixed(0)} ${units.elevationUnit}`
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
  )
}

export default ElevationSlice
