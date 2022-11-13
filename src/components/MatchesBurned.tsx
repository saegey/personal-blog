import { useState } from 'react'
import { Box, Flex, Text, Button } from 'theme-ui'

import Modal from './Modal'

const MatchesHeading = () => {
  return (
    <Flex sx={{ height: ['35px', '35px', '35px'], marginTop: '20px' }}>
      <Box sx={{ width: '34%' }}>
        <Text as="p" variant="resultsItem">
          <strong>Average Power</strong>
        </Text>
      </Box>
      <Box sx={{ width: '33%', textAlign: 'center' }}>
        <Text as="p" variant="resultsItem">
          <strong>Total Joules</strong>
        </Text>
      </Box>
      <Box sx={{ width: '33%', textAlign: 'right' }}>
        <Text as="p" variant="resultsItem">
          <strong>Total time</strong>
        </Text>
      </Box>
    </Flex>
  )
}
type ItemProps = {
  index: number
  d: {
    averagePower: number
    totalJoules: number
    totalTime: number
    vals: number[]
    startTime: string
  }
}
const MatchesItem = ({ index, d }: ItemProps) => {
  return (
    <Flex key={`match${index}`} sx={{ height: ['35px', '35px', '35px'] }}>
      <Box sx={{ width: '34%' }}>
        <Text as="p" variant="resultsItem">
          {d.averagePower} watts
        </Text>
      </Box>
      <Box sx={{ width: '33%', textAlign: 'center' }}>
        <Text as="p" variant="resultsItem">
          {(d.totalJoules / 1000).toFixed(2)} kJ
        </Text>
      </Box>
      <Box sx={{ width: '33%', textAlign: 'right' }}>
        <Text as="p" variant="resultsItem">
          {d.totalTime} sec
        </Text>
      </Box>
    </Flex>
  )
}

type Props = {
  data: [
    {
      averagePower: number
      totalJoules: number
      totalTime: number
      vals: number[]
      startTime: string
    }
  ]
}

export const MatchesBurned = ({ data }: Props) => {
  const [isModalOpen, openModal] = useState(false)

  return (
    <>
      {isModalOpen && (
        <Modal modalOpen={openModal} headerText={"Matches Burned"}>
          <>
            <MatchesHeading />
            {data.map((d, index: number) => {
              return <MatchesItem d={d} index={index} key={index} />
            })}
          </>
        </Modal>
      )}
      <Box>
        <Flex>
          <Box sx={{ marginBottom: ['10px', '0px', '0px'] }}>
            <Text as="h2" variant="resultsHeading">
              Matches Burned
            </Text>
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            <Button
              onClick={() => {
                openModal(true)
              }}
            >
              View All
            </Button>
          </Box>
        </Flex>
        <MatchesHeading />
        {data.slice(0, 5).map((d, index: number) => {
          return <MatchesItem d={d} index={index} />
        })}
      </Box>
    </>
  )
}
