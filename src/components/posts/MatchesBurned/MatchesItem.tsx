import { Flex, Box, Text } from 'theme-ui'

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

export default MatchesItem
