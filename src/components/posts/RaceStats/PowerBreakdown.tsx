import { formatTime } from '../../../lib/formatters'

type PowerZone = {
  powerLow: number
  powerHigh: number | null
  zone: number
  title: string
}

const rangeLabel = (zone: PowerZone) => {
  if (zone.powerLow === 0 && zone.powerHigh === 0) return '0 watts'
  if (zone.powerHigh === null) return `${zone.powerLow}+ watts`
  return `${zone.powerLow}–${zone.powerHigh} watts`
}

const PowerBreakdown = ({ powerZoneBuckets, powerZones }: { powerZoneBuckets: number[]; powerZones: PowerZone[] }) => (
  <details className="my-10 border-y border-line" data-race-notebook>
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-condensed text-sm font-medium uppercase tracking-label text-ink [&::-webkit-details-marker]:hidden">
      <span>Time in power zones</span>
      <span className="text-muted"><span className="data-race-closed">View data</span><span className="data-race-open">Close</span> <span aria-hidden="true">↓</span></span>
    </summary>
    <div className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3">
      {powerZones.map((zone, index) => (
        <div key={`${zone.title}-${index}`} className="border-b border-r border-line px-4 py-5 sm:px-5 sm:py-6">
          <p className="font-condensed text-xs font-medium uppercase tracking-label text-muted">{zone.title}</p>
          <p className="mt-2 font-condensed text-sm text-muted">{rangeLabel(zone)}</p>
          <p className="mt-4 font-serif text-2xl leading-none tracking-[-0.025em] sm:text-3xl">{formatTime(powerZoneBuckets[index] ?? 0)}</p>
        </div>
      ))}
    </div>
  </details>
)

export default PowerBreakdown
