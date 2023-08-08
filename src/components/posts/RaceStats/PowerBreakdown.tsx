import { Grid, Box, Text } from 'theme-ui'
import React from 'react'

import { formatTime } from '../../../lib/formatters'
import MaximizedContainer from '../common/MaximizedContainer'
import ExpandableCard from '../common/ExpandableCard'

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
  const [isModalOpen, openModal] = React.useState(false)

  return (
    <>
      {isModalOpen && (
        <MaximizedContainer title={'Time in Zones Detailed'} openModal={openModal}>
          <>
            <Text as="h2" variant="resultsHeading">
              content here
            </Text>
          </>
        </MaximizedContainer>
      )}

      <ExpandableCard
        title={'Time in Zones'}
        openModal={openModal}
        expandableOnMobile={false}
      >
        <>
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
      </ExpandableCard>
    </>
  )
}

export default PowerBreakdown
