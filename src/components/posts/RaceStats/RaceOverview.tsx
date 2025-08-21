import { useMemo } from 'react'
import { Box } from 'theme-ui'

import { useUnits } from '../../../context/UnitProvider'
import RaceStats from './RaceStats'

type Props = {
  data: {
    elevationGain: number
    distance: number
    normalizedPower: number
    heartAnalysis: {
      entire: number
    }
    tempAnalysis: {
      entire: number
    }
    powerAnalysis: {
      entire: number
    }
    cadenceAnalysis: {
      entire: number
    }
    elapsedTime: {
      seconds: number
    }
    stoppedTime: number
    timeInRed: number
  }
  selectedFields: string[]
}

const RaceOverview: React.FC<Props> = ({ data, selectedFields = [] }) => {
  const { unitOfMeasure } = useUnits()

  const {
    normalizedPower,
    elevationGain,
    distance,
    heartAnalysis,
    elapsedTime,
    stoppedTime,
    powerAnalysis,
    cadenceAnalysis,
  } = data

  const formatHMS = (totalSeconds: number) => {
    const sec = Math.max(0, Math.floor(totalSeconds || 0))
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${pad(h)}:${pad(m)}:${pad(s)}`
  }

  const toFeet = (meters: number) => meters * 3.280839895
  const toMiles = (km: number) => km * 0.621371

  const items = useMemo(() => {
    const movingSeconds = Math.max(0, (elapsedTime?.seconds ?? 0) - (stoppedTime ?? 0))
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
        value: normalizedPower != null ? `${normalizedPower.toFixed()} watts` : 'N/A',
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
        value: heartAnalysis?.entire != null ? `${heartAnalysis.entire} bpm` : 'N/A',
      },
      {
        title: 'Distance',
        value:
          unitOfMeasure === 'metric'
            ? `${(distanceKm).toFixed(2)} km`
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
        value: powerAnalysis?.entire != null ? `${powerAnalysis.entire} watts` : 'N/A',
      },
      {
        title: 'Time Stopped',
        value: formatHMS(stoppedTime ?? 0),
      },
      {
        title: 'Avg Cadence',
        value: cadenceAnalysis?.entire != null ? `${cadenceAnalysis.entire} rpm` : 'N/A',
      },
      // {
      //   title: 'Time in Red',
      //   value: formatHMS(timeInRed ?? 0),
      // },
    ]
  }, [
    unitOfMeasure,
    normalizedPower,
    elevationGain,
    distance,
    heartAnalysis?.entire,
    elapsedTime?.seconds,
    stoppedTime,
    powerAnalysis?.entire,
    cadenceAnalysis?.entire,
  ])

  const filteredItems = selectedFields?.length
    ? items.filter((activity) => selectedFields.includes(activity.title))
    : items

  return (
    <Box variant="boxes.figure">
      <RaceStats items={filteredItems} />
    </Box>
  )
}

export default RaceOverview
