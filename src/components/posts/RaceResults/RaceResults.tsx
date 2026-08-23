import { useMemo } from 'react'

import { formatTime } from '../../../lib/formatters'
import RaceResultsList, { RaceResult } from './RaceResultsList'

type SourceResult = {
  name: string
  time: string
  place: string
}

type Props = {
  data: SourceResult[]
  numbersToHighlight?: number[]
  distance: number
  racerName: string
  showSpeed?: boolean
}

const secondsFromTime = (time: string) => time.split(':').map(Number).reduce((total, part) => total * 60 + part, 0)

const RaceResults = ({ data, distance, racerName, showSpeed = true }: Props) => {
  const results = useMemo<RaceResult[]>(() => {
    const firstPlaceTime = data?.[0] ? secondsFromTime(data[0].time) : 0
    return data.filter(result => result.place !== '').map(result => {
      const seconds = secondsFromTime(result.time)
      const hasTime = Number.isFinite(seconds) && seconds > 0
      return {
        ...result,
        speedMetric: hasTime ? `${(((distance * 1000) / seconds) * 3.6).toFixed(2)} km/h` : '',
        speed: hasTime ? `${((distance / seconds) * 2236.9362920544).toFixed(2)} mph` : '',
        timeBehind: hasTime ? formatTime(seconds - firstPlaceTime) : '',
        isMe: result.name === racerName,
      }
    })
  }, [data, distance, racerName])

  if (!results.length) return null

  return (
    <details className="my-10 border-y border-line" data-race-notebook>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-condensed text-sm font-medium uppercase tracking-label text-ink [&::-webkit-details-marker]:hidden">
        <span>Race results</span>
        <span className="text-muted"><span className="data-race-closed">View {results.length} results</span><span className="data-race-open">Close</span> <span aria-hidden="true">↓</span></span>
      </summary>
      <div className="pb-5">
        <RaceResultsList data={results} showSpeed={showSpeed} />
      </div>
    </details>
  )
}

export default RaceResults
