import { Text, Flex, Box, Button, Close } from 'theme-ui'

import RaceResultsList from './RaceResultsList'

type Props = {
  data: [
    {
      name: string
      time: string
      speedMetric: number
      speed: number
      timeBehind: number
      isMe: boolean
      place: string
    }
  ]
  setShouldShowResults: (arg: boolean) => void
}

const RaceResultsViewAll = ({ data, setShouldShowResults }: Props) => {
  return (
    <Box
      variant="styles.faded"
      onClick={event => {
        setShouldShowResults(false)
      }}
    >
      <Box
        sx={{
          backgroundColor: 'background',
          margin: ['0% auto', '5% auto', '5% auto'],
          padding: '0px',
          width: '100%',
          maxWidth: '706px',
          overflowY: 'scroll',
        }}
        onClick={event => {
          event.stopPropagation()
        }}
      >
        <Flex
          sx={{
            position: 'sticky',
            top: '0px',
            backgroundColor: 'background',
          }}
        >
          <Box sx={{ p: '20px' }}>
            <Text
              as="h2"
              sx={{
                lineHeight: '30px',
                fontFamily: 'serif',
                letterSpacing: '.6px',
                fontWeight: '700',
              }}
            >
              Results
            </Text>
          </Box>
          <Box sx={{ marginLeft: 'auto', p: '20px' }}>
            <Button
              onClick={() => {
                setShouldShowResults(false)
              }}
              sx={{ backgroundColor: 'transparent', p: 0 }}
            >
              <Close
                ml="auto"
                mr={-2}
                sx={{ color: 'text', cursor: 'pointer' }}
              />
            </Button>
          </Box>
        </Flex>
        <Box sx={{ paddingX: '20px' }}>
          <RaceResultsList data={data} />
        </Box>
      </Box>
    </Box>
  )
}

export default RaceResultsViewAll
