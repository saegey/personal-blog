import { useState } from 'react'
import { Text, Flex, Box, Button } from 'theme-ui'

import { formatTime } from '../lib/formatters'
import RaceResultsList from './RaceResultsList'
import Modal from './Modal'

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
  showSpeed: boolean
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
  showSpeed = true,
}: Props) => {
  const [shouldShowResults, setShouldShowResults] = useState(false)

  const firstPlaceTime = data ? data[0].time
    .split(':')
    .map(d => Number(d))
    .reduce((acc, time) => 60 * acc + +time) : 0

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
        <Modal modalOpen={setShouldShowResults} headerText={'Race Results'}>
          <RaceResultsList data={data} />
        </Modal>
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
        <RaceResultsList data={highlights} showSpeed={showSpeed} />
      </Box>
    </>
  )
}

export default RaceResults
