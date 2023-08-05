import React from 'react'
import { Box, Flex, Text } from 'theme-ui'

import FullScreenIcon from '../../icons/FullScreenIcon'
import Modal from '../../Modal'
import MatchesHeading from './MatchesHeading'
import MatchesItem from './MatchesItem'

type Props = {
  data: Array<{
    averagePower: number
    totalJoules: number
    totalTime: number
    vals?: number[]
    startTime?: string
  }>
}

export const MatchesBurned = ({ data }: Props) => {
  const [isModalOpen, openModal] = React.useState(false)

  return (
    <>
      {isModalOpen && (
        <Modal
          modalOpen={openModal}
          headerText={'Matches Burned'}
          testId={'matches-modal'}
        >
          <>
            <MatchesHeading />
            {data.map((d, index: number) => {
              return <MatchesItem d={d} index={index} key={index} />
            })}
          </>
        </Modal>
      )}
      <Box
        sx={{
          maxWidth: '690px',
          margin: '60px auto',
          background: 'muted',
          padding: '30px',
          borderRadius: '5px',
        }}
      >
        <Flex>
          <Box sx={{ marginBottom: '20px' }}>
            <Text as="h2" variant="resultsHeading">
              Matches Burned
            </Text>
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            <Box as="button"
              data-testid={'matches-burned-fullscreen'}
              sx={{
                width: '40px',
                right: '0',
                top: '0',
                zIndex: 0,
              }}
              onClick={() => {
                openModal(true)
              }}
            >
              <FullScreenIcon color="primary" />
            </Box>
          </Box>
        </Flex>
        <MatchesHeading />
        {data.slice(0, 5).map((d, index: number) => {
          return <MatchesItem d={d} key={`matches-${index}`} index={index} />
        })}
      </Box>
    </>
  )
}
