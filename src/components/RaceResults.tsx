import { useState } from 'react'
import { Text, Flex, Box, Button } from 'theme-ui'

import { formatTime } from '../lib/formatters'
import RaceResultsList from './RaceResultsList'
import RaceResultsViewAll from './RaceResultsViewAll'

type Props = {
  data: [
    {
      name: string
      time: string
      speedMetric: string
      speed: string
      timeBehind: string
      place: string
      isMe: boolean
    }
  ]
  numbersToHighlight: [number]
  distance: number
  racerName: string
}

type HighlightsType = {
  name: string
  time: string
  speedMetric: string
  speed: string
  timeBehind?: string
}

const RaceResults = ({
  data,
  numbersToHighlight,
  distance,
  racerName,
}: Props) => {
  const [shouldShowResults, setShouldShowResults] = useState(false)

  const firstPlaceTime = data[0].time
    .split(':')
    .map(d => Number(d))
    .reduce((acc, time) => 60 * acc + +time)

  data.forEach(d => {
    if (d.place === '') return

    const timeSeconds = d.time
      .split(':')
      .map(d => Number(d))
      .reduce((acc, time) => 60 * acc + +time)

    if (timeSeconds > 0) {
      d.speedMetric = `${(((distance * 1000) / timeSeconds) * 3.6).toFixed(
        2
      )} km/h`
      d.speed = `${((distance / timeSeconds) * 2236.9362920544).toFixed(2)} mph`
    } else {
      d.speed = ''
    }

    if (!isNaN(timeSeconds) && timeSeconds !== 0) {
      d.timeBehind = formatTime((timeSeconds - firstPlaceTime).toFixed(2))
    } else {
      d.timeBehind = ''
    }
    if (d.name === racerName) {
      d.isMe = true
    } else {
      d.isMe = false
    }
  })

  const highlights: HighlightsType[] = []
  numbersToHighlight.forEach(n => highlights.push(data[n]))

  return (
    <>
      {shouldShowResults && (
        <RaceResultsViewAll
          setShouldShowResults={setShouldShowResults}
          data={data}
        />
      )}

      <Box>
        <Flex>
          <Box sx={{ marginBottom: ['10px', '0px', '0px'] }}>
            <Text as="h2" variant="resultsHeading">
              Results
            </Text>
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            <Button
              onClick={() => {
                setShouldShowResults(true)
              }}
            >
              View All
            </Button>
          </Box>
        </Flex>
        <RaceResultsList data={highlights} />
      </Box>
    </>
  )
}

export default RaceResults
