import { useMemo } from 'react'

import { useUnits } from '../../../context/UnitProvider'
import { formatHMS, toFeet, toMiles } from '../../../lib/util'
import RaceStats from './RaceStats'

type ShapedData = {
  elevationGain: number
  distance: number
  normalizedPower: number
  heartAnalysis: { entire: number }
  tempAnalysis: { entire: number }
  powerAnalysis: { entire: number }
  cadenceAnalysis: { entire: number }
  elapsedTime: { seconds: number }
  stoppedTime: number
  timeInRed: number
}

type Props = {
  data: ShapedData | Record<string, any>
  selectedFields: string[]
}

// Returns the latest non-zero numeric value; skips trailing zeros
const getLatestValue = (
  obj: Record<string, any> | undefined,
): number | undefined => {
  if (!obj || typeof obj !== 'object') return undefined
  const keys = Object.keys(obj)
    .map(k => Number(k))
    .filter(n => Number.isFinite(n))
    .sort((a, b) => b - a)
  for (const k of keys) {
    const raw = obj[String(k)]
    const val = typeof raw === 'number' ? raw : Number(raw)
    if (Number.isFinite(val) && val > 0) return val
  }
  return undefined
}

const isShapedData = (d: any): d is ShapedData => {
  return (
    d &&
    typeof d === 'object' &&
    typeof d.elevationGain === 'number' &&
    typeof d.distance === 'number' &&
    d.elapsedTime &&
    typeof d.elapsedTime.seconds === 'number'
  )
}

const RaceOverview: React.FC<Props> = ({ data, selectedFields = [] }) => {
  const { unitOfMeasure } = useUnits()

  const shaped = useMemo<ShapedData>(() => {
    if (isShapedData(data)) return data
    const raw = data as Record<string, any>
    const distances: number[] =
      raw?.SimplifiedDistances || raw?.simplifiedDistances || []
    const distanceKm =
      distances.length > 0 ? Number(distances[distances.length - 1]) / 1000 : 0
    return {
      elevationGain: Number(raw?.ElevationGain ?? raw?.elevationGain ?? 0),
      distance: distanceKm,
      normalizedPower: Number(
        raw?.NormalizedPower ?? raw?.normalizedPower ?? 0,
      ),
      heartAnalysis: { entire: getLatestValue(raw?.HeartAnalysis) ?? 0 },
      tempAnalysis: { entire: getLatestValue(raw?.TempAnalysis) ?? 0 },
      powerAnalysis: { entire: getLatestValue(raw?.PowerAnalysis) ?? 0 },
      cadenceAnalysis: { entire: getLatestValue(raw?.CadenceAnalysis) ?? 0 },
      elapsedTime: {
        seconds: Number(raw?.ElapsedTime ?? raw?.elapsedTime ?? 0),
      },
      stoppedTime: Number(raw?.StoppedTime ?? raw?.stoppedTime ?? 0),
      timeInRed: Number(raw?.TimeInRed ?? raw?.timeInRed ?? 0),
    }
  }, [data])

  const items = useMemo(() => {
    const {
      normalizedPower,
      elevationGain,
      distance,
      heartAnalysis,
      elapsedTime,
      stoppedTime,
      powerAnalysis,
      cadenceAnalysis,
    } = shaped

    const movingSeconds = Math.max(
      0,
      (elapsedTime?.seconds ?? 0) - (stoppedTime ?? 0),
    )
    const distanceKm = distance ?? 0
    const elevationMeters = elevationGain ?? 0

    const avgSpeed = (() => {
      if (movingSeconds <= 0 || distanceKm <= 0) return 'N/A'
      const mps = (distanceKm * 1000) / movingSeconds
      return unitOfMeasure === 'metric'
        ? `${(mps * 3.6).toFixed(2)} km/h`
        : `${(mps * 2.2369362920544).toFixed(2)} mph`
    })()

    return [
      {
        title: 'Normalized Power',
        value:
          normalizedPower != null
            ? `${normalizedPower.toFixed()} watts`
            : 'N/A',
      },
      {
        title: 'Elevation Gain',
        value:
          unitOfMeasure === 'metric'
            ? `${elevationMeters.toFixed(0)} meters`
            : `${toFeet(elevationMeters).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })} ft`,
      },
      {
        title: 'Avg Heart Rate',
        value:
          heartAnalysis?.entire != null ? `${heartAnalysis.entire} bpm` : 'N/A',
      },
      {
        title: 'Distance',
        value:
          unitOfMeasure === 'metric'
            ? `${distanceKm.toFixed(2)} km`
            : `${toMiles(distanceKm).toFixed(2)} miles`,
      },
      {
        title: 'Elapsed Time',
        value: formatHMS(elapsedTime?.seconds ?? 0),
      },
      {
        title: 'Moving Time',
        value: formatHMS(movingSeconds),
      },
      // {
      //   title: 'Avg Temperature',
      //   value:
      //     unitOfMeasure === 'metric'
      //       ? `${tempAnalysis.entire.toFixed()} °C`
      //       : `${(tempAnalysis.entire * (9 / 5) + 32).toFixed()} °F`,
      // },
      {
        title: 'Avg Speed',
        value: avgSpeed,
      },
      {
        title: 'Avg Power',
        value:
          powerAnalysis?.entire != null
            ? `${powerAnalysis.entire} watts`
            : 'N/A',
      },
      {
        title: 'Time Stopped',
        value: formatHMS(stoppedTime ?? 0),
      },
      {
        title: 'Avg Cadence',
        value:
          cadenceAnalysis?.entire != null
            ? `${cadenceAnalysis.entire} rpm`
            : 'N/A',
      },
      // {
      //   title: 'Time in Red',
      //   value: formatHMS(timeInRed ?? 0),
      // },
    ]
  }, [unitOfMeasure, shaped])

  const filteredItems = selectedFields?.length
    ? items.filter(activity => selectedFields.includes(activity.title))
    : items

  return (
    <details className="my-10 border-y border-line" data-race-notebook>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-condensed text-sm font-medium uppercase tracking-label text-ink [&::-webkit-details-marker]:hidden">
        <span>Race notebook</span>
        <span className="text-muted"><span className="data-race-closed">View data</span><span className="data-race-open">Close</span> <span aria-hidden="true">↓</span></span>
      </summary>
      <div className="pb-6">
        <RaceStats items={filteredItems} />
      </div>
    </details>
  )
}

export default RaceOverview
