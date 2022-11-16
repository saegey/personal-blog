import { Grid, Box, Text } from 'theme-ui'

import { formatTime } from '../lib/formatters'

const PowerBreakdown = ({
  powerZoneBuckets,
  powerZones,
}: {
  powerZoneBuckets: Array<number>
  powerZones: Array<{
    powerLow: number
    powerHigh: number
    zone: number
    title: string
  }>
}) => {
  return (
    <Grid gap={2} columns={[3, 3, 3]}>
      {powerZones.map((z, index) => {
        return (
          <Box key={`breakdown-${index}`}>
            <Text
              as="p"
              sx={{
                fontFamily: 'body',
                fontWeight: '600',
                fontSize: '18px',
                textTransform: 'uppercase',
              }}
            >
              {z.title}
            </Text>
            <Text as="p" sx={{ fontFamily: 'body' }}>
              {z.powerLow !== 0 &&
                z.powerHigh !== 0 &&
                `${z.powerLow} - ${z.powerHigh} watts`}
              {z.powerLow !== 0 && z.powerHigh === 0 && `${z.powerLow}+ watts`}
              {z.powerLow === 0 && z.powerHigh === 0 && `${z.powerLow} watts`}
            </Text>
            <Text
              sx={{ fontFamily: 'body', fontSize: '30px', fontWeight: '300' }}
            >
              {formatTime(powerZoneBuckets[index])}
            </Text>
          </Box>
        )
      })}
    </Grid>
  )
}

export default PowerBreakdown
