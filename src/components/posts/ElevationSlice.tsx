import { Box, Grid, Text } from 'theme-ui'
import { gradeToColor, formatTime } from '../../lib/formatters'
import { useUnits } from '../../context/UnitProvider'

const ElevationSlice = ({ marker }: any) => {
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
