import React from 'react'

import { formatTime } from '../../../lib/formatters'
import RaceResultsList from './RaceResultsList'
import MaximizedContainer from '../common/MaximizedContainer'
import ExpandableCard from '../common/ExpandableCard'

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
  const [isModalOpen, openModal] = React.useState(false)

  const firstPlaceTime = data
    ? data[0].time
        .split(':')
        .map(d => Number(d))
        .reduce((acc, time) => 60 * acc + +time)
    : 0

  const results = React.useMemo(() => { return data.map(d => {
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
      // console.log(timeSeconds, firstPlaceTime)
      d.timeBehind = formatTime((timeSeconds - firstPlaceTime).toFixed(2))
    } else {
      d.timeBehind = ''
    }
    if (d.name === racerName) {
      d.isMe = true
    } else {
      d.isMe = false
    }
    return d
  })}, [data])

  const highlights: HighlightsType[] = []
  numbersToHighlight.forEach(n => highlights.push(results[n]))

  return (
    <>
      {isModalOpen && (
        <MaximizedContainer title={'Race Results'} openModal={openModal}>
          <RaceResultsList data={results} />
        </MaximizedContainer>
      )}

      <ExpandableCard
        title={'Race Results'}
        openModal={openModal}
        expandableOnMobile={false}
      >
        <RaceResultsList data={highlights} showSpeed={showSpeed} />
      </ExpandableCard>
    </>
  )
}

export default RaceResults
