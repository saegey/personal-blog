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
      <Grid gap={2} columns={[3, 3, 3]}>
        {powerZones.map((z, index) => {
          return (
            <Box key={`breakdown-${index}`}>
              <Text variant="text.statsLabel">{z.title}</Text>
              <Text as="p" variant={'text.statsLabelSub'}>
                {z.powerLow !== 0 &&
                  z.powerHigh !== null &&
                  `${z.powerLow} - ${z.powerHigh} watts`}
                {z.powerLow !== 0 &&
                  z.powerHigh === null &&
                  `${z.powerLow}+ watts`}
                {z.powerLow === 0 && z.powerHigh === 0 && `${z.powerLow} watts`}
              </Text>
              <Text as="p" variant="text.statsValue">
                {formatTime(powerZoneBuckets[index])}
              </Text>
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}

export default PowerBreakdown
