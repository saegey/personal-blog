import { Box, Flex, Text } from 'theme-ui'

export const MatchesBurned = ({ data }) => {
  return (
    <Box>
			<Text as="h2" variant="resultsHeading">
				Matches Burned
			</Text>
      <Flex sx={{ height: ['35px', '35px', '35px'], marginTop: "20px" }}>
        <Box sx={{ width: '34%' }}>
          <Text as="p" variant="resultsItem">
            <strong>Average Power</strong>
          </Text>
        </Box>
        <Box sx={{ width: '33%', textAlign: "center" }}>
          <Text as="p" variant="resultsItem">
            <strong>Total Joules</strong>
          </Text>
        </Box>
        <Box sx={{ width: '33%', textAlign: "right"}}>
          <Text as="p" variant="resultsItem">
            <strong>Total time</strong>
          </Text>
        </Box>
        {/* {JSON.stringify(d)} */}
      </Flex>
      {data.slice(0, 5).map((d, index: number) => {
        return (
          <Flex key={`match${index}`} sx={{ height: ['35px', '35px', '35px'] }}>
            <Box sx={{ width: '34%' }}>
              <Text as="p" variant="resultsItem">
                {d.averagePower} watts
              </Text>
            </Box>
            <Box sx={{ width: '33%', textAlign: "center"}}>
              <Text as="p" variant="resultsItem">
                {(d.totalJoules / 1000).toFixed(2)} kJ
              </Text>
            </Box>
            <Box sx={{ width: '33%', textAlign: "right" }}>
              <Text as="p" variant="resultsItem">
                {d.totalTime} sec
              </Text>
            </Box>
            {/* {JSON.stringify(d)} */}
          </Flex>
        )
      })}
    </Box>
  )
}
