import { Grid, Box, Text } from 'theme-ui'

import { formatTime } from '../../../lib/formatters'

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
    <Box variant="boxes.figure">
      <>
        <Box sx={{ marginBottom: '20px' }}>
          <Text as="h2" variant="resultsHeading">
            Time in Zones
          </Text>
        </Box>
        <Grid gap={2} columns={[3, 3, 3]}>
          {powerZones.map((z, index) => {
            return (
              <Box key={`breakdown-${index}`}>
                <Text
                  as="p"
                  sx={{
                    fontFamily: 'body',
                    fontWeight: '600',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                  }}
                >
                  {z.title}
                </Text>
                <Text as="p" sx={{ fontFamily: 'body', fontSize: '13px' }}>
                  {z.powerLow !== 0 &&
                    z.powerHigh !== 0 &&
                    `${z.powerLow} - ${z.powerHigh} watts`}
                  {z.powerLow !== 0 &&
                    z.powerHigh === 0 &&
                    `${z.powerLow}+ watts`}
                  {z.powerLow === 0 &&
                    z.powerHigh === 0 &&
                    `${z.powerLow} watts`}
                </Text>
                <Text
                  as="p"
                  sx={{
                    marginY: '5px',
                    fontFamily: 'body',
                    fontSize: '20px',
                    fontWeight: '600',
                    lineHeight: '30px',
                  }}
                >
                  {formatTime(powerZoneBuckets[index])}
                </Text>
              </Box>
            )
          })}
        </Grid>
      </>
    </Box>
  )
}

export default PowerBreakdown
