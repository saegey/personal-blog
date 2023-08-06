import { Flex, Box, Text } from 'theme-ui'

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

export default MatchesHeading
