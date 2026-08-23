import { useUnits } from '../../../context/UnitProvider'

export type RaceResult = {
  name: string
  time: string
  place: string
  speedMetric: string
  speed: string
  timeBehind: string
  isMe: boolean
}

type Props = {
  data: RaceResult[]
  showSpeed?: boolean
}

const RaceResultsList = ({ data, showSpeed = true }: Props) => {
  const { unitOfMeasure } = useUnits()

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <thead className="border-b border-line font-condensed text-xs font-medium uppercase tracking-label text-muted">
          <tr>
            <th className="py-3 pr-3 font-medium">Place</th>
            <th className="py-3 pr-3 font-medium">Rider</th>
            <th className="py-3 text-right font-medium">Time</th>
            {showSpeed && <th className="py-3 pl-5 text-right font-medium">Speed</th>}
            <th className="py-3 pl-5 text-right font-medium">Behind</th>
          </tr>
        </thead>
        <tbody className="text-base sm:text-lg">
          {data.map(item => (
            <tr key={`${item.place}-${item.name}`} className={`border-b border-line ${item.isMe ? 'font-semibold' : ''}`}>
              <td className="py-3 pr-3 font-condensed text-sm text-muted">{item.place}</td>
              <td className="py-3 pr-3">{item.name}</td>
              <td className="py-3 text-right tabular-nums">{item.time}</td>
              {showSpeed && <td className="py-3 pl-5 text-right font-condensed text-sm tabular-nums text-muted">{unitOfMeasure === 'metric' ? item.speedMetric : item.speed}</td>}
              <td className="py-3 pl-5 text-right font-condensed text-sm tabular-nums text-muted">{item.timeBehind}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RaceResultsList
